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
import cmp from '../virtualCmp';
import mixinPickEvent from '../event/mixinPickEvent';

var methods = {
  /**
   * 重写 createCesiumObject 方法。
   */
  createCesiumObject: function createCesiumObject() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var $props, transformProps, primitives, options;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $props = _this.$props, transformProps = _this.transformProps, primitives = _this.primitives;
              options = transformProps($props);
              return _context.abrupt("return", primitives && primitives.add(options));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  mount: function mount() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var primitives, primitive, registerEvents;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              primitives = _this2.primitives, primitive = _this2.primitive, registerEvents = _this2.registerEvents;
              registerEvents(true);
              return _context2.abrupt("return", primitives && primitives.contains(primitive));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  unmount: function unmount() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var primitives, primitive, registerEvents;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              primitives = _this3.primitives, primitive = _this3.primitive, registerEvents = _this3.registerEvents;
              registerEvents(false);
              return _context3.abrupt("return", primitives && !primitives.isDestroyed() && primitives.remove(primitive));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
var mixinPrimitiveCollectionItem = {
  props: {
    enableEvent: {
      type: Boolean,
      default: true
    }
  },
  mixins: [cmp, mixinPickEvent],
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this4 = this;

    this.index = 0;
    Object.defineProperties(this, {
      primitive: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
        }
      },
      primitives: {
        enumerable: true,
        get: function get() {
          return _this4.$services && _this4.$services.primitives;
        }
      }
    });
  }
};

export default mixinPrimitiveCollectionItem;
