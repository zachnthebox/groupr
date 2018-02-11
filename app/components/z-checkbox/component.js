import {
  alias,
  bool
} from '@ember/object/computed';
import Component from '@ember/component';
import Validation from 'groupr/mixins/validation';

export default Component.extend(Validation, {
  tagName: '',

  readonly: false,
  checked: alias('value'),
  _checked: bool('checked'),
  bindValue: true,

  actions: {
    onChange(value) {
      if (this.get('bindValue')) {
        this.set('checked', value);
      }
      this.sendAction('action', value);
    },
  },
});
