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
import mergeDescriptors from 'merge-descriptors';

/**
 * @param {...Object} args
 * @returns {Object}
 */

function multiMergeDescriptors() {
  var redefine;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (_typeof(args[args.length - 1]) !== 'object') {
    redefine = args.pop();
  }

  return args.slice(1).reduce(function (dest, src, i) {
    return mergeDescriptors(dest, src, redefine);
  }, args[0]);
}

export default multiMergeDescriptors;
