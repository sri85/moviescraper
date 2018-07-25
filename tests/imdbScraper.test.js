const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {expect} = require('chai');
chai.use(chaiAsPromised);
const imdb = require('../helpers/scrapers/imdbScraper');

describe('IMDB scraper', () => {
  beforeEach(() => {

  });
  it('Check the json response returned by ', () => {
    const expectedResult = {"title": 'Dilwale Dulhania Le Jayenge (1995)', "release": '1995', "rating": '8.2/10'};
    return imdb.getMovieDetailsWithId('https://www.imdb.com/title/tt0112870').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });

  it('Check the json response returned by ', () => {
    const expectedResult = {"title": '', "release": '', "rating": ''};
    return imdb.getMovieDetailsWithId('https://google.com').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });
  it('Check the json response returned by getMovieDetailsWithName', () => {
    const expectedResult = {
      "movieTitle": 'Dilwale',
      "titleId": 'tt4535650',
      "url": 'https://www.imdb.com/title/tt4535650'
    };
    return imdb.getMovieDetailsWithName('https://www.imdb.com/find?ref_=nv_sr_fn&q=Dilwalee&s=all', 'Dilwale').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });
  xit('Check the json response returned by ', () => {
    const expectedResult = {
      "movieTitle": '',
      "titleId": '',
      "url": ''
    };
    return imdb.getMovieDetailsWithName('https://google.com', 'Dilwale').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });

});