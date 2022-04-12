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
import { show, distanceDisplayCondition, scale, minimumPixelSize, maximumScale, incrementallyLoadTextures, clampAnimations, shadows, heightReference, silhouetteColor, silhouetteSize, color, colorBlendMode, colorBlendAmount } from '../mixinProps';

/**
 * vc-graphics-model base props mixins
 */

var mixinModel = {
  mixins: [show, distanceDisplayCondition, scale, minimumPixelSize, maximumScale, incrementallyLoadTextures, clampAnimations, shadows, heightReference, silhouetteColor, silhouetteSize, color, colorBlendMode, colorBlendAmount]
};

export default mixinModel;
