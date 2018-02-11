import Component from '@ember/component';
import Validations from './validations';
import {
  readOnly
} from '@ember/object/computed';
import {
  task
} from 'ember-concurrency';
import {
  inject as service
} from '@ember/service';
import FocusFirstInputMixin from 'groupr/mixins/focus-first-input';

const defaults = {
  name: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export default Component.extend(Validations, defaults, FocusFirstInputMixin, {
  classNames: ['item'],

  store: service(),

  showForm: false,

  isValid: readOnly('validations.isValid'),

  loading: readOnly('addLocation.isRunning'),

  addLocation: task(function*() {
    const attributes = this.getProperties(Object.keys(defaults));
    attributes.group = this.get('group');
    attributes.active = true;
    const location = this.get('store').createRecord('location', attributes);
    yield location.save();
    this.sendAction();
    this.set('showForm', false);
    this.setProperties(defaults);
  }),

  actions: {
    submit() {
      if (!this.get('isValid')) {
        return;
      }
      this.get('addLocation').perform();
    },
    showForm() {
      this.set('showForm', true);
      this.focusFirstInput();
    },
  },
});
