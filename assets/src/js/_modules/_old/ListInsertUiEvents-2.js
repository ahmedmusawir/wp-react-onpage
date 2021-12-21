import $ from 'jquery';
import CatSelectDataParent from './CatSelectDataParent';
require('jquery-validation');

class ListInsertUiEvents extends CatSelectDataParent {
  constructor() {
    super();

    // this.init();
    // This is the main list insert form container.
    // Common for all Category insert UI/UX
    this.listInsertFormBox = $('#create-new-list-box');
    // The User Validation Box
    this.userValidationBox = $('#list-insert-user-validation-box');
    // Category Selectized dropdowns
    this.catSelectBox = $('#category-choice-box');
    // Category Display UI box that shows up at the top once a new category is created
    this.catDisplayUiBox = $('#cat-display-ui-box');
    // The Form Submit button is now list-user-validation-button
    // this.userValidationButton = $('#list-user-validation-button');
    // The Cancel button
    // this.userValidationCancellButton = $('#list-insert-cancel-btn');
    // Declaring Catagory VARIABLES
    this.currentMainId;
    this.currentMainCatName;
    this.currentPrimoId;
    this.currentPrimoCatName;
    this.currentSecondoId;
    this.currentSecondoCatName;
    this.currentTerzoId;
    this.currentTerzoCatName;
    // Declaring rest of the List Form VARIABLES
    this.listDescription;
    this.contactName;
    this.contactPhone;
    this.contactEmail;
    this.contactWebsite;
    this.contactCity;
    this.contactState;
    this.contactZip;
    this.socialFacebook;
    this.socialYelp;
    this.socialInstagram;
    this.socialLinkedin;
    this.socialGooglePlus;
    this.socialTwitter;
    // Setting up events
    // this.setEvents();
  }

  init = () => {
    console.log('OOP List INSERT UI...');
  };

  setEvents = () => {
    // this.userValidationButton.on('click', this.validateMainInsertForm);
    // this.userValidationCancellButton.on('click', this.goBackToFormBox);
  };

  // MAIN FORM VALIDATION
  // validateMainInsertForm = () => {
  // event.preventDefault();

  //   console.log('validation function clicked ...');

  //   $('#list-insert-main-form').validate({
  //     rules: {
  //       'lister-name': {
  //         required: true,
  //         maxlength: 20,
  //         minlength: 3,
  //       },
  //     },
  //     submitHandler: (form, event) => {
  //       event.preventDefault();
  //       // OPEN THE USER VALIDATION SCREEN
  //       this.displayValidationBox();
  //     },
  //   });
  // };

  displayValidationBox = () => {
    // GET CATEGORY DATA
    this.getCategoryData();
    // GET REST OF THE LIST FORM DATA
    this.getListFormData();
    // ADD CAT DATA TO THE VALIDATION SCREEN
    $('#list-user-validation-main-cat').text(this.currentMainCatName);
    $('#list-user-validation-primo-cat').text(this.currentPrimoCatName);
    $('#list-user-validation-secondo-cat').text(this.currentSecondoCatName);
    $('#list-user-validation-terzo-cat').text(this.currentTerzoCatName);
    // ADD CONTACT DATA TO THE VALIDATION SCREEN
    $('#list-user-validation-description').text(this.listDescription);
    $('#list-user-validation-name').text(this.contactName);
    $('#list-user-validation-phone').text(this.contactPhone);
    $('#list-user-validation-city').text(this.contactCity);
    $('#list-user-validation-zip').text(this.contactZip);
    $('#list-user-validation-state').text(this.contactState);
    // ADD SOCIAL DATA TO THE VALIDATION SCREEN
    $('#list-user-validation-facebook').text(this.socialFacebook);
    $('#list-user-validation-yelp').text(this.socialYelp);
    $('#list-user-validation-instagram').text(this.socialInstagram);
    $('#list-user-validation-linkedin').text(this.socialLinkedin);
    $('#list-user-validation-google-plus').text(this.socialGooglePlus);
    $('#list-user-validation-twitter').text(this.socialTwitter);

    // SCROLL TO TOP
    window.scrollTo(0, 0);
    // REMOVING LIST FORM BOX
    this.listInsertFormBox.addClass('d-none');
    // DISPLAYING USER VALIDATION BOX
    this.userValidationBox.removeClass('d-none');
  };

