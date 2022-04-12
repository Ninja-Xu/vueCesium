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
import _Reflect$construct from '@babel/runtime-corejs2/core-js/reflect/construct';
import _classCallCheck from '@babel/runtime-corejs2/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime-corejs2/helpers/esm/createClass';
import _inherits from '@babel/runtime-corejs2/helpers/esm/inherits';
import _possibleConstructorReturn from '@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime-corejs2/helpers/esm/getPrototypeOf';
import _defineProperty from '@babel/runtime-corejs2/helpers/esm/defineProperty';
import Projection from './Projection';
import Point from './Point';
import Pixel from './Pixel';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Projection used by [Baidu Map]{@link https://github.com/openlayers/openlayers/issues/3522}
 */

var BaiduMapMercatorProjection = /*#__PURE__*/function (_Projection) {
  _inherits(BaiduMapMercatorProjection, _Projection);

  var _super = _createSuper(BaiduMapMercatorProjection);

  function BaiduMapMercatorProjection() {
    _classCallCheck(this, BaiduMapMercatorProjection);

    return _super.apply(this, arguments);
  }

  _createClass(BaiduMapMercatorProjection, [{
    key: "lngLatToMercator",
    value: // constructor () {
    //   super()
    // }

    /**
     * 根据平面直角坐标计算两点间距离;
     * @param {Point} point1 平面直角点坐标1
     * @param {Point} point2 平面直角点坐标2;
     * @return {Number} 返回两点间的距离
     */

    /**
     * 根据经纬度坐标计算两点间距离;
     * @param {Point} point1 经纬度点坐标1
     * @param {Point} point2 经纬度点坐标2;
     * @return {Number} 返回两点间的距离
     */

    /**
     * 平面直角坐标转换成经纬度坐标;
     * @param {Point} point 平面直角坐标
     * @return {Point} 返回经纬度坐标
     */

    /**
     * 经纬度坐标转换成平面直角坐标;
     * @param {Point} point 经纬度坐标
     * @return {Point} 返回平面直角坐标
     */

    /**
     * 经纬度变换至墨卡托坐标
     * @param Point 经纬度
     * @return Point 墨卡托
     */
    function lngLatToMercator(point) {
      return BaiduMapMercatorProjection.convertLL2MC(point);
    }
    /**
     * 球面到平面坐标
     * @param Point 球面坐标
     * @return Pixel 平面坐标
     */

  }, {
    key: "lngLatToPoint",
    value: function lngLatToPoint(point) {
      var mercator = BaiduMapMercatorProjection.convertLL2MC(point);
      return new Pixel(mercator.lng, mercator.lat);
    }
    /**
     * 墨卡托变换至经纬度
     * @param Point 墨卡托
     * @returns Point 经纬度
     */

  }, {
    key: "mercatorToLngLat",
    value: function mercatorToLngLat(point) {
      return BaiduMapMercatorProjection.convertMC2LL(point);
    }
    /**
     * 平面到球面坐标
     * @param Pixel 平面坐标
     * @returns Point 球面坐标
     */

  }, {
    key: "pointToLngLat",
    value: function pointToLngLat(point) {
      var mercator = new Point(point.x, point.y);
      return BaiduMapMercatorProjection.convertMC2LL(mercator);
    }
    /**
     * 地理坐标转换至像素坐标
     * @param Point 地理坐标
     * @param Number 级别
     * @param Point 地图中心点，注意为了保证没有误差，这里需要传递墨卡托坐标
     * @param Size 地图容器大小
     * @return Pixel 像素坐标
     */

  }, {
    key: "pointToPixel",
    value: function pointToPixel(point, zoom, mapCenter, mapSize, curCity) {
      if (!point) {
        return;
      }

      point = this.lngLatToMercator(point, curCity);
      mapCenter = this.lngLatToMercator(mapCenter);
      var zoomUnits = this.getZoomUnits(zoom);
      var x = Math.round((point.lng - mapCenter.lng) / zoomUnits + mapSize.width / 2);
      var y = Math.round((mapCenter.lat - point.lat) / zoomUnits + mapSize.height / 2);
      return new Pixel(x, y);
    }
    /**
     * 像素坐标转换至地理坐标
     * @param Pixel 像素坐标
     * @param Number 级别
     * @param Point 地图中心点，注意为了保证没有误差，这里需要传递墨卡托坐标
     * @param Size 地图容器大小
     * @return Point 地理坐标
     */

  }, {
    key: "pixelToPoint",
    value: function pixelToPoint(pixel, zoom, mapCenter, mapSize, curCity) {
      if (!pixel) {
        return;
      }

      var zoomUnits = this.getZoomUnits(zoom);
      var lng = mapCenter.lng + zoomUnits * (pixel.x - mapSize.width / 2);
      var lat = mapCenter.lat - zoomUnits * (pixel.y - mapSize.height / 2);
      var point = new Point(lng, lat);
      return this.mercatorToLngLat(point, curCity);
    }
  }, {
    key: "getZoomUnits",
    value: function getZoomUnits(zoom) {
      return Math.pow(2, 18 - zoom);
    }
  }]);

  return BaiduMapMercatorProjection;
}(Projection);

_defineProperty(BaiduMapMercatorProjection, "EARTHRADIUS", 6370996.81);

_defineProperty(BaiduMapMercatorProjection, "MCBAND", [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0]);

_defineProperty(BaiduMapMercatorProjection, "LLBAND", [75, 60, 45, 30, 15, 0]);

_defineProperty(BaiduMapMercatorProjection, "MC2LL", [[1.410526172116255e-8, 8.98305509648872e-6, -1.9939833816331, 2.009824383106796e2, -1.872403703815547e2, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812e7], [-7.435856389565537e-9, 8.983055097726239e-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486e7], [-3.030883460898826e-8, 8.98305509983578e-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6.85681737e6], [-1.981981304930552e-8, 8.983055099779535e-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4.48277706e6], [3.09191371068437e-9, 8.983055096812155e-6, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2.5551644e6], [2.890871144776878e-9, 8.983055095805407e-6, -0.00000003068298, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 8.260885e5]]);

_defineProperty(BaiduMapMercatorProjection, "LL2MC", [[-0.0015702102444, 1.113207020616939e5, 1.704480524535203e15, -1.033898737604234e16, 2.611266785660388e16, -3.51496691766537e16, 2.659570071840392e16, -1.072501245418824e16, 1.800819912950474e15, 82.5], [8.277824516172526e-4, 1.113207020463578e5, // eslint-disable-next-line no-loss-of-precision
6.477955746671608e8, -4.082003173641316e9, 1.077490566351142e10, -1.517187553151559e10, 1.205306533862167e10, -5.124939663577472e9, 9.133119359512032e8, 67.5], [0.00337398766765, 1.113207020202162e5, 4.481351045890365e6, -2.339375119931662e7, 7.968221547186455e7, -1.159649932797253e8, 9.723671115602145e7, -4.366194633752821e7, 8.477230501135234e6, 52.5], [0.00220636496208, 1.113207020209128e5, 5.175186112841131e4, 3.796837749470245e6, 9.920137397791013e5, -1.22195221711287e6, 1.340652697009075e6, -6.209436990984312e5, 1.444169293806241e5, 37.5], [-3.441963504368392e-4, 1.113207020576856e5, 2.782353980772752e2, 2.485758690035394e6, 6.070750963243378e3, 5.482118345352118e4, 9.540606633304236e3, -2.71055326746645e3, 1.405483844121726e3, 22.5], [-3.218135878613132e-4, 1.113207020701615e5, 0.00369383431289, 8.237256402795718e5, 0.46104986909093, 2.351343141331292e3, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]]);

_defineProperty(BaiduMapMercatorProjection, "getDistanceByMC", function (point1, point2) {
  if (!point1 || !point2) return 0;
  point1 = this.convertMC2LL(point1);
  if (!point1) return 0;
  var x1 = this.toRadians(point1.lng);
  var y1 = this.toRadians(point1.lat);
  point2 = this.convertMC2LL(point2);
  if (!point2) return 0;
  var x2 = this.toRadians(point2.lng);
  var y2 = this.toRadians(point2.lat);
  return this.getDistance(x1, x2, y1, y2);
});

_defineProperty(BaiduMapMercatorProjection, "getDistanceByLL", function (point1, point2) {
  if (!point1 || !point2) return 0;
  point1.lng = this.getLoop(point1.lng, -180, 180);
  point1.lat = this.getRange(point1.lat, -74, 74);
  point2.lng = this.getLoop(point2.lng, -180, 180);
  point2.lat = this.getRange(point2.lat, -74, 74);
  var x1 = this.toRadians(point1.lng);
  var y1 = this.toRadians(point1.lat);
  var x2 = this.toRadians(point2.lng);
  var y2 = this.toRadians(point2.lat);
  return this.getDistance(x1, x2, y1, y2);
});

_defineProperty(BaiduMapMercatorProjection, "convertMC2LL", function (point) {
  var factor;
  var temp = new Point(Math.abs(point.lng), Math.abs(point.lat));

  for (var i = 0; i < this.MCBAND.length; i++) {
    if (temp.lat >= this.MCBAND[i]) {
      factor = this.MC2LL[i];
      break;
    }
  }

  var lnglat = this.convertor(point, factor);
  return new Point(lnglat.lng.toFixed(6), lnglat.lat.toFixed(6));
});

_defineProperty(BaiduMapMercatorProjection, "convertLL2MC", function (point) {
  var factor;
  point.lng = this.getLoop(point.lng, -180, 180);
  point.lat = this.getRange(point.lat, -74, 74);
  var temp = new Point(point.lng, point.lat);

  for (var i = 0; i < this.LLBAND.length; i++) {
    if (temp.lat >= this.LLBAND[i]) {
      factor = this.LL2MC[i];
      break;
    }
  }

  if (!factor) {
    for (var _i = this.LLBAND.length - 1; _i >= 0; _i--) {
      if (temp.lat <= -this.LLBAND[_i]) {
        factor = this.LL2MC[_i];
        break;
      }
    }
  }

  var mc = this.convertor(point, factor);
  return new Point(mc.lng.toFixed(2), mc.lat.toFixed(2));
});

_defineProperty(BaiduMapMercatorProjection, "convertor", function (fromPoint, factor) {
  if (!fromPoint || !factor) {
    return;
  }

  var x = factor[0] + factor[1] * Math.abs(fromPoint.lng);
  var temp = Math.abs(fromPoint.lat) / factor[9];
  var y = factor[2] + factor[3] * temp + factor[4] * temp * temp + factor[5] * temp * temp * temp + factor[6] * temp * temp * temp * temp + factor[7] * temp * temp * temp * temp * temp + factor[8] * temp * temp * temp * temp * temp * temp;
  x *= fromPoint.lng < 0 ? -1 : 1;
  y *= fromPoint.lat < 0 ? -1 : 1;
  return new Point(x, y);
});

_defineProperty(BaiduMapMercatorProjection, "getDistance", function (x1, x2, y1, y2) {
  return this.EARTHRADIUS * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1));
});

_defineProperty(BaiduMapMercatorProjection, "toRadians", function (angdeg) {
  return Math.PI * angdeg / 180;
});

_defineProperty(BaiduMapMercatorProjection, "toDegrees", function (angrad) {
  return 180 * angrad / Math.PI;
});

_defineProperty(BaiduMapMercatorProjection, "getRange", function (v, a, b) {
  if (a != null) {
    v = Math.max(v, a);
  }

  if (b != null) {
    v = Math.min(v, b);
  }

  return v;
});

_defineProperty(BaiduMapMercatorProjection, "getLoop", function (v, a, b) {
  while (v > b) {
    v -= b - a;
  }

  while (v < a) {
    v += b - a;
  }

  return v;
});

export default BaiduMapMercatorProjection;
