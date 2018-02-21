import DS from 'ember-data';
import {
  memberAction
} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  dayOfWeek: DS.attr('number'),
  time: DS.attr('string'),
  locations: DS.hasMany('location', {
    inverse: 'group',
  }),
  nextDate: DS.attr('date'),
  nextLocation: DS.belongsTo('location', {
    inverse: null,
  }),

  skipLocation: memberAction({
    path: 'actions/skip-location',
    type: 'post',
  }),

  skipDate: memberAction({
    path: 'actions/skip-date',
    type: 'post',
  }),

  post: memberAction({
    path: 'actions/post',
    type: 'post',
  }),
});
