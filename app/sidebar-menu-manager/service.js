import {
  sort,
  filterBy,
  setDiff
} from '@ember/object/computed';
import Service, {
  inject as service
} from '@ember/service';
import {
  A
} from '@ember/array';
import {
  computed,
  set
} from '@ember/object';
import {
  getOwner
} from '@ember/application';
import SidebarNavigationMixin from 'groupr/mixins/sidebar-navigation';

export default Service.extend({
  routing: service('-routing'),

  init() {
    this._super(...arguments);
    this.loadApplicableRoutes();
  },

  availableRoutes: computed(function() {
    const availableRoutes = this.get('routing.router._routerMicrolib.recognizer.names');
    return availableRoutes && Object.keys(availableRoutes) || [];
  }),

  loadApplicableRoutes() {
    const routing = this.get('routing');
    let availableRoutes = this.get('availableRoutes');
    let container = getOwner(this);
    availableRoutes.forEach(routeName => {
      let route = container.lookup(`route:${routeName}`);
      let isSidebarRoute = route && SidebarNavigationMixin.detect(route);
      if (isSidebarRoute) {
        routing.generateURL(routeName);
      }
    });
  },

  registerSidebarMenuItem(menuItem) {
    this.get('_menuItems').pushObject(menuItem);
  },

  contextItemSort: ['sidebarPriority:desc', 'sidebarLabel:asc'],

  _menuItems: A(),

  _menuItemsRoleFiltered: computed('_menuItems.[]', 'currentUser.roles.[]', function() {
    return this.get('_menuItems').filter(item => {
      if (item.sidebarRole) {
        const roles = this.get('currentUser.roles');
        return roles && roles.includes(item.sidebarRole);
      }
      return true;
    });
  }),

  _menuItemsSorted: sort('_menuItemsRoleFiltered', 'contextItemSort'),

  footerMenuItems: filterBy('_menuItemsSorted', 'sidebarFooterItem', true),

  _menuItemsFiltered: setDiff('_menuItemsSorted', 'footerMenuItems'),

  _groupMenuItems: computed('_menuItemsFiltered.[]', function() {
    let menuItems = this.get('_menuItemsFiltered');
    let menuGroups = menuItems.filter(menuItem => {
      return menuItem.isSidebarGroupHeader;
    });
    menuGroups.forEach(menuGroup => {
      if (menuGroup.routeName === 'application') {
        set(menuGroup, 'isApplicationRoute', true);
        return;
      }
      let children = menuItems.filter(menuItem => {
        if (!menuItem.sidebarAction && (!menuItem.routeName || menuItem.isSidebarGroupHeader)) {
          return false;
        }

        let isChild = false;
        if (menuItem.sidebarAction) {
          isChild = menuItem.sidebarGroup === menuGroup.sidebarGroup;
        } else {
          let belongsToRoute = menuItem.routeName.indexOf(menuGroup.routeName) === 0;
          let isSameRoute = menuGroup.routeName === menuItem.routeName && !menuItem.sidebarURL;
          isChild = belongsToRoute && !isSameRoute;
        }

        if (isChild) {
          menuItem.isChild = isChild;
        }
        return isChild;
      });
      set(menuGroup, 'children', children);
    });

    let orphanRoutes = menuItems.filter(menuItem => {
      return !menuItem.isChild && !menuItem.isSidebarGroupHeader;
    });

    return menuGroups.concat(orphanRoutes);
  }),

  menuItems: sort('_groupMenuItems', 'contextItemSort'),
});
