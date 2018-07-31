

const movieScraperService = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.should();
chai.use(chaiHttp);


describe('Moviescraper test suite', () => {

  it('returns status code 200', (done) => {
    chai.request(movieScraperService)
      .get('/api/imdb/getMovieDetails/id/tt0112870')
      .end((err, res) => expect(res).to.have.status(200));
    done();
  });
  it('Checks the content type', (done) => {
    chai.request(movieScraperService)
      .get('/api/imdb/getMovieDetails/id/tt0112870')
      .end((err, res) => expect(res).to.be.json);
    done();
  });

  it('Check for Error', (done) => {
    chai.request(movieScraperService)
      .get('/api/imdb/getMovieDetails/id/tt0112870')
      .end((err, res) => expect(res.text).to.equal('{\n' +
        '    "title": "Dilwale Dulhania Le Jayenge (1995)",\n' +
        '    "release": "1995",\n' +
        '    "rating": "8.2/10"\n' +
        '}'));
    done();
  });
});
