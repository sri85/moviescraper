const movieScraperService = require('../server');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Moviescraper service', function () {
  it('get movie details with id', function (done) {
    request(movieScraperService)
      .get('/api/imdb/getMovieDetails/id/tt0112870')
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body.release).to.equal('1995');
        expect(response.body.title).to.equal('Dilwale Dulhania Le Jayenge (1995)');
        expect(response.body.rating).to.equal('8.2/10');
      });
    done();
  });
  it('get movie details from imdb with id', function (done) {
    request(movieScraperService)
      .get('/api/imdb/getId/name/Panic Room')
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body.movieTitle).to.equal('Panic+Room');
        expect(response.body.titleId).to.equal('tt0258000');
        expect(response.body.url).to.equal('https://www.imdb.com/title/tt0258000');
      });
    done();
  });
  it('get movie details from rottentomatoes using name', function (done) {
    request(movieScraperService)
      .get('/api/rottentomatoes/name/Panic Room')
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal('panic_room');
        expect(response.body.release).to.equal('Mar 29, 2002');
        expect(response.body.rating).to.equal('3.1/5');
        expect(response.body.likes).to.equal('63%')
      });
    done();
  });
});

