import $ from 'jquery';
import CatInsertDataParent from './CatInsertDataParent';

// LOOK INTO SelflistCatInsertUI.js FILE ... THIS IS NOTHING
class MainCatInsertEventAjax extends CatInsertDataParent {
  constructor() {
    super();
    this.init();
    // COLLECTING SUBMIT BUTTON
    this.submitMainCatBtn = $('#main-cat-insert-submit-btn');
    // COLLECTING AJAX INFO
    this.ajaxUrl = selflistData.ajax_url;
    this.ajaxFunction = 'selflist_main_cat_insert_ajax';
    // AJAX SUCCESS MESSAGE
    this.ajaxSuccessMessage = `
    <div class='alert alert-success rounded-0' role='alert'>
      The Main Category Set has been created successfully! 
    </div>
    `
    // SETTING EVENTS
    this.setEvents();

  }

  init = () => {
    console.log('Main Cat Insert Events ...');
  };

  setEvents = () => {
    this.submitMainCatBtn.on('click', this.mainCatSubmitHandler);
  };

  mainCatSubmitHandler = (e) => {
    e.stopImmediatePropagation();

    console.log('Main Cat Submit Clicked');
    const mainCat = $('#main-input-main-cat').val();
    const primoCat = $('#main-input-primo-cat').val();
    const secondoCat = $('#main-input-secondo-cat').val();
    const terzoCat = $('#main-input-terzo-cat').val();

    console.log(mainCat);
    console.log(primoCat);
    console.log(secondoCat);
    console.log(terzoCat);


    $.ajax({
      url: this.ajaxUrl,
      type: 'post',
      data: {
        mainCat: mainCat,
        primoCat: primoCat,
        secondoCat: secondoCat,
        terzoCat: terzoCat,
        action: this.ajaxFunction,
      },
    })
      .done((res) => {

        if (res.main_cat) {
          $('#ajax-failed-message').append(this.ajaxSuccessMessage);
        } else {
          $('#ajax-failed-message').append(res);
        }

        console.log(res);
        console.log('Ajax Main Cat Insert Success!');

        // console.log('main cat from Ajax Response: ', res.main_cat);
        // console.log('primo cat from Ajax Response: ', res.primo_cat);
        // console.log('secondo cat from Ajax Response: ', res.secondo_cat);
        // console.log('terzo cat from Ajax Response: ', res.terzo_cat);

        // STORING CAT DATA
        localStorage.setItem('catData', JSON.stringify(res));
        // COLLECTING CAT DATA
        const catData = JSON.parse(localStorage.getItem('catData'));
        // console.log('catData from LocalStorage: ', catData);
        // console.log('main cat from LocalStorage: ', catData.main_cat);
        // console.log('primo cat from LocalStorage: ', catData.primo_cat);
        // console.log('secondo cat from LocalStorage: ', catData.secondo_cat);
        // console.log('terzo cat from LocalStorage: ', catData.terzo_cat);

      })
      .fail(() => {
        console.log('Ajax Failed!');
      })
      .always(() => {
        console.log('Ajax Main Cat Insert Complete');
      });
  }

}

export default MainCatInsertEventAjax;
