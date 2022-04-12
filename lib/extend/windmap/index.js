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
import cmp from '../../mixins/virtualCmp';
import colorTable from '../../exts/wind/colorTable';
import Wind3D from '../../exts/wind/wind3D';

var script = {
  name: 'vc-windmap',
  mixins: [cmp],
  props: {
    data: Object,
    colorTable: {
      type: Object,
      default: function _default() {
        return colorTable;
      }
    },
    particleSystemOptions: {
      type: Object,
      default: function _default() {
        return {
          particlesTextureSize: 128,
          maxParticles: 128 * 128,
          particleHeight: 100.0,
          fadeOpacity: 0.996,
          dropRate: 0.003,
          dropRateBump: 0.01,
          speedFactor: 4.0,
          lineWidth: 4.0
        };
      }
    }
  },
  watch: {
    data: function data(val) {
      this.reload();
    },
    particleSystemOptions: {
      handler: function handler(val) {
        this.windMap.particleSystem.applyParticleSystemOptions(val);
      },
      deep: true
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var viewer, particleSystemOptions, windMap;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                viewer = _this.viewer, particleSystemOptions = _this.particleSystemOptions;

                if (_this.isEmptyObj(_this.data)) {
                  _context.next = 5;
                  break;
                }

                _this.data.colorTable = _this.loadColorTable();
                windMap = new Wind3D(viewer, _this.data, particleSystemOptions);
                return _context.abrupt("return", windMap);

              case 5:
                return _context.abrupt("return", true);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    loadColorTable: function loadColorTable() {
      var json = this.colorTable;
      var colorNum = json.ncolors;
      var colorTable = json.colorTable;
      var colorsArray = new Float32Array(3 * colorNum);

      for (var i = 0; i < colorNum; i++) {
        colorsArray[3 * i] = colorTable[3 * i];
        colorsArray[3 * i + 1] = colorTable[3 * i + 1];
        colorsArray[3 * i + 2] = colorTable[3 * i + 2];
      }

      var result = {};
      result.colorNum = colorNum;
      result.array = colorsArray;
      return result;
    },
    mount: function mount() {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", true);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    unmount: function unmount() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this2.isEmptyObj(_this2.windMap)) {
                  _this2.windMap.destroy();
                }

                return _context3.abrupt("return", true);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this3 = this;

    Object.defineProperties(this, {
      windMap: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.cesiumObject;
        }
      }
    });
  }
};

/* script */
var __vue_script__ = script;
/* template */

/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* functional template */

var __vue_is_functional_template__ = undefined;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcWindMap.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */


var VcWindMap = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(VcWindMap.name, VcWindMap);
}

export default plugin;
export { VcWindMap, plugin as install };
