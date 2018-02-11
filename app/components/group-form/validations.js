import {
  validator,
  buildValidations
} from 'ember-cp-validations';

export default buildValidations({
  name: [
    validator('presence', true),
  ],
  dayOfWeek: [
    validator('presence', true),
  ],
  time: [
    validator('presence', true),
  ],
});
