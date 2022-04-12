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
import mixinPickEvent from '../event/mixinPickEvent';

var methods = {
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var primitives, collection, registerEvents;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              primitives = _this.primitives, collection = _this.collection, registerEvents = _this.registerEvents;
              registerEvents(true);
              collection._vcParent = primitives;
              return _context.abrupt("return", primitives && primitives.add(collection));

            case 4:
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
      var primitives, collection, registerEvents;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              primitives = _this2.primitives, collection = _this2.collection, registerEvents = _this2.registerEvents;
              registerEvents(false);
              return _context2.abrupt("return", primitives && !collection.isDestroyed() && primitives.remove(collection));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  getServices: function getServices() {
    var vm = this;
    return mergeDescriptors(cmp.methods.getServices.call(this), {
      get primitives() {
        return vm.collection;
      },

      get collectionContainer() {
        return vm;
      }

    });
  }
};
var mixinPrimitiveCollection = {
  mixins: [cmp, mixinPickEvent],
  methods: methods,
  props: {
    enableEvent: {
      type: Boolean,
      default: true
    }
  },
  stubVNode: {
    attrs: function attrs() {
      return {
        class: this.$options.name
      };
    }
  },
  created: function created() {
    var _this3 = this;

    Object.defineProperties(this, {
      collection: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
        }
      },
      primitives: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.$services.primitives;
        }
      },
      groundPrimitives: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.$services.groundPrimitives;
        }
      }
    });
  }
};

export default mixinPrimitiveCollection;
