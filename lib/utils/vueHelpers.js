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
import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys';

/**
 * Constructs watch hash for multiple properties.
 * @param {string[]} props
 * @param {function|Object} watcherFactory
 */
function makeWatchers(props, watcherFactory) {
  return props.reduce(function (hash, prop) {
    hash[prop] = watcherFactory(prop);
    return hash;
  }, {});
}
function extractChildren(slots) {
  var slotNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _Object$keys(slots).reduce(function (all, name) {
    if (!slotNames.length || slotNames.includes(name)) {
      all = all.concat(slots[name]);
    }

    return all;
  }, []);
}

export { extractChildren, makeWatchers };
