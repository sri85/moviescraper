const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {expect} = require('chai');
const nock = require('nock');
chai.use(chaiAsPromised);

const imdb = require('../helpers/scrapers/imdbScraper');
const imdbHtml = require('./testHelpers/imdbMarkup');

describe('IMDB scraper', () => {
  it('should return title , release and rating of a movie when a valid imdb movie id is passed  ', () => {

    nock('https://www.imdb.com')
      .get('/title/tt0112870')
      .reply(200, imdbHtml);

    const expectedResult = {"title": 'Dilwale Dulhania Le Jayenge (1995)', "release": '1995', "rating": '8.2/10'};
    return imdb.getMovieDetailsWithId('https://www.imdb.com/title/tt0112870').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });

  it('should return empty string when a invalid is passed ', () => {
    nock('https://www.imdb.com')
      .get('/title/tt0112870dfdfdf')
      .reply(404, '<html></html>');
    const expectedResult = {"title": '', "release": '', "rating": ''};
    return imdb.getMovieDetailsWithId('https://www.imdb.com/title/tt0112870dfdfdf').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });
  it('should return titleId , movieTitle and url when a movie title is passed', () => {

    nock('https://www.imdb.com')
      .get('/find?ref_=nv_sr_fn&q=Dilwalee&s=all')
      .reply(200, imdbHtml);

    const expectedResult = {
      "movieTitle": 'Dilwale',
      "titleId": 'tt4535650',
      "url": 'https://www.imdb.com/title/tt4535650'
    };
    return imdb.getMovieDetailsWithName('https://www.imdb.com/find?ref_=nv_sr_fn&q=Dilwalee&s=all', 'Dilwale').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });
  it('Check the json response returned by ', () => {
    nock('https://www.imdb.com')
      .get('/find?ref_=nv_sr_fn&q=Dilwaldsdsdsee&s=all')
      .reply(404, '<html></html>');
    const expectedResult = {
      "movieTitle": "Dilwale",
      "titleId": "",
      "url": "https://www.imdb.com/title/"
    };
    return imdb.getMovieDetailsWithName('https://www.imdb.com/find?ref_=nv_sr_fn&q=Dilwaldsdsdsee&s=all', 'Dilwale').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });

});