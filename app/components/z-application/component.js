import {
  alias,
  gte,
  and
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import ResizeMixin, {
  computerBreakpoint
} from 'groupr/mixins/resize';

export default Component.extend(ResizeMixin, {
  application: service(),
  sidebarIsOpen: false,
  sidebarMenuIsOpen: alias('application.sidebarMenuIsOpen'),
  classNames: ['groupr-application'],
  classNameBindings: ['largeScreenSidebarActive:large-screen-sidebar-active'],
  isLargeScreen: gte('screenWidth', computerBreakpoint),

  init() {
    this._super(...arguments);
    this.set('sidebarMenuIsOpen', true);
  },

  largeScreenSidebarActive: and('isLargeScreen', 'sidebarMenuIsOpen'),

  showLoginPrompt: alias('reauthenticateUser.showLoginPrompt'),

  actions: {
    toggleSidebar() {
      if (this.get('isLargeScreen')) {
        this.toggleProperty('sidebarMenuIsOpen');
      } else {
        this.toggleProperty('sidebarIsOpen');
      }
    },
  },
});
