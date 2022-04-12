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
import cmp from '../../mixins/virtualCmp';
import { position, color } from '../../mixins/mixinProps';
import * as PostProcessStage from '../../stage';

var script = {
  name: 'vc-scan-circle',
  mixins: [cmp, position, color],
  props: {
    radius: {
      type: Number,
      default: 1500
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  watch: {
    position: function position() {
      this.reload();
    },
    color: function color() {
      this.reload();
    },
    radius: function radius() {
      this.reload();
    },
    interval: function interval() {
      this.reload();
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var $props, transformProps, viewer, options, cartographicCenter, _Cartesian3Center, _Cartesian4Center, _CartographicCenter1, _Cartesian3Center1, _Cartesian4Center1, _time, _scratchCartesian4Center, _scratchCartesian4Center1, _scratchCartesian3Normal;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = _this.$props, transformProps = _this.transformProps, viewer = _this.viewer;
                options = transformProps($props);
                cartographicCenter = Cesium.Cartographic.fromCartesian(options.position, viewer.scene.globe.ellipsoid);
                _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter, viewer.scene.globe.ellipsoid);
                _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1);
                _CartographicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500);
                _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1, viewer.scene.globe.ellipsoid);
                _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1);
                _time = new Date().getTime();
                _scratchCartesian4Center = new Cesium.Cartesian4();
                _scratchCartesian4Center1 = new Cesium.Cartesian4();
                _scratchCartesian3Normal = new Cesium.Cartesian3();
                _this.uniforms = {
                  u_scanCenterEC: function u_scanCenterEC() {
                    return Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
                  },
                  u_scanPlaneNormalEC: function u_scanPlaneNormalEC() {
                    var temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
                    var temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);
                    _scratchCartesian3Normal.x = temp1.x - temp.x;
                    _scratchCartesian3Normal.y = temp1.y - temp.y;
                    _scratchCartesian3Normal.z = temp1.z - temp.z;
                    Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);
                    return _scratchCartesian3Normal;
                  },
                  u_radius: function u_radius() {
                    return options.radius * ((new Date().getTime() - _time) % options.interval) / options.interval;
                  },
                  u_scanColor: options.color
                };
                return _context.abrupt("return", _this.$refs.stage);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
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
    }
  },
  created: function created() {
    var _this2 = this;

    Object.defineProperties(this, {
      postProcessStage: {
        enumerable: true,
        get: function get() {
          return _this2.cesiumObject;
        }
      }
    });
  },
  data: function data() {
    return {
      fsScanSegment: "\n        uniform sampler2D colorTexture;\n        uniform sampler2D depthTexture;\n        varying vec2 v_textureCoordinates;\n        uniform vec4 u_scanCenterEC;\n        uniform vec3 u_scanPlaneNormalEC;\n        uniform float u_radius;\n        uniform vec4 u_scanColor;\n        vec4 toEye(in vec2 uv, in float depth)\n        {\n          vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n          vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n          posInCamera =posInCamera / posInCamera.w;\n          return posInCamera;\n        }\n        vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n        {\n          vec3 v01 = point -planeOrigin;\n          float d = dot(planeNormal, v01) ;\n          return (point - planeNormal * d);\n        }\n        float getDepth(in vec4 depth)\n        {\n          float z_window = czm_unpackDepth(depth);\n          z_window = czm_reverseLogDepth(z_window);\n          float n_range = czm_depthRange.near;\n          float f_range = czm_depthRange.far;\n          return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n        }\n        void main()\n        {\n          gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n          float depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\n          vec4 viewPos = toEye(v_textureCoordinates, depth);\n          vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n          float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n          if(dis < u_radius)\n          {\n            float f = 1.0 -abs(u_radius - dis) / u_radius;\n            f = pow(f, 4.0);\n            gl_FragColor = mix(gl_FragColor, u_scanColor, f);\n          }\n        }",
      uniforms: {}
    };
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
  }, [_c('vc-stage-process-post', {
    ref: "stage",
    attrs: {
      "fragmentShader": _vm.fsScanSegment,
      "uniforms": _vm.uniforms
    }
  })], 1);
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

  component.__file = "VcScanCircle.vue";

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


var VcScanCircle = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(PostProcessStage);
  Vue.component(VcScanCircle.name, VcScanCircle);
}

export default plugin;
export { VcScanCircle, plugin as install };
