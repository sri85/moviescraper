const express = require('express');
const apicache = require('apicache');
const logger = require('./logger');
const urlFormatter = require('./helpers/urlFormatter');
const serverConfig = require('./helpers/serverConfig');
const imdbScraper = require('./helpers/scrapers/imdbScraper');
const rottenTomatoesScraper = require('./helpers/scrapers/rottenTomatoesScraper');

const app = express();
let cache = apicache.middleware;
app.use(cache('5 minutes'));
app.use((req, res, next) => {
  const log = logger.loggerInstance.child({
    id: req.id,
    body: req.body
  }, true);
  log.info({
    req: req
  });
  next();
});

app.use(function (req, res, next) {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
    const log = logger.loggerInstance.child({
      id: req.id
    }, true);
    log.info({res:res}, 'response')
  }

  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});

app.get('/api/imdb/getMovieDetails/id/:titleId', (req, response) => {

  const imdbUrl = urlFormatter.searchIMDBWithTitleId(req.params.titleId);

  return imdbScraper.getMovieDetailsWithId(imdbUrl).then((jsonResponse) => {
    return response.json(jsonResponse).end();
  })
});

app.get('/api/imdb/getId/name/:title', (req, response) => {

  const movieTitle = urlFormatter.sanitizeUrl('imdb', req.params.title);
  const imdbUrl = urlFormatter.searchIMDBWithMovieTitle(movieTitle);

  return imdbScraper.getMovieDetailsWithName(imdbUrl, movieTitle).then(movieDetails => {
    return response.json(movieDetails).end();
  });
});

app.get('/api/rottentomatoes/name/:title', (req, response) => {

  const movieTitle = urlFormatter.sanitizeUrl('rottentomatoes', req.params.title);
  const rottenTomatoesUrl = `https://www.rottentomatoes.com/m/${movieTitle}`;

  return rottenTomatoesScraper.getMovieDetailsWithName(rottenTomatoesUrl,movieTitle).then(movieDetails => {
    return response.json(movieDetails);
  });
});

app.get('/api/movieDetails/:title',(req,response) => {

  const rottenTomatoesMovieTitle = urlFormatter.sanitizeUrl('rottentomatoes', req.params.title);
  const rottenTomatoesUrl = `https://www.rottentomatoes.com/m/${rottenTomatoesMovieTitle}`;
  const imdbMovieTitle = urlFormatter.sanitizeUrl('imdb', req.params.title);
  const imdbUrl = urlFormatter.searchIMDBWithMovieTitle(imdbMovieTitle);

  return rottenTomatoesScraper.getMovieDetailsWithName(rottenTomatoesUrl,rottenTomatoesMovieTitle).then(rottenMovieDetails => {
    return imdbScraper.getMovieDetailsWithName(imdbUrl, imdbMovieTitle).then(ImdbMovieDetails => {
      console.log(ImdbMovieDetails.titleId);
      return imdbScraper.getMovieDetailsWithId(ImdbMovieDetails.url).then(ImdbRating => {
        return response.json({
          "imdb":ImdbRating,
          "rottenTomatoes":rottenMovieDetails
        }).end();

      });
    });
  });
});

const server = app.listen(serverConfig.port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Movie scraper service is running on ${serverConfig.port} `);
});
module.exports = server;