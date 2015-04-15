import Ember from "ember";
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
    let formFields = this.get("formFields");
    let formData = this.get("formValidator").formData(formFields);
    if (fieldObj.validated === true) {
      Ember.set(fieldObj, "value", value);
      this.formValidator._validate(fieldObj, formData);
    }
  },

  actions: {
    validateField: function(value) {
      let fieldObj = this.get("fieldObj");
      let formFields = this.get("formFields");
      let formData = this.get("formValidator").formData(formFields);
      if (value === "" && !fieldObj.validated) { return; }
      Ember.set(fieldObj, "value", value);
      this.formValidator._validate(fieldObj, formData);
    }
  }
});
