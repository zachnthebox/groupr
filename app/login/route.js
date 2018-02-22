import {
  inject as service
} from '@ember/service';
import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: service(),
  authenticator: 'authenticator:application',

  authenticate(session) {
    return this.get('session').authenticate(this.authenticator, session);
  },

  actions: {
    login(user) {
      this.controller.set('error', false);
      this.controller.set('loading', true);
      this.authenticate(user).then(() => {
        this.controller.set('loading', false);
      }).catch(() => {
        this.controller.set('error', true);
        this.controller.set('loading', false);
      });
    },
  },
});
