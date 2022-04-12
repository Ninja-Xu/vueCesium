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

var Projection = /*#__PURE__*/function () {
  function Projection() {
    _classCallCheck(this, Projection);
  }

  _createClass(Projection, [{
    key: "lngLatToPoint",
    value: function lngLatToPoint() {
      throw new Error('lngLatToPoint方法未实现');
    }
  }, {
    key: "pointToLngLat",
    value: function pointToLngLat() {
      throw new Error('pointToLngLat方法未实现');
    }
  }]);

  return Projection;
}();

export default Projection;
