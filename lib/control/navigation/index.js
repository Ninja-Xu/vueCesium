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
import _Object$assign from '@babel/runtime-corejs2/core-js/object/assign';
import cmp from '../../mixins/virtualCmp';
import MouseCoords from '../../exts/MouseCoords';
import _parseFloat from '@babel/runtime-corejs2/core-js/parse-float';
import CameraFlightPath from '../../exts/CameraFlightPath';
import printWindow from '../../exts/printWindow';
import { captureScreenshot, getAllAttribution } from '../../utils/util';
import Vue from 'vue';
import _Array$from from '@babel/runtime-corejs2/core-js/array/from';
import _Symbol from '@babel/runtime-corejs2/core-js/symbol';
import _Symbol$iterator from '@babel/runtime-corejs2/core-js/symbol/iterator';
import _typeof from '@babel/runtime-corejs2/helpers/esm/typeof';
import AMapLoader from '@amap/amap-jsapi-loader';

//
//
//
//
var icons = {};
var notLoadedIcons = [];
var defaultWidth = '';
var defaultHeight = '';
var classPrefix = 'vc-svg';
var isStroke = false;
var isOriginalDefault = false;
var script = {
  name: 'svgicon',
  data: function data() {
    return {
      loaded: false
    };
  },
  props: {
    icon: String,
    name: String,
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    scale: String,
    dir: String,
    fill: {
      type: Boolean,
      default: function _default() {
        return !isStroke;
      }
    },
    color: String,
    original: {
      type: Boolean,
      default: function _default() {
        return isOriginalDefault;
      }
    },
    title: String
  },
  computed: {
    clazz: function clazz() {
      var clazz = "".concat(classPrefix, "-icon");

      if (this.fill) {
        clazz += " ".concat(classPrefix, "-fill");
      }

      if (this.dir) {
        clazz += " ".concat(classPrefix, "-").concat(this.dir);
      }

      return clazz;
    },
    iconName: function iconName() {
      return this.name || this.icon;
    },
    iconData: function iconData() {
      var iconData = icons[this.iconName];

      if (iconData || this.loaded) {
        return iconData;
      }

      return null;
    },
    colors: function colors() {
      if (this.color) {
        return this.color.split(' ');
      }

      return [];
    },
    path: function path() {
      var pathData = '';

      if (this.iconData) {
        pathData = this.iconData.data;
        pathData = this.setTitle(pathData); // use original color

        if (this.original) {
          pathData = this.addOriginalColor(pathData);
        }

        if (this.colors.length > 0) {
          pathData = this.addColor(pathData);
        }
      } else {
        // if no iconData, push to notLoadedIcons
        notLoadedIcons.push({
          name: this.iconName,
          component: this
        });
      }

      return this.getValidPathData(pathData);
    },
    box: function box() {
      var width = this.width || 16;
      var height = this.width || 16;

      if (this.iconData) {
        if (this.iconData.viewBox) {
          return this.iconData.viewBox;
        }

        return "0 0 ".concat(this.iconData.width, " ").concat(this.iconData.height);
      }

      return "0 0 ".concat(_parseFloat(width), " ").concat(_parseFloat(height));
    },
    style: function style() {
      var digitReg = /^\d+$/;
      var scale = Number(this.scale);
      var width;
      var height; // apply scale

      if (!isNaN(scale) && this.iconData) {
        width = Number(this.iconData.width) * scale + 'px';
        height = Number(this.iconData.height) * scale + 'px';
      } else {
        width = digitReg.test(this.width) ? this.width + 'px' : this.width || defaultWidth;
        height = digitReg.test(this.height) ? this.height + 'px' : this.height || defaultHeight;
      }

      var style = {};

      if (width) {
        style.width = width;
      }

      if (height) {
        style.height = height;
      }

      return style;
    }
  },
  created: function created() {
    if (icons[this.iconName]) {
      this.loaded = true;
    }
  },
  methods: {
    addColor: function addColor(data) {
      var _this = this;

      var reg = /<(path|rect|circle|polygon|line|polyline|ellipse)\s/gi;
      var i = 0;
      return data.replace(reg, function (match) {
        var color = _this.colors[i++] || _this.colors[_this.colors.length - 1];
        var fill = _this.fill; // if color is '_', ignore it

        if (color && color === '_') {
          return match;
        } // if color start with 'r-', reverse the fill value


        if (color && color.indexOf('r-') === 0) {
          fill = !fill;
          color = color.split('r-')[1];
        }

        var style = fill ? 'fill' : 'stroke';
        var reverseStyle = fill ? 'stroke' : 'fill';
        return match + "".concat(style, "=\"").concat(color, "\" ").concat(reverseStyle, "=\"none\" ");
      });
    },
    addOriginalColor: function addOriginalColor(data) {
      var styleReg = /_fill="|_stroke="/gi;
      return data.replace(styleReg, function (styleName) {
        return styleName && styleName.slice(1);
      });
    },
    getValidPathData: function getValidPathData(pathData) {
      // If use original and colors, clear double fill or stroke
      if (this.original && this.colors.length > 0) {
        // eslint-disable-next-line no-useless-escape
        var reg = /<(path|rect|circle|polygon|line|polyline|ellipse)(\sfill|\sstroke)([="\w\s\.\-\+#\$\&>]+)(fill|stroke)/gi;
        pathData = pathData.replace(reg, function (match, p1, p2, p3, p4) {
          return "<".concat(p1).concat(p2).concat(p3, "_").concat(p4);
        });
      }

      return pathData;
    },
    setTitle: function setTitle(pathData) {
      if (this.title) {
        var title = this.title // eslint-disable-next-line no-useless-escape
        .replace(/\</gi, '&lt;').replace(/>/gi, '&gt;').replace(/&/g, '&amp;');
        return "<title>".concat(title, "</title>") + pathData;
      }

      return pathData;
    },
    onClick: function onClick(e) {
      this.$emit('click', e);
    }
  },
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var tagName = options.tagName || 'svgicon';

    if (options.classPrefix) {
      classPrefix = options.classPrefix;
    }

    isStroke = !!options.isStroke;
    isOriginalDefault = !!options.isOriginalDefault; // default size

    options.defaultWidth && (defaultWidth = options.defaultWidth);
    options.defaultHeight && (defaultHeight = options.defaultHeight);
    Vue.component(tagName, this);
  },
  // register icons
  register: function register(data) {
    var _loop = function _loop(name) {
      if (!icons[name]) {
        icons[name] = data[name];
      } // check new register icon is not loaded, and set loaded to true


      notLoadedIcons = notLoadedIcons.filter(function (v, ix) {
        if (v.name === name) {
          v.component.$set(v.component, 'loaded', true);
        }

        return v.name !== name;
      });
    };

    for (var name in data) {
      _loop(name);
    }
  },
  icons: icons
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    class: _vm.clazz,
    style: _vm.style,
    attrs: {
      "viewBox": _vm.box,
      "version": "1.1"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.path)
    },
    on: {
      "click": _vm.onClick
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-6e48e5e1";
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcIconSvg.vue";

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


var VcIconSvg = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

VcIconSvg.register({
  'compass-outer': {
    width: 162,
    height: 162,
    viewBox: '0 0 162 162',
    data: "\n    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>compass-outer</title> -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n      <g id=\"compass-outer\" fill-rule=\"nonzero\">\n        <path d=\"M80.8410544,161.682109 C36.1937731,161.682109 0,125.488336 0,80.8410544 C0,36.1937731 36.1937731,0 80.8410544,0 C125.488336,0 161.682109,36.1937731 161.682109,80.8410544 C161.682109,125.488336 125.488336,161.682109 80.8410544,161.682109 Z M81.1836011,134.620909 C110.696211,134.620909 134.620909,110.696211 134.620909,81.1836011 C134.620909,51.6709916 110.696211,27.7462941 81.1836011,27.7462941 C51.6709916,27.7462941 27.7462941,51.6709916 27.7462941,81.1836011 C27.7462941,110.696211 51.6709916,134.620909 81.1836011,134.620909 Z\" id=\"Oval-108\"></path>\n        <circle id=\"Oval-74\" fill=\"#FFFFFF\" cx=\"129.493683\" cy=\"127.952092\" r=\"1.54159147\"></circle>\n        <circle id=\"Oval-74-Copy-3\" fill=\"#FFFFFF\" cx=\"129.493683\" cy=\"35.4566038\" r=\"1.54159147\"></circle>\n        <circle id=\"Oval-74-Copy-5\" fill=\"#FFFFFF\" cx=\"30.8318294\" cy=\"127.952092\" r=\"1.54159147\"></circle>\n        <circle id=\"Oval-74-Copy-4\" fill=\"#FFFFFF\" cx=\"30.8318294\" cy=\"35.4566038\" r=\"1.54159147\"></circle>\n        <polygon id=\"N\" fill=\"#FFFFFF\" points=\"84.9318072 23.1238721 84.9318072 13.1321362 82.5623385 13.1321362 82.5623385 19.2984646 77.951866 13.1321362 75.7108625 13.1321362 75.7108625 23.1238721 78.0946053 23.1238721 78.0946053 16.9718176 82.6908037 23.1238721\"></polygon>\n        <polygon id=\"Line\" fill=\"#FFFFFF\" points=\"143.368007 82.1093476 152.617555 82.1093476 152.617555 81.2993476 143.368007 81.2993476\"></polygon>\n        <polygon id=\"Line-Copy-8\" fill=\"#FFFFFF\" points=\"9.24954884 82.1093476 18.4990976 82.1093476 18.4990976 81.2993476 9.24954884 81.2993476\"></polygon>\n        <polygon id=\"Line\" fill=\"#FFFFFF\" points=\"81.2993476 143.368007 81.2993476 152.617555 82.1093476 152.617555 82.1093476 143.368007\"></polygon>\n      </g>\n    </g>"
  }
});

VcIconSvg.register({
  'compass-inner': {
    width: 17,
    height: 17,
    viewBox: '0 0 17 17',
    data: "\n    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>compass-inner</title> -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n      <g id=\"compass-inner\" fill-rule=\"nonzero\">\n        <path d=\"M8.5,16.5 C4.081722,16.5 0.5,12.918278 0.5,8.5 C0.5,4.081722 4.081722,0.5 8.5,0.5 C12.918278,0.5 16.5,4.081722 16.5,8.5 C16.5,12.918278 12.918278,16.5 8.5,16.5 Z M8.5,15.5 C12.3659932,15.5 15.5,12.3659932 15.5,8.5 C15.5,4.63400675 12.3659932,1.5 8.5,1.5 C4.63400675,1.5 1.5,4.63400675 1.5,8.5 C1.5,12.3659932 4.63400675,15.5 8.5,15.5 Z\" id=\"Oval-96\"></path>\n        <path d=\"M9.92599835,7.09066832 C12.7122872,9.87695712 14.3709388,12.5452228 13.4497471,13.4664145 C12.5285555,14.3876061 9.86028979,12.7289545 7.074001,9.94266568 C4.2877122,7.15637688 2.62906055,4.48811119 3.55025221,3.56691953 C4.47144386,2.64572788 7.13970955,4.30437952 9.92599835,7.09066832 Z M9.21889157,7.7977751 C6.92836458,5.50724811 4.52075769,4.01062761 4.25735899,4.27402631 C3.99396029,4.53742501 5.49058078,6.9450319 7.78110778,9.2355589 C10.0716348,11.5260859 12.4792417,13.0227064 12.7426404,12.7593077 C13.0060391,12.495909 11.5094186,10.0883021 9.21889157,7.7977751 Z\" id=\"Oval-96-Copy-2\"></path>\n        <path d=\"M9.92599835,9.94266568 C7.13970955,12.7289545 4.47144386,14.3876061 3.55025221,13.4664145 C2.62906055,12.5452228 4.2877122,9.87695712 7.074001,7.09066832 C9.86028979,4.30437952 12.5285555,2.64572788 13.4497471,3.56691953 C14.3709388,4.48811119 12.7122872,7.15637688 9.92599835,9.94266568 Z M9.21889157,9.2355589 C11.5094186,6.9450319 13.0060391,4.53742501 12.7426404,4.27402631 C12.4792417,4.01062761 10.0716348,5.50724811 7.78110778,7.7977751 C5.49058078,10.0883021 3.99396029,12.495909 4.25735899,12.7593077 C4.52075769,13.0227064 6.92836458,11.5260859 9.21889157,9.2355589 Z\" id=\"Oval-96-Copy-3\"></path>\n        <path d=\"M15.1464466,1.1464466 L14.3453364,1.94755684 L13.9608692,2.33202401 L14.667976,3.03913077 L15.0524431,2.65466362 L15.8535534,1.8535534 L15.1464466,1.1464466 Z M2.29760014,13.995293 L1.85311902,14.4397742 L1.004311,15.2885822 L1.71141776,15.995689 L2.56022581,15.146881 L3.00470698,14.7023998 L2.29760014,13.995293 Z\" id=\"Line\"></path>\n        <circle id=\"Oval-432\" cx=\"16\" cy=\"1\" r=\"1\"></circle>\n        <circle id=\"Oval-432-Copy\" cx=\"1\" cy=\"16\" r=\"1\"></circle>\n      </g>\n    </g>\n    "
  }
});

VcIconSvg.register({
  'compass-rotation-marker': {
    width: 53,
    height: 53,
    viewBox: '0 0 53 53',
    data: "\n    <!-- Generator: Sketch 3.4.3 (16044) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>compass-rotation-marker</title> -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n      <g id=\"compass-rotation-marker\">\n        <path d=\"M52.4399986,26.2199993 C52.4399986,11.7390936 40.7009051,0 26.2199993,0 C11.7390936,0 0,11.7390936 0,26.2199993 C0,40.7009051 11.7390936,52.4399986 26.2199993,52.4399986 C40.7009051,52.4399986 52.4399986,40.7009051 52.4399986,26.2199993 Z\" id=\"rotator\" stroke-opacity=\"0.135841259\" stroke=\"#E2A549\" stroke-width=\"9\" opacity=\"0.201434235\"></path>\n        <path d=\"M0,26.2199993 C0,11.7390936 11.7390936,0 26.2199993,0 L26.2199993,9 C16.7096563,9 9,16.7096563 9,26.2199993\" id=\"Shape\" opacity=\"0.634561567\" fill=\"#4990E2\"></path>\n      </g>\n    </g>"
  }
});

//
var vectorScratch = {};
var oldTransformScratch = {};
var newTransformScratch = {};
var centerScratch = {};
var script$1 = {
  name: 'vc-compass',
  props: {
    enableCompassOuterRing: Boolean
  },
  data: function data() {
    return {
      heading: 0,
      orbitCursorAngle: 0,
      orbitCursorOpacity: 0
    };
  },
  components: {
    VcIconSvg: VcIconSvg
  },
  computed: {
    outerCircleStyle: function outerCircleStyle() {
      return {
        transform: 'rotate(-' + this.heading + 'rad)',
        WebkitTransform: 'rotate(-' + this.heading + 'rad)',
        opacity: ''
      };
    },
    rotationMarkerStyle: function rotationMarkerStyle() {
      return {
        transform: 'rotate(-' + this.orbitCursorAngle + 'rad)',
        WebkitTransform: 'rotate(-' + this.orbitCursorAngle + 'rad)',
        opacity: this.orbitCursorOpacity
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer,
          cesiumObject = _ref.cesiumObject;
      _this.viewer = viewer;
      _this._unsubscribeFromViewerChange = _this.viewer.afterViewerChanged.addEventListener(function () {
        return viewerChange(_this);
      });
      viewerChange(_this);
    });
  },
  destroyed: function destroyed() {
    document.removeEventListener('mousemove', this.orbitMouseMoveFunction, false);
    document.removeEventListener('mouseup', this.orbitMouseUpFunction, false);
    document.removeEventListener('touchmove', this.orbitMouseMoveFunction, false);
    document.removeEventListener('touchend', this.orbitMouseUpFunction, false);
    this._unsubscribeFromClockTick && this._unsubscribeFromClockTick();
    this._unsubscribeFromPostRender && this._unsubscribeFromPostRender();
    this._unsubscribeFromViewerChange && this._unsubscribeFromViewerChange();
  },
  methods: {
    handleMouseDown: function handleMouseDown(e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      var _Cesium = Cesium,
          SceneMode = _Cesium.SceneMode;
      var scene = this.viewer.scene;

      if (scene.mode === SceneMode.MORPHING) {
        return true;
      }

      var _Cesium2 = Cesium,
          Cartesian2 = _Cesium2.Cartesian2;
      var compassElement = e.currentTarget;
      var compassRectangle = e.currentTarget.getBoundingClientRect();
      var maxDistance = compassRectangle.width / 2.0;
      var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
      var clickLocation = event.type === 'mousedown' ? new Cartesian2(event.clientX - compassRectangle.left, event.clientY - compassRectangle.top) : new Cartesian2(event.changedTouches[0].clientX - compassRectangle.left, event.changedTouches[0].clientY - compassRectangle.top);
      var vector = Cartesian2.subtract(clickLocation, center, vectorScratch);
      var distanceFromCenter = Cartesian2.magnitude(vector);
      var distanceFraction = distanceFromCenter / maxDistance;
      var nominalTotalRadius = 145;
      var norminalGyroRadius = 50;

      if (distanceFraction < norminalGyroRadius / nominalTotalRadius) {
        orbit(this, compassElement, vector);
      } else if (distanceFraction < 1.0) {
        rotate(this, compassElement, vector);
      } else {
        return true;
      }
    },
    handleDoubleClick: function handleDoubleClick(e) {
      var _Cesium3 = Cesium,
          Cartesian2 = _Cesium3.Cartesian2,
          Cartesian3 = _Cesium3.Cartesian3,
          defined = _Cesium3.defined,
          Matrix4 = _Cesium3.Matrix4,
          Ray = _Cesium3.Ray,
          SceneMode = _Cesium3.SceneMode,
          Transforms = _Cesium3.Transforms;
      var scene = this.viewer.scene;
      var camera = scene.camera;
      var sscc = scene.screenSpaceCameraController;

      if (scene.mode === SceneMode.MORPHING || !sscc.enableInputs) {
        return true;
      }

      if (scene.mode === SceneMode.COLUMBUS_VIEW && !sscc.enableTranslate) {
        return;
      }

      if (scene.mode === SceneMode.SCENE3D || scene.mode === SceneMode.COLUMBUS_VIEW) {
        if (!sscc.enableLook) {
          return;
        }

        if (scene.mode === SceneMode.SCENE3D) {
          if (!sscc.enableRotate) {
            return;
          }
        }
      }

      var windowPosition = new Cartesian2();
      windowPosition.x = scene.canvas.clientWidth / 2;
      windowPosition.y = scene.canvas.clientHeight / 2;
      var pickRayScratch = new Ray();
      var ray = camera.getPickRay(windowPosition, pickRayScratch);
      var center = scene.globe.pick(ray, scene, centerScratch);

      if (!defined(center)) {
        // Globe is barely visible, so reset to home view.
        this.viewer.camera.flyHome();
        return;
      }

      var rotateFrame = Transforms.eastNorthUpToFixedFrame(center, this.viewer.scene.globe.ellipsoid);
      var lookVector = Cartesian3.subtract(center, camera.position, new Cartesian3());
      var flight = CameraFlightPath.createTween(scene, {
        destination: Matrix4.multiplyByPoint(rotateFrame, new Cartesian3(0.0, 0.0, Cartesian3.magnitude(lookVector)), new Cartesian3()),
        direction: Matrix4.multiplyByPointAsVector(rotateFrame, new Cartesian3(0.0, 0.0, -1.0), new Cartesian3()),
        up: Matrix4.multiplyByPointAsVector(rotateFrame, new Cartesian3(0.0, 1.0, 0.0), new Cartesian3()),
        duration: 1.5
      });
      scene.tweens.add(flight);
    },
    resetRotater: function resetRotater() {
      this.orbitCursorOpacity = 0;
      this.orbitCursorAngle = 0;
    }
  }
};

function viewerChange(viewModel) {
  var _Cesium4 = Cesium,
      defined = _Cesium4.defined;

  if (defined(viewModel.viewer)) {
    if (viewModel._unsubscribeFromPostRender) {
      viewModel._unsubscribeFromPostRender();

      viewModel._unsubscribeFromPostRender = undefined;
    }

    viewModel._unsubscribeFromPostRender = viewModel.viewer.scene.postRender.addEventListener(function () {
      viewModel.heading = viewModel.viewer.scene.camera.heading;
    });
  } else {
    if (viewModel._unsubscribeFromPostRender) {
      viewModel._unsubscribeFromPostRender();

      viewModel._unsubscribeFromPostRender = undefined;
    }

    viewModel.showCompass = false;
  }
}

function orbit(viewModel, compassElement, cursorVector) {
  var _Cesium5 = Cesium,
      Cartesian2 = _Cesium5.Cartesian2,
      Cartesian3 = _Cesium5.Cartesian3,
      defined = _Cesium5.defined,
      getTimestamp = _Cesium5.getTimestamp,
      CesiumMath = _Cesium5.Math,
      Matrix4 = _Cesium5.Matrix4,
      Ray = _Cesium5.Ray,
      SceneMode = _Cesium5.SceneMode,
      Transforms = _Cesium5.Transforms;
  var scene = viewModel.viewer.scene;
  var camera = scene.camera;
  var sscc = scene.screenSpaceCameraController; // do not orbit if it is disabled

  if (scene.mode === SceneMode.MORPHING || !sscc.enableInputs) {
    return;
  }

  switch (scene.mode) {
    case SceneMode.COLUMBUS_VIEW:
      if (sscc.enableLook) {
        break;
      }

      if (!sscc.enableTranslate || !sscc.enableTilt) {
        return;
      }

      break;

    case SceneMode.SCENE3D:
      if (sscc.enableLook) {
        break;
      }

      if (!sscc.enableTilt || !sscc.enableRotate) {
        return;
      }

      break;

    case Cesium.SceneMode.SCENE2D:
      if (!sscc.enableTranslate) {
        return;
      }

      break;
  } // Remove existing event handlers, if any.


  document.removeEventListener('mousemove', viewModel.orbitMouseMoveFunction, false);
  document.removeEventListener('mouseup', viewModel.orbitMouseUpFunction, false);
  document.removeEventListener('touchmove', viewModel.orbitMouseMoveFunction, false);
  document.removeEventListener('touchend', viewModel.orbitMouseUpFunction, false);

  if (defined(viewModel.orbitTickFunction)) {
    viewModel.viewer.clock.onTick.removeEventListener(viewModel.orbitTickFunction);
  }

  viewModel.orbitMouseMoveFunction = undefined;
  viewModel.orbitMouseUpFunction = undefined;
  viewModel.orbitTickFunction = undefined;
  viewModel.isOrbiting = true;
  viewModel.orbitLastTimestamp = getTimestamp();
  var windowPosition = new Cartesian2();
  windowPosition.x = scene.canvas.clientWidth / 2;
  windowPosition.y = scene.canvas.clientHeight / 2;
  var pickRayScratch = new Ray();
  var ray = camera.getPickRay(windowPosition, pickRayScratch);
  var center = scene.globe.pick(ray, scene, centerScratch);

  if (!defined(center)) {
    viewModel.orbitFrame = Transforms.eastNorthUpToFixedFrame(camera.positionWC, viewModel.viewer.scene.globe.ellipsoid, newTransformScratch);
    viewModel.orbitIsLook = true;
  } else {
    viewModel.orbitFrame = Transforms.eastNorthUpToFixedFrame(center, viewModel.viewer.scene.globe.ellipsoid, newTransformScratch);
    viewModel.orbitIsLook = false;
  }

  viewModel.orbitTickFunction = function (e) {
    var timestamp = getTimestamp();
    var deltaT = timestamp - viewModel.orbitLastTimestamp;
    var rate = (viewModel.orbitCursorOpacity - 0.5) * 2.5 / 1000;
    var distance = deltaT * rate;
    var angle = viewModel.orbitCursorAngle + CesiumMath.PI_OVER_TWO;
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    scene = viewModel.viewer.scene;
    camera = scene.camera;
    var oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
    camera.lookAtTransform(viewModel.orbitFrame);

    if (viewModel.orbitIsLook) {
      camera.look(Cartesian3.UNIT_Z, -x);
      camera.look(camera.right, -y);
    } else {
      camera.rotateLeft(x);
      camera.rotateUp(y);
    }

    camera.lookAtTransform(oldTransform);
    viewModel.orbitLastTimestamp = timestamp;
  };

  function updateAngleAndOpacity(vector, compassWidth) {
    var angle = Math.atan2(-vector.y, vector.x);
    viewModel.orbitCursorAngle = CesiumMath.zeroToTwoPi(angle - CesiumMath.PI_OVER_TWO);
    var distance = Cartesian2.magnitude(vector);
    var maxDistance = compassWidth / 2.0;
    var distanceFraction = Math.min(distance / maxDistance, 1.0);
    var easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5;
    viewModel.orbitCursorOpacity = easedOpacity;
  }

  viewModel.orbitMouseMoveFunction = function (e) {
    var compassRectangle = compassElement.getBoundingClientRect();
    center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
    var clickLocation = event.type === 'mousemove' ? new Cartesian2(event.clientX - compassRectangle.left, event.clientY - compassRectangle.top) : new Cartesian2(event.changedTouches[0].clientX - compassRectangle.left, event.changedTouches[0].clientY - compassRectangle.top);
    var vector = Cartesian2.subtract(clickLocation, center, vectorScratch);
    updateAngleAndOpacity(vector, compassRectangle.width);
  };

  viewModel.orbitMouseUpFunction = function (e) {
    // TODO: if mouse didn't move, reset view to looking down, north is up?
    viewModel.isOrbiting = false;
    document.removeEventListener('mousemove', viewModel.orbitMouseMoveFunction, false);
    document.removeEventListener('mouseup', viewModel.orbitMouseUpFunction, false);
    document.removeEventListener('touchmove', viewModel.orbitMouseMoveFunction, false);
    document.removeEventListener('touchend', viewModel.orbitMouseUpFunction, false);

    if (defined(viewModel.orbitTickFunction)) {
      viewModel.viewer.clock.onTick.removeEventListener(viewModel.orbitTickFunction);
    }

    viewModel.orbitMouseMoveFunction = undefined;
    viewModel.orbitMouseUpFunction = undefined;
    viewModel.orbitTickFunction = undefined;
  };

  document.addEventListener('mousemove', viewModel.orbitMouseMoveFunction, false);
  document.addEventListener('mouseup', viewModel.orbitMouseUpFunction, false);
  document.addEventListener('touchmove', viewModel.orbitMouseMoveFunction, false);
  document.addEventListener('touchend', viewModel.orbitMouseUpFunction, false);
  viewModel._unsubscribeFromClockTick = viewModel.viewer.clock.onTick.addEventListener(viewModel.orbitTickFunction);
  updateAngleAndOpacity(cursorVector, compassElement.getBoundingClientRect().width);
}

function rotate(viewModel, compassElement, cursorVector) {
  if (!viewModel.enableCompassOuterRing) {
    return;
  }

  var scene = viewModel.viewer.scene;
  var camera = scene.camera;
  var sscc = scene.screenSpaceCameraController; // do not rotate in 2D mode or if rotating is disabled

  if (scene.mode === Cesium.SceneMode.MORPHING || scene.mode === Cesium.SceneMode.SCENE2D || !sscc.enableInputs) {
    return;
  }

  if (!sscc.enableLook && (scene.mode === Cesium.SceneMode.COLUMBUS_VIEW || scene.mode === Cesium.SceneMode.SCENE3D && !sscc.enableRotate)) {
    return;
  } // Remove existing event handlers, if any.


  document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
  document.removeEventListener('touchmove', viewModel.rotateMouseMoveFunction, false);
  document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
  document.removeEventListener('touchend', viewModel.rotateMouseUpFunction, false);
  var _Cesium6 = Cesium,
      Cartesian2 = _Cesium6.Cartesian2,
      Cartesian3 = _Cesium6.Cartesian3,
      defined = _Cesium6.defined,
      CesiumMath = _Cesium6.Math,
      Matrix4 = _Cesium6.Matrix4,
      Ray = _Cesium6.Ray,
      Transforms = _Cesium6.Transforms;
  viewModel.rotateMouseMoveFunction = undefined;
  viewModel.rotateMouseUpFunction = undefined;
  viewModel.isRotating = true;
  viewModel.rotateInitialCursorAngle = Math.atan2(-cursorVector.y, cursorVector.x);
  var windowPosition = new Cartesian2();
  windowPosition.x = scene.canvas.clientWidth / 2;
  windowPosition.y = scene.canvas.clientHeight / 2;
  var pickRayScratch = new Ray();
  var ray = camera.getPickRay(windowPosition, pickRayScratch);
  var viewCenter = scene.globe.pick(ray, scene, centerScratch);

  if (!defined(viewCenter)) {
    viewModel.rotateFrame = Transforms.eastNorthUpToFixedFrame(camera.positionWC, viewModel.viewer.scene.globe.ellipsoid, newTransformScratch);
    viewModel.rotateIsLook = true;
  } else {
    viewModel.rotateFrame = Transforms.eastNorthUpToFixedFrame(viewCenter, viewModel.viewer.scene.globe.ellipsoid, newTransformScratch);
    viewModel.rotateIsLook = false;
  }

  var oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
  camera.lookAtTransform(viewModel.rotateFrame);
  viewModel.rotateInitialCameraAngle = Math.atan2(camera.position.y, camera.position.x);
  viewModel.rotateInitialCameraDistance = Cartesian3.magnitude(new Cartesian3(camera.position.x, camera.position.y, 0.0));
  camera.lookAtTransform(oldTransform);

  viewModel.rotateMouseMoveFunction = function (e) {
    var compassRectangle = compassElement.getBoundingClientRect();
    var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
    var clickLocation = event.type === 'mousedown' || event.type === 'mousemove' ? new Cartesian2(event.clientX - compassRectangle.left, event.clientY - compassRectangle.top) : new Cartesian2(event.changedTouches[0].clientX - compassRectangle.left, event.changedTouches[0].clientY - compassRectangle.top);
    var vector = Cartesian2.subtract(clickLocation, center, vectorScratch);
    var angle = Math.atan2(-vector.y, vector.x);
    var angleDifference = angle - viewModel.rotateInitialCursorAngle;
    var newCameraAngle = CesiumMath.zeroToTwoPi(viewModel.rotateInitialCameraAngle - angleDifference);
    camera = viewModel.viewer.scene.camera;
    oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
    camera.lookAtTransform(viewModel.rotateFrame);
    var currentCameraAngle = Math.atan2(camera.position.y, camera.position.x);
    camera.rotateRight(newCameraAngle - currentCameraAngle);
    camera.lookAtTransform(oldTransform);
  };

  viewModel.rotateMouseUpFunction = function (e) {
    viewModel.isRotating = false;
    document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
    document.removeEventListener('touchmove', viewModel.rotateMouseMoveFunction, false);
    document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
    document.removeEventListener('touchend', viewModel.rotateMouseUpFunction, false);
    viewModel.rotateMouseMoveFunction = undefined;
    viewModel.rotateMouseUpFunction = undefined;
  };

  document.addEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
  document.addEventListener('touchmove', viewModel.rotateMouseMoveFunction, false);
  document.addEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
  document.addEventListener('touchend', viewModel.rotateMouseUpFunction, false);
}

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-compass",
    attrs: {
      "title": _vm.$vc.lang.navigation.compass.description
    },
    on: {
      "dblclick": _vm.handleDoubleClick,
      "mousedown": _vm.handleMouseDown,
      "mouseup": _vm.resetRotater,
      "touchend": _vm.resetRotater,
      "touchstart": _vm.handleMouseDown
    }
  }, [_c('div', {
    staticClass: "vc-compass-outerRing",
    style: _vm.outerCircleStyle
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "compass-outer"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "vc-compass-innerRing"
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "compass-inner"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "vc-compass-rotation-marker",
    style: _vm.rotationMarkerStyle
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "compass-rotation-marker"
    }
  })], 1)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* component normalizer */

