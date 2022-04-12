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
import { blendOption, modelMatrix, debugShowBoundingVolume, show } from '../../mixins/mixinProps';
import mixinPrimitiveCollection from '../../mixins/primitives/mixinPrimitiveCollection';

var script = {
  name: 'vc-collection-primitive-point',
  mixins: [blendOption, modelMatrix, debugShowBoundingVolume, show, mixinPrimitiveCollection],
  props: {
    points: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    labels: {
      /**
       * https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
       */
      handler: function handler(newVal, oldVal) {
        if (!this.mounted) {
          return;
        }

        var transformProp = this.transformProp,
            transformProps = this.transformProps,
            pointColletion = this.collection;

        if (newVal === oldVal) {
          if (newVal.length === pointColletion._points.length) {
            var _loop = function _loop(i) {
              var options = newVal[i];

              _Object$keys(options).forEach(function (prop) {
                pointColletion._points[i][prop] = transformProp(prop, options[prop]);
              });
            };

            // 认为是修改了某个对象
            for (var i = 0; i < newVal.length; i++) {
              _loop(i);
            }
          } else if (newVal.length > pointColletion._points.length) {
            // 认为是插入了新对象 push unshift splice
            var addedPoints = differenceBy(newVal, pointColletion._points, 'id');

            if (addedPoints.length === 0) ;

            for (var _i = 0; _i < addedPoints.length; _i++) {
              var point = addedPoints[_i];
              point.id = point.id || Cesium.createGuid();
              var pointTransform = transformProps(point);
              var pointAdded = pointColletion.add(pointTransform);
              pointAdded.vcIndex = newVal.indexOf(point);
            }
          } else if (newVal.length < pointColletion._points.length) {
            // 认为是删除了对象 pop splice shift
            var deletedPoints = differenceBy(pointColletion._points, newVal, 'id');

            for (var _i2 = 0; _i2 < deletedPoints.length; _i2++) {
              var _point = deletedPoints[_i2];
              pointColletion.remove(_point);
            }

            var iNull = 0;

            for (var _i3 = 0; _i3 < pointColletion._points.length; _i3++) {
              if (pointColletion._points[_i3]) {
                pointColletion._points[_i3].vcIndex = _i3 - iNull;
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
     *  重写 createCesiumObject 方法，支持用数组加载大量 point。
     */
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, points, options, pointColletion, i, pointOptions, pointOptionsTransform, point, prop;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, points = _this.points;
                options = transformProps($props);
                pointColletion = new Cesium.PointPrimitiveCollection(options);

                for (i = 0; i < points.length; i++) {
                  pointOptions = points[i];
                  pointOptions.id = Cesium.defined(pointOptions.id) ? pointOptions.id : Cesium.createGuid();
                  pointOptionsTransform = transformProps(pointOptions);
                  point = pointColletion.add(pointOptionsTransform);

                  for (prop in pointOptionsTransform) {
                    if (!point[prop]) {
                      point[prop] = pointOptionsTransform[prop];
                    }
                  }

                  point.vcIndex = i;
                }

                return _context.abrupt("return", pointColletion);

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

  component.__file = "PointPrimitiveCollection.vue";

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


var PointPrimitiveCollection = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(PointPrimitiveCollection.name, PointPrimitiveCollection);
}

export default plugin;
export { PointPrimitiveCollection, plugin as install };
