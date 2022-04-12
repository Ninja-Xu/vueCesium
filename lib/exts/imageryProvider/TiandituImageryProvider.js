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
import _Object$freeze from '@babel/runtime-corejs2/core-js/object/freeze';
import TiandituMapsStyle from './TiandituMapsStyle';

var TiandituMapsStyleUrl = {};
var TiandituMapsStyleLayer = {};
var TiandituMapsStyleID = {};
var TiandituMapsStyleFormat = {};
var TiandituMapsStyleEPSG = {};
var TiandituMapsStyleLabels = {};

var TiandituImageryProvider = /*#__PURE__*/function () {
  function TiandituImageryProvider(options) {
    _classCallCheck(this, TiandituImageryProvider);

    _Object$keys(TiandituMapsStyle).forEach(function (key) {
      TiandituMapsStyleUrl[TiandituMapsStyle[key]] = options.protocol + '://{s}.tianditu.gov.cn/' + TiandituMapsStyle[key] + '/wmts';
      TiandituMapsStyleLayer[TiandituMapsStyle[key]] = TiandituMapsStyle[key].slice(0, 3);
      TiandituMapsStyleID[TiandituMapsStyle[key]] = TiandituMapsStyle[key].slice(4);
      TiandituMapsStyleFormat[TiandituMapsStyle[key]] = 'tiles';

      if (TiandituMapsStyleID[TiandituMapsStyle[key]] === 'w') {
        TiandituMapsStyleEPSG[TiandituMapsStyle[key]] = '900913';
      } else {
        TiandituMapsStyleEPSG[TiandituMapsStyle[key]] = '4490';
      }

      switch (TiandituMapsStyle[key]) {
        case 'img_w':
        case 'img_c':
        case 'cia_w':
        case 'cia_c':
        case 'cta_w':
        case 'cta_c':
          TiandituMapsStyleLabels[TiandituMapsStyle[key]] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
          break;

        case 'vec_w':
        case 'vec_c':
        case 'cva_w':
        case 'cva_c':
          TiandituMapsStyleLabels[TiandituMapsStyle[key]] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
          break;

        case 'ter_w':
        case 'ter_c':
          TiandituMapsStyleLabels[TiandituMapsStyle[key]] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
          break;

        case 'eia_w':
        case 'eia_c':
        case 'eva_w':
        case 'eva_c':
        case 'ibo_c':
        case 'ibo_w':
          TiandituMapsStyleLabels[TiandituMapsStyle[key]] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
          break;
      }
    });

    var _Cesium = Cesium,
        Credit = _Cesium.Credit,
        defaultValue = _Cesium.defaultValue,
        Event = _Cesium.Event,
        GeographicTilingScheme = _Cesium.GeographicTilingScheme,
        WebMercatorTilingScheme = _Cesium.WebMercatorTilingScheme,
        when = _Cesium.when;
    options = defaultValue(options, {});
    this._mapStyle = defaultValue(options.mapStyle, TiandituMapsStyle.IMG_W);
    this._url = options.url || defaultValue(options.url, TiandituMapsStyleUrl[this._mapStyle]);
    this._token = options.token;
    this._layer = defaultValue(options.layer, TiandituMapsStyleLayer[this._mapStyle]);
    this._style = defaultValue(options.style, 'default');
    this._tileMatrixSetID = defaultValue(options.tileMatrixSetID, TiandituMapsStyleID[this._mapStyle]);
    this._tileMatrixLabels = defaultValue(options.tileMatrixLabels, TiandituMapsStyleLabels[this._mapStyle]);
    this._format = defaultValue(options.format, TiandituMapsStyleFormat[this._mapStyle]);
    this._epsgCode = TiandituMapsStyleEPSG[this._mapStyle];
    this._tilingScheme = this._epsgCode === '900913' ? new WebMercatorTilingScheme() : new GeographicTilingScheme();
    this._tileWidth = defaultValue(options.tileWidth, 256);
    this._tileHeight = defaultValue(options.tileHeight, 256);
    this._minimumLevel = defaultValue(options.minimumLevel, 0);
    this._maximumLevel = defaultValue(options.maximumLevel, TiandituMapsStyleLabels[this._mapStyle].length);
    this._rectangle = defaultValue(options.rectangle, this.tilingScheme.rectangle);
    this._readyPromise = when.resolve(true);
    this._errorEvent = new Event();
    var credit = defaultValue(options.credit, '天地图全球影像服务');
    this._credit = typeof credit === 'string' ? new Credit(credit) : credit;
    this._subdomains = defaultValue(options.subdomains, ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']);
    this._tileDiscardPolicy = options.tileDiscardPolicy;
  }

  _createClass(TiandituImageryProvider, [{
    key: "requestImage",
    value: function requestImage(x, y, level) {
      var url = buildImageResource.call(this, x, y, level);
      return Cesium.ImageryProvider.loadImage(this, url);
    }
  }, {
    key: "pickFeatures",
    value: function pickFeatures() {}
  }, {
    key: "url",
    get: function get() {
      return this._url;
    }
  }, {
    key: "mapStyle",
    get: function get() {
      return this._mapStyle;
    }
  }, {
    key: "tileWidth",
    get: function get() {
      return this._tileWidth;
    }
  }, {
    key: "tileHeight",
    get: function get() {
      return this._tileHeight;
    }
  }, {
    key: "maximumLevel",
    get: function get() {
      return this._maximumLevel;
    }
  }, {
    key: "minimumLevel",
    get: function get() {
      return this._minimumLevel;
    }
  }, {
    key: "tilingScheme",
    get: function get() {
      return this._tilingScheme;
    }
  }, {
    key: "rectangle",
    get: function get() {
      return this._rectangle;
    }
  }, {
    key: "errorEvent",
    get: function get() {
      return this._errorEvent;
    }
  }, {
    key: "ready",
    get: function get() {
      return true;
    }
  }, {
    key: "readyPromise",
    get: function get() {
      return this._readyPromise;
    }
  }, {
    key: "credit",
    get: function get() {
      return this._credit;
    }
  }, {
    key: "hasAlphaChannel",
    get: function get() {
      return true;
    }
  }, {
    key: "tileDiscardPolicy",
    get: function get() {
      return this._tileDiscardPolicy;
    }
  }]);

  return TiandituImageryProvider;
}();
/**
 * 构建天地图影像服务url, 调用时需要改变 this 指向为 TiandituImageryProvider
 * @param {number} x
 * @param {number} y
 * @param {number} level
 * @private
 */


function buildImageResource(x, y, level) {
  var _uri$query;

  var _Cesium2 = Cesium,
      combine = _Cesium2.combine,
      defined = _Cesium2.defined,
      defaultValue = _Cesium2.defaultValue,
      queryToObject = _Cesium2.queryToObject,
      objectToQuery = _Cesium2.objectToQuery,
      Uri = _Cesium2.Uri;

  var freezeObject = _Object$freeze || function () {};

  var options = freezeObject({
    service: 'WMTS',
    version: '1.0.0',
    request: 'GetTile'
  });
  this._epsgCode === '900913' && (level -= 1);
  var tileMatrixLabels = this._tileMatrixLabels;
  var tileMatrixLabel = defined(tileMatrixLabels) ? tileMatrixLabels[level] : level.toString();
  var subdomains = this._subdomains;

  var url = this._url.replace('{s}', subdomains[(x + y + level) % subdomains.length]);

  var uri = new Uri(url);
  var obj = queryToObject(defaultValue((_uri$query = uri.query) === null || _uri$query === void 0 ? void 0 : _uri$query.call(uri), ''));
  obj = combine(options, obj);
  obj.tilematrix = tileMatrixLabel;
  obj.layer = this._layer;
  obj.style = this._style;
  obj.tilerow = y;
  obj.tilecol = x;
  obj.tilematrixset = this._tileMatrixSetID;
  obj.format = this._format;
  var query = objectToQuery(obj);
  url = uri.toString() + '?' + query;
  defined(this._proxy) && (url = this._proxy.getURL(url));
  defined(this._token) && (url += '&tk=' + this._token);
  return url;
}

export default TiandituImageryProvider;
