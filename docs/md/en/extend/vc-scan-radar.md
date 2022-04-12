# VcScanRadar

The `vc-scan-radar` component is used to the radar scanning special effects. Refer to [ysCesium|跃焱邵隼](https://www.wellyyss.cn/ysCesium/main/app.html).

## Example

### Load a VcScanRadar

#### Preview

<doc-preview>
  <template>
    <div class="viewer">
      <vc-viewer @ready="ready">
        <vc-scan-radar
          @ready="subReady"
          :radius="1500"
          :interval="3000"
          :color="[0,1.0,0,1]"
          :position="position"
        ></vc-scan-radar>
        <vc-layer-imagery>
          <vc-provider-imagery-tianditu mapStyle="img_c" token="436ce7e50d27eede2f2929307e6b33c0"></vc-provider-imagery-tianditu>
        </vc-layer-imagery>
      </vc-viewer>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          position: { lng: 117.217124, lat: 31.809777 }
        }
      },
      methods: {
        ready(cesiumInstance) {
          this.cesiumInstance = cesiumInstance
        },
        subReady() {
          const { Cesium, viewer } = this.cesiumInstance
          viewer.scene.globe.depthTestAgainstTerrain = true
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(117.217124, 31.809777, 3500.0),
            orientation: {
              heading: Cesium.Math.toRadians(0), // east, default value is 0.0 (north) //东西南北朝向
              pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
              roll: 0.0 // default value
            },
            duration: 3 //3秒到达战场
          })
        }
      }
    }
  </script>
</doc-preview>

#### Code

```html
<template>
  <div class="viewer">
    <vc-viewer @ready="ready">
      <vc-scan-radar
        @ready="subReady"
        :radius="1500"
        :interval="3000"
        :color="[0,1.0,0,1]"
        :position="position"
      ></vc-scan-radar>
      <vc-layer-imagery>
        <vc-provider-imagery-tianditu mapStyle="img_c" token="436ce7e50d27eede2f2929307e6b33c0"></vc-provider-imagery-tianditu>
      </vc-layer-imagery>
    </vc-viewer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        position: { lng: 117.217124, lat: 31.809777 }
      }
    },
    methods: {
      ready(cesiumInstance) {
        this.cesiumInstance = cesiumInstance
      },
      subReady() {
        const { Cesium, viewer } = this.cesiumInstance
        viewer.scene.globe.depthTestAgainstTerrain = true
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(117.217124, 31.809777, 3500.0),
          orientation: {
            heading: Cesium.Math.toRadians(0), // east, default value is 0.0 (north) //东西南北朝向
            pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
            roll: 0.0 // default value
          },
          duration: 3 //3秒到达战场
        })
      }
    }
  }
</script>
```

## Instance Properties

<!-- prettier-ignore -->
| name | type | default | description |
| ---------------------- | ------- | ------ | -------------------------------------------------------------------------- |
| position | Object | | `required` Specify the location added by the radar scan. structure: { lng: number, lat: number, height: number } or Cesium.Cartesian3 |
| color | Object\|String\|Array | `'white'` | `optional` Specify the radar scan color. |
| radius | Number | `1500` | `optional` Specify the radar scan radius in meters.|
| interval | Number | `3000` | `optional` Specify the repetition frequency of a cycle when the radar scan is completed, in milliseconds. |

---

## Events

| name  | parameter                       | description                                                                                                       |
| ----- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ready | {Cesium, viewer, cesiumObject } | Triggers when the component is ready. It returns a core class of Cesium, a viewer instance, and the cesiumObject. |
