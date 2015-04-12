import Ember from 'ember';

export default Ember.Component.extend({
  registerField: Ember.on("init", function() {
    let fieldObj = this.formFields.findBy("_id", this._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    if(!fieldObj.hasOwnProperty("value")){
      fieldObj.value = false;
    }
  }),

  after: Ember.computed("", function() {
    return this.contentPosition === "after";
  }),

  before: Ember.computed("", function() {
    return this.contentPosition === "before";
  }),

  fieldObj: Ember.computed("", function() {
    return this.formFields.findBy("_id", this._id);
  }),

  change: function() {
    let fieldObj = this.get("fieldObj");
    Ember.set(fieldObj, "value", !fieldObj.value);
    this.formValidator.validate(fieldObj);
  }
});
