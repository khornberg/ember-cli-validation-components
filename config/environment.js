'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    formValidatorDefaults: {
      injectionFactories : ['route', 'controller', 'view', 'component']
    }
  };
};
