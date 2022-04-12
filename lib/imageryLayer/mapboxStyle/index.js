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
import { accessToken, ellipsoid, minimumLevel, maximumLevel, rectangle, credit } from '../../mixins/mixinProps';
import mixinImageryProvider from '../../mixins/providers/mixinImageryProvider';

var script = {
  name: 'vc-provider-imagery-style-mapbox',
  mixins: [accessToken, ellipsoid, minimumLevel, maximumLevel, rectangle, credit, mixinImageryProvider],
  props: {
    url: {
      type: String,
      default: 'https://api.mapbox.com/styles/v1/'
    },
    username: {
      type: String,
      default: 'mapbox'
    },
    styleId: String,
    tilesize: {
      type: Number,
      default: 512
    },
    scaleFactor: Boolean
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

  component.__file = "MapboxStyleImageryProvider.vue";

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


var MapboxStyleImageryProvider = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(MapboxStyleImageryProvider.name, MapboxStyleImageryProvider);
}

export default plugin;
export { MapboxStyleImageryProvider, plugin as install };
