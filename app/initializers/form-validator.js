import formValidator from "ember-cli-validation-components/services/form-validator";
import config from "../config/environment";

export function initialize(container, application) {
  const injectionFactories = config.formValidatorDefaults.injectionFactories;

  application.register("service:formValidator", formValidator, {singleton: true});
  application.inject("component:validated-input"   , "formValidator", "service:formValidator");
  application.inject("component:validated-checkbox", "formValidator", "service:formValidator");
  application.inject("component:validated-select"  , "formValidator", "service:formValidator");

  injectionFactories.forEach((factory) => {
    application.inject(factory, "formValidator", "service:formValidator");
  });
}

export default {
  name: 'form-validator',
  initialize: initialize
};