function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcCompass.vue";

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


var VcCompass = __vue_normalize__$1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1);

VcIconSvg.register({
  increase: {
    width: 50,
    height: 50,
    viewBox: '0 0 50 50',
    data: "\n    <!-- Generator: Sketch 3.4.3 (16044) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>increase</title> -->\n    <path d=\"M0,25 C0,25.3514939 0.131810207,25.659051 0.373462207,25.900703 C0.615114207,26.142355 0.922671379,26.2741652 1.27416517,26.2741652 L23.7258348,26.2741652 L23.7258348,48.7258348 C23.7258348,49.0773286 23.857645,49.3848858 24.099297,49.6265378 C24.3189807,49.8462214 24.6485061,50 25,50 C25.7029877,50 26.2741652,49.4288225 26.2741652,48.7258348 L26.2741652,26.2741652 L48.7258348,26.2741652 C49.4288225,26.2741652 50,25.7029877 50,25 C50,24.2970123 49.4288225,23.7258348 48.7258348,23.7258348 L26.2741652,23.7258348 L26.2741652,1.27416517 C26.2741652,0.571177517 25.7029877,0 25,0 C24.2970123,0 23.7258348,0.571177517 23.7258348,1.27416517 L23.7258348,23.7258348 L1.27416517,23.7258348 C0.571177517,23.7258348 0,24.2970123 0,25 L0,25 L0,25 L0,25 Z\" id=\"Shape\"></path>"
  }
});

