import Component from '@ember/component';
import ValidationContainer from 'groupr/mixins/validation-container';

export default Component.extend(ValidationContainer, {
  tagName: 'form',
  classNames: ['ui', 'form'],
  classNameBindings: ['error', 'loading'],

  secondaryFirst: false,

  submit: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.sendAction('action', this.get('param'));
    this.showValidation();
  },

  actions: {
    cancel() {
      this.sendAction('cancel');
    },
    publishFormLinkAction(action) {
      this.sendAction(action);
    },
  },
});
