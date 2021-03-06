import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('groups', function() {
    this.route('group', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('login');
});

export default Router;
