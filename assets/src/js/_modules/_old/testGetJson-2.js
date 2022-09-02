import $ from 'jquery';
import data from '../../../../data/categories.json';

class TestGetJson {
  constructor() {
    this.catData;
    this.init();
    console.log(this.catData);
  }

  init = () => {
    console.log('Test Get Json ...');

    // GETTING JSON
    fetch('http://selflist-dev.local/wp-content/uploads/categories.json').then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here
      // console.log(data.mainCat[0]);
      // console.log(data.mainCat[0][0]);
      // console.log(data.mainCat[0].mainCatId);
      // console.log(data.mainCat);
      // const catData = data.mainCat;
      // this.showData(catData);
      this.catData = data.mainCat; // DID NOT WORK, RETURNS UNDEFINED

    }).catch(err => {
      // Do something for an error here
      console.error(err);
    });
  };

  showData = (catData) => {
    // console.log(catData);
    catData.map((cat) => {
      console.log(cat);
      console.log(cat.mainCatName, cat.mainCatId);
    });
    // const selected = catData.filter(cat => cat.mainCatId == '4');
    // console.log(selected);
    // console.log(selected[0].mainCatName);
    // console.log(selected[0][0].primo);
    // console.log(selected[0][0]);
    // const secondo = selected[0][0].secondo.filter(sec => sec.parentId == '58');
    // console.log(secondo);
    // const terzo = selected[0][0].terzo.filter(sec => sec.parentId == '61');
    // console.log(terzo);
  }

  setEvents = () => {
    // this.button.on('click', this.clickHandler);
  };

  clickHandler() {
    // console.log('clicked up from Sample Module ...');
    // const page = $(this).data('page');
    // console.log(page);
  }
}

export default TestGetJson;
