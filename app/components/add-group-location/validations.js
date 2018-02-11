import {
  validator,
  buildValidations
} from 'ember-cp-validations';

export default buildValidations({
  name: [
    validator('presence', true),
  ],
  address: [
    validator('presence', true),
  ],
  city: [
    validator('presence', true),
  ],
  state: [
    validator('presence', true),
  ],
  zipCode: [
    validator('presence', true),
  ],
});
