import {
  scheduleOnce
} from '@ember/runloop';
import {
  computed
} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['ui field'],
  classNameBindings: ['required', 'errorMessage:error', 'inline'],
  label: '',

  hasInput: computed(function() {
    return this.$('input').length;
  }),

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'getFocusId');
  },

  getFocusId() {
    if (this.get('hasInput')) {
      let inputId = this.$('input').prop('id');
      this.set('focusId', inputId);
    }
  },
});
