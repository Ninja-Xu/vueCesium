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
import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys';
import ParticlesComputing from './particlesComputing';
import ParticlesRendering from './particlesRendering';

var ParticleSystem = /*#__PURE__*/function () {
  function ParticleSystem(context, data, particleSystemOptions, viewerParameters) {
    _classCallCheck(this, ParticleSystem);

    this.context = context;
    this.data = data;
    this.particleSystemOptions = particleSystemOptions;
    this.viewerParameters = viewerParameters;
    this.particlesComputing = new ParticlesComputing(this.context, this.data, this.particleSystemOptions, this.viewerParameters);
    this.particlesRendering = new ParticlesRendering(this.context, this.data, this.particleSystemOptions, this.viewerParameters, this.particlesComputing);
  }

  _createClass(ParticleSystem, [{
    key: "canvasResize",
    value: function canvasResize(context) {
      var _this = this;

      this.particlesComputing.destroyParticlesTextures();

      _Object$keys(this.particlesComputing.windTextures).forEach(function (key) {
        _this.particlesComputing.windTextures[key].destroy();
      });

      this.particlesRendering.textures.colorTable.destroy();

      _Object$keys(this.particlesRendering.framebuffers).forEach(function (key) {
        _this.particlesRendering.framebuffers[key].destroy();
      });

      this.context = context;
      this.particlesComputing = new ParticlesComputing(this.context, this.data, this.particleSystemOptions, this.viewerParameters);
      this.particlesRendering = new ParticlesRendering(this.context, this.data, this.particleSystemOptions, this.viewerParameters, this.particlesComputing);
    }
  }, {
    key: "clearFramebuffers",
    value: function clearFramebuffers() {
      var _this2 = this;

      var clearCommand = new Cesium.ClearCommand({
        color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
        depth: 1.0,
        framebuffer: undefined,
        pass: Cesium.Pass.OPAQUE
      });

      _Object$keys(this.particlesRendering.framebuffers).forEach(function (key) {
        clearCommand.framebuffer = _this2.particlesRendering.framebuffers[key];
        clearCommand.execute(_this2.context);
      });
    }
  }, {
    key: "refreshParticles",
    value: function refreshParticles(maxParticlesChanged) {
      this.clearFramebuffers();
      this.particlesComputing.destroyParticlesTextures();
      this.particlesComputing.createParticlesTextures(this.context, this.particleSystemOptions, this.viewerParameters);

      if (maxParticlesChanged) {
        var geometry = this.particlesRendering.createSegmentsGeometry(this.particleSystemOptions);
        this.particlesRendering.primitives.segments.geometry = geometry;
        var vertexArray = Cesium.VertexArray.fromGeometry({
          context: this.context,
          geometry: geometry,
          attributeLocations: this.particlesRendering.primitives.segments.attributeLocations,
          bufferUsage: Cesium.BufferUsage.STATIC_DRAW
        });
        this.particlesRendering.primitives.segments.commandToExecute.vertexArray = vertexArray;
      }
    }
  }, {
    key: "applyParticleSystemOptions",
    value: function applyParticleSystemOptions(particleSystemOptions) {
      var _this3 = this;

      var maxParticlesChanged = false;

      if (this.particleSystemOptions.maxParticles !== particleSystemOptions.maxParticles) {
        maxParticlesChanged = true;
      }

      _Object$keys(particleSystemOptions).forEach(function (key) {
        _this3.particleSystemOptions[key] = particleSystemOptions[key];
      });

      this.refreshParticles(maxParticlesChanged);
    }
  }, {
    key: "applyViewerParameters",
    value: function applyViewerParameters(viewerParameters) {
      var _this4 = this;

      _Object$keys(viewerParameters).forEach(function (key) {
        _this4.viewerParameters[key] = viewerParameters[key];
      });

      this.refreshParticles(false);
    }
  }]);

  return ParticleSystem;
}();

export default ParticleSystem;
