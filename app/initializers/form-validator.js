import Ember from "ember";

var formValidator = Ember.Object.extend({

  isFormValid: function(form) {
    if (form.every(this._fieldValid)) { return true; }
    return false;
  },

  formData: function(form) {
    var theData = Ember.Object.create({});
    form.forEach(function(formObj) {
      theData[formObj._id] = formObj.value;
    });
    return theData;
  },

  markInvalid: function(form) {
    form.forEach( (fieldObj) => {
      this._validate(fieldObj);
    });
  },

  _validate: function(fieldObj) {
    if (fieldObj.value.toString().match(fieldObj.regex)) {
      Ember.set(fieldObj, "hasError", false);
      Ember.set(fieldObj, "validated", true);
    } else {
      Ember.set(fieldObj, "hasError", true);
      Ember.set(fieldObj, "validated", true);
    }
  },

  _fieldValid: function(field) { return field.validated && !field.hasError; }
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
