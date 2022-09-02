import $ from 'jquery';

class MainCatInsertEventAjax {
  constructor() {
    // super();
    this.init();
    // COLLECTING ELEMENTS
    // This is the "Create Categories" button in the User Validation popup
    this.submitMainCatBtn = $('#main-cat-insert-submit-btn');
    // This is the final categories display in the Main List Insert Form
    this.createdCategoriesDisplayBox = $('#main-cat-display-ui-box');
    // This is the User Validation popup box
    this.mainCatUserValidationBox = $('#main-cat-user-validation-box');
    // This is the main list insert form container
    this.listInsertFormBox = $('#create-new-list-box');
    // This is the category select dropdown on the main List Insert Page
    this.listInsertCatChoiceBox = $('#category-choice-box');
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
          console.log(res);
          console.log('Ajax Main Cat Insert Success!');
          // STORING CAT DATA IN LOCAL STORAGE
          localStorage.setItem('catData', JSON.stringify(res));
          this.makeUiAfterCatCreation();

        } else {
          $('#ajax-failed-message').append(res);
        }
      })
      .fail((err) => {
        console.log('Ajax Failed With...:');
        console.log(err);
      })
      .always(() => {
        console.log('Ajax Main Cat Insert Complete');
      });
  }

  makeUiAfterCatCreation = () => {

    // $('#ajax-failed-message').append(this.ajaxSuccessMessage);
    $(this.ajaxSuccessMessage).insertBefore('#main-cat-display-ui-box');
    // COLLECTING CAT DATA FROM LOCAL STORAGE
    const catData = JSON.parse(localStorage.getItem('catData'));
    // DISPLAY DATA IN THE MAIN CAT DISPLAY UI BOX
    $('#main-cat-display').text(catData.main_cat);
    $('#primo-cat-display').text(catData.primo_cat);
    $('#secondo-cat-display').text(catData.secondo_cat);
    $('#terzo-cat-display').text(catData.terzo_cat);
    // REMOVE VALIDATION BOX
    this.mainCatUserValidationBox.addClass('d-none');
    // DISPLAY THE DISPLAY BOX
    this.listInsertFormBox.removeClass('d-none');
    this.createdCategoriesDisplayBox.removeClass('d-none');
    this.listInsertCatChoiceBox.addClass('d-none');

  }

}

export default MainCatInsertEventAjax;
