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
import * as coordtransform from '../../utils/coordtransform';

var methods = {
  mount: function mount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var imageryProvider, providerContainer, projectionTransforms, ignoreTransforms, _Cesium, WebMercatorTilingScheme, Cartographic, CesiumMath, tilingScheme, projection, nativeProject, nativeUnProject, projectMethods, unprojectMethods;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              imageryProvider = _this.imageryProvider, providerContainer = _this.providerContainer, projectionTransforms = _this.projectionTransforms;
              imageryProvider.readyPromise.then(function () {
                var listener = _this.$listeners.readyPromise;
                listener && _this.$emit('readyPromise', imageryProvider);
              }).otherwise(function (error) {
                throw new Cesium.DeveloperError(error);
              });

              if (projectionTransforms && projectionTransforms.from !== projectionTransforms.to) {
                ignoreTransforms = _this.$options.name === 'vc-provider-imagery-baidumap' || _this.$options.name === 'vc-provider-imagery-tianditu' && imageryProvider._epsgCode === '4490';

                if (!ignoreTransforms) {
                  _Cesium = Cesium, WebMercatorTilingScheme = _Cesium.WebMercatorTilingScheme, Cartographic = _Cesium.Cartographic, CesiumMath = _Cesium.Math;
                  tilingScheme = new WebMercatorTilingScheme();
                  projection = tilingScheme.projection;
                  nativeProject = projection.project;
                  nativeUnProject = projection.unproject;

                  if (projectionTransforms.to.toUpperCase() === 'WGS84') {
                    projectMethods = 'wgs84togcj02';
                    unprojectMethods = 'gcj02towgs84';
                  } else if (projectionTransforms.to.toUpperCase() === 'GCJ02') {
                    projectMethods = 'gcj02towgs84';
                    unprojectMethods = 'wgs84togcj02';
                  }

                  if (projectMethods && unprojectMethods) {
                    projection.project = function (cartographic, result) {
                      result = result || {};
                      result = coordtransform[projectMethods](CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude));
                      return nativeProject.call(this, new Cartographic(CesiumMath.toRadians(result[0]), CesiumMath.toRadians(result[1])));
                    };

                    projection.unproject = function (cartesian2, result) {
                      result = result || {};
                      var cartographic = nativeUnProject.call(this, cartesian2);
                      result = coordtransform[unprojectMethods](CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude));
                      return new Cartographic(CesiumMath.toRadians(result[0]), CesiumMath.toRadians(result[1]));
                    };

                    imageryProvider._tilingScheme = tilingScheme;
                  }
                }
              }

              bindEvents.call(_this, imageryProvider, Events['imagery-layer-events'], true);
              return _context.abrupt("return", providerContainer && providerContainer.setProvider(imageryProvider));

            case 5:
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
      var imageryProvider, providerContainer;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              imageryProvider = _this2.imageryProvider, providerContainer = _this2.providerContainer;
              bindEvents.call(_this2, imageryProvider, Events['imagery-layer-events'], false);
              return _context2.abrupt("return", providerContainer && providerContainer.setProvider(undefined));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
var mixinImageryProvider = {
  mixins: [cmp],
  methods: methods,
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  props: {
    projectionTransforms: {
      type: Boolean | Object,
      default: false
    }
  },
  created: function created() {
    var _this3 = this;

    this.renderByParent = true;
    Object.defineProperties(this, {
      imageryProvider: {
        enumerable: true,
        get: function get() {
          return _this3.cesiumObject;
        }
      },
      providerContainer: {
        enumerable: true,
        get: function get() {
          return _this3.$services && _this3.$services.providerContainer;
        }
      }
    });
  }
};

export default mixinImageryProvider;
