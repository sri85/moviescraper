const request = require('request');
const cheerio = require('cheerio');

const Scraper = require('./scraper');

class ImdbScraper extends Scraper {
  constructor() {
    super();

  }

  sanitizeRating(rating) {
    if (rating === undefined || rating === '') {
      return '';
    }
    return rating.split("/")[2];

  }

  sanitizeActors(actors) {
    const actorsArray = (actors.split('\n'));
    const sanitizedActorArray = [];
    for (let i = 0; i < actorsArray.length; i++) {
      sanitizedActorArray.push(actorsArray[i].trim().replace(',', ''));
    }
    return sanitizedActorArray.join(",");
  }

  getMovieDetailsWithId(url) {
    return new Promise(((resolve, reject) => {
      request(url, (error, res, html) => {
        if (error) {
          return reject(error);
        }
        const movieDetails = {title: "", release: "", rating: "", actors: "", summary: ""};
        const $ = cheerio.load(html);
        movieDetails.title = ($('h1[itemprop="name"]').text().trim());
        movieDetails.release = ($('span[id="titleYear"] a')).text();
        movieDetails.rating = ($('div[class="ratingValue"] span')).text();
        movieDetails.actors = this.sanitizeActors($('span[itemprop="actors"]').text().trim());
        movieDetails.summary = $('span[itemprop="description"]').text().trim();
        return resolve(movieDetails);
      });
    }));
  }

  getMovieDetailsWithName(url, title) {
    return new Promise(((resolve, reject) => {
      request(url, (error, res, html) => {
        if (error) {
          return reject(error);
        }
        const movieDetails = {titleId: "", movieTitle: "", url: ""};
        const $ = cheerio.load(html);
        const linkText = this.sanitizeRating($('td[class="result_text"] a').attr('href'));
        movieDetails.titleId = linkText;
        movieDetails.movieTitle = title;
        movieDetails.url = "https://www.imdb.com/title/" + linkText;
        return resolve(movieDetails);
      });
    }));
  }
}

module.exports = new ImdbScraper();