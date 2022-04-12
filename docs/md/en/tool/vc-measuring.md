# MeasureTool

- The `vc-measure-distance` component is used for distance measurement.
- The `vc-measure-area` component is used for area measurement.
- The `vc-measure-height` component is used for high measurement.

## Example

### Measuring distance, area, height

#### Preview

<doc-preview>
  <template>
    <div class="viewer">
      <vc-viewer @ready="ready" scene3DOnly>
        <vc-measure-distance
          :clampToGround="clampToGround"
          ref="measureDistance"
          @activeEvt="activeEvt"
          @measureEvt="measureEvt"
          @movingEvt="movingEvt"
          :removeLastPosition="removeLastPosition"
        ></vc-measure-distance>
        <vc-measure-area
          ref="measureArea"
          @activeEvt="activeEvt"
          @measureEvt="measureEvt"
          @movingEvt="movingEvt"
          :clampToGround="clampToGround"
          :removeLastPosition="removeLastPosition"
        ></vc-measure-area>
        <vc-measure-height
          ref="measureHeight"
          @activeEvt="activeEvt"
          @measureEvt="measureEvt"
          @movingEvt="movingEvt"
        ></vc-measure-height>
        <vc-primitive-tileset :url="modelUrl" @readyPromise="readyPromise"></vc-primitive-tileset>
      </vc-viewer>
      <div class="demo-tool">
        <md-button class="md-raised md-accent" @click="toggle('measureDistance')"
          >{{ distanceMeasuring ? 'stop' : 'distance' }}</md-button
        >
        <md-button class="md-raised md-accent" @click="toggle('measureArea')">{{ areaMeasuring ? 'stop' : 'area' }}</md-button>
        <md-button class="md-raised md-accent" @click="toggle('measureHeight')"
          >{{ heightMeasuring ? 'stop' : 'height' }}</md-button
        >
        <md-button class="md-raised md-accent" @click="clear">clear</md-button>
        <span>clampToGround</span>
        <md-switch v-model="clampToGround"></md-switch>
        <span>removeLastPosition</span>
        <md-switch v-model="removeLastPosition"></md-switch>
      </div>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          modelUrl: './statics/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json',
          distanceMeasuring: false,
          areaMeasuring: false,
          heightMeasuring: false,
          clampToGround: false,
          removeLastPosition: true
        }
      },
      methods: {
        ready(cesiumInstance) {
          const { Cesium, viewer } = cesiumInstance
          this.cesiumInstance = cesiumInstance
          viewer.scene.globe.depthTestAgainstTerrain = true
        },
        toggle(type) {
          this.$refs[type].measuring = !this.$refs[type].measuring
        },
        clear() {
          this.$refs.measureDistance.clear()
          this.$refs.measureArea.clear()
          this.$refs.measureHeight.clear()
        },
        activeEvt(_) {
          this[_.type] = _.isActive
        },
        measureEvt(result) {
          console.log(result)
        },
        movingEvt(position) {
          console.log(position)
        },
        readyPromise(tileset) {
          const { viewer } = this.cesiumInstance
          viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0))
        }
      }
    }
  </script>
</doc-preview>

#### Code

```html
<template>
  <div class="viewer">
    <vc-viewer @ready="ready" scene3DOnly>
      <vc-measure-distance
        :clampToGround="clampToGround"
        ref="measureDistance"
        @activeEvt="activeEvt"
        @measureEvt="measureEvt"
        @movingEvt="movingEvt"
        :removeLastPosition="removeLastPosition"
      ></vc-measure-distance>
      <vc-measure-area
        ref="measureArea"
        @activeEvt="activeEvt"
        @measureEvt="measureEvt"
        @movingEvt="movingEvt"
        :clampToGround="clampToGround"
        :removeLastPosition="removeLastPosition"
      ></vc-measure-area>
      <vc-measure-height
        ref="measureHeight"
        @activeEvt="activeEvt"
        @measureEvt="measureEvt"
        @movingEvt="movingEvt"
      ></vc-measure-height>
      <vc-primitive-tileset :url="modelUrl" @readyPromise="readyPromise"></vc-primitive-tileset>
    </vc-viewer>
    <div class="demo-tool">
      <md-button class="md-raised md-accent" @click="toggle('measureDistance')"
        >{{ distanceMeasuring ? 'stop' : 'distance' }}</md-button
      >
      <md-button class="md-raised md-accent" @click="toggle('measureArea')">{{ areaMeasuring ? 'stop' : 'area' }}</md-button>
      <md-button class="md-raised md-accent" @click="toggle('measureHeight')"
        >{{ heightMeasuring ? 'stop' : 'height' }}</md-button
      >
      <md-button class="md-raised md-accent" @click="clear">clear</md-button>
      <span>clampToGround</span>
      <md-switch v-model="clampToGround"></md-switch>
      <span>removeLastPosition</span>
      <md-switch v-model="removeLastPosition"></md-switch>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modelUrl: './statics/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json',
        distanceMeasuring: false,
        areaMeasuring: false,
        heightMeasuring: false,
        clampToGround: false,
        removeLastPosition: true
      }
    },
    methods: {
      ready(cesiumInstance) {
        const { Cesium, viewer } = cesiumInstance
        this.cesiumInstance = cesiumInstance
        viewer.scene.globe.depthTestAgainstTerrain = true
      },
      toggle(type) {
        this.$refs[type].measuring = !this.$refs[type].measuring
      },
      clear() {
        this.$refs.measureDistance.clear()
        this.$refs.measureArea.clear()
        this.$refs.measureHeight.clear()
      },
      activeEvt(_) {
        this[_.type] = _.isActive
      },
      measureEvt(result) {
        console.log(result)
      },
      movingEvt(position) {
        console.log(position)
      },
      readyPromise(tileset) {
        const { viewer } = this.cesiumInstance
        viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0))
      }
    }
  }
</script>
```

