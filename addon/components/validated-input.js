import Ember from 'ember';

export default Ember.Component.extend({
  registerField: Ember.on("init", function() {
    let fieldObj = this.formFields.findBy("_id", this._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    if(!fieldObj.hasOwnProperty("value")){
      fieldObj.value = "";
    }
  }),

  after: Ember.computed("", function() {
    return this.contentPosition === "after";
  }),

  before: Ember.computed("", function() {
    return this.contentPosition === "before";
  }),

  keyUp: function(e) {
    this.revalidate(e.target.value);
  },

  fieldObj: Ember.computed("", function() {
    return this.formFields.findBy("_id", this._id);
  }),

  revalidate: function(value) {
    let fieldObj = this.get("fieldObj");
    if (fieldObj.validated === true) {
      Ember.set(fieldObj, "value", value);
      this.formValidator.validate(fieldObj);
    }
  },

  actions: {
    validateField: function(value) {
      let fieldObj = this.get("fieldObj");
      if (value === "" && !fieldObj.validated) { return; }
      Ember.set(fieldObj, "value", value);
      this.formValidator.validate(fieldObj);
    }
  }
});
