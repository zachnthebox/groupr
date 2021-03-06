import {
  computed
} from '@ember/object';
import {
  notEmpty
} from '@ember/object/computed';
import Component from '@ember/component';
import Validation from 'groupr/mixins/validation';

export default Component.extend(Validation, {
  tagName: '',

  defaultText: 'Select an Option',
  disabled: false,
  loading: false,
  dropdownAction: 'activate',
  direction: undefined,
  allowTab: true,
  selected: null,
  forceSelection: false,
  showOnFocus: true,
  allowAdditions: false,
  hideAdditions: true,
  menuDirection: '',

  selection: notEmpty('field'),

  _dropdownClass: computed('selection', 'loading', 'disabled', 'showError', 'class', function() {
    let computedClasses = '';
    if (this.get('selection') || this.get('search')) {
      computedClasses += ' selection';
    }
    if (this.get('search')) {
      computedClasses += ' search';
    }
    if (this.get('loading')) {
      computedClasses += ' loading';
    }
    if (this.get('disabled') || this.get('loading')) {
      computedClasses += ' disabled';
    }
    if (this.get('class')) {
      computedClasses += ` ${this.get('class')}`;
    }
    return computedClasses;
  }),

  actions: {
    select(option) {
      const notSelected = option !== this.get('selected');
      const hideDropdownAction = this.get('dropdownAction') === 'hide';
      if (notSelected) {
        this.set('selected', option);
      }
      if (hideDropdownAction || notSelected) {
        this.sendAction('action', option);
      }
    },
  },
});