VcIconSvg.register({
  decrease: {
    width: 50,
    height: 6,
    viewBox: '0 0 50 6',
    data: "\n    <!-- Generator: Sketch 3.4.3 (16044) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>decrease</title> -->\n    <path d=\"M46.6183575,0.657894737 L3.30112724,0.657894737 C1.44927539,0.657894737 0,1.66880618 0,2.96052632 C0,4.25224645 1.44927539,5.26315789 3.30112724,5.26315789 L46.6988728,5.26315789 C48.5507246,5.26315789 50,4.25224645 50,2.96052632 C49.9194847,1.66880618 48.4702093,0.657894737 46.6183575,0.657894737 L46.6183575,0.657894737 L46.6183575,0.657894737 Z\" id=\"Shape\"></path>"
  }
});

VcIconSvg.register({
  refresh: {
    width: 50,
    height: 50,
    viewBox: '0 0 50 50',
    data: "\n    <!-- Generator: Sketch 3.4.3 (16044) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>refresh</title>  -->\n    <path d=\"M48.2758621,0 C47.2844828,0 46.5086207,0.775193846 46.5086207,1.76571923 L46.5086207,12.2308355 C42.0689655,4.78036173 34.0086207,0 25,0 C11.2068965,0 0,11.1972438 0,25.0215332 C0,38.8458226 11.2068965,50 25,50 C38.7931035,50 50,38.8027562 50,25.0215332 C50,24.0310078 49.2241379,23.2558139 48.2327587,23.2558139 C47.2413793,23.2558139 46.4655172,24.0310078 46.4655172,25.0215332 C46.4655172,36.8647717 36.8103448,46.5116279 24.9568965,46.5116279 C13.1034483,46.5116279 3.49137933,36.8217054 3.49137933,24.9784668 C3.49137933,13.1352283 13.1465517,3.48837212 25,3.48837212 C33.4913793,3.48837212 41.0775862,8.44099913 44.5258621,16.0206718 L32.1551724,16.0206718 C31.1637931,16.0206718 30.3879311,16.7958657 30.3879311,17.7863911 C30.3879311,18.7769164 31.1637931,19.5521103 32.1551724,19.5521103 L48.2327587,19.5521103 C49.2241379,19.5521103 50,18.7769164 50,17.7863911 L50,1.72265288 C50,0.775193846 49.2241379,0 48.2758621,0 L48.2758621,0 L48.2758621,0 Z\" id=\"Shape\"></path>"
  }
});

