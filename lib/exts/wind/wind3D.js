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
import _classCallCheck from '@babel/runtime-corejs2/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime-corejs2/helpers/esm/createClass';
import ParticleSystem from './particleSystem';
import Util from './util';

var Wind3D = /*#__PURE__*/function () {
  function Wind3D(viewer, data, particleSystemOptions) {
    _classCallCheck(this, Wind3D);

    this.viewer = viewer;
    this.scene = this.viewer.scene;
    this.camera = this.viewer.camera;
    this.data = data;
    this.viewerParameters = {
      lonRange: new Cesium.Cartesian2(),
      latRange: new Cesium.Cartesian2(),
      pixelSize: 0.0,
      lonDataRange: new Cesium.Cartesian2(),
      latDataRange: new Cesium.Cartesian2()
    }; // use a smaller earth radius to make sure distance to camera > 0

    this.globeBoundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, 0.99 * 6378137.0);
    this.updateViewerParameters();
    this.particleSystem = new ParticleSystem(this.scene.context, data, particleSystemOptions, this.viewerParameters);
    this.addPrimitives();
    this.setupEventListeners();
    this.imageryLayers = this.viewer.imageryLayers;
  }

  _createClass(Wind3D, [{
    key: "addPrimitives",
    value: function addPrimitives() {
      // the order of primitives.add() should respect the dependency of primitives
      this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.getWind);
      this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.updateSpeed);
      this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.updatePosition);
      this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.postProcessingPosition);
      this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.postProcessingSpeed);
      this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.segments);
      this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.trails);
      this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.screen);
    }
  }, {
    key: "removePrimitives",
    value: function removePrimitives() {
      this.scene.primitives.remove(this.particleSystem.particlesRendering.primitives.screen);
      this.scene.primitives.remove(this.particleSystem.particlesRendering.primitives.trails);
      this.scene.primitives.remove(this.particleSystem.particlesRendering.primitives.segments);
      this.scene.primitives.remove(this.particleSystem.particlesComputing.primitives.postProcessingSpeed);
      this.scene.primitives.remove(this.particleSystem.particlesComputing.primitives.postProcessingPosition);
      this.scene.primitives.remove(this.particleSystem.particlesComputing.primitives.updatePosition);
      this.scene.primitives.remove(this.particleSystem.particlesComputing.primitives.updateSpeed);
      this.scene.primitives.remove(this.particleSystem.particlesComputing.primitives.getWind);
    }
  }, {
    key: "updateViewerParameters",
    value: function updateViewerParameters() {
      var viewRectangle = this.camera.computeViewRectangle(this.scene.globe.ellipsoid);
      var lonLatRange = Util.viewRectangleToLonLatRange(viewRectangle);
      this.viewerParameters.lonRange.x = lonLatRange.lon.min;
      this.viewerParameters.lonRange.y = lonLatRange.lon.max;
      this.viewerParameters.latRange.x = lonLatRange.lat.min;
      this.viewerParameters.latRange.y = lonLatRange.lat.max;
      this.viewerParameters.lonDataRange.x = this.data.lon.min;
      this.viewerParameters.lonDataRange.y = this.data.lon.max;
      this.viewerParameters.latDataRange.x = this.data.lat.min;
      this.viewerParameters.latDataRange.y = this.data.lat.max;
      var pixelSize = this.camera.getPixelSize(this.globeBoundingSphere, this.scene.drawingBufferWidth, this.scene.drawingBufferHeight);

      if (pixelSize > 0) {
        this.viewerParameters.pixelSize = pixelSize;
      }
    }
  }, {
    key: "moveStartListener",
    value: function moveStartListener() {
      this.scene.primitives.show = false;
    }
  }, {
    key: "moveEndListener",
    value: function moveEndListener() {
      this.updateViewerParameters();
      this.particleSystem.applyViewerParameters(this.viewerParameters);
      this.scene.primitives.show = true;
    }
  }, {
    key: "preRenderListener",
    value: function preRenderListener() {
      if (this.resized) {
        this.particleSystem.canvasResize(this.scene.context);
        this.resized = false;
        this.addPrimitives();
        this.scene.primitives.show = true;
      }
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var that = this;
      this.camera.moveStart.addEventListener(this.moveStartListener, this);
      this.camera.moveEnd.addEventListener(this.moveEndListener, this);
      this.resized = false;
      window.addEventListener('resize', function () {
        that.resized = true;
        that.scene.primitives.show = false;
        that.scene.primitives.removeAll();
      });
      this.scene.preRender.addEventListener(this.preRenderListener, this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removePrimitives();
      this.camera.moveStart.removeEventListener(this.moveStartListener, this);
      this.camera.moveEnd.removeEventListener(this.moveEndListener, this);
      this.scene.preRender.removeEventListener(this.preRenderListener, this);
    }
  }]);

  return Wind3D;
}();

export default Wind3D;
