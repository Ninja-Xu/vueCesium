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
import { image, scale, pixelOffset, eyeOffset, horizontalOrigin, verticalOrigin, heightReference, color, rotation, alignedAxis, sizeInMeters, width, height, scaleByDistance, translucencyByDistance, pixelOffsetScaleByDistance, disableDepthTestDistance, show, distanceDisplayCondition } from '../mixinProps';

/**
 * vc-graphics-billbord or vc-billboard base props
 */

var mixinBillboard = {
  mixins: [image, scale, pixelOffset, eyeOffset, horizontalOrigin, verticalOrigin, heightReference, color, rotation, alignedAxis, sizeInMeters, width, height, scaleByDistance, translucencyByDistance, pixelOffsetScaleByDistance, disableDepthTestDistance, show, distanceDisplayCondition]
};

export default mixinBillboard;
