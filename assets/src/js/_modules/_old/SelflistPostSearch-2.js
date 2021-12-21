import $ from 'jquery';

class SelflistPostSearch {
  constructor() {
    // COLLECTING SEARCH INPUT
    this.searchInput = $('#post-search-input');
    this.typingTimer;

    // SETTING EVENTS
    this.setEvents();
    this.init();
  }

  init = () => {
    console.log('Selflist post search ...');
  };

  setEvents = () => {
    // this.searchInput.on('keyup', this.typeTimeLogic.bind(this));
    this.searchInput.on('keyup', this.searchHandler.bind(this));
  };

  // typeTimeLogic(e) {
  //   // console.log('type logic');
  //   clearTimeout(this.typingTimer);
  //   this.typingTimer = setTimeout(() => {
  //     // console.log(this.searchInput.val().toLowerCase());
  //     const searchText = this.searchInput.val().toLowerCase();
  //     // console.log(searchText);
  //     this.searchHandler(searchText);

  //     // console.log('type logic set time out');
  //   }, 1000);
  // }

  searchHandler() {
    // SETTING SEARCH INPUT TEXT TO LOWER CASE
    const inputText = this.searchInput.val().toLowerCase();

    // COLLECTING DATA CARDS
    const cards = $('.post-item');

    cards.each(function (i, elm) {
      // console.log(elm);
      const postContent = $(elm).find('#post-content').text().toLowerCase();
      // console.log(test);
      if (postContent.indexOf(inputText) != -1) {
        $(elm).removeClass('d-none');
        $(elm).removeClass('animate__zoomOut');
        $(elm).addClass('animate__zoomIn');

        //=========================================

        var src_str = $(elm).find('#post-content').text();
        var term = inputText;
        term = term.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');
        var pattern = new RegExp('(' + term + ')', 'gi');

        src_str = src_str.replace(pattern, '<mark>$1</mark>');
        src_str = src_str.replace(
          /(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,
          '$1</mark>$2<mark>$4'
        );

        $('#post-content').html(src_str);

        //=========================================
      } else {
        $(elm).removeClass('animate__zoomIn');
        $(elm).addClass('animate__zoomOut');
        // $(elm).addClass('d-none');

        setTimeout(() => {
          $(elm).addClass('d-none');
        }, 500);
      }
    });
  }
}

export default SelflistPostSearch;
