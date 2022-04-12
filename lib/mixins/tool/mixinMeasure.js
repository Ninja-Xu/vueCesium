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
import _Array$from from '@babel/runtime-corejs2/core-js/array/from';
import _Symbol from '@babel/runtime-corejs2/core-js/symbol';
import _Symbol$iterator from '@babel/runtime-corejs2/core-js/symbol/iterator';
import _asyncToGenerator from '@babel/runtime-corejs2/helpers/esm/asyncToGenerator';
import _Object$assign from '@babel/runtime-corejs2/core-js/object/assign';
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import cmp from '../virtualCmp';
import VisibilityState from './VisibilityState';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && o[_Symbol$iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var props = {
  mode: {
    type: Number,
    default: 1
  },
  font: {
    type: String,
    default: '100 20px SimSun'
  },
  fillColor: {
    type: String | Object | Array,
    default: 'WHITE'
  },
  labelStyle: {
    type: Number,
    default: 2
  },
  showBackground: {
    type: Boolean,
    default: true
  },
  backgroundColor: {
    type: String | Object | Array,
    default: 'rgba(38, 38, 38, 0.85)'
  },
  outlineWidth: {
    type: Number,
    default: 1
  },
  outlineColor: {
    type: String | Object | Array,
    default: 'BLUE'
  },
  pixelOffset: {
    type: Object,
    default: function _default() {
      return {
        x: 15,
        y: -20
      };
    }
  },
  pointColor: {
    type: String | Object | Array,
    default: 'rgb(255,229,0)'
  },
  pointPixelSize: {
    type: Number,
    default: 8
  },
  polylineMaterial: {
    type: Object,
    default: function _default() {
      return {
        fabric: {
          type: 'Color',
          uniforms: {
            color: '#51ff00'
          }
        }
      };
    }
  },
  polylineWidth: {
    type: Number,
    default: 2
  },
  depthTest: {
    type: Boolean,
    default: false
  }
};
var watch = {
  measuring: function measuring(val) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var nextTick, polylines, startNew, type, getVcParent, polyline, measureCmpNames, drawCmpNames, _iterator, _step, $node, listener;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              nextTick = false;
              polylines = _this.polylines, startNew = _this.startNew, type = _this.type, getVcParent = _this.getVcParent;
              polyline = polylines[polylines.length - 1];

              if (!(!val && polyline && !polyline.positions.length)) {
                _context.next = 7;
                break;
              }

              _this.polylines.pop();

              _context.next = 25;
              break;

            case 7:
              if (!val) {
                _context.next = 25;
                break;
              }

              measureCmpNames = [];
              _context.t0 = type;
              _context.next = _context.t0 === 'distanceMeasuring' ? 12 : _context.t0 === 'areaMeasuring' ? 15 : _context.t0 === 'heightMeasuring' ? 18 : 21;
              break;

            case 12:
              measureCmpNames.push('vc-measure-height');
              measureCmpNames.push('vc-measure-area');
              return _context.abrupt("break", 21);

            case 15:
              measureCmpNames.push('vc-measure-distance');
              measureCmpNames.push('vc-measure-height');
              return _context.abrupt("break", 21);

            case 18:
              measureCmpNames.push('vc-measure-distance');
              measureCmpNames.push('vc-measure-area');
              return _context.abrupt("break", 21);

            case 21:
              drawCmpNames = ['vc-handler-draw-polyline', 'vc-handler-draw-point', 'vc-handler-draw-polygon'];
              _iterator = _createForOfIteratorHelper(getVcParent(_this).$slots.default || []);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  $node = _step.value;

                  if ($node.componentOptions && measureCmpNames.indexOf($node.componentOptions.tag) !== -1) {
                    $node.child.measuring = false;
                    nextTick = true;
                  }

                  if ($node.componentOptions && drawCmpNames.indexOf($node.componentOptions.tag) !== -1) {
                    $node.child.drawing = false;
                    nextTick = true;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              startNew();

            case 25:
              _context.t1 = nextTick;

              if (!_context.t1) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return _this.$nextTick();

            case 29:
              _this.viewer.canvas.setAttribute('style', val ? 'cursor: crosshair' : 'cursor: auto');

              listener = _this.$listeners.activeEvt;
              listener && _this.$emit('activeEvt', {
                type: type,
                isActive: val
              });

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
var computed = {
  points: function points() {
    var _this2 = this;

    var points = [];
    this.polylines.forEach(function (polyline, index) {
      polyline.positions.forEach(function (position, subIndex) {
        var point = {
          color: _this2.pointColor,
          pixelSize: _this2.pointPixelSize,
          position: position,
          polylineIndex: index,
          positionIndex: subIndex,
          disableDepthTestDistance: Cesium.SuperMapVersion ? 0 : Number.POSITIVE_INFINITY
        };
        points.push(point);
      });
    });
    return points;
  }
};
var methods = {
  createCesiumObject: function createCesiumObject() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var viewer, handler;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              viewer = _this3.viewer;
              viewer.scene.frameState.morphTime = 0;
              handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
              handler.setInputAction(_this3.LEFT_CLICK, Cesium.ScreenSpaceEventType.LEFT_CLICK);
              handler.setInputAction(_this3.MOUSE_MOVE, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
              handler.setInputAction(_this3.RIGHT_CLICK, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
              _this3.handler = handler;
              _this3.enterMoveAction = false;
              _this3.lastCartesianRemoved = false;
              _this3.visibilityState = new VisibilityState();
              return _context2.abrupt("return", _this3.polylines);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  mount: function mount() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", true);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  unmount: function unmount() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", true);

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  LEFT_CLICK: function LEFT_CLICK(movement) {
    if (!this.measuring) {
      return;
    }

    var Cesium = this.Cesium,
        viewer = this.viewer,
        polylines = this.polylines,
        type = this.type,
        onMeasureEvt = this.onMeasureEvt;
    var cartesian = this.getWorldPosition(viewer.scene, movement.position);

    if (!Cesium.defined(cartesian)) {
      return;
    }

    var nIndex = polylines.length - 1;
    var polyline = polylines[nIndex];

    if (type === 'distanceMeasuring' || type === 'areaMeasuring') {
      // 鼠标移动事件添加的移动点需要移除
      if (this.enterMoveAction) {
        polyline.positions.pop();
        polyline.distances && polyline.distances.pop();
        this.lastCartesianRemoved = true;
      }
    }

    polyline.positions.push(cartesian);
    var length = polyline.positions.length;

    if (length > 1) {
      // 重复点不计算
      if (Cesium.Cartesian3.distance(polyline.positions[length - 1], polyline.positions[length - 2]) < 1e-3) {
        polyline.positions.pop();
        return;
      }
    }

    switch (type) {
      case 'distanceMeasuring':
        polyline.distance = this.getDistance(polyline.positions);
        polyline.distances.push(polyline.distance);
        onMeasureEvt(polyline, nIndex);
        break;

      case 'areaMeasuring':
        polyline.area = this.getSurfaceArea(polyline.positions);
        polyline.projectedArea = this.getProjectedArea(polyline.positions);
        polyline.distance = this.getDistance(polyline.positions);
        polyline.distances.push(polyline.distance);

        if (polyline.positions.length > 2 && !this.enterMoveAction) {
          if (this.moveLastDistance) {
            polyline.distances.pop();
          }

          var clonePoistions = Cesium.clone(polyline.positions, true);
          clonePoistions.push(polyline.positions[0]);
          var distance = this.getDistance(clonePoistions);
          polyline.distances.push(distance);
          polyline.distance = distance;
          this.moveLastDistance = true;
        }

        onMeasureEvt(polyline, nIndex);
        break;

      case 'heightMeasuring':
        polyline.positions.pop();

        if (polyline.positions.length === 0) {
          polyline.positions.push(cartesian);
          this.startPoint = cartesian;
        }

        onMeasureEvt(polyline, this.labels);
        break;
    }
  },
  MOUSE_MOVE: function MOUSE_MOVE(movement) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      var viewer, polylines, onMeasureEvt, type, nIndex, polyline, cartesian, listener, distance, _distance, clonePoistions, labels;

      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (_this4.measuring) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              viewer = _this4.viewer, polylines = _this4.polylines, onMeasureEvt = _this4.onMeasureEvt, type = _this4.type;

              if (polylines.length) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return");

            case 5:
              nIndex = polylines.length - 1;
              polyline = polylines[nIndex];

              if (polyline.positions.length) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return");

            case 9:
              cartesian = _this4.getWorldPosition(viewer.scene, movement.endPosition);

              if (Cesium.defined(cartesian)) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return");

            case 12:
              _this4.enterMoveAction = true;
              listener = _this4.$listeners.movingEvt;
              listener && _this4.$emit('movingEvt', movement.endPosition, type);

              if (!(type === 'distanceMeasuring' || type === 'areaMeasuring')) {
                _context5.next = 25;
                break;
              }

              if (polyline.positions.length >= 2) {
                // 如果鼠标左键点击事件移除了 不需要再移除
                if (!_this4.lastCartesianRemoved) {
                  polyline.positions.pop();
                  polyline.distances && polyline.distances.pop();
                }

                if (type === 'areaMeasuring') {
                  polyline.distances && polyline.distances.pop();
                }
              }

              polyline.positions.push(cartesian);
              _this4.lastCartesianRemoved = false;

              if (type === 'distanceMeasuring') {
                distance = _this4.getDistance(polyline.positions);
                polyline.distances.push(distance);
                polyline.distance = distance;
                nIndex = polylines.reduce(function (pre, cur) {
                  return pre + cur.positions.length - 1;
                }, 0) - 1;
              } else {
                polyline.area = _this4.getSurfaceArea(polyline.positions);
                polyline.projectedArea = _this4.getProjectedArea(polyline.positions);
                _distance = _this4.getDistance(polyline.positions);
                polyline.distances.push(_distance);
                polyline.distance = _distance;

                if (polyline.positions.length >= 2) {
                  clonePoistions = Cesium.clone(polyline.positions, true);
                  clonePoistions.push(polyline.positions[0]);
                  _distance = _this4.getDistance(clonePoistions);
                  polyline.distances.push(_distance);
                  polyline.distance = _distance;
                }
              }

              _context5.next = 22;
              return _this4.$nextTick();

            case 22:
              onMeasureEvt(polyline, nIndex);
              _context5.next = 30;
              break;

            case 25:
              labels = _this4.labels;

              _this4.getHeight(cartesian, polyline);

              _context5.next = 29;
              return _this4.$nextTick();

            case 29:
              onMeasureEvt(polyline, labels);

            case 30:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  RIGHT_CLICK: function RIGHT_CLICK(movement) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
      var viewer, polylines, mode, startNew, onMeasureEvt, type, removeLastPosition, nIndex, polyline, cartesian, getDistance, getSurfaceArea, getProjectedArea, clonePoistions, distance, labels;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (_this5.measuring) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              viewer = _this5.viewer, polylines = _this5.polylines, mode = _this5.mode, startNew = _this5.startNew, onMeasureEvt = _this5.onMeasureEvt, type = _this5.type, removeLastPosition = _this5.removeLastPosition;

              if (polylines.length) {
                _context6.next = 5;
                break;
              }

              return _context6.abrupt("return");

            case 5:
              nIndex = polylines.length - 1;
              polyline = polylines[nIndex];

              if (!(polyline.positions.length === 0)) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return");

            case 9:
              cartesian = _this5.getWorldPosition(viewer.scene, movement.position);

              if (Cesium.defined(cartesian)) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt("return");

            case 12:
              if (type === 'distanceMeasuring') {
                if (removeLastPosition) {
                  polyline.positions.pop();
                  polyline.distances.pop();
                }

                getDistance = _this5.getDistance;
                polyline.distance = getDistance(polyline.positions);

                if (polyline.positions.length === 1) {
                  polyline.positions = [];
                }

                nIndex = polylines.reduce(function (pre, cur) {
                  return pre + cur.positions.length - 1;
                }, 0) - 1;
              } else if (type === 'areaMeasuring') {
                if (removeLastPosition) {
                  polyline.positions.pop();
                  polyline.distances.pop();
                }

                getSurfaceArea = _this5.getSurfaceArea, getProjectedArea = _this5.getProjectedArea;
                polyline.area = getSurfaceArea(polyline.positions);
                polyline.projectedArea = getProjectedArea(polyline.positions);
                polyline.distance = _this5.getDistance(polyline.positions);

                if (polyline.positions.length >= 2 && _this5.enterMoveAction) {
                  polyline.distances.pop();
                  clonePoistions = Cesium.clone(polyline.positions, true);
                  clonePoistions.push(polyline.positions[0]);
                  distance = _this5.getDistance(clonePoistions);
                  polyline.distances.push(distance);
                  polyline.distance = distance;
                }

                _this5.moveLastDistance = false;

                if (polyline.positions.length <= 2) {
                  polyline.positions = [];
                }
              } else {
                _this5.getHeight(cartesian, polyline);
              }

              if (mode === 0) {
                startNew();
              } else {
                _this5.measuring = false;
              }

              _context6.next = 16;
              return _this5.$nextTick();

            case 16:
              if (type === 'distanceMeasuring' || type === 'areaMeasuring') {
                onMeasureEvt(polyline, nIndex, true);
              } else {
                labels = _this5.labels;
                onMeasureEvt(polyline, labels, true);
              }

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  startNew: function startNew() {
    var polylines = this.polylines,
        type = this.type;

    if (!Cesium.defined(polylines)) {
      return;
    }

    var polyline = {
      positions: []
    };

    if (type === 'distanceMeasuring') {
      _Object$assign(polyline, {
        distances: [],
        distance: 0
      });
    } else if (type === 'areaMeasuring') {
      _Object$assign(polyline, {
        area: 0,
        projectedArea: 0,
        distances: [],
        distance: 0
      });
    } else {
      _Object$assign(polyline, {
        distanceH: 0,
        height: 0,
        distanceS: 0
      });
    }

    polylines.push(polyline);
  },

  /**
   * 根据传入坐标数组计算距离。
   * @param {Array.Cartesian3} positions 传入的坐标数组
   * @returns {Number} 返回长度数值。
   */
  getDistance: function getDistance(positions) {
    var _Cesium = Cesium,
        Cartesian3 = _Cesium.Cartesian3;
    var clampToGround = this.clampToGround,
        getGeodesicDistance = this.getGeodesicDistance;
    var distance = 0;

    for (var i = 0; i < positions.length - 1; i++) {
      var s = 0;

      if (clampToGround) {
        // Cartesian.distance gives the straight line distance between the two points, ignoring curvature. This is not what we want.
        // Cartesian3.distance 计算的是两点之间的直线距离，忽略了地球曲率，贴地时不太合理。
        // 2.0.3 版本增加测地线距离（GeodesicDistance）。
        s = getGeodesicDistance(positions[i], positions[i + 1]);
      } else {
        s = Cartesian3.distance(positions[i], positions[i + 1]);
      }

      distance = distance + s;
    }

    return distance;
  },

  /**
   * 返回两点之间的测地距离。
   * @param {Cartesian3} pointOne 第一个坐标点
   * @param {Cartesian3} pointTwo 第二个坐标点
   * @returns {Number} 返回两点之间的测地距离。
   */
  getGeodesicDistance: function getGeodesicDistance(pointOne, pointTwo) {
    var _Cesium2 = Cesium,
        EllipsoidGeodesic = _Cesium2.EllipsoidGeodesic;
    var viewer = this.viewer;
    var pickedPointCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pointOne);
    var lastPointCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pointTwo);
    var geodesic = new EllipsoidGeodesic(pickedPointCartographic, lastPointCartographic);
    return geodesic.surfaceDistance;
  },
  getHeight: function getHeight(endPoint, polyline) {
    var labels = this.labels; // let endPoint = cartesian

    var normalStart = {};
    Cesium.Cartesian3.normalize(this.startPoint, normalStart);
    var planeStart = new Cesium.Plane(normalStart, -Cesium.Cartesian3.distance(this.startPoint, new Cesium.Cartesian3(0, 0, 0)));
    var hypPoint = {};
    polyline.height = Cesium.Plane.getPointDistance(planeStart, endPoint);
    var labelPositonHeight = {};
    var labelPositonH = {};
    var labelPositonS = {};

    if (polyline.height <= 0) {
      Cesium.Plane.projectPointOntoPlane(planeStart, endPoint, hypPoint);
      Cesium.Cartesian3.midpoint(endPoint, hypPoint, labelPositonHeight);
      Cesium.Cartesian3.midpoint(this.startPoint, hypPoint, labelPositonH);
      polyline.distanceH = Cesium.Cartesian3.distance(this.startPoint, hypPoint);
    } else {
      var normalEnd = {};
      Cesium.Cartesian3.normalize(endPoint, normalEnd);
      var planeEnd = new Cesium.Plane(normalStart, -Cesium.Cartesian3.distance(endPoint, new Cesium.Cartesian3(0, 0, 0)));
      Cesium.Plane.projectPointOntoPlane(planeEnd, this.startPoint, hypPoint);
      Cesium.Cartesian3.midpoint(this.startPoint, hypPoint, labelPositonHeight);
      Cesium.Cartesian3.midpoint(endPoint, hypPoint, labelPositonH);
      polyline.distanceH = Cesium.Cartesian3.distance(endPoint, hypPoint);
    }

    polyline.distanceS = Cesium.Cartesian3.distance(this.startPoint, endPoint);
    Cesium.Cartesian3.midpoint(this.startPoint, endPoint, labelPositonS);
    polyline.height = Math.abs(polyline.height);

    if (polyline.positions.length !== 1) {
      polyline.positions.pop();
      polyline.positions.pop();
      labels.pop();
      labels.pop();
      labels.pop();
    }

    polyline.positions.push(endPoint);
    polyline.positions.push(hypPoint);
    var labelTextHeight = polyline.height > 1000 ? (polyline.height / 1000).toFixed(2) + 'km' : polyline.height.toFixed(2) + 'm';
    labels.push({
      text: this.$vc.lang.measure.verticalHeight + ': ' + labelTextHeight,
      position: labelPositonHeight
    });
    var labelTextH = polyline.distanceH > 1000 ? (polyline.distanceH / 1000).toFixed(2) + 'km' : polyline.distanceH.toFixed(2) + 'm';
    labels.push({
      text: this.$vc.lang.measure.horizontalDistance + ': ' + labelTextH,
      position: labelPositonH
    });
    var labelTextS = polyline.distanceS > 1000 ? (polyline.distanceS / 1000).toFixed(2) + 'km' : polyline.distanceS.toFixed(2) + 'm';
    labels.push({
      text: this.$vc.lang.measure.spaceDistance + ': ' + labelTextS,
      position: labelPositonS
    });
  },
  onMeasureEvt: function onMeasureEvt(polyline, index) {
    var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!this.depthTest) {
      var rs = Cesium.RenderState.fromCache({
        depthMask: true,
        depthTest: {
          enabled: false
        }
      });

      if (Cesium.SuperMapVersion) {
        this.$refs.polylineCollection && (this.$refs.polylineCollection.cesiumObject._opaqueRS = rs);
        this.$refs.pointCollection && (this.$refs.pointCollection.cesiumObject._rsOpaque = rs);
        this.$refs.labelCollection.cesiumObject._billboardCollection._rsTranslucent = rs;
        this.$refs.labelCollection.cesiumObject._backgroundBillboardCollection._rsTranslucent = rs;
      } else {
        this.$refs.polylineCollection && (this.$refs.polylineCollection.cesiumObject._opaqueRS.depthTest.enabled = false);
      }

      var listener = this.$listeners.measureEvt;
      var type = this.type;

      if (type === 'distanceMeasuring' || type === 'areaMeasuring') {
        listener && this.$emit('measureEvt', {
          polyline: polyline,
          label: this.$refs.labelCollection.cesiumObject.get(index),
          type: type,
          finished: flag
        });
      } else {
        var labels = index;
        var labelsResult = {
          labelHeight: this.$refs.labelCollection.cesiumObject.get(labels.length - 3),
          labelH: this.$refs.labelCollection.cesiumObject.get(labels.length - 2),
          labelS: this.$refs.labelCollection.cesiumObject.get(labels.length - 1)
        };
        listener && this.$emit('measureEvt', {
          polyline: polyline,
          label: labelsResult,
          type: 'heightMeasuring',
          finished: flag
        });
      }
    }
  },
  getWorldPosition: function getWorldPosition(scene, windowPosition, result) {
    var _Cesium3 = Cesium,
        Cesium3DTileFeature = _Cesium3.Cesium3DTileFeature,
        Cesium3DTileset = _Cesium3.Cesium3DTileset,
        Cartesian3 = _Cesium3.Cartesian3,
        defined = _Cesium3.defined,
        Model = _Cesium3.Model,
        Ray = _Cesium3.Ray;

    if (Cesium.SuperMapVersion) {
      // 超图版本下 PointPrimitive 在隐藏了的状态下仍然能被拾取到
      // 因此直接返回拾取坐标
      return scene.pickPosition(windowPosition);
    }

    var position;
    var cartesianScratch = {};
    var rayScratch = new Ray();

    if (scene.pickPositionSupported) {
      this.visibilityState.hide(scene);
      var pickObj = scene.pick(windowPosition, 1, 1);
      this.visibilityState.restore(scene);

      if (defined(pickObj)) {
        if (pickObj instanceof Cesium3DTileFeature || pickObj.primitive instanceof Cesium3DTileset || pickObj.primitive instanceof Model || pickObj.primitive instanceof Cesium.S3MTilesLayer) {
          position = scene.pickPosition(windowPosition, cartesianScratch);

          if (Cesium.defined(position)) {
            return Cartesian3.clone(position, result);
          }
        }
      }
    }

    if (defined(scene.globe)) {
      var ray = scene.camera.getPickRay(windowPosition, rayScratch);
      position = scene.globe.pick(ray, scene, cartesianScratch);
      return defined(position) ? Cartesian3.clone(position, result) : undefined;
    }

    return undefined;
  }
};
var mixinMeasure = {
  mixins: [cmp],
  props: props,
  watch: watch,
  computed: computed,
  methods: methods,
  created: function created() {
    var _this6 = this;

    Object.defineProperties(this, {
      polyline: {
        enumerable: true,
        get: function get() {
          return _this6.polyline;
        }
      }
    });
  },
  destroyed: function destroyed() {
    var handler = this.handler;

    if (handler) {
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      handler.destroy();
    }
  }
};

export default mixinMeasure;
