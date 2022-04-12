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
import * as PointGraphics from '../../entity/point';

var script = {
  name: 'vc-shine-point',
  mixins: [cmp, position, color, show],
  props: {
    pixelSize: {
      type: Number,
      default: 10
    },
    deviationAlpha: {
      type: Number,
      default: 0.05
    }
  },
  data: function data() {
    return {
      callBackColor: {}
    };
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var deviationAlpha, color, colorObject;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                deviationAlpha = _this.deviationAlpha, color = _this.color;
                colorObject = makeColor(color);
                _this.flag = true;
                _this.x = 1;

                _this.callBackColor = function () {
                  if (_this.flag) {
                    _this.x -= deviationAlpha;
                    _this.x <= 0 && (_this.flag = false);
                  } else {
                    _this.x += deviationAlpha;
                    _this.x >= 1 && (_this.flag = true);
                  }

                  return colorObject.withAlpha(_this.x);
                };

                return _context.abrupt("return", _this.$refs.entity);

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
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _this2.$refs.entity && _this2.$refs.entity.unload());

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
    var _this3 = this;

    Object.defineProperties(this, {
      entity: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
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
      "position": _vm.position
    }
  }, [_c('vc-graphics-point', {
    attrs: {
      "color": _vm.callBackColor,
      "heightReference": 2,
      "outlineWidth": 0,
      "pixelSize": _vm.pixelSize,
      "show": _vm.show
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

  component.__file = "VcShinePoint.vue";

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


var VcShinePoint = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(Entity);
  Vue.use(PointGraphics);
  Vue.component(VcShinePoint.name, VcShinePoint);
}

export default plugin;
export { VcShinePoint, plugin as install };
