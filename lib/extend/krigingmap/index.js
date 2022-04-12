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
import _parseFloat from '@babel/runtime-corejs2/core-js/parse-float';
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import cmp from '../../mixins/virtualCmp';
import kriging from '@sakitam-gis/kriging';
import { featureCollection, point } from '@turf/helpers';
import isobands from '@turf/isobands';
import * as GeoJsonDataSource from '../../datasource/geojson';

var script = {
  name: 'vc-kriging-map',
  data: function data() {
    return {
      coordinates: {
        west: 0,
        south: 0,
        east: 0,
        north: 0
      },
      data: {},
      datasourceOptions: {
        clampToGround: true
      }
    };
  },
  mixins: [cmp],
  props: {
    values: Array,
    lngs: Array,
    lats: Array,
    krigingModel: {
      type: String,
      default: 'exponential' // gaussian spherical exponential

    },
    krigingSigma2: {
      type: Number,
      default: 0
    },
    krigingAlpha: {
      type: Number,
      default: 100
    },
    canvasAlpha: {
      type: Number,
      default: 1
    },
    colors: {
      type: Array,
      default: function _default() {
        return ['#006837', '#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d73027', '#a50026'];
      }
    },
    breaks: {
      type: Array,
      default: function _default() {
        return [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
      }
    },
    clipCoords: {
      type: [Array, String],
      default: function _default() {
        return [];
      }
    },
    show: {
      type: Boolean,
      default: true
    },
    cell: Number
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var values, lngs, lats, krigingModel, krigingSigma2, breaks, clipCoords, krigingAlpha, variogram, coordinates, requstData, coords, i, j, rectangle, extent, grid, fc, collection, isobandsResult;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                values = _this.values, lngs = _this.lngs, lats = _this.lats, krigingModel = _this.krigingModel, krigingSigma2 = _this.krigingSigma2, breaks = _this.breaks, clipCoords = _this.clipCoords, krigingAlpha = _this.krigingAlpha;
                variogram = kriging.train(values, lngs, lats, krigingModel, krigingSigma2, krigingAlpha);
                coordinates = [];

                if (!(clipCoords instanceof Array)) {
                  _context.next = 7;
                  break;
                }

                if (clipCoords.length > 0 && clipCoords[0][0]) {
                  // 传的是 geojson 面
                  coordinates = clipCoords;
                } else {
                  // 传的是一个 bounds 数组 (左下和右上)
                  coordinates.push([[clipCoords[0], clipCoords[1]], [clipCoords[0], clipCoords[3]], [clipCoords[2], clipCoords[3]], [clipCoords[2], clipCoords[1]]]);
                }

                _context.next = 12;
                break;

              case 7:
                if (!(typeof clipCoords === 'string')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 10;
                return Cesium.Resource.fetchJson(clipCoords);

              case 10:
                requstData = _context.sent;
                coordinates = requstData.features[0].geometry.coordinates;

              case 12:
                coords = [];

                for (i = 0; i < coordinates[0].length; i++) {
                  for (j = 0; j < 2; j++) {
                    coords.push(coordinates[0][i][j]);
                  }
                }

                if (coords.length > 4) {
                  rectangle = Cesium.PolygonGeometry.computeRectangle({
                    polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(coords, _this.viewer.scene.globe.ellipsoid))
                  });
                } else {
                  rectangle = Cesium.Rectangle.fromDegrees(coords[0], coords[1], coords[2], coords[3]);
                }

                _this.coordinates = rectangle;
                extent = [Cesium.Math.toDegrees(rectangle.west), Cesium.Math.toDegrees(rectangle.south), Cesium.Math.toDegrees(rectangle.east), Cesium.Math.toDegrees(rectangle.north)];
                grid = kriging.grid(coordinates, variogram, _this.cell ? _this.cell : (extent[2] - extent[0]) / 200);
                fc = _this.gridFeatureCollection(grid, [extent[0], extent[2]], [extent[1], extent[3]]);
                collection = featureCollection(fc); // console.log(collection)

                isobandsResult = isobands(collection, breaks, {
                  zProperty: 'value'
                }); // console.log(isobandsResult)
                // const sortArea = (a, b) => {
                //   return area(b) - area(a)
                // }
                // // 按照面积对图层进行排序，规避turf的一个bug
                // isobandsResult.features.sort(sortArea)

                _this.data = isobandsResult;
                return _context.abrupt("return", _this.$refs.geojsonDatasource);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    ready: function ready(_ref) {
      var cesiumObject = _ref.cesiumObject;
      this.setPolygonColor(cesiumObject);
    },
    setPolygonColor: function setPolygonColor(cesiumObject) {
      var breaks = this.breaks,
          colors = this.colors,
          canvasAlpha = this.canvasAlpha;
      cesiumObject.entities.values.reduce(function (pre, cur) {
        var value = cur.properties.getValue(Cesium.JulianDate.now).value;
        var breakValue = value.substr(0, value.lastIndexOf('-'));
        var index = breaks.indexOf(_parseFloat(breakValue));
        cur.polygon.material = Cesium.Color.fromCssColorString(colors[index]).withAlpha(canvasAlpha);
        cur.polygon.outline = false;
        return true;
      }, []);
      return cesiumObject;
    },
    gridFeatureCollection: function gridFeatureCollection(grid, xlim, ylim) {
      // var range = grid.zlim[1] - grid.zlim[0]
      var i, j, x, y, z;
      var n = grid.data.length; // 列数

      var m = grid.data[0].length; // 行数

      var pointArray = [];

      for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
          x = i * grid.width + grid.xlim[0];
          y = j * grid.width + grid.ylim[0]; // z = (grid.data[i][j] - grid.zlim[0]) / range

          z = grid.data[i][j]; // if (z < 0.0) z = 0.0
          // if (z > 1.0) z = 1.0

          pointArray.push(point([x, y], {
            value: z
          }));
        }
      }

      return pointArray;
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
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", true);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
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
  }, [_c('vc-datasource-geojson', {
    ref: "geojsonDatasource",
    attrs: {
      "data": _vm.data,
      "options": _vm.datasourceOptions,
      "show": _vm.show
    },
    on: {
      "ready": _vm.ready
    }
  })], 1);
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

  component.__file = "VcKrigingMap.vue";

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


var VcKrigingMap = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(GeoJsonDataSource);
  Vue.component(VcKrigingMap.name, VcKrigingMap);
}

export default plugin;
export { VcKrigingMap, plugin as install };
