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

var Pixel = /*#__PURE__*/function () {
  function Pixel(x, y) {
    _classCallCheck(this, Pixel);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Pixel, [{
    key: "equals",
    value: function equals(other) {
      return other && other.x === this.x && other.y === this.y;
    }
  }]);

  return Pixel;
}();

export default Pixel;
