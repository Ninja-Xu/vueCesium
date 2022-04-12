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
import Vue from 'vue';
import langZh from '../../lang/zh-hans';

var lang = {
  install: function install($vc, lang) {
    var _this = this;

    this.set = function () {
      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : langZh;
      lang.set = _this.set;
      lang.getLocale = _this.getLocale;
      lang.rtl = lang.rtl === true || false;
      var el = document.documentElement;
      el.setAttribute('dir', lang.rtl ? 'rtl' : 'ltr');
      el.setAttribute('lang', lang.isoName);

      if ($vc.lang !== undefined) {
        $vc.lang = lang;
      } else {
        Vue.util.defineReactive($vc, 'lang', lang);
      }

      _this.isoName = lang.isoName;
      _this.nativeName = lang.nativeName;
      _this.props = lang;
    };

    this.set(lang);
  },
  getLocale: function getLocale() {
    var val = navigator.language || navigator.languages[0] || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage;

    if (val) {
      return val.toLowerCase();
    }
  }
};

export default lang;
