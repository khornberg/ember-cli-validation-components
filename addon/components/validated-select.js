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

  change: function(e) {
    let currentChoice = e.target.value;
    let fieldObj = this.get("fieldObj");
    Ember.set(fieldObj, "value", currentChoice);
    this.formValidator._validate(fieldObj);
  }
});
