import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').query('group', {});
  },

  actions: {
    viewGroup(group) {
      this.transitionTo('groups.group', group);
    },
    createGroup() {
      this.transitionTo('groups.create');
    },
  },
});
