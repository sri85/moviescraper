const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {expect} = require('chai');
chai.use(chaiAsPromised);
const nock = require('nock');

const rottenTomatoes = require('../helpers/scrapers/rottenTomatoesScraper');
const rottenTomatoesHtml = require('./testHelpers/helpers');

describe('RottenTomatoes scraper', () => {
  it('should return likes,rating ,release and title when a valid url is passed ', () => {
    nock('https://www.rottentomatoes.com')
      .get('/m/dilwale')
      .reply(200, rottenTomatoesHtml);

    const expectedResult = {
      "likes": "33%",
      "rating": "3/5",
      "release": "Sep 20, 2005",
      "title": "dilwale"
    };
    return rottenTomatoes.getMovieDetailsWithName('https://www.rottentomatoes.com/m/dilwale', 'dilwale').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });

  it('should return empty likes,rating,release and title when we pass an non existent movie name ', () => {
    nock('https://www.rottentomatoes.com')
      .get('/m/nonexistent')
      .reply(200, '<html></html>');
    const expectedResult = {
      "likes": "",
      "rating": "",
      "release": "",
      "title": "nonexistent"
    };
    return rottenTomatoes.getMovieDetailsWithName('https://www.rottentomatoes.com/m/nonexistent','nonexistent').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });
  it('Check the json response returned by getMovieDetailsWithName', () => {
    nock('https://www.rottentomatoes.com')
      .get('/m/nonexistent')
      .reply(404, '<html></html>');
    const expectedResult = {
      "likes": "",
      "rating": "",
      "release": "",
      "title": "nonexistent"
    };
    return rottenTomatoes.getMovieDetailsWithName('https://www.rottentomatoes.com/m/nonexistent', 'nonexistent').then(actualDetails => {
      return expect(actualDetails).to.deep.equal(expectedResult);
    });
  });
});