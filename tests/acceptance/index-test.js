import Ember from "ember";
import { module, test } from "qunit";
import startApp from "dummy/tests/helpers/start-app";

var application;

module("Single Form Index Route", {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, "destroy");
  }
});

test("Input field does not display an error if it contains invalid input but has not lost focus", function(assert) {
  visit("/");
  click("#name");
  fillIn("#name", "Jarrod@");
  andThen(function() {
    assert.ok(!find("#nameError").length);
  });
});

test("Input field does display an error if it contains invalid input and has lost focus", function(assert) {
  visit("/");
  click("#name");
  fillIn("#name", "Jarrod@");
  andThen(function() {
    find("#name").focusout();
  });
  andThen(function() {
    assert.ok(find("#nameError").length);
  });
});

test("Input field will update error status as keys are pressed after initial error has been triggered", function(assert) {
  visit("/");
  click("#name");
  fillIn("#name", "Jarrod@");
  andThen(function() {
    find("#name").focusout();
  });
  click("#name");
  fillIn("#name", "Jarrod");
  andThen(function() {
    find("#name").keyup();
  });
  andThen(function() {
    assert.ok(!find("#nameError").length);
  });
  fillIn("#name", "Jarrod#");
  andThen(function() {
    find("#name").keyup();
  });
  andThen(function() {
    assert.ok(find("#nameError").length);
  });
});

test("Checkbox field does not display an error if checked and expected to be true", function(assert) {
  visit("/");
  click("#cool");
  andThen(function() {
    assert.ok(!find("#coolError").length);
  });
});

test("Checkbox field does display an error if not checked and expected to be true", function(assert) {
  visit("/");
  click("#cool");
  click("#cool");
  andThen(function() {
    assert.ok(find("#coolError").length);
  });
});

test("Select field does not display an error if selected field matches regex", function(assert) {
  visit("/");
  fillIn("#love", "Lots");
  andThen(function() {
    assert.ok(!find("#loveError").length);
  });
});

test("Select field does display an error if selected field does not matche regex", function(assert) {
  visit("/");
  fillIn("#love", "None");
  andThen(function() {
    assert.ok(find("#loveError").length);
  });
});

test("ifFormValid returns false with form is not valid", function(assert) {
  var dummyConsoleLog = Ember.A([]);
  var monkeyConsole = function(theString) {
    dummyConsoleLog.pushObject(theString);
  };
  console.log = monkeyConsole;
  visit("/");
  click("#formValid");
  andThen(function() {
    assert.equal(dummyConsoleLog.length, 1);
    assert.equal(dummyConsoleLog[0], "The form is NOT valid");
  });
});

test("ifFormValid returns true with form is valid", function(assert) {
  var dummyConsoleLog = Ember.A([]);
  var monkeyConsole = function(theString) {
    dummyConsoleLog.pushObject(theString);
  };
  console.log = monkeyConsole;
  visit("/");
  click("#name");
  fillIn("#name", "Jarrod");
  andThen(function() {
    find("#name").focusout();
  });
  click("#zipCode");
  click("#cool");
  fillIn("#zipCode", "123");
  andThen(function() {
    find("#zipCode").focusout();
  });
  fillIn("#love", "Lots");
  click("#formValid");
  andThen(function() {
    assert.equal(dummyConsoleLog.length, 1);
    assert.equal(dummyConsoleLog[0], "The form IS valid");
  });
});

test("markInvalid sets errors for fields that do not match their regex", function(assert) {
  visit("/");
  click("#markInvalid");
  andThen(function() {
    assert.ok(find("#nameError").length);
    assert.ok(find("#zipError").length);
    assert.ok(find("#coolError").length);
    assert.ok(find("#loveError").length);
  });
});

test("markInvalid does not set error when all fields match their regex", function(assert) {
  visit("/");
  click("#name");
  fillIn("#name", "Jarrod");
  andThen(function() {
    find("#name").focusout();
  });
  click("#zipCode");
  click("#cool");
  fillIn("#zipCode", "123");
  andThen(function() {
    find("#zipCode").focusout();
  });
  fillIn("#love", "Lots");
  click("#formValid");
  andThen(function() {
    assert.ok(!find("#nameError").length);
    assert.ok(!find("#zipError").length);
    assert.ok(!find("#coolError").length);
    assert.ok(!find("#loveError").length);
  });
});

test("formData returns the expected object with the correct current values", function(assert) {
  var dummyConsoleLog = Ember.A([]);
  var monkeyConsole = function(theString) {
    dummyConsoleLog.pushObject(theString);
  };
  console.log = monkeyConsole;
  visit("/");
  click("#name");
  fillIn("#name", "Jarrod");
  andThen(function() {
    find("#name").focusout();
  });
  click("#zipCode");
  fillIn("#zipCode", "123");
  andThen(function() {
    find("#zipCode").focusout();
  });
  click("#cool");
  fillIn("#love", "Lots");
  click("#formData");
  andThen(function() {
    assert.equal(dummyConsoleLog.length, 1);
    assert.equal(Ember.keys(dummyConsoleLog[0]).length, 4);
    assert.equal(dummyConsoleLog[0].name, "Jarrod");
    assert.equal(dummyConsoleLog[0].love, "Lots");
    assert.equal(dummyConsoleLog[0].cool, true);
    assert.equal(dummyConsoleLog[0].zipCode, "123");
  });
});
