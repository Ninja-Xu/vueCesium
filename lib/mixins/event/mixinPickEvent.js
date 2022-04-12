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
import { isArray } from '../../utils/util.js';
import { Events } from '../../utils/events';

var methods = {
  registerEvents: function registerEvents(flag) {
    var viewer = this.viewer,
        cesiumObject = this.cesiumObject,
        enableEvent = this.enableEvent;
    var that = this;

    if (flag && enableEvent) {
      if (!this.$vc._screenSpaceEventHandler) {
        this.$vc._screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        var handler = this.$vc._screenSpaceEventHandler;
        Events['viewer-mouse-events'].forEach(function (eventName) {
          handler.setInputAction(action.bind({
            eventName: eventName,
            viewer: viewer
          }), Cesium.ScreenSpaceEventType[eventName]);
        });
      }

      Events['mouse-events'].forEach(function (eventName) {
        var listener = that.$listeners[eventName];
        listener && (cesiumObject[eventName] = listener.fns);
      });
    } else {
      Events['mouse-events'].forEach(function (eventName) {
        var listener = that.$listeners[eventName];
        listener && delete cesiumObject[eventName];
      });
    }
  }
};
var mixinPickEvent = {
  methods: methods
};

function action(movement) {
  var viewer = this.viewer,
      eventName = this.eventName;
  var position = movement.position || movement.endPosition;

  if (!position) {
    return;
  }

  var pickedFeatureAndCallbackNames = [];
  var callbackName;

  if (eventName.indexOf('LEFT_DOUBLE_CLICK') !== -1) {
    callbackName = 'dblclick';
  } else if (eventName.indexOf('CLICK') !== -1) {
    callbackName = 'click';
  } else if (eventName.indexOf('DOWN') !== -1) {
    callbackName = 'mousedown';
  } else if (eventName.indexOf('UP') !== -1) {
    callbackName = 'mouseup';
  } else if (eventName.indexOf('MOUSE_MOVE') !== -1) {
    callbackName = 'mousemove';
  }

  var callbackNameOut;

  if (callbackName === 'mousemove') {
    callbackNameOut = 'mouseout';
  } else if (callbackName === 'click') {
    callbackNameOut = 'clickout';
  }

  var pickedFeature = viewer.scene.pick(position);

  if (!Cesium.defined(pickedFeature)) {
    if (this.pickedFeature) {
      // 没有拾取到对象，this.pickedFeature又有记录，说明移出了。
      pickedFeatureAndCallbackNames.push({
        callbackName: callbackNameOut,
        pickedFeature: this.pickedFeature
      });
    }

    this.pickedFeature = undefined;
  } else {
    if (this.pickedFeature && this.pickedFeature.id !== pickedFeature.id) {
      pickedFeatureAndCallbackNames.push({
        // 拾取到对象，this.pickedFeature也有记录，两者不同，说明操作到另外一个对象上去了
        callbackName: callbackNameOut,
        pickedFeature: this.pickedFeature
      });
    }

    if (callbackName === 'mousemove' && (!this.pickedFeature || this.pickedFeature.id !== pickedFeature.id)) {
      pickedFeatureAndCallbackNames.push({
        callbackName: 'mouseover',
        pickedFeature: pickedFeature
      });
    }

    pickedFeatureAndCallbackNames.push({
      callbackName: callbackName,
      pickedFeature: pickedFeature
    });
  }

  if (pickedFeatureAndCallbackNames.length === 0) {
    return;
  }

  var intersection;
  var scene = viewer.scene;

  if (scene.mode === Cesium.SceneMode.SCENE3D) {
    var ray = scene.camera.getPickRay(position);
    intersection = scene.globe.pick(ray, scene);
  } else {
    intersection = scene.camera.pickEllipsoid(position, viewer.scene.globe.ellipsoid);
  }

  var button = -1;

  if (eventName.indexOf('LEFT') !== -1) {
    button = 0;
  } else if (eventName.indexOf('MIDDLE') !== -1) {
    button = 1;
  } else if (eventName.indexOf('RIGHT') !== -1) {
    button = 2;
  }

  var eventSourceList = [];
  pickedFeatureAndCallbackNames.forEach(function (item) {
    var callbackName = item.callbackName;
    var pickedFeature = item.pickedFeature;

    if (pickedFeature.id) {
      if (isArray(pickedFeature.id) && pickedFeature.id[0] instanceof Cesium.Entity) {
        // 数据源集合（集群）
        eventSourceList.push({
          callbackName: callbackName,
          cesiumObject: pickedFeature.id[0].entityCollection.owner,
          pickedFeature: pickedFeature
        });
      } else if (pickedFeature.id instanceof Cesium.Entity) {
        // 实体
        eventSourceList.push({
          callbackName: callbackName,
          cesiumObject: pickedFeature.id,
          pickedFeature: pickedFeature
        }); // 数据源

        eventSourceList.push({
          callbackName: callbackName,
          cesiumObject: pickedFeature.id.entityCollection.owner,
          pickedFeature: pickedFeature
        });
      }
    } // 图元


    if (pickedFeature.primitive) {
      eventSourceList.push({
        callbackName: callbackName,
        cesiumObject: pickedFeature.primitive,
        pickedFeature: pickedFeature
      });
    }

    var getParentCollection = function getParentCollection(e) {
      eventSourceList.push({
        callbackName: callbackName,
        cesiumObject: e,
        pickedFeature: pickedFeature
      });

      if (e._vcParent) {
        getParentCollection(e._vcParent);
      }
    }; // 图元集合


    if (pickedFeature.collection) {
      eventSourceList.push({
        callbackName: callbackName,
        cesiumObject: pickedFeature.collection,
        pickedFeature: pickedFeature
      });

      if (pickedFeature.collection._vcParent) {
        getParentCollection(pickedFeature.collection._vcParent);
      }
    }
  });
  eventSourceList.forEach(function (event) {
    event.cesiumObject[event.callbackName] && event.cesiumObject[event.callbackName]({
      type: "on".concat(event.callbackName),
      windowPosition: position,
      surfacePosition: intersection,
      pickedFeature: event.pickedFeature,
      button: button,
      cesiumObject: event.cesiumObject
    });
  });
  this.pickedFeature = pickedFeature;
}

export default mixinPickEvent;
