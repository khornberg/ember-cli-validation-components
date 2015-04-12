import Ember from 'ember';

export default Ember.Mixin.create({
  after: Ember.computed("", function() {
    return this.contentPosition === "after";
  }),

  before: Ember.computed("", function() {
    return this.contentPosition === "before";
  }),

  fieldObj: Ember.computed("", function() {
    return this.formFields.findBy("_id", this._id);
  }),
});
