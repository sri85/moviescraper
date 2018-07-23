const request = require('request');
const cheerio = require('cheerio');

const Scraper = require('./scraper');

class RottenTomatoesScraper extends Scraper{
  constructor() {
    super();

  }

  getMovieDetailsWithName(url,title) {
    return new Promise(((resolve, reject) => {
      request(url, (error, res, html) => {
        if (error){
          return reject(error);
        }
        let jsonBody = {title: "", release: "", rating: "", likes: ""};

        const $ = cheerio.load(html);
        jsonBody.title = title;
        jsonBody.release = $('div[class="meta-value"] time').first().text();
        jsonBody.likes = $('div[class="meter-value"] span').text();
        jsonBody.rating = $('div[class="audience-info hidden-xs superPageFontColor"] div').first().text().replace(/[\r\n]/g, "").trim().split(":")[1].trim();
        return resolve(jsonBody);
      });
    }));
  }
}

module.exports = new RottenTomatoesScraper();