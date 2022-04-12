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

var VisibilityState = /*#__PURE__*/function () {
  function VisibilityState() {
    _classCallCheck(this, VisibilityState);

    this.states = new Cesium.ManagedArray();
    this.count = 0;
  }

  _createClass(VisibilityState, [{
    key: "hidePrimitiveCollection",
    value: function hidePrimitiveCollection(primitiveCollection) {
      var _Cesium = Cesium,
          PrimitiveCollection = _Cesium.PrimitiveCollection,
          Cesium3DTileset = _Cesium.Cesium3DTileset,
          Model = _Cesium.Model;
      var length = primitiveCollection.length;

      for (var i = 0; i < length; i++) {
        var primitive = primitiveCollection.get(i);

        if (primitive instanceof PrimitiveCollection) {
          this.hidePrimitiveCollection(primitive);
        } else {
          this.states.push(primitive.show);
          primitive instanceof Cesium3DTileset || primitive instanceof Model || (primitive.show = false);
        }
      }
    }
  }, {
    key: "restorePrimitiveCollection",
    value: function restorePrimitiveCollection(primitiveCollection) {
      var _Cesium2 = Cesium,
          PrimitiveCollection = _Cesium2.PrimitiveCollection;
      var length = primitiveCollection.length;

      for (var i = 0; i < length; i++) {
        var primitive = primitiveCollection.get(i);

        if (primitive instanceof PrimitiveCollection) {
          this.restorePrimitiveCollection(primitive);
        } else {
          primitive.show = this.states.get(this.count++);
        }
      }
    }
  }, {
    key: "hide",
    value: function hide(scene) {
      this.states.length = 0;
      this.hidePrimitiveCollection(scene.primitives);
      this.hidePrimitiveCollection(scene.groundPrimitives);
    }
  }, {
    key: "restore",
    value: function restore(scene) {
      this.count = 0;
      this.restorePrimitiveCollection(scene.primitives);
      this.restorePrimitiveCollection(scene.groundPrimitives);
    }
  }]);

  return VisibilityState;
}();

export default VisibilityState;
