import Ember from "ember";
import validatedBase from "../mixins/validated-base";

export default Ember.Component.extend(validatedBase, {
  formValidator: Ember.inject.service(),

  registerField: Ember.on("init", function() {
    let fieldObj = this.get('formFields').findBy("_id", this.get('_id'));
    Ember.set(fieldObj, "validated", false);
    Ember.set(fieldObj, "hasError", false);
    if(!fieldObj.hasOwnProperty("value")){
      Ember.set(fieldObj, "value", false);
    }
    this.set('fieldObj', fieldObj);
  }),

  change: function() {
    let fieldObj = this.get("fieldObj");
    let formFields = this.get('formFields');
    let formData = this.get("formValidator").formData(formFields);
    Ember.set(fieldObj, "value", !fieldObj.value);
    this.get("formValidator")._validate(fieldObj, formData);
  }
});
