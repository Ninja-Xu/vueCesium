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
/**
 * Turns the longitude / latitude in degrees into a human readable pretty strings.
 *
 * @param {Number} longitude The longitude to format.
 * @param {Number} latitude The latitude to format.
 * @param {Object} options Object with the following properties:
 * @param {Number} options.height The height.
 * @param {Number} options.errorBar The error +/- for the height.
 * @param {Number} options.digits The number of digits to fix the lat / lon to.
 */
function prettifyCoordinates(longitude, latitude, options) {
  var result = {};
  var _Cesium = Cesium,
      defaultValue = _Cesium.defaultValue,
      defined = _Cesium.defined;
  var optionsDefaulted = defaultValue(options, {});
  var digits = defaultValue(optionsDefaulted.digits, 5);
  result.latitude = Math.abs(latitude).toFixed(digits) + '°' + (latitude < 0.0 ? 'S' : 'N');
  result.longitude = Math.abs(longitude).toFixed(digits) + '°' + (longitude < 0.0 ? 'W' : 'E');

  if (defined(optionsDefaulted.height)) {
    result.elevation = Math.round(optionsDefaulted.height) + (defined(optionsDefaulted.errorBar) ? '±' + Math.round(optionsDefaulted.errorBar) : '') + 'm';
  } else {
    result.elevation = undefined;
  }

  return result;
}

export default prettifyCoordinates;
