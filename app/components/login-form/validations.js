import {
  validator,
  buildValidations
} from 'ember-cp-validations';

export default buildValidations({
  email: validator('presence', true),
  password: validator('presence', true),
});
