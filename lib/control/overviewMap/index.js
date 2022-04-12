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
import _Promise from '@babel/runtime-corejs2/core-js/promise';
import cmp from '../../mixins/virtualCmp';
import CesiumOverviewMapControl from '../../exts/overviewMapControl/CesiumOverviewMapControl';
import { TileLayer } from 'leaflet/dist/leaflet-src.esm';

var script = {
  name: 'vc-map-overview',
  mixins: [cmp],
  props: {
    url: {
      type: String,
      default: 'https://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    },
    height: {
      type: Number,
      default: 150
    },
    width: {
      type: Number,
      default: 150
    },
    anchor: {
      type: String,
      default: 'bottomright'
    },
    aimingRectOptions: {
      type: Object,
      default: function _default() {
        return {
          color: '#ff1100',
          weight: 3
        };
      }
    },
    shadowRectOptions: {
      type: Object,
      default: function _default() {
        return {
          color: '#0000AA',
          weight: 1,
          opacity: 0,
          fillOpacity: 0
        };
      }
    },
    toggleDisplay: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      bottom: 10,
      right: 10,
      top: 50,
      left: 10,
      canRender: false
    };
  },
  computed: {
    ovStyle: function ovStyle() {
      var anchor = this.anchor,
          height = this.height,
          width = this.width,
          top = this.top,
          left = this.left,
          right = this.right,
          bottom = this.bottom;
      var style = {
        height: height + 'px',
        width: width + 'px'
      };

      if (anchor === 'topleft') {
        style.top = top + 'px';
        style.left = left + 'px';
      }

      if (anchor === 'topright') {
        style.top = top + 'px';
        style.right = right + 'px';
      }

      if (anchor === 'bottomright') {
        style.bottom = bottom + 'px';
        style.right = right + 'px';
      }

      if (anchor === 'bottomleft') {
        style.bottom = bottom + 'px';
        style.left = left + 'px';
      }

      return style;
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.canRender = true;
                return _context.abrupt("return", new _Promise(function (resolve, reject) {
                  _this.$nextTick(function () {
                    var viewer = _this.viewer,
                        width = _this.width,
                        height = _this.height,
                        anchor = _this.anchor,
                        aimingRectOptions = _this.aimingRectOptions,
                        shadowRectOptions = _this.shadowRectOptions,
                        toggleDisplay = _this.toggleDisplay;
                    var layer = new TileLayer(_this.url, {
                      minZoom: 0,
                      maxZoom: 20
                    });
                    var container = _this.$refs.leafletContainer;
                    var options = {
                      container: container,
                      toggleDisplay: toggleDisplay,
                      width: width,
                      height: height,
                      position: anchor,
                      aimingRectOptions: aimingRectOptions,
                      shadowRectOptions: shadowRectOptions
                    };
                    viewer.widgetResized.addEventListener(_this.widgetResized);

                    _this.widgetResized();

                    resolve(new CesiumOverviewMapControl(viewer, layer, options, _this));
                  });
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    widgetResized: function widgetResized() {
      var _this2 = this;

      var bottom = 10;
      var right = 10;
      var viewer = this.viewer,
          anchor = this.anchor;
      this.$nextTick(function () {
        if (anchor === 'bottomright') {
          if (viewer.timeline) {
            bottom += viewer.timeline.container.getBoundingClientRect().height;
          }

          var vcDistance = document.querySelector('.vc-location-distance');

          if (vcDistance) {
            bottom += vcDistance.getBoundingClientRect().height;
          }
        } else if (anchor === 'bottomleft') {
          if (viewer.animation) {
            bottom += viewer.animation.container.getBoundingClientRect().height;
          } else {
            if (viewer.bottomContainer) {
              bottom += viewer.bottomContainer.getBoundingClientRect().height;
            }

            if (viewer.timeline) {
              bottom += viewer.timeline.container.getBoundingClientRect().height;
            }
          }
        }

        if (anchor === 'topright') {
          var navigationNavs = document.querySelector('.vc-navigation-navs');

          if (navigationNavs) {
            right += navigationNavs.getBoundingClientRect().width + 16;
          }
        }

        if (bottom === 10) {
          var _right = 10;
          viewer.fullscreenButton && (_right += viewer.fullscreenButton.container.getBoundingClientRect().width);
          viewer.vrButton && (_right += viewer.vrButton.container.getBoundingClientRect().width);
        }

        _this2.bottom = bottom;
        _this2.right = right;
      });
    },
    mount: function mount() {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", true);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    unmount: function unmount() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.viewer.widgetResized.removeEventListener(_this3.widgetResized);

                _this3.canRender = false;
                return _context3.abrupt("return", true);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      element: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
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

  return _vm.canRender ? _c('div', {
    ref: "leafletContainer",
    staticClass: "vc-leaflet-control-minimap",
    style: _vm.ovStyle,
    attrs: {
      "id": "vc-overview-map"
    }
  }) : _vm._e();
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

  component.__file = "VcOverviewMap.vue";

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


var VcOverviewMap = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(VcOverviewMap.name, VcOverviewMap);
}

export default plugin;
export { VcOverviewMap, plugin as install };
