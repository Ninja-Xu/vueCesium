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
import * as Viewer from './viewer';
export { Viewer };
import * as ImageryLayer from './imageryLayer';
export { ImageryLayer };
import * as ArcGisMapServerImageryProvider from './imageryLayer/arcgis';
export { ArcGisMapServerImageryProvider };
import * as BingMapsImageryProvider from './imageryLayer/bingmaps';
export { BingMapsImageryProvider };
import * as GoogleEarthEnterpriseImageryProvider from './imageryLayer/googleEarth';
export { GoogleEarthEnterpriseImageryProvider };
import * as GridImageryProvider from './imageryLayer/grid';
export { GridImageryProvider };
import * as IonImageryProvider from './imageryLayer/ion';
export { IonImageryProvider };
import * as MapboxImageryProvider from './imageryLayer/mapbox';
export { MapboxImageryProvider };
import * as MapboxStyleImageryProvider from './imageryLayer/mapboxStyle';
export { MapboxStyleImageryProvider };
import * as OpenStreetMapImageryProvider from './imageryLayer/openStreetMap';
export { OpenStreetMapImageryProvider };
import * as SingleTileImageryProvider from './imageryLayer/singleTile';
export { SingleTileImageryProvider };
import * as TileCoordinatesImageryProvider from './imageryLayer/tileCoordinates';
export { TileCoordinatesImageryProvider };
import * as TileMapServiceImageryProvider from './imageryLayer/tileMapService';
export { TileMapServiceImageryProvider };
import * as UrlTemplateImageryProvider from './imageryLayer/urlTemplate';
export { UrlTemplateImageryProvider };
import * as WebMapServiceImageryProvider from './imageryLayer/wms';
export { WebMapServiceImageryProvider };
import * as WebMapTileServiceImageryProvider from './imageryLayer/wmts';
export { WebMapTileServiceImageryProvider };
import * as TiandituImageryProvider from './imageryLayer/tianditu';
export { TiandituImageryProvider };
import * as SuperMapImageryProvider from './imageryLayer/supermap';
export { SuperMapImageryProvider };
import * as TiledCacheImageryProvider from './imageryLayer/tiledCache';
export { TiledCacheImageryProvider };
import * as BaiduMapImageryProvider from './imageryLayer/baidu';
export { BaiduMapImageryProvider };
import * as ArcGISTiledElevationTerrainProvider from './terrain/arcgis';
export { ArcGISTiledElevationTerrainProvider };
import * as CesiumTerrainProvider from './terrain/cesium';
export { CesiumTerrainProvider };
import * as CustomDataSource from './datasource/custom';
export { CustomDataSource };
import * as CzmlDataSource from './datasource/czml';
export { CzmlDataSource };
import * as GeoJsonDataSource from './datasource/geojson';
export { GeoJsonDataSource };
import * as KmlDataSource from './datasource/kml';
export { KmlDataSource };
import * as Entity from './entity';
export { Entity };
import * as BillboardGraphics from './entity/billboard';
export { BillboardGraphics };
import * as BoxGraphics from './entity/box';
export { BoxGraphics };
import * as CorridorGraphics from './entity/corridor';
export { CorridorGraphics };
import * as CylinderGraphics from './entity/cylinder';
export { CylinderGraphics };
import * as EllipseGraphics from './entity/ellipse';
export { EllipseGraphics };
import * as EllipsoidGraphics from './entity/ellipsoid';
export { EllipsoidGraphics };
import * as LabelGraphics from './entity/label';
export { LabelGraphics };
import * as ModelGraphics from './entity/model';
export { ModelGraphics };
import * as Cesium3DTilesetGraphics from './entity/tileset';
export { Cesium3DTilesetGraphics };
import * as PathGraphics from './entity/path';
export { PathGraphics };
import * as PlaneGraphics from './entity/plane';
export { PlaneGraphics };
import * as PointGraphics from './entity/point';
export { PointGraphics };
import * as PolygonGraphics from './entity/polygon';
export { PolygonGraphics };
import * as PolylineGraphics from './entity/polyline';
export { PolylineGraphics };
import * as PolylineVolumeGraphics from './entity/polylineVollume';
export { PolylineVolumeGraphics };
import * as RectangleGraphics from './entity/rectangle';
export { RectangleGraphics };
import * as WallGraphics from './entity/wall';
export { WallGraphics };
import * as PrimitiveCollection from './primitiveCollection';
export { PrimitiveCollection };
import * as BillboardCollection from './primitiveCollection/billboardCollection';
export { BillboardCollection };
import * as LabelCollection from './primitiveCollection/labelCollection';
export { LabelCollection };
import * as PointPrimitiveCollection from './primitiveCollection/pointCollection';
export { PointPrimitiveCollection };
import * as PolylineCollection from './primitiveCollection/polylineCollection';
export { PolylineCollection };
import * as Primitive from './primitive';
export { Primitive };
import * as ClassificationPrimitive from './primitive/classification';
export { ClassificationPrimitive };
import * as GroundPrimitive from './primitive/ground';
export { GroundPrimitive };
import * as GroundPolylinePrimitive from './primitive/groundPolyline';
export { GroundPolylinePrimitive };
import * as Billboard from './primitive/billboard';
export { Billboard };
import * as Label from './primitive/label';
export { Label };
import * as PointPrimitive from './primitive/point';
export { PointPrimitive };
import * as Polyline from './primitive/polyline';
export { Polyline };
import * as Model from './primitive/model';
export { Model };
import * as Cesium3DTileset from './primitive/tileset';
export { Cesium3DTileset };
import * as ParticleSystem from './primitive/particle';
export { ParticleSystem };
import * as GeometryInstance from './geometryInstance';
export { GeometryInstance };
import * as BoxGeometry from './geometryInstance/box';
export { BoxGeometry };
import * as BoxOutlineGeometry from './geometryInstance/boxOutline';
export { BoxOutlineGeometry };
import * as CircleGeometry from './geometryInstance/circle';
export { CircleGeometry };
import * as CircleOutlineGeometry from './geometryInstance/circleOutline';
export { CircleOutlineGeometry };
import * as CoplanarPolygonGeometry from './geometryInstance/coplanarPolygon';
export { CoplanarPolygonGeometry };
import * as CoplanarPolygonOutlineGeometry from './geometryInstance/coplanarPolygonOutline';
export { CoplanarPolygonOutlineGeometry };
import * as CorridorGeometry from './geometryInstance/corridor';
export { CorridorGeometry };
import * as CorridorOutlineGeometry from './geometryInstance/corridorOutline';
export { CorridorOutlineGeometry };
import * as CylinderGeometry from './geometryInstance/cylinder';
export { CylinderGeometry };
import * as CylinderOutlineGeometry from './geometryInstance/cylinderOutline';
export { CylinderOutlineGeometry };
import * as EllipseGeometry from './geometryInstance/ellipse';
export { EllipseGeometry };
import * as EllipseOutlineGeometry from './geometryInstance/ellipseOutline';
export { EllipseOutlineGeometry };
import * as EllipsoidGeometry from './geometryInstance/ellipsoid';
export { EllipsoidGeometry };
import * as EllipsoidOutlineGeometry from './geometryInstance/ellipsoidOutline';
export { EllipsoidOutlineGeometry };
import * as FrustumGeometry from './geometryInstance/frustum';
export { FrustumGeometry };
import * as FrustumOutlineGeometry from './geometryInstance/frustumOutline';
export { FrustumOutlineGeometry };
import * as GroundPolylineGeometry from './geometryInstance/groundPolyline';
export { GroundPolylineGeometry };
import * as PlaneGeometry from './geometryInstance/plane';
export { PlaneGeometry };
import * as PlaneOutlineGeometry from './geometryInstance/planeOutline';
export { PlaneOutlineGeometry };
import * as PolygonGeometry from './geometryInstance/polygon';
export { PolygonGeometry };
import * as PolygonOutlineGeometry from './geometryInstance/polygonOutline';
export { PolygonOutlineGeometry };
import * as PolylineGeometry from './geometryInstance/polyline';
export { PolylineGeometry };
import * as PolylineVolumeGeometry from './geometryInstance/polylineVolume';
export { PolylineVolumeGeometry };
import * as PolylineVolumeOutlineGeometry from './geometryInstance/polylineVolumeOutline';
export { PolylineVolumeOutlineGeometry };
import * as RectangleGeometry from './geometryInstance/rectangle';
export { RectangleGeometry };
import * as RectangleOutlineGeometry from './geometryInstance/rectangleOutline';
export { RectangleOutlineGeometry };
import * as SimplePolylineGeometry from './geometryInstance/simplePolyline';
export { SimplePolylineGeometry };
import * as SphereGeometry from './geometryInstance/sphere';
export { SphereGeometry };
import * as SphereOutlineGeometry from './geometryInstance/sphereOutline';
export { SphereOutlineGeometry };
import * as WallGeometry from './geometryInstance/wall';
export { WallGeometry };
import * as WallOutlineGeometry from './geometryInstance/wallOutline';
export { WallOutlineGeometry };
import * as PostProcessStageCollection from './stageCollection';
export { PostProcessStageCollection };
import * as PostProcessStage from './stage';
export { PostProcessStage };
import * as VcMeasureArea from './tool/measureArea';
export { VcMeasureArea };
import * as VcMeasureDistance from './tool/measureDistance';
export { VcMeasureDistance };
import * as VcMeasureHeight from './tool/measureHeight';
export { VcMeasureHeight };
import * as VcDrawHandlerPoint from './tool/drawHandlerPoint';
export { VcDrawHandlerPoint };
import * as VcDrawHandlerPolyline from './tool/drawHandlerPolyline';
export { VcDrawHandlerPolyline };
import * as VcDrawHandlerPolygon from './tool/drawHandlerPolygon';
export { VcDrawHandlerPolygon };
import * as VcNavigation from './control/navigation';
export { VcNavigation };
import * as navigationSM from './control/navigationSM';
export { navigationSM as VcNavigationSM };
import * as overviewMap from './control/overviewMap';
export { overviewMap as VcOverviewMap };
import * as VcFlood from './extend/flood';
export { VcFlood };
import * as VcHeatMap from './extend/heatmap';
export { VcHeatMap };
import * as VcKrigingMap from './extend/krigingmap';
export { VcKrigingMap };
import * as VcWindMap from './extend/windmap';
export { VcWindMap };
import * as VcScanCircle from './extend/scanCircle';
export { VcScanCircle };
import * as VcScanRadar from './extend/scanRadar';
export { VcScanRadar };
import * as VcDoubleCircleRipple from './extend/doubleCircleRipple';
export { VcDoubleCircleRipple };
import * as VcDoubleRotatingCircle from './extend/doubleRoatatingCircle';
export { VcDoubleRotatingCircle };
import * as VcShineEllipse from './extend/shineEllipse';
export { VcShineEllipse };
import * as VcShinePoint from './extend/shinePoint';
export { VcShinePoint };
import * as VcPolylineTrail from './extend/polylineTrail';
export { VcPolylineTrail };
import * as VcWallTrail from './extend/wallTrail';
export { VcWallTrail };
import * as VcHTMLOverlay from './extend/htmlOverlay';
export { VcHTMLOverlay };
export { default as PolylineTrailMaterialProperty } from './exts/materialProperty/PolylineTrailMaterialProperty';
export { default as lang } from './exts/lang';

