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

var methods = {
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var geometry, geometryContainer;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              geometry = _this.geometry, geometryContainer = _this.geometryContainer;
              return _context.abrupt("return", geometryContainer.setGeometry(geometry));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
var mixinGeometry = {
  mixins: [cmp],
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this2 = this;

    this.renderByParent = true;
    Object.defineProperties(this, {
      geometry: {
        enumerable: true,
        get: function get() {
          return _this2.cesiumObject;
        }
      },
      geometryContainer: {
        enumerable: true,
        get: function get() {
          return _this2.$services && _this2.$services.geometryContainer;
        }
      }
    });
  }
};

export default mixinGeometry;
