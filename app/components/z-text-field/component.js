import Component from '@ember/component';
import Validation from 'groupr/mixins/validation';

export default Component.extend(Validation, {
  classNames: ['ui', 'input'],

  classNameBindings: ['fluid'],

  type: 'text',

  input() {
    this.sendAction('action', this.get('value'));
  },
});
