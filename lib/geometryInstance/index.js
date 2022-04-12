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
import { modelMatrix, id } from '../mixins/mixinProps';
import mergeDescriptors from '../utils/mergeDescriptors';

var script = {
  name: 'vc-instance-geometry',
  mixins: [cmp, modelMatrix, id],
  props: {
    geometry: Object,
    attributes: Object
  },
  methods: {
    /**
     * 重写 createCesiumObject 方法，因为 GeometryInstance 构造参数中有一个必要参数 geometry，需要单独处理一下。
     */
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

                if (!options.geometry) {
                  options.geometry = new Cesium.Geometry({
                    attributes: new Cesium.GeometryAttributes()
                  });
                }

                return _context.abrupt("return", new Cesium.GeometryInstance(options));

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
        var geometryInstance, primitiveContainer;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.index = _this2.$parent.childCount;
                _this2.$parent.childCount += 1;
                geometryInstance = _this2.geometryInstance, primitiveContainer = _this2.primitiveContainer;
                primitiveContainer && primitiveContainer.setGeometryInstances(geometryInstance, _this2.index);
                return _context2.abrupt("return", true);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    setGeometry: function setGeometry(geometry) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var listener;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                listener = _this3.$listeners['update:geometry'];

                if (listener) {
                  _this3.$emit('update:geometry', geometry);
                } else _this3.geometryInstance.geometry = geometry;

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
        get geometryInstance() {
          return vm.geometryInstance;
        },

        get geometryContainer() {
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

    this.renderByParent = true;
    Object.defineProperties(this, {
      geometryInstance: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
        }
      },
      primitiveContainer: {
        enumerable: true,
        get: function get() {
          return _this4.$services && _this4.$services.primitiveContainer;
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

  component.__file = "GeometryInstance.vue";

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


var GeometryInstance = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(GeometryInstance.name, GeometryInstance);
}

export default plugin;
export { GeometryInstance, plugin as install };
