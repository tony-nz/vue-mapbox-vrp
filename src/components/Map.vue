<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from "vue";
import { PUBLIC_TOKEN } from "../utils/axiosService";
import { getOptimizedTrip } from "../utils/map";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default defineComponent({
  name: "Map",
  components: {
    //
  },
  props: {
    center: {
      type: Array,
      default: () => [-73.9946, 40.7361],
    },
    style: {
      type: String,
      default: "mapbox://styles/mapbox/streets-v12",
    },
    payload: {
      type: Object,
      default: () => ({}),
    },
    zoom: {
      type: Number,
      default: 13,
    },
  },
  setup(props) {
    const map = ref();
    const isLoaded = ref(false);
    const initMap = () => {
      map.value = new mapboxgl.Map({
        accessToken: PUBLIC_TOKEN,
        container: "map",
        style: props.style,
        center: props.center as [number, number],
        zoom: props.zoom,
      });
    };

    // watch for changes on the payload
    watch(
      () => props.payload,
      () => {
        if (isLoaded.value) {
          getOptimizedTrip(props.payload, map, mapboxgl);
        }
      }
    );

    onMounted(async () => {
      initMap();
      map.value.on("load", () => {
        isLoaded.value = true;
        getOptimizedTrip(props.payload, map, mapboxgl);
      });
    });

    return {
      //
    };
  },
});
</script>

<style>
#map {
  height: 100vh;
  width: 100vw;
}
.mapboxgl-marker {
  /* background-image: url("data:image/svg+xml;utf8,<svg width='35px' height='35px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path style='fill: red' d='M240 192C240 218.5 218.5 240 192 240C165.5 240 144 218.5 144 192C144 165.5 165.5 144 192 144C218.5 144 240 165.5 240 192z' /><path style='fill: %23000' d='M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 272C236.2 272 272 236.2 272 192C272 147.8 236.2 112 192 112C147.8 112 112 147.8 112 192C112 236.2 147.8 272 192 272z' /></svg>"); */
  background-image: url("data:image/svg+xml;utf8,<svg width='35px' height='35px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path style='fill: %23000' d='M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z' /></svg>");
  height: 35px;
  width: 35px;
}

h3 {
  margin: 0;
  color: white;
  font-size: 10pt;
  padding: 3px;
  text-align: center;
  font-weight: 500;
}
</style>
