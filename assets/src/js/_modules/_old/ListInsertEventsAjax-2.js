import $ from 'jquery';
import { selectize } from 'selectize';
import CatSelectDataParent from './CatSelectDataParent';

/**
 This is also a child clas of CatSelectDataParent and uses the selectize library. This one
 Inserts the the List Insert Form data into the WP DB via the REST API. This inserts selectize
 data, normal form data and ACF data into the WP DB
 */

class ListInsertEventsAjax extends CatSelectDataParent {
  constructor() {
    super();
    this.init();
    // COLLECTING ELEMENTS
    this.button = $('#list-insert-button');
    this.catDisplayUiBox = $('#cat-display-ui-box');
    this.catSelectBox = $('#category-choice-box');
    // SETTING EVENTS
    this.setEvents();
  }

  init = () => {
    // console.log('ListInsertEventsAjax - Insert Post');
  };

  setEvents = () => {
    this.button.on('click', this.clickInsertListHandler);
    // this.button.on('click', this.clickInsertHandler);
  };

  clickInsertListHandler = () => {
    // console.log('List Submit Clicked');
    // DECLARING CAT VARIABLES
    let currentMainId;
    let currentPrimoId;
    let currentSecondoId;
    let currentTerzoId;

    // CHECKING FOR CAT SELECT DROPDOWN BOX
    if (this.catSelectBox.hasClass('d-none')) {
      console.log('get cats from local storage');
      const catDataJson = JSON.parse(localStorage.getItem('catData'));
      console.log(catDataJson);
      // COLLECTING MAIN CAT SELECTED ID
      currentMainId = catDataJson.main_cat_id;
      console.log('Current Main Cat ID: ', currentMainId);

      // COLLECTED PRIMO CAT SELECTED ID
      currentPrimoId = catDataJson.primo_cat_id;
      console.log('Current Primo ID: ', currentPrimoId);

      // COLLECTING SECONDO CAT SELECTED ID
      currentSecondoId = catDataJson.secondo_cat_id;
      console.log('Current Secondo Cat ID: ', currentSecondoId);

      // COLLECTED TERZO CAT SELECTED ID
      currentTerzoId = catDataJson.terzo_cat_id;
      console.log('Current Terzo ID: ', currentTerzoId);
    }
    // CHECKING FOR CAT DISPLAY BOX
    if (this.catDisplayUiBox.hasClass('d-none')) {
      console.log('get cats from selectize');
      // COLLECTING MAIN CAT SELECTED ID
      currentMainId = this.selectizeMain.getValue();
      console.log('Current Main Cat ID: ', currentMainId);

      // COLLECTED PRIMO CAT SELECTED ID
      currentPrimoId = this.selectizePrimo.getValue();
      console.log('Current Primo ID: ', currentPrimoId);

      // COLLECTING SECONDO CAT SELECTED ID
      currentSecondoId = this.selectizeSecondo.getValue();
      console.log('Current Secondo Cat ID: ', currentSecondoId);

      // COLLECTED TERZO CAT SELECTED ID
      currentTerzoId = this.selectizeTerzo.getValue();
      console.log('Current Terzo ID: ', currentTerzoId);
    }

    // COLLECTING FORM DATA
    const name = $('#lister-name').val();
    const listTitle = `This List Posted by: ${name}`;
    const address = $('#lister-address').val();
    const description = $('#lister-description').val();
    const categoryIds = `${currentMainId}, ${currentPrimoId}, ${currentSecondoId}, ${currentTerzoId}`;

    console.log(`NAME: ${name}`);
    console.log(`ADDRESS: ${address}`);
    console.log(`DESCRIPTION: ${description}`);
    console.log(`CATEGORY: ${categoryIds}`);

    // PREPARING FORM DATA FOR REST API
    let newPostData = {
      title: listTitle,
      content: description,
      categories: categoryIds,
      'fields[your_name]': name, // ACF Item
      'fields[your_address]': address, // ACF Item
      status: 'publish',
    };

    // AJAX POST INSERT
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', selflistData.nonce);
      },
      url: selflistData.root_url + '/wp-json/wp/v2/posts',
      type: 'POST',
      data: newPostData,
    })
      .done((response) => {
        console.info(response);
        console.log('Awesome! ... Ajax Success');
        // REMOVING CAT DATA FROM THE LOCAL STORAGE FOR CLEANUP
        localStorage.removeItem('catData');
        // REFRESHING THE SCREEN
        location.reload();
      })
      .fail((response) => {
        console.error('Sorry ... Ajax failed');
        console.error(response);
      })
      .always(() => {
        console.info('Ajax finished as always...');
      });

    // RESET FORM
    this.selectizeMain.clear();
    this.selectizePrimo.clear();
    this.selectizeSecondo.clear();
    this.selectizeTerzo.clear();
    $('#lister-name').val('');
    $('#lister-address').val('');
    $('#lister-description').val();
  };
}

export default ListInsertEventsAjax;
