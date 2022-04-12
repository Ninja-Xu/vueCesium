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
import { pixelOffset, position } from '../../mixins/mixinProps';
import { makeCartesian2, makeCartesian3 } from '../../utils/cesiumHelpers';

var script = {
  name: 'vc-overlay-html',
  mixins: [cmp, pixelOffset, position],
  props: {
    hiddenOnBack: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      // nowaiting: true,
      canRender: false
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
                return _context.abrupt("return", _this.$el);

              case 1:
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
        var viewer, onPreRender;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                viewer = _this2.viewer, onPreRender = _this2.onPreRender;
                viewer.scene.preRender.addEventListener(onPreRender);
                _this2.canRender = true;
                return _context2.abrupt("return", true);

              case 4:
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
        var viewer, onPreRender;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                viewer = _this3.viewer, onPreRender = _this3.onPreRender;
                viewer.scene.preRender.removeEventListener(onPreRender);
                _this3.canRender = false;
                return _context3.abrupt("return", true);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    onPreRender: function onPreRender() {
      var viewer = this.viewer,
          position = this.position,
          pixelOffset = this.pixelOffset,
          hiddenOnBack = this.hiddenOnBack;
      var cartesian2 = makeCartesian2(pixelOffset);
      var cartesian3 = makeCartesian3(position);
      var scratch = {};
      var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(cartesian3, scratch);

      if (Cesium.defined(canvasPosition)) {
        this.$el.style.left = canvasPosition.x + cartesian2.x + 'px';
        this.$el.style.top = canvasPosition.y + cartesian2.y + 'px';

        if (hiddenOnBack) {
          var cameraPosition = viewer.camera.position;
          var cartographicPosition = viewer.scene.globe.ellipsoid.cartesianToCartographic(cameraPosition);

          if (Cesium.defined(cartographicPosition)) {
            var cameraHeight = cartographicPosition.height;
            cameraHeight += 1 * viewer.scene.globe.ellipsoid.maximumRadius;

            if (Cesium.Cartesian3.distance(cameraPosition, cartesian3) > cameraHeight) {
              this.$el.style.display = 'none';
            } else {
              this.$el.style.display = 'block';
            }
          }
        } else {
          this.$el.style.display = 'block';
        }
      }
    },
    onClick: function onClick(e) {
      var listener = this.$listeners.click;
      listener && this.$emit('click', e);
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      element: {
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

  return _vm.canRender ? _c('div', {
    staticClass: "vc-html-container",
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _vm._e();
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

  component.__file = "VcHTMLOverlay.vue";

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


var VcHTMLOverlay = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(VcHTMLOverlay.name, VcHTMLOverlay);
}

export default plugin;
export { VcHTMLOverlay, plugin as install };
