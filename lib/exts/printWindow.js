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
 * Tells the web browser to print a given window, which my be an iframe window, and
 * returns a promise that resolves when printing is safely over so that, for example
 * the window can be removed.
 * @param {Window} windowToPrint The window to print.
 * @returns {Promise} A promise that resolves when printing is safely over. The prommise is rejected if
 *                    there is no indication that the browser's print
 */
function printWindow(windowToPrint) {
  var _Cesium = Cesium,
      when = _Cesium.when;
  var deferred = when.defer();
  var printInProgressCount = 0;
  var timeout = setTimeout(function () {
    deferred.reject(false // new TerriaError({
    //   title: i18next.t('core.printWindow.errorTitle'),
    //   message: i18next.t('core.printWindow.errorMessage')
    // })
    );
  }, 10000);

  function cancelTimeout() {
    clearTimeout(timeout);
  }

  function resolveIfZero() {
    if (printInProgressCount <= 0) {
      deferred.resolve();
    }
  }

  if (windowToPrint.matchMedia) {
    windowToPrint.matchMedia('print').addListener(function (evt) {
      cancelTimeout();

      if (evt.matches) {
        // console.log(i18next.t('core.printWindow.printMediaStart'))
        ++printInProgressCount;
      } else {
        // console.log(i18next.t('core.printWindow.printMediaEnd'))
        --printInProgressCount;
        resolveIfZero();
      }
    });
  }

  windowToPrint.onbeforeprint = function () {
    cancelTimeout(); // console.log(i18next.t('core.printWindow.onbeforeprint'))

    ++printInProgressCount;
  };

  windowToPrint.onafterprint = function () {
    cancelTimeout(); // console.log(i18next.t('core.printWindow.onafterprint'))

    --printInProgressCount;
    resolveIfZero();
  }; // First try printing with execCommand, because, in IE11, `printWindow.print()`
  // prints the entire page instead of just the embedded iframe (if the window
  // is an iframe, anyway).


  var result = windowToPrint.document.execCommand('print', true, null);

  if (!result) {
    windowToPrint.print();
  }

  return deferred.promise;
}

export default printWindow;
