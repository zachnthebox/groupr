import EmberObject from '@ember/object';
import {
  A
} from '@ember/array';
import {
  next
} from '@ember/runloop';
import {
  inject as service
} from '@ember/service';
import Mixin from '@ember/object/mixin';
import {
  typeOf as emberTypeOf
} from '@ember/utils';

export default Mixin.create({
  sidebarMenuManager: service(),

  sidebarPriority: 10,

  isShownInSidebar: true,

  concatenatedProperties: ['sidebarURLs'],

  init() {
    this._super(...arguments);
    next(() => {
      let sidebarMenuManager = this.get('sidebarMenuManager');

      sidebarMenuManager.registerSidebarMenuItem(this);

      let sidebarURLs = this.get('sidebarURLs') || A();
      let routeName = this.get('routeName');
      sidebarURLs.forEach(item => {
        if (item.isShownInSidebar === undefined) {
          item.isShownInSidebar = true;
        }
        if (emberTypeOf(item.isShownInSidebar) === 'string') {
          item.isShownInSidebar = this.get(item.isShownInSidebar);
        }
        sidebarMenuManager.registerSidebarMenuItem(EmberObject.create({
          sidebarLabel: item.label,
          sidebarURL: item.url,
          sidebarRole: item.role,
          sidebarIconClass: item.icon,
          sidebarBadge: item.badge,
          sidebarPriority: item.priority || 10,
          isShownInSidebar: item.isShownInSidebar,
          routeName,
        }));
      });
    });
  },
});
