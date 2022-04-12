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
import common from './common';
import stubVNode from './stubVNode';

/**
 * VueCesium 的基础虚拟组件，mixin 注入需要实现以下方法。
 */

var virtualCmp = {
  mixins: [stubVNode, common],
  methods: {
    /**
     * 获取注入对象。
     * @returns {Object}
     */
    getServices: function getServices() {
      return common.methods.getServices.call(this);
    },

    /**
     * 加载组件。
     * @returns {Promise}
     */
    load: function load() {
      return common.methods.load.call(this);
    },

    /**
     * 重载组件。
     * @returns {Promise}
     */
    reload: function reload() {
      return common.methods.reload.call(this);
    },

    /**
     * 卸载组件。
     * @return {Promise}
     */
    unload: function unload() {
      return common.methods.unload.call(this);
    }
  }
};

export default virtualCmp;
