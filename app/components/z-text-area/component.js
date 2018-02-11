import {
  computed
} from '@ember/object';
import {
  readOnly
} from '@ember/object/computed';
import Component from '@ember/component';
import Validation from 'groupr/mixins/validation';

export default Component.extend(Validation, {
  classNames: ['ui', 'fluid', 'input', 'text-area'],

  classNameBindings: ['fluid'],

  characterLimit: readOnly('validation.options.length.max'),

  overCharacterLimit: computed('characterLimit', 'value.length', function() {
    return this.get('characterLimit') < this.get('value.length');
  }),
});
