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
import _typeof from '@babel/runtime-corejs2/helpers/esm/typeof';
import _asyncToGenerator from '@babel/runtime-corejs2/helpers/esm/asyncToGenerator';
import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs2/core-js/object/get-own-property-descriptor';
import _Object$getPrototypeOf from '@babel/runtime-corejs2/core-js/object/get-prototype-of';
import _Promise from '@babel/runtime-corejs2/core-js/promise';
import _regeneratorRuntime from '@babel/runtime-corejs2/regenerator';
import services from './services';
import nameClassMap from '../utils/nameClassMap';
import { isFunction } from '../utils/util';
import * as allProps from './mixinProps';

var VM_PROP = 'vm';
var graphics = ['billboard', 'box', 'corridor', 'cylinder', 'ellipse', 'ellipsoid', 'label', 'model', 'tileset', 'path', 'plane', 'point', 'polygon', 'polyline', 'polylineVolume', 'rectangle', 'wall'];
/**
 * Get the parent component. 获取 vc-viewer 组件。
 * @param {VueComponent} cmp.
 */

var getVcParent = function getVcParent(cmp) {
  var parentVm = cmp.$parent;
  return !parentVm.cesiumClass && parentVm.$options.name !== 'vc-viewer' ? getVcParent(parentVm) : parentVm;
};
/**
 * @vueMethods
 */


