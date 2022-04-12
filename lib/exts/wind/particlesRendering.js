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
import Util from './util';
import CustomPrimitive from './customPrimitive';
import { segmentDrawVert, segmentDrawFrag, fullscreenVert, trailDrawFrag, screenDrawFrag } from './glsl';

var ParticlesRendering = /*#__PURE__*/function () {
  function ParticlesRendering(context, data, particleSystemOptions, viewerParameters, particlesComputing) {
    _classCallCheck(this, ParticlesRendering);

    this.createRenderingTextures(context, data);
    this.createRenderingFramebuffers(context);
    this.createRenderingPrimitives(context, particleSystemOptions, viewerParameters, particlesComputing);
  }

  _createClass(ParticlesRendering, [{
    key: "createRenderingTextures",
    value: function createRenderingTextures(context, data) {
      var colorTextureOptions = {
        context: context,
        width: context.drawingBufferWidth,
        height: context.drawingBufferHeight,
        pixelFormat: Cesium.PixelFormat.RGBA,
        pixelDatatype: Cesium.PixelDatatype.UNSIGNED_BYTE
      };
      var depthTextureOptions = {
        context: context,
        width: context.drawingBufferWidth,
        height: context.drawingBufferHeight,
        pixelFormat: Cesium.PixelFormat.DEPTH_COMPONENT,
        pixelDatatype: Cesium.PixelDatatype.UNSIGNED_INT
      };
      var colorTableTextureOptions = {
        context: context,
        width: data.colorTable.colorNum,
        height: 1,
        pixelFormat: Cesium.PixelFormat.RGB,
        pixelDatatype: Cesium.PixelDatatype.FLOAT,
        sampler: new Cesium.Sampler({
          minificationFilter: Cesium.TextureMinificationFilter.LINEAR,
          magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR
        })
      };
      this.textures = {
        segmentsColor: Util.createTexture(colorTextureOptions),
        segmentsDepth: Util.createTexture(depthTextureOptions),
        currentTrailsColor: Util.createTexture(colorTextureOptions),
        currentTrailsDepth: Util.createTexture(depthTextureOptions),
        nextTrailsColor: Util.createTexture(colorTextureOptions),
        nextTrailsDepth: Util.createTexture(depthTextureOptions),
        colorTable: Util.createTexture(colorTableTextureOptions, data.colorTable.array)
      };
    }
  }, {
    key: "createRenderingFramebuffers",
    value: function createRenderingFramebuffers(context) {
      this.framebuffers = {
        segments: Util.createFramebuffer(context, this.textures.segmentsColor, this.textures.segmentsDepth),
        currentTrails: Util.createFramebuffer(context, this.textures.currentTrailsColor, this.textures.currentTrailsDepth),
        nextTrails: Util.createFramebuffer(context, this.textures.nextTrailsColor, this.textures.nextTrailsDepth)
      };
    }
  }, {
    key: "createSegmentsGeometry",
    value: function createSegmentsGeometry(particleSystemOptions) {
      var repeatVertex = 4;
      var st = [];

      for (var s = 0; s < particleSystemOptions.particlesTextureSize; s++) {
        for (var t = 0; t < particleSystemOptions.particlesTextureSize; t++) {
          for (var i = 0; i < repeatVertex; i++) {
            st.push(s / particleSystemOptions.particlesTextureSize);
            st.push(t / particleSystemOptions.particlesTextureSize);
          }
        }
      }

      st = new Float32Array(st);
      var normal = [];
      var pointToUse = [-1, 1];
      var offsetSign = [-1, 1];

      for (var _i = 0; _i < particleSystemOptions.maxParticles; _i++) {
        for (var j = 0; j < repeatVertex / 2; j++) {
          for (var k = 0; k < repeatVertex / 2; k++) {
            normal.push(pointToUse[j]);
            normal.push(offsetSign[k]);
            normal.push(0);
          }
        }
      }

      normal = new Float32Array(normal);
      var indexSize = 6 * particleSystemOptions.maxParticles;
      var vertexIndexes = new Uint32Array(indexSize);

      for (var _i2 = 0, _j = 0, vertex = 0; _i2 < particleSystemOptions.maxParticles; _i2++) {
        vertexIndexes[_j++] = vertex + 0;
        vertexIndexes[_j++] = vertex + 1;
        vertexIndexes[_j++] = vertex + 2;
        vertexIndexes[_j++] = vertex + 2;
        vertexIndexes[_j++] = vertex + 1;
        vertexIndexes[_j++] = vertex + 3;
        vertex += 4;
      }

      var geometry = new Cesium.Geometry({
        attributes: new Cesium.GeometryAttributes({
          st: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: st
          }),
          normal: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: normal
          })
        }),
        indices: vertexIndexes
      });
      return geometry;
    }
  }, {
    key: "createRenderingPrimitives",
    value: function createRenderingPrimitives(context, particleSystemOptions, viewerParameters, particlesComputing) {
      var that = this;
      this.primitives = {
        segments: new CustomPrimitive({
          commandType: 'Draw',
          attributeLocations: {
            st: 0,
            normal: 1
          },
          geometry: this.createSegmentsGeometry(particleSystemOptions),
          primitiveType: Cesium.PrimitiveType.TRIANGLES,
          uniformMap: {
            currentParticlesPosition: function currentParticlesPosition() {
              return particlesComputing.particlesTextures.currentParticlesPosition;
            },
            postProcessingPosition: function postProcessingPosition() {
              return particlesComputing.particlesTextures.postProcessingPosition;
            },
            postProcessingSpeed: function postProcessingSpeed() {
              return particlesComputing.particlesTextures.postProcessingSpeed;
            },
            colorTable: function colorTable() {
              return that.textures.colorTable;
            },
            aspect: function aspect() {
              return context.drawingBufferWidth / context.drawingBufferHeight;
            },
            pixelSize: function pixelSize() {
              return viewerParameters.pixelSize;
            },
            lineWidth: function lineWidth() {
              return particleSystemOptions.lineWidth;
            },
            particleHeight: function particleHeight() {
              return particleSystemOptions.particleHeight;
            }
          },
          vertexShaderSource: new Cesium.ShaderSource({
            sources: [segmentDrawVert]
          }),
          fragmentShaderSource: new Cesium.ShaderSource({
            sources: [segmentDrawFrag]
          }),
          rawRenderState: Util.createRawRenderState({
            // undefined value means let Cesium deal with it
            viewport: undefined,
            depthTest: {
              enabled: true
            },
            depthMask: true
          }),
          framebuffer: this.framebuffers.segments,
          autoClear: true
        }),
        trails: new CustomPrimitive({
          commandType: 'Draw',
          attributeLocations: {
            position: 0,
            st: 1
          },
          geometry: Util.getFullscreenQuad(),
          primitiveType: Cesium.PrimitiveType.TRIANGLES,
          uniformMap: {
            segmentsColorTexture: function segmentsColorTexture() {
              return that.textures.segmentsColor;
            },
            segmentsDepthTexture: function segmentsDepthTexture() {
              return that.textures.segmentsDepth;
            },
            currentTrailsColor: function currentTrailsColor() {
              return that.framebuffers.currentTrails.getColorTexture(0);
            },
            trailsDepthTexture: function trailsDepthTexture() {
              return that.framebuffers.currentTrails.depthTexture;
            },
            fadeOpacity: function fadeOpacity() {
              return particleSystemOptions.fadeOpacity;
            }
          },
          // prevent Cesium from writing depth because the depth here should be written manually
          vertexShaderSource: new Cesium.ShaderSource({
            defines: ['DISABLE_GL_POSITION_LOG_DEPTH'],
            sources: [fullscreenVert]
          }),
          fragmentShaderSource: new Cesium.ShaderSource({
            defines: ['DISABLE_LOG_DEPTH_FRAGMENT_WRITE'],
            sources: [trailDrawFrag]
          }),
          rawRenderState: Util.createRawRenderState({
            viewport: undefined,
            depthTest: {
              enabled: true,
              func: Cesium.DepthFunction.ALWAYS // always pass depth test for full control of depth information

            },
            depthMask: true
          }),
          framebuffer: this.framebuffers.nextTrails,
          autoClear: true,
          preExecute: function preExecute() {
            // swap framebuffers before binding
            var temp = that.framebuffers.currentTrails;
            that.framebuffers.currentTrails = that.framebuffers.nextTrails;
            that.framebuffers.nextTrails = temp; // keep the framebuffers up to date

            that.primitives.trails.commandToExecute.framebuffer = that.framebuffers.nextTrails;
            that.primitives.trails.clearCommand.framebuffer = that.framebuffers.nextTrails;
          }
        }),
        screen: new CustomPrimitive({
          commandType: 'Draw',
          attributeLocations: {
            position: 0,
            st: 1
          },
          geometry: Util.getFullscreenQuad(),
          primitiveType: Cesium.PrimitiveType.TRIANGLES,
          uniformMap: {
            trailsColorTexture: function trailsColorTexture() {
              return that.framebuffers.nextTrails.getColorTexture(0);
            },
            trailsDepthTexture: function trailsDepthTexture() {
              return that.framebuffers.nextTrails.depthTexture;
            }
          },
          // prevent Cesium from writing depth because the depth here should be written manually
          vertexShaderSource: new Cesium.ShaderSource({
            defines: ['DISABLE_GL_POSITION_LOG_DEPTH'],
            sources: [fullscreenVert]
          }),
          fragmentShaderSource: new Cesium.ShaderSource({
            defines: ['DISABLE_LOG_DEPTH_FRAGMENT_WRITE'],
            sources: [screenDrawFrag]
          }),
          rawRenderState: Util.createRawRenderState({
            viewport: undefined,
            depthTest: {
              enabled: false
            },
            depthMask: true,
            blending: {
              enabled: true
            }
          }),
          framebuffer: undefined // undefined value means let Cesium deal with it

        })
      };
    }
  }]);

  return ParticlesRendering;
}();

export default ParticlesRendering;
