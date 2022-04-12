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
import _JSON$stringify from '@babel/runtime-corejs2/core-js/json/stringify';
import cmp from '../../mixins/virtualCmp';
import h337 from 'heatmap.js';
import * as Entity from '../../entity';
import * as RectangleGraphics from '../../entity/rectangle';
import * as GroundPrimitive from '../../primitive/ground';
import * as GeometryInstance from '../../geometryInstance';
import * as RectangleGeometry from '../../geometryInstance/rectangle';
import * as ImageryLayer from '../../imageryLayer';
import * as SingleTileImageryProvider from '../../imageryLayer/singleTile';

var script = {
  name: 'vc-heatmap',
  data: function data() {
    return {
      defaultOptions: {
        useEntitiesIfAvailable: true,
        // whether to use entities if a Viewer is supplied or always use an ImageryProvider
        minCanvasSize: 700,
        // minimum size (in pixels) for the heatmap canvas
        maxCanvasSize: 2000,
        // maximum size (in pixels) for the heatmap canvas
        radiusFactor: 60,
        // data point size factor used if no radius is given (the greater of height and width divided by this number yields the used radius)
        spacingFactor: 1.5,
        // extra space around the borders (point radius multiplied by this number yields the spacing)
        maxOpacity: 0.8,
        // the maximum opacity used if not given in the heatmap options object
        minOpacity: 0.1,
        // the minimum opacity used if not given in the heatmap options object
        blur: 0.85,
        // the blur used if not given in the heatmap options object
        gradient: {
          // the gradient used if not given in the heatmap options object
          '.3': 'blue',
          '.65': 'yellow',
          '.8': 'orange',
          '.95': 'red'
        }
      },
      material: null,
      appearance: null,
      coordinates: {
        west: 0,
        south: 0,
        east: 0,
        north: 0
      },
      layerUrl: '',
      // nowaiting: true,
      canRender: false
    };
  },
  mixins: [cmp],
  props: {
    type: {
      type: Number,
      default: 0
    },
    bounds: Object,
    options: Object,
    min: Number,
    max: Number,
    data: Array,
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    changeProps: function changeProps() {
      var bounds = this.bounds,
          options = this.options,
          min = this.min,
          max = this.max,
          data = this.data;
      return {
        bounds: bounds,
        options: options,
        min: min,
        max: max,
        data: data
      };
    }
  },
  watch: {
    changeProps: {
      handler: function handler(val, oldValue) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var _heatmapInstance;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.getVcParent(_this).createPromise;

                case 2:
                  if (!(_JSON$stringify(val) === _JSON$stringify(oldValue))) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return");

                case 4:
                  _heatmapInstance = _this._heatmapInstance;

                  if (_JSON$stringify(val.bounds) !== _JSON$stringify(oldValue.bounds)) {
                    _this.setBounds(val.bounds);
                  }

                  val.min !== oldValue.min && _heatmapInstance.setDataMin(val.min);
                  val.max !== oldValue.max && _heatmapInstance.setDataMin(val.max);
                  _JSON$stringify(val.options) !== _JSON$stringify(oldValue.options) && _heatmapInstance.configure(val.options);
                  _JSON$stringify(val.data) !== _JSON$stringify(oldValue.data) && _this.setWGS84Data(val.min, val.max, val.data);
                  _this.layerUrl = _heatmapInstance.getDataURL();
                  _this.appearance.material.uniforms.image = _this.layerUrl;

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      deep: true
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var bounds, options, min, max, data, defaultOptions, breaks, colors, Δ, i;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                bounds = _this2.bounds, options = _this2.options, min = _this2.min, max = _this2.max, data = _this2.data, defaultOptions = _this2.defaultOptions;
                _this2._WMP = new Cesium.WebMercatorProjection(_this2.viewer.scene.globe.ellipsoid);
                _this2._id = _this2.getID();
                options.gradient = options.gradient ? options.gradient : defaultOptions.gradient;
                breaks = options.breaks, colors = options.colors;

                if (breaks && breaks.length !== 0 && colors && colors.length !== 0) {
                  if (breaks.length + 1 === colors.length) {
                    breaks.push(max);
                  }

                  options.gradient = {};
                  Δ = max - min;

                  for (i = 0; i < breaks.length; i++) {
                    options.gradient["".concat((breaks[i] - min) / Δ)] = colors[i];
                  }
                }

                options.maxOpacity = options.maxOpacity ? options.maxOpacity : defaultOptions.maxOpacity;
                options.minOpacity = options.minOpacity ? options.minOpacity : defaultOptions.minOpacity;
                options.blur = options.blur ? options.blur : defaultOptions.blur;

                _this2.setBounds(bounds);

                _this2._container = _this2.getContainer(_this2.width, _this2.height, _this2._id);
                _this2.options.container = _this2._container;
                _this2._heatmapInstance = h337.create(_this2.options);

                _this2._container.children[0].setAttribute('id', _this2._id + '-hm');

                if (_this2.setWGS84Data(min, max, data)) {
                  _this2.layerUrl = _this2._heatmapInstance.getDataURL();
                }

                _this2.material = new Cesium.ImageMaterialProperty({
                  image: new Cesium.CallbackProperty(_this2.materialCallback, false),
                  transparent: true
                });
                _this2.appearance = new Cesium.MaterialAppearance({
                  material: new Cesium.Material({
                    fabric: {
                      type: 'Image',
                      uniforms: {
                        image: _this2.layerUrl
                      }
                    }
                  })
                });
                return _context2.abrupt("return", _this2._heatmapInstance);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    materialCallback: function materialCallback() {
      return this.layerUrl;
    },
    setBounds: function setBounds(bounds) {
      var options = this.options,
          defaultOptions = this.defaultOptions;
      this._mBounds = this.wgs84ToMercatorBounds(bounds);
      this.setWidthAndHeight(this._mBounds);
      options.radius = Math.round(options.radius ? options.radius : this.width > this.height ? this.width / defaultOptions.radiusFactor : this.height / defaultOptions.radiusFactor);
      this._spacing = options.radius * defaultOptions.spacingFactor;
      this._xoffset = this._mBounds.west;
      this._yoffset = this._mBounds.south;
      this.width = Math.round(this.width + this._spacing * 2);
      this.height = Math.round(this.height + this._spacing * 2);
      this._mBounds.west -= this._spacing * this._factor;
      this._mBounds.east += this._spacing * this._factor;
      this._mBounds.south -= this._spacing * this._factor;
      this._mBounds.north += this._spacing * this._factor;
      this._bounds = this.mercatorToWgs84Bounds(this._mBounds);
      this.coordinates = this._bounds;
    },
    mount: function mount() {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", true);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    unmount: function unmount() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this3._container && _this3._container.parentNode.removeChild(_this3._container);
                return _context4.abrupt("return", true);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    setWidthAndHeight: function setWidthAndHeight(mbb) {
      var defaultOptions = this.defaultOptions;
      this.width = mbb.east > 0 && mbb.west < 0 ? mbb.east + Math.abs(mbb.west) : Math.abs(mbb.east - mbb.west);
      this.height = mbb.north > 0 && mbb.south < 0 ? mbb.north + Math.abs(mbb.south) : Math.abs(mbb.north - mbb.south);
      this._factor = 1;

      if (this.width > this.height && this.width > defaultOptions.maxCanvasSize) {
        this._factor = this.width / defaultOptions.maxCanvasSize;

        if (this.height / this._factor < defaultOptions.minCanvasSize) {
          this._factor = this.height / defaultOptions.minCanvasSize;
        }
      } else if (this.height > this.width && this.height > defaultOptions.maxCanvasSize) {
        this._factor = this.height / defaultOptions.maxCanvasSize;

        if (this.width / this._factor < defaultOptions.minCanvasSize) {
          this._factor = this.width / defaultOptions.minCanvasSize;
        }
      } else if (this.width < this.height && this.width < defaultOptions.minCanvasSize) {
        this._factor = this.width / defaultOptions.minCanvasSize;

        if (this.height / this._factor > defaultOptions.maxCanvasSize) {
          this._factor = this.height / defaultOptions.maxCanvasSize;
        }
      } else if (this.height < this.width && this.height < defaultOptions.minCanvasSize) {
        this._factor = this.height / defaultOptions.minCanvasSize;

        if (this.width / this._factor > defaultOptions.maxCanvasSize) {
          this._factor = this.width / defaultOptions.maxCanvasSize;
        }
      }

      this.width = this.width / this._factor;
      this.height = this.height / this._factor;
    },
    getContainer: function getContainer(width, height, id) {
      var c = document.createElement('div');

      if (id) {
        c.setAttribute('id', id);
      }

      c.setAttribute('style', 'width: ' + width + 'px; height: ' + height + 'px; margin: 0px; display: none;');
      document.body.appendChild(c);
      return c;
    },
    getID: function getID(len) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < (len || 8); i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },

    /*  Convert a WGS84 location into a mercator location
     *
     *  p: the WGS84 location like {x: lon, y: lat}
     */
    wgs84ToMercator: function wgs84ToMercator(p) {
      var mp = this._WMP.project(Cesium.Cartographic.fromDegrees(p.x, p.y));

      return {
        x: mp.x,
        y: mp.y
      };
    },

    /*  Convert a WGS84 bounding box into a mercator bounding box
     *
     *  bb: the WGS84 bounding box like {north, east, south, west}
     */
    wgs84ToMercatorBounds: function wgs84ToMercatorBounds(bounds) {
      var sw = this._WMP.project(Cesium.Cartographic.fromDegrees(bounds.west, bounds.south));

      var ne = this._WMP.project(Cesium.Cartographic.fromDegrees(bounds.east, bounds.north));

      return {
        north: ne.y,
        east: ne.x,
        south: sw.y,
        west: sw.x
      };
    },

    /*  Convert a mercator location into a WGS84 location
     *
     *  p: the mercator lcation like {x, y}
     */
    mercatorToWgs84: function mercatorToWgs84(p) {
      var wp = this._WMP.unproject(new Cesium.Cartesian3(p.x, p.y));

      return {
        x: wp.longitude,
        y: wp.latitude
      };
    },

    /*  Convert a mercator bounding box into a WGS84 bounding box
     *
     *  bb: the mercator bounding box like {north, east, south, west}
     */
    mercatorToWgs84Bounds: function mercatorToWgs84Bounds(bb) {
      var sw = this._WMP.unproject(new Cesium.Cartesian3(bb.west, bb.south));

      var ne = this._WMP.unproject(new Cesium.Cartesian3(bb.east, bb.north));

      return {
        north: this.rad2deg(ne.latitude),
        east: this.rad2deg(ne.longitude),
        south: this.rad2deg(sw.latitude),
        west: this.rad2deg(sw.longitude)
      };
    },

    /*  Convert degrees into radians
     *
     *  d: the degrees to be converted to radians
     */
    deg2rad: function deg2rad(d) {
      var r = d * (Math.PI / 180.0);
      return r;
    },

    /*  Convert radians into degrees
     *
     *  r: the radians to be converted to degrees
     */
    rad2deg: function rad2deg(r) {
      var d = r / (Math.PI / 180.0);
      return d;
    },

    /*  Set an array of heatmap locations
     *
     *  min:  the minimum allowed value for the data values
     *  max:  the maximum allowed value for the data values
     *  data: an array of data points in heatmap coordinates and values like {x, y, value}
     */
    setData: function setData(min, max, data) {
      if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
        this._heatmapInstance.setData({
          min: min,
          max: max,
          data: data
        }); // this.updateLayer()


        return true;
      }

      return false;
    },

    /*  Set an array of WGS84 locations
     *
     *  min:  the minimum allowed value for the data values
     *  max:  the maximum allowed value for the data values
     *  data: an array of data points in WGS84 coordinates and values like { x:lon, y:lat, value }
     */
    setWGS84Data: function setWGS84Data(min, max, data) {
      if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
        var convdata = [];

        for (var i = 0; i < data.length; i++) {
          var gp = data[i];
          var hp = this.wgs84PointToHeatmapPoint(gp);

          if (gp.value || gp.value === 0) {
            hp.value = gp.value;
          }

          convdata.push(hp);
        }

        return this.setData(min, max, convdata);
      }

      return false;
    },

    /*  Convert a WGS84 location to the corresponding heatmap location
     *
     *  p: a WGS84 location like {x:lon, y:lat}
     */
    wgs84PointToHeatmapPoint: function wgs84PointToHeatmapPoint(p) {
      return this.mercatorPointToHeatmapPoint(this.wgs84ToMercator(p));
    },

    /*  Convert a mercator location to the corresponding heatmap location
     *
     *  p: a WGS84 location like {x: lon, y:lat}
     */
    mercatorPointToHeatmapPoint: function mercatorPointToHeatmapPoint(p) {
      var pn = {};
      pn.x = Math.round((p.x - this._xoffset) / this._factor + this._spacing);
      pn.y = Math.round((p.y - this._yoffset) / this._factor + this._spacing);
      pn.y = this.height - pn.y;
      return pn;
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      heatMapInstance: {
        enumerable: true,
        get: function get() {
          return _this4.$services && _this4.cesiumObject;
        }
      }
    });
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', {
    class: _vm.$options.name,
    staticStyle: {
      "display": "none !important"
    }
  }, [_vm.type === 1 ? _c('vc-entity', {
    ref: "childRef",
    attrs: {
      "show": _vm.show
    }
  }, [_c('vc-graphics-rectangle', {
    attrs: {
      "coordinates": _vm.coordinates,
      "material": _vm.material
    }
  })], 1) : _vm.type === 0 ? _c('vc-primitive-ground', {
    ref: "childRef",
    attrs: {
      "appearance": _vm.appearance,
      "releaseGeometryInstances": false,
      "show": _vm.show
    }
  }, [_c('vc-instance-geometry', [_c('vc-geometry-rectangle', {
    attrs: {
      "rectangle": _vm.coordinates
    }
  })], 1)], 1) : _vm.type === 2 ? _c('vc-layer-imagery', {
    ref: "childRef",
    attrs: {
      "show": _vm.show
    }
  }, [_c('vc-provider-imagery-tile-single', {
    attrs: {
      "rectangle": _vm.coordinates,
      "url": _vm.layerUrl
    }
  })], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcHeatMap.vue";

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


var VcHeatMap = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  Vue.use(Entity);
  Vue.use(RectangleGraphics);
  Vue.use(GroundPrimitive);
  Vue.use(GeometryInstance);
  Vue.use(RectangleGeometry);
  Vue.use(ImageryLayer);
  Vue.use(SingleTileImageryProvider);
  plugin.installed = true;
  Vue.component(VcHeatMap.name, VcHeatMap);
}

export default plugin;
export { VcHeatMap, plugin as install };
