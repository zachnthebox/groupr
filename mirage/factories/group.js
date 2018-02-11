import {
  Factory,
  faker
} from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  name() {
    return `${faker.name.findName()}'s Group`;
  },
  dayOfWeek() {
    return moment(faker.date.recent()).isoWeekday();
  },
  time() {
    return moment(faker.date.recent()).format('LT');
  },
  nextDate() {
    const date = moment().add(1, 'weeks').isoWeekday(this.dayOfWeek).format('L');
    return moment(`${date} ${this.time}`, 'L LT').toDate();
  },
  afterCreate(group, server) {
    const locations = server.createList('location', 3, {
      group,
    });
    group.locations = locations;
    group.nextLocation = locations[0];
    group.save();
  },
});
