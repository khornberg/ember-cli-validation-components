import Ember from "ember";

export default Ember.Controller.extend({

  formFields: Ember.computed(function() {
    return Ember.A([
      {_id: "securityCode" , regex: /^\d{3,4}$/    , valFunction: this.get("codeCheck")},
      {_id: "cardType"     , regex: /Amex|Discover/, choices: Ember.A(["----", "Amex", "Discover"])}
    ]);
  }),

  codeCheck: function(formData) {
    let card = formData.cardType;
    let securityCode = formData.securityCode;
    if (card === "Amex" && securityCode.length === 3 || card === "Discover" && securityCode.length === 4) {
      return true;
    } else {
      return false;
    }
  },

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
