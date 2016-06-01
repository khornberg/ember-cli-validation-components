import { test } from "qunit";
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance("Acceptance | Form Two Route Tests");

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

test("Select fields with a default value do not duplicate the value in the choices", function(assert) {
  visit("/form-two");
  andThen(function() { assert.equal(find("#cardExp option").text(), "10/1608/1609/16");});
});