//
var script$2 = {
  name: 'vc-zoomControl',
  components: {
    VcIconSvg: VcIconSvg
  },
  props: {
    defaultResetView: Object,
    zoomAmount: Number,
    overrideCamera: Boolean
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer,
          cesiumObject = _ref.cesiumObject;
      _this.viewer = viewer;

      if (_this.overrideCamera) {
        var resetView = _this.defaultResetView;

        if (resetView && resetView.lng) {
          viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(resetView.lng, resetView.lat, resetView.height, viewer.scene.globe.ellipsoid),
            orientation: {
              heading: Cesium.Math.toRadians(resetView.heading || 360),
              pitch: Cesium.Math.toRadians(resetView.pitch || -90),
              roll: Cesium.Math.toRadians(resetView.roll || 0)
            }
          });
        } else if (resetView && resetView.west) {
          try {
            var rectangle = Cesium.Rectangle.fromDegrees(resetView.west, resetView.south, resetView.east, resetView.north);
            Cesium.Rectangle.validate(rectangle);
            viewer.camera.setView({
              destination: rectangle,
              orientation: {
                heading: Cesium.Math.toRadians(5.729578)
              }
            });
          } catch (e) {
            console.error('[VueCesium] ERROR: options.defaultResetView Cesium rectangle is  invalid!');
          }
        }
      }
    });
  },
  methods: {
    zoomIn: function zoomIn() {
      this.zoom(1 / this.zoomAmount);
    },
    zoomOut: function zoomOut() {
      this.zoom(this.zoomAmount);
    },
    zoom: function zoom(relativeAmount) {
      var _Cesium = Cesium,
          Cartesian3 = _Cesium.Cartesian3,
          defined = _Cesium.defined,
          IntersectionTests = _Cesium.IntersectionTests,
          Ray = _Cesium.Ray,
          SceneMode = _Cesium.SceneMode;

      if (defined(this.viewer)) {
        var scene = this.viewer.scene;
        var sscc = scene.screenSpaceCameraController; // do not zoom if it is disabled

        if (!sscc.enableInputs || !sscc.enableZoom) {
          return;
        } // TODO
        //            if(scene.mode == SceneMode.COLUMBUS_VIEW && !sscc.enableTranslate) {
        //                return;
        //            }


        var camera = scene.camera;
        var orientation;

        switch (scene.mode) {
          case SceneMode.MORPHING:
            {
              break;
            }

          case SceneMode.SCENE2D:
            {
              camera.zoomIn(camera.positionCartographic.height * (1 - relativeAmount));
              break;
            }

          default:
            {
              var focus;

              if (defined(this.viewer.trackedEntity)) {
                focus = new Cesium.Cartesian3();
              } else {
                focus = this.getCameraFocus(this.viewer, false);
              }

              if (!Cesium.defined(focus)) {
                // Camera direction is not pointing at the globe, so use the ellipsoid horizon point as
                // the focal point.
                var ray = new Ray(camera.worldToCameraCoordinatesPoint(scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic)), camera.directionWC);
                focus = IntersectionTests.grazingAltitudeLocation(ray, scene.globe.ellipsoid);
                orientation = {
                  heading: camera.heading,
                  pitch: camera.pitch,
                  roll: camera.roll
                };
              } else {
                orientation = {
                  direction: camera.direction,
                  up: camera.up
                };
              }

              var cartesian3Scratch = new Cartesian3();
              var direction = Cartesian3.subtract(camera.position, focus, cartesian3Scratch);
              var movementVector = Cartesian3.multiplyByScalar(direction, relativeAmount, direction);
              var endPosition = Cartesian3.add(focus, movementVector, focus);

              if (Cesium.defined(this.viewer.trackedEntity) || scene.mode === SceneMode.COLUMBUS_VIEW) {
                // sometimes flyTo does not work (jumps to wrong position) so just set the position without any animation
                // do not use flyTo when tracking an entity because during animatiuon the position of the entity may change
                camera.position = endPosition;
              } else {
                camera.flyTo({
                  destination: endPosition,
                  orientation: orientation,
                  duration: 0.5,
                  convert: false
                });
              }
            }
        }
      }
    },
    zoomReset: function zoomReset() {
      var scene = this.viewer.scene;
      var sscc = scene.screenSpaceCameraController;

      if (!sscc.enableInputs) {
        return;
      }

      var _Cesium2 = Cesium,
          Cartesian3 = _Cesium2.Cartesian3,
          CesiumMath = _Cesium2.Math,
          Rectangle = _Cesium2.Rectangle;
      var camera = scene.camera;

      if (Cesium.defined(this.viewer.trackedEntity)) {
        // when tracking do not reset to default view but to default view of tracked entity
        var trackedEntity = this.viewer.trackedEntity;
        this.viewer.trackedEntity = undefined;
        this.viewer.trackedEntity = trackedEntity;
      } else {
        // reset to a default position or view defined in the options
        var resetView = this.defaultResetView;

        if (resetView && resetView.lng) {
          camera.flyTo({
            destination: Cartesian3.fromDegrees(resetView.lng, resetView.lat, resetView.height, this.viewer.scene.globe.ellipsoid),
            orientation: {
              heading: Cesium.Math.toRadians(resetView.heading || 360),
              pitch: Cesium.Math.toRadians(resetView.pitch || -90),
              roll: Cesium.Math.toRadians(resetView.roll || 0)
            }
          });
        } else if (resetView && resetView.west) {
          try {
            var rectangle = Rectangle.fromDegrees(resetView.west, resetView.south, resetView.east, resetView.north);
            Rectangle.validate(rectangle);
            camera.flyTo({
              destination: rectangle,
              orientation: {
                heading: CesiumMath.toRadians(5.729578)
              }
            });
          } catch (e) {
            console.error('[VueCesium] ERROR: options.defaultResetView Cesium rectangle is  invalid!');
          }
        } else {
          camera.flyTo({
            destination: Cartesian3.fromDegrees(105, 29.999999999999993, 19059568.497290563, this.viewer.scene.globe.ellipsoid)
          });
        }
      }
    },
    getCameraFocus: function getCameraFocus(scene) {
      var _Cesium3 = Cesium,
          defined = _Cesium3.defined,
          IntersectionTests = _Cesium3.IntersectionTests,
          Ray = _Cesium3.Ray;
      var ray = new Ray(scene.camera.positionWC, scene.camera.directionWC);
      var intersections = IntersectionTests.rayEllipsoid(ray, this.viewer.scene.globe.ellipsoid);

      if (defined(intersections)) {
        return Ray.getPoint(ray, intersections.start);
      } // Camera direction is not pointing at the globe, so use the ellipsoid horizon point as
      // the focal point.


      return IntersectionTests.grazingAltitudeLocation(ray, this.viewer.scene.globe.ellipsoid);
    }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-zoom-control"
  }, [_c('ul', {
    staticClass: "vc-list"
  }, [_c('li', [_c('button', {
    staticClass: "vc-increase",
    attrs: {
      "title": _vm.$vc.lang.navigation.zoomCotrol.zoomIn,
      "type": "button"
    },
    on: {
      "click": _vm.zoomIn
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "increase"
    }
  })], 1)]), _vm._v(" "), _c('li', [_c('button', {
    staticClass: "vc-refresh",
    attrs: {
      "title": _vm.$vc.lang.navigation.zoomCotrol.zoomReset,
      "type": "button"
    },
    on: {
      "click": _vm.zoomReset
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "refresh"
    }
  })], 1)]), _vm._v(" "), _c('li', [_c('button', {
    staticClass: "vc-decrease",
    attrs: {
      "title": _vm.$vc.lang.navigation.zoomCotrol.zoomOut,
      "type": "button"
    },
    on: {
      "click": _vm.zoomOut
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "decrease"
    }
  })], 1)])])]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* component normalizer */

