import {
  Factory,
  faker
} from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.findName();
  },
  address() {
    return faker.address.streetAddress();
  },
  city() {
    return faker.address.city();
  },
  state() {
    return faker.address.state();
  },
  zipCode() {
    return faker.address.zipCode();
  },
  active: true,
});
