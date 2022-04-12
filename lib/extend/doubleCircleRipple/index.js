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
import _Promise from '@babel/runtime-corejs2/core-js/promise';
import cmp from '../../mixins/virtualCmp';
import { position, show, color, height } from '../../mixins/mixinProps';
import { makeColor } from '../../utils/cesiumHelpers';
import * as Entity from '../../entity';
import * as EllipseGraphics from '../../entity/ellipse';

var script = {
  name: 'vc-ripple-circle-double',
  mixins: [cmp, position, show, color, height],
  props: {
    minRadius: {
      type: Number,
      default: 0.1
    },
    maxRadius: {
      type: Number,
      default: 3000
    },
    deviationRadius: {
      type: Number,
      default: 40
    },
    interval: {
      type: Number,
      default: 1000
    },
    imageUrl: String
  },
  data: function data() {
    return {
      material: {},
      radius1: undefined,
      radius2: undefined
    };
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.init();

                return _context.abrupt("return", _Promise.all([_this.$refs.entity1, _this.$refs.entity2]));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    init: function init() {
      var _this2 = this;

      var minRadius = this.minRadius,
          maxRadius = this.maxRadius,
          imageUrl = this.imageUrl,
          interval = this.interval,
          changeRadius1 = this.changeRadius1,
          changeRadius2 = this.changeRadius2,
          color = this.color;
      var cesiumColor = makeColor(color);
      this.r1 = minRadius;
      this.r2 = minRadius;
      this.material = {
        fabric: {
          type: 'Image',
          uniforms: {
            image: imageUrl,
            transparent: true,
            color: function color() {
              return cesiumColor.withAlpha(1 - _this2.r1 / maxRadius); // entity的颜色透明 并不影响材质，并且 entity也会透明哦
            }
          }
        }
      };
      this.radius1 = changeRadius1;
      setTimeout(function () {
        _this2.radius2 = changeRadius2;
      }, interval);
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
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.radius1 = 0;
                _this3.radius2 = 0;
                return _context3.abrupt("return", true);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    changeRadius1: function changeRadius1() {
      var deviationRadius = this.deviationRadius,
          maxRadius = this.maxRadius,
          minRadius = this.minRadius;

      if (!this.flag1) {
        this.r1 += deviationRadius;

        if (this.r1 >= maxRadius) {
          this.r1 = minRadius;
        }

        this.flag1 = true;
      } else {
        this.flag1 = false;
      }

      return this.r1;
    },
    changeRadius2: function changeRadius2() {
      var deviationRadius = this.deviationRadius,
          maxRadius = this.maxRadius,
          minRadius = this.minRadius;

      if (!this.flag2) {
        this.r2 += deviationRadius;

        if (this.r2 >= maxRadius) {
          this.r2 = minRadius;
        }

        this.flag2 = true;
      } else {
        this.flag2 = false;
      }

      return this.r2;
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      entities: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
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
    ref: "entity1",
    attrs: {
      "position": _vm.position,
      "show": _vm.show
    }
  }, [_c('vc-graphics-ellipse', {
    attrs: {
      "height": _vm.height,
      "material": _vm.material,
      "semiMajorAxis": _vm.radius1,
      "semiMinorAxis": _vm.radius1
    }
  })], 1), _vm._v(" "), _c('vc-entity', {
    ref: "entity2",
    attrs: {
      "position": _vm.position,
      "show": _vm.show
    }
  }, [_c('vc-graphics-ellipse', {
    attrs: {
      "height": _vm.height,
      "material": _vm.material,
      "semiMajorAxis": _vm.radius2,
      "semiMinorAxis": _vm.radius2
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

  component.__file = "VcDoubleCircleRipple.vue";

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


var VcDoubleCircleRipple = __vue_normalize__({
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
  Vue.component(VcDoubleCircleRipple.name, VcDoubleCircleRipple);
}

export default plugin;
export { VcDoubleCircleRipple, plugin as install };