function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcZoomControl.vue";

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


var VcZoomControl = __vue_normalize__$2({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2);

//
var script$3 = {
  name: 'vc-legend-distance',
  data: function data() {
    return {
      barWidth: 0,
      distance: 0,
      distanceLabel: undefined
    };
  },
  computed: {
    barStyle: function barStyle() {
      return {
        width: this.barWidth + 'px',
        left: 5 + (125 - this.barWidth) / 2 + 'px',
        height: '2px'
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer;
      _this.viewer = viewer;
      _this.viewerSubscriptions = [];
      _this.removeUpdateSubscription = undefined;
      _this._lastLegendUpdate = undefined;

      _this.viewerSubscriptions.push(_this.viewer.beforeViewerChanged.addEventListener(function () {
        if (Cesium.defined(_this.removeUpdateSubscription)) {
          _this.removeUpdateSubscription();

          _this.removeUpdateSubscription = undefined;
        }
      }));

      _this.addUpdateSubscription();

      _this.viewerSubscriptions.push(_this.viewer.afterViewerChanged.addEventListener(function () {
        _this.addUpdateSubscription();
      }));
    });
  },
  methods: {
    addUpdateSubscription: function addUpdateSubscription() {
      var _this2 = this;

      // const that = this
      var _Cesium = Cesium,
          defined = _Cesium.defined;

      if (defined(this.viewer)) {
        var scene = this.viewer.scene;
        this.removeUpdateSubscription = scene.postRender.addEventListener(function () {
          _this2.updateDistanceLegendCesium(scene);
        });
      }
    },
    updateDistanceLegendCesium: function updateDistanceLegendCesium(scene) {
      var _Cesium2 = Cesium,
          Cartesian2 = _Cesium2.Cartesian2,
          defined = _Cesium2.defined,
          getTimestamp = _Cesium2.getTimestamp;
      var now = getTimestamp();

      if (now < this._lastLegendUpdate + 250) {
        return;
      }

      this._lastLegendUpdate = now;
      var geodesic = new Cesium.EllipsoidGeodesic(); // Find the distance between two pixels at the bottom center of the screen.

      var width = scene.canvas.clientWidth;
      var height = scene.canvas.clientHeight;
      var left = scene.camera.getPickRay(new Cartesian2(width / 2 | 0, height - 1));
      var right = scene.camera.getPickRay(new Cartesian2(1 + width / 2 | 0, height - 1));
      var globe = scene.globe;
      var leftPosition = globe.pick(left, scene);
      var rightPosition = globe.pick(right, scene);

      if (!defined(leftPosition) || !defined(rightPosition)) {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
        return;
      }

      var leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
      var rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);
      geodesic.setEndPoints(leftCartographic, rightCartographic);
      var pixelDistance = geodesic.surfaceDistance; // Find the first distance that makes the scale bar less than 100 pixels.

      var maxBarWidth = 100;
      var distance;

      for (var i = distances.length - 1; !defined(distance) && i >= 0; --i) {
        if (distances[i] / pixelDistance < maxBarWidth) {
          distance = distances[i];

          if (this.distance !== distance) {
            this.distance = distance;
            this.$emit('legendChanged', distance);
          }
        }
      }

      if (defined(distance)) {
        var label;

        if (distance >= 1000) {
          label = (distance / 1000).toString() + ' km';
        } else {
          label = distance.toString() + ' m';
        }

        this.barWidth = distance / pixelDistance | 0;
        this.distanceLabel = label;
      } else {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
      }
    }
  }
};
var distances = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000];

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.distanceLabel ? _c('div', {
    staticClass: "vc-legend vc-legend-distance"
  }, [_c('label', [_vm._v(_vm._s(_vm.distanceLabel))]), _vm._v(" "), _c('div', {
    staticClass: "vc-bar",
    style: _vm.barStyle
  })]) : _vm._e();
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* component normalizer */

function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcDistanceLegend.vue";

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


var VcDistanceLegend = __vue_normalize__$3({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3);

//
var script$4 = {
  name: 'vc-bar-location',
  data: function data() {
    return {
      cameraHeight: 0
    };
  },
  props: {
    showUtmZone: {
      type: Boolean,
      default: true
    },
    mouseCoords: Object
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer;
      _this.viewer = viewer;
      _this.lastMouseX = -1;
      _this.lastMouseY = -1;

      _this.viewer._element.addEventListener('mousemove', _this.onMouseMove, false);

      _this.viewer._element.addEventListener('touchmove', _this.onMouseMove, false);

      _this.cameraHeight = _this.viewer.camera.positionCartographic.height.toFixed(2);

      _this.viewer.camera.changed.addEventListener(function () {
        _this.cameraHeight = _this.viewer.camera.positionCartographic.height.toFixed(2);
      });

      extend();
    });
  },
  methods: {
    toggleUseProjection: function toggleUseProjection() {
      this.mouseCoords.toggleUseProjection();
    },
    onMouseMove: function onMouseMove(event) {
      var _Cesium = Cesium,
          Cartesian2 = _Cesium.Cartesian2;
      var clientX = event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;
      var clientY = event.type === 'mousemove' ? event.clientY : event.changedTouches[0].clientY;

      if (clientX === this.lastMouseX && clientY === this.lastMouseY) {
        return;
      }

      this.lastMouseX = clientX;
      this.lastMouseY = clientY;

      if (this.viewer) {
        var rect = this.viewer._element.getBoundingClientRect();

        var position = new Cartesian2(clientX - rect.left, clientY - rect.top);
        this.mouseCoords.updateCoordinatesFromCesium(this.viewer, position);
      }
    }
  },
  destroyed: function destroyed() {
    this.viewer._element.removeEventListener('mousemove', this.onMouseMove, false);

    this.viewer._element.removeEventListener('touchmove', this.onMouseMove, false);
  }
};
var scratchArray = [];
var scratchSphereIntersectionResult = {
  start: 0.0,
  stop: 0.0
};
var scratchV0 = {};
var scratchV1 = {};
var scratchV2 = {};
var scratchResult = {};

