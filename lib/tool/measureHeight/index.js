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
import * as PolylineCollection from '../../primitiveCollection/polylineCollection';
import * as Polyline from '../../primitive/polyline';
import * as PointPrimitiveCollection from '../../primitiveCollection/pointCollection';
import * as PointPrimitive from '../../primitive/point';
import * as LabelCollection from '../../primitiveCollection/labelCollection';
import * as Label from '../../primitive/label';

//
var script = {
  name: 'vc-measure-height',
  mixins: [mixinMeasure],
  data: function data() {
    return {
      type: 'heightMeasuring',
      measuring: false,
      startPoint: {},
      polylines: [],
      labels: []
    };
  },
  methods: {
    getDistance: function getDistance(positions) {
      var distance = 0;

      for (var i = 0; i < positions.length - 1; i++) {
        var s = Cesium.Cartesian3.distance(positions[i], positions[i + 1]);
        distance = distance + s;
      }

      return distance;
    },
    clear: function clear() {
      this.distance = 0;
      this.polylines = [];
      this.labels = [];
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
  }, [_c('vc-collection-primitive-polyline', {
    ref: "polylineCollection"
  }, _vm._l(_vm.polylines, function (polyline, index) {
    return _c('vc-primitive-polyline', {
      key: index,
      attrs: {
        "material": _vm.polylineMaterial,
        "positions": polyline.positions,
        "width": _vm.polylineWidth,
        "loop": ""
      }
    });
  }), 1), _vm._v(" "), _c('vc-collection-primitive-point', {
    ref: "pointCollection"
  }, [_vm._l(_vm.polylines, function (polyline, index) {
    return [_vm._l(polyline.positions, function (position, subIndex) {
      return [_c('vc-primitive-point', {
        key: 'point' + index + 'position' + subIndex,
        attrs: {
          "color": _vm.pointColor,
          "pixelSize": _vm.pointPixelSize,
          "position": position
        }
      })];
    })];
  })], 2), _vm._v(" "), _c('vc-collection-primitive-label', {
    ref: "labelCollection"
  }, _vm._l(_vm.labels, function (label, index) {
    return _c('vc-primitive-label', {
      key: 'label' + index,
      attrs: {
        "backgroundColor": _vm.backgroundColor,
        "fillColor": _vm.fillColor,
        "font": _vm.font,
        "horizontalOrigin": 0,
        "verticalOrigin": 0,
        "labelStyle": _vm.labelStyle,
        "outlineColor": _vm.outlineColor,
        "outlineWidth": _vm.outlineWidth,
        "pixelOffset": _vm.pixelOffset,
        "position": label.position,
        "showBackground": _vm.showBackground,
        "text": label.text,
        "disableDepthTestDistance": Number.POSITIVE_INFINITY
      }
    });
  }), 1)], 1);
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

  component.__file = "VcMeasureHeight.vue";

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


var VcMeasureHeight = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(PolylineCollection);
  Vue.use(Polyline);
  Vue.use(PointPrimitiveCollection);
  Vue.use(PointPrimitive);
  Vue.use(LabelCollection);
  Vue.use(Label);
  Vue.component(VcMeasureHeight.name, VcMeasureHeight);
}

export default plugin;
export { VcMeasureHeight, plugin as install };
