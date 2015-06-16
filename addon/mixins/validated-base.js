import Ember from "ember";

export default Ember.Mixin.create({
  after: Ember.computed("", function() {
    return this.getAttr('contentPosition') === "after";
  }),

  before: Ember.computed("", function() {
    return this.getAttr('contentPosition') === "before";
  }),

  fieldObj: Ember.computed("", function() {
    return this.getAttr('formFields').findBy("_id", this.attrs._id.value);
  }),
});
