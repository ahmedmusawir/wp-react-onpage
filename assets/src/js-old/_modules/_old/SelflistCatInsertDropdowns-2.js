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
      // console.log(cat.mainCat);
      let data = d.mainCat;
      // console.log(data);
      data.map(catData => {
        console.log(catData.mainCatName, catData.mainCatId);
        // SETTING UP SELECTIZE
        // const selectMainCats = $('#select-main-cats').selectize().unlock();
        // ADDING ITEMS DYNAMICALLY
        const selectOptions = { value: catData.mainCatId, text: catData.mainCatName };

        // this.selectize = selectMainCats[0].selectize;
        this.selectize.addOption(selectOptions);
        this.selectize.addItem(1);
      })
    });
  }

  setEvents = () => {
    this.selectize.on('change', this.mainCatsSelectHandler.bind(this));
  };

  mainCatsSelectHandler() {
    // console.log(`Selecting main cat`);
    const selectOptions = { value: 'bar', text: 'foo' };
    this.selectize.addOption(selectOptions);
    // this.selectize.addOption({ value: 'bar', text: 'foo' });
    this.selectize.addItem(1);
    // const wtf = $('#select-main-cats').get(0);
    // console.log(wtf);
    const selectize = $('#select-main-cats').get(0).selectize;

    const current = selectize.getValue();
    console.log(current);
  }
}

export default SelfListCatInsertDropdowns;
