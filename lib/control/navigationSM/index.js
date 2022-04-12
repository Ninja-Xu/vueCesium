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
import CameraFlightPath from '../../exts/CameraFlightPath';
import { Platform } from '../../utils/util';

//
var script = {
  name: 'vc-compass-sm',
  props: {
    enableCompassOuterRing: Boolean
  },
  data: function data() {
    return {
      tiltbarLeft: 56,
      tiltbarTop: 3,
      heading: 0
    };
  },
  computed: {
    tiltbarStyle: function tiltbarStyle() {
      return {
        left: this.tiltbarLeft + 'px',
        top: this.tiltbarTop + 'px'
      };
    },
    outerRingStyle: function outerRingStyle() {
      return {
        transform: 'rotate(-' + this.heading + 'rad)',
        '-webkit-transform': 'rotate(-' + this.heading + 'rad)'
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer;
      _this.viewer = viewer;
      _this.heading = viewer.scene.camera.heading;
      _this.screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(_this.$parent.$refs.navigationContainer);
      _this.isRotating = false;
      _this.rotateInitialCursorAngle = undefined;
      _this.rotateFrame = undefined;
      _this.rotateMouseMoveFunction = undefined;
      _this.rotateMouseUpFunction = undefined;
      _this._unsubcribeFromPostRender = undefined;
      _this.isTilting = false;
      _this.tiltInitialCursorAngle = 0;
      getTiltbarPosition.call(_this);
      viewerChange(_this);

      if (!Platform().isPc) {
        document.querySelector('.vc-compass-tiltbar-sm').style.visibility = 'visible';
        document.querySelector('.vc-compass-arrows-sm').style.visibility = 'visible';
        document.querySelector('.vc-compass-tilt-sm').style.visibility = 'visible';
      }
    });
  },
  methods: {
    handleMouseDown: function handleMouseDown(event) {
      var _Cesium = Cesium,
          Cartesian2 = _Cesium.Cartesian2,
          CesiumMath = _Cesium.Math,
          SceneMode = _Cesium.SceneMode;
      var scene = this.viewer.scene;

      if (scene.mode === SceneMode.MORPHING) {
        return true;
      }

      var compassElement = event.currentTarget;
      var compassRectangle = event.currentTarget.getBoundingClientRect();
      var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
      var clickLocation = event.type === 'mousedown' ? new Cartesian2(event.clientX - compassRectangle.left, event.clientY - compassRectangle.top) : new Cartesian2(event.changedTouches[0].clientX - compassRectangle.left, event.changedTouches[0].clientY - compassRectangle.top);
      var vector = Cartesian2.subtract(clickLocation, center, vectorScratch);
      this.clickStartPosition = new Cartesian2(event.clientX, event.clientY);
      var distanceFromCenter = Cartesian2.magnitude(vector);

      if (distanceFromCenter > 30 && distanceFromCenter < 45) {
        rotate(this, compassElement, vector);
      } else if (!(distanceFromCenter > 50 && distanceFromCenter < 70)) {
        rotateEast(this, compassElement, vector);
      } else {
        var angle = CesiumMath.PI_OVER_TWO - Math.atan2(-vector.y, vector.x);
        angle >= 0 && angle <= CesiumMath.PI_OVER_TWO && tilt(this, compassElement, vector);
      }
    },
    handleDoubleClick: function handleDoubleClick(e) {
      var _Cesium2 = Cesium,
          Cartesian2 = _Cesium2.Cartesian2,
          Cartesian3 = _Cesium2.Cartesian3,
          defined = _Cesium2.defined,
          Matrix4 = _Cesium2.Matrix4,
          Ray = _Cesium2.Ray,
          SceneMode = _Cesium2.SceneMode,
          Transforms = _Cesium2.Transforms;
      var scene = this.viewer.scene;
      var camera = scene.camera;

      if (scene.mode === SceneMode.MORPHING) {
        return true;
      }

      var compassRectangle = e.currentTarget.getBoundingClientRect();
      var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
      var clickLocation = e.type === 'dblclick' ? new Cartesian2(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top) : new Cartesian2(e.changedTouches[0].clientX - compassRectangle.left, e.changedTouches[0].clientY - compassRectangle.top);
      var vector = Cartesian2.subtract(clickLocation, center, vectorScratch);
      this.clickStartPosition = new Cartesian2(e.clientX, e.clientY);
      var distanceFromCenter = Cartesian2.magnitude(vector);

      if (distanceFromCenter > 30 && distanceFromCenter < 45) {
        var windowPosition = new Cartesian2();
        windowPosition.x = scene.canvas.clientWidth / 2;
        windowPosition.y = scene.canvas.clientHeight / 2;
        var pickRayScratch = new Ray();
        var ray = camera.getPickRay(windowPosition, pickRayScratch);

        var _center = scene.globe.pick(ray, scene, centerScratch);

        if (!defined(_center)) {
          // Globe is barely visible, so reset to home view.
          return;
        }

        var rotateFrame = Transforms.eastNorthUpToFixedFrame(_center, this.viewer.scene.globe.ellipsoid);
        var lookVector = Cartesian3.subtract(_center, camera.position, new Cartesian3());
        var flight = CameraFlightPath.createTween(scene, {
          destination: Matrix4.multiplyByPoint(rotateFrame, new Cartesian3(0.0, 0.0, Cartesian3.magnitude(lookVector)), new Cartesian3()),
          direction: Matrix4.multiplyByPointAsVector(rotateFrame, new Cartesian3(0.0, 0.0, -1.0), new Cartesian3()),
          up: Matrix4.multiplyByPointAsVector(rotateFrame, new Cartesian3(0.0, 1.0, 0.0), new Cartesian3()),
          duration: 1.5
        });
        scene.tweens.add(flight);
      }
    },
    handleMouseUp: function handleMouseUp(event) {
      var _Cesium3 = Cesium,
          Cartesian2 = _Cesium3.Cartesian2,
          CesiumMath = _Cesium3.Math;
      var compassRectangle = event.currentTarget.getBoundingClientRect();
      var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
      var clickLocation = event.type === 'mouseup' ? new Cartesian2(event.clientX - compassRectangle.left, event.clientY - compassRectangle.top) : new Cartesian2(event.changedTouches[0].clientX - compassRectangle.left, event.changedTouches[0].clientY - compassRectangle.top);
      var vector = Cartesian2.subtract(clickLocation, center, vectorScratch);
      var magnitude = Cartesian2.magnitude(vector);

      if (magnitude > 30 && magnitude < 45) {
        var angle = CesiumMath.toDegrees(Math.atan2(-vector.y, vector.x));
        var clickStartPosition = new Cartesian2(event.clientX, event.clientY);
        var dX = clickStartPosition.x - this.clickStartPosition.x;
        var dY = clickStartPosition.y - this.clickStartPosition.y;
        var distance = Math.sqrt(dX * dX + dY * dY);

        if (distance > 5) {
          return;
        }

        var heading = CesiumMath.toDegrees(this.heading);
        var m = Math.abs(angle - heading);
        var scene = this.viewer.scene;

        if (angle > 0 && heading > 0 && heading < 90 && m > 80 && m < 100 || m > 260 && m < 280) {
          scene.camera.flyTo({
            destination: scene.camera.position,
            orientation: {
              heading: 0,
              pitch: scene.camera.pitch
            }
          });
        }
      }
    }
  },
  destroyed: function destroyed() {
    this.screenSpaceEventHandler && this.screenSpaceEventHandler.destroy();
  }
};
var vectorScratch = {};
var oldTransformScratch = {};
var newTransformScratch = {};
var centerScratch = {};
var positions = [{
  x: 56,
  y: 3
}, {
  x: 59,
  y: 4
}, {
  x: 64,
  y: 5
}, {
  x: 69,
  y: 6
}, {
  x: 74,
  y: 7
}, {
  x: 79,
  y: 9
}, {
  x: 84,
  y: 12
}, {
  x: 89,
  y: 15
}, {
  x: 92,
  y: 19
}, {
  x: 94,
  y: 20
}, {
  x: 99,
  y: 25
}, {
  x: 104,
  y: 34
}, {
  x: 106,
  y: 40
}, {
  x: 107,
  y: 44
}, {
  x: 107,
  y: 46
}, {
  x: 107,
  y: 48
}, {
  x: 107,
  y: 50
}, {
  x: 107,
  y: 52
}, {
  x: 107,
  y: 54
}, {
  x: 107,
  y: 56
}];

