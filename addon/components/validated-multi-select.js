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

  change: function() {
    let fieldObj = this.get("fieldObj");
    let formFields = this.get('formFields');
    let formData = this.get("formValidator").formData(formFields);
    let selected = this.$(`#${this.get("_id")}`).val();
    Ember.set(fieldObj, "value", selected);
    this.get("formValidator")._validate(fieldObj, formData);
  }
});
