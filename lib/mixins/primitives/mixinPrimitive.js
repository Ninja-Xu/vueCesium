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
import mergeDescriptors from '../../utils/mergeDescriptors';
import bindEvents from '../../utils/bindEvent';
import mixinPickEvent from '../event/mixinPickEvent';

var methods = {
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var primitives, primitive, registerEvents;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              primitives = _this.primitives, primitive = _this.primitive, registerEvents = _this.registerEvents;
              primitive.readyPromise && primitive.readyPromise.then(function (primitive) {
                var listener = _this.$listeners.readyPromise;
                listener && _this.$emit('readyPromise', primitive);
              }).otherwise(function (error) {
                throw new Cesium.DeveloperError(error);
              });
              bindEvents.call(_this, primitive, undefined, true);
              registerEvents(true);
              primitive._vcParent = primitives;
              return _context.abrupt("return", primitives && primitives.add(primitive));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  unmount: function unmount() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var primitives, primitive, registerEvents;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              primitives = _this2.primitives, primitive = _this2.primitive, registerEvents = _this2.registerEvents;
              _this2.childCount = 0;
              _this2.instances = [];
              bindEvents.call(_this2, primitive, undefined, false);
              registerEvents(false);
              return _context2.abrupt("return", primitives && primitives.remove(primitive));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  setGeometryInstances: function setGeometryInstances(geometryInstance, index) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var listener;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this3.instances.push(geometryInstance);

              if (index === _this3.childCount - 1) {
                listener = _this3.$listeners['update:geometryInstances'];

                if (listener) {
                  _this3.$emit('update:geometryInstances', _this3.instances);
                } else {
                  _this3.primitive.geometryInstances = index === 0 ? geometryInstance : _this3.instances;
                }
              }

              return _context3.abrupt("return", true);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  getServices: function getServices() {
    var vm = this;
    return mergeDescriptors(cmp.methods.getServices.call(this), {
      get primitive() {
        return vm.primitive;
      },

      get primitiveContainer() {
        return vm;
      }

    });
  }
};
var mixinPrimitive = {
  data: function data() {
    return {
      childCount: 0,
      instances: []
    };
  },
  props: {
    enableEvent: {
      type: Boolean,
      default: true
    }
  },
  mixins: [cmp, mixinPickEvent],
  methods: methods,
  stubVNode: {
    attrs: function attrs() {
      return {
        class: this.$options.name
      };
    }
  },
  created: function created() {
    var _this4 = this;

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
      },
      groundPrimitives: {
        enumerable: true,
        get: function get() {
          return _this4.$services && _this4.$services.groundPrimitives;
        }
      }
    });
  }
};

export default mixinPrimitive;
