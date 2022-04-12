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
import _classCallCheck from '@babel/runtime-corejs2/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime-corejs2/helpers/esm/createClass';
import { debounce } from 'lodash-es';
import prettifyCoordinates from './prettifyCoordinates';
import prettifyProjection from './prettifyProjection';
import EarthGravityModel1996 from './EarthGravityModel1996';

var MouseCoords = /*#__PURE__*/function () {
  function MouseCoords() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MouseCoords);

    var _Cesium = Cesium,
        Cartographic = _Cesium.Cartographic,
        knockout = _Cesium.knockout;
    var gridFileUrl = options.gridFileUrl;
    gridFileUrl && (this.geoidModel = new EarthGravityModel1996(gridFileUrl));
    this.proj4Projection = options.proj4Projection || '+proj=utm +ellps=GRS80 +units=m +no_defs';
    this.projectionUnits = options.projectionUnits || 'm';
    this.proj4longlat = options.proj4longlat || '+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees +no_defs';
    this.lastHeightSamplePosition = new Cartographic();
    this.accurateSamplingDebounceTime = 250;
    this.tileRequestInFlight = undefined;
    this.elevation = undefined;
    this.utmZone = undefined;
    this.latitude = undefined;
    this.longitude = undefined;
    this.north = undefined;
    this.east = undefined;
    this.useProjection = false;
    this.debounceSampleAccurateHeight = debounce(this.sampleAccurateHeight, this.accurateSamplingDebounceTime);
    knockout.track(this, ['elevation', 'utmZone', 'latitude', 'longitude', 'north', 'east', 'useProjection']);
  }

  _createClass(MouseCoords, [{
    key: "toggleUseProjection",
    value: function toggleUseProjection() {
      this.useProjection = !this.useProjection;
    }
  }, {
    key: "updateCoordinatesFromCesium",
    value: function updateCoordinatesFromCesium(viewer, position) {
      var _Cesium2 = Cesium,
          Cartographic = _Cesium2.Cartographic,
          defined = _Cesium2.defined,
          EllipsoidTerrainProvider = _Cesium2.EllipsoidTerrainProvider,
          Intersections2D = _Cesium2.Intersections2D,
          SceneMode = _Cesium2.SceneMode;
      var scene = viewer.scene;
      var camera = scene.camera;
      var pickRay = camera.getPickRay(position);
      var globe = scene.globe;
      var pickedTriangle = globe.pickTriangle(pickRay, scene);

      if (defined(pickedTriangle)) {
        // Get a fast, accurate-ish height every time the mouse moves.
        var ellipsoid = globe.ellipsoid;
        var v0 = ellipsoid.cartesianToCartographic(pickedTriangle.v0);
        var v1 = ellipsoid.cartesianToCartographic(pickedTriangle.v1);
        var v2 = ellipsoid.cartesianToCartographic(pickedTriangle.v2);
        var intersection = ellipsoid.cartesianToCartographic(scene.mode === SceneMode.SCENE3D ? pickedTriangle.intersection : scene.globe.pick(pickRay, scene));
        var errorBar;

        if (globe.terrainProvider instanceof EllipsoidTerrainProvider) {
          intersection.height = undefined;
        } else {
          var barycentric = Intersections2D.computeBarycentricCoordinates(intersection.longitude, intersection.latitude, v0.longitude, v0.latitude, v1.longitude, v1.latitude, v2.longitude, v2.latitude);

          if (barycentric.x >= -1e-15 && barycentric.y >= -1e-15 && barycentric.z >= -1e-15) {
            var height = barycentric.x * v0.height + barycentric.y * v1.height + barycentric.z * v2.height;
            intersection.height = height;
          }

          var geometricError = globe.terrainProvider.getLevelMaximumGeometricError(pickedTriangle.tile.level);
          var approximateHeight = intersection.height;
          var minHeight = Math.max(pickedTriangle.tile.data.tileBoundingRegion.minimumHeight, approximateHeight - geometricError);
          var maxHeight = Math.min(pickedTriangle.tile.data.tileBoundingRegion.maximumHeight, approximateHeight + geometricError);
          var minHeightGeoid = minHeight - (this.geoidModel ? this.geoidModel.minimumHeight : 0.0);
          var maxHeightGeoid = maxHeight + (this.geoidModel ? this.geoidModel.maximumHeight : 0.0);
          errorBar = Math.max(Math.abs(approximateHeight - minHeightGeoid), Math.abs(maxHeightGeoid - approximateHeight));
        }

        Cartographic.clone(intersection, this.lastHeightSamplePosition);
        var terrainProvider = globe.terrainProvider;
        this.cartographicToFields(intersection, errorBar);

        if (!(terrainProvider instanceof EllipsoidTerrainProvider)) {
          this.debounceSampleAccurateHeight(terrainProvider, intersection);
        }
      } else {
        this.elevation = undefined;
        this.utmZone = undefined;
        this.latitude = undefined;
        this.longitude = undefined;
        this.north = undefined;
        this.east = undefined;
      }
    }
  }, {
    key: "cartographicToFields",
    value: function cartographicToFields(coordinates, errorBar) {
      var _Cesium3 = Cesium,
          CesiumMath = _Cesium3.Math;
      var latitude = CesiumMath.toDegrees(coordinates.latitude);
      var longitude = CesiumMath.toDegrees(coordinates.longitude);

      if (this.useProjection) {
        var prettyProjection = prettifyProjection(longitude, latitude, this.proj4Projection, this.proj4longlat, this.projectionUnits);
        this.utmZone = prettyProjection.utmZone;
        this.north = prettyProjection.north;
        this.east = prettyProjection.east;
      }

      var prettyCoordinate = prettifyCoordinates(longitude, latitude, {
        height: coordinates.height,
        errorBar: errorBar
      });
      this.latitude = prettyCoordinate.latitude;
      this.longitude = prettyCoordinate.longitude;
      this.elevation = prettyCoordinate.elevation;
    }
  }, {
    key: "sampleAccurateHeight",
    value: function sampleAccurateHeight(terrainProvider, position) {
      var _this = this;

      var _Cesium4 = Cesium,
          Cartographic = _Cesium4.Cartographic,
          sampleTerrainMostDetailed = _Cesium4.sampleTerrainMostDetailed,
          when = _Cesium4.when;

      if (this.tileRequestInFlight) {
        // A tile request is already in flight, so reschedule for later.
        this.debounceSampleAccurateHeight.cancel();
        this.debounceSampleAccurateHeight(terrainProvider, position);
        return;
      }

      var positionWithHeight = Cartographic.clone(position);
      var geoidHeightPromise = this.geoidModel ? this.geoidModel.getHeight(position.longitude, position.latitude) : undefined;
      var terrainPromise = sampleTerrainMostDetailed(terrainProvider, [positionWithHeight]);
      this.tileRequestInFlight = when.all([geoidHeightPromise, terrainPromise], function (result) {
        var geoidHeight = result[0] || 0.0;
        _this.tileRequestInFlight = undefined;

        if (Cartographic.equals(position, _this.lastHeightSamplePosition)) {
          position.height = positionWithHeight.height - geoidHeight;

          _this.cartographicToFields(position);
        }
      }, function () {
        _this.tileRequestInFlight = undefined;
      });
    }
  }]);

  return MouseCoords;
}();

export default MouseCoords;
