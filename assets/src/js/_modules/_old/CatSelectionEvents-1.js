import $ from 'jquery';
import { selectize } from 'selectize';
import CatSelectDataParent from './CatSelectDataParent';

/**
 This is a child class of CatSelectDataParent class. This handles the Category selection 
 events according to parent/child relationship. This heavily uses the selectize library
 so the library was imported up top as well as the CatSelectDataParent class
 */

class CatSelectionEvents extends CatSelectDataParent {
  constructor() {
    super();
    this.setEvents();
  }

  init = () => {
    // console.log('Cat Data Parent ...');
  };

  setEvents = () => {
    if (this.selectizeMain) {
      this.selectizeMain.on('change', this.mainCatsSelectHandler.bind(this));
    }
    if (this.selectizePrimo) {
      this.selectizePrimo.on('change', this.primoCatsSelectHandler.bind(this));
    }
    if (this.selectizeSecondo) {
      this.selectizeSecondo.on(
        'change',
        this.secondoCatsSelectHandler.bind(this)
      );
    }
  };

  mainCatsSelectHandler() {
    this.selectizePrimo.clear(); // Resets all selected items from selectize
    this.selectizePrimo.clearOptions(); // Removes all options from selectize
    const currentMainId = this.selectizeMain.getValue();
    // console.log(currentMainId);
    // GETTING THE INNER TEXT OF THE CURRENT SELECTED OPTION
    // const currentText = this.selectizeMain.getItem(currentMainId);
    // console.log(currentText[0].innerText);

    if (currentMainId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;
        const selected = data.filter((cat) => cat.mainCatId == currentMainId);
        // console.log(selected[0][0].primo);

        let primoCats = selected[0][0].primo;

        primoCats.map((primoData) => {
          // ADDING ITEMS DYNAMICALLY
          const selectOptions = {
            value: primoData.primoId,
            text: primoData.primoName,
          };
          this.selectizePrimo.addOption(selectOptions);
          // this.selectizePrimo.addItem(0);
          // this.selectizePrimo.addItem(primoData.primoId);
          // this.selectizePrimo.refreshItems();
        });
      });
    }
  }

  primoCatsSelectHandler() {
    // event.stopImmediatePropagation(); // Doesn't work

    this.selectizeSecondo.clear(); // Resets all selected items from selectize
    this.selectizeSecondo.clearOptions(); // Removes all options from selectize

    // COLLECTING MAIN CAT SELECTED ID
    const currentMainId = this.selectizeMain.getValue();
    // console.log('Current Main Cat ID: ', currentMainId);

    // COLLECTED PRIMO CAT SELECTED ID
    const currentPrimoId = this.selectizePrimo.getValue();
    // console.log('Current Primo ID: ', currentPrimoId);

    // COLLECTING DATA FROM FILE READ PROMISE WITHOUT MAKING ANOTHER AJAX CALL
    if (currentMainId && currentPrimoId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;

        // ISOLATING CATS ACCORDING TO MAIN CAT SELECTION AT THE TOP MAIN CAT SELECT
        const selected = data.filter((cat) => cat.mainCatId == currentMainId);
        // COLLECTING SECONDO CATS ACCORDING TO MAN CAT SELECTION AT THE MAIN CAT SELECT
        let secondoCats = selected[0][0].secondo;
        // console.log(secondoCats);

        // FILTERING SECONDO CATS ACCORDING TO PRIMO CAT SELECTED AT THE PRIMO SELECT
        const selectedSecondo = secondoCats.filter(
          (cat) => cat.parentId == currentPrimoId
        );
        // console.log(selectedSecondo);

        // POPULATING SECONDO SELECT WITH FILTERED SECONDO DATA
        selectedSecondo.map((secondoData) => {
          // console.log(secondoData.secondoName, secondoData.secondoId);
          // ADDING ITEMS DYNAMICALLY
          const selectOptions = {
            value: secondoData.secondoId,
            text: secondoData.secondoName,
          };
          this.selectizeSecondo.addOption(selectOptions);
          this.selectizeSecondo.refreshItems();
        });
      });
    }
  }

  secondoCatsSelectHandler() {
    // console.log('clicked secondo seletize');

    this.selectizeTerzo.clear(); // Resets all selected items from selectize
    this.selectizeTerzo.clearOptions(); // Removes all options from selectize

    // COLLECTING MAIN CAT SELECTED ID
    const currentMainId = this.selectizeMain.getValue();
    // console.log('Current Main Cat ID: ', currentMainId);

    // COLLECTED PRIMO CAT SELECTED ID - NO NEED
    // const currentPrimoId = this.selectizePrimo.getValue();
    // console.log('Current Primo ID: ', currentPrimoId);

    // COLLECTED SECONDO CAT SELECTED ID
    const currentSecondoId = this.selectizeSecondo.getValue();
    // console.log('Current Secondo ID: ', currentSecondoId);

    // COLLECTING DATA FROM FILE READ PROMISE WITHOUT MAKING ANOTHER AJAX CALL
    if (currentMainId && currentSecondoId) {
      this.thePromise.then((d) => {
        let data = d.mainCat;

        // ISOLATING CATS ACCORDING TO MAIN CAT SELECTION AT THE TOP MAIN CAT SELECT
        const selected = data.filter((cat) => cat.mainCatId == currentMainId);
        // COLLECTING SECONDO CATS ACCORDING TO MAN CAT SELECTION AT THE MAIN CAT SELECT
        let terzoCats = selected[0][0].terzo;
        // console.log(terzoCats);

        // FILTERING SECONDO CATS ACCORDING TO PRIMO CAT SELECTED AT THE PRIMO SELECT
        const selectedTerzo = terzoCats.filter(
          (cat) => cat.parentId == currentSecondoId
        );
        // console.log(selectedTerzo);

        // POPULATING SECONDO SELECT WITH FILTERED SECONDO DATA
        selectedTerzo.map((terzoData) => {
          // console.log(terzoData.secondoName, terzoData.secondoId);
          // ADDING ITEMS DYNAMICALLY
          const selectOptions = {
            value: terzoData.terzoId,
            text: terzoData.terzoName,
          };
          this.selectizeTerzo.addOption(selectOptions);
          this.selectizeTerzo.refreshItems();
        });
      });
    }
  }
}

export default CatSelectionEvents;
