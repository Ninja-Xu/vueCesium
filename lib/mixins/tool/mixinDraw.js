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
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import cmp from '../virtualCmp';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && o[_Symbol$iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var props = {
  mode: {
    type: Number,
    default: 1
  },
  show: {
    type: Boolean,
    default: true
  },
  pointColor: {
    type: String | Object | Array,
    default: 'rgb(255,229,0)'
  },
  pointPixelSize: {
    type: Number,
    default: 8
  },
  editable: {
    type: Boolean,
    default: false
  },
  showDrawTip: {
    type: Boolean,
    default: true
  }
};
var watch = {
  editable: function editable(val) {
    if (!val) {
      this.showToolbar = false;
    } else {
      this.drawing = false;
    }
  },
  drawing: function drawing(val) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var nextTick, polylines, startNew, drawType, getVcParent, polyline, drawCmpNames, measureCmpNames, _iterator, _step, $node, listener;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              nextTick = false;
              polylines = _this.polylines, startNew = _this.startNew, drawType = _this.drawType, getVcParent = _this.getVcParent;
              polyline = polylines[polylines.length - 1];

              if (!(!val && polyline && !polyline.positions.length)) {
                _context.next = 8;
                break;
              }

              _this.polylines.pop();

              _this.showTooltip = false;
              _context.next = 30;
              break;

            case 8:
              if (!val) {
                _context.next = 29;
                break;
              }

              drawCmpNames = [];
              _context.t0 = drawType;
              _context.next = _context.t0 === 'pointDrawing' ? 13 : _context.t0 === 'polylineDrawing' ? 16 : _context.t0 === 'polygonDrawing' ? 19 : 22;
              break;

            case 13:
              drawCmpNames.push('vc-handler-draw-polyline');
              drawCmpNames.push('vc-handler-draw-polygon');
              return _context.abrupt("break", 22);

            case 16:
              drawCmpNames.push('vc-handler-draw-point');
              drawCmpNames.push('vc-handler-draw-polygon');
              return _context.abrupt("break", 22);

            case 19:
              drawCmpNames.push('vc-handler-draw-polyline');
              drawCmpNames.push('vc-handler-draw-point');
              return _context.abrupt("break", 22);

            case 22:
              measureCmpNames = ['vc-measure-height', 'vc-measure-distance', 'vc-measure-area'];
              _iterator = _createForOfIteratorHelper(getVcParent(_this).$slots.default || []);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  $node = _step.value;

                  if ($node.componentOptions && drawCmpNames.indexOf($node.componentOptions.tag) !== -1) {
                    $node.child.drawing = false;
                    nextTick = true;
                  }

                  if ($node.componentOptions && measureCmpNames.indexOf($node.componentOptions.tag) !== -1) {
                    $node.child.measuring = false;
                    nextTick = true;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              startNew();
              _this.showTooltip = true;
              _context.next = 30;
              break;

            case 29:
              _this.showTooltip = false;

            case 30:
              if (!_this.showTooltip) {
                _this.tooltipPosition = [0, 0, 0];
              }

              _context.t1 = nextTick;

              if (!_context.t1) {
                _context.next = 35;
                break;
              }

              _context.next = 35;
              return _this.$nextTick();

            case 35:
              _this.viewer.canvas.setAttribute('style', val ? 'cursor: crosshair' : 'cursor: auto');

              listener = _this.$listeners.activeEvt;
              listener && _this.$emit('activeEvt', {
                type: drawType,
                isActive: val
              });

            case 38:
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
          positionIndex: subIndex
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
              handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
              handler.setInputAction(_this3.LEFT_CLICK, Cesium.ScreenSpaceEventType.LEFT_CLICK);
              handler.setInputAction(_this3.MOUSE_MOVE, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
              handler.setInputAction(_this3.RIGHT_CLICK, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
              _this3.handler = handler;
              return _context2.abrupt("return", _this3.polylines);

            case 7:
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
  unload: function unload() {
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
    if (!this.drawing) {
      return;
    }

    if (this.editingPoint) {
      this.RIGHT_CLICK(movement);
      return;
    }

    var Cesium = this.Cesium,
        viewer = this.viewer,
        polylines = this.polylines,
        onDrawingEvt = this.onDrawingEvt; // const cartesian = viewer.scene.pickPosition(movement.position)

    var pick1 = new Cesium.Cartesian2(movement.position);
    var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1), viewer.scene); // if (!Cesium.defined(cartesian)) {
    //   return
    // }

    var nIndex = polylines.length - 1;
    var polyline = polylines[nIndex];
    polyline.positions.push(cartesian);
    onDrawingEvt(polyline, nIndex);
  },
  MOUSE_MOVE: function MOUSE_MOVE(movement) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      var Cesium, viewer, polylines, onDrawingEvt, drawType, pick1, cartesian, nIndex, polyline, listener;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (_this4.drawing) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              Cesium = _this4.Cesium, viewer = _this4.viewer, polylines = _this4.polylines, onDrawingEvt = _this4.onDrawingEvt, drawType = _this4.drawType; // const cartesian = viewer.scene.pickPosition(movement.endPosition)

              pick1 = new Cesium.Cartesian2(movement.endPosition);
              cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1), viewer.scene); // if (!Cesium.defined(cartesian)) {
              //   return
              // }

              _this4.tooltipPosition = cartesian;
              _this4.tooltip = _this4.$vc.lang.draw.drawingTip1;

              if (polylines.length) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return");

            case 9:
              nIndex = _this4.editingPoint ? _this4.editingPoint.polylineIndex : polylines.length - 1;
              polyline = polylines[nIndex];

              if (polyline.positions.length) {
                _context5.next = 13;
                break;
              }

              return _context5.abrupt("return");

            case 13:
              if (polyline.positions.length >= 2) {
                _this4.tooltip = _this4.editingPoint ? _this4.$vc.lang.draw.drawingTip3 : _this4.$vc.lang.draw.drawingTip2;
              }

              if (_this4.editingPoint) {
                polyline.positions.splice(_this4.editingPoint.positionIndex, 1, cartesian);
              } else {
                if (polyline.positions.length >= 2) {
                  polyline.positions.pop();
                }

                polyline.positions.push(cartesian);
              }

              listener = _this4.$listeners.movingEvt;
              listener && _this4.$emit('movingEvt', movement.endPosition, drawType);
              onDrawingEvt(polyline, nIndex);

            case 18:
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
      var viewer, polylines, mode, startNew, onDrawingEvt, nIndex, polyline, pick1, cartesian;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (_this5.drawing) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              viewer = _this5.viewer, polylines = _this5.polylines, mode = _this5.mode, startNew = _this5.startNew, onDrawingEvt = _this5.onDrawingEvt;

              if (polylines.length) {
                _context6.next = 5;
                break;
              }

              return _context6.abrupt("return");

            case 5:
              nIndex = _this5.editingPoint ? _this5.editingPoint.polylineIndex : polylines.length - 1; // const nIndex = polylines.length - 1

              polyline = polylines[nIndex];

              if (!(polyline.positions.length === 0)) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return");

            case 9:
              // const cartesian = viewer.scene.pickPosition(movement.position)
              pick1 = new Cesium.Cartesian2(movement.position);
              cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1), viewer.scene); // if (!Cesium.defined(cartesian)) {
              //   return
              // }

              if (!_this5.editingPoint) {
                if (polyline.positions.length > 1) {
                  polyline.positions.pop();
                }

                if (mode === 0) {
                  startNew();
                } else {
                  _this5.drawing = false;
                }
              } else {
                _this5.editingPoint = undefined;
                _this5.drawing = false;
              }

              _context6.next = 14;
              return _this5.$nextTick();

            case 14:
              onDrawingEvt(polyline, nIndex, true);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  startNew: function startNew() {
    var polylines = this.polylines;
    var poyline = {
      positions: []
    };
    Cesium.defined(polylines) && polylines.push(poyline);
  },
  clear: function clear() {
    this.polylines = [];
    this.drawing = false;
  },
  onDrawingEvt: function onDrawingEvt(polyline, index) {
    var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.index = index;

    if (!this.depthTest) {
      var rs = Cesium.RenderState.fromCache({
        depthMask: true,
        depthTest: {
          enabled: false
        }
      });
      this.$refs.pointCollection && (this.$refs.pointCollection.cesiumObject._rsOpaque = rs);

      if (Cesium.SuperMapImageryProvider) {
        this.$refs.polylineCollection && (this.$refs.polylineCollection.cesiumObject._opaqueRS = rs);
      } else {
        this.$refs.polylineCollection && (this.$refs.polylineCollection.cesiumObject._opaqueRS.depthTest.enabled = false);
      }
    }

    var listener = this.$listeners.drawEvt;
    listener && this.$emit('drawEvt', {
      polyline: polyline,
      type: this.drawType,
      finished: flag
    });
  },
  pointMouseOver: function pointMouseOver(e) {
    if (!this.editable) {
      return;
    }

    if (this.editingPoint) {
      return;
    }

    e.pickedFeature.primitive.pixelSize = this.pointPixelSize * 2.0;
    this.toolbarPosition = e.pickedFeature.primitive.position;
    this.showToolbar = true;
    this.mouseoverPoint = e.pickedFeature.primitive;
  },
  pointMouseOut: function pointMouseOut(e) {
    if (!this.editable) {
      return;
    }

    e.pickedFeature.primitive.pixelSize = this.pointPixelSize * 1.0;
    this.toolbarPosition = [0, 0, 0];
    this.showToolbar = false;
    this.mouseoverPoint = undefined;
  },
  onEditClick: function onEditClick(e) {
    this.editType = e;
    this.toolbarPosition = [0, 0, 0];
    this.showToolbar = false;

    if (!this.editable) {
      return;
    }

    this.drawing = false;

    if (e === 'delete') {
      var nIndex = this.mouseoverPoint.polylineIndex;
      var polyline = this.polylines[nIndex];
      polyline.positions.splice(this.mouseoverPoint.positionIndex, 1);
    } else if (e === 'insert') {
      var _nIndex = this.mouseoverPoint.polylineIndex;
      var _polyline = this.polylines[_nIndex];

      _polyline.positions.splice(this.mouseoverPoint.positionIndex, 0, this.mouseoverPoint.position);

      this.editingPoint = this.mouseoverPoint;
      this.drawing = true;
    } else {
      this.editingPoint = this.mouseoverPoint;
      this.drawing = true;
    }
  }
};
var mixinDraw = {
  mixins: [cmp],
  data: function data() {
    return {
      drawing: false,
      polylines: [],
      toolbarPosition: [0, 0, 0],
      showToolbar: false,
      tooltipPosition: [0, 0, 0],
      showTooltip: false,
      tooltip: ''
    };
  },
  props: props,
  watch: watch,
  computed: computed,
  methods: methods,
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

export default mixinDraw;
