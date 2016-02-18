import Ember from "ember";
import validatedBase from "../mixins/validated-base";

export default Ember.Component.extend(validatedBase, {
  formValidator: Ember.inject.service(),

  registerField: Ember.on("init", function() {
    let fieldObj = this.getAttr('formFields').findBy("_id", this.attrs._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    if(!fieldObj.hasOwnProperty("value")){
      fieldObj.value = false;
    }
    this.set('fieldObj', fieldObj);
  }),

  change: function() {
    let fieldObj = this.get("fieldObj");
    let formFields = this.getAttr('formFields');
    let formData = this.get("formValidator").formData(formFields);
    Ember.set(fieldObj, "value", !fieldObj.value);
    this.get("formValidator")._validate(fieldObj, formData);
  }
});
