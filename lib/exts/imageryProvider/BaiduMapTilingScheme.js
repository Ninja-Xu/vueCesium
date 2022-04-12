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
import BaiduMapMercatorProjection from './BaiduMapMercatorProjection';
import Point from './Point';
import { wgs84togcj02, gcj02tobd09, bd09togcj02, gcj02towgs84 } from '../../utils/coordtransform';

/**
 * A tiling scheme for geometry referenced to a BaiduMapMercatorProjection {@link https://cesium.com/docs/cesiumjs-ref-doc/WebMercatorTilingScheme.html}
 * {@link https://github.com/openlayers/openlayers/issues/3522#issuecomment-570493906}
 */

var BaiduMapMercatorTilingScheme = /*#__PURE__*/function () {
  function BaiduMapMercatorTilingScheme(options) {
    _classCallCheck(this, BaiduMapMercatorTilingScheme);

    var _Cesium = Cesium,
        defaultValue = _Cesium.defaultValue,
        Ellipsoid = _Cesium.Ellipsoid,
        WebMercatorProjection = _Cesium.WebMercatorProjection,
        Cartesian2 = _Cesium.Cartesian2,
        Cartographic = _Cesium.Cartographic,
        CesiumMath = _Cesium.Math,
        Rectangle = _Cesium.Rectangle;
    options = options || {};
    this._ellipsoid = defaultValue(options.ellipsoid, Ellipsoid.WGS84);
    this._projection = new WebMercatorProjection(this._ellipsoid);
    var projection = new BaiduMapMercatorProjection();

    this._projection.project = function (cartographic, result) {
      result = result || {};

      if (options.toWGS84) {
        result = wgs84togcj02(CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude));
        result = gcj02tobd09(result[0], result[1]);
      } else {
        result = gcj02tobd09(CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude));
      }

      result[0] = Math.min(result[0], 180);
      result[0] = Math.max(result[0], -180);
      result[1] = Math.min(result[1], 74.000022);
      result[1] = Math.max(result[1], -71.988531);
      result = projection.lngLatToPoint(new Point(result[0], result[1]));
      return new Cartesian2(result.x, result.y);
    };

    this._projection.unproject = function (cartographic, result) {
      result = result || {};
      result = projection.mercatorToLngLat(new Point(cartographic.x, cartographic.y));
      result[0] = (result[0] + 180) % 360 - 180;

      if (options.toWGS84) {
        result = bd09togcj02(result.lng, result.lat);
        result = gcj02towgs84(result[0], result[1]);
      } else {
        result = bd09togcj02(result.lng, result.lat);
      }

      return new Cartographic(Cesium.Math.toRadians(result[0]), Cesium.Math.toRadians(result[1]));
    };

    this._rectangleSouthwestInMeters = new Cartesian2(-20037726.37, -12474104.17);
    this._rectangleNortheastInMeters = new Cartesian2(20037726.37, 12474104.17);

    var rectangleSouthwestInMeters = this._projection.unproject(this._rectangleSouthwestInMeters);

    var rectangleNortheastInMeters = this._projection.unproject(this._rectangleNortheastInMeters);

    this._rectangle = new Rectangle(rectangleSouthwestInMeters.longitude, rectangleSouthwestInMeters.latitude, rectangleNortheastInMeters.longitude, rectangleNortheastInMeters.latitude);
    this.resolutions = [];

    for (var i = 0; i < 19; i++) {
      this.resolutions[i] = 256 * Math.pow(2, 18 - i);
    }
  }

  _createClass(BaiduMapMercatorTilingScheme, [{
    key: "getNumberOfXTilesAtLevel",
    value: function getNumberOfXTilesAtLevel(level) {
      return 1 << level;
    }
  }, {
    key: "getNumberOfYTilesAtLevel",
    value: function getNumberOfYTilesAtLevel(level) {
      return 1 << level;
    }
  }, {
    key: "rectangleToNativeRectangle",
    value: function rectangleToNativeRectangle(rectangle, result) {
      var _Cesium2 = Cesium,
          defined = _Cesium2.defined,
          Rectangle = _Cesium2.Rectangle;
      var projection = this._projection;
      var southwest = projection.project(Rectangle.southwest(rectangle));
      var northeast = projection.project(Rectangle.northeast(rectangle));

      if (!defined(result)) {
        return new Rectangle(southwest.x, southwest.y, northeast.x, northeast.y);
      }

      result.west = southwest.x;
      result.south = southwest.y;
      result.east = northeast.x;
      result.north = northeast.y;
      return result;
    }
  }, {
    key: "tileXYToNativeRectangle",
    value: function tileXYToNativeRectangle(x, y, level, result) {
      var _Cesium3 = Cesium,
          defined = _Cesium3.defined,
          Rectangle = _Cesium3.Rectangle;
      var tileWidth = this.resolutions[level];
      var west = x * tileWidth;
      var east = (x + 1) * tileWidth;
      var north = ((y = -y) + 1) * tileWidth;
      var south = y * tileWidth;

      if (!defined(result)) {
        return new Rectangle(west, south, east, north);
      }

      result.west = west;
      result.south = south;
      result.east = east;
      result.north = north;
      return result;
    }
  }, {
    key: "tileXYToRectangle",
    value: function tileXYToRectangle(x, y, level, result) {
      var _Cesium4 = Cesium,
          Cartesian2 = _Cesium4.Cartesian2;
      var nativeRectangle = this.tileXYToNativeRectangle(x, y, level, result);
      var projection = this._projection;
      var southwest = projection.unproject(new Cartesian2(nativeRectangle.west, nativeRectangle.south));
      var northeast = projection.unproject(new Cartesian2(nativeRectangle.east, nativeRectangle.north));
      nativeRectangle.west = southwest.longitude;
      nativeRectangle.south = southwest.latitude;
      nativeRectangle.east = northeast.longitude;
      nativeRectangle.north = northeast.latitude;
      return nativeRectangle;
    }
  }, {
    key: "positionToTileXY",
    value: function positionToTileXY(position, level, result) {
      var _Cesium5 = Cesium,
          Rectangle = _Cesium5.Rectangle,
          defined = _Cesium5.defined,
          Cartesian2 = _Cesium5.Cartesian2;
      var rectangle = this._rectangle;

      if (!Rectangle.contains(rectangle, position)) {
        // outside the bounds of the tiling scheme
        return undefined;
      }

      var projection = this._projection;
      var webMercatorPosition = projection.project(position);

      if (!defined(webMercatorPosition)) {
        return undefined;
      }

      var tileWidth = this.resolutions[level];
      var xTileCoordinate = Math.floor(webMercatorPosition.x / tileWidth);
      var yTileCoordinate = -Math.floor(webMercatorPosition.y / tileWidth);

      if (!defined(result)) {
        return new Cartesian2(xTileCoordinate, yTileCoordinate);
      }

      result.x = xTileCoordinate;
      result.y = yTileCoordinate;
      return result;
    }
  }, {
    key: "ellipsoid",
    get: function get() {
      return this._ellipsoid;
    }
  }, {
    key: "rectangle",
    get: function get() {
      return this._rectangle;
    }
  }, {
    key: "projection",
    get: function get() {
      return this._projection;
    }
  }]);

  return BaiduMapMercatorTilingScheme;
}();

export default BaiduMapMercatorTilingScheme;
