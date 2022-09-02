import $ from 'jquery';
import ListInsertUiDataParent from './ListInsertUiDataParent';
// Using commonjs
// require('jquery-validation');
// require('jquery-validation/dist/additional-methods.js');
// Using ESM
import 'jquery-validation';
import 'jquery-validation/dist/additional-methods.js';

class ListInsertValidationEvents extends ListInsertUiDataParent {
  constructor() {
    super();
    this.init();
    // The List Form
    this.theListForm = $('#list-insert-main-form');
    // The Form Submit button is now list-user-validation-button
    this.userValidationButton = $('#list-user-validation-button');
    // The Cancel button
    this.userValidationCancellButton = $('#list-insert-cancel-btn');
    // Setting up events
    this.setEvents();
    // ADDING LETTERS & SPACES ONLY METHOD TO JQ VALIDATION
    $.validator.addMethod(
      'lettersonly',
      function (value, element) {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
      },
      'Letters and spaces only please'
    );
    // ADDING PROPER EMAIL VAIDATION
    $.validator.addMethod(
      'validate_email',
      function (value, element) {
        if (
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            value
          )
        ) {
          return true;
        } else {
          return false;
        }
      },
      'Please enter a valid Email.'
    );
    // TESTING VALIDATE
    this.validateMainInsertForm();
  }

  init = () => {
    console.log('LIST Form Validation New Loaded ...');
  };

  setEvents = () => {
    this.userValidationCancellButton.on('click', this.goBackToFormBox);
  };

  // MAIN FORM VALIDATION
  validateMainInsertForm = () => {
    console.log('validation function clicked new file ...');

    this.theListForm.validate({
      onkeyup: function (element, event) {
        if (event.keyCode === 9 && this.elementValue(element) === '') {
          return;
        } else {
          this.element(element);
        }
      },
      rules: {
        'lister-description': {
          required: true,
          maxlength: 140,
          minlength: 3,
        },
        'lister-name': {
          required: true,
          maxlength: 20,
          minlength: 3,
        },
        'lister-phone': {
          required: true,
          phoneUS: true,
        },
        'lister-email': {
          required: true,
          email: { validate_email: true },
        },
      },
      submitHandler: (form, event) => {
        event.preventDefault();
        // OPEN THE USER VALIDATION SCREEN
        this.displayValidationBox();
      },
    });
  };

  goBackToFormBox = () => {
    // SCROLL TO TOP
    window.scrollTo(0, 0);
    // REMOVING LIST FORM BOX
    this.listInsertFormBox.removeClass('d-none');
    // DISPLAYING USER VALIDATION BOX
    this.userValidationBox.addClass('d-none');
  };
}

export default ListInsertValidationEvents;
