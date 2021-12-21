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
    this.selectizeMain.on('change', this.mainCatsSelectHandler.bind(this));
    this.selectizePrimo.on('change', this.primoCatsSelectHandler.bind(this));
    // this.selectizeMain.on('change', this.mainCatsSelectHandler.bind(this));
  };

  mainCatsSelectHandler() {
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

  primoCatsSelectHandler() {
    this.selectizeSecondo.clear(); // Resets all selected items from selectize 
    this.selectizeSecondo.clearOptions(); // Removes all options from selectize 

    // COLLECTING MAIN CAT SELECTED ID
    const currentMainId = this.selectizeMain.getValue();
    console.log('Current Main Cat ID: ', currentMainId);

    // COLLECTED PRIMO CAT SELECTED ID
    const currentPrimoId = this.selectizePrimo.getValue();
    console.log('Current Primo ID: ', currentPrimoId);

    if (currentMainId && currentPrimoId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;

        // ISOLATING CATS ACCORDING TO MAIN CAT SELECTION AT THE TOP MAIN CAT SELECT
        const selected = data.filter(cat => cat.mainCatId == currentMainId);
        // COLLECTING SECONDO CATS ACCORDING TO MAN CAT SELECTION AT THE MAIN CAT SELECT
        let secondoCats = selected[0][0].secondo;
        // console.log(secondoCats);

        // FILTERING SECONDO CATS ACCORDING TO PRIMO CAT SELECTED AT THE PRIMO SELECT 
        const selectedSecondo = secondoCats.filter(cat => cat.parentId == currentPrimoId);
        // console.log(selectedSecondo);

        // POPULATING SECONDO SELECT WITH FILTERED SECONDO DATA 
        selectedSecondo.map(secondoData => {
          // console.log(secondoData.secondoName, secondoData.secondoId);
          // ADDING ITEMS DYNAMICALLY
          const selectOptions = { value: secondoData.secondoId, text: secondoData.secondoName };
          this.selectizeSecondo.addOption(selectOptions);
          this.selectizeSecondo.refreshItems();
        });
      });
    }
  }

  _primoCatsSelectHandler() {
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
