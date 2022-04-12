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
import { makeColor } from '../../utils/cesiumHelpers';
import * as ClassificationPrimitive from '../../primitive/classification';
import * as GeometryInstance from '../../geometryInstance';
import * as PolygonGeometry from '../../geometryInstance/polygon';

var script = {
  name: 'vc-analytics-flood',
  data: function data() {
    return {
      attributes: null,
      extrudedHeight: 0.1,
      flooding: false,
      show: false
    };
  },
  mixins: [cmp],
  props: {
    minHeight: {
      type: Number,
      default: 0
    },
    maxHeight: Number,
    polygonHierarchy: Array,
    speed: {
      type: Number,
      default: 10
    },
    color: {
      type: [Object, Array, String],
      default: 'rgba(40,150,200,0.6)'
    }
  },
  watch: {
    flooding: function flooding(val) {
      var listener = this.$listeners.activeEvt;

      if (val) {
        if (this.floodDone) {
          this.extrudedHeight = this.extrudedHeight >= this.minHeight ? this.minHeight : 0.1;
          this.floodDone = false;
        }

        this.viewer.clock.onTick.addEventListener(this.onTick);
        listener && this.$emit('activeEvt', {
          isActive: val
        });
        this.show = true;
      } else {
        this.viewer.clock.onTick.removeEventListener(this.onTick);
        listener && this.$emit('activeEvt', {
          isActive: val
        });
      }
    },
    minHeight: function minHeight(val) {
      this.extrudedHeight = val;
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var Cesium, minHeight, color, ColorGeometryInstanceAttribute;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Cesium = _this.Cesium, minHeight = _this.minHeight, color = _this.color;
                ColorGeometryInstanceAttribute = Cesium.ColorGeometryInstanceAttribute;
                _this.attributes = {
                  color: ColorGeometryInstanceAttribute.fromColor(makeColor(color))
                };
                _this.extrudedHeight = minHeight;
                return _context.abrupt("return", true);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onTick: function onTick(e) {
      var maxHeight = this.maxHeight,
          speed = this.speed;

      if (this.extrudedHeight < maxHeight) {
        this.extrudedHeight += speed;
        var listener = this.$listeners.tickEvt;
        listener && this.$emit('tickEvt', {
          clock: e,
          extrudedHeight: this.extrudedHeight
        });
      } else {
        this.floodDone = true;
        this.flooding = false;
      }
    },
    clear: function clear() {
      this.extrudedHeight = 0;
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
                _this2.extrudedHeight = _this2.minHeight;
                _this2.flooding = false;

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', {
    class: _vm.$options.name,
    staticStyle: {
      "display": "none !important"
    }
  }, [_c('vc-primitive-classification', {
    ref: "primitive",
    attrs: {
      "asynchronous": false,
      "show": _vm.extrudedHeight !== 0
    }
  }, [_c('vc-instance-geometry', {
    attrs: {
      "attributes": _vm.attributes
    }
  }, [_c('vc-geometry-polygon', {
    attrs: {
      "extrudedHeight": _vm.extrudedHeight,
      "polygonHierarchy": _vm.polygonHierarchy
    }
  })], 1)], 1)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcFlood.vue";

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


var VcFlood = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(ClassificationPrimitive);
  Vue.use(GeometryInstance);
  Vue.use(PolygonGeometry);
  Vue.component(VcFlood.name, VcFlood);
}

export default plugin;
export { VcFlood, plugin as install };
