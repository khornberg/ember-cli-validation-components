import Ember from "ember";

export default Ember.Service.extend({

  isValid: function(form) {
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
      this._validate(fieldObj, this.get("formData")(form));
    });
  },

  _validate: function(fieldObj, formData) {
    let regexBool = fieldObj.value.toString().match(fieldObj.regex);
    let valFunction = true;
    if (fieldObj.valFunction) {
      valFunction = fieldObj.valFunction(formData);
    }
    if (regexBool && valFunction) {
      Ember.set(fieldObj, "hasError", false);
      Ember.set(fieldObj, "validated", true);
    } else {
      Ember.set(fieldObj, "hasError", true);
      Ember.set(fieldObj, "validated", true);
    }
  },

  _fieldValid: function(field) { return field.validated && !field.hasError; }
});