function extend() {
  var _Cesium2 = Cesium,
      Globe = _Cesium2.Globe,
      GlobeSurfaceTile = _Cesium2.GlobeSurfaceTile,
      BoundingSphere = _Cesium2.BoundingSphere,
      defaultValue = _Cesium2.defaultValue,
      Cartesian3 = _Cesium2.Cartesian3,
      defined = _Cesium2.defined,
      DeveloperError = _Cesium2.DeveloperError,
      IntersectionTests = _Cesium2.IntersectionTests,
      SceneMode = _Cesium2.SceneMode;

  Globe.prototype.pickTriangle = Globe.prototype.pickTriangle || function (ray, scene, cullBackFaces, result) {
    // >>includeStart('debug', pragmas.debug);
    if (!defined(ray)) {
      throw new DeveloperError('ray is required');
    }

    if (!defined(scene)) {
      throw new DeveloperError('scene is required');
    } // >>includeEnd('debug');


    cullBackFaces = defaultValue(cullBackFaces, true);
    var mode = scene.mode;
    var projection = scene.mapProjection;
    var sphereIntersections = scratchArray;
    sphereIntersections.length = 0;
    var tilesToRender = this._surface._tilesToRender;
    var length = tilesToRender.length;
    var tile;
    var i;

    for (i = 0; i < length; ++i) {
      tile = tilesToRender[i];
      var surfaceTile = tile.data;

      if (!defined(surfaceTile)) {
        continue;
      }

      var boundingVolume = surfaceTile.pickBoundingSphere;

      if (mode !== SceneMode.SCENE3D) {
        BoundingSphere.fromRectangleWithHeights2D(tile.rectangle, projection, surfaceTile.minimumHeight, surfaceTile.maximumHeight, boundingVolume);
        Cartesian3.fromElements(boundingVolume.center.z, boundingVolume.center.x, boundingVolume.center.y, boundingVolume.center);
      } else {
        BoundingSphere.clone(surfaceTile.boundingSphere3D, boundingVolume);
      }

      var boundingSphereIntersection = IntersectionTests.raySphere(ray, boundingVolume, scratchSphereIntersectionResult);

      if (defined(boundingSphereIntersection)) {
        sphereIntersections.push(tile);
      }
    }

    sphereIntersections.sort(createComparePickTileFunction(ray.origin));
    var intersection;
    length = sphereIntersections.length;

    for (i = 0; i < length; ++i) {
      intersection = sphereIntersections[i].data.pickTriangle(ray, scene.mode, scene.mapProjection, cullBackFaces, result);

      if (defined(intersection)) {
        intersection.tile = sphereIntersections[i];
        break;
      }
    }

    return intersection;
  };

  GlobeSurfaceTile.prototype.pickTriangle = GlobeSurfaceTile.prototype.pickTriangle || function (ray, mode, projection, cullBackFaces) {
    var mesh = this.renderedMesh;

    if (!defined(mesh)) {
      return undefined;
    }

    var vertices = mesh.vertices;
    var indices = mesh.indices;
    var encoding = mesh.encoding;
    var length = indices.length;

    for (var i = 0; i < length; i += 3) {
      var i0 = indices[i];
      var i1 = indices[i + 1];
      var i2 = indices[i + 2];
      var v0 = getPosition(encoding, mode, projection, vertices, i0, scratchV0);
      var v1 = getPosition(encoding, mode, projection, vertices, i1, scratchV1);
      var v2 = getPosition(encoding, mode, projection, vertices, i2, scratchV2);
      var intersection = IntersectionTests.rayTriangle(ray, v0, v1, v2, cullBackFaces, scratchResult);

      if (defined(intersection)) {
        return {
          intersection: intersection,
          v0: v0,
          v1: v1,
          v2: v2
        };
      }
    }

    return undefined;
  };
}

function createComparePickTileFunction(rayOrigin) {
  var _Cesium3 = Cesium,
      BoundingSphere = _Cesium3.BoundingSphere;
  return function (a, b) {
    var aDist = BoundingSphere.distanceSquaredTo(a.data.pickBoundingSphere, rayOrigin);
    var bDist = BoundingSphere.distanceSquaredTo(b.data.pickBoundingSphere, rayOrigin);
    return aDist - bDist;
  };
}

function getPosition(encoding, mode, projection, vertices, index, result) {
  encoding.decodePosition(vertices, index, result);
  var _Cesium4 = Cesium,
      Cartesian3 = _Cesium4.Cartesian3,
      defined = _Cesium4.defined,
      SceneMode = _Cesium4.SceneMode;

  if (defined(mode) && mode !== SceneMode.SCENE3D) {
    var ellipsoid = projection.ellipsoid;
    var positionCart = ellipsoid.cartesianToCartographic(result);
    projection.project(positionCart, result);
    Cartesian3.fromElements(result.z, result.x, result.y, result);
  }

  return result;
}

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "vc-legend vc-bar-location",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.toggleUseProjection
    }
  }, [!_vm.mouseCoords.useProjection ? [_c('div', {
    staticClass: "vc-section"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.lon))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mouseCoords.longitude))])]), _vm._v(" "), _c('div', {
    staticClass: "vc-section"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.lat))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mouseCoords.latitude))])])] : [_c('div', {
    staticClass: "vc-section-short"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.zone))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mouseCoords.utmZone))])]), _vm._v(" "), _c('div', {
    staticClass: "vc-section"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.e))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mouseCoords.east))])]), _vm._v(" "), _c('div', {
    staticClass: "vc-section"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.n))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mouseCoords.north))])])], _vm._v(" "), _vm.mouseCoords.elevation ? _c('div', {
    staticClass: "vc-section-long"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.elev))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mouseCoords.elevation))])]) : _vm._e(), _vm._v(" "), _vm.cameraHeight < 20000000 ? _c('div', {
    staticClass: "vc-section-long"
  }, [_c('span', [_vm._v(_vm._s(_vm.$vc.lang.navigation.legend.cameraHeight))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.cameraHeight))])]) : _vm._e()], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* component normalizer */

function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcLocationBar.vue";

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


