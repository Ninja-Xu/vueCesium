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
import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys';
import { differenceBy } from 'lodash-es';
import { modelMatrix, debugShowBoundingVolume, show } from '../../mixins/mixinProps';
import mixinPrimitiveCollection from '../../mixins/primitives/mixinPrimitiveCollection';

var script = {
  name: 'vc-collection-primitive-polyline',
  mixins: [modelMatrix, debugShowBoundingVolume, show, mixinPrimitiveCollection],
  props: {
    polylines: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    polylines: {
      /**
       * https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
       */
      handler: function handler(newVal, oldVal) {
        if (!this.mounted) {
          return;
        }

        var transformProp = this.transformProp,
            transformProps = this.transformProps,
            polylineCollection = this.collection;

        if (newVal === oldVal) {
          if (newVal.length === polylineCollection._polylines.length) {
            var _loop = function _loop(i) {
              var options = newVal[i];

              _Object$keys(options).forEach(function (prop) {
                polylineCollection._polylines[i][prop] = transformProp(prop, options[prop]);
              });
            };

            // 认为是修改了某个对象
            for (var i = 0; i < newVal.length; i++) {
              _loop(i);
            }
          } else if (newVal.length > polylineCollection._polylines.length) {
            // 认为是插入了新对象 push unshift splice
            var addedPolylines = differenceBy(newVal, polylineCollection._polylines, 'id');

            if (addedPolylines.length === 0) ;

            for (var _i = 0; _i < addedPolylines.length; _i++) {
              var polyline = addedPolylines[_i];
              polyline.id = polyline.id || Cesium.createGuid();
              var polylineTransform = transformProps(polyline);
              var polylineAdded = polylineCollection.add(polylineTransform);
              polylineAdded.vcIndex = newVal.indexOf(polyline);
            }
          } else if (newVal.length < polylineCollection._polylines.length) {
            // 认为是删除了对象 pop splice shift
            var deletedPolylines = differenceBy(polylineCollection._polylines, newVal, 'id');

            for (var _i2 = 0; _i2 < deletedPolylines.length; _i2++) {
              var _polyline = deletedPolylines[_i2];
              polylineCollection.remove(_polyline);
            }

            var iNull = 0;

            for (var _i3 = 0; _i3 < polylineCollection._polylines.length; _i3++) {
              if (polylineCollection._polylines[_i3]) {
                polylineCollection._polylines[_i3].vcIndex = _i3 - iNull;
              } else {
                iNull++;
              }
            }
          }
        } else {
          // 认为是赋新值
          this.reload();
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     *  重写 createCesiumObject 方法，支持用数组加载大量 polyline
     */
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, polylines, options, polylineCollection, i, polylineOptions, polylineOptionsTransform, polyline, prop;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, polylines = _this.polylines;
                options = transformProps($props);
                polylineCollection = new Cesium.PolylineCollection(options);

                for (i = 0; i < polylines.length; i++) {
                  polylineOptions = polylines[i];
                  polylineOptions.id = Cesium.defined(polylineOptions.id) ? polylineOptions.id : Cesium.createGuid();
                  polylineOptionsTransform = transformProps(polylineOptions);
                  polyline = polylineCollection.add(polylineOptionsTransform);

                  for (prop in polylineOptionsTransform) {
                    if (!polyline[prop]) {
                      polyline[prop] = polylineOptionsTransform[prop];
                    }
                  }

                  polyline.vcIndex = i;
                }

                return _context.abrupt("return", polylineCollection);

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

  component.__file = "PolylineCollection.vue";

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


var PolylineCollection = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(PolylineCollection.name, PolylineCollection);
}

export default plugin;
export { PolylineCollection, plugin as install };
