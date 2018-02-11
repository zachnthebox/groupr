import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  sidebarMenuManager: service(),

  classNames: ['ui', 'vertical', 'left', 'menu', 'sidebar-menu'],

  actions: {
    clickedLink() {
      this.sendAction();
    },
    sidebarAction(menuItem) {
      menuItem.sidebarAction();
    },
  },
});
