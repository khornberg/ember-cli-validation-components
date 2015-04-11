import Ember from 'ember';

export default Ember.Component.extend({
  registerField: Ember.on("init", function() {
    let fieldObj = this.formFields.findBy("_id", this._id);
    fieldObj.validated = false;
    fieldObj.hasError = false;
    this.formValidator.fieldTracker.pushObject(fieldObj);
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

  validate: function() {
    let fieldObj = this.get("fieldObj");
    if (fieldObj.value.toString().match(fieldObj.regex)) {
      Ember.set(fieldObj, "hasError", false);
      Ember.set(fieldObj, "validated", true);
    } else {
      Ember.set(fieldObj, "hasError", true);
      Ember.set(fieldObj, "validated", true);
    }
  },

  change: function() {
    let fieldObj = this.get("fieldObj");
    Ember.set(fieldObj, "value", !fieldObj.value);
    this.validate();
  },

  unregisterField: Ember.on("willDestroyElement", function() {
    let fieldObj = this.formFields.findBy("_id", this._id);
    this.formValidator.fieldTracker.removeObject(fieldObj);
  })
});
