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

var CustomPrimitive = /*#__PURE__*/function () {
  function CustomPrimitive(options) {
    _classCallCheck(this, CustomPrimitive);

    this.commandType = options.commandType;
    this.geometry = options.geometry;
    this.attributeLocations = options.attributeLocations;
    this.primitiveType = options.primitiveType;
    this.uniformMap = options.uniformMap;
    this.vertexShaderSource = options.vertexShaderSource;
    this.fragmentShaderSource = options.fragmentShaderSource;
    this.rawRenderState = options.rawRenderState;
    this.framebuffer = options.framebuffer;
    this.outputTexture = options.outputTexture;
    this.autoClear = Cesium.defaultValue(options.autoClear, false);
    this.preExecute = options.preExecute;
    this.show = true;
    this.commandToExecute = undefined;
    this.clearCommand = undefined;

    if (this.autoClear) {
      this.clearCommand = new Cesium.ClearCommand({
        color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
        depth: 1.0,
        framebuffer: this.framebuffer,
        pass: Cesium.Pass.OPAQUE
      });
    }
  }

  _createClass(CustomPrimitive, [{
    key: "createCommand",
    value: function createCommand(context) {
      switch (this.commandType) {
        case 'Draw':
          {
            var vertexArray = Cesium.VertexArray.fromGeometry({
              context: context,
              geometry: this.geometry,
              attributeLocations: this.attributeLocations,
              bufferUsage: Cesium.BufferUsage.STATIC_DRAW
            });
            var shaderProgram = Cesium.ShaderProgram.fromCache({
              context: context,
              attributeLocations: this.attributeLocations,
              vertexShaderSource: this.vertexShaderSource,
              fragmentShaderSource: this.fragmentShaderSource
            });
            var renderState = Cesium.RenderState.fromCache(this.rawRenderState);
            return new Cesium.DrawCommand({
              owner: this,
              vertexArray: vertexArray,
              primitiveType: this.primitiveType,
              uniformMap: this.uniformMap,
              modelMatrix: Cesium.Matrix4.IDENTITY,
              shaderProgram: shaderProgram,
              framebuffer: this.framebuffer,
              renderState: renderState,
              pass: Cesium.Pass.OPAQUE
            });
          }

        case 'Compute':
          {
            return new Cesium.ComputeCommand({
              owner: this,
              fragmentShaderSource: this.fragmentShaderSource,
              uniformMap: this.uniformMap,
              outputTexture: this.outputTexture,
              persists: true
            });
          }
      }
    }
  }, {
    key: "setGeometry",
    value: function setGeometry(context, geometry) {
      this.geometry = geometry;
      var vertexArray = Cesium.VertexArray.fromGeometry({
        context: context,
        geometry: this.geometry,
        attributeLocations: this.attributeLocations,
        bufferUsage: Cesium.BufferUsage.STATIC_DRAW
      });
      this.commandToExecute.vertexArray = vertexArray;
    }
  }, {
    key: "update",
    value: function update(frameState) {
      if (!this.show) {
        return;
      }

      if (!Cesium.defined(this.commandToExecute)) {
        this.commandToExecute = this.createCommand(frameState.context);
      }

      if (Cesium.defined(this.preExecute)) {
        this.preExecute();
      }

      if (Cesium.defined(this.clearCommand)) {
        frameState.commandList.push(this.clearCommand);
      }

      frameState.commandList.push(this.commandToExecute);
    }
  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return false;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (Cesium.defined(this.commandToExecute)) {
        this.commandToExecute.shaderProgram = this.commandToExecute.shaderProgram && this.commandToExecute.shaderProgram.destroy();
      }

      return Cesium.destroyObject(this);
    }
  }]);

  return CustomPrimitive;
}();

export default CustomPrimitive;
