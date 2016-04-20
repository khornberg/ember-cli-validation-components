import Ember from "ember";

export default Ember.Controller.extend({

  formFields: Ember.computed(function() {
    return Ember.A([
      {_id: "colors", regex: /Red|Green/, choices: Ember.A(["----", "Red", "Green", "Blue"])}
    ]);
  }),

  actions: {
    submitForm: function() {
      let validator = this.get("formValidator");
      let form = this.get("formFields");
      validator.markInvalid(form);
      if (validator.isValid(form)) {
        console.log("The form IS being submitted");
      }
    }
  }
});
