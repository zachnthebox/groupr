import {
  throttle,
  scheduleOnce
} from '@ember/runloop';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  _hasWindowSizeChanged(width, height) {
    return width !== this.get('screenWidth') || height !== this.get('screenHeight');
  },
  didInsertElement() {
    this._super(...arguments);
    this._onResizeHandler = () => {
      const {
        innerWidth,
        innerHeight
      } = window;
      if (this._hasWindowSizeChanged(innerWidth, innerHeight)) {
        throttle(this, () => {
          this.set('screenWidth', innerWidth);
          this.set('screenHeight', innerHeight);
          this.send('resize', innerWidth, innerHeight);
        }, 100);
      }
    };

    scheduleOnce('afterRender', this, function() {
      this.set('screenWidth', window.innerWidth);
      this.set('screenHeight', window.innerHeight);
    });
    this._installResizeListener();
  },
  destroy() {
    this._uninstallResizeListener();
    this._super(...arguments);
  },
  _installResizeListener() {
    window.addEventListener('resize', this._onResizeHandler);
  },
  _uninstallResizeListener() {
    window.removeEventListener('resize', this._onResizeHandler);
  },
  actions: {
    resize() {}
  }
});

const mobileBreakpoint = 320;
const tabletBreakpoint = 768;
const computerBreakpoint = 992;
const largeMonitorBreakpoint = 1200;
const widescreenMonitorBreakpoint = 1920;

export {
  mobileBreakpoint,
  tabletBreakpoint,
  computerBreakpoint,
  largeMonitorBreakpoint,
  widescreenMonitorBreakpoint
};
