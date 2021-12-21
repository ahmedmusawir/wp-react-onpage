import $ from 'jquery';

class SelflistCatSearch {
  constructor() {
    // COLLECTING SEARCH INPUT
    this.search = $('#cat-search-input');

    // SETTING EVENTS
    this.setEvents();
    this.init();
  }

  init = () => {
    console.log('Selflist cat list ...');
  };

  setEvents = () => {
    this.search.on('keyup', this.searchHandler.bind(this));
  };

  searchHandler() {
    // SETTING SEARCH INPUT TEXT TO LOWER CASE
    const searchText = this.search.val().toLowerCase();
    // COLLECTING DATA CARDS
    const cards = $('.card');

    cards.each((i, elm) => {
      const title = $(elm).children().find('.card-title').text().toLowerCase();
      if (title.indexOf(searchText) != -1) {
        $(elm).removeClass('d-none');
        $(elm).removeClass('animate__bounceOut');
        $(elm).addClass('animate__bounceIn');
      } else {
        $(elm).removeClass('animate__zoomIn');
        $(elm).addClass('animate__bounceOut');

        setTimeout(() => {
          $(elm).addClass('d-none');
        }, 500);
      }
    });
  }
}

export default SelflistCatSearch;
