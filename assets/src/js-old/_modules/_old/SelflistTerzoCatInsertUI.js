import $ from 'jquery';

class SelflistTerzoCatInsertUI {
  constructor() {
    // COLLECTING SEARCH INPUT
    this.newListContainer = $('#create-new-list-box');
    this.mainCategoryInsertContainer = $('#terzo-cat-insert-box');
    this.categoryChoiceContainer = $('#category-choice-box');
    this.testUICatContainer = $('#test-ui-cat-box');
    this.mainCatInsertBtn = $('#terzo-cat-new-btn');
    this.mainCatInsertSubmitBtn = $('#terzo-cat-insert-submit-btn');

    // SETTING EVENTS
    this.setEvents();
    this.init();
  }

  init = () => {
    // console.log('Selflist cat INSERT ...');
  };

  setEvents = () => {
    this.mainCatInsertBtn.on('click', this.mainCatInsertHandler.bind(this));
    this.mainCatInsertSubmitBtn.on(
      'click',
      this.testUICatSubmitHandler.bind(this)
    );
  };

  mainCatInsertHandler() {
    // console.log('clicked');
    this.newListContainer.addClass('d-none');
    this.mainCategoryInsertContainer.removeClass('d-none');
  }

  testUICatSubmitHandler() {
    console.log('clicked');
    this.mainCategoryInsertContainer.addClass('d-none');
    this.newListContainer.removeClass('d-none');
    this.categoryChoiceContainer.addClass('d-none');
    this.testUICatContainer.removeClass('d-none');
  }
}

export default SelflistTerzoCatInsertUI;
