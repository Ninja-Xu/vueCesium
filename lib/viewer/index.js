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
import _toConsumableArray from '@babel/runtime-corejs2/helpers/esm/toConsumableArray';
import _asyncToGenerator from '@babel/runtime-corejs2/helpers/esm/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import _Object$assign from '@babel/runtime-corejs2/core-js/object/assign';
import _Promise from '@babel/runtime-corejs2/core-js/promise';
import _Array$from from '@babel/runtime-corejs2/core-js/array/from';
import _Symbol from '@babel/runtime-corejs2/core-js/symbol';
import _Symbol$iterator from '@babel/runtime-corejs2/core-js/symbol/iterator';
import bindEvents from '../utils/bindEvent.js';
import { Events } from '../utils/events';
import services from '../mixins/services';
import mergeDescriptors from '../utils/mergeDescriptors.js';
import { isArray, dirname } from '../utils/util.js';
import lang from '../exts/lang';

/**
 * 加载Mars3D平台CDN资源文件，
 * 这些文件可以从  http://mars3d.cn/download/lib.rar  下载后放在本地项目目录引入。
 * @param {string} libpath 根目录，如：http://mars3d.cn/lib/
 * @return {*}
 */
function getMars3dConfig(libpath) {
  var libsConfig = {
    'font-awesome': [libpath + 'fonts/font-awesome/css/font-awesome.min.css'],
    haoutil: [libpath + 'hao/haoutil.js'],
    turf: [libpath + 'turf/turf.min.js'],
    'mars3d-space': [// 卫星插件
    libpath + 'mars3d/plugins/space/mars3d-space.js'],
    'mars3d-echarts': [// echarts支持插件
    libpath + 'echarts/echarts.min.js', libpath + 'echarts/echarts-gl.min.js', libpath + 'mars3d/plugins/echarts/mars3d-echarts.js'],
    'mars3d-mapv': [// mapv支持插件
    libpath + 'mapV/mapv.min.js', libpath + 'mars3d/plugins/mapv/mars3d-mapv.js'],
    'mars3d-heatmap': [// heatmap热力图支持插件
    libpath + 'mars3d/plugins/heatmap/heatmap.min.js', libpath + 'mars3d/plugins/heatmap/mars3d-heatmap.js'],
    'mars3d-wind': [// 风场图层插件
    libpath + 'mars3d/plugins/wind/netcdfjs.js', // m10_windLayer解析nc
    libpath + 'mars3d/plugins/wind/mars3d-wind.js'],
    mars3d: [// 三维地球“主库”
    libpath + 'Cesium/Widgets/widgets.css', // cesium
    libpath + 'Cesium/Cesium.js', libpath + 'mars3d/mars3d.css', // mars3d
    libpath + 'mars3d/mars3d.js']
  };
  return libsConfig;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && o[_Symbol$iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var loadLibs = [];
var script = {
  name: 'vc-viewer',
  mixins: [services],
  props: {
    cesiumPath: String,
    animation: {
      type: Boolean,
      default: false
    },
    baseLayerPicker: {
      type: Boolean,
      default: false
    },
    fullscreenButton: {
      type: Boolean,
      default: false
    },
    vrButton: {
      type: Boolean,
      default: false
    },
    geocoder: {
      type: [Boolean, Array],
      default: false
    },
    homeButton: {
      type: Boolean,
      default: false
    },
    infoBox: {
      type: Boolean,
      default: true
    },
    sceneModePicker: {
      type: Boolean,
      default: false
    },
    selectionIndicator: {
      type: Boolean,
      default: true
    },
    timeline: {
      type: Boolean,
      default: false
    },
    navigationHelpButton: {
      type: Boolean,
      default: false
    },
    navigationInstructionsInitiallyVisible: {
      type: Boolean,
      default: false
    },
    scene3DOnly: {
      type: Boolean,
      default: false
    },
    shouldAnimate: {
      type: Boolean,
      default: false
    },
    clockViewModel: Object,
    selectedImageryProviderViewModel: Object,
    imageryProviderViewModels: Object,
    selectedTerrainProviderViewModel: Object,
    terrainProviderViewModels: Object,
    imageryProvider: Object,
    terrainProvider: Object,
    skyBox: [Object, Boolean],
    skyAtmosphere: [Object, Boolean],
    fullscreenElement: {
      type: [Element, String]
    },
    useDefaultRenderLoop: {
      type: Boolean,
      default: true
    },
    targetFrameRate: Number,
    showRenderLoopErrors: {
      type: Boolean,
      default: true
    },
    automaticallyTrackDataSourceClocks: {
      type: Boolean,
      default: true
    },
    contextOptions: Object,
    sceneMode: {
      type: Number,
      default: 3
    },
    mapProjection: Object,
    globe: Object,
    orderIndependentTranslucency: {
      type: Boolean,
      default: true
    },
    creditContainer: [Element, String],
    creditViewport: [Element, String],
    dataSources: Object,
    terrainExaggeration: {
      type: Number,
      default: 1.0
    },
    shadows: {
      type: Boolean,
      default: false
    },
    terrainShadows: {
      type: Number,
      default: 3
    },
    mapMode2D: {
      type: Number,
      default: 1
    },
    projectionPicker: {
      type: Boolean,
      default: false
    },
    requestRenderMode: {
      type: Boolean,
      default: false
    },
    maximumRenderTimeChange: {
      type: Number,
      default: 0.0
    },
    logo: {
      type: Boolean,
      default: true
    },
    accessToken: String,
    camera: {
      type: Object,
      default: function _default() {
        return {
          position: {
            lng: 105,
            lat: 29.999999999999993,
            height: 19059568.497290563
          },
          heading: 360,
          pitch: -90,
          roll: 0
        };
      }
    },
    navigation: {
      // for supermap
      type: Boolean,
      default: false
    },
    TZcode: {
      type: String // default: new Date().getTimezoneOffset() === 0 ? 'UTC' : 'UTC' + '+' + -(new Date().getTimezoneOffset() / 60)

    },
    UTCoffset: {
      type: Number // default: -new Date().getTimezoneOffset()

    },
    removeCesiumScript: {
      type: Boolean,
      default: true
    },
    autoSortImageryLayers: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    selectionIndicator: function selectionIndicator(val) {
      var viewer = this.viewer,
          viewerContainer = this.viewerContainer;

      if (Cesium.defined(viewer.selectionIndicator) && !viewer.selectionIndicator.isDestroyed() && !val) {
        var selectionIndicatorContainer = viewer.selectionIndicator.container;
        viewerContainer.removeChild(selectionIndicatorContainer);
        viewer.selectionIndicator.destroy();
        viewer._selectionIndicator = undefined;
      } else if (!Cesium.defined(viewer.selectionIndicator) || viewer.selectionIndicator.isDestroyed()) {
        var _selectionIndicatorContainer = document.createElement('div');

        _selectionIndicatorContainer.className = 'cesium-viewer-selectionIndicatorContainer';
        viewerContainer.appendChild(_selectionIndicatorContainer);
        var selectionIndicator = new Cesium.SelectionIndicator(_selectionIndicatorContainer, viewer.scene);
        viewer._selectionIndicator = selectionIndicator;
      }

      viewer.widgetResized.raiseEvent();
    },
    infoBox: function infoBox(val) {
      var viewer = this.viewer,
          viewerContainer = this.viewerContainer;

      if (Cesium.defined(viewer.infoBox) && !viewer.infoBox.isDestroyed() && !val) {
        var infoBoxContainer = viewer.infoBox.container;
        viewerContainer.removeChild(infoBoxContainer);
        viewer.infoBox.destroy();
        viewer._infoBox = undefined;
      } else if (!Cesium.defined(viewer.infoBox) || viewer.infoBox.isDestroyed()) {
        var _infoBoxContainer = document.createElement('div');

        _infoBoxContainer.className = 'cesium-viewer-infoBoxContainer';
        viewerContainer.appendChild(_infoBoxContainer);
        var infoBox = new Cesium.InfoBox(_infoBoxContainer);
        var infoBoxViewModel = infoBox.viewModel;

        viewer._eventHelper.add(infoBoxViewModel.cameraClicked, viewer._onInfoBoxCameraClicked, viewer);

        viewer._eventHelper.add(infoBoxViewModel.closeClicked, viewer._onInfoBoxClockClicked, viewer);

        var events = ['cameraClicked', 'closeClicked'];
        infoBoxViewModel && bindEvents.call(this, infoBoxViewModel, events, true);
        viewer._infoBox = infoBox;
      }

      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    geocoder: function geocoder(val) {
      var viewer = this.viewer,
          resizeToolbar = this.resizeToolbar;
      var toolbar = viewer._toolbar;

      if (Cesium.defined(viewer.geocoder) && !viewer.geocoder.isDestroyed() && !val) {
        var geocoderContainer = viewer.geocoder.container;
        toolbar.removeChild(geocoderContainer);
        viewer.geocoder.destroy();
        viewer._geocoder = undefined;
      } else if (!Cesium.defined(viewer.geocoder) || viewer.geocoder.isDestroyed()) {
        var _geocoderContainer = document.createElement('div');

        _geocoderContainer.className = 'cesium-viewer-geocoderContainer';
        toolbar.appendChild(_geocoderContainer);
        var geocoder = new Cesium.Geocoder({
          container: _geocoderContainer,
          geocoderServices: Cesium.defined(this.geocoder) ? Array.isArray(this.geocoder) ? this.geocoder : [this.geocoder] : undefined,
          scene: viewer.scene,
          viewer: viewer
        });

        viewer._eventHelper.add(geocoder.viewModel.search.beforeExecute, viewer._clearObjects, viewer);

        viewer._geocoder = geocoder;
        resizeToolbar(toolbar, _geocoderContainer);
      }

      viewer.widgetResized.raiseEvent();
    },
    homeButton: function homeButton(val) {
      var viewer = this.viewer,
          resizeToolbar = this.resizeToolbar;
      var toolbar = viewer._toolbar;

      if (Cesium.defined(viewer.homeButton) && !viewer.homeButton.isDestroyed() && !val) {
        viewer.homeButton.destroy();
        viewer._homeButton = undefined;
      } else if (!Cesium.defined(viewer.homeButton) || viewer.homeButton.isDestroyed()) {
        var homeButton = new Cesium.HomeButton(toolbar, viewer.scene);

        if (Cesium.defined(viewer.geocoder)) {
          viewer._eventHelper.add(homeButton.viewModel.command.afterExecute, function () {
            var viewModel = viewer.geocoder.viewModel;
            viewModel.searchText = '';

            if (viewModel.isSearchInProgress) {
              viewModel.search();
            }
          });
        }

        viewer._eventHelper.add(homeButton.viewModel.command.beforeExecute, viewer._clearTrackedObject, viewer);

        viewer._homeButton = homeButton;
        resizeToolbar(toolbar, homeButton);
      }

      viewer.widgetResized.raiseEvent();
    },
    sceneModePicker: function sceneModePicker(val) {
      var viewer = this.viewer,
          resizeToolbar = this.resizeToolbar;
      var toolbar = viewer._toolbar;

      if (Cesium.defined(viewer.sceneModePicker) && !viewer.sceneModePicker.isDestroyed() && !val) {
        viewer.sceneModePicker.destroy();
        viewer._sceneModePicker = undefined;
      } else if (!Cesium.defined(viewer.sceneModePicker) || viewer.sceneModePicker.isDestroyed()) {
        if (this.sceneModePicker === true && this.scene3DOnly) {
          throw new Cesium.DeveloperError('options.sceneModePicker is not available when options.scene3DOnly is set to true.');
        }

        if (!this.scene3DOnly && this.sceneModePicker === true) {
          var sceneModePicker = new Cesium.SceneModePicker(toolbar, viewer.scene);
          viewer._sceneModePicker = sceneModePicker;
          resizeToolbar(toolbar, sceneModePicker);
        }
      }

      viewer.widgetResized.raiseEvent();
    },
    projectionPicker: function projectionPicker(val) {
      var viewer = this.viewer,
          resizeToolbar = this.resizeToolbar;
      var toolbar = viewer._toolbar;

      if (Cesium.defined(viewer.projectionPicker) && !viewer.projectionPicker.isDestroyed() && !val) {
        viewer.projectionPicker.destroy();
        viewer._projectionPicker = undefined;
      } else if (!Cesium.defined(viewer.projectionPicker) || viewer.projectionPicker.isDestroyed()) {
        var projectionPicker = new Cesium.ProjectionPicker(toolbar, viewer.scene);
        viewer._projectionPicker = projectionPicker;
        resizeToolbar(toolbar, projectionPicker);
      }

      viewer.widgetResized.raiseEvent();
    },
    baseLayerPicker: function baseLayerPicker(val) {
      var viewer = this.viewer,
          resizeToolbar = this.resizeToolbar;
      var toolbar = viewer._toolbar;

      if (Cesium.defined(viewer.baseLayerPicker) && !viewer.baseLayerPicker.isDestroyed() && !val) {
        viewer.baseLayerPicker.destroy();
        viewer._baseLayerPicker = undefined;
        viewer.imageryLayers.remove(viewer.imageryLayers.get(viewer.imageryLayers.length - 1));
      } else if (!Cesium.defined(viewer.baseLayerPicker) || viewer.baseLayerPicker.isDestroyed()) {
        var createBaseLayerPicker = (!Cesium.defined(viewer.globe) || this.globe !== false) && (!Cesium.defined(viewer.baseLayerPicker) || this.baseLayerPicker !== false);

        if (createBaseLayerPicker && Cesium.defined(this.imageryProvider)) {
          throw new Cesium.DeveloperError("options.imageryProvider is not available when using the BaseLayerPicker widget.\nEither specify options.selectedImageryProviderViewModel instead or set options.baseLayerPicker to false.");
        }

        if (!createBaseLayerPicker && Cesium.defined(this.selectedImageryProviderViewModel)) {
          throw new Cesium.DeveloperError("options.selectedImageryProviderViewModel is not available when not using the BaseLayerPicker widget.\nEither specify options.imageryProvider instead or set options.baseLayerPicker to true.");
        }

        if (createBaseLayerPicker && Cesium.defined(this.terrainProvider)) {
          throw new Cesium.DeveloperError("options.terrainProvider is not available when using the BaseLayerPicker widget.\nEither specify options.selectedTerrainProviderViewModel instead or set options.baseLayerPicker to false.");
        }

        if (!createBaseLayerPicker && Cesium.defined(this.selectedTerrainProviderViewModel)) {
          throw new Cesium.DeveloperError("options.selectedTerrainProviderViewModel is not available when not using the BaseLayerPicker widget.\nEither specify options.terrainProvider instead or set options.baseLayerPicker to true.");
        }

        if (createBaseLayerPicker) {
          var imageryProviderViewModels = Cesium.defaultValue(this.imageryProviderViewModels, Cesium.createDefaultImageryProviderViewModels());
          var terrainProviderViewModels = Cesium.defaultValue(this.terrainProviderViewModels, Cesium.createDefaultTerrainProviderViewModels());
          var baseLayerPicker = new Cesium.BaseLayerPicker(toolbar, {
            globe: viewer.scene.globe,
            imageryProviderViewModels: imageryProviderViewModels,
            selectedImageryProviderViewModel: imageryProviderViewModels[0],
            terrainProviderViewModels: terrainProviderViewModels,
            selectedTerrainProviderViewModel: terrainProviderViewModels[0]
          });
          var elements = toolbar.getElementsByClassName('cesium-baseLayerPicker-dropDown');
          var baseLayerPickerDropDown = elements[0];
          viewer._baseLayerPickerDropDown = baseLayerPickerDropDown;
          viewer._baseLayerPicker = baseLayerPicker;
          viewer.imageryLayers.raiseToTop(viewer.imageryLayers.get(0));
          resizeToolbar(toolbar, baseLayerPicker);
        }
      }

      viewer.widgetResized.raiseEvent();
    },
    navigationHelpButton: function navigationHelpButton(val) {
      var viewer = this.viewer,
          resizeToolbar = this.resizeToolbar;
      var toolbar = viewer._toolbar;

      if (Cesium.defined(viewer.navigationHelpButton) && !viewer.navigationHelpButton.isDestroyed() && !val) {
        viewer.navigationHelpButton.destroy();
        viewer._navigationHelpButton = undefined;
      } else if (!Cesium.defined(viewer.navigationHelpButton) || viewer.navigationHelpButton.isDestroyed()) {
        var showNavHelp = true;

        try {
          if (Cesium.defined(window.localStorage)) {
            var hasSeenNavHelp = window.localStorage.getItem('cesium-hasSeenNavHelp');

            if (Cesium.defined(hasSeenNavHelp) && Boolean(hasSeenNavHelp)) {
              showNavHelp = false;
            } else {
              window.localStorage.setItem('cesium-hasSeenNavHelp', 'true');
            }
          }
        } catch (e) {}

        var navigationHelpButton = new Cesium.NavigationHelpButton({
          container: toolbar,
          instructionsInitiallyVisible: Cesium.defaultValue(this.navigationInstructionsInitiallyVisible, showNavHelp)
        });
        viewer._navigationHelpButton = navigationHelpButton;
        resizeToolbar(toolbar, navigationHelpButton);
      }

      viewer.widgetResized.raiseEvent();
    },
    animation: function animation(val) {
      var viewer = this.viewer,
          viewerContainer = this.viewerContainer;

      if (Cesium.defined(viewer.animation) && !viewer.animation.isDestroyed() && !val) {
        var animationContainer = viewer.animation.container;
        viewerContainer.removeChild(animationContainer);
        viewer.animation.destroy();
        viewer._animation = undefined;
      } else if (!Cesium.defined(viewer.animation) || viewer.animation.isDestroyed()) {
        var _animationContainer = document.createElement('div');

        _animationContainer.className = 'cesium-viewer-animationContainer';
        this.viewerContainer.appendChild(_animationContainer);
        var animation = new Cesium.Animation(_animationContainer, new Cesium.AnimationViewModel(viewer.clockViewModel));
        animation.viewModel.dateFormatter = this.localeDateTimeFormatter;
        animation.viewModel.timeFormatter = this.localeTimeFormatter;
        viewer._animation = animation;
      }

      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    timeline: function timeline(val) {
      var viewer = this.viewer,
          viewerContainer = this.viewerContainer,
          onTimelineScrubfunction = this.onTimelineScrubfunction;

      if (Cesium.defined(viewer.timeline) && !viewer.timeline.isDestroyed() && !val) {
        var timelineContainer = viewer.timeline.container;
        viewerContainer.removeChild(timelineContainer);
        viewer.timeline.destroy();
        viewer._timeline = undefined;
      } else if (!Cesium.defined(viewer.timeline) || viewer.timeline.isDestroyed()) {
        var _timelineContainer = document.createElement('div');

        _timelineContainer.className = 'cesium-viewer-timelineContainer';
        viewerContainer.appendChild(_timelineContainer);
        var timeline = new Cesium.Timeline(_timelineContainer, viewer.clock);
        var that = this;

        timeline.makeLabel = function (time) {
          return that.localeDateTimeFormatter(time);
        };

        timeline.addEventListener('settime', onTimelineScrubfunction, false);
        timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);
        viewer._timeline = timeline;
      }

      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    fullscreenButton: function fullscreenButton(val) {
      var viewer = this.viewer,
          viewerContainer = this.viewerContainer;

      if (Cesium.defined(viewer.fullscreenButton) && !viewer.fullscreenButton.isDestroyed() && !val) {
        var fullscreenContainer = viewer.fullscreenButton.container;
        viewerContainer.removeChild(fullscreenContainer);
        viewer.fullscreenButton.destroy();
        viewer._fullscreenButton = undefined;
      } else if (!Cesium.defined(viewer.fullscreenButton) || viewer.fullscreenButton.isDestroyed()) {
        var _fullscreenContainer = document.createElement('div');

        _fullscreenContainer.className = 'cesium-viewer-fullscreenContainer';
        viewerContainer.appendChild(_fullscreenContainer);
        var fullscreenButton = new Cesium.FullscreenButton(_fullscreenContainer, this.$refs.viewer);
        viewer._fullscreenButton = fullscreenButton;
      }

      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    fullscreenElement: function fullscreenElement(val) {
      var viewer = this.viewer;

      if (!Cesium.defined(viewer.fullscreenButton)) {
        return;
      }

      if (Cesium.defined(val)) {
        this.viewer.fullscreenButton.viewModel.fullscreenElement = val;
      }
    },
    vrButton: function vrButton(val) {
      var viewer = this.viewer,
          enableVRUI = this.enableVRUI,
          viewerContainer = this.viewerContainer;

      if (Cesium.defined(viewer.vrButton) && !viewer.vrButton.isDestroyed() && !val) {
        var vrContainer = viewer.vrButton.container;
        viewerContainer.removeChild(vrContainer);
        viewer.vrButton.destroy();
        viewer._vrButton = undefined;
      } else if (!Cesium.defined(viewer.vrButton) || viewer.vrButton.isDestroyed()) {
        var _vrContainer = document.createElement('div');

        _vrContainer.className = 'cesium-viewer-vrContainer';
        viewerContainer.appendChild(_vrContainer);
        var vrButton = new Cesium.VRButton(_vrContainer, viewer.scene, viewerContainer);
        var viewModelCommand = vrButton.viewModel._command;

        vrButton.viewModel._command = function (VRButtonViewModel) {
          viewModelCommand();
          enableVRUI(viewer, VRButtonViewModel.isVRMode);
        };

        viewer._vrButton = vrButton;
      }

      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    useDefaultRenderLoop: function useDefaultRenderLoop(val) {
      this.viewer.useDefaultRenderLoop = val;
    },
    sceneMode: function sceneMode(val) {
      var viewer = this.viewer;

      if (Cesium.SceneMode.COLUMBUS_VIEW === val || Cesium.SceneMode.MORPHING === val || Cesium.SceneMode.SCENE2D === val || Cesium.SceneMode.SCENE3D === val) {
        viewer.scene.mode = val;
      }
    },
    shouldAnimate: function shouldAnimate(val) {
      var viewer = this.viewer;
      viewer.clock.shouldAnimate = val;
    },
    terrainExaggeration: function terrainExaggeration(val) {
      var viewer = this.viewer;
      viewer.scene._terrainExaggeration = val;
    },
    shadows: function shadows(val) {
      var viewer = this.viewer;
      viewer.scene.shadowMap.enabled = val;
    },
    terrainProvider: function terrainProvider(val) {
      var viewer = this.viewer;
      viewer.terrainProvider = val;
    },
    camera: {
      handler: function handler(val) {
        this.setCamera(val);
      },
      deep: true
    },
    imageryProvider: function imageryProvider(val, oldvalue) {
      var viewer = this.viewer;

      if (Cesium.defined(val)) {
        for (var i = 0; i < viewer.imageryLayers.length; i++) {
          viewer.imageryLayers[i].imageryProvider === oldvalue && viewer.imageryLayers.remove(viewer.imageryLayers[i]);
        }

        viewer.imageryLayers.addImageryProvider(val);
      }
    }
  },
  methods: {
    onTimelineScrubfunction: function onTimelineScrubfunction(e) {
      var clock = e.clock;
      clock.currentTime = e.timeJulian;
      clock.shouldAnimate = false;
    },
    resizeToolbar: function resizeToolbar(parent, child) {
      Array.prototype.slice.call(parent.children).forEach(function (element) {
        switch (element.className) {
          case 'cesium-viewer-geocoderContainer':
            element.customIndex = 1;
            break;

          case 'cesium-button cesium-toolbar-button cesium-home-button':
            element.customIndex = 2;
            break;

          case 'cesium-sceneModePicker-wrapper cesium-toolbar-button':
            element.customIndex = 3;
            break;

          case 'cesium-projectionPicker-wrapper cesium-toolbar-button':
            element.customIndex = 4;
            break;

          case 'cesium-button cesium-toolbar-button':
          case 'cesium-baseLayerPicker-dropDown':
            element.customIndex = 5;
            break;

          case 'cesium-navigationHelpButton-wrapper':
            element.customIndex = 6;
            break;
        }
      });
      var arr = [];
      Array.prototype.slice.call(parent.children).forEach(function (element) {
        arr.push(element);
      });
      arr.sort(function (a, b) {
        return a.customIndex - b.customIndex;
      });

      for (var i = 0; i < arr.length; i++) {
        parent.appendChild(arr[i]);
      }
    },
    enableVRUI: function enableVRUI(viewer, enabled) {
      var geocoder = viewer._geocoder;
      var homeButton = viewer._homeButton;
      var sceneModePicker = viewer._sceneModePicker;
      var projectionPicker = viewer._projectionPicker;
      var baseLayerPicker = viewer._baseLayerPicker;
      var animation = viewer._animation;
      var timeline = viewer._timeline;
      var fullscreenButton = viewer._fullscreenButton;
      var infoBox = viewer._infoBox;
      var selectionIndicator = viewer._selectionIndicator;
      var visibility = enabled ? 'hidden' : 'visible';

      if (Cesium.defined(geocoder)) {
        geocoder.container.style.visibility = visibility;
      }

      if (Cesium.defined(homeButton)) {
        homeButton.container.style.visibility = visibility;
      }

      if (Cesium.defined(sceneModePicker)) {
        sceneModePicker.container.style.visibility = visibility;
      }

      if (Cesium.defined(projectionPicker)) {
        projectionPicker.container.style.visibility = visibility;
      }

      if (Cesium.defined(baseLayerPicker)) {
        baseLayerPicker.container.style.visibility = visibility;
      }

      if (Cesium.defined(animation)) {
        animation.container.style.visibility = visibility;
      }

      if (Cesium.defined(timeline)) {
        timeline.container.style.visibility = visibility;
      }

      if (Cesium.defined(fullscreenButton) && fullscreenButton.viewModel.isFullscreenEnabled) {
        fullscreenButton.container.style.visibility = visibility;
      }

      if (Cesium.defined(infoBox)) {
        infoBox.container.style.visibility = visibility;
      }

      if (Cesium.defined(selectionIndicator)) {
        selectionIndicator.container.style.visibility = visibility;
      }

      if (viewer._container) {
        var right = enabled || !Cesium.defined(fullscreenButton) ? 0 : fullscreenButton.container.clientWidth;
        viewer._vrButton.container.style.right = right + 'px';
        viewer.forceResize();
      }
    },
    init: function init() {
      this.Cesium = Cesium;
      var $el = this.$refs.viewer;
      var accessToken = this.accessToken ? this.accessToken : typeof this._Cesium !== 'undefined' && Object.prototype.hasOwnProperty.call(this._Cesium(), 'accessToken') ? this._Cesium().accessToken : this.accessToken;
      Cesium.Ion.defaultAccessToken = accessToken;
      var animation = this.animation,
          baseLayerPicker = this.baseLayerPicker,
          fullscreenButton = this.fullscreenButton,
          vrButton = this.vrButton,
          geocoder = this.geocoder,
          homeButton = this.homeButton,
          infoBox = this.infoBox,
          sceneModePicker = this.sceneModePicker,
          selectionIndicator = this.selectionIndicator,
          timeline = this.timeline,
          navigationHelpButton = this.navigationHelpButton,
          navigationInstructionsInitiallyVisible = this.navigationInstructionsInitiallyVisible,
          scene3DOnly = this.scene3DOnly,
          shouldAnimate = this.shouldAnimate,
          clockViewModel = this.clockViewModel,
          selectedImageryProviderViewModel = this.selectedImageryProviderViewModel,
          imageryProviderViewModels = this.imageryProviderViewModels,
          selectedTerrainProviderViewModel = this.selectedTerrainProviderViewModel,
          terrainProviderViewModels = this.terrainProviderViewModels,
          imageryProvider = this.imageryProvider,
          terrainProvider = this.terrainProvider,
          skyBox = this.skyBox,
          skyAtmosphere = this.skyAtmosphere,
          fullscreenElement = this.fullscreenElement,
          useDefaultRenderLoop = this.useDefaultRenderLoop,
          targetFrameRate = this.targetFrameRate,
          showRenderLoopErrors = this.showRenderLoopErrors,
          automaticallyTrackDataSourceClocks = this.automaticallyTrackDataSourceClocks,
          contextOptions = this.contextOptions,
          sceneMode = this.sceneMode,
          mapProjection = this.mapProjection,
          globe = this.globe,
          orderIndependentTranslucency = this.orderIndependentTranslucency,
          creditContainer = this.creditContainer,
          creditViewport = this.creditViewport,
          dataSources = this.dataSources,
          terrainExaggeration = this.terrainExaggeration,
          shadows = this.shadows,
          terrainShadows = this.terrainShadows,
          mapMode2D = this.mapMode2D,
          projectionPicker = this.projectionPicker,
          requestRenderMode = this.requestRenderMode,
          maximumRenderTimeChange = this.maximumRenderTimeChange,
          navigation = this.navigation,
          registerEvents = this.registerEvents;
      var url = Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII');
      var options = {
        animation: animation,
        baseLayerPicker: baseLayerPicker,
        fullscreenButton: fullscreenButton,
        vrButton: vrButton,
        geocoder: geocoder,
        homeButton: homeButton,
        infoBox: infoBox,
        sceneModePicker: sceneModePicker,
        selectionIndicator: selectionIndicator,
        timeline: timeline,
        navigationHelpButton: navigationHelpButton,
        navigationInstructionsInitiallyVisible: navigationInstructionsInitiallyVisible,
        scene3DOnly: scene3DOnly,
        shouldAnimate: shouldAnimate,
        clockViewModel: clockViewModel,
        selectedImageryProviderViewModel: selectedImageryProviderViewModel,
        imageryProviderViewModels: imageryProviderViewModels,
        selectedTerrainProviderViewModel: selectedTerrainProviderViewModel,
        terrainProviderViewModels: terrainProviderViewModels,
        imageryProvider: this.isEmptyObj(imageryProvider) ? Cesium.defined(Cesium.TileMapServiceImageryProvider) ? new Cesium.TileMapServiceImageryProvider({
          url: url
        }) : Cesium.createTileMapServiceImageryProvider({
          url: url
        }) : imageryProvider,
        terrainProvider: terrainProvider,
        skyBox: skyBox,
        skyAtmosphere: skyAtmosphere,
        fullscreenElement: this.isEmptyObj(fullscreenElement) ? $el : fullscreenElement,
        useDefaultRenderLoop: useDefaultRenderLoop,
        targetFrameRate: targetFrameRate,
        showRenderLoopErrors: showRenderLoopErrors,
        automaticallyTrackDataSourceClocks: automaticallyTrackDataSourceClocks,
        contextOptions: contextOptions,
        sceneMode: sceneMode,
        mapProjection: mapProjection,
        globe: globe,
        orderIndependentTranslucency: orderIndependentTranslucency,
        creditContainer: creditContainer,
        creditViewport: creditViewport,
        dataSources: dataSources,
        terrainExaggeration: terrainExaggeration,
        shadows: shadows,
        terrainShadows: terrainShadows,
        mapMode2D: mapMode2D,
        projectionPicker: projectionPicker,
        requestRenderMode: requestRenderMode,
        maximumRenderTimeChange: maximumRenderTimeChange,
        navigation: navigation
      };
      this.removeNullItem(options);

      if (Cesium.VERSION >= '1.83') {
        delete options.terrainExaggeration;
      }

      var viewer = {};

      if (globalThis.mars3d) {
        var _this$map;

        this.map = new mars3d.Map($el.id, options);
        viewer = (_this$map = this.map) === null || _this$map === void 0 ? void 0 : _this$map._viewer;
      } else if (globalThis.DC) {
        var _this$dcViewer;

        this.dcViewer = new DC.Viewer($el.id, options);
        viewer = (_this$dcViewer = this.dcViewer) === null || _this$dcViewer === void 0 ? void 0 : _this$dcViewer.delegate;
      } else if (globalThis.XE) {
        var _this$earth;

        this.earth = new globalThis.XE.Earth($el, options);
        viewer = (_this$earth = this.earth) === null || _this$earth === void 0 ? void 0 : _this$earth.czm.viewer;
      } else {
        viewer = new Cesium.Viewer($el, options);
      }

      this.viewer = viewer;

      if (Cesium.VERSION >= '1.83') {
        viewer.scene.globe.terrainExaggeration = terrainExaggeration;
      }

      if (Cesium.defined(this.camera)) {
        this.setCamera(this.camera);
      }

      var that = this;
      var listener = that.$listeners['update:camera'];
      listener && viewer.camera.changed.addEventListener(function () {
        var cartographic = viewer.camera.positionCartographic;
        var camera;

        if (that.camera.position.lng) {
          camera = {
            position: {
              lng: Cesium.Math.toDegrees(cartographic.longitude),
              lat: Cesium.Math.toDegrees(cartographic.latitude),
              height: cartographic.height
            },
            heading: Cesium.Math.toDegrees(viewer.camera.heading || 360),
            pitch: Cesium.Math.toDegrees(viewer.camera.pitch || -90),
            roll: Cesium.Math.toDegrees(viewer.camera.roll || 0)
          };
        } else {
          camera = {
            position: {
              x: viewer.camera.position.x,
              y: viewer.camera.position.y,
              z: viewer.camera.position.z
            },
            heading: viewer.camera.heading || 2 * Math.PI,
            pitch: viewer.camera.pitch || -Math.PI / 2,
            roll: viewer.camera.roll || 0
          };
        }

        if (listener) {
          that.$emit('update:camera', camera);
        }
      });

      if (Cesium.defined(viewer.animation)) {
        viewer.animation.viewModel.dateFormatter = this.localeDateTimeFormatter;
        viewer.animation.viewModel.timeFormatter = this.localeTimeFormatter;
      }

      if (Cesium.defined(viewer.timeline)) {
        viewer.timeline.makeLabel = function (time) {
          return that.localeDateTimeFormatter(time);
        };

        viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);
      }

      this.viewerContainer = viewer._element;

      if (Cesium.defined(Cesium.SuperMapImageryProvider) && !this.logo) {
        var credit = viewer.scene.frameState.creditDisplay;
        credit.container.removeChild(credit._imageContainer);
      }

      if (!this.logo) {
        viewer.cesiumWidget.creditContainer.style.display = 'none';
      }

      viewer.widgetResized = new Cesium.Event();
      viewer.imageryLayers.layerAdded.addEventListener(this.layerAdded);
      registerEvents(true); // globalThis.XE
      //   ? this.$emit('ready', { Cesium, viewer, earth: this.earth, vm: this })
      //   : this.$emit('ready', { Cesium, viewer, vm: this })

      var readyObj = {
        Cesium: Cesium,
        viewer: viewer,
        vm: this
      };

      if (globalThis.XE) {
        _Object$assign(readyObj, {
          earth: this.earth
        });
      } else if (globalThis.mars3d) {
        _Object$assign(readyObj, {
          map: this.map
        });
      } else if (globalThis.DC) {
        _Object$assign(readyObj, {
          dcViewer: this.dcViewer
        });
      }

      var listenerReady = this.$listeners.ready;
      listenerReady && this.$emit('ready', readyObj);
      this._mounted = true;
      return {
        Cesium: Cesium,
        viewer: viewer,
        vm: this
      };
    },
    setCamera: function setCamera(val) {
      var viewer = this.viewer;
      var position = val.position;

      if (position.lng && position.lat) {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.height || 0, viewer.scene.globe.ellipsoid),
          orientation: {
            heading: Cesium.Math.toRadians(val.heading || 360),
            pitch: Cesium.Math.toRadians(val.pitch || -90),
            roll: Cesium.Math.toRadians(val.roll || 0)
          }
        });
      } else if (position.x && position.y && position.z) {
        viewer.camera.setView({
          destination: new Cesium.Cartesian3(position.x, position.y, position.z),
          orientation: {
            heading: val.heading || 2 * Math.PI,
            pitch: val.pitch || -Math.PI / 2,
            roll: val.roll || 0
          }
        });
      }
    },
    layerAdded: function layerAdded(layer) {
      var viewer = this.viewer,
          autoSortImageryLayers = this.autoSortImageryLayers;

      if (viewer.baseLayerPicker) {
        viewer.imageryLayers.raiseToTop(layer);
      } // 维护影像图层顺序


      if (autoSortImageryLayers) {
        layer.sortOrder = Cesium.defined(layer.sortOrder) ? layer.sortOrder : 9999;

        viewer.imageryLayers._layers.sort(function (a, b) {
          return a.sortOrder - b.sortOrder;
        });

        viewer.imageryLayers._update();
      }
    },
    localeDateTimeFormatter: function localeDateTimeFormatter(date, viewModel, ignoredate) {
      var _Cesium = Cesium,
          JulianDate = _Cesium.JulianDate;
      var TZCode;

      if (this.UTCoffset) {
        date = JulianDate.addMinutes(date, this.UTCoffset, new JulianDate());
        var offset = new Date().getTimezoneOffset() - this.UTCOffset;
        TZCode = offset === 0 ? 'UTC' : 'UTC' + '+' + -(offset / 60);
      } else {
        TZCode = new Date().getTimezoneOffset() === 0 ? 'UTC' : 'UTC' + '+' + -(new Date().getTimezoneOffset() / 60);
      }

      var jsDate = JulianDate.toDate(date);
      var timeString = jsDate.toLocaleString(this.$vc.lang.isoName, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).replace(/,/g, '');
      var dateString = jsDate.toLocaleString(this.$vc.lang.isoName, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).replace(/,/g, '');

      if (!ignoredate && (viewModel || jsDate.getHours() + jsDate.getMinutes() === 0)) {
        return dateString;
      }

      this.TZCode && (TZCode = this.TZCode);
      return ignoredate ? "".concat(timeString, " ").concat(TZCode) : "".concat(dateString, " ").concat(timeString, " ").concat(TZCode);
    },
    localeTimeFormatter: function localeTimeFormatter(time, viewModel) {
      return this.localeDateTimeFormatter(time, viewModel, true);
    },
    registerEvents: function registerEvents(flag) {
      var viewer = this.viewer;
      bindEvents.call(this, viewer, undefined, flag);
      var that = this;
      Events['viewer-property-events'].forEach(function (eventName) {
        var instance = isArray(eventName.name) && viewer[eventName.name[0]] ? viewer[eventName.name[0]][eventName.name[1]] : viewer[eventName.name];
        instance && bindEvents.call(that, instance, eventName.events, flag);
      });
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      Events['viewer-mouse-events'].forEach(function (eventName) {
        var listener = that.$listeners[eventName] || that.$listeners[eventName.toLowerCase()];

        if (flag) {
          listener && handler.setInputAction(listener.fns, Cesium.ScreenSpaceEventType[eventName]);
        } else {
          listener && handler.removeInputAction(Cesium.ScreenSpaceEventType[eventName]);
        }
      });
    },
    getServices: function getServices() {
      var vm = this;
      return mergeDescriptors({}, {
        get viewerContainer() {
          return vm;
        },

        get Cesium() {
          return vm.Cesium;
        },

        get viewer() {
          return vm.viewer;
        },

        get dataSources() {
          return vm.dataSources;
        },

        get entities() {
          return vm.entities;
        },

        get imageryLayers() {
          return vm.imageryLayers;
        },

        get primitives() {
          return vm.primitives;
        },

        get groundPrimitives() {
          return vm.groundPrimitives;
        },

        get postProcessStages() {
          return vm.postProcessStages;
        }

      });
    },
    getCesiumScript: function getCesiumScript() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _cesiumPath, _cesiumPath3, cesiumPath, dirName, _cesiumPath2, _this$$vc$cfg, libsConfig, include, arrInclude, keys, i, len, _loadLibs, key, secondaryLibs, primaryLib, scriptLoadPromises;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (globalThis.Cesium) {
                  _context.next = 33;
                  break;
                }

                cesiumPath = _this.cesiumPath ? _this.cesiumPath : typeof _this._Cesium !== 'undefined' && Object.prototype.hasOwnProperty.call(_this._Cesium(), 'cesiumPath') ? _this._Cesium().cesiumPath : 'https://cdn.jsdelivr.net/npm/cesium@latest/Build/Cesium/Cesium.js';
                dirName = dirname(cesiumPath);

                if ((_cesiumPath = cesiumPath) !== null && _cesiumPath !== void 0 && _cesiumPath.includes('.js')) {
                  _context.next = 21;
                  break;
                }

                // 认为是mars3d
                if (((_cesiumPath2 = cesiumPath) === null || _cesiumPath2 === void 0 ? void 0 : _cesiumPath2.lastIndexOf('/')) !== cesiumPath.length - 1) {
                  cesiumPath += '/';
                }

                libsConfig = getMars3dConfig(cesiumPath);
                include = ((_this$$vc$cfg = _this.$vc.cfg) === null || _this$$vc$cfg === void 0 ? void 0 : _this$$vc$cfg.include) || 'mars3d';
                arrInclude = include.split(',');
                keys = {};
                i = 0, len = arrInclude.length;

              case 10:
                if (!(i < len)) {
                  _context.next = 19;
                  break;
                }

                key = arrInclude[i];

                if (!keys[key]) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("continue", 16);

              case 14:
                keys[key] = true;

                (_loadLibs = loadLibs).push.apply(_loadLibs, _toConsumableArray(libsConfig[key]));

              case 16:
                i++;
                _context.next = 10;
                break;

              case 19:
                _context.next = 22;
                break;

              case 21:
                if (cesiumPath.includes('dc.base')) {
                  loadLibs.push(cesiumPath);
                  loadLibs.push(cesiumPath.replace('dc.base', 'dc.core'));
                  loadLibs.push(cesiumPath.replace('dc.base', 'dc.core').replace('.js', '.css'));
                } else if (cesiumPath.includes('/XbsjEarth.js')) {
                  loadLibs.push(cesiumPath);
                } else {
                  loadLibs.push(cesiumPath);
                  loadLibs.push("".concat(dirName, "/Widgets/widgets.css"));
                }

              case 22:
                secondaryLibs = loadLibs;

                if ((_cesiumPath3 = cesiumPath) !== null && _cesiumPath3 !== void 0 && _cesiumPath3.includes('.js')) {
                  _context.next = 28;
                  break;
                }

                // mars3d 必须要等 Cesium 先初始化
                primaryLib = loadLibs.find(function (v) {
                  return v.includes('Cesium.js');
                });
                _context.next = 27;
                return loadScript(primaryLib);

              case 27:
                secondaryLibs.splice(secondaryLibs.indexOf(primaryLib), 1);

              case 28:
                scriptLoadPromises = [];
                secondaryLibs.forEach(function (url) {
                  // eslint-disable-next-line prefer-regex-literals
                  var cssExpr = new RegExp('\\.css');

                  if (cssExpr.test(url)) {
                    scriptLoadPromises.push(loadLink(url));
                  } else {
                    scriptLoadPromises.push(loadScript(url));
                  }
                });
                return _context.abrupt("return", _Promise.all(scriptLoadPromises).then(function () {
                  if (globalThis.Cesium) {
                    var listener = _this.$listeners.cesiumReady;
                    listener && _this.$emit('cesiumReady', globalThis.Cesium);
                    return globalThis.Cesium;
                  } else if (globalThis.XE) {
                    // 兼容 cesiumlab earthsdk
                    return globalThis.XE.ready().then(function () {
                      // resolve(globalThis.Cesium)
                      var listener = _this.$listeners.cesiumReady;
                      listener && _this.$emit('cesiumReady', globalThis.Cesium);
                      return globalThis.Cesium;
                    });
                  } else if (globalThis.DC) {
                    // 兼容  dc-sdk
                    globalThis.DC.use(globalThis.DcCore.default);
                    globalThis.DC.baseUrl = "".concat(dirName, "/resources/");
                    globalThis.DC.ready(function () {
                      globalThis.Cesium = globalThis.DC.Namespace.Cesium;
                      var listener = _this.$listeners.cesiumReady;
                      listener && _this.$emit('cesiumReady', globalThis.DC);
                      return globalThis.Cesium;
                    });
                    return globalThis.Cesium;
                  } else {
                    _this._reject(new Error('VueCesium ERROR: ' + 'Error loading CesiumJS!'));
                  }
                }));

              case 33:
                return _context.abrupt("return", _Promise.resolve(globalThis.Cesium));

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    beforeInit: function beforeInit() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Make sure to add only one CesiumJS script tag
                // 保证只添加一个CesiumJS标签
                _this2.$vc.scriptPromise = _this2.$vc.scriptPromise || _this2.getCesiumScript();
                _context2.next = 3;
                return _this2.$vc.scriptPromise;

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    beforeLoad: function beforeLoad() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var listener;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                listener = _this3.$listeners.beforeLoad;
                listener && _this3.$emit('beforeLoad', _this3); // Make sure to add only one CesiumJS script tag
                // 保证只添加一个CesiumJS标签

                _this3.$vc.scriptPromise = _this3.$vc.scriptPromise || _this3.getCesiumScript();
                _context3.next = 5;
                return _this3.$vc.scriptPromise;

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    load: function load() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!_this4._mounted) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", false);

              case 2:
                _context4.next = 4;
                return _this4.beforeLoad();

              case 4:
                return _context4.abrupt("return", _this4.init());

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    reload: function reload() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this5.unload().then(function () {
                  return _this5.load();
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    unload: function unload() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var unloadingResolve, i, vcChildCmp, viewer, earth, map, dcViewer, removeCesiumScript, registerEvents, scripts, removeScripts, _iterator, _step, script, links, _iterator2, _step2, link, listener;

        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this6._mounted) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", false);

              case 2:
                _this6.$vc.viewerUnloadingPromise = new _Promise(function (resolve, reject) {
                  unloadingResolve = resolve;
                }); // If the component has subcomponents, you need to remove the subcomponents first. 如果该组件带有子组件，需要先移除子组件。

                i = 0;

              case 4:
                if (!(i < _this6.children.length)) {
                  _context6.next = 11;
                  break;
                }

                vcChildCmp = _this6.children[i];
                _context6.next = 8;
                return vcChildCmp.unload();

              case 8:
                i++;
                _context6.next = 4;
                break;

              case 11:
                viewer = _this6.viewer, earth = _this6.earth, map = _this6.map, dcViewer = _this6.dcViewer, removeCesiumScript = _this6.removeCesiumScript, registerEvents = _this6.registerEvents;

                if (globalThis.Cesium) {
                  viewer.imageryLayers.layerAdded.removeEventListener(_this6.layerAdded);
                  registerEvents(false);
                }

                _this6.$vc._screenSpaceEventHandler && _this6.$vc._screenSpaceEventHandler.destroy();
                _this6.$vc._screenSpaceEventHandler = undefined;

                if (globalThis.XE) {
                  earth && earth.destroy();
                } else if (globalThis.mars3d) {
                  map && map.destroy();
                } else if (globalThis.DC) {
                  dcViewer && dcViewer.destroy();
                } else {
                  viewer && viewer.destroy();
                }

                _this6.viewer = undefined;
                _this6._mounted = false;

                if (removeCesiumScript && globalThis.Cesium) {
                  scripts = document.getElementsByTagName('script');
                  removeScripts = [];
                  _iterator = _createForOfIteratorHelper(scripts);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      script = _step.value;
                      script.src.indexOf('/Cesium.js') > -1 && removeScripts.push(script);
                      script.src.indexOf('/Workers/zlib.min.js') > -1 && removeScripts.push(script);

                      if (globalThis.XE) {
                        script.src.indexOf('/rxjs.umd.min.js') > -1 && removeScripts.push(script);
                        script.src.indexOf('/XbsjCesium.js') > -1 && removeScripts.push(script);
                        script.src.indexOf('/viewerCesiumNavigationMixin.js') > -1 && removeScripts.push(script);
                        script.src.indexOf('/XbsjEarth.js') > -1 && removeScripts.push(script);
                      }

                      loadLibs.includes(script.src) && !removeScripts.includes(script) && removeScripts.push(script);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  links = document.getElementsByTagName('link');
                  _iterator2 = _createForOfIteratorHelper(links);

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      link = _step2.value;
                      link.href.includes('Widgets/widgets.css') && !removeScripts.includes(link) && removeScripts.push(link);
                      loadLibs.includes(link.href) && !removeScripts.includes(link) && removeScripts.push(link);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }

                  removeScripts.forEach(function (script) {
                    script.parentNode && script.parentNode.removeChild(script);
                  });
                  globalThis.Cesium && (globalThis.Cesium = undefined);
                  globalThis.XbsjCesium && (globalThis.XbsjCesium = undefined);
                  globalThis.XbsjEarth && (globalThis.XbsjEarth = undefined);
                  globalThis.XE && (globalThis.XE = undefined);
                  globalThis.mars3d && (globalThis.mars3d = undefined);
                  globalThis.DC && (globalThis.DC = undefined);
                  globalThis.DcCore && (globalThis.DcCore = undefined);
                  _this6.$vc.scriptPromise = undefined;
                  loadLibs = [];
                }

                listener = _this6.$listeners.destroyed;
                listener && _this6.$emit('destroyed', _this6);
                unloadingResolve(true);
                _this6.$vc.viewerUnloadingPromise = undefined;
                return _context6.abrupt("return", true);

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  },
  mounted: function mounted() {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _this7.$vc.viewerUnloadingPromise;

            case 3:
              _this7._resolve(_this7.load());

              _context7.next = 9;
              break;

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](0);

              _this7._reject(_context7.t0);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 6]]);
    }))();
  },
  created: function created() {
    var _this8 = this;

    this.children = [];
    this._mounted = false; // this._createPromise = Promise.resolve(this.beforeInit())
    // 注释上面方法，测试发现在切换路由时，实测 Vue 生命周期是先触发新组件的 created，再触发旧组件的 destroyed，再触发新组件的 mounted 。
    // 逻辑就是先创建新的 然后销毁旧的，但虽然销毁的是旧的 还是会把新的给影响。
    // 因此 viewer 组件的加载方式还是放 mounted，这样就先销毁旧的再加载新的。
    // 但为了外部能取得 createPromise，_createPromise的初始化还是要放created中。

    var that = this;
    this._createPromise = new _Promise(function (resolve, reject) {
      that._resolve = resolve;
      that._reject = reject;
    });
    Object.defineProperties(this, {
      createPromise: {
        enumerable: true,
        get: function get() {
          return _this8._createPromise;
        }
      },
      cesiumObject: {
        enumerable: true,
        get: function get() {
          return _this8.viewer;
        }
      },
      dataSources: {
        enumerable: true,
        get: function get() {
          return _this8.viewer && _this8.viewer.dataSources;
        }
      },
      entities: {
        enumerable: true,
        get: function get() {
          return _this8.viewer && _this8.viewer.entities;
        }
      },
      imageryLayers: {
        enumerable: true,
        get: function get() {
          return _this8.viewer && _this8.viewer.imageryLayers;
        }
      },
      primitives: {
        enumerable: true,
        get: function get() {
          return _this8.viewer && _this8.viewer.scene.primitives;
        }
      },
      groundPrimitives: {
        enumerable: true,
        get: function get() {
          return _this8.viewer && _this8.viewer.scene.groundPrimitives;
        }
      },
      postProcessStages: {
        enumerable: true,
        get: function get() {
          return _this8.viewer && _this8.viewer.scene.postProcessStages;
        }
      }
    });
  },
  destroyed: function destroyed() {
    this.unload();
  }
};

var loadScript = function loadScript(src) {
  var $script = document.createElement('script');
  $script.async = true;
  $script.src = src;
  document.body.appendChild($script);
  return new _Promise(function (resolve, reject) {
    $script.onload = function () {
      resolve(true);
    };
  });
};

var loadLink = function loadLink(src) {
  var $link = document.createElement('link');
  $link.rel = 'stylesheet';
  $link.href = src;
  document.head.appendChild($link);
  return new _Promise(function (resolve, reject) {
    $link.onload = function () {
      resolve(true);
    };
  });
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "viewer",
    staticStyle: {
      "width": "100%",
      "height": "100%"
    },
    attrs: {
      "id": "cesiumContainer"
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "Viewer.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */


var Viewer = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

function plugin(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (plugin.installed) {
    return;
  }

  var $vc = {
    VERSION: '2.2.12'
  };
  Vue.prototype.$vc = Vue.prototype.$vc || $vc;

  if (!Vue.prototype.$vc.lang) {
    lang.install($vc, options.lang);
  }

  plugin.installed = true;

  Vue.prototype._Cesium = function () {
    return options;
  };

  Vue.component(Viewer.name, Viewer);
}

export default plugin;
export { Viewer, plugin as install };
