import Ember from 'ember';
import validatedBase from "../mixins/validated-base";

export default Ember.Component.extend(validatedBase, {
  registerField: Ember.on("init", function() {
    let fieldObj = this.formFields.findBy("_id", this._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    if(!fieldObj.hasOwnProperty("value")){
      fieldObj.value = false;
    }
  }),

  change: function() {
    let fieldObj = this.get("fieldObj");
    Ember.set(fieldObj, "value", !fieldObj.value);
    this.formValidator.validate(fieldObj);
  }
});
