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
import cmp from '../mixins/virtualCmp';
import mixinPickEvent from '../mixins/event/mixinPickEvent';
import { position, plane } from '../mixins/mixinProps';
import mergeDescriptors from '../utils/mergeDescriptors';
import bindEvents from '../utils/bindEvent';
import { Events } from '../utils/events';

var script = {
  name: 'vc-entity',
  mixins: [cmp, position, plane, mixinPickEvent],
  props: {
    id: String,
    name: String,
    availability: Object,
    show: {
      type: Boolean,
      default: true
    },
    description: [String, Object],
    orientation: Object,
    viewFrom: Object,
    parent: Object,
    billboard: Object,
    corridor: Object,
    cylinder: Object,
    ellipse: Object,
    ellipsoid: Object,
    box: Object,
    label: Object,
    model: Object,
    tileset: Object,
    path: Object,
    point: Object,
    polygon: Object,
    polyline: Object,
    properties: Object,
    polylineVolume: Object,
    rectangle: Object,
    wall: Object,
    enableEvent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    mount: function mount() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var entities, entity, registerEvents;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entities = _this.entities, entity = _this.entity, registerEvents = _this.registerEvents;
                registerEvents(true);
                bindEvents.call(_this, entity, Events['entity-events']);
                return _context.abrupt("return", entities && entities.add(entity));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    unmount: function unmount() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var entities, entity, registerEvents;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entities = _this2.entities, entity = _this2.entity, registerEvents = _this2.registerEvents;
                bindEvents.call(_this2, entity, Events['entity-events'], false);
                registerEvents(false);
                return _context2.abrupt("return", entities && entities.remove(entity));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    setGraphics: function setGraphics(graphics, type) {
      var listener = this.$listeners['update:' + type];

      if (listener) {
        this.$emit('update:' + type, graphics);
      } else {
        this.entity[type] = graphics;
      }

      return true;
    },
    getServices: function getServices() {
      var vm = this;
      return mergeDescriptors(cmp.methods.getServices.call(this), {
        get entity() {
          return vm.entity;
        },

        get graphicsContainer() {
          return vm;
        }

      });
    }
  },
  stubVNode: {
    attrs: function attrs() {
      return {
        class: this.$options.name
      };
    }
  },
  created: function created() {
    var _this3 = this;

    Object.defineProperties(this, {
      entity: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
        }
      },
      entities: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.$services.entities;
        }
      }
    });
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

  component.__file = "Entity.vue";

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


var Entity = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(Entity.name, Entity);
}

export default plugin;
export { Entity, plugin as install };
