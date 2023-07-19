<template>
  <Map :payload="payload" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Map from "./components/Map.vue";

import { coordinates } from "./data/coordinates";

export default defineComponent({
  name: "App",
  components: {
    Map,
  },
  setup() {
    const payload = ref();
    const generatePayload = (coordinates: any) => {
      const payload: any = {
        locations: [],
        services: [],
        vehicles: [],
        version: 1,
      };
      coordinates.forEach((coordinate: any, index: number) => {
        payload.locations.push({
          name: `${index + 1}`,
          coordinates: coordinate,
        });
        payload.services.push({
          name: `work-order-${index + 1}`,
          location: `${index + 1}`,
        });
      });

      payload.vehicles.push({
        name: "truck-1",
        routing_profile: "mapbox/driving",
      });
      return payload;
    };

    onMounted(() => {
      // create a payload with an array of coordinates
      payload.value = generatePayload(coordinates);
    });

    return {
      payload,
    };
  },
});
</script>

<style>
body {
  margin: 0;
}
</style>
