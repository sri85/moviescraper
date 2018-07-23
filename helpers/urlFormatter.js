
class UrlFormatter {
  constructor() {

  }
  searchIMDBWithTitleId(id) {
    return `https://www.imdb.com/title/${id}`;
  }
  searchIMDBWithMovieTitle(movieTitle) {
    return `https://www.imdb.com/find?ref_=nv_sr_fn&q=${movieTitle}e&s=all`;

  }

  sanitizeUrl(movieSite,title) {
    switch (movieSite.toLowerCase()){
      case 'imdb':
        return title.trim().replace(/\s/g, "+");
      case 'rottentomatoes':
        return title.replace(/\s/g, "_").toLowerCase();
      default:
        return undefined;
    }
  }


}

module.exports = new UrlFormatter;