function rotate(viewModel, compassElement, cursorVector) {
  if (!viewModel.enableCompassOuterRing) {
    return;
  }

  var _Cesium4 = Cesium,
      Cartesian2 = _Cesium4.Cartesian2,
      Cartesian3 = _Cesium4.Cartesian3,
      defined = _Cesium4.defined,
      CesiumMath = _Cesium4.Math,
      Matrix4 = _Cesium4.Matrix4,
      Ray = _Cesium4.Ray,
      Transforms = _Cesium4.Transforms; // Remove existing event handlers, if any.

  document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
  document.removeEventListener('touchmove', viewModel.rotateMouseMoveFunction, false);
  document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
  document.removeEventListener('touchend', viewModel.rotateMouseUpFunction, false);
  viewModel.rotateMouseMoveFunction = undefined;
  viewModel.rotateMouseUpFunction = undefined;
  viewModel.isRotating = true;
  viewModel.rotateInitialCursorAngle = Math.atan2(-cursorVector.y, cursorVector.x);
  var scene = viewModel.viewer.scene;
  var camera = scene.camera;
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

  viewModel.rotateMouseMoveFunction = function (event) {
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

  viewModel.rotateMouseUpFunction = function () {
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

function rotateEast(viewModel, compassElement, cursorVector) {
  var _Cesium5 = Cesium,
      defined = _Cesium5.defined,
      getTimestamp = _Cesium5.getTimestamp,
      CesiumMath = _Cesium5.Math,
      ScreenSpaceEventType = _Cesium5.ScreenSpaceEventType;
  viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
  defined(viewModel.rotateEastTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.rotateEastTickFunction);
  viewModel.rotateEastMouseUpFunction = undefined;
  viewModel.rotateEastTickFunction = undefined;
  viewModel.isrotateEasting = true;
  viewModel.rotateEastLastTimestamp = getTimestamp();
  var angle = CesiumMath.PI_OVER_TWO - Math.atan2(-cursorVector.y, cursorVector.x);
  var a = Math.PI / 4;
  var roateDirection = 0;
  var roateType = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
  };
  roateDirection = angle >= -a && a >= angle ? roateType.DOWN : angle >= a && 3 * a >= angle ? roateType.RIGHT : angle >= 3 * a && 5 * a >= angle ? roateType.UP : roateType.LEFT;

  viewModel.rotateEastTickFunction = function () {
    var scene = viewModel.viewer.scene;
    var camera = scene.camera;
    var timestamp = getTimestamp();
    angle = 20 * Math.abs(camera.positionCartographic.height / 6378317) * 0.0005;

    switch (roateDirection) {
      case roateType.LEFT:
        camera.rotateLeft(angle);
        break;

      case roateType.RIGHT:
        camera.rotateRight(angle);
        break;

      case roateType.UP:
        camera.rotate(camera.right, -angle);
        break;

      case roateType.DOWN:
        camera.rotate(camera.right, angle);
    }

    viewModel.rotateEastLastTimestamp = timestamp;
  };

  viewModel.rotateEastMouseUpFunction = function () {
    viewModel.isRotateEasting = false;
    viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
    defined(viewModel.rotateEastTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.rotateEastTickFunction);
    viewModel.rotateEastMouseUpFunction = undefined;
    viewModel.rotateEastTickFunction = undefined;
  };

  viewModel.screenSpaceEventHandler.setInputAction(viewModel.rotateEastMouseUpFunction, ScreenSpaceEventType.LEFT_UP);
  viewModel.viewer.clock.onTick.addEventListener(viewModel.rotateEastTickFunction);
}

function tilt(viewModel, compassElement, cursorVector) {
  var _Cesium6 = Cesium,
      Cartesian2 = _Cesium6.Cartesian2,
      defined = _Cesium6.defined,
      CesiumMath = _Cesium6.Math,
      Matrix4 = _Cesium6.Matrix4,
      ScreenSpaceEventType = _Cesium6.ScreenSpaceEventType,
      Transforms = _Cesium6.Transforms; // Remove existing event handlers, if any.

  viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
  viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
  viewModel.tiltMouseMoveFunction = undefined;
  viewModel.tiltMouseUpFunction = undefined;
  var tiltInitialCursorAngle = CesiumMath.PI_OVER_TWO - Math.atan2(-cursorVector.y, cursorVector.x);
  tiltInitialCursorAngle = tiltInitialCursorAngle < 0 ? 0 : tiltInitialCursorAngle;
  tiltInitialCursorAngle = tiltInitialCursorAngle > CesiumMath.PI_OVER_TWO ? CesiumMath.PI_OVER_TWO : tiltInitialCursorAngle;
  viewModel.tiltInitialCursorAngle = tiltInitialCursorAngle;
  viewModel.isTilting = true;
  var scene = viewModel.viewer.scene;
  var camera = scene.camera;
  var windowPosition = new Cartesian2();
  windowPosition.x = scene.canvas.clientWidth / 2;
  windowPosition.y = scene.canvas.clientHeight / 2;
  var pickPosition = camera.pickEllipsoid(windowPosition, scene.globe.ellipsoid);

  if (!defined(pickPosition)) {
    for (; windowPosition.y < scene.canvas.clientHeight;) {
      windowPosition.y += 5;
      pickPosition = camera.pickEllipsoid(windowPosition, scene.globe.ellipsoid);
    }
  }

  defined(pickPosition) && (viewModel.tiltFrame = Transforms.eastNorthUpToFixedFrame(pickPosition, scene.globe.ellipsoid));

  viewModel.tiltMouseMoveFunction = function (e, n) {
    viewModel.isTilting = true;
    var compassRectangle = compassElement.getBoundingClientRect();
    var center = new Cesium.Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
    var endPosition = Cartesian2.clone(e.endPosition);
    var vector = Cartesian2.subtract(endPosition, center, vectorScratch);
    var angle = CesiumMath.PI_OVER_TWO - Math.atan2(-vector.y, vector.x);
    angle = angle < 0 ? 0 : angle;
    angle = angle > CesiumMath.PI_OVER_TWO ? CesiumMath.PI_OVER_TWO : angle;
    var camera = viewModel.viewer.scene.camera;
    var oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
    camera.lookAtTransform(viewModel.tiltFrame);
    var rotateUpAngle = angle - viewModel.tiltInitialCursorAngle;
    camera.rotateUp(rotateUpAngle);
    viewModel.tiltInitialCursorAngle = angle;
    camera.lookAtTransform(oldTransform);
    var level = Math.ceil(angle / (Math.PI / 40));
    level = level > 19 ? 19 : level;
    var position = positions[level];
    viewModel.tiltbarLeft = position.x;
    viewModel.tiltbarTop = position.y;
  };

  viewModel.tiltMouseUpFunction = function (e) {
    viewModel.isTilting = false;
    viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
    viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
    viewModel.tiltMouseMoveFunction = undefined;
    viewModel.tiltMouseUpFunction = undefined;
  };

  viewModel.screenSpaceEventHandler.setInputAction(viewModel.tiltMouseMoveFunction, ScreenSpaceEventType.MOUSE_MOVE);
  viewModel.screenSpaceEventHandler.setInputAction(viewModel.tiltMouseUpFunction, ScreenSpaceEventType.LEFT_UP);
}

function getTiltbarPosition() {
  var _Cesium7 = Cesium,
      CesiumMath = _Cesium7.Math;
  var pitch = CesiumMath.PI_OVER_TWO + this.viewer.scene.camera.pitch;
  var length = Math.PI / 2 / 20;
  var level = Math.floor(pitch / length);
  level = level > 19 ? 19 : level;
  level = level < 0 ? 0 : level;
  this.tiltbarLeft = positions[level].x;
  this.tiltbarTop = positions[level].y;
}

function viewerChange(viewModel) {
  var _Cesium8 = Cesium,
      defined = _Cesium8.defined,
      CesiumMath = _Cesium8.Math;

  if (defined(viewModel.viewer)) {
    if (viewModel._unsubcribeFromPostRender) {
      viewModel._unsubcribeFromPostRender();

      viewModel._unsubcribeFromPostRender = undefined;
    }

    viewModel._unsubcribeFromPostRender = viewModel.viewer.scene.postRender.addEventListener(function () {
      viewModel.heading = viewModel.viewer.scene.camera.heading;

      if (!viewModel.isTilting) {
        var angle = viewModel.viewer.scene.camera.pitch + CesiumMath.PI_OVER_TWO;
        var length = CesiumMath.PI_OVER_TWO / 20;
        var level = Math.floor(angle / length);
        level = level > 19 ? 19 : level;
        level = level < 0 ? 0 : level;
        viewModel.tiltbarLeft = positions[level].x;
        viewModel.tiltbarTop = positions[level].y;
      }
    });
  } else {
    if (viewModel._unsubcribeFromPostRender) {
      viewModel._unsubcribeFromPostRender();

      viewModel._unsubcribeFromPostRender = undefined;
    }
  }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-compass-sm",
    attrs: {
      "title": _vm.$vc.lang.navigation.compass.description
    },
    on: {
      "dblclick": _vm.handleDoubleClick,
      "mousedown": _vm.handleMouseDown,
      "mouseup": _vm.handleMouseUp,
      "touchend": _vm.handleMouseUp,
      "touchstart": _vm.handleMouseDown
    }
  }, [_c('div', {
    staticClass: "vc-compass-tilt-sm"
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-compass-tiltbar-sm",
    style: _vm.tiltbarStyle
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-compass-arrows-sm"
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-compass-outer-ring-sm",
    style: _vm.outerRingStyle
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-arrows-e-sm"
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-arrows-n-sm"
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-arrows-s-sm"
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-arrows-w-sm"
  })]);
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

  component.__file = "VcCompassSM.vue";

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


var VcCompassSM = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

//
var script$1 = {
  data: function data() {
    return {
      zoombarTop: 65
    };
  },
  computed: {
    zoombarStyle: function zoombarStyle() {
      return {
        top: this.zoombarTop + 'px'
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.createPromise.then(function (_ref) {
      var Cesium = _ref.Cesium,
          viewer = _ref.viewer;
      _this.viewer = viewer;
      _this.container = _this.$parent.$refs.navigationContainer;
      _this.screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(_this.container);
      Platform().isPc || (document.querySelector('.sm-zoom').style.visibility = 'visible');
    });
  },
  methods: {
    handleZoomBarScrollMouseDown: function handleZoomBarScrollMouseDown(event) {
      var viewModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var _Cesium = Cesium,
          Cartesian2 = _Cesium.Cartesian2,
          defined = _Cesium.defined,
          SceneMode = _Cesium.SceneMode;
      document.removeEventListener('mousemove', viewModel.zoomBarScrollMouseMoveFunction, false);
      document.removeEventListener('touchmove', viewModel.zoomBarScrollMouseMoveFunction, false);
      document.removeEventListener('mouseup', viewModel.zoomBarScrollMouseUpFunction, false);
      document.removeEventListener('touchend', viewModel.zoomBarScrollMouseUpFunction, false);
      defined(viewModel.zoombarTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.zoombarTickFunction);
      viewModel.zoomBarScrollMouseUpFunction = undefined;
      viewModel.zoombarTickFunction = undefined;
      viewModel.isZoomBarScrolling = true;
      var scene = viewModel.viewer.scene;
      var camera = scene.camera;

      viewModel.zoombarTickFunction = function () {
        var zoomOffset = viewModel.zoombarTop - 65;

        if (zoomOffset > 0) {
          if (viewModel.viewer.scene.mode === SceneMode.COLUMBUS_VIEW) {
            camera.zoomOut();
          } else {
            handlezoom(viewModel, -1);
          }
        } else if (zoomOffset < 0) {
          if (viewModel.viewer.scene.mode === SceneMode.COLUMBUS_VIEW) {
            camera.zoomIn();
          } else {
            handlezoom(viewModel, 1);
          }
        }
      };

      viewModel.zoomBarScrollMouseMoveFunction = function (e) {
        var zoombarTop = viewModel.zoombarTop;
        var clientRect = e.target.parentElement.getBoundingClientRect();
        var rectNavigation = viewModel.container.getBoundingClientRect();
        var endPosition = {};
        endPosition.x = e.type === 'touchmove' ? e.changedTouches[0].clientX - rectNavigation.left : e.clientX - rectNavigation.left;
        endPosition.y = e.type === 'touchmove' ? e.changedTouches[0].clientY - rectNavigation.top : e.clientY - rectNavigation.top; // 加上一个距离顶部的偏移量 rectViewer.top

        var rectViewer = viewModel.viewer._element.getBoundingClientRect();

        var padding = new Cartesian2(endPosition.x - clientRect.left, endPosition.y - clientRect.top + rectViewer.top);
        var offset = padding.y - 16;
        offset = offset < 0 ? 0 : offset;
        offset = offset > 120 ? 120 : offset;
        viewModel.zoombarTop = offset;
        var zoomFlag = viewModel.zoombarTop - zoombarTop;

        if (zoomFlag > 0) {
          if (viewModel.viewer.scene.mode === SceneMode.COLUMBUS_VIEW) {
            camera.zoomOut();
          } else {
            handlezoom(viewModel, -1);
          }
        } else {
          if (viewModel.viewer.scene.mode === SceneMode.COLUMBUS_VIEW) {
            camera.zoomIn();
          } else {
            handlezoom(viewModel, 1);
          }
        }
      };

      viewModel.zoomBarScrollMouseUpFunction = function () {
        viewModel.isZoomBarScrolling = false;
        document.removeEventListener('mousemove', viewModel.zoomBarScrollMouseMoveFunction, false);
        document.removeEventListener('touchmove', viewModel.zoomBarScrollMouseMoveFunction, false);
        document.removeEventListener('mouseup', viewModel.zoomBarScrollMouseUpFunction, false);
        document.removeEventListener('touchend', viewModel.zoomBarScrollMouseUpFunction, false);
        defined(viewModel.zoombarTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.zoombarTickFunction);
        viewModel.zoomBarScrollMouseUpFunction = undefined;
        viewModel.zoomBarScrollMouseMoveFunction = undefined;
        viewModel.zoombarTickFunction = undefined;
        viewModel.zoombarTop = 65;
      };

      document.addEventListener('mousemove', viewModel.zoomBarScrollMouseMoveFunction, false);
      document.addEventListener('touchmove', viewModel.zoomBarScrollMouseMoveFunction, false);
      document.addEventListener('mouseup', viewModel.zoomBarScrollMouseUpFunction, false);
      document.addEventListener('touchend', viewModel.zoomBarScrollMouseUpFunction, false);
      viewModel.viewer.clock.onTick.addEventListener(viewModel.zoombarTickFunction);
    },
    handleZoomInMouseDown: function handleZoomInMouseDown(event) {
      var viewModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var _Cesium2 = Cesium,
          defined = _Cesium2.defined,
          getTimestamp = _Cesium2.getTimestamp,
          SceneMode = _Cesium2.SceneMode,
          ScreenSpaceEventType = _Cesium2.ScreenSpaceEventType;
      viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
      defined(viewModel.zoominTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.zoominTickFunction);
      viewModel.zoominMouseUpFunction = undefined;
      viewModel.zoominTickFunction = undefined;
      viewModel.isZoomin = true;
      viewModel.zoominLastTimestamp = getTimestamp();
      var scene = viewModel.viewer.scene;
      var camera = scene.camera;

      viewModel.zoominTickFunction = function () {
        viewModel.viewer.scene.mode === SceneMode.COLUMBUS_VIEW ? camera.zoomIn() : handlezoom(viewModel, 1);
      };

      viewModel.zoominMouseUpFunction = function () {
        viewModel.isZoomin = false;
        viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
        defined(viewModel.zoominTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.zoominTickFunction);
        viewModel.zoominMouseUpFunction = undefined;
        viewModel.zoominTickFunction = undefined;
      };

      viewModel.screenSpaceEventHandler.setInputAction(viewModel.zoominMouseUpFunction, ScreenSpaceEventType.LEFT_UP);
      viewModel.viewer.clock.onTick.addEventListener(viewModel.zoominTickFunction);
    },
    handleZoomOutMouseDown: function handleZoomOutMouseDown(event) {
      var viewModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var _Cesium3 = Cesium,
          defined = _Cesium3.defined,
          getTimestamp = _Cesium3.getTimestamp,
          SceneMode = _Cesium3.SceneMode,
          ScreenSpaceEventType = _Cesium3.ScreenSpaceEventType;
      viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
      defined(viewModel.zoomoutTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.zoomoutTickFunction);
      viewModel.zoomoutMouseUpFunction = undefined;
      viewModel.zoomoutTickFunction = undefined;
      viewModel.iszoomout = false;
      viewModel.zoomoutLastTimestamp = getTimestamp();
      var scene = viewModel.viewer.scene;
      var camera = scene.camera;

      viewModel.zoomoutTickFunction = function () {
        viewModel.viewer.scene.mode === SceneMode.COLUMBUS_VIEW ? camera.zoomOut() : handlezoom(viewModel, -1);
      };

      viewModel.zoomoutMouseUpFunction = function () {
        viewModel.iszoomout = false;
        viewModel.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
        defined(viewModel.zoomoutTickFunction) && viewModel.viewer.clock.onTick.removeEventListener(viewModel.zoomoutTickFunction);
        viewModel.zoomoutMouseUpFunction = undefined;
        viewModel.zoomoutTickFunction = undefined;
      };

      viewModel.screenSpaceEventHandler.setInputAction(viewModel.zoomoutMouseUpFunction, ScreenSpaceEventType.LEFT_UP);
      viewModel.viewer.clock.onTick.addEventListener(viewModel.zoomoutTickFunction);
    }
  },
  destroyed: function destroyed() {
    this.screenSpaceEventHandler && this.screenSpaceEventHandler.destroy();
  }
};

function handlezoom(viewModel, i) {
  var _Cesium4 = Cesium,
      Cartesian2 = _Cesium4.Cartesian2,
      Cartesian3 = _Cesium4.Cartesian3,
      defined = _Cesium4.defined,
      Ellipsoid = _Cesium4.Ellipsoid,
      Math = _Cesium4.Math;
  var scene = viewModel.viewer.scene;
  var camera = scene.camera;
  var canvas = scene.canvas;
  var centerPixel = new Cartesian2();
  centerPixel.x = canvas.clientWidth / 2;
  centerPixel.y = canvas.clientHeight / 2;
  var centerPosition = pickGlobe(viewModel, centerPixel);

  if (defined(centerPosition)) {
    var distance = Cartesian3.distance(camera.position, centerPosition);
    var factor = 0.0618 * i * 0.2;
    factor = distance > 300 ? factor : 2 * factor;
    var amount = distance * factor;
    var direction = {};
    Cartesian3.subtract(centerPosition, camera.position, direction);
    var cameraRight = Cartesian3.clone(camera.right);
    var dot = Cartesian3.dot(direction, cameraRight);
    var movementVector = {};
    Cartesian3.multiplyByScalar(cameraRight, dot, movementVector);
    Cartesian3.subtract(direction, movementVector, direction);
    Cartesian3.normalize(direction, direction);
    camera.move(direction, amount);
    var centerPositionNormal = {};
    Cartesian3.normalize(centerPosition, centerPositionNormal);
    var centerDistance = Cartesian3.magnitude(centerPosition);
    var ellipsoid = Ellipsoid.fromCartesian3(centerDistance);
    var pickPosition = camera.pickEllipsoid(centerPixel, ellipsoid);

    if (defined(pickPosition) && !isNaN(pickPosition.x) && !isNaN(pickPosition.y) && !isNaN(pickPosition.z) && !(camera.positionCartographic.height < 0)) {
      Cartesian3.normalize(pickPosition, pickPosition);
      var angle = Cartesian3.angleBetween(centerPositionNormal, pickPosition);

      if (!Math.equalsEpsilon(angle, 0, Math.EPSILON10)) {
        var axis = Cartesian3.cross(centerPositionNormal, pickPosition);
        camera.rotate(axis, angle);
      }
    }
  }
}

function pickGlobe(viewModel, mousePosition) {
  var _Cesium5 = Cesium,
      defined = _Cesium5.defined,
      Cartesian3 = _Cesium5.Cartesian3;
  var scene = viewModel.viewer.scene;
  var globe = scene.globe;
  var camera = scene.camera;

  if (defined(globe)) {
    var depthIntersection;

    if (scene.pickPositionSupported) {
      depthIntersection = scene.pickPositionWorldCoordinates(mousePosition);
    }

    var ray = camera.getPickRay(mousePosition);
    var rayIntersection = globe.pick(ray, scene);
    var pickDistance = defined(depthIntersection) ? Cartesian3.distance(depthIntersection, camera.positionWC) : Number.POSITIVE_INFINITY;
    var rayDistance = defined(rayIntersection) ? Cartesian3.distance(rayIntersection, camera.positionWC) : Number.POSITIVE_INFINITY;
    return rayDistance > pickDistance ? depthIntersection : rayIntersection;
  }
}

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-zoom-sm"
  }, [_c('div', {
    staticClass: "vc-zoomin-sm",
    attrs: {
      "title": _vm.$vc.lang.navigation.zoomCotrol.zoomIn
    },
    on: {
      "mousedown": _vm.handleZoomInMouseDown,
      "touchstart": _vm.handleZoomInMouseDown
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-zoomout-sm",
    attrs: {
      "title": _vm.$vc.lang.navigation.zoomCotrol.zoomOut
    },
    on: {
      "mousedown": _vm.handleZoomOutMouseDown,
      "touchstart": _vm.handleZoomOutMouseDown
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "vc-zoombar-sm",
    style: _vm.zoombarStyle,
    on: {
      "mousedown": _vm.handleZoomBarScrollMouseDown,
      "touchstart": _vm.handleZoomBarScrollMouseDown
    }
  })]);
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

  component.__file = "VcZoomControlSM.vue";

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


var VcZoomControlSM = __vue_normalize__$1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1);

var script$2 = {
  name: 'vc-navigation-sm',
  components: {
    'vc-compass-sm': VcCompassSM,
    'vc-zoom-control-sm': VcZoomControlSM
  },
  data: function data() {
    return {
      defaultOptions: {
        enableCompass: true,
        enableCompassOuterRing: true,
        enableZoomControl: true
      },
      ncTop: 0
    };
  },
  mixins: [cmp],
  props: {
    options: Object
  },
  computed: {
    navigationContainerStyle: function navigationContainerStyle() {
      return {
        top: this.ncTop + 'px'
      };
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.reload();
      },
      deep: true
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
                _Object$assign(_this.defaultOptions, _this.options);

                _this.viewer.widgetResized.addEventListener(_this.widgetResized);

                _this.widgetResized();

              case 3:
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
    },
    widgetResized: function widgetResized() {
      var viewer = this.viewer;
      var ncTop = 0;
      viewer._toolbar && (ncTop += viewer._toolbar.getBoundingClientRect().height);
      this.ncTop = ncTop;
    }
  },
  stubVNode: {
    empty: function empty() {
      return this.$options.name;
    }
  },
  created: function created() {
    var _this2 = this;

    Object.defineProperties(this, {
      cesiumNavigation: {
        enumerable: true,
        get: function get() {
          return _this2.$services && _this2.cesiumObject;
        }
      }
    });
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
    ref: "navigationContainer",
    staticClass: "vc-navigationContainer-sm",
    style: _vm.navigationContainerStyle
  }, [_vm.defaultOptions.enableCompass ? _c('vc-compass-sm', {
    attrs: {
      "enableCompassOuterRing": _vm.defaultOptions.enableCompassOuterRing
    }
  }) : _vm._e(), _vm._v(" "), _vm.defaultOptions.enableZoomControl ? _c('vc-zoom-control-sm') : _vm._e()], 1);
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

  component.__file = "VcNavigationSM.vue";

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


var VcNavigationSM = __vue_normalize__$2({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.component(VcNavigationSM.name, VcNavigationSM);
}

export default plugin;
export { VcNavigationSM, plugin as install };