var VcLocationBar = __vue_normalize__$4({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4);

VcIconSvg.register({
  share: {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    data: "\n    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>Mask</title> -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n      <g id=\"share-20\" fill-rule=\"nonzero\">\n        <g id=\"Mask\">\n            <path d=\"M5.97733131,7.62936833 C5.99229467,7.75081434 6,7.87450733 6,8 C6,8.1254927 5.99229467,8.2491857 5.97733131,8.3706317 L10.9173886,10.8406603 C11.456951,10.3201529 12.1910876,10 13,10 C14.6568542,10 16,11.3431458 16,13 C16,14.6568542 14.6568542,16 13,16 C11.3431458,16 10,14.6568542 10,13 C10,12.8745073 10.0077053,12.7508143 10.0226687,12.6293683 L5.08261143,10.1593397 C4.54304902,10.6798471 3.80891237,11 3,11 C1.34314575,11 0,9.6568542 0,8 C0,6.34314575 1.34314575,5 3,5 C3.80891237,5 4.54304902,5.32015293 5.08261143,5.84066029 L10.0226687,3.37063167 C10.0077053,3.24918566 10,3.12549267 10,3 C10,1.34314575 11.3431458,0 13,0 C14.6568542,0 16,1.34314575 16,3 C16,4.65685425 14.6568542,6 13,6 C12.1910876,6 11.456951,5.67984707 10.9173886,5.15933971 L5.97733131,7.62936833 Z M13,14 C13.5522847,14 14,13.5522847 14,13 C14,12.4477153 13.5522847,12 13,12 C12.4477153,12 12,12.4477153 12,13 C12,13.5522847 12.4477153,14 13,14 Z M13,4 C13.5522847,4 14,3.55228475 14,3 C14,2.44771525 13.5522847,2 13,2 C12.4477153,2 12,2.44771525 12,3 C12,3.55228475 12.4477153,4 13,4 Z M3,9 C3.55228475,9 4,8.5522847 4,8 C4,7.44771525 3.55228475,7 3,7 C2.44771525,7 2,7.44771525 2,8 C2,8.5522847 2.44771525,9 3,9 Z\" id=\"path-1\"></path>\n        </g>\n      </g>\n    </g>"
  }
});

//
var script$5 = {
  props: {
    options: Object
  },
  data: function data() {
    return {
      mapImageDataUrl: undefined,
      ready: false,
      credits: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    captureScreenshot(this.options.viewer).then(function (mapImageDataUrl) {
      // We need to periodically check whether all images are loaded.
      // We can theoretically do that either with a setInterval on the original TerriaJS window,
      // or on the print view window. But:
      //    * Chrome (as of v66.0.3359.139 anyway) seems to aggressively suspend setInterval calls in background
      // tabs, so only a setInterval on the print view window works reliably.
      //    * Internet Explorer 11 does not seem to allow a cross-window setInterval call, so only a setInterval
      // on the original TerriaJS window works reliably.
      // So, we'll do both.
      var printWindow = _this.options.printWindow;
      var mainWindow = window;
      var printWindowIntervalId = printWindow.setInterval(_this.checkForImagesReady, 200);
      var mainWindowIntervalId = mainWindow.setInterval(_this.checkForImagesReady, 200);

      _this._stopCheckingForImages = function () {
        printWindow.clearInterval(printWindowIntervalId);
        mainWindow.clearInterval(mainWindowIntervalId);
        _this._stopCheckingForImages = undefined;
      };

      _this.mapImageDataUrl = mapImageDataUrl;
    });
    this.credits = getAllAttribution(this.options.viewer);
  },
  methods: {
    checkForImagesReady: function checkForImagesReady() {
      if (this.ready) {
        return;
      }

      var imageTags = this.options.printWindow.document.getElementsByTagName('img');

      if (imageTags.length === 0) {
        return;
      }

      var allImagesReady = true;

      for (var i = 0; allImagesReady && i < imageTags.length; ++i) {
        allImagesReady = imageTags[i].complete;
      }

      if (allImagesReady) {
        this.stopCheckingForImages();
        this.ready = allImagesReady;
        this.$emit('ready', this.options.printWindow);
      }
    },
    stopCheckingForImages: function stopCheckingForImages() {
      if (this._stopCheckingForImages) {
        this._stopCheckingForImages();
      }
    }
  },
  destroyed: function destroyed() {
    this.stopCheckingForImages();
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('p', [_c('img', {
    staticClass: "vc-map-image",
    attrs: {
      "src": _vm.mapImageDataUrl,
      "alt": "Map snaphot"
    }
  })]), _vm._v(" "), _vm.credits.length > 0 && _vm.options.showCredit ? _c('h1', [_vm._v("Map Credits")]) : _vm._e(), _vm._v(" "), _vm.credits.length > 0 && _vm.options.showCredit ? _c('ul', [_vm._l(_vm.credits, function (credit, index) {
    return [_c('li', {
      key: 'credit' + index,
      domProps: {
        "innerHTML": _vm._s(credit)
      }
    })];
  })], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* component normalizer */

function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcPrintView.vue";

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


var VcPrintView = __vue_normalize__$5({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5);

//
var script$6 = {
  name: 'vc-view-print',
  components: {
    VcIconSvg: VcIconSvg
  },
  props: {
    printAutomatically: Boolean,
    showCredit: {
      type: Boolean,
      default: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer;
      _this.viewer = viewer;
    });
  },
  methods: {
    handleCick: function handleCick() {
      this.createPrintView();
    },
    createPrintView: function createPrintView() {
      var _this2 = this;

      var viewer = this.viewer,
          showCredit = this.showCredit,
          printAutomatically = this.printAutomatically;
      this.creatingPrintView = true;

      if (printAutomatically) {
        this.iframe = document.createElement('iframe');
        document.body.appendChild(this.iframe);
      }

      var newWindow = createWindow({
        printWindow: this.iframe ? this.iframe.contentWindow : undefined,
        closeCallback: function closeCallback(windowToPrint) {
          if (printAutomatically) {
            _this2.creatingPrintView = false;
          }
        }
      });
      var options = {
        viewer: viewer,
        printWindow: newWindow,
        showCredit: showCredit
      };
      new Vue({
        render: function render(h) {
          return h(VcPrintView, {
            props: {
              options: options
            },
            on: {
              ready: _this2.printViewReady
            }
          });
        }
      }).$mount(newWindow.document.getElementById('print'));

      if (!printAutomatically) {
        this.creatingPrintView = false;
      }
    },
    printViewReady: function printViewReady(windowToPrint) {
      var _this3 = this;

      var printAutomatically = this.printAutomatically,
          iframe = this.iframe;

      if (printAutomatically) {
        printWindow(windowToPrint).otherwise(function (e) {
          console.error(e);
        }).always(function () {
          if (iframe) {
            document.body.removeChild(iframe);
          }

          if (printAutomatically) {
            _this3.creatingPrintView = false;
          }
        });
      }
    },
    printViewClosed: function printViewClosed(windowToPrint) {
      if (this.printAutomatically) {
        this.creatingPrintView = false;
      }
    }
  }
};

function createWindow(options) {
  var _options$printWindow = options.printWindow,
      printWindow = _options$printWindow === void 0 ? window.open() : _options$printWindow,
      closeCallback = options.closeCallback;

  if (closeCallback) {
    printWindow.addEventListener('unload', function () {
      closeCallback(printWindow);
    });
  } // Open and immediately close the document. This works around a problem in Firefox that is
  // captured here: https://bugzilla.mozilla.org/show_bug.cgi?id=667227.
  // Essentially, when we first create an iframe, it has no document loaded and asynchronously
  // starts a load of "about:blank". If we access the document object and start manipulating it
  // before that async load completes, a new document will be automatically created. But then
  // when the async load completes, the original, automatically-created document gets unloaded
  // and the new "about:blank" gets swapped in. End result: everything we add to the DOM before
  // the async load complete gets lost and Firefox ends up printing a blank page.
  // Explicitly opening and then closing a new document _seems_ to avoid this.


  printWindow.document.open();
  printWindow.document.close();
  printWindow.document.head.innerHTML = "\n    <meta charset=\"UTF-8\">\n    <title>VueCesium Print View</title>\n    <style>\n      .background {\n        width: 100%;\n        fill: rgba(255, 255, 255, 1.0);\n      }\n      .map-image {\n        max-width: 95vw;\n        max-height: 95vh;\n      }\n      h1, h2, h3 {\n        clear: both;\n      }\n      </style>\n    ";
  printWindow.document.body.innerHTML = '<div id="print"></div>';
  return printWindow;
}

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-tool-btn"
  }, [_c('button', {
    staticClass: "vc-btn",
    attrs: {
      "title": _vm.$vc.lang.navigation.printView,
      "type": "button"
    },
    on: {
      "click": _vm.handleCick
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "share"
    }
  })], 1)]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* component normalizer */

function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcPrintViewBtn.vue";

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


var VcPrintViewBtn = __vue_normalize__$6({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6);

VcIconSvg.register({
  geolocation: {
    width: 50,
    height: 50,
    viewBox: '0 0 50 50',
    data: "\n    <!-- Generator: Sketch 3.4.3 (16044) - http://www.bohemiancoding.com/sketch -->\n    <!-- <title>geolocation</title> -->\n    <path d=\"M25.2083333,40.9848485 L25.2083333,40.9848485 C33.9214621,40.9848485 40.9848485,33.9214621 40.9848485,25.2083333 C40.9848485,16.4952046 33.9214621,9.43181817 25.2083333,9.43181817 C16.4952046,9.43181817 9.43181817,16.4952046 9.43181817,25.2083333 C9.43181817,33.9214621 16.4952046,40.9848485 25.2083333,40.9848485 L25.2083333,40.9848485 L25.2083333,40.9848485 Z M6.485903,23.7069504 C7.21162342,14.5314545 14.5314545,7.21162342 23.7069504,6.485903 C23.7061912,6.46628533 23.7058081,6.44657125 23.7058081,6.42676767 L23.7058081,1.91919192 C23.7058081,1.08937017 24.3785116,0.416666667 25.2083333,0.416666667 C26.0381551,0.416666667 26.7108586,1.08937017 26.7108586,1.91919192 L26.7108586,6.42676767 C26.7108586,6.44657125 26.7104755,6.46628533 26.7097162,6.485903 C35.8852122,7.21162342 43.2050433,14.5314545 43.9307637,23.7069504 C43.9503813,23.7061912 43.9700954,23.7058081 43.989899,23.7058081 L48.4974747,23.7058081 C49.3272965,23.7058081 50,24.3785116 50,25.2083333 C50,26.0381551 49.3272965,26.7108586 48.4974747,26.7108586 L43.989899,26.7108586 C43.9700954,26.7108586 43.9503813,26.7104755 43.9307637,26.7097162 C43.2050433,35.8852122 35.8852122,43.2050433 26.7097162,43.9307637 C26.7104755,43.9503813 26.7108586,43.9700954 26.7108586,43.989899 L26.7108586,48.4974747 C26.7108586,49.3272965 26.0381551,50 25.2083333,50 C24.3785116,50 23.7058081,49.3272965 23.7058081,48.4974747 L23.7058081,43.989899 C23.7058081,43.9700954 23.7061912,43.9503813 23.7069504,43.9307637 C14.5314545,43.2050433 7.21162342,35.8852122 6.485903,26.7097162 C6.46628533,26.7104755 6.44657125,26.7108586 6.42676767,26.7108586 L1.91919192,26.7108586 C1.08937017,26.7108586 0.416666667,26.0381551 0.416666667,25.2083333 C0.416666667,24.3785116 1.08937017,23.7058081 1.91919192,23.7058081 L6.42676767,23.7058081 C6.44657125,23.7058081 6.46628533,23.7061912 6.485903,23.7069504 L6.485903,23.7069504 Z M25.2083333,29.7159091 C27.6977987,29.7159091 29.7159091,27.6977987 29.7159091,25.2083333 C29.7159091,22.718868 27.6977987,20.7007576 25.2083333,20.7007576 C22.718868,20.7007576 20.7007576,22.718868 20.7007576,25.2083333 C20.7007576,27.6977987 22.718868,29.7159091 25.2083333,29.7159091 L25.2083333,29.7159091 Z\" id=\"Shape\"></path>"
  }
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && o[_Symbol$iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var script$7 = {
  components: {
    VcIconSvg: VcIconSvg
  },
  props: {
    enableMyLocation: [Object, Boolean]
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer;
      _this.viewer = viewer;

      _this.viewer.dataSources.add(new Cesium.CustomDataSource('vc-myLocation')).then(function (ds) {
        _this.datasource = ds;
      });

      var enableMyLocation = _this.enableMyLocation;

      if (enableMyLocation.amap && enableMyLocation.amap.key) {
        AMapLoader.load({
          key: enableMyLocation.amap.key,
          version: '2.0',
          plugins: ['AMap.Geolocation']
        }).then(function (AMap) {
          _this.AMap = AMap;
          _this.amapGeolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            convert: false,
            // 设置定位超时时间，默认：无穷大
            timeout: 20000
          });
        }).catch(function (e) {
          console.error('[VueCesium] ERROR: ' + e);
        });
      }
    });
  },
  destroyed: function destroyed() {
    this.viewer.dataSources.remove(this.datasource, true);

    if (this.amapGeolocation) {
      var scripts = document.getElementsByTagName('script');
      var removeScripts = [];

      var _iterator = _createForOfIteratorHelper(scripts),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var script = _step.value;

          if (script.src.indexOf('/webapi.amap.com/maps') > -1) {
            removeScripts.push(script);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      removeScripts.forEach(function (script) {
        document.getElementsByTagName('body')[0].removeChild(script);
      });
    }
  },
  methods: {
    handleCick: function handleCick() {
      var _this2 = this;

      var enableMyLocation = this.enableMyLocation,
          getLocation = this.getLocation;

      if (enableMyLocation.amap && enableMyLocation.amap.key) {
        this.amapGeolocation.getCurrentPosition(function (status, result) {
          if (status === 'complete') {
            _this2.$emit('geolocation', result);

            _this2.zoomToMyLocation({
              lng: result.position.lng,
              lat: result.position.lat
            });
          } else {
            console.error('[VueCesium] ERROR: ' + result.message);
          }
        });
      } else {
        getLocation();
      }
    },
    getLocation: function getLocation() {
      var _this3 = this;

      if (navigator.geolocation) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(function (position) {
          _this3.$emit('geolocation', position);

          _this3.zoomToMyLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude
          });
        }, this.handleLocationError, options);
      } else {
        console.error('[VueCesium] ERROR: ' + 'Your browser cannot provide your location.');
      }
    },
    // This next function modelled on Cesium.geoJsonDataSource's defaultDescribe.
    describeWithoutUnderscores: function describeWithoutUnderscores(properties, nameProperty) {
      var html = '';

      if (properties instanceof Cesium.PropertyBag) {
        // unwrap the properties from the PropertyBag
        properties = properties.getValue(Cesium.JulianDate.now());
      }

      for (var key in properties) {
        if (Object.prototype.hasOwnProperty.call(properties, key)) {
          if (key === nameProperty) {
            continue;
          }

          var value = properties[key];

          if (_typeof(value) === 'object') {
            value = this.describeWithoutUnderscores(value);
          }

          key = key.replace(/_/g, ' ');

          if (Cesium.defined(value)) {
            html += '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
          }
        }
      }

      if (html.length > 0) {
        html = '<table class="cesium-infoBox-defaultTable"><tbody>' + html + '</tbody></table>';
      }

      return html;
    },
    zoomToMyLocation: function zoomToMyLocation(position) {
      var longitude = position.lng;
      var latitude = position.lat;
      var _Cesium = Cesium,
          Cartesian3 = _Cesium.Cartesian3,
          Rectangle = _Cesium.Rectangle,
          sampleTerrain = _Cesium.sampleTerrain,
          defined = _Cesium.defined,
          SceneMode = _Cesium.SceneMode;
      var datasource = this.datasource,
          describeWithoutUnderscores = this.describeWithoutUnderscores;
      datasource.entities.removeAll();
      var myPositionEntity = datasource.entities.add({
        id: 'My Location',
        position: Cartesian3.fromDegrees(longitude, latitude),
        point: {
          color: Cesium.Color.fromCssColorString('#08ABD5'),
          pixelSize: 25 / 2,
          outlineWidth: 3,
          outlineColor: Cesium.Color.fromCssColorString('#ffffff')
        },
        description: describeWithoutUnderscores({
          longitude: longitude,
          latitude: latitude
        })
      });
      var options = {
        duration: this.duration
      };
      defined(this.enableMyLocation.maximumHeight) && (options.maximumHeight = this.enableMyLocation.maximumHeight);
      defined(this.enableMyLocation.hpr) && Array.isArray(this.enableMyLocation.hpr) && (options.offset = new Cesium.HeadingPitchRange(this.enableMyLocation.hpr[0], this.enableMyLocation.hpr[1], this.enableMyLocation.hpr[2]));

      if (this.viewer.scene.mode === SceneMode.SCENE2D || this.viewer.scene.mode === SceneMode.COLUMBUS_VIEW) {
        return this.viewer.flyTo(myPositionEntity, options);
      } // west, south, east, north, result


      var rectangle = Rectangle.fromDegrees(longitude - 0.01, latitude - 0.01, longitude + 0.01, latitude + 0.01);
      var camera = this.viewer.scene.camera; // Work out the destination that the camera would naturally fly to

      var destinationCartesian = camera.getRectangleCameraCoordinates(rectangle);
      var destination = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(destinationCartesian);
      var terrainProvider = this.viewer.scene.globe.terrainProvider;
      var level = 6; // A sufficiently coarse tile level that still has approximately accurate height

      var positions = [Rectangle.center(rectangle)]; // Perform an elevation query at the centre of the rectangle

      return sampleTerrain(terrainProvider, level, positions).then(function (results) {
        // Add terrain elevation to camera altitude
        var finalDestinationCartographic = {
          longitude: destination.longitude,
          latitude: destination.latitude,
          height: destination.height + results[0].height
        };
        var finalDestination = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(finalDestinationCartographic);
        camera.flyTo({
          duration: 3,
          destination: finalDestination
        });
      });
    },
    handleLocationError: function handleLocationError(err) {
      console.error('[VueCesium] ERROR: ' + err.message);
    }
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-tool-btn"
  }, [_c('button', {
    staticClass: "vc-btn",
    attrs: {
      "title": _vm.$vc.lang.navigation.centreMap,
      "type": "button"
    },
    on: {
      "click": _vm.handleCick
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "geolocation"
    }
  })], 1)]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* component normalizer */

