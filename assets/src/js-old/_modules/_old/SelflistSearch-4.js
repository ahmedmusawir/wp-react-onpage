import $ from 'jquery';

class SelflistSearch {
  constructor() {
    this.init();
    // COLLECTING BUTTON
    this.searchInput = $('#selflist-search-input');
    this.searchResultBox = $('#selflist-search-result-box');
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typeTimer;
    this.setEvents();
  }

  init = () => {
    console.log('SelfList Search Main ...');
  };

  setEvents = () => {
    this.searchInput.on('keyup', this.typeTimeLogic.bind(this));
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

        this.typeTimer = setTimeout(this.getSearchResults.bind(this, e), 1000);
      } else {
        this.searchResultBox.html('');
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchInput.val();
  }

  getSearchResults(e) {
    // console.log(`${e.keyCode} ... this key was pressed!`);
    // this.searchResultBox.html(`Ajax results go here ...`);
    $.getJSON(
      `http://selflist-dev.local/wp-json/listings/v1/search?term=${this.searchInput.val()}`,
      (listings) => {
        // alert(post[0].id);
        // const totalPages = listings.headers('X-WP-TotalPages');
        // console.log(`Total Pages: ${totalPages}`);

        console.log(listings);
        this.searchResultBox.html(`
        ${
          listings.length
            ? '<article class="link-list min-list">'
            : '<p>No general information matches that search.</p>'
        }
            ${listings
              .map(
                (list) => `

                <header class="entry-header">
                  <h2 class="entry-title">
                  ${list.title}
                  </h2>
                </header><!-- .entry-header -->

              
                <div class="entry-content">
                  ${list.content}
                </div><!-- .entry-content -->
          
                <footer class="entry-footer">
                </footer><!-- .entry-footer -->
              
              `
              )
              .join('')}

              ${listings.length ? '</article>' : ''}

        `);
      }
    );

    this.isSpinnerVisible = false;
  }
}

export default SelflistSearch;
