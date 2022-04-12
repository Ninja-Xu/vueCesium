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
import { clearColor, scissorRectangle } from '../mixins/mixinProps';
import cmp from '../mixins/virtualCmp';

var script = {
  name: 'vc-stage-process-post',
  mixins: [clearColor, scissorRectangle, cmp],
  props: {
    fragmentShader: String,
    uniforms: Object,
    textureScale: {
      type: Number
    },
    forcePowerOfTwo: {
      type: Boolean,
      default: false
    },
    sampleMode: Number,
    pixelFormat: Number,
    pixelDatatype: Number,
    name: String
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps;
                options = transformProps($props);
                return _context.abrupt("return", new Cesium.PostProcessStage(options));

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
        var postProcessStages, postProcessStage;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postProcessStages = _this2.postProcessStages, postProcessStage = _this2.postProcessStage;
                return _context2.abrupt("return", postProcessStages.add(postProcessStage));

              case 2:
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
        var postProcessStages, postProcessStage;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                postProcessStages = _this3.postProcessStages, postProcessStage = _this3.postProcessStage;
                return _context3.abrupt("return", postProcessStages.remove(postProcessStage));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      postProcessStage: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
        }
      },
      postProcessStages: {
        enumerable: true,
        get: function get() {
          return _this4.$services && _this4.$services.postProcessStages;
        }
      }
    });
  },
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
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

  component.__file = "PostProcessStage.vue";

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


var PostProcessStage = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(PostProcessStage.name, PostProcessStage);
}

export default plugin;
export { PostProcessStage, plugin as install };
