const request = require('request');
const cheerio = require('cheerio');

const Scraper = require('./scraper');

class ImdbScraper extends Scraper {
  constructor() {
    super();

  }

  getMovieDetailsWithId(url) {
    return new Promise(((resolve, reject) => {
      request(url, (error, res, html) => {
        if (error) {
          return reject(error);
        }
        const jsonBody = {title: "", release: "", rating: ""};
        const $ = cheerio.load(html);
        jsonBody.title = ($('h1[itemprop="name"]').text());
        jsonBody.release = ($('span[id="titleYear"] a')).text();
        jsonBody.rating = ($('div[class="ratingValue"] span')).text();
        return resolve(jsonBody);
      });
    }));
  }

  getMovieDetailsWithName(url, title) {
    return new Promise(((resolve, reject) => {
      request(url, (error, res, html) => {
        if (error) {
          return reject(error);
        }
        const jsonBody = {titleId: "", movieTitle: "", url: ""};
        const $ = cheerio.load(html);
        const linkText = ($('td[class="result_text"] a').attr('href')).split("/")[2];
        jsonBody.titleId = linkText;
        jsonBody.movieTitle = title;
        jsonBody.url = "https://www.imdb.com/title/" + linkText;
        return resolve(jsonBody);
      });
    }));
  }
}

module.exports = new ImdbScraper();