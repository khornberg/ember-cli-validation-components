import { test } from "qunit";
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance("Acceptance | Form One Route Tests");

test("Fields with valFunctions trigger errors as expected", function(assert) {
  visit("/form-two");
  fillIn("#cardType", "Amex");
  click("#securityCode");
  fillIn("#securityCode", "1234");
  andThen(function() { find("#securityCode").focusout(); });
  andThen(function() { assert.ok(find("#codeError").length); });
});

test("Fields with valFunctions trigger do not have errors if provided desired input", function(assert) {
  visit("/form-two");
  fillIn("#cardType", "Discover");
  click("#securityCode");
  fillIn("#securityCode", "1234");
  andThen(function() { find("#securityCode").focusout(); });
  andThen(function() { assert.ok(!find("#codeError").length); });
});
