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
import { semiMajorAxis, semiMinorAxis, height, extrudedHeight, rotation, granularity } from '../mixinProps';

/**
 * vc-graphics-ellipse base props mixins
 */

var mixinEllipse = {
  mixins: [semiMajorAxis, semiMinorAxis, height, extrudedHeight, rotation, granularity]
};

export default mixinEllipse;
