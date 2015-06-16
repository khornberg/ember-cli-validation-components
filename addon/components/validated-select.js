import Ember from "ember";
import validatedBase from "../mixins/validated-base";

export default Ember.Component.extend(validatedBase, {
  registerField: Ember.on("init", function() {
    let fieldObj = this.getAttr('formFields').findBy("_id", this.attrs._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    if(!fieldObj.hasOwnProperty("value")){
      fieldObj.value = "";
    }
    this.set('fieldObj', fieldObj);
  }),

  defaultChoice: Ember.computed(function() {
    return this.get("fieldObj").choices[0];
  }),

  remainingChoices: Ember.computed(function() {
    return Ember.A(this.get("fieldObj").choices.slice(1, 100));
  }),

  change: function(e) {
    let currentChoice = e.target.value;
    let fieldObj = this.get("fieldObj");
    let formFields = this.getAttr('formFields');
    let formData = this.get("formValidator").formData(formFields);
    Ember.set(fieldObj, "value", currentChoice);
    this.formValidator._validate(fieldObj, formData);
  }
});
