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
import bindEvents from '../../utils/bindEvent';
import { Events } from '../../utils/events';
import cmp from '../virtualCmp';
import mixinPickEvent from '../event/mixinPickEvent';
import { show } from '../mixinProps';
import mergeDescriptors from '../../utils/mergeDescriptors';

var watch = {
  entities: {
    /**
     * https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项
     */
    handler: function handler(newVal, oldVal) {
      if (!this.mounted) {
        return;
      }

      var transformProp = this.transformProp,
          transformProps = this.transformProps,
          datasource = this.datasource;

      if (newVal === oldVal) {
        if (newVal.length === datasource.entities.values.length) {
          var _loop = function _loop(i) {
            var options = newVal[i];

            _Object$keys(options).forEach(function (prop) {
              if (prop !== 'id') {
                datasource.entities.values[i][prop] = transformProp(prop, options[prop]);
              }
            });
          };

          // 认为是修改了某个对象
          for (var i = 0; i < newVal.length; i++) {
            _loop(i);
          }
        } else if (newVal.length > datasource.entities.values.length) {
          // 认为是插入了新对象 push unshift splice
          var addedEntities = differenceBy(newVal, datasource.entities.values, 'id');

          if (addedEntities.length === 0) ;

          for (var _i = 0; _i < addedEntities.length; _i++) {
            var entityOptions = addedEntities[_i];
            var entityOptionsTransform = transformProps(entityOptions);
            var entityAdded = datasource.entities.add(entityOptionsTransform);
            entityAdded.vcIndex = newVal.indexOf(entityOptions);
            entityAdded.id !== entityOptions.id && (entityOptions.id = entityAdded.id);
          }
        } else if (newVal.length < datasource.entities.values.length) {
          // 认为是删除了对象 pop splice shift
          var deletedEntities = differenceBy(datasource.entities.values, newVal, 'id');

          for (var _i2 = 0; _i2 < deletedEntities.length; _i2++) {
            var entity = deletedEntities[_i2];
            datasource.entities.remove(entity);
          }

          var iNull = 0;

          for (var _i3 = 0; _i3 < datasource.entities.values.length; _i3++) {
            if (datasource.entities.values[_i3]) {
              datasource.entities.values[_i3].vcIndex = _i3 - iNull;
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
};
var methods = {
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var dataSources, datasource, registerEvents, entities, transformProps, i, entityOptions, entityOptionsTransform, entity;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataSources = _this.dataSources, datasource = _this.datasource, registerEvents = _this.registerEvents, entities = _this.entities, transformProps = _this.transformProps;
              bindEvents.call(_this, datasource, Events['datasource-events'], true);
              Events['datasource-property-events'].forEach(function (eventName) {
                datasource[eventName.name] && bindEvents.call(_this, datasource[eventName.name], eventName.events, true);
              });
              datasource.show = _this.show;
              registerEvents(true);

              for (i = 0; i < entities.length; i++) {
                entityOptions = entities[i];
                entityOptionsTransform = transformProps(entityOptions);
                entity = datasource.entities.add(entityOptionsTransform);
                entity.vcIndex = i;
                entityOptions.id !== entity.id && (entityOptions.id = entity.id);
              }

              return _context.abrupt("return", dataSources.add(datasource).then(function () {
                return true;
              }));

            case 7:
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
      var dataSources, datasource, registerEvents;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dataSources = _this2.dataSources, datasource = _this2.datasource, registerEvents = _this2.registerEvents;
              bindEvents.call(_this2, datasource, Events['datasource-events'], false);
              Events['datasource-property-events'].forEach(function (eventName) {
                datasource[eventName.name] && bindEvents.call(_this2, datasource[eventName.name], eventName.events, false);
              });
              registerEvents(false);
              return _context2.abrupt("return", dataSources && dataSources.remove(datasource));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  getServices: function getServices() {
    var vm = this;
    return mergeDescriptors(cmp.methods.getServices.call(this), {
      get datasource() {
        return vm.datasource;
      },

      get entities() {
        return vm.datasource.entities;
      }

    });
  }
};
var mixinDatasource = {
  mixins: [cmp, show, mixinPickEvent],
  methods: methods,
  props: {
    enableEvent: {
      type: Boolean,
      default: true
    },
    entities: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: watch,
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
      datasource: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
        }
      },
      dataSources: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.$services.dataSources;
        }
      }
    });
  }
};

export default mixinDatasource;
