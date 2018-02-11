import Component from '@ember/component';

export default Component.extend({
  centered: true,
  loading: true,
  inline: true,
  classNames: ['ui', 'loader'],
  classNameBindings: ['loading:active:disabled', 'centered', 'inline', 'text:text', 'inverted', 'indeterminate', 'size'],
});