var methods = {
  /**
   * Load components asynchronously. 异步加载组件。
   * @returns {Promise<Object>} { Cesium, viewer, cesiumObject }
   */
  load: function load() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var createCesiumObject, mount, setPropWatchers, $parent, Cesium, viewer, that;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_this._mounted) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", false);

            case 2:
              _context2.next = 4;
              return _this.beforeLoad();

            case 4:
              createCesiumObject = _this.createCesiumObject, mount = _this.mount, setPropWatchers = _this.setPropWatchers;
              $parent = getVcParent(_this);
              Cesium = _this.Cesium = $parent.Cesium;
              viewer = _this.viewer = $parent.viewer; // If you call the unload method to unload the component, the Cesium object of the parent component may be unloaded. You need to load the parent component first.
              // 如果调用过 unload 方法卸载组件，父组件的 Cesium 对象可能会被卸载 需要先加载父组件。

              if (!(!$parent.cesiumObject && !_this.nowaiting)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", $parent.load());

            case 10:
              // Register vue Watchers. 注册 Vue 侦听器。
              setPropWatchers(true);
              that = _this;
              return _context2.abrupt("return", createCesiumObject().then( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(cesiumObject) {
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          that.originInstance = cesiumObject; // Load the created Cesium object. 加载创建的 Cesium 对象。

                          return _context.abrupt("return", mount().then(function () {
                            $parent.children.push(_this);
                            that._mounted = true; // Trigger the component's 'ready' event. 触发该组件的 'ready' 事件。

                            // Trigger the component's 'ready' event. 触发该组件的 'ready' 事件。
                            that.$emit('ready', {
                              Cesium: Cesium,
                              viewer: viewer,
                              cesiumObject: cesiumObject,
                              vm: that
                            });
                            return {
                              Cesium: Cesium,
                              viewer: viewer,
                              cesiumObject: cesiumObject,
                              vm: that
                            };
                          }));

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * Unloading components asynchronously. 异步卸载组件。
   * @returns {Promise<Boolean>} returns true on success and false on failure. 成功返回 true，失败返回 false。
   */
  unload: function unload() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var i, vcChildCmp, that;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this2.beforeUnload();

            case 2:
              i = 0;

            case 3:
              if (!(i < _this2.children.length)) {
                _context4.next = 10;
                break;
              }

              vcChildCmp = _this2.children[i];
              _context4.next = 7;
              return vcChildCmp.unload();

            case 7:
              i++;
              _context4.next = 3;
              break;

            case 10:
              that = _this2;
              return _context4.abrupt("return", _this2._mounted ? _this2.unmount().then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        // Teardown the watchers. 注销 Vue 侦听器。
                        that.setPropWatchers(false);
                        that.originInstance = undefined;
                        that._mounted = false; // If the component cannot be rendered without the parent component, the parent component needs to be removed.
                        // 如果该组件的渲染和父组件是绑定在一起的，需要移除父组件。

                        return _context3.abrupt("return", that.renderByParent && !_this2.unloadingPromise ? that.$parent.unload() : true);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }))) : false);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },

  /**
   * Reload components asynchronously. 异步重载组件.
   * @returns {Promise<Boolean>} returns true on success and false on failure. 成功返回 true，失败返回 false。
   */
  reload: function reload() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      var that;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              that = _this3;
              return _context5.abrupt("return", _this3.unload().then(function () {
                return that.load();
              }));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },

  /**
   * Create Cesium objects asynchronously. 异步创建 Cesium 对象。
   * @returns {Promise<Object>} return the Cesium object.
   */
  createCesiumObject: function createCesiumObject() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
      var $props, cesiumClass, transformProps, options;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              $props = _this4.$props, cesiumClass = _this4.cesiumClass, transformProps = _this4.transformProps;
              options = transformProps($props);
              return _context6.abrupt("return", new Cesium[cesiumClass](options));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },

  /**
   * Register or unregister the vue watchers.
   * @param {Boolean} register
   */
  setPropWatchers: function setPropWatchers(register) {
    if (register) {
      var cesiumClass = this.cesiumClass,
          transformProp = this.transformProp;

      if (!cesiumClass || !Cesium[cesiumClass]) {
        return;
      }

      var that = this;
      that.$options.props && _Object$keys(that.$options.props).forEach(function (vueProp) {
        var cesiumProp = vueProp;

        if (vueProp === 'labelStyle' || vueProp === 'wmtsStyle') {
          cesiumProp = 'style';
        } else if (vueProp === 'bmKey') {
          cesiumProp = 'key';
        } // 如果在vue文件中已经监听了改 props 这儿不再监听了
        // If you have listened to the props in the vue file, you will not add any more listeners here.


        if (that.$options.watch && that.$options.watch[vueProp]) {
          return;
        }

        var watcherOptions = that.$options.props[vueProp].watcherOptions; // returns an unwatch function that stops firing the callback

        var unwatch = that.$watch(vueProp, /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(val) {
            var cesiumObject, pd, pdProto, hasSetter, newVal;
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return that.createPromise;

                  case 2:
                    cesiumObject = that.cesiumObject; // Get the writability of the current cesiumobject or the props on its prototype chain to
                    // detect whether the component property responds dynamically or reloads the component when the property changes.
                    // 通过 cesiumObject 对象或它原型链上的 prop 的可写性，以检测属性改变时组件属性是动态响应还是重载组件。

                    pd = cesiumObject && _Object$getOwnPropertyDescriptor(cesiumObject, cesiumProp);
                    pdProto = cesiumObject && _Object$getOwnPropertyDescriptor(_Object$getPrototypeOf(cesiumObject), cesiumProp);
                    hasSetter = pd && (pd.writable || pd.set) || pdProto && (pdProto.writable || pdProto.set);

                    if (!hasSetter) {
                      _context7.next = 11;
                      break;
                    }

                    // Attributes are writable and directly respond to changes in attributes.
                    // 属性可写，直接动态响应属性的改变。
                    if (watcherOptions && watcherOptions.cesiumObjectBuilder) {
                      newVal = watcherOptions.cesiumObjectBuilder.call(that, val, that.viewer.scene.globe.ellipsoid); // If an exclude condition has been defined for the object, such as "_callback", Cesium will automatically handle it internally and no longer need to be assigned.
                      // 如果对象已经定义了 exclude 条件，如已经定义了“_callback”，Cesium 内部会自动处理的 不用再赋值了。

                      if (!(Cesium.defined(cesiumObject[cesiumProp]) && Cesium.defined(cesiumObject[cesiumProp]._callback))) {
                        cesiumObject[cesiumProp] = newVal;
                      }
                    } else {
                      cesiumObject[cesiumProp] = transformProp(cesiumProp, val);
                    }

                    return _context7.abrupt("return", true);

                  case 11:
                    return _context7.abrupt("return", that.reload());

                  case 12:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));

          return function (_x2) {
            return _ref3.apply(this, arguments);
          };
        }(), {
          deep: watcherOptions && watcherOptions.deep
        });
        that.unwatchFns.push(unwatch);
      });
    } else {
      // Stops firing the callback.
      // 注销 watchers。
      this.unwatchFns.forEach(function (item) {
        return item();
      });
      this.unwatchFns = [];
    }
  },

  /**
   * Mount Cesium objects asynchronously. 异步挂载 Cesium 对象，即将 Cesium 对象添加到 viewer 中。虚方法，在各 vue 组件中实现。
   * @returns {Promise<Boolean>} 操作成功返回 true，失败返回 false。
   */
  mount: function mount() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", true);

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },

  /**
   * Unmount Cesium objects asynchronously. 异步卸载 Cesium 对象，即将 Cesium 对象从 viewer 移除。虚方法，在各 vue 组件中实现。
   * @returns {Promise<Boolean>} 操作成功返回 true，失败返回 false。
   */
  unmount: function unmount() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", true);

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },

  /**
   * Get the injected object. 获取注入的对象。主要是为了获取父组件和父组件的 Cesium 对象。
   * @returns {Object}
   */
  getServices: function getServices() {
    return services.methods.getServices.call(this);
  },

  /**
   * 将 props 转换为 Cesium 对象
   * @param {Object} props
   */
  transformProps: function transformProps(props) {
    var cesiumClass = this.cesiumClass;
    var options = {};
    var that = this;
    props && _Object$keys(props).forEach(function (vueProp) {
      var cesiumProp = vueProp; // The properties of the following Cesium instance objects are HTML or Vue reserved words and require special handling.
      // 以下 Cesium 实例对象的属性是 HTML 或 Vue 保留字，需要特别处理一下。

      if (vueProp === 'labelStyle' || vueProp === 'wmtsStyle') {
        cesiumProp = 'style';
      } else if (vueProp === 'bmKey') {
        cesiumProp = 'key';
      }

      if (graphics.indexOf(cesiumProp) !== -1 && getClassName(props[vueProp]) !== 'undefined' && getClassName(props[vueProp]).indexOf('Graphics') === -1 && (cesiumClass === 'Entity' || cesiumClass.indexOf('DataSource') !== -1)) {
        options[cesiumProp] = that.transformProps(props[vueProp]);
      } else {
        options[cesiumProp] = that.transformProp(vueProp, props[vueProp]);
      }
    }); // Remove empty objects to avoid initialization errors when Cesium objects are initialized with null values.
    // 移除空对象，避免 Cesium 对象初始化时传入空值导致初始化报错。

    this.removeNullItem(options);
    return options;
  },
  transformProp: function transformProp(prop, value) {
    var isEmptyObj = this.isEmptyObj,
        cesiumClass = this.cesiumClass;

    if (graphics.indexOf(prop) !== -1 && getClassName(value) !== 'undefined' && getClassName(value).indexOf('Graphics') === -1 && (cesiumClass === 'Entity' || cesiumClass.indexOf('DataSource') !== -1)) {
      return this.transformProps(value);
    } else {
      var cmpName = this.$options.name;
      var propOptions = allProps[prop] && allProps[prop].props[prop];
      return propOptions && propOptions.watcherOptions && !isEmptyObj(value) ? propOptions.watcherOptions.cesiumObjectBuilder.call(this, value, this.viewer.scene.globe.ellipsoid) : isFunction(value) && cmpName && (cmpName.indexOf('graphics') !== -1 || cmpName === 'vc-entity') ? new Cesium.CallbackProperty(value, false) : value;
    }
  },

  /**
   * The action before the component is loaded. 组件加载前的操作。
   */
  beforeLoad: function beforeLoad() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10() {
      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!_this5.$parent.nowaiting) {
                _context10.next = 4;
                break;
              }

              return _context10.abrupt("return", true);

            case 4:
              _context10.next = 6;
              return _this5.$parent.createPromise;

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  beforeUnload: function beforeUnload() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _this6.unloadingPromise;

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },

  /**
   * 获取 vc-viewer 组件
   */
  getVcParent: getVcParent
};
/**
 * VueCesium common minxin
 */

