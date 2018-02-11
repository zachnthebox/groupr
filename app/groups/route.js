import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'groupr/mixins/sidebar-navigation';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'Groups',
});
