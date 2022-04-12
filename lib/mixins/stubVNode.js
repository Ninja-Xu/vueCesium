/**
 * vue-cesium - https://github.com/zouyaoji/vue-cesium
 * Vue 2.x components for CesiumJS.
 *
 * @package VueCesium
 * @author zouyaoji <370681295@qq.com>
 * @version 2.2.12
 * @license MIT
 * @homepage https://zouyaoji.top/vue-cesium
 * @copyright (c) 2018-2022, zouyaoji <370681295@qq.com>
 */
import { extractChildren } from '../utils/vueHelpers';

/**
 * Renders stub VNode for component.
 */

var stubVNode = {
  /**
   * @param {function} h
   * @returns {VNode}
   */
  render: function render(h) {
    var options = this.$options.stubVNode || {}; // render as HTML comment

    if (options.empty) {
      var vnode = h();

      if (typeof options.empty === 'string') {
        vnode.text = options.empty;
      } else if (typeof options.empty === 'function') {
        vnode.text = options.empty.call(this);
      }

      return vnode;
    }

    var children;

    if (options.slots === false) {
      children = undefined;
    } else {
      children = extractChildren(this.$slots, options.slots);
    }

    var attrs = typeof options.attrs === 'function' ? options.attrs.call(this) : options.attrs;
    var data = {
      attrs: attrs,
      style: {
        display: 'none !important'
      }
    };
    return h(options.tag || 'i', data, children);
  }
};

export default stubVNode;
