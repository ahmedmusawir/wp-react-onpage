import $ from 'jquery';

class CatInsertEventAjaxParent {
  constructor() {
    // super();
    // this.init();
    // COLLECTING ELEMENTS
    // This is the main list insert form container
    this.listInsertFormBox = $('#create-new-list-box');
    // This is the final categories display in the Main List Insert Form
    this.createdCategoriesDisplayBox = $('#cat-display-ui-box');
    // This is the category select dropdown on the main List Insert Page
    this.listInsertCatChoiceBox = $('#category-choice-box');
    // COLLECTING AJAX INFO
    this.ajaxUrl = selflistData.ajax_url;
    this.ajaxFunction = '';
    // AJAX SUCCESS MESSAGE
    this.ajaxSuccessMessage = `
    <div class='alert alert-success rounded-0' role='alert'>
      The Category Set has been created successfully! 
    </div>
    `;
  }

  init = () => {
    console.log('Cat Insert Events Parent...');
  };

  catSubmitHandler = (e) => {
    e.stopImmediatePropagation();

    // AJAX DATA POINTS DECLARED
    let mainCat;
    let primoCat;
    let secondoCat;
    let terzoCat;

    // MAIN CAT DATA SET
    if (this.mainCatUserValidationBox) {
      this.ajaxFunction = 'main_cat_insert_ajax';

      mainCat = $('#main-input-main-cat').val().toLowerCase();
      primoCat = $('#main-input-primo-cat').val().toLowerCase();
      secondoCat = $('#main-input-secondo-cat').val().toLowerCase();
      terzoCat = $('#main-input-terzo-cat').val().toLowerCase();
    }
    // PRIMO CAT DATA SET
    if (this.primoCatUserValidationBox) {
      this.ajaxFunction = 'primo_cat_insert_ajax';

      mainCat = $('#primo-main-cat').text().toLowerCase();
      primoCat = $('#primo-input-primo-cat').val().toLowerCase();
      secondoCat = $('#primo-input-secondo-cat').val().toLowerCase();
      terzoCat = $('#primo-input-terzo-cat').val().toLowerCase();
    }
    // SECONDO CAT DATA SET
    if (this.secondoCatUserValidationBox) {
      this.ajaxFunction = 'secondo_cat_insert_ajax';

      mainCat = $('#secondo-main-cat').text().toLowerCase();
      primoCat = $('#secondo-primo-cat').text().toLowerCase();
      secondoCat = $('#secondo-input-secondo-cat').val().toLowerCase();
      terzoCat = $('#secondo-input-terzo-cat').val().toLowerCase();
    }
    // TERZO CAT DATA SET
    if (this.terzoCatUserValidationBox) {
      this.ajaxFunction = 'terzo_cat_insert_ajax';

      mainCat = $('#terzo-main-cat').text().toLowerCase();
      primoCat = $('#terzo-primo-cat').text().toLowerCase();
      secondoCat = $('#terzo-secondo-cat').text().toLowerCase();
      terzoCat = $('#terzo-input-terzo-cat').val().toLowerCase();
    }

    // CATEGORY DATA ENTRY INTO DB VIA AJAX
    console.log(this.ajaxFunction);

    $.ajax({
      url: this.ajaxUrl,
      type: 'post',
      data: {
        mainCat,
        primoCat,
        secondoCat,
        terzoCat,
        action: this.ajaxFunction,
      },
    })
      .done((res) => {
        // console.log(res);
        console.log('res.main_cat : ', res.main_cat);
        console.log('res.primo_cat : ', res.primo_cat);
        console.log('res.secondo_cat : ', res.secondo_cat);
        console.log('res.terzo_cat : ', res.terzo_cat);

        if (res.main_cat || res.primo_cat || res.secondo_cat || res.terzo_cat) {
          console.log(res);
          console.log('Ajax Main Cat Insert Success!');
          // STORING CAT DATA IN LOCAL STORAGE
          localStorage.setItem('catData', JSON.stringify(res));
          this.makeUiAfterCatCreation();
        } else {
          $('#ajax-failed-message-1').append(res);
          $('#ajax-failed-message-2').append(res);
          $('#ajax-failed-message-3').append(res);
          $('#ajax-failed-message-4').append(res);
        }
      })
      .fail((err) => {
        console.log('Ajax Failed With...:');
        console.log(err);
      })
      .always(() => {
        // console.log('Ajax Cat Insert Complete');
      });
  };

  makeUiAfterCatCreation = () => {
    // $('#ajax-failed-message').append(this.ajaxSuccessMessage);
    $(this.ajaxSuccessMessage).insertBefore('#cat-display-ui-box');
    // COLLECTING CAT DATA FROM LOCAL STORAGE
    const catData = JSON.parse(localStorage.getItem('catData'));
    // DISPLAY DATA IN THE MAIN CAT DISPLAY UI BOX
    $('#main-cat-display').text(catData.main_cat);
    $('#primo-cat-display').text(catData.primo_cat);
    $('#secondo-cat-display').text(catData.secondo_cat);
    $('#terzo-cat-display').text(catData.terzo_cat);
    // REMOVE VALIDATION BOX
    // Main Category Validation Box Check
    if (this.mainCatUserValidationBox) {
      this.mainCatUserValidationBox.addClass('d-none');
    }
    // Primo Category Validation Box Check
    if (this.primoCatUserValidationBox) {
      this.primoCatUserValidationBox.addClass('d-none');
    }
    // Secondo Category Validation Box check
    if (this.secondoCatUserValidationBox) {
      this.secondoCatUserValidationBox.addClass('d-none');
    }
    // Terzo Cetory Validation Box check
    if (this.terzoCatUserValidationBox) {
      this.terzoCatUserValidationBox.addClass('d-none');
    }
    // DISPLAY THE DISPLAY BOX
    this.listInsertFormBox.removeClass('d-none');
    this.createdCategoriesDisplayBox.removeClass('d-none');
    this.listInsertCatChoiceBox.addClass('d-none');
  };
}

export default CatInsertEventAjaxParent;
