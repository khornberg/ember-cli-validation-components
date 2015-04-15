import { module, test } from 'qunit';
import Ember from 'ember';
import formValidator from 'ember-cli-validation-components/services/form-validator';

module("Form Validator Service Tests", { });

test("isValid returns true when all fields are validated and do not have errors", function(assert) {
  let validator = new formValidator();
  let form = Ember.A([
    {_id: "a", regex: /^$/, validated: true, hasError: false},
    {_id: "b", regex: /^$/, validated: true, hasError: false}
  ]);
  assert.ok(validator.isValid(form));
});

test("isValid returns false when some fields are not validated and none have errors", function(assert) {
  let validator = new formValidator();
  let form = Ember.A([
    {_id: "a", regex: /^$/, validated: false, hasError: false},
    {_id: "b", regex: /^$/, validated: true, hasError: false}
  ]);
  assert.ok(!validator.isValid(form));
});

test("isValid returns false when all fields have been validated and some have errors", function(assert) {
  let validator = new formValidator();
  let form = Ember.A([
    {_id: "a", regex: /^$/, validated: true, hasError: true},
    {_id: "b", regex: /^$/, validated: true, hasError: false}
  ]);
  assert.ok(!validator.isValid(form));
});

test("marInvalid invalidates field that have values that do not match the regex", function(assert) {
  let validator = new formValidator();
  let form = Ember.A([
    {_id: "a", value: "A", regex: /^$/, validated: false, hasError: false},
    {_id: "b", value: "B", regex: /^$/, validated: false, hasError: false}
  ]);
  validator.markInvalid(form);
  assert.ok(form[0].validated);
  assert.ok(form[1].validated);
  assert.ok(form[0].hasError);
  assert.ok(form[1].hasError);
});

test("marInvalid only sets validated to true if value matches the regex", function(assert) {
  let validator = new formValidator();
  let form = Ember.A([
    {_id: "a", value: "A", regex: /^A$/, validated: false, hasError: false},
    {_id: "b", value: "B", regex: /^B$/, validated: false, hasError: false}
  ]);
  validator.markInvalid(form);
  assert.ok(form[0].validated);
  assert.ok(form[1].validated);
  assert.ok(!form[0].hasError);
  assert.ok(!form[1].hasError);
});

test("formData returns object with expected properties and values", function(assert) {
  let validator = new formValidator();
  let form = Ember.A([
    {_id: "a", value: "A"},
    {_id: "b", value: "B"}
  ]);
  let data = validator.formData(form);
  assert.equal(data.a, "A");
  assert.equal(data.b, "B");
  assert.equal(Ember.keys(data).length, 2);
});
