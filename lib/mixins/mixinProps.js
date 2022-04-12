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
import { lnglatValidator } from '../utils/util';
import { makeCartesian3, makeQuaternion, makeColor, makeDistanceDisplayCondition, makeBoundingRectangle, makeCartesian2, makeNearFarScalar, makeMaterial, makeCartesian3Array, makeTranslationRotationScale, makePlane, makePolygonHierarchy, makeCartesian2Array, makeRectangle, makeOptions } from '../utils/cesiumHelpers';

// Entity start

/**
 * @const {Object, Array, Function}  position mixin
 * 坐标位置属性。
 * @example
 * :position = { lng: number, lat: number, height: number }
 * :position = { x: number, y: number, z: number }
 * :position = [number, number, number]
 */

var position = {
  props: {
    position: {
      type: [Object, Array, Function],
      validator: function validator(val) {
        return val && Object.prototype.hasOwnProperty.call(val, 'lng') ? lnglatValidator(val.lng, val.lat) : true;
      },
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Object, Array, Function} orientation mixin
 */

var orientation = {
  props: {
    orientation: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeQuaternion
      }
    }
  }
}; // Entity end
// BillboardGraphics start

/**
 * @const {Object, Array, Function} alignedAxis mixin
 */

var alignedAxis = {
  props: {
    alignedAxis: {
      type: [Object, Array, Function],
      default: function _default() {
        return {
          x: 0,
          y: 0,
          z: 0
        };
      },
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Object, String, Array, Function} color mixin
 */

var color = {
  props: {
    color: {
      type: [Object, String, Array, Function],
      default: 'white',
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Number, Object, Function} disableDepthTestDistance mixin
 */

var disableDepthTestDistance = {
  props: {
    disableDepthTestDistance: [Number, Object, Function]
  }
};
/**
 * @const {Object, Array, Function}  distanceDisplayCondition mixin
 */

var distanceDisplayCondition = {
  props: {
    distanceDisplayCondition: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeDistanceDisplayCondition
      }
    }
  }
};
/**
 * @const {Object, Array, Function}  eyeOffset mixin
 */

var eyeOffset = {
  props: {
    eyeOffset: {
      type: [Object, Array, Function],
      default: function _default() {
        return {
          x: 0,
          y: 0,
          z: 0
        };
      },
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Number, Object, Function} height mixin
 */

var height = {
  props: {
    height: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} heightReference mixin
 */

var heightReference = {
  props: {
    heightReference: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {Number, Object, Function} horizontalOrigin mixin
 */

var horizontalOrigin = {
  props: {
    horizontalOrigin: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {String, Object, HTMLCanvasElement, Function} image mixin
 */

var image = {
  props: {
    image: [String, Object, HTMLCanvasElement, Function]
  }
};
/**
 * @const {Object, Array, Function} imageSubRegion mixin
 */

var imageSubRegion = {
  props: {
    imageSubRegion: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeBoundingRectangle
      }
    }
  }
};
/**
 * @const {Object, Array, Function}  pixelOffset mixin
 */

var pixelOffset = {
  props: {
    pixelOffset: {
      type: [Object, Array, Function],
      default: function _default() {
        return {
          x: 0,
          y: 0
        };
      },
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2
      }
    }
  }
};
/**
 * @const {Object, Array, Function} pixelOffsetScaleByDistance mixin
 */

var pixelOffsetScaleByDistance = {
  props: {
    pixelOffsetScaleByDistance: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeNearFarScalar
      }
    }
  }
};
/**
 * @const {Number, Object, Function} rotation mixin
 */

var rotation = {
  props: {
    rotation: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {Number, Object, Function} scale mixin
 */

var scale = {
  props: {
    scale: {
      type: [Number, Object, Function],
      default: 1.0
    }
  }
};
/**
 * @const {Object, Array, Function} scaleByDistance mixin
 */

var scaleByDistance = {
  props: {
    scaleByDistance: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeNearFarScalar
      }
    }
  }
};
/**
 * @const {Boolean, Object, Function}  show mixin
 */

var show = {
  props: {
    show: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Boolean, Object, Function} sizeInMeters mixin
 */

var sizeInMeters = {
  props: {
    sizeInMeters: {
      type: [Boolean, Object, Function],
      default: false
    }
  }
};
/**
 * @const {Object, Array, Function} translucencyByDistance mixin
 */

var translucencyByDistance = {
  props: {
    translucencyByDistance: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeNearFarScalar
      }
    }
  }
};
/**
 * @const {Number, Object, Function}  verticalOrigin mixin
 */

var verticalOrigin = {
  props: {
    verticalOrigin: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {Number, Object, Function} width mixin
 */

var width = {
  props: {
    width: [Number, Object, Function]
  }
}; // BillboardGraphics end
// BoxGraphics start

/**
 * @const {Object, Array, Function} dimensions mixin
 * // 和 PlaneGraphics.dimensions 区分
 */

var dimensions = {
  props: {
    dimensions: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Boolean, Object, Function} fill mixin
 */

var fill = {
  props: {
    fill: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Object, String, Array, Function} material mixin
 */

var material = {
  props: {
    material: {
      type: [Object, String, Array, Function],
      default: 'white',
      watcherOptions: {
        cesiumObjectBuilder: makeMaterial
      }
    }
  }
};
/**
 * @const {Boolean, Object, Function} outline mixin
 */

var outline = {
  props: {
    outline: {
      type: [Boolean, Object, Function],
      default: false
    }
  }
};
/**
 * @const {Object, String, Array, Function} outlineColor mixin
 */

var outlineColor = {
  props: {
    outlineColor: {
      type: [Object, String, Array, Function],
      default: 'black',
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Number, Object, Function} outlineWidth mixin
 */

var outlineWidth = {
  props: {
    outlineWidth: {
      type: [Number, Object, Function],
      default: 1.0
    }
  }
};
/**
 * @const {Number, Object, Function} shadows mixin
 */

var shadows = {
  props: {
    shadows: [Number, Object, Function]
  }
}; // BoxGraphics end
// CorridorGraphics start

/**
 * @const {Array, Object, Function} positions mixin
 */

var positions = {
  props: {
    type: [Array, Object, Function],
    positions: {
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3Array,
        exclude: '_callback'
      }
    }
  }
};
/**
 * @const {Number, Object, Function} extrudedHeight mixin
 */

var extrudedHeight = {
  props: {
    extrudedHeight: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} extrudedHeightReference mixin
 */

var extrudedHeightReference = {
  props: {
    extrudedHeightReference: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} cornerType mixin
 */

var cornerType = {
  props: {
    cornerType: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {Number, Object, Function} granularity mixin
 */

var granularity = {
  props: {
    granularity: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} classificationType mixin
 */

var classificationType = {
  props: {
    classificationType: {
      type: [Number, Object, Function]
    }
  }
};
/**
 * @const {Number, Object, Function} zIndex mixin
 */

var zIndex = {
  props: {
    zIndex: [Number, Object, Function]
  }
}; // CorridorGraphics end
// CylinderGraphics start

/**
 * @const {Number, Object, Function} length mixin
 */

var length = {
  props: {
    length: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} topRadius mixin
 */

var topRadius = {
  props: {
    topRadius: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} bottomRadius mixin
 */

var bottomRadius = {
  props: {
    bottomRadius: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} numberOfVerticalLines mixin
 */

var numberOfVerticalLines = {
  props: {
    numberOfVerticalLines: {
      type: [Number, Object, Function],
      default: 16
    }
  }
};
/**
 * @const {Number, Object, Function} slices mixin
 */

var slices = {
  props: {
    slices: {
      type: [Number, Object, Function],
      default: 128
    }
  }
}; // CylinderGraphics end
// EllipseGraphics start

/**
 * @const {Number, Object, Function} semiMajorAxis mixin
 */

var semiMajorAxis = {
  props: {
    semiMajorAxis: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} semiMinorAxis mixin
 */

var semiMinorAxis = {
  props: {
    semiMinorAxis: [Number, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} stRotation mixin
 */

var stRotation = {
  props: {
    stRotation: {
      type: [Number, Object, Function],
      default: 0.0
    }
  }
}; // EllipseGraphics end
// EllipsoidGraphics start

/**
 * @const {Number, Object, Function} radii mixin
 */

var radii = {
  props: {
    radii: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Object, Array, Function} innerRadii mixin
 */

var innerRadii = {
  props: {
    innerRadii: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Number, Object, Function} minimumClock mixin
 */

var minimumClock = {
  props: {
    minimumClock: {
      type: [Number, Object, Function],
      default: 0.0
    }
  }
};
/**
 * @const {Number, Object, Function} maximumClock mixin
 */

var maximumClock = {
  props: {
    maximumClock: {
      type: [Number, Object, Function],
      default: 2 * Math.PI
    }
  }
};
/**
 * @const {Number, Object, Function} minimumCone mixin
 */

var minimumCone = {
  props: {
    minimumCone: {
      type: [Number, Object, Function],
      default: 0.0
    }
  }
};
/**
 * @const {Number, Object, Function} maximumCone mixin
 */

var maximumCone = {
  props: {
    maximumCone: {
      type: [Number, Object, Function],
      default: Math.PI
    }
  }
};
/**
 * @const {Number, Object, Function} stackPartitions mixin
 */

var stackPartitions = {
  props: {
    stackPartitions: {
      type: [Number, Object, Function],
      default: 64
    }
  }
};
/**
 * @const {Number, Object, Function} slicePartitions mixin
 */

var slicePartitions = {
  props: {
    slicePartitions: {
      type: [Number, Object, Function],
      default: 64
    }
  }
};
/**
 * @const {Number, Object, Function} subdivisions mixin
 */

var subdivisions = {
  props: {
    subdivisions: {
      type: [Number, Object, Function],
      default: 128
    }
  }
}; // EllipsoidGraphics end
// LabelGraphics start

/**
 * @const {String, Object, Function} text mixin
 */

var text = {
  props: {
    text: [String, Object, Function]
  }
};
/**
 * @const {String, Object, Function} font mixin
 */

var font = {
  props: {
    font: {
      type: [String, Object, Function],
      default: '30px sans-serif'
    }
  }
};
/**
 * @const {Number, Object, Function} labelStyle mixin
 */

var labelStyle = {
  props: {
    labelStyle: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {Boolean, Object, Function} showBackground mixin
 */

var showBackground = {
  props: {
    showBackground: {
      type: [Boolean, Object, Function],
      default: false
    }
  }
};
/**
 * @const {Object, String, Array, Function} backgroundColor mixin
 */

var backgroundColor = {
  props: {
    backgroundColor: {
      type: [Object, String, Array, Function],
      default: function _default() {
        return [0.165, 0.165, 0.165, 0.8];
      },
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Object, Array, Function} backgroundPadding mixin
 */

var backgroundPadding = {
  props: {
    backgroundPadding: {
      type: [Object, Array, Function],
      default: function _default() {
        return {
          x: 7,
          y: 5
        };
      },
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2
      }
    }
  }
};
/**
 * @const {Object, String, Array, Function} fillColor mixin
 */

var fillColor = {
  props: {
    fillColor: {
      type: [Object, String, Array, Function],
      default: 'white',
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
}; // LabelGraphics end
// ModelGraphics start

/**
 * @const {String, Object, Function} uri mixin
 */

var uri = {
  props: {
    uri: [String, Object, Function]
  }
};
/**
 * @const {Number, Object, Function} minimumPixelSize mixin
 */

var minimumPixelSize = {
  props: {
    minimumPixelSize: {
      type: [Number, Object, Function],
      default: 0.0
    }
  }
};
/**
 * @const {Number, Object, Function} maximumScale mixin
 */

var maximumScale = {
  props: {
    maximumScale: [Number, Object, Function]
  }
};
/**
 * @const {Boolean, Object, Function} incrementallyLoadTextures mixin
 */

var incrementallyLoadTextures = {
  props: {
    incrementallyLoadTextures: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Boolean, Object, Function} clampAnimations mixin
 */

var runAnimations = {
  props: {
    clampAnimations: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Boolean, Object, Function} clampAnimations mixin
 */

var clampAnimations = {
  props: {
    clampAnimations: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Object, String, Array, Function} silhouetteColor mixin
 */

var silhouetteColor = {
  props: {
    silhouetteColor: {
      typy: [Object, String, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Number, Object, Function} silhouetteSize mixin
 */

var silhouetteSize = {
  props: {
    silhouetteSize: {
      type: [Number, Object, Function],
      default: 0.0
    }
  }
};
/**
 * @const {Number, Object, Function} colorBlendMode mixin
 */

var colorBlendMode = {
  props: {
    colorBlendMode: {
      type: [Number, Object, Function],
      default: 0
    }
  }
};
/**
 * @const {Number, Object, Function} colorBlendAmount mixin
 */

var colorBlendAmount = {
  props: {
    colorBlendAmount: {
      type: [Number, Object, Function],
      default: 0.5
    }
  }
};
/**
 * @const {Object, Array, Function} imageBasedLightingFactor mixin
 */

var imageBasedLightingFactor = {
  props: {
    imageBasedLightingFactor: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2
      }
    }
  }
};
/**
 * @const {Object, String, Array, Function} lightColor mixin
 * 注意区别 Cesium3DTileset 的 lightColor
 */

var lightColor = {
  props: {
    lightColor: {
      typy: [Object, String, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Object, Function} nodeTransformations mixin
 */

var nodeTransformations = {
  props: {
    nodeTransformations: {
      type: [Object, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeTranslationRotationScale
      }
    }
  }
};
/**
 * @const {Object, Function} articulations mixin
 */

var articulations = {
  props: {
    articulations: [Object, Function]
  }
};
/**
 * @const {Object} clippingPlanes mixin
 */

var clippingPlanes = {
  props: {
    clippingPlanes: Object
  }
}; // ModelGraphics end
// PathGraphics start
// PathGraphics end
// PlaneGraphics start

/**
 * @const {Object, Array, Function} plane mixin
 */

var plane = {
  props: {
    plane: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makePlane
      }
    }
  }
}; // PlaneGraphics end
// PointGraphics start

/**
 * @const {Number, Object, Function} pixelSize mixin
 */

var pixelSize = {
  props: {
    pixelSize: {
      type: [Number, Object, Function],
      default: 1
    }
  }
}; // PointGraphics end
// PolygonGraphics start

/**
 * @const {Object, Array, Function} hierarchy mixin
 */

var hierarchy = {
  props: {
    hierarchy: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makePolygonHierarchy,
        exclude: '_callback'
      }
    }
  }
};
/**
 * @const {Boolean, Object, Function} perPositionHeight mixin
 */

var perPositionHeight = {
  props: {
    perPositionHeight: {
      type: [Boolean, Object, Function],
      default: false
    }
  }
};
/**
 * @const {Boolean, Object, Function} closeTop mixin
 */

var closeTop = {
  props: {
    closeTop: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Boolean, Object, Function} closeBottom mixin
 */

var closeBottom = {
  props: {
    closeBottom: {
      type: [Boolean, Object, Function],
      default: true
    }
  }
};
/**
 * @const {Number, Object, Function} arcType mixin
 */

var arcType = {
  props: {
    arcType: {
      type: [Number, Object, Function],
      default: 1
    }
  }
}; // PolygonGraphics end
// PolylineGraphics start

/**
 * @const {Object, String, Array, Function} depthFailMaterial  mixin
 */

var depthFailMaterial = {
  props: {
    depthFailMaterial: {
      type: [Object, String, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeMaterial
      }
    }
  }
};
/**
 * @const {Boolean, Object, Function} clampToGround mixin
 */

var clampToGround = {
  props: {
    clampToGround: {
      type: [Boolean, Object, Function],
      default: false
    }
  }
}; // PolylineGraphics end
// PolylineVolumeGraphics start

/**
 * @const {Array, Object, Function} shape mixin
 */

var shape = {
  props: {
    shape: {
      type: [Array, Object, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2Array
      }
    }
  }
}; // PolylineVolumeGraphics end
// RectangleGraphics start

/**
 * @const {Object, Array, Function} coordinates mixin
 */

var coordinates = {
  props: {
    coordinates: {
      type: [Object, Array, Function],
      watcherOptions: {
        cesiumObjectBuilder: makeRectangle
      }
    }
  }
}; // RectangleGraphics end
// Cesium3DTilesetGraphics start

/**
 * @const {Number, Object, Function} maximumScreenSpaceError mixin
 */

var maximumScreenSpaceError = {
  props: {
    maximumScreenSpaceError: {
      type: [Number, Object, Function],
      default: 16
    }
  }
}; // Cesium3DTilesetGraphics end
// WallGraphics start

/**
 * @const {Array, Object, Function} minimumHeights mixin
 */

var minimumHeights = {
  props: {
    minimumHeights: [Array, Object, Function]
  }
};
/**
 * @const {Array, Object, Function} maximumHeights mixin
 */

var maximumHeights = {
  props: {
    maximumHeights: [Array, Object, Function]
  }
}; // WallGraphics end
// Entity end
// ImageryLayer start

/**
 * @const {Object, Array} cutoutRectangle mixin
 */

var cutoutRectangle = {
  props: {
    cutoutRectangle: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeRectangle
      }
    }
  }
};
/**
 * @const {Object, String, Array} colorToAlpha mixin
 */

var colorToAlpha = {
  props: {
    colorToAlpha: {
      type: [Object, String, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
}; // ImageryLayer end
// imageryProvider

/**
 * @const {String, Object} url mixin
 */

var url = {
  props: {
    url: [String, Object]
  }
};
/**
 * @const {String} token mixin
 */

var token = {
  props: {
    token: String
  }
};
/**
 * @const {Object} tileDiscardPolicy mixin
 */

var tileDiscardPolicy = {
  props: {
    tileDiscardPolicy: Object
  }
};
/**
 * @const {String} layers mixin
 */

var layers = {
  props: {
    layers: String
  }
};
/**
 * @const {Boolean} enablePickFeatures mixin
 */

var enablePickFeatures = {
  props: {
    enablePickFeatures: {
      type: Boolean,
      default: true
    }
  }
};
/**
 * @const {Object, Array} rectangle mixin
 */

var rectangle = {
  props: {
    rectangle: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeRectangle
      }
    }
  }
};
/**
 * @const {Object} tilingScheme mixin
 */

var tilingScheme = {
  props: {
    tilingScheme: Object
  }
};
/**
 * @const {Object} ellipsoid mixin
 */

var ellipsoid = {
  props: {
    ellipsoid: Object
  }
};
/**
 * @const {String, Object} credit mixin
 */

var credit = {
  props: {
    credit: {
      type: [String, Object],
      default: ''
    }
  }
};
/**
 * @const {Number} tileWidth mixin
 */

var tileWidth = {
  props: {
    tileWidth: {
      type: Number,
      default: 256
    }
  }
};
/**
 * @const {Number} tileHeight mixin
 */

var tileHeight = {
  props: {
    tileHeight: {
      type: Number,
      default: 256
    }
  }
};
/**
 * @const {Number} maximumLevel mixin
 */

var maximumLevel = {
  props: {
    maximumLevel: Number
  }
};
/**
 * @const {Number} minimumLevel mixin
 */

var minimumLevel = {
  props: {
    minimumLevel: {
      type: Number,
      default: 0
    }
  }
};
/**
 * @const {String} fileExtension mixin
 */

var fileExtension = {
  props: {
    fileExtension: {
      type: String,
      default: 'png'
    }
  }
};
/**
 * @const {String} accessToken mixin
 */

var accessToken = {
  props: {
    accessToken: String
  }
};
/**
 * @const {String} format mixin
 */

var format = {
  props: {
    format: {
      type: String,
      default: 'png'
    }
  }
};
/**
 * @const {String, Array} subdomains mixin
 */

var subdomains = {
  props: {
    subdomains: [String, Array]
  }
};
/**
 * @const {Array} getFeatureInfoFormats mixin
 */

var getFeatureInfoFormats = {
  props: {
    getFeatureInfoFormats: Array
  }
};
/**
 * @const {Object} clock mixin
 */

var clock = {
  props: {
    clock: Object
  }
};
/**
 * @const {Object} times mixin
 */

var times = {
  props: {
    times: Object
  }
}; // primitive 相关

/**
 * @const {Boolean}
 * allowPicking
 * asynchronous
 */

var aaMixin = {
  props: {
    allowPicking: {
      type: Boolean,
      default: true
    },
    asynchronous: {
      type: Boolean,
      default: true
    }
  }
};
/**
 * @const {Boolean} debugShowShadowVolume mixin
 */

var debugShowShadowVolume = {
  props: {
    debugShowShadowVolume: {
      type: Boolean,
      default: false
    }
  }
};
/**
 * @const {Boolean} releaseGeometryInstances mixin
 */

var releaseGeometryInstances = {
  props: {
    releaseGeometryInstances: {
      type: Boolean,
      default: true
    }
  }
};
/**
 * @const {Boolean} interleave mixin
 */

var interleave = {
  props: {
    interleave: {
      type: Boolean,
      default: false
    }
  }
};
/**
 * @const {Object} appearance mixin
 */

var appearance = {
  props: {
    appearance: Object
  }
};
/**
 * @const {Array, Object} geometryInstances mixin
 */

var geometryInstances = {
  props: {
    geometryInstances: [Array, Object]
  }
};
/**
 * @const {Boolean}
 * vertexCacheOptimize
 * compressVertices
 */

var vcMixin = {
  props: {
    vertexCacheOptimize: {
      type: Boolean,
      default: false
    },
    compressVertices: {
      type: Boolean,
      default: true
    }
  }
};
/**
 * @const {Object} modelMatrix mixin
 */

var modelMatrix = {
  props: {
    modelMatrix: Object
  }
};
/**
 * @const {Boolean} debugShowBoundingVolume mixin
 */

var debugShowBoundingVolume = {
  props: {
    debugShowBoundingVolume: {
      tyep: Boolean,
      default: false
    }
  }
};
/**
 * @const {Object} scene mixin
 */

var scene = {
  props: {
    scene: Object
  }
};
/**
 * @const {Number} blendOption mixin
 */

var blendOption = {
  props: {
    blendOption: {
      type: Number,
      default: 2
    }
  }
};
/**
 * @const {*} id mixin
 */

var id = {
  props: {
    id: null
  }
};
/**
 * @const {Boolean} loop mixin
 */

var loop = {
  props: {
    loop: {
      type: Boolean,
      default: false
    }
  }
};
/**
 * @const {Boolean} debugWireframe mixin
 */

var debugWireframe = {
  props: {
    debugWireframe: {
      type: Boolean,
      default: false
    }
  }
}; // geometry 相关

/**
 * @const {Object} vertexFormat mixin
 */

var vertexFormat = {
  props: {
    vertexFormat: Object
  }
};
/**
 * @const {Object, Array} center mixin
 */

var center = {
  props: {
    center: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Object} radius mixin
 */

var radius = {
  props: {
    radius: Number
  }
};
/**
 * @const {Object} frustum mixin
 */

var frustum = {
  props: {
    frustum: Object
  }
};
/**
 * @const {Object, Array} origin mixin
 */

var origin = {
  props: {
    origin: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Object} polygonHierarchy mixin
 */

var polygonHierarchy = {
  props: {
    polygonHierarchy: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makePolygonHierarchy
      }
    }
  }
};
/**
 * @const {Object, String, Array} startColor mixin
 */

var startColor = {
  props: {
    startColor: {
      type: [Object, String, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Object, String, Array} endColor mixin
 */

var endColor = {
  props: {
    endColor: {
      type: [Object, String, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Object, Array} minimumImageSize mixin
 */

var minimumImageSize = {
  props: {
    minimumImageSize: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2
      }
    }
  }
};
/**
 * @const {Object, Array} maximumImageSize mixin
 */

var maximumImageSize = {
  props: {
    maximumImageSize: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2
      }
    }
  }
};
/**
 * @const {Object, Array} imageSize mixin
 */

var imageSize = {
  props: {
    imageSize: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2
      }
    }
  }
};
/**
 * @const {Array} shapePositions mixin
 */

var shapePositions = {
  props: {
    shapePositions: {
      type: Array,
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian2Array
      }
    }
  }
};
/**
 * @const {Array} polylinePositions mixin
 */

var polylinePositions = {
  props: {
    polylinePositions: {
      type: Array,
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3Array
      }
    }
  }
};
/**
 * @const {Object, String, Array} lightColor2 mixin
 * 用于 Cesium3DTileset 和 Model
 */

var lightColor2 = {
  props: {
    lightColor: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3
      }
    }
  }
};
/**
 * @const {Number} luminanceAtZenith mixin
 */

var luminanceAtZenith = {
  props: {
    luminanceAtZenith: {
      type: Number,
      default: 0.2
    }
  }
};
/**
 * @const {Array, Object} sphericalHarmonicCoefficients mixin
 */

var sphericalHarmonicCoefficients = {
  props: {
    sphericalHarmonicCoefficients: {
      type: [Array, Object],
      watcherOptions: {
        cesiumObjectBuilder: makeCartesian3Array
      }
    }
  }
};
/**
 * @const {String} specularEnvironmentMaps mixin
 */

var specularEnvironmentMaps = {
  props: {
    specularEnvironmentMaps: String
  }
};
/**
 * @const {Boolean} backFaceCulling mixin
 */

var backFaceCulling = {
  props: {
    backFaceCulling: {
      type: Boolean,
      default: true
    }
  }
}; // datasouce

/**
 * @const {String, Object} data mixin
 */

var data = {
  props: {
    data: {
      type: [String, Object],
      required: true
    }
  }
};
/**
 * @const {Object} options mixin
 */

var options = {
  props: {
    options: {
      type: Object,
      watcherOptions: {
        cesiumObjectBuilder: makeOptions,
        deep: true
      }
    }
  }
}; // PostProcessStage start

/**
 * @const {String, Array, Object} glowColor mixin
 */

var glowColor = {
  props: {
    glowColor: {
      type: [String, Array, Object],
      default: function _default() {
        return [0.0, 1.0, 0.0, 0.05];
      },
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {String, Array, Object} clearColor mixin
 */

var clearColor = {
  props: {
    clearColor: {
      type: [String, Array, Object],
      watcherOptions: {
        cesiumObjectBuilder: makeColor
      }
    }
  }
};
/**
 * @const {Object, Array} scissorRectangle mixin
 */

var scissorRectangle = {
  props: {
    scissorRectangle: {
      type: [Object, Array],
      watcherOptions: {
        cesiumObjectBuilder: makeBoundingRectangle
      }
    }
  }
}; // PostProcessStage end

export { aaMixin, accessToken, alignedAxis, appearance, arcType, articulations, backFaceCulling, backgroundColor, backgroundPadding, blendOption, bottomRadius, center, clampAnimations, clampToGround, classificationType, clearColor, clippingPlanes, clock, closeBottom, closeTop, color, colorBlendAmount, colorBlendMode, colorToAlpha, coordinates, cornerType, credit, cutoutRectangle, data, debugShowBoundingVolume, debugShowShadowVolume, debugWireframe, depthFailMaterial, dimensions, disableDepthTestDistance, distanceDisplayCondition, ellipsoid, enablePickFeatures, endColor, extrudedHeight, extrudedHeightReference, eyeOffset, fileExtension, fill, fillColor, font, format, frustum, geometryInstances, getFeatureInfoFormats, glowColor, granularity, height, heightReference, hierarchy, horizontalOrigin, id, image, imageBasedLightingFactor, imageSize, imageSubRegion, incrementallyLoadTextures, innerRadii, interleave, labelStyle, layers, length, lightColor, lightColor2, loop, luminanceAtZenith, material, maximumClock, maximumCone, maximumHeights, maximumImageSize, maximumLevel, maximumScale, maximumScreenSpaceError, minimumClock, minimumCone, minimumHeights, minimumImageSize, minimumLevel, minimumPixelSize, modelMatrix, nodeTransformations, numberOfVerticalLines, options, orientation, origin, outline, outlineColor, outlineWidth, perPositionHeight, pixelOffset, pixelOffsetScaleByDistance, pixelSize, plane, polygonHierarchy, polylinePositions, position, positions, radii, radius, rectangle, releaseGeometryInstances, rotation, runAnimations, scale, scaleByDistance, scene, scissorRectangle, semiMajorAxis, semiMinorAxis, shadows, shape, shapePositions, show, showBackground, silhouetteColor, silhouetteSize, sizeInMeters, slicePartitions, slices, specularEnvironmentMaps, sphericalHarmonicCoefficients, stRotation, stackPartitions, startColor, subdivisions, subdomains, text, tileDiscardPolicy, tileHeight, tileWidth, tilingScheme, times, token, topRadius, translucencyByDistance, uri, url, vcMixin, vertexFormat, verticalOrigin, width, zIndex };
