import { test } from "qunit";
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance("Acceptance | Form Two Route Tests");

test("Selecting an incorrect option with a multiselect shows error", function(assert) {
  visit("/form-four");
  andThen(function() {
    $('#colors option[value="Blue"]').prop('selected',true).trigger('change');
  });
  andThen(function() { assert.ok(find("#colorError").length); });
});

test("Selecting a correct option with a multiselect does not show error", function(assert) {
  visit("/form-four");
  andThen(function() {
    $('#colors option[value="Red"]').prop('selected',true).trigger('change');
  });
  andThen(function() { assert.ok(!find("#colorError").length); });
});
