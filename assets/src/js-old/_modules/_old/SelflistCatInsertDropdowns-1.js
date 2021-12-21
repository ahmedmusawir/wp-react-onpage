import $ from 'jquery';
import { selectize } from 'selectize';

class SelfListCatInsertDropdowns {
  constructor() {
    this.init();
    // COLLECTING BUTTON
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
