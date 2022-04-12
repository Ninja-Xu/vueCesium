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
import { url, ellipsoid, tileDiscardPolicy, credit, minimumLevel, maximumLevel } from '../../mixins/mixinProps';
import mixinImageryProvider from '../../mixins/providers/mixinImageryProvider';
import BaiduMapImageryProvider$1 from '../../exts/imageryProvider/BaiduMapImageryProvider';

var script = {
  name: 'vc-provider-imagery-baidumap',
  mixins: [url, ellipsoid, tileDiscardPolicy, credit, minimumLevel, maximumLevel, mixinImageryProvider],
  props: {
    protocol: {
      type: String,
      default: 'http'
    },
    props: {
      projectionTransforms: {
        type: Boolean | Object,
        default: function _default() {
          return {
            from: 'BD09',
            to: 'WGS84'
          };
        }
      }
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, setPropWatchers, unwatchFns, projectionTransforms, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, setPropWatchers = _this.setPropWatchers, unwatchFns = _this.unwatchFns, projectionTransforms = _this.projectionTransforms;
                options = transformProps($props);
                Cesium.BaiduMapImageryProvider = BaiduMapImageryProvider$1;

                if (unwatchFns.length === 0) {
                  setPropWatchers(true);
                }

                options.toWGS84 = projectionTransforms && projectionTransforms.from !== projectionTransforms.to && projectionTransforms.to.toUpperCase() === 'WGS84';
                return _context.abrupt("return", new Cesium.BaiduMapImageryProvider(options));

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

  component.__file = "BaiduMapImageryProvider.vue";

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


var BaiduMapImageryProvider = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(BaiduMapImageryProvider.name, BaiduMapImageryProvider);
}

export default plugin;
export { BaiduMapImageryProvider, plugin as install };
