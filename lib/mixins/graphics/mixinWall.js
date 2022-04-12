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
import { positions, granularity, maximumHeights, minimumHeights } from '../mixinProps';

/**
 * vc-graphics-wall base props mixins
 */

var mixinWall = {
  mixins: [positions, granularity, maximumHeights, minimumHeights]
};

export default mixinWall;
