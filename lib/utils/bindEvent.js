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
import './log';
import { Events } from './events';
import { toKebabCase } from './util';

/**
 * 将 Cesium 对象事件注册为 Vue 组件事件。
 * @param {Object} instance Cesium 对象。
 * @param {Array} eventList 该 Cesium 对象的事件数组。
 * @param {Boolean} flag true 注册事件，false 注销事件。
 */

function bindEvent (instance, eventList) {
  var _this = this;

  var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var ev = eventList || Events[toKebabCase(this.$options.name)];
  ev && ev.forEach(function (eventName) {
    if (instance && instance[eventName]) {
      var listener = _this.$listeners[eventName] || _this.$listeners[eventName.toLowerCase()];

      var methodName = flag ? 'addEventListener' : 'removeEventListener';
      listener && instance[eventName][methodName](listener.fns);
    }
  });
}

export default bindEvent;
