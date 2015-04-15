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

test("Input field does not display an error if it contains invalid input but has not lost focus", function(assert) {
  visit("/form-one");
  click("#name");
  fillIn("#name", "Jarrod@");
  andThen(function() {
    assert.ok(!find("#nameError").length);
  });
});

test("Input field does display an error if it contains invalid input and has lost focus", function(assert) {
  visit("/form-one");
  click("#name");
  fillIn("#name", "Jarrod@");
  andThen(function() { find("#name").focusout(); });
  andThen(function() { assert.ok(find("#nameError").length); });
});

test("Input field will update error status as keys are pressed after initial error has been triggered", function(assert) {
  visit("/form-one");
  click("#name");
  fillIn("#name", "Jarrod@");
  andThen(function() { find("#name").focusout(); });
  fillIn("#name", "Jarrod");
  andThen(function() { find("#name").keyup(); });
  andThen(function() { assert.ok(!find("#nameError").length); });
});

test("Checkbox field does not display an error if checked and expected to be true", function(assert) {
  visit("/form-one");
  click("#cool");
  andThen(function() { assert.ok(!find("#coolError").length); });
});

test("Checkbox field does display an error if not checked and expected to be true", function(assert) {
  visit("/form-one");
  click("#cool");
  click("#cool");
  andThen(function() { assert.ok(find("#coolError").length); });
});

test("Select field does not display an error if selected field matches regex", function(assert) {
  visit("/form-one");
  fillIn("#love", "Lots");
  andThen(function() { assert.ok(!find("#loveError").length); });
});

test("Select field does display an error if selected field does not matche regex", function(assert) {
  visit("/form-one");
  fillIn("#love", "None");
  andThen(function() { assert.ok(find("#loveError").length); });
});