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
import { show, modelMatrix, shadows, clippingPlanes, debugShowBoundingVolume, debugWireframe, imageBasedLightingFactor, url, classificationType, ellipsoid, lightColor2, luminanceAtZenith, sphericalHarmonicCoefficients, specularEnvironmentMaps, backFaceCulling } from '../../mixins/mixinProps';
import mixinPrimitive from '../../mixins/primitives/mixinPrimitive';

var script = {
  name: 'vc-primitive-tileset',
  mixins: [show, modelMatrix, shadows, clippingPlanes, debugShowBoundingVolume, debugWireframe, imageBasedLightingFactor, url, classificationType, ellipsoid, lightColor2, luminanceAtZenith, sphericalHarmonicCoefficients, specularEnvironmentMaps, backFaceCulling, mixinPrimitive],
  props: {
    maximumScreenSpaceError: {
      type: Number,
      default: 16
    },
    maximumMemoryUsage: {
      type: Number,
      default: 512
    },
    cullWithChildrenBounds: {
      type: Boolean,
      default: true
    },
    cullRequestsWhileMoving: {
      type: Boolean,
      default: true
    },
    cullRequestsWhileMovingMultiplier: {
      type: Number,
      default: 60.0
    },
    preloadWhenHidden: {
      type: Boolean,
      default: false
    },
    preloadFlightDestinations: {
      type: Boolean,
      default: true
    },
    preferLeaves: {
      type: Boolean,
      default: false
    },
    dynamicScreenSpaceError: {
      type: Boolean,
      default: false
    },
    dynamicScreenSpaceErrorDensity: {
      type: Number,
      default: 0.00278
    },
    dynamicScreenSpaceErrorFactor: {
      type: Number,
      default: 4.0
    },
    dynamicScreenSpaceErrorHeightFalloff: {
      type: Number,
      default: 0.25
    },
    progressiveResolutionHeightFraction: {
      type: Number,
      default: 0.3
    },
    foveatedScreenSpaceError: {
      type: Boolean,
      default: true
    },
    foveatedConeSize: {
      type: Number,
      default: 0.1
    },
    foveatedMinimumScreenSpaceErrorRelaxation: {
      type: Number,
      default: 0.0
    },
    foveatedInterpolationCallback: Function,
    foveatedTimeDelay: {
      type: Number,
      default: 0.2
    },
    skipLevelOfDetail: {
      type: Boolean,
      default: false
    },
    baseScreenSpaceError: {
      type: Number,
      default: 1024
    },
    skipScreenSpaceErrorFactor: {
      type: Number,
      default: 16
    },
    skipLevels: {
      type: Number,
      default: 1
    },
    immediatelyLoadDesiredLevelOfDetail: {
      type: Boolean,
      default: false
    },
    loadSiblings: {
      type: Boolean,
      default: false
    },
    pointCloudShading: Object,
    vectorClassificationOnly: {
      type: Boolean,
      default: false
    },
    debugHeatmapTilePropertyName: String,
    debugFreezeFrame: {
      type: Boolean,
      default: false
    },
    debugColorizeTiles: {
      type: Boolean,
      default: false
    },
    debugShowContentBoundingVolume: {
      type: Boolean,
      default: false
    },
    debugShowViewerRequestVolume: {
      type: Boolean,
      default: false
    },
    debugShowGeometricError: {
      type: Boolean,
      default: false
    },
    debugShowRenderingStatistics: {
      type: Boolean,
      default: false
    },
    debugShowMemoryUsage: {
      type: Boolean,
      default: false
    },
    debugShowUrl: {
      type: Boolean,
      default: false
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

  component.__file = "Cesium3DTileset.vue";

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


var Cesium3DTileset = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(Cesium3DTileset.name, Cesium3DTileset);
}

export default plugin;
export { Cesium3DTileset, plugin as install };
