import 'babel-polyfill';
import $ from 'jquery';
import axios from 'axios';

class SelflistSearch {
  constructor() {
    this.init();
    // COLLECTING BUTTON
    this.searchInput = $('#selflist-search-input');
    this.searchResultBox = $('#selflist-search-result-box');
    this.listIndexPaginationBox = $('.list-index-pagination-box');
    this.paginationNextBtn = $('#list-next-page-btn');
    this.paginationPrevBtn = $('#list-prev-page-btn');
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typeTimer;
    this.totalPages;
    this.currentPage;

    this.setEvents();
  }

  init = () => {
    // console.log('SelfList Search Main ...');
  };

  setEvents = () => {
    this.searchInput.on('keyup', this.typeTimeLogic.bind(this));
    this.paginationNextBtn.on('click', this.paginationNext.bind(this));
    this.paginationPrevBtn.on('click', this.paginationPrev.bind(this));
  };

  typeTimeLogic(e) {
    // console.log('clicked up from Sample Module ...');
    if (this.searchInput.val() != this.previousValue) {
      clearTimeout(this.typeTimer);

      if (this.searchInput.val()) {
        if (!this.isSpinnerVisible) {
          if (!this.listIndexPaginationBox.hasClass('d-none')) {
            this.listIndexPaginationBox.addClass('d-none');
            // this.listIndexPaginationBox.css('background-color', 'yellow');
          }
          this.searchResultBox.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }

        this.typeTimer = setTimeout(this.getSearchResults.bind(this, 1), 1000);
      } else {
        this.searchResultBox.html('');
        this.isSpinnerVisible = false;
        this.listIndexPaginationBox.addClass('d-none');
      }
    }

    this.previousValue = this.searchInput.val();
  }

  async getSearchResults(currentPage) {
    try {
      const response = await axios.get(
        `${
          selflistData.root_url
        }/wp-json/listings/v1/search?term=${this.searchInput.val()}&page=${currentPage}`
      );
      const listings = response.data;
      this.totalPages = response.headers['x-wp-totalpages'];
      this.currentPage = currentPage;

      this.showListings(listings);

      this.makePagination(this.currentPage, this.totalPages);

      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  makePagination = (currentPage, totalPages) => {
    console.log('Current Page: ', currentPage);
    console.log('Total Pages: ', totalPages);

    if (Number(totalPages) > 1) {
      this.listIndexPaginationBox.removeClass('d-none');

      if (currentPage <= 1) {
        this.paginationPrevBtn.addClass('disabled');
        this.paginationNextBtn.removeClass('disabled');
      }
    } else {
      this.listIndexPaginationBox.addClass('d-none');
    }
  };

  paginationNext() {
    let nextPage = +this.currentPage + 1;

    this.getSearchResults(nextPage);

    console.log('nextPage: ', nextPage);

    if (nextPage >= this.totalPages) {
      this.paginationNextBtn.addClass('disabled');
    }
    if (nextPage > 1) {
      this.paginationPrevBtn.removeClass('disabled');
    }
  }

  paginationPrev() {
    let prevPage = +this.currentPage - 1;

    this.getSearchResults(prevPage);

    console.log('prevPage: ', prevPage);

    if (prevPage <= 1) {
      this.paginationPrevBtn.addClass('disabled');
      this.paginationNextBtn.removeClass('disabled');
    }
  }

  showListings = (listings) => {
    this.searchResultBox.html(`
        ${
          listings.length
            ? '<article class="single-list-item">'
            : '<p>No general information matches that search.</p>'
        }
            ${listings
              .map(
                (list) => `

                <header class="entry-header">
                  <h2 class="entry-title">
                  ${list.title}
                  </h2>
                  <h5 class="text-danger list-inline-item"><span class="badge badge-danger">Primo:</span> ${list.subTitlePrimo}</h5>
                  <h5 class="text-danger list-inline-item"><span class="badge badge-danger">Secondo:</span> ${list.subTitleSecondo}</h5>
                  <h5 class="text-danger list-inline-item"><span class="badge badge-danger">Terzo:</span> ${list.subTitleTerzo}</h5>
                </header><!-- .entry-header -->

                <div class="entry-content">
                  ${list.content}
                </div><!-- .entry-content -->

                <footer class="entry-footer">
                <hr>
                </footer><!-- .entry-footer -->

              `
              )
              .join('')}

              ${listings.length ? '</article>' : ''}

        `);
    this.isSpinnerVisible = false;
  };
}

export default SelflistSearch;
