import {
  or
} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  type: 'button',
  classNames: ['ui button'],
  classNameBindings: ['disabled', 'loading'],
  attributeBindings: ['type', '_disabled:disabled', 'name', 'tabindex', 'title', 'autofocus'],

  loading: false,
  disabled: false,

  _disabled: or('disabled', 'loading'),

  click: function(evt) {
    this.sendAction('action', evt);
  },
});
