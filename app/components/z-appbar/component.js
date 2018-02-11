import {
  lt,
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import ResizeMixin, {
  computerBreakpoint,
} from 'groupr/mixins/resize';
import Component from '@ember/component';

export default Component.extend(ResizeMixin, {
  title: 'Groupr',

  classNames: ['ui', 'menu', 'main', 'fixed', 'inverted'],

  router: service(),

  isMobileScreen: lt('screenWidth', computerBreakpoint),

  actions: {
    toggleSidebar() {
      this.sendAction('toggleSidebar');
    },
  },
});
