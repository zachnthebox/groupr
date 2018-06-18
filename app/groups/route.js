import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(SidebarNavigationMixin, AuthenticatedRouteMixin, {
  sidebarLabel: 'Groups',
});
