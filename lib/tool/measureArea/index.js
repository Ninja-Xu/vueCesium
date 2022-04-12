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
import area from '@turf/area';
import mixinMeasure from '../../mixins/tool/mixinMeasure';
import { makeMaterial } from '../../utils/cesiumHelpers';
import { clone } from '../../utils/util';
import * as PrimitiveCollection from '../../primitiveCollection';
import * as GroundPrimitive from '../../primitive/ground';
import * as GeometryInstance from '../../geometryInstance';
import * as PolygonGeometry from '../../geometryInstance/polygon';
import * as Primitive from '../../primitive';
import * as GroundPolylinePrimitive from '../../primitive/groundPolyline';
import * as GroundPolylineGeometry from '../../geometryInstance/groundPolyline';
import * as PolylineCollection from '../../primitiveCollection/polylineCollection';
import * as Polyline from '../../primitive/polyline';
import * as PointPrimitiveCollection from '../../primitiveCollection/pointCollection';
import * as PointPrimitive from '../../primitive/point';
import * as LabelCollection from '../../primitiveCollection/labelCollection';
import * as Label from '../../primitive/label';

//
var script = {
  name: 'vc-measure-area',
  mixins: [mixinMeasure],
  data: function data() {
    return {
      index: 0,
      type: 'areaMeasuring',
      measuring: false,
      polylines: []
    };
  },
  props: {
    removeLastPosition: {
      type: Boolean,
      default: true
    },
    clampToGround: {
      type: Boolean,
      default: false
    },
    alongLine: {
      type: Boolean,
      default: true
    },
    polygonMaterial: {
      type: Object,
      default: function _default() {
        return {
          fabric: {
            type: 'Color',
            uniforms: {
              color: 'rgba(255,165,0,0.25)'
            }
          }
        };
      }
    }
  },
  watch: {
    clampToGround: function clampToGround() {
      var getSurfaceArea = this.getSurfaceArea,
          getDistance = this.getDistance,
          polylines = this.polylines;
      polylines.forEach(function (polyline) {
        polyline.area = getSurfaceArea(polyline.positions);
        var distances = [0];
        var totalDistance = 0;

        for (var i = 0; i < polyline.positions.length; i++) {
          var positions = [polyline.positions[i], polyline.positions.length - 1 !== i ? polyline.positions[i + 1] : polyline.positions[0]];
          var distance = getDistance(positions);
          totalDistance += distance;
          distances.push(totalDistance);
        }

        polyline.distances = distances;
        polyline.distance = totalDistance;
      });
    }
  },
  computed: {
    primitivePolylines: function primitivePolylines() {
      var _this = this;

      var polylines = [];
      this.polylines.forEach(function (item, index) {
        var polyline = {
          material: _this.polylineMaterial,
          positions: item.positions,
          width: _this.polylineWidth,
          polylineIndex: index,
          loop: true
        };
        polylines.push(polyline);
      });
      return polylines;
    },
    labels: function labels() {
      var _this2 = this;

      var labels = [];
      this.polylines.forEach(function (polyline, index) {
        var label = {
          backgroundColor: _this2.backgroundColor,
          fillColor: _this2.fillColor,
          font: _this2.font,
          horizontalOrigin: 1,
          labelStyle: _this2.labelStyle,
          outlineColor: _this2.outlineColor,
          outlineWidth: _this2.outlineWidth,
          pixelOffset: _this2.pixelOffset,
          position: polyline.positions[polyline.positions.length - 1],
          showBackground: _this2.showBackground,
          disableDepthTestDistance: Cesium.SuperMapVersion ? 0 : Number.POSITIVE_INFINITY,
          text: _this2.$vc.lang.measure.area + ': ' + (polyline.area > 1000000 ? (polyline.area / 1000000).toFixed(2) + 'km²' : polyline.area.toFixed(2) + '㎡')
        };
        labels.push(label);
        polyline.positions.forEach(function (position, subIndex) {
          if (_this2.alongLine && polyline.positions.length > 1 && subIndex + 1 < polyline.distances.length) {
            var _label = {
              backgroundColor: _this2.backgroundColor,
              fillColor: _this2.fillColor,
              font: _this2.font,
              horizontalOrigin: 0,
              labelStyle: _this2.labelStyle,
              outlineColor: _this2.outlineColor,
              outlineWidth: _this2.outlineWidth,
              pixelOffset: _this2.pixelOffset,
              position: subIndex !== polyline.positions.length - 1 ? _this2.getMidPoistion(polyline.positions[subIndex], polyline.positions[subIndex + 1]) : _this2.getMidPoistion(polyline.positions[subIndex], polyline.positions[0]),
              showBackground: _this2.showBackground,
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
              text: _this2.getDistanceText(polyline.distances[subIndex + 1] - polyline.distances[subIndex]),
              verticalOrigin: 0
            };
            labels.push(_label);
          }
        });
      });
      return labels;
    }
  },
  methods: {
    getDistanceText: function getDistanceText(distance) {
      return distance > 1000 ? (distance / 1000).toFixed(2) + 'km' : distance.toFixed(2) + 'm';
    },
    getMidPoistion: function getMidPoistion(left, right) {
      var _Cesium = Cesium,
          Cartesian3 = _Cesium.Cartesian3;
      return Cartesian3.midpoint(left, right, new Cartesian3());
    },
    makeEllipsoidSurfaceAppearance: function makeEllipsoidSurfaceAppearance(val) {
      return new Cesium.EllipsoidSurfaceAppearance({
        material: makeMaterial.call(this, val),
        renderState: {
          cull: {
            enabled: false
          }
        }
      });
    },
    makePolylineMaterialAppearance: function makePolylineMaterialAppearance(val) {
      return new Cesium.PolylineMaterialAppearance({
        material: makeMaterial.call(this, val)
      });
    },
    clone: clone,

    /**
     * 用海伦公式获取传入坐标的构成的多边形的面积。
     * @param {Array.Cartesian}
     * @returns {Number} 返回面积数值。
     */
    getSurfaceArea: function getSurfaceArea(vals) {
      var positions = clone(vals, true);

      if (positions.length < 3) {
        return 0;
      }

      var _Cesium2 = Cesium,
          Cartesian3 = _Cesium2.Cartesian3,
          EllipsoidTangentPlane = _Cesium2.EllipsoidTangentPlane,
          CesiumMath = _Cesium2.Math,
          PolygonGeometryLibrary = _Cesium2.PolygonGeometryLibrary,
          PolygonHierarchy = _Cesium2.PolygonHierarchy,
          VertexFormat = _Cesium2.VertexFormat,
          ArcType = _Cesium2.ArcType;
      var viewer = this.viewer;
      var perPositionHeight = !this.clampToGround; // Request the triangles that make up the polygon from Cesium.
      // 获取组成多边形的三角形。

      var tangentPlane = EllipsoidTangentPlane.fromPoints(positions, viewer.scene.globe.ellipsoid);
      var polygons = PolygonGeometryLibrary.polygonsFromHierarchy(new PolygonHierarchy(positions), tangentPlane.projectPointsOntoPlane.bind(tangentPlane), this.clampToGround, viewer.scene.globe.ellipsoid);
      var geom = PolygonGeometryLibrary.createGeometryFromPositions(viewer.scene.globe.ellipsoid, polygons.polygons[0], CesiumMath.RADIANS_PER_DEGREE, perPositionHeight, VertexFormat.POSITION_ONLY, ArcType.GEODESIC);

      if (geom.indices.length % 3 !== 0 || geom.attributes.position.values.length % 3 !== 0) {
        // Something has gone wrong. We expect triangles. Can't calcuate area.
        // 不是三角形，无法计算。
        return 0;
      }

      var coords = [];

      for (var i = 0; i < geom.attributes.position.values.length; i += 3) {
        coords.push(new Cartesian3(geom.attributes.position.values[i], geom.attributes.position.values[i + 1], geom.attributes.position.values[i + 2]));
      }

      var area = 0;

      for (var _i = 0; _i < geom.indices.length; _i += 3) {
        var ind1 = geom.indices[_i];
        var ind2 = geom.indices[_i + 1];
        var ind3 = geom.indices[_i + 2];
        var a = Cartesian3.distance(coords[ind1], coords[ind2]);
        var b = Cartesian3.distance(coords[ind2], coords[ind3]);
        var c = Cartesian3.distance(coords[ind3], coords[ind1]); // Heron's formula 海伦公式

        var s = (a + b + c) / 2.0;
        area += Math.sqrt(s * (s - a) * (s - b) * (s - c));
      }

      return area;
    },

    /**
     * 用 @turf/area 获取传入坐标的构成的多边形的面积。实际上是投影面积。
     * @param {Array.Cartesian}
     * @returns {Number} 返回面积数值。
     */
    getProjectedArea: function getProjectedArea(positions) {
      var _Cesium3 = Cesium,
          Cartographic = _Cesium3.Cartographic,
          CesiumMath = _Cesium3.Math;
      var array = [];

      for (var i = 0, len = positions.length; i < len; i++) {
        var cartographic = Cartographic.fromCartesian(positions[i], this.viewer.scene.globe.ellipsoid);
        var longitude = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
        var latitude = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
        array.push({
          x: longitude,
          y: latitude
        });
      }

      var arrs = [];
      var tems = [];
      arrs.push(tems);

      for (var _i2 = 0, _len = array.length; _i2 < _len; _i2++) {
        tems.push([array[_i2].x, array[_i2].y]);
      }

      var polygons = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: arrs
          }
        }, {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]]
          }
        }]
      };
      return area(polygons);
    },
    clear: function clear() {
      this.distance = 0;
      this.polylines = []; // this.labels = []

      this.measuring = false;
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
  }, [_vm.clampToGround ? _c('vc-collection-primitive', {
    ref: "groundPolygonCollection"
  }, [_vm._l(_vm.polylines, function (polyline, index) {
    return [polyline.positions.length > 2 ? _c('vc-primitive-ground', {
      key: index,
      attrs: {
        "appearance": _vm.makeEllipsoidSurfaceAppearance(_vm.polygonMaterial),
        "asynchronous": false
      }
    }, [_c('vc-instance-geometry', [_c('vc-geometry-polygon', {
      attrs: {
        "perPositionHeight": false,
        "polygonHierarchy": _vm.clone(polyline.positions, true)
      }
    })], 1)], 1) : _vm._e()];
  })], 2) : _c('vc-collection-primitive', {
    ref: "polygonCollection"
  }, [_vm._l(_vm.polylines, function (polyline, index) {
    return [polyline.positions.length > 2 ? _c('vc-primitive', {
      key: index,
      attrs: {
        "appearance": _vm.makeEllipsoidSurfaceAppearance(_vm.polygonMaterial),
        "asynchronous": false
      }
    }, [_c('vc-instance-geometry', [_c('vc-geometry-polygon', {
      attrs: {
        "perPositionHeight": true,
        "polygonHierarchy": _vm.clone(polyline.positions, true)
      }
    })], 1)], 1) : _vm._e()];
  })], 2), _vm._v(" "), _vm.clampToGround ? _c('vc-collection-primitive', {
    ref: "groundPolylineCollection"
  }, [_vm._l(_vm.polylines, function (polyline, index) {
    return [polyline.positions.length > 1 ? _c('vc-primitive-polyline-ground', {
      key: index,
      attrs: {
        "appearance": _vm.makePolylineMaterialAppearance(_vm.polylineMaterial),
        "asynchronous": false
      }
    }, [_c('vc-instance-geometry', [_c('vc-geometry-polyline-ground', {
      attrs: {
        "positions": polyline.positions,
        "width": _vm.polylineWidth,
        "loop": ""
      }
    })], 1)], 1) : _vm._e()];
  })], 2) : _c('vc-collection-primitive-polyline', {
    ref: "polylineCollection",
    attrs: {
      "polylines": _vm.primitivePolylines
    }
  }), _vm._v(" "), _c('vc-collection-primitive-point', {
    ref: "pointCollection",
    attrs: {
      "points": _vm.points
    }
  }), _vm._v(" "), _c('vc-collection-primitive-label', {
    ref: "labelCollection",
    attrs: {
      "labels": _vm.labels
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

  component.__file = "VcMeasureArea.vue";

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


var VcMeasureArea = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(PrimitiveCollection);
  Vue.use(GroundPrimitive);
  Vue.use(GeometryInstance);
  Vue.use(PolygonGeometry);
  Vue.use(Primitive);
  Vue.use(GroundPolylinePrimitive);
  Vue.use(GroundPolylineGeometry);
  Vue.use(PolylineCollection);
  Vue.use(Polyline);
  Vue.use(PointPrimitiveCollection);
  Vue.use(PointPrimitive);
  Vue.use(LabelCollection);
  Vue.use(Label);
  Vue.component(VcMeasureArea.name, VcMeasureArea);
}

export default plugin;
export { VcMeasureArea, plugin as install };
