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
import { length, topRadius, bottomRadius, slices } from '../mixinProps';

/**
 * vc-graphics-cylinder base props mixins
 */

var mixinCylinder = {
  mixins: [length, topRadius, bottomRadius, slices]
};

export default mixinCylinder;
