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
import { url, minimumLevel, maximumLevel } from '../../mixins/mixinProps';
import mixinImageryProvider from '../../mixins/providers/mixinImageryProvider';
import SuperMapImageryProvider$1 from '../../exts/imageryProvider/SuperMapImageryProvider';

var script = {
  name: 'vc-provider-imagery-supermap',
  mixins: [url, minimumLevel, maximumLevel, mixinImageryProvider],
  props: {
    name: String,
    transparent: {
      type: Boolean,
      default: true
    },
    credit: {
      type: String,
      default: 'MapQuest, SuperMap iServer Imagery'
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, setPropWatchers, unwatchFns, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, setPropWatchers = _this.setPropWatchers, unwatchFns = _this.unwatchFns;
                options = transformProps($props);
                Cesium.SuperMapImageryProvider = Cesium.SuperMapImageryProvider || SuperMapImageryProvider$1; // 之前注册时 SuperMapImageryProvider 可能还不存在，导致注册失败，这儿需要再注册 Vue 侦听器。
                // 这种情况下会导致在`vc-viewer`组件的ready事件中对 'vc-provider-imagery-supermap' 属性赋值失败。
                // 原因是 `vc-viewer` 组件ready事件触发时，'vc-provider-imagery-supermap'侦听器还没被创建呢。

                if (unwatchFns.length === 0) {
                  setPropWatchers(true);
                }

                return _context.abrupt("return", new Cesium.SuperMapImageryProvider(options));

              case 5:
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

  component.__file = "SuperMapImageryProvider.vue";

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


var SuperMapImageryProvider = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(SuperMapImageryProvider.name, SuperMapImageryProvider);
}

export default plugin;
export { SuperMapImageryProvider, plugin as install };