  getCategoryData = () => {
    // CHECKING FOR CAT SELECT DROPDOWN BOX
    if (this.catSelectBox.hasClass('d-none')) {
      console.log('get cats from local storage');
      const catDataJson = JSON.parse(localStorage.getItem('catData'));
      console.log(catDataJson);
      // COLLECTING MAIN CAT SELECTED ID
      this.currentMainId = catDataJson.main_cat_id;
      console.log('Current Main Cat ID: ', this.currentMainId);

      // COLLECTED PRIMO CAT SELECTED ID
      this.currentPrimoId = catDataJson.primo_cat_id;
      console.log('Current Primo ID: ', this.currentPrimoId);

      // COLLECTING SECONDO CAT SELECTED ID
      this.currentSecondoId = catDataJson.secondo_cat_id;
      console.log('Current Secondo Cat ID: ', this.currentSecondoId);

      // COLLECTED TERZO CAT SELECTED ID
      this.currentTerzoId = catDataJson.terzo_cat_id;
      console.log('Current Terzo ID: ', this.currentTerzoId);
    }

    // CHECKING FOR CAT DISPLAY BOX
    if (this.catDisplayUiBox.hasClass('d-none')) {
      // COLLECTING MAIN CAT SELECTED ID
      this.currentMainId = this.selectizeMain.getValue();
      if (this.currentMainId) {
        const selectedMainItem = this.selectizeMain.getItem(this.currentMainId);
        this.currentMainCatName = selectedMainItem[0].innerText;
      }

      console.log('Current Main Cat Name: ', this.currentMainCatName);
      console.log('Current Main Cat ID: ', this.currentMainId);

      // COLLECTED PRIMO CAT SELECTED ID
      this.currentPrimoId = this.selectizePrimo.getValue();
      if (this.currentPrimoId) {
        const selectedPrimoItem = this.selectizePrimo.getItem(
          this.currentPrimoId
        );
        this.currentPrimoCatName = selectedPrimoItem[0].innerText;
      }

      console.log('Current Primo Cat Name: ', this.currentPrimoCatName);
      console.log('Current Primo ID: ', this.currentPrimoId);

      // COLLECTING SECONDO CAT SELECTED ID
      this.currentSecondoId = this.selectizeSecondo.getValue();
      if (this.currentSecondoId) {
        const selectedSecondoItem = this.selectizeSecondo.getItem(
          this.currentSecondoId
        );
        this.currentSecondoCatName = selectedSecondoItem[0].innerText;
      }

      console.log('Current Secondo Cat Name: ', this.currentSecondoCatName);
      console.log('Current Secondo Cat ID: ', this.currentSecondoId);

      // COLLECTED TERZO CAT SELECTED ID
      this.currentTerzoId = this.selectizeTerzo.getValue();
      if (this.currentTerzoId) {
        const selectedTerzoItem = this.selectizeTerzo.getItem(
          this.currentTerzoId
        );
        this.currentTerzoCatName = selectedTerzoItem[0].innerText;
      }

      console.log('Current Terzo Cat Name: ', this.currentTerzoCatName);
      console.log('Current Terzo ID: ', this.currentTerzoId);
    }
  };

  getListFormData = () => {
    // Collect values for rest of the List Form VARIABLES
    // (non category related)
    this.listDescription = $('#lister-description').val();
    this.contactName = $('#lister-name').val();
    this.contactPhone = $('#lister-phone').val();
    this.contactEmail = $('#lister-email').val();
    this.contactWebsite = $('#lister-website').val();
    this.contactCity = $('#lister-city').val();
    this.contactState = $('#lister-state').val();
    this.contactZip = $('#lister-zip').val();
    this.socialFacebook = $('#lister-facebook').val();
    this.socialYelp = $('#lister-yelp').val();
    this.socialInstagram = $('#lister-instagram').val();
    this.socialLinkedin = $('#lister-linkedin').val();
    this.socialGooglePlus = $('#lister-google-plus').val();
    this.socialTwitter = $('#lister-twitter').val();
  };

  // goBackToFormBox = () => {
  //   // SCROLL TO TOP
  //   window.scrollTo(0, 0);
  //   // REMOVING LIST FORM BOX
  //   this.listInsertFormBox.removeClass('d-none');
  //   // DISPLAYING USER VALIDATION BOX
  //   this.userValidationBox.addClass('d-none');
  // };
}

export default ListInsertUiEvents;
