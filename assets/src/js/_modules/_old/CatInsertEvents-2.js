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
    this.selectizeMain.on('change', this.mainCatsSelectHandler.bind(this));
  };

  mainCatsSelectHandler() {
    this.selectizePrimo.clear(); // Resets all selected items from selectize 
    this.selectizePrimo.clearOptions(); // Removes all options from selectize 
    const currentMainId = this.selectizeMain.getValue();
    console.log(currentMainId);

    if (currentMainId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;
        const selected = data.filter(cat => cat.mainCatId == currentMainId);
        // console.log(selected);
        // console.log(selected[0].mainCatName);
        console.log(selected[0][0].primo);

        let primoCats = selected[0][0].primo;
        // console.log(primoCats);

        primoCats.map(primoData => {
          // console.log(primoData.primoName, primoData.primoId);
          // ADDING ITEMS DYNAMICALLY
          const selectOptions = { value: primoData.primoId, text: primoData.primoName };
          this.selectizePrimo.addOption(selectOptions);
          this.selectizePrimo.addItem(primoData.primoId);
          // this.selectizePrimo.refreshItems();
        })
      });
    }

  }
}

export default CatInsertEvents;
