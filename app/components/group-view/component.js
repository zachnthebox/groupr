import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  task
} from 'ember-concurrency';
import {
  or
} from '@ember/object/computed';

export default Component.extend({
  router: service(),

  skipDateIsLoading: or('skipDate.isRunning'),

  skipLocationIsLoading: or('skipLocation.isRunning', 'groupLoading.isRunning'),

  removeLocationIsLoading: or('removeLocation.isRunning', 'groupLoading.isRunning'),

  groupLoading: task(function*() {
    yield this.get('group').reload();
  }),

  skipDate: task(function*(group) {
    yield group.skipDate();
    this.get('groupLoading').perform();
  }),

  skipLocation: task(function*(group) {
    yield group.skipLocation();
    this.get('groupLoading').perform();
  }),

  removeLocation: task(function*(location) {
    location.deleteRecord();
    yield location.save();
    this.get('groupLoading').perform();
  }),

  actions: {
    locationActiveChange(location) {
      location.save();
    },
    addLocation(/*group*/) {

    },
  },
});
