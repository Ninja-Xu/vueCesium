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
import _Object$assign from '@babel/runtime-corejs2/core-js/object/assign';
import { isObject, isArray, isFunction, isString, isEmptyObj } from './util';

/**
 * 将对象或数组转换为 Cesium.Cartesian2
 * @param {Object} val
 * @returns {Cartesian2 | CallbackProperty} 返回 Cartesian2 或者 CallbackProperty
 * @example
 * const options = [100, 100]
 * // const options = [x: 100, y: 100]
 * const position = makeCartesian2(options)
 */

function makeCartesian2(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium = Cesium,
      Cartesian2 = _Cesium.Cartesian2,
      CallbackProperty = _Cesium.CallbackProperty;

  if (val instanceof Cartesian2) {
    return val;
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'x')) {
    return new Cartesian2(val.x, val.y);
  }

  if (isArray(val)) {
    return new Cartesian2(val[0], val[1]);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 将对象或者数组转换为 Cesium.Cartesian3
 * @param {Object} val 传入的对象或数组
 * @param {Boolean} isConstant 传入function时生效，true 代表回调 function 每时每刻都返回值， false 代表改变才会返回值。默认false。
 * @returns 返回 Cartesian3 或者 CallbackProperty
 * @example
 * const options = {
 *  lng: 108,
 *  lat: 35,
 *  height: 1000
 * }
 * // const options = [108, 35, 1000]
 * const position = makeCartesian3 (options) // return Cesium.Cartesian3
 */

function makeCartesian3(val, ellipsoid) {
  var isConstant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _Cesium2 = Cesium,
      CallbackProperty = _Cesium2.CallbackProperty,
      Cartesian3 = _Cesium2.Cartesian3,
      Ellipsoid = _Cesium2.Ellipsoid;

  if (val instanceof Cartesian3) {
    return val;
  }

  ellipsoid = ellipsoid || Ellipsoid.WGS84;

  if (isObject(val)) {
    if (Object.prototype.hasOwnProperty.call(val, 'x')) {
      return new Cartesian3(val.x, val.y, val.z || 0);
    } else if (Object.prototype.hasOwnProperty.call(val, 'lng')) {
      return Cartesian3.fromDegrees(val.lng, val.lat, val.height || 0, ellipsoid);
    }
  }

  if (isArray(val)) {
    return new Cartesian3(val[0], val[1], val[2] || 0);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 将数组 [lng, lat, height, ……，lng, lat, height] 转换为 Cesium.Cartesian3 数组
 * @param {Array} val
 * @returns {Array<Cartesian3>}
 */

function makeCartesian3Array(vals, ellipsoid) {
  var isConstant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _Cesium3 = Cesium,
      CallbackProperty = _Cesium3.CallbackProperty,
      Cartesian3 = _Cesium3.Cartesian3,
      Ellipsoid = _Cesium3.Ellipsoid;

  if (isArray(vals)) {
    if (vals[0] instanceof Cartesian3 || vals._callback) {
      return vals;
    }

    ellipsoid = ellipsoid || Ellipsoid.WGS84;

    if (isArray(vals[0])) {
      var coordinates = [];

      for (var i = 0; i < vals.length; i++) {
        coordinates.push(vals[i][0]);
        coordinates.push(vals[i][1]);
        coordinates.push(vals[i][2] || 0);
      }

      return Cartesian3.fromRadiansArrayHeights(coordinates, ellipsoid);
    } else if (isObject(vals[0])) {
      var _coordinates = [];

      if (vals[0].lng) {
        vals.forEach(function (item) {
          _coordinates.push(item.lng);

          _coordinates.push(item.lat);

          _coordinates.push(item.height || 0);
        });
        return Cartesian3.fromDegreesArrayHeights(_coordinates, ellipsoid);
      } else {
        if (vals[0].x) {
          vals.forEach(function (item) {
            _coordinates.push(item.x);

            _coordinates.push(item.y);

            _coordinates.push(item.z || 0);
          });
          return Cartesian3.fromRadiansArrayHeights(_coordinates, ellipsoid);
        }
      }
    }

    return Cartesian3.fromDegreesArrayHeights(vals, ellipsoid);
  }

  if (isFunction(vals)) {
    return new CallbackProperty(vals, isConstant);
  }

  return vals;
}
/**
 * 将形如 [lng, lat, ……，lng, lat] 数组转换为 Cesium.Cartesian2 数组
 * @param {Array} vals
 * @returns {Array<Cartesian2>}
 */

function makeCartesian2Array(vals, isConstant) {
  var _Cesium4 = Cesium,
      CallbackProperty = _Cesium4.CallbackProperty,
      Cartesian2 = _Cesium4.Cartesian2;

  if (isArray(vals)) {
    if (vals[0] instanceof Cartesian2 || vals._callback) {
      return vals;
    }

    if (isObject(vals[0])) {
      var cartesian2Array = [];
      vals.forEach(function (item) {
        cartesian2Array.push(new Cartesian2(item.x, item.y));
      });
      return cartesian2Array;
    }
  }

  if (isFunction(vals)) {
    return new CallbackProperty(vals, isConstant);
  }

  return vals;
}
/**
 * 将对象或数组 转换为 Cesium.Quaternion
 * @param {Object} val
 * @example
 * const options = {x: 0, y: 0, z: 0, w: 0}
 * // const options = [0, 0, 0, 0]
 * const orientation = makeQuaternion(options) // returns Cesium.Quaternion
 */

function makeQuaternion(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium5 = Cesium,
      CallbackProperty = _Cesium5.CallbackProperty,
      Quaternion = _Cesium5.Quaternion;

  if (val instanceof Quaternion) {
    return val;
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'x')) {
    return new Quaternion(val.x, val.y, val.z, val.w);
  }

  if (isArray(val)) {
    return new Quaternion(val[0], val[1], val[2], val[3]);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 解析 HierarchyJson
 * @param {Object} val
 */

function parsePolygonHierarchyJson(val, ellipsoid) {
  val.forEach(function (element) {
    element.positions = makeCartesian3Array(element.positions, ellipsoid);

    if (element.holes) {
      parsePolygonHierarchyJson(element.holes, ellipsoid);
    }
  });
}
/**
 * 普通数组或对象转 Cesium.PolygonHierarchy 对象。
 * @param {Object|Array} val
 */


function makePolygonHierarchy(val, ellipsoid) {
  var isConstant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _Cesium6 = Cesium,
      PolygonHierarchy = _Cesium6.PolygonHierarchy,
      CallbackProperty = _Cesium6.CallbackProperty;

  if (val instanceof PolygonHierarchy) {
    return val;
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  if (isArray(val) && val.length >= 3) {
    return new PolygonHierarchy(makeCartesian3Array(val, ellipsoid));
  }

  if (Cesium.defined(val.positions)) {
    val.positions = makeCartesian3Array(val.positions, ellipsoid);
    parsePolygonHierarchyJson(val.holes, ellipsoid);
  }

  return val;
}
/**
 * 对象或数组转 Cesium.NearFarScalar。
 * @param {Object} val
 * @returns {NearFarScalar}
 * @example
 * const options = {near: 1000, nearValue: 1.0, far: 10000, farValue: 0.5}
 * // const options = [1000, 1.0, 10000, 1.5]
 * const nearFarScalar = makeNearFarScalar(options)
 */

function makeNearFarScalar(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium7 = Cesium,
      NearFarScalar = _Cesium7.NearFarScalar,
      CallbackProperty = _Cesium7.CallbackProperty;

  if (val instanceof NearFarScalar) {
    return val;
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'near')) {
    return new NearFarScalar(val.near, val.nearValue, val.far, val.farValue);
  }

  if (isArray(val)) {
    return new NearFarScalar(val[0], val[1], val[2], val[3]);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 对象或数组转 Cesium.DistanceDisplayCondition。
 * @param {Object} val
 * @returns {DistanceDisplayCondition}
 * @example
 * const options = [0, 1000]
 * // const options = {near: 0, far: 1000}
 * const distanceDisplayCondition = makeDistanceDisplayCondition(options) // return Cesium.DistanceDisplayCondition
 */

function makeDistanceDisplayCondition(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium8 = Cesium,
      DistanceDisplayCondition = _Cesium8.DistanceDisplayCondition,
      CallbackProperty = _Cesium8.CallbackProperty;

  if (val instanceof DistanceDisplayCondition) {
    return val;
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'near')) {
    return new DistanceDisplayCondition(val.near, val.far);
  }

  if (isArray(val)) {
    return new DistanceDisplayCondition(val[0], val[1]);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 普通对象、数组或字符串转 Cesium.Color。
 * @param {String|Array|Object|Function} val
 * @returns {Color}
 * @example
 * const options = 'red'
 * // const options = [1, 0, 0, 1.0] // r g b a
 * // const options = {red: 255, green: 0, bule: 0, alpha: 255}
 * const color = makeColor(options) // return Cesium.Color
 */

function makeColor(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium9 = Cesium,
      Color = _Cesium9.Color,
      CallbackProperty = _Cesium9.CallbackProperty;

  if (val instanceof Color) {
    return val;
  }

  if (isString(val)) {
    return Color.fromCssColorString(val);
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'red')) {
    return Color.fromBytes(val.red, val.green, val.blue, val.alpha || 255);
  }

  if (isArray(val)) {
    return new Cesium.Color(val[0], val[1], val[2], val[3] || 1.0);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }
}
/**
 * 普通对象或数组 [r, g, b, a] 或字符串转 MaterialProperty
 * @param {String|Array|Object} val
 */

function makeMaterialProperty(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium10 = Cesium,
      CallbackProperty = _Cesium10.CallbackProperty,
      Color = _Cesium10.Color,
      Resource = _Cesium10.Resource,
      ColorMaterialProperty = _Cesium10.ColorMaterialProperty,
      ImageMaterialProperty = _Cesium10.ImageMaterialProperty,
      PolylineArrowMaterialProperty = _Cesium10.PolylineArrowMaterialProperty,
      PolylineDashMaterialProperty = _Cesium10.PolylineDashMaterialProperty,
      PolylineGlowMaterialProperty = _Cesium10.PolylineGlowMaterialProperty,
      PolylineOutlineMaterialProperty = _Cesium10.PolylineOutlineMaterialProperty,
      CheckerboardMaterialProperty = _Cesium10.CheckerboardMaterialProperty,
      GridMaterialProperty = _Cesium10.GridMaterialProperty,
      StripeMaterialProperty = _Cesium10.StripeMaterialProperty;

  if (/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(val) || val instanceof Resource || val instanceof HTMLCanvasElement || val instanceof HTMLVideoElement) {
    var result = new ImageMaterialProperty({
      image: val,
      repeat: makeCartesian2({
        x: 1.0,
        y: 1.0
      }),
      color: Color.WHITE,
      transparent: true
    });
    result.image = val;
    return result;
  }

  if (isArray(val) || isString(val)) {
    return new ColorMaterialProperty(makeColor(val));
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'fabric')) {
    switch (val.fabric.type) {
      case 'Image':
        return new ImageMaterialProperty({
          image: val.fabric.uniforms.image,
          repeat: val.fabric.uniforms.repeat || makeCartesian2({
            x: 1.0,
            y: 1.0
          }),
          color: makeColor(val.fabric.uniforms.color) || Color.WHITE,
          transparent: val.fabric.uniforms.transparent || false
        });

      case 'Color':
        return new ColorMaterialProperty(makeColor(val.fabric.uniforms.color || Color.WHITE));

      case 'PolylineArrow':
        return new PolylineArrowMaterialProperty(makeColor(val.fabric.uniforms.color || Color.WHITE));

      case 'PolylineDash':
        return new PolylineDashMaterialProperty({
          color: makeColor(val.fabric.uniforms.color) || Color.WHITE,
          gapColor: val.fabric.uniforms.gapColor || Color.TRANSPARENT,
          dashLength: val.fabric.uniforms.taperPower || 16.0,
          dashPattern: val.fabric.uniforms.taperPower || 255.0
        });

      case 'PolylineGlow':
        return new PolylineGlowMaterialProperty({
          color: makeColor(val.fabric.uniforms.color) || Color.WHITE,
          glowPower: val.fabric.uniforms.glowPower || 0.25,
          taperPower: val.fabric.uniforms.taperPower || 1.0
        });

      case 'PolylineOutline':
        return new PolylineOutlineMaterialProperty({
          color: makeColor(val.fabric.uniforms.color) || Color.WHITE,
          outlineColor: val.fabric.uniforms.outlineColor || Color.BLACK,
          outlineWidth: val.fabric.uniforms.outlineWidth || 1.0
        });

      case 'Checkerboard':
        return new CheckerboardMaterialProperty({
          evenColor: makeColor(val.fabric.uniforms.evenColor) || Color.WHITE,
          oddColor: val.fabric.uniforms.oddColor || Color.BLACK,
          repeat: val.fabric.uniforms.repeat || makeCartesian2({
            x: 2,
            y: 2
          })
        });

      case 'Grid':
        return new GridMaterialProperty({
          color: makeColor(val.fabric.uniforms.color) || Color.WHITE,
          cellAlpha: val.fabric.uniforms.cellAlpha || 0.1,
          lineCount: val.fabric.uniforms.lineCount || makeCartesian2({
            x: 8,
            y: 8
          }),
          lineThickness: val.fabric.uniforms.lineThickness || makeCartesian2({
            x: 1,
            y: 1
          }),
          lineOffset: val.fabric.uniforms.lineOffset || makeCartesian2({
            x: 0,
            y: 0
          })
        });

      case 'Stripe':
        return new StripeMaterialProperty({
          orientation: makeColor(val.fabric.uniforms.orientation) || 0,
          evenColor: val.fabric.uniforms.evenColor || Color.WHITE,
          oddColor: val.fabric.uniforms.oddColor || Color.BLACK,
          offset: val.fabric.uniforms.offset || 0,
          repeat: val.fabric.uniforms.repeat || 1
        });
    }
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 转 Material
 * @param {String|Array|Object} val
 */

function makeMaterial(val) {
  var cmpName = this.$options.name;

  if (cmpName && (cmpName.indexOf('graphics') !== -1 || cmpName.indexOf('datasource') !== -1)) {
    return makeMaterialProperty(val);
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'fabric')) {
    var f = function f(obj) {
      for (var i in obj) {
        if (!isArray(obj[i]) && isObject(obj[i])) {
          f(obj[i]);
        } else {
          if (i.toLocaleLowerCase().indexOf('color') !== -1 && !isEmptyObj(obj[i])) {
            var result = makeColor(obj[i]); // Cesium 通过对象属性个数判断具体材质类型的，通过 Cesium.combine 移除 vue 传的一些属性

            obj[i] = Cesium.combine(result, result, true);
          }
        }
      }
    };

    f(val);
    return new Cesium.Material(val);
  }

  if (isArray(val) || isString(val)) {
    var material = Cesium.Material.fromType('Color');
    material.uniforms.color = makeColor(val);
    return material;
  }

  return undefined;
}
/**
 * 将对象 {west: number, south: number, east: number, north: number} 或者[west, south, east, north]数组 转 Cesium.Rectangle 对象。
 * @param {Object} val
 * @returns {Rectangle}
 */

function makeRectangle(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium11 = Cesium,
      Rectangle = _Cesium11.Rectangle,
      RectangleGraphics = _Cesium11.RectangleGraphics,
      CallbackProperty = _Cesium11.CallbackProperty; // Entiy 的 rectangle 属性不能调用这个方法

  if (val instanceof RectangleGraphics) {
    return val;
  }

  if (val instanceof Rectangle) {
    return val;
  }

  if (isArray(val)) {
    return Rectangle.fromDegrees(val[0], val[1], val[2], val[3]);
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'west')) {
    return Rectangle.fromDegrees(val.west, val.south, val.east, val.north);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 对象或数组转 Cesium.BoundingRectangle。
 * @param {Object} val
 * @returns {Cesium.BoundingRectangle}
 * @example
 * const options = [0, 0, 100, 100]
 * // const options = {x: 0, y: 0, width: 100, height: 100}
 * const boundingRectangle = makeBoundingRectangle(options)
 */

function makeBoundingRectangle(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium12 = Cesium,
      BoundingRectangle = _Cesium12.BoundingRectangle,
      CallbackProperty = _Cesium12.CallbackProperty;

  if (val instanceof BoundingRectangle) {
    return val;
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'x')) {
    return new BoundingRectangle(val.x, val.y, val.width, val.height);
  }

  if (isArray) {
    return new BoundingRectangle(val[0], val[1], val[2], val[3]);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 普通对象 {normal: number, distance: number} 转 Cesium.Plane 对象。
 * @param {Object} val
 * @returns {Plane}
 */

function makePlane(val) {
  var isConstant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium13 = Cesium,
      Cartesian3 = _Cesium13.Cartesian3,
      Plane = _Cesium13.Plane,
      PlaneGraphics = _Cesium13.PlaneGraphics,
      CallbackProperty = _Cesium13.CallbackProperty; // Entiy 和 PlaneGraphics 都有个 plane 属性 要区别一下

  if (val instanceof PlaneGraphics) {
    return val;
  }

  if (val instanceof Plane) {
    return val;
  }

  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'normal')) {
    Cartesian3.normalize(makeCartesian3(val.normal), val.normal);
    return new Plane(val.normal, val.distance);
  }

  if (isFunction(val)) {
    return new CallbackProperty(val, isConstant);
  }

  return val;
}
/**
 * 普通对象转平移、旋转、缩放变换对象。
 * @param {*} val
 */

function makeTranslationRotationScale(val) {
  if (isObject(val) && Object.prototype.hasOwnProperty.call(val, 'translation')) {
    return new Cesium.TranslationRotationScale(makeCartesian3(val.translation), makeQuaternion(val.rotation), makeCartesian3(val.scale));
  }

  return val;
}
function makeOptions(val) {
  var cmpName = this.$options.name;
  var result = {};

  switch (cmpName) {
    case 'vc-datasource-geojson':
      _Object$assign(result, val);

      result && result.markerColor && (result.markerColor = makeColor(result.markerColor));
      result && result.stroke && (result.stroke = makeColor(result.stroke));
      result && result.fill && (result.fill = makeColor(result.fill));
      return result;
  }

  return val;
}

export { makeBoundingRectangle, makeCartesian2, makeCartesian2Array, makeCartesian3, makeCartesian3Array, makeColor, makeDistanceDisplayCondition, makeMaterial, makeMaterialProperty, makeNearFarScalar, makeOptions, makePlane, makePolygonHierarchy, makeQuaternion, makeRectangle, makeTranslationRotationScale };
