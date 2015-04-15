import Ember from "ember";
import { module, test } from "qunit";
import startApp from "dummy/tests/helpers/start-app";

var application;

module("Form One Route Tests", {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, "destroy");
  }
});

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
