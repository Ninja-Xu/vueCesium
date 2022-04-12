/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-04-06 09:23:38
 * @LastEditTime: 2021-09-09 10:21:47
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium-v2\test\unit\specs\components\viewer.spec.js
 */

import { Viewer } from '@/components/viewer'
import { destroyVM, createTest, createVue, waitImmediate } from '../../util'

describe('vc-viewer', () => {
  it('create', done => {
    const vm = createTest(Viewer, {}, true)
    vm.$on('ready', ({ Cesium, viewer }) => {
      expect(viewer).to.be.instanceof(Cesium.Viewer)
      expect(vm.$el).to.contain('.cesium-widget canvas')
      expect(Cesium.buildModuleUrl()).to.contain('https://unpkg.com')
      destroyVM(vm)
      done()
    })
  }).timeout(12000)
  it('cesiumPath', done => {
    const vm = createTest(Viewer, { cesiumPath: 'https://cdn.jsdelivr.net/npm/cesium@latest/Build/Cesium/Cesium.js' }, true)
    vm.$on('ready', ({ Cesium, viewer }) => {
      expect(viewer).to.be.instanceof(Cesium.Viewer)
      expect(vm.$el).to.contain('.cesium-widget canvas')
      expect(Cesium.buildModuleUrl()).to.contain('https://unpkg.com')
      destroyVM(vm)
      done()
    })
  }).timeout(12000)
  it('infoBox', done => {
    const vm = createTest(Viewer, {}, true)
    vm.$on('ready', async ({ Cesium, viewer }) => {
      expect(viewer).to.be.instanceof(Cesium.Viewer)
      expect(vm.$el).to.contain('.cesium-widget canvas')
      vm.infoBox = false
      await waitImmediate()
      expect(viewer.infoBox).to.be.undefined
      destroyVM(vm)
      done()
    })
  }).timeout(12000)
  it('events', done => {
    let vm = createVue({
      template: `
        <vc-viewer ref="viewer" :animation="animation" :baseLayerPicker="baseLayerPicker" :timeline="timeline"
          :fullscreenButton="fullscreenButton" :fullscreenElement="fullscreenElement" :infoBox="infoBox" @ready="ready" @layerAdded="layerAdded">
        </vc-viewer>
        `,
      data () {
        return {
          animation: true,
          timeline: true,
          baseLayerPicker: false,
          fullscreenButton: true,
          infoBox: true,
          fullscreenElement: document.body
        }
      },
      methods: {
        ready (cesiumInstance) {
          const { Cesium, viewer } = cesiumInstance
          this.fullscreenElement = this.$refs.myViewer
          var mapbox = new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.streets'
          })
          viewer.imageryLayers.addImageryProvider(mapbox)
        },
        layerAdded () {
        }
      }
    }, true)
    vm.$refs.viewer.$listeners.layerAdded.fns = (layer) => {
      expect(layer.imageryProvider._mapId).to.equal('mapbox.streets')
      done()
    }
  }).timeout(12000)
})
