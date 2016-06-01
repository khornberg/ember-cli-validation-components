import Ember from "ember";
import validatedBase from "../mixins/validated-base";

export default Ember.Component.extend(validatedBase, {
  formValidator: Ember.inject.service(),

  registerField: Ember.on("init", function() {
    let fieldObj = this.get('formFields').findBy("_id", this.get('_id'));
    Ember.set(fieldObj, "validated", false);
    Ember.set(fieldObj, "hasError", false);
    if(!fieldObj.hasOwnProperty("value")){
      Ember.set(fieldObj, "value", "");
    }
    this.set('fieldObj', fieldObj);
  }),

  defaultChoice: Ember.computed(function() {
    if (this.get('fieldObj').value) {
      this.set('placeholder', false);
      return this.get('fieldObj').value;
    }
    if (this.get('placeholder')) { return; }
    return this.get("fieldObj").choices[0];
  }),

  remainingChoices: Ember.computed(function() {
    if (this.get('placeholder')) { return Ember.A(this.get('fieldObj').choices); }
    if (this.get('fieldObj').value) {
      var index = this.get('fieldObj').choices.indexOf(this.get('fieldObj').value);
      this.get('fieldObj').choices.splice(index, 1);
      return Ember.A(this.get('fieldObj').choices.slice(0, 100));
    }
    return Ember.A(this.get('fieldObj').choices.slice(1, 100));
  }),

  change: function(e) {
    let currentChoice = e.target.value;
    let fieldObj = this.get("fieldObj");
    let formFields = this.get('formFields');
    let formData = this.get("formValidator").formData(formFields);
    Ember.set(fieldObj, "value", currentChoice);
    this.get("formValidator")._validate(fieldObj, formData);
  }
});
