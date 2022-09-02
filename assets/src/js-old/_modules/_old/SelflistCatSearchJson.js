import $ from 'jquery';
// FOLLOWING NEEDED EVERY TIME ASYNC AWAIT IS USED
import regeneratorRuntime from 'regenerator-runtime';

class SelflistCatSearch {
  constructor() {
    // COLLECTING ELEMENTS
    this.typingTimer;
    this.spinnerVisible;
    this.previousValue;
    this.search = $('#cat-search-input-json');
    this.searchResultBox = $('#category-search-json-result');
    // SITE ROOT URL FROM WP LOCALIZE SCRIPT
    this.siteRoot = selflistData.root_url;
    // COLLECTION DATA
    this.theJsonData;
    this.url = this.siteRoot + '/wp-content/uploads/categories.json';
    this.getData();

    // SETTING EVENTS
    this.setEvents();
    // this.init();
  }

  init = () => {
    console.log('Selflist cat list ...');
  };

  getData = async () => {
    try {
      let response = await fetch(this.url);
      let data = await response.json();
      // CLEARING THE ZERO LIST COUNT ONES
      this.theJsonData = data.filter((main) => main.mainCount != 0);
      console.info(this.theJsonData);
    } catch (e) {
      console.log(e);
    }
  };

  setEvents = () => {
    this.search.on('keyup', this.searchHandler);
  };

  searchHandler = () => {
    // SETTING SEARCH INPUT TEXT TO LOWER CASE
    const inputText = this.search.val().toLowerCase();
    // MAKING ARROW KEYS, CTRL, ATL ETC. HAVE NO IMPACT ON THE SEARCH INPUT
    if (inputText != this.previousValue) {
      // CLEARING PREVIOUS TIME OUT FOR KEY PRESS
      clearTimeout(this.typingTimer);
      // LOADING SPINNER
      if (!this.spinnerVisible) {
        this.searchResultBox.html('<span class="loading-spinner"></span>');
        this.spinnerVisible = true;
      }
      // SETTING TIME OUT FOR KEY PRESS
      this.typingTimer = setTimeout(() => {
        // CALLING SEARCH FUNCTION
        this.searchJsonData(inputText);
      }, 2000);
    }

    this.previousValue = inputText;
  };

  searchJsonData = (inputText) => {
    this.searchResultBox.html('');

    if (inputText) {
      this.theJsonData.map((mainCat) => {
        const mainCatTitle = mainCat.mainCatName;
        const mainCatTitleJson = mainCatTitle.toLowerCase();

        if (mainCatTitleJson.indexOf(inputText) != -1) {
          console.log(`
          Main Cat: ${mainCat.mainCatName}
          ---------------------------------------
          `);
          // COLLECTING ALL PRIMO CATS
          const primoCats = mainCat[0].primo;
          // CLEARING THE ZERO LIST COUNT ONES
          const primoCatsWithList = primoCats.filter(
            (primo) => primo.primoCount != 0
          );

          // LOOPING THRU ALL PRIMO CATS UNDER A MAIN CAT
          primoCatsWithList.map((primo) => {
            console.info(primo.primoName);
            // COLLECTING ALL THE SECONDO CATS
            const secondoCats = mainCat[0].secondo;
            // CLEARING THE ZERO LIST COUNT ONES
            const secondoCatsWithList = secondoCats.filter(
              (secondo) => secondo.secondoCount != 0
            );
            // FILTERING SECONDO CATS ACCORDING TO PRIMO CATS
            const childSecondo = secondoCatsWithList.filter(
              (secondo) => secondo.parentId == primo.primoId
            );
            console.info(childSecondo);

            // LOOPING THRU ALL SECONDO TO GET THE TERZOS
            secondoCats.map((secondo) => {
              // COLLECTING ALL THE TERZO CATS
              const terzoCats = mainCat[0].terzo;
              // CLEARING THE ZERO LIST COUNT ONES
              const terzoCatsWithList = terzoCats.filter(
                (terzo) => terzo.terzoCount != 0
              );
              // FILTERING SECONDO CATS ACCORDING TO PRIMO CATS
              const childTerzo = terzoCatsWithList.filter(
                (terzo) => terzo.parentId == secondo.secondoId
              );
              console.info(childTerzo);
            });
          });
          this.displaySearchResults(mainCatTitle);
        }
      });
    } else {
      this.spinnerVisible = false;
      this.searchResultBox.html('');
    }
  };

  displaySearchResults = (mainCatTitle) => {
    this.searchResultBox.append(`<h5>${mainCatTitle}</h5>`);
    this.spinnerVisible = false;
  };
}

export default SelflistCatSearch;
