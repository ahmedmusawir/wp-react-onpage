import 'babel-polyfill';
import $ from 'jquery';
import axios from 'axios';

class SelflistSearch {
  constructor() {
    this.init();
    // COLLECTING BUTTON
    this.searchInput = $('#selflist-search-input');
    this.searchResultBox = $('#selflist-search-result-box');
    this.paginationNextBtn = $('#list-next-page-btn');
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typeTimer;
    this.totalPages;
    this.currentPageNumber;

    this.setEvents();
  }

  init = () => {
    console.log('SelfList Search Main ...');
  };

  setEvents = () => {
    this.searchInput.on('keyup', this.typeTimeLogic.bind(this));
    this.paginationNextBtn.on('click', this.paginationNext.bind(this));
  };

  typeTimeLogic(e) {
    // console.log('clicked up from Sample Module ...');
    if (this.searchInput.val() != this.previousValue) {
      clearTimeout(this.typeTimer);

      if (this.searchInput.val()) {
        if (!this.isSpinnerVisible) {
          this.searchResultBox.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }

        this.typeTimer = setTimeout(this.getSearchResults.bind(this, 1), 1000);
      } else {
        this.searchResultBox.html('');
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchInput.val();
  }

  async getSearchResults() {
    try {
      const response = await axios.get(
        `${
          selflistData.root_url
        }/wp-json/listings/v1/search?term=${this.searchInput.val()}`
      );
      const listings = response.data;

      console.log(listings);
    } catch (e) {
      console.log(e);
    }
  }

  // getSearchResults = async () => {
  //   try {
  //     const response = axios.get(
  //       selflistData.root_url +
  //         '/wp-json/listings/v1/search?term=' +
  //         this.searchInput.value
  //     );
  //     const listings = response.data;

  //     console.log(listings);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // getSearchResults(currentPageNumber) {
  //   // console.log(`${e.keyCode} ... this key was pressed!`);
  //   // this.searchResultBox.html(`Ajax results go here ...`);

  //   $.getJSON(
  //     `${
  //       selflistData.root_url
  //     }/wp-json/listings/v1/search?term=${this.searchInput.val()}&page=${currentPageNumber}`,
  //     (listings, textStatus, request) => {
  //       // alert(post[0].id);
  //       const totalPages = request.getResponseHeader('X-WP-TotalPages');
  //       // this.currentPageNumber = currentPageNumber;
  //       // const totalPosts = request.getResponseHeader('X-WP-Total');

  //       console.log('Total Pages: ', totalPages);
  //       // console.log('Total Posts: ', totalPosts);
  //       // console.log(`Text Status: ${textStatus}`);

  //       console.log(listings);
  //       this.searchResultBox.html(`
  //       ${
  //         listings.length
  //           ? '<article class="link-list min-list">'
  //           : '<p>No general information matches that search.</p>'
  //       }
  //           ${listings
  //             .map(
  //               (list) => `

  //               <header class="entry-header">
  //                 <h2 class="entry-title">
  //                 ${list.title}
  //                 </h2>
  //                 <h5 class="text-danger list-inline-item"><span class="badge badge-danger">Primo:</span> ${list.subTitlePrimo}</h5>
  //                 <h5 class="text-danger list-inline-item"><span class="badge badge-danger">Secondo:</span> ${list.subTitleSecondo}</h5>
  //                 <h5 class="text-danger list-inline-item"><span class="badge badge-danger">Terzo:</span> ${list.subTitleTerzo}</h5>
  //               </header><!-- .entry-header -->

  //               <div class="entry-content">
  //                 ${list.content}
  //               </div><!-- .entry-content -->

  //               <footer class="entry-footer">
  //               <hr>
  //               </footer><!-- .entry-footer -->

  //             `
  //             )
  //             .join('')}

  //             ${listings.length ? '</article>' : ''}

  //       `);
  //     }
  //   );
  //   this.isSpinnerVisible = false;
  // }

  paginationNext() {
    // console.log('Current: ', currentPageNumber);
    // console.log('Total: ', totalPages);
    const totalPages = 4;
    let currentPage = 1;
    let nextPage = currentPage + 1;

    this.getSearchResults(nextPage);

    console.log('nextPage: ', nextPage);

    if (nextPage >= totalPages) {
      this.paginationNextBtn.addClass('disabled');
    }
  }
}

export default SelflistSearch;
