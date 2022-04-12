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
import { scene, blendOption, show } from '../../mixins/mixinProps';
import mixinPrimitiveCollection from '../../mixins/primitives/mixinPrimitiveCollection';

var script = {
  name: 'vc-collection-primitive-label',
  mixins: [scene, blendOption, show, mixinPrimitiveCollection],
  props: {
    labels: {
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
            labelCollection = this.collection;

        if (newVal === oldVal) {
          if (newVal.length === labelCollection._labels.length) {
            var _loop = function _loop(i) {
              var options = newVal[i];

              _Object$keys(options).forEach(function (prop) {
                labelCollection._labels[i][prop] = transformProp(prop, options[prop]);
              });
            };

            // 认为是修改了某个对象
            for (var i = 0; i < newVal.length; i++) {
              _loop(i);
            }
          } else if (newVal.length > labelCollection._labels.length) {
            // 认为是插入了新对象 push unshift splice
            var addedLabels = differenceBy(newVal, labelCollection._labels, 'id');

            if (addedLabels.length === 0) ;

            for (var _i = 0; _i < addedLabels.length; _i++) {
              var label = addedLabels[_i];
              label.id = label.id || Cesium.createGuid();
              var labelTransform = transformProps(label);
              var labelAdded = labelCollection.add(labelTransform);
              labelAdded.vcIndex = newVal.indexOf(label);
            }
          } else if (newVal.length < labelCollection._labels.length) {
            // 认为是删除了对象 pop splice shift
            var deletedLabels = differenceBy(labelCollection._labels, newVal, 'id');

            for (var _i2 = 0; _i2 < deletedLabels.length; _i2++) {
              var _label = deletedLabels[_i2];
              labelCollection.remove(_label);
            }

            var iNull = 0;

            for (var _i3 = 0; _i3 < labelCollection._labels.length; _i3++) {
              if (labelCollection._labels[_i3]) {
                labelCollection._labels[_i3].vcIndex = _i3 - iNull;
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
     *  重写 createCesiumObject 方法，支持用数组加载大量 label。
     */
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, labels, options, labelColletion, i, labelOptions, labelOptionsTransform, label, prop;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, labels = _this.labels;
                options = transformProps($props);
                labelColletion = new Cesium.LabelCollection(options);

                for (i = 0; i < labels.length; i++) {
                  labelOptions = labels[i];
                  labelOptions.id = Cesium.defined(labelOptions.id) ? labelOptions.id : Cesium.createGuid();
                  labelOptionsTransform = transformProps(labelOptions);
                  label = labelColletion.add(labelOptionsTransform);

                  for (prop in labelOptionsTransform) {
                    if (!label[prop]) {
                      label[prop] = labelOptionsTransform[prop];
                    }
                  }

                  label.vcIndex = i;
                }

                return _context.abrupt("return", labelColletion);

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

  component.__file = "LabelCollection.vue";

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


var LabelCollection = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(LabelCollection.name, LabelCollection);
}

export default plugin;
export { LabelCollection, plugin as install };
