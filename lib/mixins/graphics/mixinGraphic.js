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
import _asyncToGenerator from '@babel/runtime-corejs2/helpers/esm/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import bindEvents from '../../utils/bindEvent';
import { Events } from '../../utils/events';
import cmp from '../virtualCmp';

var methods = {
  /**
   * 用异步方式的将 graphics 挂载到 entity。
   */
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var graphics, graphicsContainer, $options, arr;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              graphics = _this.graphics, graphicsContainer = _this.graphicsContainer, $options = _this.$options;
              bindEvents.call(_this, graphics, Events['entity-events']);
              arr = $options.name.split('-');
              return _context.abrupt("return", graphicsContainer && graphicsContainer.setGraphics(graphics, arr.length === 3 ? arr[2] : 'polylineVolume'));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * 用异步方的式将 graphics 从 entity 卸载。
   */
  unmount: function unmount() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var graphics, graphicsContainer, $options, arr;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              graphics = _this2.graphics, graphicsContainer = _this2.graphicsContainer, $options = _this2.$options;
              bindEvents.call(_this2, graphics, Events['entity-events'], false);
              arr = $options.name.split('-');
              return _context2.abrupt("return", graphicsContainer && graphicsContainer.setGraphics(undefined, arr.length === 3 ? arr[2] : 'polylineVolume'));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
/**
 * 与 vc-entity 组件关联的各 graphics 子组件基础混入方法。
 */

var mixinGraphic = {
  mixins: [cmp],
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this3 = this;

    Object.defineProperties(this, {
      graphics: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
        }
      },
      graphicsContainer: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.$services.graphicsContainer;
        }
      }
    });
  }
};

export default mixinGraphic;
