import Ember from 'ember';
import validatedBase from "../mixins/validated-base";

export default Ember.Component.extend(validatedBase, {
  registerField: Ember.on("init", function() {
    let fieldObj = this.formFields.findBy("_id", this._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    if(!fieldObj.hasOwnProperty("value")){
      fieldObj.value = "";
    }
  }),

  keyUp: function(e) {
    this.revalidate(e.target.value);
  },

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
