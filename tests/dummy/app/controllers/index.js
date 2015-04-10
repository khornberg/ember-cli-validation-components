import Ember from "ember";

export default Ember.Controller.extend({
  formFields: Ember.A([
    {_id: "name"   , form: "form1", value: ""     , regex: /^[A-Za-z]+$/},
    {_id: "zipCode", form: "form1", value: ""     , regex: /^\d+$/},
    {_id: "age"    , form: "form1", value: ""     , regex: /^[0-2]?[0-9]$/},
    {_id: "cool"   , form: "form1", value: false  , regex: /true/},
    {_id: "love"   , form: "form1", value: "----" , regex: /Lots|Some/, choices: Ember.A(["----", "Lots", "Some", "None"])}
  ]),

  actions: {
    submitForm: function() {
      if (this.get("formValidator").isFormValid("form1")) {
        console.log("The for IS valid");
      } else {
        console.log("The form is NOT valid");
      }
    },

    markInvalid: function() {
      this.get("formValidator").markInvalid("form1");
    }
  }
});

