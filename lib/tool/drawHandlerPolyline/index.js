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
import mixinDraw from '../../mixins/tool/mixinDraw';
import { makeMaterial } from '../../utils/cesiumHelpers';
import _parseFloat from '@babel/runtime-corejs2/core-js/parse-float';
import drawIcons from '../drawIcons';
import * as PrimitiveCollection from '../../primitiveCollection';
import * as GroundPolylinePrimitive from '../../primitive/groundPolyline';
import * as GeometryInstance from '../../geometryInstance';
import * as GroundPolylineGeometry from '../../geometryInstance/groundPolyline';
import * as PolylineCollection from '../../primitiveCollection/polylineCollection';
import * as Polyline from '../../primitive/polyline';
import * as PointPrimitiveCollection from '../../primitiveCollection/pointCollection';
import * as PointPrimitive from '../../primitive/point';
import * as VcHTMLOverlay from '../../extend/htmlOverlay';

//
//
//
//
var icons = {};
var notLoadedIcons = [];
var defaultWidth = '';
var defaultHeight = '';
var classPrefix = 'vc-svg';
var isStroke = false;
var isOriginalDefault = false;
var script = {
  name: 'svgicon',
  data: function data() {
    return {
      loaded: false
    };
  },
  props: {
    icon: String,
    name: String,
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    scale: String,
    dir: String,
    fill: {
      type: Boolean,
      default: function _default() {
        return !isStroke;
      }
    },
    color: String,
    original: {
      type: Boolean,
      default: function _default() {
        return isOriginalDefault;
      }
    },
    title: String
  },
  computed: {
    clazz: function clazz() {
      var clazz = "".concat(classPrefix, "-icon");

      if (this.fill) {
        clazz += " ".concat(classPrefix, "-fill");
      }

      if (this.dir) {
        clazz += " ".concat(classPrefix, "-").concat(this.dir);
      }

      return clazz;
    },
    iconName: function iconName() {
      return this.name || this.icon;
    },
    iconData: function iconData() {
      var iconData = icons[this.iconName];

      if (iconData || this.loaded) {
        return iconData;
      }

      return null;
    },
    colors: function colors() {
      if (this.color) {
        return this.color.split(' ');
      }

      return [];
    },
    path: function path() {
      var pathData = '';

      if (this.iconData) {
        pathData = this.iconData.data;
        pathData = this.setTitle(pathData); // use original color

        if (this.original) {
          pathData = this.addOriginalColor(pathData);
        }

        if (this.colors.length > 0) {
          pathData = this.addColor(pathData);
        }
      } else {
        // if no iconData, push to notLoadedIcons
        notLoadedIcons.push({
          name: this.iconName,
          component: this
        });
      }

      return this.getValidPathData(pathData);
    },
    box: function box() {
      var width = this.width || 16;
      var height = this.width || 16;

      if (this.iconData) {
        if (this.iconData.viewBox) {
          return this.iconData.viewBox;
        }

        return "0 0 ".concat(this.iconData.width, " ").concat(this.iconData.height);
      }

      return "0 0 ".concat(_parseFloat(width), " ").concat(_parseFloat(height));
    },
    style: function style() {
      var digitReg = /^\d+$/;
      var scale = Number(this.scale);
      var width;
      var height; // apply scale

      if (!isNaN(scale) && this.iconData) {
        width = Number(this.iconData.width) * scale + 'px';
        height = Number(this.iconData.height) * scale + 'px';
      } else {
        width = digitReg.test(this.width) ? this.width + 'px' : this.width || defaultWidth;
        height = digitReg.test(this.height) ? this.height + 'px' : this.height || defaultHeight;
      }

      var style = {};

      if (width) {
        style.width = width;
      }

      if (height) {
        style.height = height;
      }

      return style;
    }
  },
  created: function created() {
    if (icons[this.iconName]) {
      this.loaded = true;
    }
  },
  methods: {
    addColor: function addColor(data) {
      var _this = this;

      var reg = /<(path|rect|circle|polygon|line|polyline|ellipse)\s/gi;
      var i = 0;
      return data.replace(reg, function (match) {
        var color = _this.colors[i++] || _this.colors[_this.colors.length - 1];
        var fill = _this.fill; // if color is '_', ignore it

        if (color && color === '_') {
          return match;
        } // if color start with 'r-', reverse the fill value


        if (color && color.indexOf('r-') === 0) {
          fill = !fill;
          color = color.split('r-')[1];
        }

        var style = fill ? 'fill' : 'stroke';
        var reverseStyle = fill ? 'stroke' : 'fill';
        return match + "".concat(style, "=\"").concat(color, "\" ").concat(reverseStyle, "=\"none\" ");
      });
    },
    addOriginalColor: function addOriginalColor(data) {
      var styleReg = /_fill="|_stroke="/gi;
      return data.replace(styleReg, function (styleName) {
        return styleName && styleName.slice(1);
      });
    },
    getValidPathData: function getValidPathData(pathData) {
      // If use original and colors, clear double fill or stroke
      if (this.original && this.colors.length > 0) {
        // eslint-disable-next-line no-useless-escape
        var reg = /<(path|rect|circle|polygon|line|polyline|ellipse)(\sfill|\sstroke)([="\w\s\.\-\+#\$\&>]+)(fill|stroke)/gi;
        pathData = pathData.replace(reg, function (match, p1, p2, p3, p4) {
          return "<".concat(p1).concat(p2).concat(p3, "_").concat(p4);
        });
      }

      return pathData;
    },
    setTitle: function setTitle(pathData) {
      if (this.title) {
        var title = this.title // eslint-disable-next-line no-useless-escape
        .replace(/\</gi, '&lt;').replace(/>/gi, '&gt;').replace(/&/g, '&amp;');
        return "<title>".concat(title, "</title>") + pathData;
      }

      return pathData;
    },
    onClick: function onClick(e) {
      this.$emit('click', e);
    }
  },
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var tagName = options.tagName || 'svgicon';

    if (options.classPrefix) {
      classPrefix = options.classPrefix;
    }

    isStroke = !!options.isStroke;
    isOriginalDefault = !!options.isOriginalDefault; // default size

    options.defaultWidth && (defaultWidth = options.defaultWidth);
    options.defaultHeight && (defaultHeight = options.defaultHeight);
    Vue.component(tagName, this);
  },
  // register icons
  register: function register(data) {
    var _loop = function _loop(name) {
      if (!icons[name]) {
        icons[name] = data[name];
      } // check new register icon is not loaded, and set loaded to true


      notLoadedIcons = notLoadedIcons.filter(function (v, ix) {
        if (v.name === name) {
          v.component.$set(v.component, 'loaded', true);
        }

        return v.name !== name;
      });
    };

    for (var name in data) {
      _loop(name);
    }
  },
  icons: icons
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    class: _vm.clazz,
    style: _vm.style,
    attrs: {
      "viewBox": _vm.box,
      "version": "1.1"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.path)
    },
    on: {
      "click": _vm.onClick
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-6e48e5e1";
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcIconSvg.vue";

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


var VcIconSvg = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

VcIconSvg.register(drawIcons);

//
var script$1 = {
  name: 'vc-handler-draw-polyline',
  mixins: [mixinDraw],
  components: {
    VcIconSvg: VcIconSvg
  },
  data: function data() {
    return {
      drawType: 'polylineDrawing'
    };
  },
  props: {
    depthTest: {
      type: Boolean,
      default: false
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
    clampToGround: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    primitivePolylines: function primitivePolylines() {
      var _this = this;

      var polylines = [];
      this.polylines.forEach(function (item, index) {
        var polyline = {
          material: _this.polylineMaterial,
          positions: item.positions,
          width: _this.polylineWidth,
          polylineIndex: index
        };
        polylines.push(polyline);
      });
      return polylines;
    }
  },
  methods: {
    makeAppearance: function makeAppearance(val) {
      return new Cesium.PolylineMaterialAppearance({
        material: makeMaterial.call(this, val)
      });
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', {
    class: _vm.$options.name
  }, [_c('vc-collection-primitive', {
    attrs: {
      "show": _vm.show
    }
  }, [_vm.clampToGround ? _c('vc-collection-primitive', {
    ref: "groundPolylineCollection"
  }, [_vm._l(_vm.polylines, function (polyline, index) {
    return [polyline.positions.length > 1 ? _c('vc-primitive-polyline-ground', {
      key: index,
      attrs: {
        "appearance": _vm.makeAppearance(_vm.polylineMaterial),
        "asynchronous": false
      }
    }, [_c('vc-instance-geometry', [_c('vc-geometry-polyline-ground', {
      attrs: {
        "positions": polyline.positions,
        "width": _vm.polylineWidth
      }
    })], 1)], 1) : _vm._e()];
  })], 2) : _c('vc-collection-primitive-polyline', {
    ref: "polylineCollection",
    attrs: {
      "polylines": _vm.primitivePolylines
    }
  }), _vm._v(" "), _c('vc-collection-primitive-point', {
    ref: "pointCollection",
    attrs: {
      "points": _vm.points
    },
    on: {
      "mouseover": _vm.pointMouseOver,
      "mouseout": _vm.pointMouseOut
    }
  })], 1), _vm._v(" "), _vm.showToolbar ? _c('vc-overlay-html', {
    attrs: {
      "position": _vm.toolbarPosition
    }
  }, [_c('button', {
    staticClass: "vc-btn",
    attrs: {
      "title": _vm.$vc.lang.draw.editingMove,
      "type": "button"
    },
    on: {
      "click": function click($event) {
        return _vm.onEditClick('move');
      }
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "icon-move"
    }
  })], 1), _vm._v(" "), _c('button', {
    staticClass: "vc-btn",
    attrs: {
      "title": _vm.$vc.lang.draw.editingInsert,
      "type": "button"
    },
    on: {
      "click": function click($event) {
        return _vm.onEditClick('insert');
      }
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "icon-add"
    }
  })], 1), _vm._v(" "), _c('button', {
    staticClass: "vc-btn",
    attrs: {
      "title": _vm.$vc.lang.draw.editingDelete,
      "type": "button"
    },
    on: {
      "click": function click($event) {
        return _vm.onEditClick('delete');
      }
    }
  }, [_c('vc-icon-svg', {
    attrs: {
      "name": "icon-delete"
    }
  })], 1)]) : _vm._e(), _vm._v(" "), _vm.showTooltip && _vm.showDrawTip ? _c('vc-overlay-html', {
    attrs: {
      "position": _vm.tooltipPosition,
      "pixelOffset": [32, 32]
    }
  }, [_c('div', {
    staticClass: "vc-html-bubble"
  }, [_vm._v(_vm._s(_vm.tooltip))])]) : _vm._e()], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* component normalizer */

function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "VcDrawHandlerPolyline.vue";

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


var VcDrawHandlerPolyline = __vue_normalize__$1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1);

function plugin(Vue) {

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  Vue.use(PrimitiveCollection);
  Vue.use(GeometryInstance);
  Vue.use(GroundPolylinePrimitive);
  Vue.use(GroundPolylineGeometry);
  Vue.use(PolylineCollection);
  Vue.use(Polyline);
  Vue.use(PointPrimitiveCollection);
  Vue.use(PointPrimitive);
  Vue.use(VcHTMLOverlay);
  Vue.component(VcDrawHandlerPolyline.name, VcDrawHandlerPolyline);
}

export default plugin;
export { VcDrawHandlerPolyline, plugin as install };