function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcMyLocation.vue";

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


var VcMyLocation = __vue_normalize__$7({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7);

var script$8 = {
  name: 'vc-navigation',
  components: {
    VcCompass: VcCompass,
    VcZoomControl: VcZoomControl,
    VcDistanceLegend: VcDistanceLegend,
    VcLocationBar: VcLocationBar,
    VcPrintViewBtn: VcPrintViewBtn,
    VcMyLocation: VcMyLocation
  },
  mixins: [cmp],
  props: {
    options: Object
  },
  data: function data() {
    return {
      defaultOptions: {
        enableCompass: true,
        enableCompassOuterRing: true,
        enableZoomControl: {
          zoomAmount: 2,
          defaultResetView: {
            lng: 105,
            lat: 29.999999999999993,
            height: 19059568.497290563
          },
          overrideCamera: false
        },
        enableDistanceLegend: true,
        enableLocationBar: {
          gridFileUrl: 'https://zouyaoji.top/vue-cesium/statics/SampleData/WW15MGH.DAC',
          proj4Projection: '+proj=utm +ellps=GRS80 +units=m +no_defs',
          proj4longlat: '+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees +no_defs',
          projectionUnits: 'm'
        },
        enablePrintView: {
          showCredit: true,
          printAutomatically: false
        },
        enableMyLocation: {
          amap: {
            key: undefined
          },
          maximumHeight: undefined,
          hpr: [0, 0, 3000]
        }
      },
      ldBottom: 2,
      ldRight: 3,
      mouseCoords: undefined,
      canRender: false
    };
  },
  computed: {
    ldStyle: function ldStyle() {
      return {
        bottom: this.ldBottom + 'px',
        right: this.ldRight + 'px'
      };
    }
  },
  watch: {
    options: {
      handler: function handler() {
        var _this = this;

        this.reload().then(function () {
          _this.viewer.widgetResized.raiseEvent();
        });
      },
      deep: true
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.viewer.afterViewerChanged = new Cesium.Event();
                _this2.viewer.beforeViewerChanged = new Cesium.Event();

                _this2.viewer.widgetResized.addEventListener(_this2.widgetResized);

                _Object$assign(_this2.defaultOptions, _this2.options);

                _this2.widgetResized();

                _this2.mouseCoords = new MouseCoords({
                  gridFileUrl: _this2.defaultOptions.enableLocationBar.gridFileUrl,
                  proj4Projection: _this2.defaultOptions.enableLocationBar.proj4Projection,
                  proj4longlat: _this2.defaultOptions.enableLocationBar.proj4longlat,
                  projectionUnits: _this2.defaultOptions.enableLocationBar.projectionUnits
                }); // 避免控件先按默认的参数创建 然后又隐藏 导致视觉上的体验不优雅

                _this2.canRender = true;

                _this2.$nextTick(function () {
                  var viewerContainer = _this2.viewer._element;
                  viewerContainer.appendChild(_this2.$el);
                  _this2.viewer.VcNavigationContaner = _this2.$refs.navigationContainer;
                });

                return _context.abrupt("return", _this2.$el);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    widgetResized: function widgetResized() {
      this.ldBottom = this.viewer.timeline ? this.viewer.timeline.container.getBoundingClientRect().height + 2 : 2;

      if (this.ldBottom === 2) {
        var ldRight = 3;
        this.viewer.fullscreenButton && (ldRight += this.viewer.fullscreenButton.container.getBoundingClientRect().width);
        this.viewer.vrButton && (ldRight += this.viewer.vrButton.container.getBoundingClientRect().width);
        this.ldRight = ldRight;
      }
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

                return _context3.abrupt("return", true);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    legendChanged: function legendChanged(e) {
      var listener = this.$listeners.legendChanged;
      listener && this.$emit('legendChanged', e);
    },
    geolocation: function geolocation(e) {
      var listener = this.$listeners.geolocation;
      listener && this.$emit('geolocation', e);
    }
  },
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this4 = this;

    Object.defineProperties(this, {
      cesiumNavigation: {
        enumerable: true,
        get: function get() {
          return _this4.cesiumObject;
        }
      }
    });
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.canRender ? _c('div', {
    ref: "navigationContainer",
    staticClass: "vc-navigationContainer"
  }, [_c('div', {
    staticClass: "vc-navigation"
  }, [_c('div', {
    staticClass: "vc-navigation-navs"
  }, [_vm.defaultOptions.enableCompass ? _c('div', {
    staticClass: "vc-navigation-control"
  }, [_c('vc-compass', {
    ref: "VcCompass",
    attrs: {
      "enableCompassOuterRing": _vm.defaultOptions.enableCompassOuterRing
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.defaultOptions.enableZoomControl ? _c('div', {
    staticClass: "vc-navigation-control"
  }, [_c('vc-zoom-control', {
    ref: "VcZoomControl",
    attrs: {
      "defaultResetView": _vm.defaultOptions.enableZoomControl.defaultResetView,
      "overrideCamera": _vm.defaultOptions.enableZoomControl.overrideCamera || false,
      "zoomAmount": _vm.defaultOptions.enableZoomControl.zoomAmount || 2
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "vc-navigation-controls"
  }, [_vm.defaultOptions.enablePrintView ? _c('div', {
    staticClass: "vc-navigation-control"
  }, [_c('vc-print-view-btn', {
    ref: "VcPrintViewBtn",
    attrs: {
      "printAutomatically": _vm.defaultOptions.enablePrintView.printAutomatically,
      "showCredit": _vm.defaultOptions.enablePrintView.showCredit
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.defaultOptions.enableMyLocation ? _c('div', {
    staticClass: "vc-navigation-control"
  }, [_c('vc-my-location', {
    attrs: {
      "enableMyLocation": _vm.defaultOptions.enableMyLocation
    },
    on: {
      "geolocation": _vm.geolocation
    }
  })], 1) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "vc-location-distance",
    style: _vm.ldStyle
  }, [_vm.mouseCoords !== undefined && _vm.defaultOptions.enableLocationBar ? _c('vc-location-bar', {
    ref: "VcLocationBar",
    attrs: {
      "mouseCoords": _vm.mouseCoords
    }
  }) : _vm._e(), _vm._v(" "), _vm.defaultOptions.enableDistanceLegend ? _c('vc-distance-legend', {
    ref: "VcDistanceLengend",
    on: {
      "legendChanged": _vm.legendChanged
    }
  }) : _vm._e()], 1)]) : _vm._e();
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* component normalizer */

function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcNavigation.vue";

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


var VcNavigation = __vue_normalize__$8({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(VcNavigation.name, VcNavigation);
}

export default plugin;
export { VcNavigation, plugin as install };
