/* eslint-disable no-unused-expressions */


const {expect} = require('chai');
const urlUtil = require('../helpers/urlFormatter');

describe('urlFormatter ', () => {
  it('should return valid url when a title is passed', () => {
    const expectedUrl = `https://www.imdb.com/find?ref_=nv_sr_fn&q=interstellare&s=all`;
    return expect(urlUtil.searchIMDBWithMovieTitle('interstellar')).to.equal(expectedUrl);
  });
  it('should return valid url when a title is passed', () => {
    const expectedUrl = `https://www.imdb.com/find?ref_=nv_sr_fn&q=Interstellare&s=all`;
    return expect(urlUtil.searchIMDBWithMovieTitle('Interstellar')).to.equal(expectedUrl);
  });
  it('should return valid url when a id is passed', () => {
    const expectedUrl = `https://www.imdb.com/title/tt3501632`;
    return expect(urlUtil.searchIMDBWithTitleId('tt3501632')).to.equal(expectedUrl);
  });
  it('sanitize url(IMDB) should replace whitespace with plus sign', () => {
    return expect(urlUtil.sanitizeUrl('imdb', 'test url')).to.equal('test+url');
  });
  it('sanitize url(IMDB) should trim the trailing and leading whitespace ', () => {
    return expect(urlUtil.sanitizeUrl('imdb', '  test url  ')).to.equal('test+url');
  });
  it('sanitize url(IMDB) should empty string if the title has only space in it ', () => {
    return expect(urlUtil.sanitizeUrl('imdb', '   ')).to.equal('');
  });
  it('sanitize url(IMDB) should empty string if the title has only space in it ', () => {
    return expect(urlUtil.sanitizeUrl('imdb', 'test  url')).to.equal('test++url');
  });
  it('sanitize url(RottenTomatoes) should replace whitespace with underscores', () => {
    return expect(urlUtil.sanitizeUrl('rottentomatoes', 'test url')).to.equal('test_url');
  });
  it('sanitize url(RottenTomatoes) should remove trailing and leading whitespaces replace whitespace with underscores', () => {
    return expect(urlUtil.sanitizeUrl('rottentomatoes', ' test url ')).to.equal('test_url');
  });
  it('sanitize url(RottenTomatoes) should remove trailing and leading whitespaces replace whitespace with underscores', () => {
    return expect(urlUtil.sanitizeUrl('myownsite', ' test url ')).to.equal(undefined);
  });

});
