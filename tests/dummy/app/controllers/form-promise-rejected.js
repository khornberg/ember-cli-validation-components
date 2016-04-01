import Ember from "ember";

export default Ember.Controller.extend({

  init: function() {
    // Tests carry state if this is not defined in init
    this.set("formFields", Ember.A([
    {_id: "promise-rejected", regex: /none/, choices: Ember.A(["Good", "Great", "Ok"])}]));
  },

  actions: {
    submit: function() {
      var promise = new Ember.RSVP.Promise(function() {
        throw("error");
      });
      promise.then(function() {}, function() {});
    },
    formValid: function() {
      if (this.get("formValidator").isValid(this.get("formFields"))) {
        console.log("The form IS valid");
      } else {
        console.log("The form is NOT valid");
      }
    },

    markInvalid: function() {
      this.get("formValidator").markInvalid(this.get("formFields"));
    },

    formData: function() {
      console.log(this.get("formValidator").formData(this.get("formFields")));
    }
  }
});
