import Ember from "ember";

export default Ember.Controller.extend({

  init: function() {
    // Tests carry state if this is not defined in init
    this.set("formFields", Ember.A([
    {_id: "name",        regex: /^[A-Za-z]+$/},
    {_id: "description", regex: /^[A-Za-z]+$/},
    {_id: "zipCode",     regex: /^\d+$/},
    {_id: "cool",        regex: /true/},
    {_id: "love",        regex: /Lots|Some/, choices: Ember.A(["----", "Lots", "Some", "None"])},
    {_id: "placeholder", regex: /none/,      choices: Ember.A(["I don't love them", ])}]));
  },

  actions: {
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
