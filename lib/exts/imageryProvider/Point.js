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
import _defineProperty from '@babel/runtime-corejs2/helpers/esm/defineProperty';
import _parseFloat from '@babel/runtime-corejs2/core-js/parse-float';

var Point = /*#__PURE__*/function () {
  function Point(lng, lat) {
    _classCallCheck(this, Point);

    // 新增base64支持 - by jz
    if (isNaN(lng)) {
      // lng = decode64(lng)
      lng = isNaN(lng) ? 0 : lng;
    }

    if (isString(lng)) {
      lng = _parseFloat(lng);
    }

    if (isNaN(lat)) {
      // lat = decode64(lat)
      lat = isNaN(lat) ? 0 : lat;
    }

    if (isString(lat)) {
      lat = _parseFloat(lat);
    }

    this.lng = lng;
    this.lat = lat;
  }

  _createClass(Point, [{
    key: "equals",
    value: function equals(other) {
      return other && this.lat === other.lat && this.lng === other.lng;
    }
  }]);

  return Point;
}();
/**
 * 是否是字符串
 * @param {Mix}
 * @returns {Boolean}
 */


_defineProperty(Point, "isInRange", function (pt) {
  return pt && pt.lng <= 180 && pt.lng >= -180 && pt.lat <= 74 && pt.lat >= -74;
});

function isString(string) {
  return typeof string === 'string';
}

export default Point;
