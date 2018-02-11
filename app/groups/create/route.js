import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').createRecord('group');
  },

  actions: {
    groupCreated(group) {
      this.transitionTo('groups.group', group);
    },
  },
});
