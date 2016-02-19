import Ember from "ember";
import validatedInput from "./validated-input";

export default validatedInput.extend({
  layoutName: "components/validated-input",

  initializeMask: Ember.on("didInsertElement", function() {
    var mask = this.get("mask");
    this.$(`#${this.get("_id")}`).inputmask(mask);
  })
});
