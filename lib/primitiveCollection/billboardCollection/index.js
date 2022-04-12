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
  name: 'vc-collection-primitive-billboard',
  mixins: [scene, blendOption, show, mixinPrimitiveCollection],
  props: {
    billboards: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    billboards: {
      /**
       * https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
       */
      handler: function handler(newVal, oldVal) {
        if (!this.mounted) {
          return;
        }

        var transformProp = this.transformProp,
            transformProps = this.transformProps,
            billboardCollection = this.collection;

        if (newVal === oldVal) {
          // 插入新布告板 billboards.push()，修改布告板属性 billboards[i].xxx，或者 vm.$set(vm.billboards, indexOfBillboard, newValue)
          if (newVal.length === billboardCollection._billboards.length) {
            var _loop = function _loop(i) {
              var options = newVal[i];

              _Object$keys(options).forEach(function (prop) {
                billboardCollection._billboards[i][prop] = transformProp(prop, options[prop]);
              });
            };

            // 认为是修改了某个对象
            for (var i = 0; i < newVal.length; i++) {
              _loop(i);
            }
          } else if (newVal.length > billboardCollection._billboards.length) {
            // 认为是插入了新对象 push unshift splice
            var addedBillboards = differenceBy(newVal, billboardCollection._billboards, 'id');

            if (addedBillboards.length === 0) ;

            for (var _i = 0; _i < addedBillboards.length; _i++) {
              var billboard = addedBillboards[_i];
              billboard.id = billboard.id || Cesium.createGuid();
              var billboardTransform = transformProps(billboard);
              var billboardAdded = billboardCollection.add(billboardTransform);
              billboardAdded.vcIndex = newVal.indexOf(billboard);
            }
          } else if (newVal.length < billboardCollection._billboards.length) {
            // 认为是删除了对象 pop splice shift
            var deletedBillboards = differenceBy(billboardCollection._billboards, newVal, 'id');

            for (var _i2 = 0; _i2 < deletedBillboards.length; _i2++) {
              var _billboard = deletedBillboards[_i2];
              billboardCollection.remove(_billboard);
            }

            var iNull = 0;

            for (var _i3 = 0; _i3 < billboardCollection._billboards.length; _i3++) {
              if (billboardCollection._billboards[_i3]) {
                billboardCollection._billboards[_i3].vcIndex = _i3 - iNull;
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
     *  重写 createCesiumObject 方法，支持用数组加载大量 billboard。
     */
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, billboards, options, billboardCollection, i, billboardOptions, billboardOptionsTransform, billboard, prop;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, billboards = _this.billboards;
                options = transformProps($props);
                billboardCollection = new Cesium.BillboardCollection(options);

                for (i = 0; i < billboards.length; i++) {
                  billboardOptions = billboards[i];
                  billboardOptions.id = Cesium.defined(billboardOptions.id) ? billboardOptions.id : Cesium.createGuid();
                  billboardOptionsTransform = transformProps(billboardOptions);
                  billboard = billboardCollection.add(billboardOptionsTransform);

                  for (prop in billboardOptionsTransform) {
                    if (!billboard[prop]) {
                      billboard[prop] = billboardOptionsTransform[prop];
                    }
                  }

                  billboard.vcIndex = i;
                }

                return _context.abrupt("return", billboardCollection);

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

  component.__file = "BillboardCollection.vue";

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


var BillboardCollection = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(BillboardCollection.name, BillboardCollection);
}

export default plugin;
export { BillboardCollection, plugin as install };
