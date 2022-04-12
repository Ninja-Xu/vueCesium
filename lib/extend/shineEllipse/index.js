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
import { position, color, show } from '../../mixins/mixinProps';
import { makeColor } from '../../utils/cesiumHelpers';
import * as Entity from '../../entity';
import * as EllipseGraphics from '../../entity/ellipse';

var script = {
  name: 'vc-shine-ellipse',
  mixins: [cmp, position, color, show],
  props: {
    height: {
      type: Number,
      default: undefined
    },
    radius: {
      type: Number,
      default: 2000
    },
    deviationAlpha: {
      type: Number,
      default: 0.05
    },
    imageUrl: String
  },
  data: function data() {
    return {
      material: {}
    };
  },
  created: function created() {
    var _this = this;

    Object.defineProperties(this, {
      entity: {
        enumerable: true,
        get: function get() {
          return _this.cesiumObject;
        }
      }
    });
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var deviationAlpha, color, imageUrl, colorObject;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                deviationAlpha = _this2.deviationAlpha, color = _this2.color, imageUrl = _this2.imageUrl;
                colorObject = makeColor(color);
                _this2.flag = true;
                _this2.x = 1;
                _this2.material = {
                  fabric: {
                    type: 'Image',
                    uniforms: {
                      image: imageUrl,
                      color: function color() {
                        if (_this2.flag) {
                          _this2.x -= deviationAlpha;
                          _this2.x <= 0 && (_this2.flag = false);
                        } else {
                          _this2.x += deviationAlpha;
                          _this2.x >= 1 && (_this2.flag = true);
                        }

                        return colorObject.withAlpha(_this2.x);
                      }
                    }
                  }
                };
                return _context.abrupt("return", _this2.$refs.entity);

              case 6:
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
      "position": _vm.position,
      "show": _vm.show
    }
  }, [_c('vc-graphics-ellipse', {
    attrs: {
      "height": _vm.height,
      "material": _vm.material,
      "semi-major-axis": _vm.radius,
      "semi-minor-axis": _vm.radius
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

  component.__file = "VcShineEllipse.vue";

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


var VcShineEllipse = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(Entity);
  Vue.use(EllipseGraphics);
  Vue.component(VcShineEllipse.name, VcShineEllipse);
}

export default plugin;
export { VcShineEllipse, plugin as install };
