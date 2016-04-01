import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("form-one", {path: "/form-one"});
  this.route("form-two", {path: "/form-two"});
  this.route("form-three", {path: "/form-three"});
  this.route("form-promise-rejected", {path: "/form-promise-rejected"});
});
