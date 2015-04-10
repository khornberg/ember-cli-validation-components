import Ember from 'ember';

var formValidator = Ember.Object.extend({
  fieldValid: function(field) { return field.validated && !field.hasError; },

  isFormValid: function(formName) {
    let fields = this.fieldTracker.filterBy("form", formName);
    if (fields.every(this.fieldValid)) { return true; }
    return false;
  },

  validate: function(fieldObj) {
    if (fieldObj.value.toString().match(fieldObj.regex)) {
      Ember.set(fieldObj, "hasError", false);
      Ember.set(fieldObj, "validated", true);
    } else {
      Ember.set(fieldObj, "hasError", true);
      Ember.set(fieldObj, "validated", true);
    }
  },

  markInvalid: function(formName) {
    let fields = this.fieldTracker.filterBy("form", formName);
    fields.forEach( (fieldObj) => {
      this.validate(fieldObj);
    });
  },

  fieldTracker: Ember.A([])
});

export function initialize(container, application) {
  application.register("formValidator:main", formValidator);
  application.inject("controller", "formValidator", "formValidator:main");
  application.inject("component:validated-input", "formValidator", "formValidator:main");
  application.inject("component:validated-checkbox", "formValidator", "formValidator:main");
  application.inject("component:validated-select", "formValidator", "formValidator:main");
}

export default {
  name: 'form-validator',
  initialize: initialize
};
