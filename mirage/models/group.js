import {
  Model,
  belongsTo,
  hasMany
} from 'ember-cli-mirage';

export default Model.extend({
  nextLocation: belongsTo('location', {
    inverse: null,
  }),
  locations: hasMany('location', {
    inverse: 'locations'
  }),
});
