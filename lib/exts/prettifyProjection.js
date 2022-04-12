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
import proj4 from 'proj4';

/**
 * Turns the longitude / latitude in degrees into a human readable pretty UTM zone representation.
 */

function prettifyProjection(longitude, latitude, proj4Projection, proj4longlat, projectionUnits) {
  var zone = 1 + Math.floor((longitude + 180) / 6);
  var projection = proj4Projection + ' +zone=' + zone + (latitude < 0 ? ' +south' : '');
  var projPoint = proj4(proj4longlat, projection, [longitude, latitude]);
  return {
    utmZone: zone + (latitude < 0.0 ? 'S' : 'N'),
    north: projPoint[1].toFixed(2) + projectionUnits,
    east: projPoint[0].toFixed(2) + projectionUnits
  };
}

export default prettifyProjection;
