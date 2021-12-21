import $ from 'jquery';
import { selectize } from 'selectize';
import CatInsertDataParent from './CatInsertDataParent';

class CatInsertEvents extends CatInsertDataParent {
  constructor() {
    super();
    this.setEvents();
  }

  init = () => {
    // console.log('Cat Data Parent ...');
  };

  setEvents = () => {
    this.selectizeMain.on('change', this.primoCatsSelectHandler.bind(this));
    this.selectizePrimo.on('change', this.secondoCatsSelectHandler.bind(this));
    // this.selectizeMain.on('change', this.primoCatsSelectHandler.bind(this));
  };

  primoCatsSelectHandler() {
    this.selectizePrimo.clear(); // Resets all selected items from selectize 
    this.selectizePrimo.clearOptions(); // Removes all options from selectize 
    const currentMainId = this.selectizeMain.getValue();
    // console.log(currentMainId);

    if (currentMainId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;
        const selected = data.filter(cat => cat.mainCatId == currentMainId);
        // console.log(selected[0][0].primo);

        let primoCats = selected[0][0].primo;

        primoCats.map(primoData => {
          // ADDING ITEMS DYNAMICALLY
          const selectOptions = { value: primoData.primoId, text: primoData.primoName };
          this.selectizePrimo.addOption(selectOptions);
          // this.selectizePrimo.addItem(0);
          // this.selectizePrimo.addItem(primoData.primoId);
          // this.selectizePrimo.refreshItems();
        })
      });
    }
  }

  secondoCatsSelectHandler() {
    this.selectizeSecondo.clear(); // Resets all selected items from selectize 
    this.selectizeSecondo.clearOptions(); // Removes all options from selectize 
    const currentPrimoId = this.selectizePrimo.getValue();
    console.log(currentPrimoId);
    // console.log(this.thePromise);

    if (currentPrimoId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;
        const selected = data.filter(cat => cat.mainCatId == currentMainId);
        // console.log(selected[0][0].primo);

        let primoCats = selected[0][0].primo;
        // let data = d.mainCat;
        // console.log(data[0][0].primo);
        // console.log(data[0][0].secondo);

        // const selected = data[0][0].secondo.filter(cat => cat.parentId == currentPrimoId);
        // console.log(selected);
        // console.log(selected[0].mainCatName);
        // console.log(selected[0][0].secondo);

        // let secondoCats = selected[0][0].secondo;
        // console.log(secondoCats);

        // secondoCats.map(secondoData => {
        //   // console.log(secondoData.secondoName, secondoData.secondoId);
        //   // ADDING ITEMS DYNAMICALLY
        //   const selectOptions = { value: secondoData.secondoId, text: secondoData.secondoName };
        //   this.selectizePrimo.addOption(selectOptions);
        //   this.selectizePrimo.addItem(secondoData.secondoId);
        //   // this.selectizePrimo.refreshItems();
        // });
      });
    }
  }
}

export default CatInsertEvents;
