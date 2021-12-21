import $ from 'jquery';

class SelflistSearch {
  constructor() {
    this.init();
    // COLLECTING BUTTON
    this.searchInput = $('#selflist-search-input');
    this.searchResultBox = $('#selflist-search-result-box');
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
    clearTimeout(this.typeTimer);
    this.typeTimer = setTimeout(this.getSearchResults.bind(this, e), 1000);
  }

  getSearchResults(e) {
    // console.log(`${e.keyCode} ... this key was pressed!`);
    this.searchResultBox.html('<div class="spinner-loader"></div>');
    this.searchResultBox.append(`

    <article id="post-192" class="post-192 listings type-listings status-publish hentry">
      <header class="entry-header">
        <h2 class="entry-title">
          Tutoring Copy 1
        </h2>
      </header><!-- .entry-header -->


      <div class="entry-content">
        <p>
          Private tutoring, Houston Heights location, Certified Teachers. 27 years experience in both Public and Private
          schools. Payment cash $100 per 190 minute session. Bernadette Sweeny

        </p>
      </div><!-- .entry-content -->

      <footer class="entry-footer">
      </footer><!-- .entry-footer -->
    </article>
    
    `);
  }

  // typeTimeLogic(e) {
  //   // console.log('clicked up from Sample Module ...');
  //   clearTimeout(this.typeTimer);
  //   this.typeTimer = setTimeout(() => {
  //     console.log(`${e.keyCode} ... this key was pressed!`);
  //   }, 1000);
  // }
}

export default SelflistSearch;
