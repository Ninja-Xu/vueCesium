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
import { cutoutRectangle, colorToAlpha } from '../mixins/mixinProps';
import mergeDescriptors from '../utils/mergeDescriptors';
import cmp from '../mixins/virtualCmp';

var script = {
  name: 'vc-layer-imagery',
  mixins: [cmp, cutoutRectangle, colorToAlpha],
  props: {
    imageryProvider: Object,
    rectangle: Object,
    alpha: {
      type: [Number, Function],
      default: 1.0
    },
    brightness: {
      type: [Number, Function],
      default: 1.0
    },
    contrast: {
      type: [Number, Function],
      default: 1.0
    },
    hue: {
      type: [Number, Function],
      default: 0.0
    },
    saturation: {
      type: [Number, Function],
      default: 1.0
    },
    gamma: {
      type: [Number, Function],
      default: 1.0
    },
    splitDirection: Number,
    minificationFilter: Number,
    magnificationFilter: Number,
    show: {
      type: Boolean,
      default: true
    },
    maximumAnisotropy: Number,
    minimumTerrainLevel: Number,
    maximumTerrainLevel: Number,
    colorToAlphaThreshold: {
      type: Number,
      default: 0.004
    },
    sortOrder: Number
  },
  methods: {
    /**
     * ImageryLayer 初始化方式较为特殊，这儿覆盖重写 createCesiumObject 方法。
     */
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, requiredArg, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, requiredArg = _this.requiredArg;
                options = transformProps($props);
                return _context.abrupt("return", new Cesium.ImageryLayer(requiredArg || {}, options));

              case 3:
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
        var viewer, imageryLayer, sortOrder;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                viewer = _this2.viewer, imageryLayer = _this2.imageryLayer, sortOrder = _this2.sortOrder;
                imageryLayer.sortOrder = sortOrder;
                viewer.imageryLayers.add(imageryLayer);
                return _context2.abrupt("return", !_this2.viewer.isDestroyed() && viewer.imageryLayers.contains(imageryLayer));

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
        var viewer, imageryLayer;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                viewer = _this3.viewer, imageryLayer = _this3.imageryLayer;
                return _context3.abrupt("return", !viewer.isDestroyed() && viewer.imageryLayers.remove(imageryLayer));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    setProvider: function setProvider(provider) {
      if (undefined === provider) {
        this.unmount();
      } else {
        this.imageryLayer._imageryProvider = provider;
        var listener = this.$listeners['update:imageryProvider'];
        if (listener) this.$emit('update:imageryProvider', provider);
      }

      return true;
    },
    getServices: function getServices() {
      var vm = this;
      return mergeDescriptors(cmp.methods.getServices.call(this), {
        get imageryLayer() {
          return vm.imageryLayer;
        },

        get providerContainer() {
          return vm;
        }

      });
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
    var _this4 = this;

    this._provider = undefined;
    Object.defineProperties(this, {
      imageryLayer: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
        }
      },
      requiredArg: {
        enumerable: true,
        get: function get() {
          return _this4.imageryProvider || _this4._provider;
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

  component.__file = "ImageryLayer.vue";

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


var ImageryLayer = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(ImageryLayer.name, ImageryLayer);
}

export default plugin;
export { ImageryLayer, plugin as install };