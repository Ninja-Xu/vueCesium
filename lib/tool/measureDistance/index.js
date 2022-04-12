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
import mixinMeasure from '../../mixins/tool/mixinMeasure';
import { makeMaterial } from '../../utils/cesiumHelpers';
import * as PrimitiveCollection from '../../primitiveCollection';
import * as GroundPolylinePrimitive from '../../primitive/groundPolyline';
import * as GeometryInstance from '../../geometryInstance';
import * as GroundPolylineGeometry from '../../geometryInstance/groundPolyline';
import * as PolylineCollection from '../../primitiveCollection/polylineCollection';
import * as Polyline from '../../primitive/polyline';
import * as PointPrimitiveCollection from '../../primitiveCollection/pointCollection';
import * as PointPrimitive from '../../primitive/point';
import * as LabelCollection from '../../primitiveCollection/labelCollection';
import * as Label from '../../primitive/label';

//
var script = {
  name: 'vc-measure-distance',
  mixins: [mixinMeasure],
  data: function data() {
    return {
      type: 'distanceMeasuring',
      measuring: false,
      polylines: []
    };
  },
  props: {
    arcType: {
      type: Number,
      default: 0
    },
    clampToGround: {
      type: Boolean,
      default: false
    },
    alongLine: {
      type: Boolean,
      default: true
    },
    removeLastPosition: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    clampToGround: function clampToGround() {
      var getDistance = this.getDistance,
          polylines = this.polylines;
      polylines.forEach(function (polyline) {
        var distances = [0];
        var totalDistance = 0;

        for (var i = 0; i < polyline.positions.length - 1; i++) {
          var positions = [polyline.positions[i], polyline.positions[i + 1]];
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
          polylineIndex: index
        };
        polylines.push(polyline);
      });
      return polylines;
    },
    labels: function labels() {
      var _this2 = this;

      var labels = [];
      this.polylines.forEach(function (polyline, index) {
        polyline.positions.forEach(function (position, subIndex) {
          if (subIndex === polyline.positions.length - 1) {
            var label = {
              backgroundColor: _this2.backgroundColor,
              fillColor: _this2.fillColor,
              font: _this2.font,
              labelStyle: _this2.labelStyle,
              outlineColor: _this2.outlineColor,
              outlineWidth: _this2.outlineWidth,
              pixelOffset: _this2.pixelOffset,
              position: position,
              showBackground: _this2.showBackground,
              disableDepthTestDistance: Cesium.SuperMapVersion ? 0 : Number.POSITIVE_INFINITY,
              text: _this2.$vc.lang.measure.distance + ': ' + _this2.getDistanceText(polyline.distances[subIndex])
            };
            labels.push(label);
          }

          if (subIndex !== polyline.positions.length - 1 && polyline.positions.length > 2 + subIndex || (polyline.positions.length > 2 + subIndex || polyline.positions.length - 2 === subIndex && polyline.positions.length !== 2) && _this2.alongLine) {
            var _label = {
              backgroundColor: _this2.backgroundColor,
              fillColor: _this2.fillColor,
              font: _this2.font,
              horizontalOrigin: 0,
              labelStyle: _this2.labelStyle,
              outlineColor: _this2.outlineColor,
              outlineWidth: _this2.outlineWidth,
              pixelOffset: _this2.pixelOffset,
              position: _this2.getMidPoistion(polyline.positions[subIndex], polyline.positions[subIndex + 1]),
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
    clear: function clear() {
      this.polylines = [];
      this.measuring = false;
    },
    makeAppearance: function makeAppearance(val) {
      return new Cesium.PolylineMaterialAppearance({
        material: makeMaterial.call(this, val)
      });
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
    ref: "groundPolylineCollection"
  }, [_vm._l(_vm.polylines, function (polyline, index) {
    return [polyline.positions.length > 1 ? _c('vc-primitive-polyline-ground', {
      key: index,
      attrs: {
        "appearance": _vm.makeAppearance(_vm.polylineMaterial),
        "arcType": _vm.arcType,
        "asynchronous": false
      }
    }, [_c('vc-instance-geometry', [_c('vc-geometry-polyline-ground', {
      attrs: {
        "positions": polyline.positions,
        "width": _vm.polylineWidth
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

  component.__file = "VcMeasureDistance.vue";

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


var VcMeasureDistance = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(PrimitiveCollection);
  Vue.use(GeometryInstance);
  Vue.use(GroundPolylinePrimitive);
  Vue.use(GroundPolylineGeometry);
  Vue.use(PolylineCollection);
  Vue.use(Polyline);
  Vue.use(PointPrimitiveCollection);
  Vue.use(PointPrimitive);
  Vue.use(LabelCollection);
  Vue.use(Label);
  Vue.component(VcMeasureDistance.name, VcMeasureDistance);
}

export default plugin;
export { VcMeasureDistance, plugin as install };
