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
import Util from './util';
import CustomPrimitive from './customPrimitive';
import { getWindFrag, updateSpeedFrag, updatePositionFrag, postProcessingPositionFrag, postProcessingSpeedFrag } from './glsl';

var ParticlesComputing = /*#__PURE__*/function () {
  function ParticlesComputing(context, data, particleSystemOptions, viewerParameters) {
    _classCallCheck(this, ParticlesComputing);

    this.data = data;
    this.createWindTextures(context, data);
    this.createParticlesTextures(context, particleSystemOptions, viewerParameters);
    this.createComputingPrimitives(data, particleSystemOptions, viewerParameters);
  }

  _createClass(ParticlesComputing, [{
    key: "createWindTextures",
    value: function createWindTextures(context, data) {
      var windTextureOptions = {
        context: context,
        width: data.dimensions.lon,
        height: data.dimensions.lat * data.dimensions.lev,
        pixelFormat: Cesium.PixelFormat.LUMINANCE,
        pixelDatatype: Cesium.PixelDatatype.FLOAT,
        flipY: false,
        sampler: new Cesium.Sampler({
          // the values of texture will not be interpolated
          minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
          magnificationFilter: Cesium.TextureMagnificationFilter.NEAREST
        })
      };
      this.windTextures = {
        U: Util.createTexture(windTextureOptions, data.U.array),
        V: Util.createTexture(windTextureOptions, data.V.array)
      };
    }
  }, {
    key: "randomizeParticles",
    value: function randomizeParticles(maxParticles, viewerParameters) {
      var array = new Float32Array(4 * maxParticles);

      for (var i = 0; i < maxParticles; i++) {
        array[4 * i] = Cesium.Math.randomBetween(viewerParameters.lonRange.x, viewerParameters.lonRange.y);
        array[4 * i + 1] = Cesium.Math.randomBetween(viewerParameters.latRange.x, viewerParameters.latRange.y);
        array[4 * i + 2] = Cesium.Math.randomBetween(this.data.lev.min, this.data.lev.max);
        array[4 * i + 3] = 0.0;
      }

      return array;
    }
  }, {
    key: "createParticlesTextures",
    value: function createParticlesTextures(context, particleSystemOptions, viewerParameters) {
      var particlesTextureOptions = {
        context: context,
        width: particleSystemOptions.particlesTextureSize,
        height: particleSystemOptions.particlesTextureSize,
        pixelFormat: Cesium.PixelFormat.RGBA,
        pixelDatatype: Cesium.PixelDatatype.FLOAT,
        flipY: false,
        sampler: new Cesium.Sampler({
          // the values of texture will not be interpolated
          minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
          magnificationFilter: Cesium.TextureMagnificationFilter.NEAREST
        })
      };
      var particlesArray = this.randomizeParticles(particleSystemOptions.maxParticles, viewerParameters);
      this.particlesTextures = {
        particlesWind: Util.createTexture(particlesTextureOptions),
        currentParticlesPosition: Util.createTexture(particlesTextureOptions, particlesArray),
        nextParticlesPosition: Util.createTexture(particlesTextureOptions, particlesArray),
        currentParticlesSpeed: Util.createTexture(particlesTextureOptions),
        nextParticlesSpeed: Util.createTexture(particlesTextureOptions),
        postProcessingPosition: Util.createTexture(particlesTextureOptions, particlesArray),
        postProcessingSpeed: Util.createTexture(particlesTextureOptions)
      };
    }
  }, {
    key: "destroyParticlesTextures",
    value: function destroyParticlesTextures() {
      var _this = this;

      _Object$keys(this.particlesTextures).forEach(function (key) {
        _this.particlesTextures[key].destroy();
      });
    }
  }, {
    key: "createComputingPrimitives",
    value: function createComputingPrimitives(data, particleSystemOptions, viewerParameters) {
      var _dimension = new Cesium.Cartesian3(data.dimensions.lon, data.dimensions.lat, data.dimensions.lev);

      var _minimum = new Cesium.Cartesian3(data.lon.min, data.lat.min, data.lev.min);

      var _maximum = new Cesium.Cartesian3(data.lon.max, data.lat.max, data.lev.max);

      var _interval = new Cesium.Cartesian3((_maximum.x - _minimum.x) / (_dimension.x - 1), (_maximum.y - _minimum.y) / (_dimension.y - 1), _dimension.z > 1 ? (_maximum.z - _minimum.z) / (_dimension.z - 1) : 1.0);

      var _uSpeedRange = new Cesium.Cartesian2(data.U.min, data.U.max);

      var _vSpeedRange = new Cesium.Cartesian2(data.V.min, data.V.max);

      var that = this;
      this.primitives = {
        getWind: new CustomPrimitive({
          commandType: 'Compute',
          uniformMap: {
            U: function U() {
              return that.windTextures.U;
            },
            V: function V() {
              return that.windTextures.V;
            },
            currentParticlesPosition: function currentParticlesPosition() {
              return that.particlesTextures.currentParticlesPosition;
            },
            dimension: function dimension() {
              return _dimension;
            },
            minimum: function minimum() {
              return _minimum;
            },
            maximum: function maximum() {
              return _maximum;
            },
            interval: function interval() {
              return _interval;
            }
          },
          fragmentShaderSource: new Cesium.ShaderSource({
            sources: [getWindFrag]
          }),
          outputTexture: this.particlesTextures.particlesWind,
          preExecute: function preExecute() {
            // keep the outputTexture up to date
            that.primitives.getWind.commandToExecute.outputTexture = that.particlesTextures.particlesWind;
          }
        }),
        updateSpeed: new CustomPrimitive({
          commandType: 'Compute',
          uniformMap: {
            currentParticlesSpeed: function currentParticlesSpeed() {
              return that.particlesTextures.currentParticlesSpeed;
            },
            particlesWind: function particlesWind() {
              return that.particlesTextures.particlesWind;
            },
            uSpeedRange: function uSpeedRange() {
              return _uSpeedRange;
            },
            vSpeedRange: function vSpeedRange() {
              return _vSpeedRange;
            },
            pixelSize: function pixelSize() {
              return viewerParameters.pixelSize;
            },
            speedFactor: function speedFactor() {
              return particleSystemOptions.speedFactor;
            }
          },
          fragmentShaderSource: new Cesium.ShaderSource({
            sources: [updateSpeedFrag]
          }),
          outputTexture: this.particlesTextures.nextParticlesSpeed,
          preExecute: function preExecute() {
            // swap textures before binding
            var temp = that.particlesTextures.currentParticlesSpeed;
            that.particlesTextures.currentParticlesSpeed = that.particlesTextures.postProcessingSpeed;
            that.particlesTextures.postProcessingSpeed = temp; // keep the outputTexture up to date

            that.primitives.updateSpeed.commandToExecute.outputTexture = that.particlesTextures.nextParticlesSpeed;
          }
        }),
        updatePosition: new CustomPrimitive({
          commandType: 'Compute',
          uniformMap: {
            currentParticlesPosition: function currentParticlesPosition() {
              return that.particlesTextures.currentParticlesPosition;
            },
            currentParticlesSpeed: function currentParticlesSpeed() {
              return that.particlesTextures.currentParticlesSpeed;
            }
          },
          fragmentShaderSource: new Cesium.ShaderSource({
            sources: [updatePositionFrag]
          }),
          outputTexture: this.particlesTextures.nextParticlesPosition,
          preExecute: function preExecute() {
            // swap textures before binding
            var temp = that.particlesTextures.currentParticlesPosition;
            that.particlesTextures.currentParticlesPosition = that.particlesTextures.postProcessingPosition;
            that.particlesTextures.postProcessingPosition = temp; // keep the outputTexture up to date

            that.primitives.updatePosition.commandToExecute.outputTexture = that.particlesTextures.nextParticlesPosition;
          }
        }),
        postProcessingPosition: new CustomPrimitive({
          commandType: 'Compute',
          uniformMap: {
            nextParticlesPosition: function nextParticlesPosition() {
              return that.particlesTextures.nextParticlesPosition;
            },
            nextParticlesSpeed: function nextParticlesSpeed() {
              return that.particlesTextures.nextParticlesSpeed;
            },
            lonRange: function lonRange() {
              return viewerParameters.lonRange;
            },
            latRange: function latRange() {
              return viewerParameters.latRange;
            },
            lonDataRange: function lonDataRange() {
              return viewerParameters.lonDataRange;
            },
            latDataRange: function latDataRange() {
              return viewerParameters.latDataRange;
            },
            randomCoef: function randomCoef() {
              var randomCoef = Math.random();
              return randomCoef;
            },
            dropRate: function dropRate() {
              return particleSystemOptions.dropRate;
            },
            dropRateBump: function dropRateBump() {
              return particleSystemOptions.dropRateBump;
            }
          },
          fragmentShaderSource: new Cesium.ShaderSource({
            sources: [postProcessingPositionFrag]
          }),
          outputTexture: this.particlesTextures.postProcessingPosition,
          preExecute: function preExecute() {
            // keep the outputTexture up to date
            that.primitives.postProcessingPosition.commandToExecute.outputTexture = that.particlesTextures.postProcessingPosition;
          }
        }),
        postProcessingSpeed: new CustomPrimitive({
          commandType: 'Compute',
          uniformMap: {
            postProcessingPosition: function postProcessingPosition() {
              return that.particlesTextures.postProcessingPosition;
            },
            nextParticlesSpeed: function nextParticlesSpeed() {
              return that.particlesTextures.nextParticlesSpeed;
            }
          },
          fragmentShaderSource: new Cesium.ShaderSource({
            sources: [postProcessingSpeedFrag]
          }),
          outputTexture: this.particlesTextures.postProcessingSpeed,
          preExecute: function preExecute() {
            // keep the outputTexture up to date
            that.primitives.postProcessingSpeed.commandToExecute.outputTexture = that.particlesTextures.postProcessingSpeed;
          }
        })
      };
    }
  }]);

  return ParticlesComputing;
}();

export default ParticlesComputing;
