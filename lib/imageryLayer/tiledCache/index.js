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
import { url, format, credit, minimumLevel, maximumLevel, rectangle, tilingScheme, ellipsoid, tileWidth, tileHeight } from '../../mixins/mixinProps';
import mixinImageryProvider from '../../mixins/providers/mixinImageryProvider';

var script = {
  name: 'vc-provider-imagery-tiledcache',
  mixins: [url, format, credit, minimumLevel, maximumLevel, rectangle, tilingScheme, ellipsoid, tileWidth, tileHeight, mixinImageryProvider],
  props: {
    dir: {
      type: String,
      reqiured: true
    },
    scales: {
      type: Array,
      default: function _default() {
        return [1 / 295829355, 1 / 147914678, 1 / 73957339, 1 / 36978669, 1 / 18489335, 1 / 9244667, 1 / 4622334, 1 / 2311167, 1 / 1155583, 1 / 577792, 1 / 288896, 1 / 144448, 1 / 72224, 1 / 36112, 1 / 18056, 1 / 9026, 1 / 4514];
      }
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, padWithZerosIfNecessary, scales, options, _Cesium, Credit, defined, defaultValue, DeveloperError, Ellipsoid, GeographicTilingScheme, Rectangle, Resource, UrlTemplateImageryProvider, url, dir, format, resource, tilingScheme, tileWidth, tileHeight, maximumLevel, minimumLevel, rectangle, swTile, neTile, tileCount, credit;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, padWithZerosIfNecessary = _this.padWithZerosIfNecessary, scales = _this.scales;
                options = transformProps($props);
                _Cesium = Cesium, Credit = _Cesium.Credit, defined = _Cesium.defined, defaultValue = _Cesium.defaultValue, DeveloperError = _Cesium.DeveloperError, Ellipsoid = _Cesium.Ellipsoid, GeographicTilingScheme = _Cesium.GeographicTilingScheme, Rectangle = _Cesium.Rectangle, Resource = _Cesium.Resource, UrlTemplateImageryProvider = _Cesium.UrlTemplateImageryProvider;
                url = options.url, dir = options.dir, format = options.format;

                if (defined(url)) {
                  _context.next = 6;
                  break;
                }

                throw new DeveloperError('options.url is required.');

              case 6:
                if (defined(dir)) {
                  _context.next = 8;
                  break;
                }

                throw new DeveloperError('options.dir is required.');

              case 8:
                resource = Resource.createIfNeeded(url);
                resource.url += "?dir=".concat(dir, "&scale={scale}&col={x}&row={y}&format=").concat(format);
                tilingScheme = defaultValue(options.tilingScheme, new GeographicTilingScheme({
                  ellipsoid: defaultValue(options.ellipsoid, Ellipsoid.WGS84),
                  numberOfLevelZeroTilesX: 2,
                  numberOfLevelZeroTilesY: 1
                }));
                tileWidth = defaultValue(options.tileWidth, 256);
                tileHeight = defaultValue(options.tileHeight, 256);
                maximumLevel = options.maximumLevel;
                minimumLevel = defaultValue(options.minimumLevel, 0);
                rectangle = defaultValue(options.rectangle, tilingScheme.rectangle); // Check the number of tiles at the minimum level.  If it's more than four,
                // throw an exception, because starting at the higher minimum
                // level will cause too many tiles to be downloaded and rendered.

                swTile = tilingScheme.positionToTileXY(Rectangle.southwest(rectangle), minimumLevel);
                neTile = tilingScheme.positionToTileXY(Rectangle.northeast(rectangle), minimumLevel);
                tileCount = (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1);

                if (!(tileCount > 4)) {
                  _context.next = 21;
                  break;
                }

                throw new DeveloperError('The rectangle and minimumLevel indicate that there are ' + tileCount + ' tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.');

              case 21:
                credit = defaultValue(options.credit, '');

                if (typeof credit === 'string') {
                  credit = new Credit(credit);
                }

                return _context.abrupt("return", new UrlTemplateImageryProvider({
                  url: resource,
                  credit: credit,
                  tilingScheme: tilingScheme,
                  tileWidth: tileWidth,
                  tileHeight: tileHeight,
                  minimumLevel: minimumLevel,
                  maximumLevel: maximumLevel,
                  rectangle: rectangle,
                  customTags: {
                    scale: function scale(imageryProvider, x, y, level) {
                      var s = 1 / scales[level];
                      return padWithZerosIfNecessary(imageryProvider, '{scale}', s);
                    }
                  }
                }));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    padWithZerosIfNecessary: function padWithZerosIfNecessary(imageryProvider, key, value) {
      if (imageryProvider && imageryProvider.urlSchemeZeroPadding && Object.prototype.hasOwnProperty.call(imageryProvider.urlSchemeZeroPadding, key)) {
        var paddingTemplate = imageryProvider.urlSchemeZeroPadding[key];

        if (typeof paddingTemplate === 'string') {
          var paddingTemplateWidth = paddingTemplate.length;

          if (paddingTemplateWidth > 1) {
            value = value.length >= paddingTemplateWidth ? value : new Array(paddingTemplateWidth - value.toString().length + 1).join('0') + value;
          }
        }
      }

      return value;
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

  component.__file = "TiledCacheImageryProvider.vue";

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


var TiledCacheImageryProvider = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(TiledCacheImageryProvider.name, TiledCacheImageryProvider);
}

export default plugin;
export { TiledCacheImageryProvider, plugin as install };
