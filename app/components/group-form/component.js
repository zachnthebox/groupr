import Component from '@ember/component';
import {
  computed
} from '@ember/object';
import {
  alias,
  readOnly,
  reads,
} from '@ember/object/computed';
import Validations from './validations';
import {
  task
} from 'ember-concurrency';
import moment from 'moment';

export default Component.extend(Validations, {
  isValid: readOnly('validations.isValid'),

  dayOfWeek: alias('group.dayOfWeek'),

  name: alias('group.name'),

  time: reads('group.time'),

  daysOfTheWeek: computed(function() {
    const days = [];
    for (let i = 1; i < 8; i++) {
      days.push(i);
    }
    return days;
  }),

  loading: readOnly('saveGroup.isRunning'),

  disabled: alias('loading'),

  saveGroup: task(function*() {
    this.set('group.time', moment(this.get('time')).format('LT'));
    const group = yield this.get('group').save();
    this.sendAction('action', group);
  }),

  actions: {
    submit() {
      if (!this.get('isValid')) {
        return;
      }
      this.get('saveGroup').perform();
    },
  },
});
