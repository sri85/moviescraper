const express = require('express');
const urlFormatter = require('./helpers/urlFormatter');
const serverConfig = require('./helpers/serverConfig');
const imdbScraper = require('./helpers/scrapers/imdbScraper');
const rottenTomatoesScraper = require('./helpers/scrapers/rottenTomatoesScraper');

const app = express();

app.get('/api/imdb/getMovieDetails/id/:titleId', (req, response) => {

  const imdbUrl = urlFormatter.searchIMDBWithTitleId(req.params.titleId);

  return imdbScraper.getMovieDetailsWithId(imdbUrl).then((jsonResponse) => {
    return response.json(jsonResponse);
  })
});

app.get('/api/imdb/getId/name/:title', (req, response) => {

  const movieTitle = urlFormatter.sanitizeUrl('imdb', req.params.title);
  const imdbUrl = urlFormatter.searchIMDBWithMovieTitle(movieTitle);

  return imdbScraper.getMovieDetailsWithName(imdbUrl, movieTitle).then(movieDetails => {
    return response.json(movieDetails);
  });
});

app.get('/api/rottentomatoes/name/:title', (req, response) => {

  const movieTitle = urlFormatter.sanitizeUrl('rottentomatoes', req.params.title);
  const rottenTomatoesUrl = `https://www.rottentomatoes.com/m/${movieTitle}`;

  return rottenTomatoesScraper.getMovieDetailsWithName(rottenTomatoesUrl,movieTitle).then(movieDetails => {
    return response.json(movieDetails);
  });
});

app.listen(serverConfig.port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Movie scraper service is running on ${serverConfig.port} `);
});