import { test } from "qunit";
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance("Acceptance | Form Three Route Tests");

test("Mask input fields display mask and triggers errors when field is invalid", function(assert) {
  visit("/form-three");
  fillIn("#startDate", 10);
  andThen(function() { assert.equal(find("#startDate").val(), "10/__/____"); });
  andThen(function() { find("#startDate").focusout(); });
  andThen(function() { assert.ok(find("#codeError").length); });
});

test("Mask input field does not have errors with valid input", function(assert) {
  visit("/form-three");
  fillIn("#startDate", 12241986);
  andThen(function() { find("#startDate").focusout(); });
  andThen(function() { assert.ok(!find("#codeError").length); });
});
