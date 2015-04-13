# Ember-cli-validation-components
*Easy to use input components to manage all your form validation needs*

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

![validation.gif](https://bitbucket.org/repo/9ybLej/images/1997957016-validation.gif)

## Sign Me Up Already! (Installation)

**NOTE:** This add requires Ember version 1.11.1 or higher.

For Ember CLI >= `0.2.3`:

``` shell
ember install ember-cli-validation-components
```

For Ember CLI < `0.2.3`:

``` shell
ember install:addon ember-cli-validation-components
```

## Service Defaults
By default the service is injected into all `Controllers`, `Routes`, `Views`
and `Components`.  However, this behavior is fully configurable. You can even
disable auto injection completely and lazily inject the service with
`Ember.inject.service("formValidator")`.

In `config/environment.js` you can override the addons service defaults by modifying the
`formValidatorDefaults` object:

```javascript
module.exports = function(environment) {
  var ENV = {
    formValidatorDefaults: {
      injectionFactories: ['route', 'controller', 'view', 'component']
    }
  }
}
```

The key `injectionFactories` lets you choose which factories the service
injects itself into.  For example if you only need to access the
`formValidator` service from inside `controllers`, you would change the
`injectionFactories` property to `['controller']`. This works with any valid
registry name on the container. So you could do any combination of the
following: `['component:fizz']` `['controller:buzz']` `['route:fizzbuzz']`.

Optionally you could set the `injectionFactories` to be empty and inject the
service manually on any `Ember.Object` registered in the container like so:

```javascript
formValidator: Ember.inject.service("formValidator")
```

## The Details

### Component Examples

- [Text Input](https://google.com)
- [Select Box](https://google.com)
- [Check Box](https://google.com)

### Form Validation Functions

- [isValid (Boolean are all form fields valid)](https://google.com)
- [markInvalid (Display errors for all invalid form fields)](https://google.com)
- [formData (Return an object containing all fields and values from the form)](https://google.com)
