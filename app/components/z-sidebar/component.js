import $ from 'jquery';
import {
  scheduleOnce
} from '@ember/runloop';
import {
  computed,
  observer
} from '@ember/object';
import {
  gte
} from '@ember/object/computed';
import Component from '@ember/component';
import ResizeMixin, {
  computerBreakpoint
} from 'groupr/mixins/resize';

export default Component.extend(ResizeMixin, {
  tagName: 'div',

  isLargeScreen: gte('screenWidth', computerBreakpoint),

  sidebarId: computed('elementId', function() {
    return `${this.get('elementId')}-ui-sidebar`;
  }),

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'openObserver');
  },

  openObserver: observer('isOpen', function() {
    let $sidebar = $(`#${this.get('sidebarId')}`);
    if (this.get('isOpen')) {
      $sidebar.sidebar('show');
    } else {
      $sidebar.sidebar('hide');
    }
  }),

  actions: {
    onHide() {
      this.set('isOpen', false);
    },
    resize() {
      if (this.get('isOpen') && this.get('isLargeScreen')) {
        this.set('isOpen', false);
      }
    },
  },
});
