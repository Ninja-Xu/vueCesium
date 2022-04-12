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
import { url } from '../../mixins/mixinProps';
import mixinTerrainProvider from '../../mixins/providers/mixinTerrainProvider';

var script = {
  name: 'VcProviderTerrainCesium',
  mixins: [url, mixinTerrainProvider],
  props: {
    requestVertexNormals: Boolean,
    requestWaterMask: Boolean,
    requestMetadata: Boolean,
    ellipsoid: Object,
    credit: [String, Object]
  },
  methods: {
    /**
     * 重写 createCesiumObject 方法。
     */
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var url, requestVertexNormals, requestWaterMask, requestMetadata, ellipsoid, credit, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _this.url, requestVertexNormals = _this.requestVertexNormals, requestWaterMask = _this.requestWaterMask, requestMetadata = _this.requestMetadata, ellipsoid = _this.ellipsoid, credit = _this.credit;
                options = {
                  url: url,
                  requestVertexNormals: requestVertexNormals,
                  requestWaterMask: requestWaterMask,
                  requestMetadata: requestMetadata,
                  ellipsoid: ellipsoid,
                  credit: credit
                };

                _this.removeNullItem(options);

                return _context.abrupt("return", options.url ? new Cesium.CesiumTerrainProvider(options) : Cesium.createWorldTerrain({
                  requestVertexNormals: requestVertexNormals,
                  requestWaterMask: requestWaterMask
                }));

              case 4:
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

  component.__file = "CesiumTerrainProvider.vue";

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


var CesiumTerrainProvider = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(CesiumTerrainProvider.name, CesiumTerrainProvider);
}

export default plugin;
export { CesiumTerrainProvider, plugin as install };
