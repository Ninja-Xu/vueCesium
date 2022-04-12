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
import _parseInt from '@babel/runtime-corejs2/core-js/parse-int';

/**
 * 操作状态。
 */
var Status = {
  NONE: 0,
  STORING: 1,
  STORED: 2,
  FAILED: 3
};
/**
 * 操作浏览器数据库 IndexedDB 类
 */

var IndexedDBScheduler = /*#__PURE__*/function () {
  /**
   *
   * @param {Object} options
   */
  function IndexedDBScheduler(options) {
    _classCallCheck(this, IndexedDBScheduler);

    if (!Cesium.defined(options.name)) {
      throw new Cesium.DeveloperError('options.name is required.');
    }

    var deferred = Cesium.when.defer();
    this.dbname = options.name;
    var dbRequest = window.indexedDB.open(this.dbname);
    var that = this;

    dbRequest.onsuccess = function (event) {
      that.db = event.target.result;
      that.version = that.db.version;
      that.cachestatus = that.cachestatus || {};
      deferred.resolve(that);
    };

    dbRequest.onupgradeneeded = function (event) {
      that.db = event.target.result;
      that.version = that.db.version;
      deferred.resolve(that);
    };

    dbRequest.onerror = function (event) {
      that.db = null;
      deferred.reject('create database fail, error code : ' + event.target.errorcode);
    };

    this.layer = options.layer || null;
    this.storageType = options.storageType || 'arrayBuffer';
    this.creatingTable = !1;
    this.cachestatus = {};
    return deferred.promise;
  }
  /**
   * 检查对象仓库是否存在。
   * @param {String} storeName 对象仓库（表）名称
   */


  _createClass(IndexedDBScheduler, [{
    key: "checkObjectStoreExist",
    value: function checkObjectStoreExist(storeName) {
      return Cesium.defined(this.db) ? this.db.objectStoreNames.contains(storeName) : false;
    }
    /**
    *  创建 IndexedDB 浏对象仓库，IndexedDB 是浏览器提供的本地数据库
    * @param {String} storeName 对象仓库（表）名称
    * @returns {Promise}
    */

  }, {
    key: "createObjectStore",
    value: function createObjectStore(storeName) {
      var deferred = Cesium.when.defer();

      if (this.creatingTable) {
        deferred.reject(false);
      } else {
        if (this.db.objectStoreNames.contains(storeName)) {
          deferred.reject(false);
          return deferred.promise;
        }

        this.creatingTable = true;

        var version = _parseInt(this.db.version);

        this.db.close();
        var that = this; // 打开或新建 IndexedDB 数据库

        var dbRequest = window.indexedDB.open(this.dbname, version + 1);

        dbRequest.onupgradeneeded = function (event) {
          var db = event.target.result;
          that.db = db; // 创建对象仓库（表）

          var objectStore = db.createObjectStore(storeName, {
            keyPath: 'id'
          });

          if (Cesium.defined(objectStore)) {
            // 创建索引
            objectStore.createIndex('value', 'value', {
              unique: false
            });
            that.creatingTable = false;
            that.cachestatus = that.cachestatus || {};
            that.cachestatus[storeName] = {};
            that.db.close();

            var _dbRequest = window.indexedDB.open(that.dbname);

            _dbRequest.onsuccess = function (event) {
              that.db = event.target.result;
              deferred.resolve(true);
            };
          } else {
            that.creatingTable = false;
            deferred.resolve(false);
          }
        };

        dbRequest.onsuccess = function (event) {
          event.target.result.close();
          deferred.resolve(true);
        };

        dbRequest.onerror = function (event) {
          that.creatingTable = false;
          deferred.reject(false);
        };
      }

      return deferred.promise;
    }
    /**
     * 向对象仓库写入数据记录。
     * @param {String} storeName 对象仓库（表）名称
     * @param {Number} id 主键
     * @param {*} value 值
     * @returns {Promise}
     */

  }, {
    key: "putElementInDB",
    value: function putElementInDB(storeName, id, value) {
      var deferred = Cesium.when.defer();

      if (!Cesium.defined(this.db)) {
        deferred.reject(false);
        return deferred.promise;
      }

      var cachestatus = this.cachestatus,
          db = this.db;

      if (Cesium.defined(cachestatus[storeName]) && Cesium.defined(cachestatus[storeName][id] && (cachestatus[storeName][id] === Status.STORING || cachestatus[storeName][id] === Status.STORED))) {
        deferred.resolve(false);
        return deferred.promise;
      }

      if (db.objectStoreNames.contains(storeName)) {
        cachestatus[storeName] = cachestatus[storeName] || {};

        try {
          var request = db.transaction([storeName], 'readwrite').objectStore(storeName).add({
            id: id,
            value: value
          });
          cachestatus[storeName][id] = Status.STORING;

          request.onsuccess = function (event) {
            cachestatus[storeName][id] = Status.STORED;
            deferred.resolve(true);
          };

          request.onerror = function (event) {
            cachestatus[storeName][id] = Status.FAILED;
            deferred.resolve(false);
          };
        } catch (error) {
          deferred.reject(null);
          return deferred.promise;
        }
      } else {
        this.createObjectStore(storeName).then(function () {
          var request = db.transaction([storeName], 'readwrite').objectStore(storeName).add({
            id: id,
            value: value
          });

          request.onsuccess = function (e) {
            deferred.resolve(true);
          };

          request.onerror = function (e) {
            deferred.reject(false);
          };
        }, function () {
          deferred.reject(false);
        });
      }

      return deferred.promise;
    }
    /**
     * 向对象仓库读取数据。
     * @param {String} storeName 对象仓库（表）名称
     * @param {Number} id 主键
     * @returns {Promise}
     */

  }, {
    key: "getElementFromDB",
    value: function getElementFromDB(storeName, id) {
      var deferred = Cesium.when.defer();
      var db = this.db;

      if (!Cesium.defined(db)) {
        return null;
      }

      if (!db.objectStoreNames.contains(storeName)) {
        return null;
      }

      try {
        var transaction = db.transaction([storeName]);
        var objectStore = transaction.objectStore(storeName);
        var request = objectStore.get(id);

        request.onsuccess = function (e) {
          return Cesium.defined(e.target.result) ? deferred.resolve(e.target.result.value) : deferred.reject(null);
        };

        request.onerror = function (e) {
          deferred.reject(null);
        };
      } catch (error) {
        deferred.reject(null);
      }

      return deferred.promise;
    }
    /**
     * 更新数据。
     * @param {String} storeName
     * @param {Number} id
     * @param {*} value
     * @returns {Promise}
     */

  }, {
    key: "updateElementInDB",
    value: function updateElementInDB(storeName, id, value) {
      var deferred = Cesium.when.defer();
      var db = this.db;

      if (!Cesium.defined(db)) {
        deferred.resolve(false);
        return deferred.promise;
      }

      if (!db.objectStoreNames.contains(storeName)) {
        deferred.resolve(false);
        return deferred.promise;
      }

      try {
        var request = db.transaction([storeName], 'readwrite').objectStore(storeName).put({
          id: id,
          value: value
        });

        request.onsuccess = function () {
          deferred.resolve(true);
        };

        request.onerror = function () {
          deferred.resolve(false);
        };
      } catch (e) {
        deferred.resolve(false);
      }

      return deferred.promise;
    }
    /**
     * 移除数据。
     * @param {String} storeName
     * @param {Number} id
     * @returns {Promise}
     */

  }, {
    key: "removeElementFromDB",
    value: function removeElementFromDB(storeName, id) {
      var deferred = Cesium.when.defer();
      var db = this.db;

      if (!Cesium.defined(db)) {
        deferred.resolve(false);
        return deferred.promise;
      }

      if (!db.objectStoreNames.contains(storeName)) {
        deferred.resolve(false);
        return deferred.promise;
      }

      try {
        var request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id);

        request.onsuccess = function () {
          deferred.resolve(true);
        };

        request.onerror = function () {
          deferred.resolve(false);
        };
      } catch (e) {
        deferred.resolve(false);
      }

      return deferred.promise;
    }
    /**
     *  清空对象仓库
     * @param {String} storeName
     */

  }, {
    key: "clear",
    value: function clear(storeName) {
      var deferred = Cesium.when.defer();
      var db = this.db;

      if (!Cesium.defined(db)) {
        deferred.resolve(false);
        return deferred.promise;
      }

      if (!db.objectStoreNames.contains(storeName)) {
        deferred.resolve(false);
        return deferred.promise;
      }

      try {
        var request = db.transaction([storeName], 'readwrite').objectStore(storeName).clear();

        request.onsuccess = function () {
          deferred.resolve(true);
        };

        request.onerror = function () {
          deferred.resolve(false);
        };
      } catch (e) {
        deferred.resolve(false);
      }

      return deferred.promise;
    }
  }]);

  return IndexedDBScheduler;
}();

export default IndexedDBScheduler;
