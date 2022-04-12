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
 * Vue 组件名对应的 Cesium 类。
 * @const {Object}
 */
var nameClassMap = {
  // 二、三维视图
  'vc-viewer': 'Viewer',
  // 影像
  'vc-layer-imagery': 'ImageryLayer',
  'vc-provider-imagery-arcgis-mapserver': 'ArcGisMapServerImageryProvider',
  'vc-provider-imagery-bingmaps': 'BingMapsImageryProvider',
  'vc-provider-imagery-googleearth-enterprise': 'GoogleEarthEnterpriseImageryProvider',
  'vc-provider-imagery-grid': 'GridImageryProvider',
  'vc-provider-imagery-ion': 'IonImageryProvider',
  'vc-provider-imagery-mapbox': 'MapboxImageryProvider',
  'vc-provider-imagery-style-mapbox': 'MapboxStyleImageryProvider',
  'vc-provider-imagery-openstreetmap': 'OpenStreetMapImageryProvider',
  'vc-provider-imagery-tile-single': 'SingleTileImageryProvider',
  'vc-provider-imagery-tile-coordinates': 'TileCoordinatesImageryProvider',
  'vc-provider-imagery-tile-mapservice': 'TileMapServiceImageryProvider',
  'vc-provider-imagery-urltemplate': 'UrlTemplateImageryProvider',
  'vc-provider-imagery-wms': 'WebMapServiceImageryProvider',
  'vc-provider-imagery-wmts': 'WebMapTileServiceImageryProvider',
  'vc-provider-imagery-tianditu': 'TiandituImageryProvider',
  'vc-provider-imagery-supermap': 'SuperMapImageryProvider',
  'vc-provider-imagery-tiledcache': 'UrlTemplateImageryProvider',
  'vc-provider-imagery-baidumap': 'BaiduMapImageryProvider',
  // 地形
  'vc-provider-terrain-arcgis-tiled-elevation': 'ArcGISTiledElevationTerrainProvider',
  'vc-provider-terrain-cesium': 'CesiumTerrainProvider',
  // 实体
  'vc-entity': 'Entity',
  'vc-graphics-billboard': 'BillboardGraphics',
  'vc-graphics-box': 'BoxGraphics',
  'vc-graphics-corridor': 'CorridorGraphics',
  'vc-graphics-cylinder': 'CylinderGraphics',
  'vc-graphics-ellipse': 'EllipseGraphics',
  'vc-graphics-ellipsoid': 'EllipsoidGraphics',
  'vc-graphics-label': 'LabelGraphics',
  'vc-graphics-model': 'ModelGraphics',
  'vc-graphics-tileset': 'Cesium3DTilesetGraphics',
  'vc-graphics-path': 'PathGraphics',
  'vc-graphics-plane': 'PlaneGraphics',
  'vc-graphics-point': 'PointGraphics',
  'vc-graphics-polygon': 'PolygonGraphics',
  'vc-graphics-polyline': 'PolylineGraphics',
  'vc-graphics-polyline-volume': 'PolylineVolumeGraphics',
  'vc-graphics-rectangle': 'RectangleGraphics',
  'vc-graphics-wall': 'WallGraphics',
  // 数据源
  'vc-datasource-custom': 'CustomDataSource',
  'vc-datasource-czml': 'CzmlDataSource',
  'vc-datasource-geojson': 'GeoJsonDataSource',
  'vc-datasource-kml': 'KmlDataSource',
  // 图元集合
  'vc-collection-primitive': 'PrimitiveCollection',
  'vc-collection-primitive-billboard': 'BillboardCollection',
  'vc-collection-primitive-label': 'LabelCollection',
  'vc-collection-primitive-point': 'PointPrimitiveCollection',
  'vc-collection-primitive-polyline': 'PolylineCollection',
  // 图元
  'vc-primitive': 'Primitive',
  'vc-primitive-classification': 'ClassificationPrimitive',
  'vc-primitive-ground': 'GroundPrimitive',
  'vc-primitive-billboard': 'Billboard',
  'vc-primitive-label': 'Label',
  'vc-primitive-point': 'PointPrimitive',
  'vc-primitive-polyline': 'Polyline',
  'vc-primitive-polyline-ground': 'GroundPolylinePrimitive',
  'vc-primitive-model': 'Model',
  'vc-primitive-tileset': 'Cesium3DTileset',
  'vc-primitive-particle': 'ParticleSystem',
  // 几何体
  'vc-instance-geometry': 'GeometryInstance',
  'vc-geometry-box': 'BoxGeometry',
  'vc-geometry-outline-box': 'BoxOutlineGeometry',
  'vc-geometry-circle': 'CircleGeometry',
  'vc-geometry-outline-circle': 'CircleOutlineGeometry',
  'vc-geometry-polygon-coplanar': 'CoplanarPolygonGeometry',
  'vc-geometry-outline-polygon-coplanar': 'CoplanarPolygonOutlineGeometry',
  'vc-geometry-corridor': 'CorridorGeometry',
  'vc-geometry-outline-corridor': 'CorridorOutlineGeometry',
  'vc-geometry-cylinder': 'CylinderGeometry',
  'vc-geometry-outline-cylinder': 'CylinderOutlineGeometry',
  'vc-geometry-ellipse': 'EllipseGeometry',
  'vc-geometry-outline-ellipse': 'EllipseOutlineGeometry',
  'vc-geometry-ellipsoid': 'EllipsoidGeometry',
  'vc-geometry-outline-ellipsoid': 'EllipsoidOutlineGeometry',
  'vc-geometry-frustum': 'FrustumGeometry',
  'vc-geometry-outline-frustum': 'FrustumOutlineGeometry',
  'vc-geometry-polyline-ground': 'GroundPolylineGeometry',
  'vc-geometry-plane': 'PlaneGeometry',
  'vc-geometry-outline-plane': 'PlaneOutlineGeometry',
  'vc-geometry-polygon': 'PolygonGeometry',
  'vc-geometry-outline-polygon': 'PolygonOutlineGeometry',
  'vc-geometry-polyline': 'PolylineGeometry',
  'vc-geometry-polyline-volume': 'PolylineVolumeGeometry',
  'vc-geometry-outline-polyline-volume': 'PolylineVolumeOutlineGeometry',
  'vc-geometry-rectangle': 'RectangleGeometry',
  'vc-geometry-outline-rectangle': 'RectangleOutlineGeometry',
  'vc-geometry-polyline-simple': 'SimplePolylineGeometry',
  'vc-geometry-sphere': 'SphereGeometry',
  'vc-geometry-outline-sphere': 'SphereOutlineGeometry',
  'vc-geometry-wall': 'WallGeometry',
  'vc-geometry-outline-wall': 'WallOutlineGeometry',
  // stage
  'vc-stage-process-post': 'PostProcessStage',
  'vc-collection-stage-process-post': 'PostProcessStageCollection',
  // extend
  'vc-measure-distance': 'VcMeasureDistance',
  'vc-measure-area': 'VcMeasureArea',
  'vc-measure-height': 'VcMeasureHeight',
  'vc-handler-draw-point': 'VcHandlerDrawPoint',
  'vc-handler-draw-polyline': 'VcHandlerDrawPolyline',
  'vc-handler-draw-polygon': 'VcHandlerDrawPolygon',
  'vc-kriging-map': 'VcKrigingMap',
  'vc-heatmap': 'VcHeatmap',
  'vc-windmap': 'VcWindMap',
  'vc-analytics-flood': 'VcAnalyticsFlood',
  'vc-scan-circle': 'VcScanCircle',
  'vc-scan-radar': 'VcScanRadar',
  'vc-ripple-circle-double': 'VcRippleCircleDouble',
  'vc-circle-roatating-double': 'VcCircleRoatatingDouble',
  'vc-shine-ellipse': 'VcShineEllipse',
  'vc-shine-point': 'VcShinePoint',
  'vc-trail-polyline': 'VcTrailPolyline',
  'vc-trail-wall': 'VcTrailWall',
  'vc-overlay-html': 'VcOverlayHtml'
};

export default nameClassMap;