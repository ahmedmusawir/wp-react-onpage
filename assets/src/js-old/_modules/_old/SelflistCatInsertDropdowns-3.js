import $ from 'jquery';
import { selectize } from 'selectize';

class SelfListCatInsertDropdowns {
  constructor() {
    this.init();
    // COLLECTION DATA
    this.url = 'http://selflist-dev.local/wp-content/uploads/categories.json';
    this.thePromise = this.getData(this.url);
    this.showData(this.thePromise);

    // SETTING UP SELECTIZE
    this.selectMainCats = $('#select-main-cats').selectize({
      sortField: 'text'
    });
    // ADDING ITEMS DYNAMICALLY
    this.selectize = this.selectMainCats[0].selectize;

    this.setEvents();
  }

  init = () => {
    console.log('Cat Insert Dropdowns ...');
  };

  async getData(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;

    } catch (e) {
      console.log(e);
    }
  }

  showData = (thePromise) => {
    // console.log(thePromise);
    thePromise.then((d) => {
      let data = d.mainCat;
      data.map(catData => {
        // console.log(catData.mainCatName, catData.mainCatId);
        // ADDING ITEMS DYNAMICALLY
        const selectOptions = { value: catData.mainCatId, text: catData.mainCatName };
        this.selectize.addOption(selectOptions);
        this.selectize.addItem(1);
      })
    });
  }

  setEvents = () => {
    this.selectize.on('change', this.mainCatsSelectHandler.bind(this));
  };

  mainCatsSelectHandler() {
    const current = this.selectize.getValue();
    console.log(current);
  }
}

export default SelfListCatInsertDropdowns;
