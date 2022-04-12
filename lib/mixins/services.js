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
import _typeof from '@babel/runtime-corejs2/helpers/esm/typeof';
import _defineProperty from '@babel/runtime-corejs2/helpers/esm/defineProperty';
import mergeDescriptors from '../utils/mergeDescriptors';
import { isEmptyObj } from '../utils/util';

var SERVICES_PROP = 'services';
/**
 * 全局注入 provider 的数据
 */

var services = {
  inject: {
    $services: SERVICES_PROP
  },
  provide: function provide() {
    return _defineProperty({}, SERVICES_PROP, this.getServices());
  },
  methods: {
    /**
     *  获取注入数据。
     * @returns {Object}
     * @protected
     */
    getServices: function getServices() {
      return mergeDescriptors({}, this.$services || {});
    },

    /**
     * 移除对象中的空值。
     * @param {*} o
     * @param {*} arr
     * @param {*} i
     * @returns {Object}
     */
    removeNullItem: removeNullItem,

    /**
     * 判断是否是空对象。
     * @param {*} o
     * @returns {Boolean}
     */
    isEmptyObj: isEmptyObj
  },
  beforeCreate: function beforeCreate() {
    var source = this.$parent;

    while (source) {
      if (source._provided != null && source._provided[SERVICES_PROP] != null) {
        break;
      }

      source = source.$parent;
    }

    if (source == null || source._provided[SERVICES_PROP] == null) {
      delete this.$options.inject.$services;
    }
  }
};
/**
 * 处理对象。
 * @param {*} o
 */

function proccessObject(o) {
  for (var attr in o) {
    if (o[attr] === null || o[attr] === undefined) delete o[attr];else if (_typeof(o[attr]) === 'object') {
      // this.removeNullItem(o[attr])
      if (isEmptyObj(o[attr])) delete o[attr];
    }
  }
}
/**
 * 处理数组。
 * @param {*} arr
 */


function processArray(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    /* if (arr[i] === null || arr[i] === undefined) arr.splice(i, 1);
            else */
    if (_typeof(arr[i]) === 'object') {
      removeNullItem(arr[i]);
    }
  }

  return arr.length === 0;
}
/**
  * 移除对象中的空值。
  * @param {*} o
  * @param {*} arr
  * @param {*} i
  * @returns {Object}
  */


function removeNullItem(o, arr, i) {
  var s = {}.toString.call(o);

  if (s === '[object Array]') {
    if (processArray(o) === true) ;
  } else if (s === '[object Object]') {
    proccessObject(o); // if (arr&&isEmptyObj(o)) arr.splice(i, 1);
  }
}

export default services;
