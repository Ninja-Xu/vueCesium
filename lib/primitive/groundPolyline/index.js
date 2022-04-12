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
import { geometryInstances, appearance, show, interleave, releaseGeometryInstances, aaMixin, classificationType, debugShowBoundingVolume, debugShowShadowVolume } from '../../mixins/mixinProps';
import mixinPrimitive from '../../mixins/primitives/mixinPrimitive';

var script = {
  name: 'vc-primitive-polyline-ground',
  mixins: [geometryInstances, appearance, show, interleave, releaseGeometryInstances, aaMixin, classificationType, debugShowBoundingVolume, debugShowShadowVolume, mixinPrimitive],
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

                if (options.asynchronous) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return Cesium.GroundPolylinePrimitive.initializeTerrainHeights();

              case 5:
                return _context.abrupt("return", new Cesium.GroundPolylinePrimitive(options));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
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

  component.__file = "GroundPolylinePrimitive.vue";

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


var GroundPolylinePrimitive = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(GroundPolylinePrimitive.name, GroundPolylinePrimitive);
}

export default plugin;
export { GroundPolylinePrimitive, plugin as install };