## Instance Properties

### vc-measure-distance

<!-- prettier-ignore -->
| name | type | default | description |
| ------------ | ------ | ------------------- | --------------------------------------------------- |
| mode | Number | `1` | `optional` Measurement mode, 0 continuous measurement, 1 measurement ends once. |
| font | String | `'100 20px SimSun'` | `optional` Specify the label CSS font. |
| depthTest | Boolean | `false` | `optional` Specify whether label text and line objects are always displayed. |
| arcType | Number | `0` | `optional` The type of line the polygon edges must follow. |
| clampToGround | Boolean | `false` | `optional` Whether to stick to the ground. |
| alongLine | Boolean | `true` | `optional` Whether to display labels along the line. |
| polylineWidth | Number | `2` | `optional` Specify the polyline width. |
| polylineMaterial | Object | `fabric: { type: 'Color', uniforms: { color: '#51ff00' } }` | `optional` Specify polyline material. |
| removeLastPosition | Boolean | `true` | `optional` Whether to remove the last position at the end. The touch screen setting bit `false` has a better experience. |

---

### vc-measure-area

<!-- prettier-ignore -->
| name | type | default | description |
| ----------------- | ------- | ------------------- | ------------------------------------------------------------------------------------------- |
| perPositionHeight | Boolean | `true` | `optional` Whether the face uses the height of each point, if not, the surface is drawn to the ground. (But the area algorithm is not the calculated floor area). |
| mode | Number | `1` | `optional` Measurement mode, 0 continuous measurement, 1 measurement ends once. |
| font | String | `'100 20px SimSun'` | `optional` Specify the area text. the label CSS font. |
| depthTest | Boolean | `false` | `optional` Specify whether label text and line objects are always displayed. |
| clampToGround | Boolean | `false` | `optional` Whether to display labels along the line. |
| alongLine | Boolean | `true` | `optional` Whether to display labels along the line. |
| polylineWidth | Number | `2` | `optional` Specify the polyline width. |
| polylineMaterial | Object | `fabric: { type: 'Color', uniforms: { color: '#51ff00' } }` | `optional` Specify polyline material. |
| polygonMaterial | Object | `fabric: { type: 'Color', uniforms: { color: 'rgba(255,165,0,0.25)' } }` | `optional` Specify polygon material. |
| removeLastPosition | Boolean | `true` | `optional` Whether to remove the last position at the end. The touch screen setting bit `false` has a better experience. |

---

### vc-measure-height

<!-- prettier-ignore -->
| name | type | default | description |
| ------------- | ------ | ------------------- | --------------------------------------------------- |
| mode | Number | `1` | `optional` Measurement mode, 0 continuous measurement, 1 measurement ends once. |
| font | String | `'100 20px SimSun'` | `optional` Specify the label CSS font. |
| depthTest | Boolean | `false` | `optional` Specify whether label text and line objects are always displayed. |
| polylineWidth | Number | `2` | `optional` Specify the polyline width. |
| polylineMaterial | Object | `fabric: { type: 'Color', uniforms: { color: '#51ff00' } }` | `optional` Specify polyline material. |
|  | Boolean | `true` | `optional` Whether to remove the last position at the end. The touch screen setting bit `false` has a better experience. |

---

### Label

<!-- prettier-ignore -->
| name | type | default | description |
| --------------- | --------------------- | -------------------------- | ------------------------------------- |
| backgroundColor | String\|Array\|Object | `'rgba(38, 38, 38, 0.85)'` | `optional` Gets or sets the background color of this label. |
| fillColor | String\|Array\|Object | `WHITE` | `optional` Gets or sets the fill color of this label. |
| font | String | `'100 20px SimSun'` | `optional` Gets or sets the font used to draw this label. |
| labelStyle | Number | `2` | `optional` A Property specifying the LabelStyle. **FILL: 0, OUTLINE: 1, FILL_AND_OUTLINE: 2** |
| outlineColor | String\|Array\|Object | `'BLUE'` | `optional` Gets or sets the outline color of this label. |
| outlineWidth | Number | `1` | `optional` Gets or sets the outline width of this label. |
| pixelOffset | Object | `{x: 15, y: -20}` | `optional` Gets or sets the pixel offset in screen space from the origin of this label.|
| showBackground | Boolean | `true` | `optional` Determines if a background behind this label will be shown. |

## Event

<!-- prettier-ignore -->
| name | parameter | description |
| ------- | --------|-------------- |
| activeEvt | { type: String, isActive: Boolean } | Triggered when the measurement starts or stops, and the return measurement type includes`'areaMeasuring'`、`'distanceMeasuring'`、`'heightMeasuring'`. |
| movingEvt | Object | Triggered during measurement. Return to the mouse position. |
| measureEvt | { polyline: Object, label: Object } | Triggered during the measurement process. Returns the result of the calculation, the text label object. You can get text label objects, custom text units, decimal points, and more. |

---

## Method

| name  | parameter | description                                                               |
| ----- | --------- | ------------------------------------------------------------------------- |
| clear |           | Clear the measurement result (and stop the measurement at the same time). |
