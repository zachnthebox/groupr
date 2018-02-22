import {
  Promise as EmberPromise
} from 'rsvp'
import {
  inject as service
} from '@ember/service';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  ajax: service(),

  authenticate(session) {
    return this.get('ajax').post('/api/auth/sessions', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        session,
      },
    });
  },

  restore(data) {
    return new EmberPromise((resolve, reject) => {
      if (data.session) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
});
