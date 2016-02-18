# Ember-cli-validation-components
*Easy to use input components to manage all your form validation needs*

[![Build Status](https://travis-ci.org/JarrodCTaylor/ember-cli-validation-components.svg?branch=master)](https://travis-ci.org/JarrodCTaylor/ember-cli-validation-components) [![npm version](https://badge.fury.io/js/ember-cli-validation-components.svg)](http://badge.fury.io/js/ember-cli-validation-components) [![Code Climate](https://codeclimate.com/github/JarrodCTaylor/ember-cli-validation-components/badges/gpa.svg)](https://codeclimate.com/github/JarrodCTaylor/ember-cli-validation-components)


This ember-cli addon provides three validated input components `input`,
`select` and `checkbox` plus a service with several convenience functions to your
app. These easy to use components make form validation easy and dare I say *almost* fun.

## How Easy Is It?
**This:**

``` javascript
// controllers/index.js
form: Ember.A([
  {_id: "name", regex: /^[A-Za-z]+$/},
  {_id: "pin" , regex: /^\d{4}$/}
])
```

**Plus this:**
``` handlebars
<!-- templates/index.hbs -->
{{#validated-input _id="name" formFields=form contentPosition="after" placeholder="Name"}}
  <div style="color:red">Only alpha chars</div>
{{/validated-input}}

{{#validated-input _id="pin" formFields=form contentPosition="after" placeholder="Pin Number"}}
  <div style="color:red">Pin is a four digit number</div>
{{/validated-input}}
```

**Gives you this:**

![validation](https://cloud.githubusercontent.com/assets/4416952/7115973/31a82c6a-e1b3-11e4-9402-667cbab38d82.gif)

## Sign Me Up Already! (Installation)

**NOTE:** This add requires Ember version 1.13.1 or higher.

``` shell
ember install ember-cli-validation-components
```

## Service Injection

Injecting the service can be accomplished with a single line.

```javascript
formValidator: Ember.inject.service()
```

## The Details

### Component Examples

- [Text Input](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/Text-Input)
- [Select Box](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/Select-Input)
- [Check Box](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/Checkbox)

### Form Validation Functions

- [isValid (Boolean are all form fields valid)](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/isValid-Function)
- [markInvalid (Display errors for all invalid form fields)](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/markInvalid)
- [formData (Return an object containing all fields and values from the form)](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/formData)

### Custom Field Validators (Other than regex)

- [Custom validation](https://github.com/JarrodCTaylor/ember-cli-validation-components/wiki/Custom-field-validators)
