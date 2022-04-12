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
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs2/core-js/object/get-own-property-descriptor';

var PolylineTrailMaterialProperty = /*#__PURE__*/function () {
  function PolylineTrailMaterialProperty(color, duration, imageUrl, loop) {
    _classCallCheck(this, PolylineTrailMaterialProperty);

    if (!_Object$getOwnPropertyDescriptor(PolylineTrailMaterialProperty.prototype, 'color')) {
      Object.defineProperties(PolylineTrailMaterialProperty.prototype, {
        color: Cesium.createPropertyDescriptor('color')
      });
    }

    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this.color = color;
    this._duration = duration;
    this._time = new Date().getTime();
    this._imageUrl = imageUrl;
    this._loop = loop;
    this.init();
  }

  _createClass(PolylineTrailMaterialProperty, [{
    key: "init",
    value: function init() {
      var PolylineTrailType = 'PolylineTrail';
      var PolylineTrailImage = this._imageUrl;
      var PolylineTrailSource = "\n      czm_material czm_getMaterial(czm_materialInput materialInput)\n      {\n        czm_material material = czm_getDefaultMaterial(materialInput);\n        vec2 st = materialInput.st;\n        vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n        material.alpha = colorImage.a * color.a;\n        material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n        return material;\n      }"; // material.alpha:透明度; material.diffuse：颜色;

      Cesium.Material._materialCache.addMaterial(PolylineTrailType, {
        fabric: {
          type: PolylineTrailType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 1),
            image: PolylineTrailImage,
            time: 0,
            repeat: new Cesium.Cartesian2(1, 1),
            axisY: false
          },
          source: PolylineTrailSource
        },
        translucent: function translucent() {
          return true;
        }
      });
    }
  }, {
    key: "getType",
    value: function getType() {
      return 'PolylineTrail';
    }
  }, {
    key: "getValue",
    value: function getValue(time, result) {
      if (!Cesium.defined(result)) {
        result = {};
      }

      if (this.lastTime >= 0.99 && !this._loop) {
        return result;
      }

      result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
      result.image = this._imageUrl;
      result.time = (new Date().getTime() - this._time) % this._duration / this._duration;
      this.lastTime = result.time;
      return result;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this === other || other instanceof PolylineTrailMaterialProperty && Cesium.Property.equals(this._color, other._other);
    }
  }, {
    key: "isConstant",
    get: function get() {
      return false;
    }
  }, {
    key: "definitionChanged",
    get: function get() {
      return this._definitionChanged;
    }
  }]);

  return PolylineTrailMaterialProperty;
}();

export default PolylineTrailMaterialProperty;
