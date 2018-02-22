import Component from '@ember/component';
import {
  alias
} from '@ember/object/computed';
import Validations from './validations';

export default Component.extend(Validations, {
  classNames: ['ui', 'segment'],
  classNameBindings: ['loading'],
  email: '',
  password: '',
  errorMessage: 'Invalid email or password.',
  title: 'Login',
  primaryButton: 'Login',

  isValid: alias('validations.isValid'),

  disabled: alias('loading'),

  actions: {
    login() {
      if (!this.get('isValid')) {
        return;
      }
      this.set('disabled', true);
      const session = this.getProperties('email', 'password');
      this.sendAction('action', session);
    },
  },
});
