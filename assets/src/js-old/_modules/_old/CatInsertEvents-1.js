import $ from 'jquery';
import { selectize } from 'selectize';
import CatInsertDataParent from './CatInsertDataParent';

class CatInsertEvents extends CatInsertDataParent {
  constructor() {
    super();
    this.setEvents();
  }

  init = () => {
    console.log('Cat Data Parent ...');
  };

  setEvents = () => {
    this.selectize.on('change', this.mainCatsSelectHandler.bind(this));
  };

  mainCatsSelectHandler() {
    const currentPrimoId = this.selectize.getValue();
    console.log(currentPrimoId);

    this.thePromise.then((d) => {
      let data = d.mainCat;
      const selected = data.filter(cat => cat.mainCatId == currentPrimoId);
      // console.log(selected);
      // console.log(selected[0].mainCatName);
      // console.log(selected[0][0].primo);

      let primoCats = selected[0][0].primo;

      primoCats.map(primoData => {
        // console.log(primoData.primoName, primoData.primoId);
        // ADDING ITEMS DYNAMICALLY
        const selectOptions = { value: primoData.primoId, text: primoData.primoName };
        this.selectize.addOption(selectOptions);
        this.selectize.addItem(1);
      })
    });
  }
}

export default CatInsertEvents;
