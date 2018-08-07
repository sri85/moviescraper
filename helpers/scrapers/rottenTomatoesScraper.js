const request = require('request');
const cheerio = require('cheerio');

const Scraper = require('./scraper');

class RottenTomatoesScraper extends Scraper {
  constructor() {
    super();

  }

  sanitizeRating(ratingText) {
    if (ratingText === undefined || ratingText === '') {
      return '';
    }
    return ratingText.replace(/[\r\n]/g, "").trim().split(":")[1].trim();

  }

  getMovieDetailsWithName(url, title) {
    return new Promise(((resolve, reject) => {
      request(url, (error, res, html) => {
        if(res.statusCode !== 200) {
          reject(error)

        }
        if (error) {
          return reject(error);
        }
        let jsonBody = {title: "", release: "", rating: "", likes: ""};

        const $ = cheerio.load(html);
        jsonBody.title = title;
        jsonBody.release = $('div[class="meta-value"] time').first().text();
        jsonBody.likes = $('div[class="meter-value"] span').text();
        jsonBody.rating = this.sanitizeRating($('div[class="audience-info hidden-xs superPageFontColor"] div').first().text());
        return resolve(jsonBody);
      });
    }));
  }
}

module.exports = new RottenTomatoesScraper();