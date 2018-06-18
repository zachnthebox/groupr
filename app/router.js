import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import nrgRoutes from 'ember-nrg-ui/router';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  nrgRoutes(this);
  this.route('groups', function() {
    this.route('group', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('login');
  this.route('release-notes');
});

export default Router;
