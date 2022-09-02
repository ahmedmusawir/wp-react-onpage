import $ from 'jquery';
require('jquery-validation');

class MainCatFormValdation {
  constructor() {
    this.init();
    // COLLECTING BUTTON
    // This is the User Validation Button "Submit" on Main Cat Insert From
    this.mainCatUserValidationBtn = $('#main-cat-user-validation-btn');
    // This is the Cancel button on the Use Validation Popup
    this.mainCatUserValidationCancelBtn = $('#main-cat-insert-cancel-btn');
    // This is the User Validation popup box
    this.mainCatUserValidationBox = $('#main-cat-user-validation-box');
    // This is the main category insert form container
    this.mainCatInsertFormBox = $('#main-cat-insert-box');
    // SETTING EVENTS
    this.setEvents();
    // ADDING LETTERS & SPACES ONLY METHOD TO JQ VALIDATION
    $.validator.addMethod("lettersonly", function (value, element) {
      return this.optional(element) || /^[a-z ]+$/i.test(value);
    }, "Letters and spaces only please");
  }

  init = () => {
    console.log('MAIN CAT Form Val Test Loaded ...');
  };

  setEvents = () => {
    this.mainCatUserValidationBtn.on('click', this.mainCatValicationHandler);
    this.mainCatUserValidationCancelBtn.on('click', this.mainCatUserValidationCancelHandler);
  }

  mainCatUserValidationCancelHandler = () => {
    // console.log('cancel btn clicked');
    // Displaying the insert form
    this.mainCatInsertFormBox.removeClass('d-none');
    // Maing the main cat user validation popup invisible
    this.mainCatUserValidationBox.addClass('d-none');
  }

  mainCatValicationHandler = (e) => {
    console.log("Main Form Val Test clicked");
    // const $this = this;

    $('#main-cat-insert-form').validate({
      rules: {
        'main-input-main-cat': { lettersonly: true, maxlength: 25, minlength: 3 },
        'main-input-primo-cat': { lettersonly: true, maxlength: 20, minlength: 3 },
        'main-input-secondo-cat': { lettersonly: true, maxlength: 20, minlength: 3 },
        'main-input-terzo-cat': { lettersonly: true, maxlength: 20, minlength: 3 }
      },
      submitHandler: (form, event) => {
        event.preventDefault();
        // OPEN THE USER VALIDATION SCREEN
        this.getUserValidationScreen();
      }
    });
  }

  getUserValidationScreen = () => {
    // Hiding the insert form
    this.mainCatInsertFormBox.addClass('d-none');
    // Maing the main cat user validation popup visible
    this.mainCatUserValidationBox.removeClass('d-none');

    // COLLECTING CAT INPUT DATA
    const mainCatInputValue = $('#main-input-main-cat').val();
    const primoCatInputValue = $('#main-input-primo-cat').val();
    const secondoCatInputValue = $('#main-input-secondo-cat').val();
    const terzoCatInputValue = $('#main-input-terzo-cat').val();

    // INSERTING INTO USER VALIDATION PAGE
    $('#main-input').text(mainCatInputValue);
    $('#primo-input').text(primoCatInputValue);
    $('#secondo-input').text(secondoCatInputValue);
    $('#terzo-input').text(terzoCatInputValue);
    // CLEANING UP AJAX ERROR MESSAGES
    $('#ajax-failed-message').html('');
  }

}

export default MainCatFormValdation;
