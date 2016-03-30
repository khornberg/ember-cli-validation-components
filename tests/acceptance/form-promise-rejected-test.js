import { test } from "qunit";
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance("Acceptance | Form One Route Tests");


test("Select field with placeholder maintains selected value after failed promise", function(assert) {
  visit("/form-promise-rejected");
  fillIn("#promise-rejected", "Great");
  click('#submit-form');
  andThen(function() {
    assert.equal(find("#promise-rejected").val(), "Great");
  });
});