var common = {
  VM_PROP: VM_PROP,
  mixins: [services],
  methods: methods,
  data: function data() {
    return {
      unwatchFns: []
    };
  },
  created: function created() {
    var _this7 = this;

    this._mounted = false;
    this.cesiumClass = this.cesiumClass || nameClassMap[this.$options.name];
    this.children = [];
    var $parent = getVcParent(this);
    this._createPromise = new _Promise(function (resolve, reject) {
      try {
        var isLoading = false;

        if (_this7.$services.viewer) {
          isLoading = true;

          _this7.load().then(function (e) {
            resolve(e);
            isLoading = false;
          });
        }

        $parent.$on('ready', function () {
          if (!isLoading) {
            resolve(_this7.load());
          }
        });
      } catch (e) {
        reject(e);
      }
    });
    Object.defineProperties(this, {
      createPromise: {
        enumerable: true,
        get: function get() {
          return _this7._createPromise;
        }
      },
      cesiumObject: {
        enumerable: true,
        get: function get() {
          return _this7.originInstance;
        }
      },
      mounted: {
        enumerable: true,
        get: function get() {
          return _this7._mounted;
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this8 = this;

    this.unloadingPromise = new _Promise(function (resolve, reject) {
      _this8.unload().then(function () {
        resolve(true);
        _this8.unloadingPromise = undefined;

        _this8.$emit('destroyed', _this8);
      });
    });
  }
};

function getClassName(objClass) {
  if (objClass && objClass.constructor) {
    var strFun = objClass.constructor.toString();
    var className = strFun.substr(0, strFun.indexOf('('));
    className = className.replace('function', '');
    return className.replace(/(^\s*)|(\s*$)/gi, '');
  }

  return _typeof(objClass);
}

export default common;
