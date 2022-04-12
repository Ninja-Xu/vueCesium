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
import cmp from '../mixins/virtualCmp';
import mergeDescriptors from '../utils/mergeDescriptors';

var script = {
  name: 'vc-collection-stage-process-post',
  mixins: [cmp],
  props: {
    stages: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var transformProps, stages, postProcessStageCollection;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                transformProps = _this.transformProps, stages = _this.stages;
                postProcessStageCollection = new Cesium.PostProcessStageCollection();
                stages.forEach(function (stage) {
                  var stageOptions = transformProps(stage);
                  postProcessStageCollection.add(new Cesium.PostProcessStage(stageOptions));
                });
                return _context.abrupt("return", postProcessStageCollection);

              case 4:
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
        var postProcessStages, viewer;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postProcessStages = _this2.postProcessStages, viewer = _this2.viewer;
                viewer.scene.postProcessStages = postProcessStages;
                return _context2.abrupt("return", true);

              case 3:
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
        var postProcessStages;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                postProcessStages = _this3.postProcessStages;
                postProcessStages.destroy();
                return _context3.abrupt("return", true);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getServices: function getServices() {
      var vm = this;
      return mergeDescriptors(cmp.methods.getServices.call(this), {
        get postProcessStages() {
          return vm.postProcessStages;
        },

        get postProcessStagesContainer() {
          return vm;
        }

      });
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      postProcessStages: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
        }
      }
    });
  },
  stubVNode: {
    attrs: function attrs() {
      return {
        class: this.$options.name
      };
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

  component.__file = "PostProcessStageCollection.vue";

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


var PostProcessStageCollection = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(PostProcessStageCollection.name, PostProcessStageCollection);
}

export default plugin;
export { PostProcessStageCollection, plugin as install };
