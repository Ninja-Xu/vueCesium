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
import bindEvents from '../../utils/bindEvent';
import { Events } from '../../utils/events';
import cmp from '../virtualCmp';

var methods = {
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var viewer, terrainProvider;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              viewer = _this.viewer, terrainProvider = _this.terrainProvider;
              bindEvents.call(_this, terrainProvider, Events['imagery-layer-events'], true);
              viewer.terrainProvider = terrainProvider;

            case 3:
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
      var viewer, terrainProvider;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              viewer = _this2.viewer, terrainProvider = _this2.terrainProvider;
              bindEvents.call(_this2, terrainProvider, Events['imagery-layer-events'], false);
              viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
var mixinTerrainProvider = {
  mixins: [cmp],
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this3 = this;

    Object.defineProperties(this, {
      terrainProvider: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
        }
      }
    });
  }
};

export default mixinTerrainProvider;
