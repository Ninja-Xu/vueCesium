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
import { positions, width, clampToGround, show } from '../../mixins/mixinProps';
import { makeColor } from '../../utils/cesiumHelpers';
import PolylineTrailMaterialProperty from '../../exts/materialProperty/PolylineTrailMaterialProperty';
import * as Entity from '../../entity';
import * as PolylineGraphics from '../../entity/polyline';

var script = {
  name: 'vc-trail-polyline',
  mixins: [cmp, positions, width, clampToGround, show],
  props: {
    color: {
      type: [Object, String, Array],
      default: 'yellow'
    },
    interval: {
      type: Number,
      default: 3000
    },
    imageUrl: String,
    loop: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      nowaiting: true,
      material: {}
    };
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var color, imageUrl, interval, loop, colorCesium;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                color = _this.color, imageUrl = _this.imageUrl, interval = _this.interval, loop = _this.loop;
                colorCesium = makeColor(color);
                _this.material = new PolylineTrailMaterialProperty(colorCesium, interval, imageUrl, loop);
                return _context.abrupt("return", _this.$refs.entity);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
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
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", true);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  created: function created() {
    var _this2 = this;

    Object.defineProperties(this, {
      entity: {
        enumerable: true,
        get: function get() {
          return _this2.cesiumObject;
        }
      }
    });
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
  }, [_c('vc-entity', {
    ref: "entity",
    attrs: {
      "show": _vm.show
    }
  }, [_c('vc-graphics-polyline', {
    attrs: {
      "material": _vm.material,
      "positions": _vm.positions,
      "width": _vm.width,
      "clampToGround": _vm.clampToGround
    }
  })], 1)], 1);
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

  component.__file = "VcPolylineTrail.vue";

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


var VcPolylineTrail = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(Entity);
  Vue.use(PolylineGraphics);
  Vue.component(VcPolylineTrail.name, VcPolylineTrail);
}

export default plugin;
export { VcPolylineTrail, plugin as install };