/**
 * @const {string} VueCesium version
 */

var VERSION = '2.2.12'; // const $vc = {
//   VERSION
// }

/**
 * Register all VueCesium components.
 * @param {Object} Vue
 * @param {Object} options
 */

function plugin(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (plugin.installed) {
    return;
  }

  plugin.installed = true; // 场景

  Vue.use(Viewer, options); // 影像

  Vue.use(ImageryLayer, options);
  Vue.use(ArcGisMapServerImageryProvider, options);
  Vue.use(BingMapsImageryProvider, options);
  Vue.use(GoogleEarthEnterpriseImageryProvider, options);
  Vue.use(GridImageryProvider, options);
  Vue.use(IonImageryProvider, options);
  Vue.use(MapboxImageryProvider, options);
  Vue.use(MapboxStyleImageryProvider, options);
  Vue.use(OpenStreetMapImageryProvider, options);
  Vue.use(SingleTileImageryProvider, options);
  Vue.use(TileCoordinatesImageryProvider, options);
  Vue.use(TileMapServiceImageryProvider, options);
  Vue.use(UrlTemplateImageryProvider, options);
  Vue.use(WebMapServiceImageryProvider, options);
  Vue.use(WebMapTileServiceImageryProvider, options);
  Vue.use(TiandituImageryProvider, options);
  Vue.use(SuperMapImageryProvider, options);
  Vue.use(TiledCacheImageryProvider, options);
  Vue.use(BaiduMapImageryProvider, options); // 地形

  Vue.use(ArcGISTiledElevationTerrainProvider, options);
  Vue.use(CesiumTerrainProvider, options); // 数据源

  Vue.use(CustomDataSource, options);
  Vue.use(CzmlDataSource, options);
  Vue.use(GeoJsonDataSource, options);
  Vue.use(KmlDataSource, options); // 实体

  Vue.use(Entity, options);
  Vue.use(BillboardGraphics, options);
  Vue.use(BoxGraphics, options);
  Vue.use(CorridorGraphics, options);
  Vue.use(CylinderGraphics, options);
  Vue.use(EllipseGraphics, options);
  Vue.use(EllipsoidGraphics, options);
  Vue.use(LabelGraphics, options);
  Vue.use(ModelGraphics, options);
  Vue.use(Cesium3DTilesetGraphics, options);
  Vue.use(PathGraphics, options);
  Vue.use(PlaneGraphics, options);
  Vue.use(PointGraphics, options);
  Vue.use(PolygonGraphics, options);
  Vue.use(PolylineGraphics, options);
  Vue.use(PolylineVolumeGraphics, options);
  Vue.use(RectangleGraphics, options);
  Vue.use(WallGraphics, options); // 图元集合

  Vue.use(PrimitiveCollection, options);
  Vue.use(BillboardCollection, options);
  Vue.use(LabelCollection, options);
  Vue.use(PointPrimitiveCollection, options);
  Vue.use(PolylineCollection, options); // 图元

  Vue.use(Primitive, options);
  Vue.use(ClassificationPrimitive, options);
  Vue.use(GroundPolylinePrimitive, options);
  Vue.use(GroundPrimitive, options);
  Vue.use(Billboard, options);
  Vue.use(Label, options);
  Vue.use(PointPrimitive, options);
  Vue.use(Polyline, options);
  Vue.use(Model, options);
  Vue.use(Cesium3DTileset, options);
  Vue.use(ParticleSystem, options); // 几何体

  Vue.use(GeometryInstance, options);
  Vue.use(BoxGeometry, options);
  Vue.use(BoxOutlineGeometry, options);
  Vue.use(CircleGeometry, options);
  Vue.use(CircleOutlineGeometry, options);
  Vue.use(CoplanarPolygonGeometry, options);
  Vue.use(CoplanarPolygonOutlineGeometry, options);
  Vue.use(CorridorGeometry, options);
  Vue.use(CorridorOutlineGeometry, options);
  Vue.use(CylinderGeometry, options);
  Vue.use(CylinderOutlineGeometry, options);
  Vue.use(EllipseGeometry, options);
  Vue.use(EllipseOutlineGeometry, options);
  Vue.use(EllipsoidGeometry, options);
  Vue.use(EllipsoidOutlineGeometry, options);
  Vue.use(FrustumGeometry, options);
  Vue.use(FrustumOutlineGeometry, options);
  Vue.use(GroundPolylineGeometry, options);
  Vue.use(PlaneGeometry, options);
  Vue.use(PlaneOutlineGeometry, options);
  Vue.use(PolygonGeometry, options);
  Vue.use(PolygonOutlineGeometry, options);
  Vue.use(PolylineGeometry, options);
  Vue.use(PolylineVolumeGeometry, options);
  Vue.use(PolylineVolumeOutlineGeometry, options);
  Vue.use(RectangleGeometry, options);
  Vue.use(RectangleOutlineGeometry, options);
  Vue.use(SimplePolylineGeometry, options);
  Vue.use(SphereGeometry, options);
  Vue.use(SphereOutlineGeometry, options);
  Vue.use(WallGeometry, options);
  Vue.use(WallOutlineGeometry, options); // stage

  Vue.use(PostProcessStageCollection, options);
  Vue.use(PostProcessStage, options); // 工具

  Vue.use(VcMeasureArea, options);
  Vue.use(VcMeasureDistance, options);
  Vue.use(VcMeasureHeight, options);
  Vue.use(VcDrawHandlerPoint, options);
  Vue.use(VcDrawHandlerPolyline, options);
  Vue.use(VcDrawHandlerPolygon, options); // 扩展

  Vue.use(VcFlood, options);
  Vue.use(VcHeatMap, options);
  Vue.use(VcWindMap, options);
  Vue.use(VcKrigingMap, options);
  Vue.use(VcScanCircle, options);
  Vue.use(VcScanRadar, options);
  Vue.use(VcDoubleCircleRipple, options);
  Vue.use(VcDoubleRotatingCircle, options);
  Vue.use(VcShineEllipse, options);
  Vue.use(VcShinePoint, options);
  Vue.use(VcPolylineTrail, options);
  Vue.use(VcWallTrail, options);
  Vue.use(VcHTMLOverlay, options); // 控件

  Vue.use(VcNavigation, options); // Vue.use(VcNavigationSM, options)
  // Vue.use(VcOverviewMap, options)
  // lang.install($vc, options.lang)
  // Vue.prototype.$vc = $vc
}

export default plugin;
export { VERSION, plugin as install };
