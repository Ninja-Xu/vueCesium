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
import BaiduMapMercatorTilingScheme from './BaiduMapTilingScheme';

var BaiduMapImageryProvider = /*#__PURE__*/function () {
  function BaiduMapImageryProvider(options) {
    _classCallCheck(this, BaiduMapImageryProvider);

    var _Cesium = Cesium,
        Resource = _Cesium.Resource,
        defaultValue = _Cesium.defaultValue,
        Credit = _Cesium.Credit,
        when = _Cesium.when,
        Event = _Cesium.Event;
    this._url = options.url || "".concat(options.protocol, "://{s}.map.bdimg.com/onlinelabel/?qt=tile&styles=pl&x={x}&y={y}&z={z}");
    var resource = Resource.createIfNeeded(this._url);
    resource.appendForwardSlash();
    this._ready = false;
    this._resource = resource;
    this._tileDiscardPolicy = options.tileDiscardPolicy;
    this._tileWidth = 256;
    this._tileHeight = 256;
    this._minimumLevel = options.maximumLevel || 0;
    this._maximumLevel = options.maximumLevel || 18;
    this._tilingScheme = new BaiduMapMercatorTilingScheme(options);
    this._rectangle = defaultValue(options.rectangle, this._tilingScheme.rectangle);
    var credit = options.credit;

    if (typeof credit === 'string') {
      credit = new Credit(credit);
    }

    this._credit = credit;
    this.enablePickFeatures = defaultValue(options.enablePickFeatures, false);
    this._hasAlphaChannel = defaultValue(options.hasAlphaChannel, true);
    this._subdomains = defaultValue(options.subdomains, ['online0', 'online1', 'online2', 'online3', 'online4', 'online5', 'online6', 'online7', 'online8', 'online9']);
    this._errorEvent = new Event();
    this._readyPromise = when.defer();
    this._ready = true;

    this._readyPromise.resolve(true);
  }

  _createClass(BaiduMapImageryProvider, [{
    key: "url",
    get: function get() {
      return this._resource._url;
    }
  }, {
    key: "proxy",
    get: function get() {
      return this._resource.proxy;
    }
  }, {
    key: "tileWidth",
    get: function get() {
      if (!this._ready) {
        throw new Cesium.DeveloperError('tileWidth must not be called before the imagery provider is ready.');
      }

      return this._tileWidth;
    }
  }, {
    key: "tileHeight",
    get: function get() {
      if (!this._ready) {
        throw new Cesium.DeveloperError('tileHeight must not be called before the imagery provider is ready.');
      }

      return this._tileHeight;
    }
  }, {
    key: "maximumLevel",
    get: function get() {
      if (!this._ready) {
        throw new Cesium.DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
      }

      return this._maximumLevel;
    }
  }, {
    key: "minimumLevel",
    get: function get() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
      }

      return this._minimumLevel;
    }
  }, {
    key: "tilingScheme",
    get: function get() {
      if (!this._ready) {
        throw new Cesium.DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
      }

      return this._tilingScheme;
    }
  }, {
    key: "rectangle",
    get: function get() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('rectangle must not be called before the imagery provider is ready.');
      }

      return this._rectangle;
    }
  }, {
    key: "tileDiscardPolicy",
    get: function get() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.');
      }

      return this._tileDiscardPolicy;
    }
  }, {
    key: "errorEvent",
    get: function get() {
      return this._errorEvent;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }, {
    key: "readyPromise",
    get: function get() {
      return this._readyPromise.promise;
    }
  }, {
    key: "credit",
    get: function get() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('credit must not be called before the imagery provider is ready.');
      }

      return this._credit;
    }
  }, {
    key: "hasAlphaChannel",
    get: function get() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('hasAlphaChannel must not be called before the imagery provider is ready.');
      }

      return this._hasAlphaChannel;
    }
  }, {
    key: "getTileCredits",
    value: function getTileCredits(x, y, level) {
      if (!this.ready) {
        throw new Cesium.DeveloperError('getTileCredits must not be called before the imagery provider is ready.');
      }

      return undefined;
    }
  }, {
    key: "requestImage",
    value: function requestImage(x, y, level, request) {
      if (!this.ready) {
        throw new Cesium.DeveloperError('requestImage must not be called before the imagery provider is ready.');
      }

      return Cesium.ImageryProvider.loadImage(this, buildImageResource.call(this, x, y, level, request));
    }
  }]);

  return BaiduMapImageryProvider;
}();

function buildImageResource(x, y, level, request) {
  var url = this._url;
  var subdomains = this._subdomains;
  url = url.replace('{s}', subdomains[(x + y + level) % subdomains.length]).replace('{x}', x).replace('{y}', -y).replace('{z}', level);

  var resource = this._resource.getDerivedResource({
    url: url,
    request: request
  });

  return resource;
}

export default BaiduMapImageryProvider;
