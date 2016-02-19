import Ember from "ember";

export default Ember.Controller.extend({

  formFields: Ember.computed(function() {
    return Ember.A([
      {_id: "startDate" , regex: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/},
    ]);
  }),

});
