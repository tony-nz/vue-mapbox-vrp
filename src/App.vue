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
    // const payload = {
    //   version: 1,
    //   locations: [
    //     {
    //       name: "01",
    //       coordinates: [172.5815769, -43.3119129],
    //     },
    //     {
    //       name: "02",
    //       coordinates: [172.5883045, -43.3134049],
    //     },
    //     {
    //       name: "03",
    //       coordinates: [172.5839715, -43.3082287],
    //     },
    //     {
    //       name: "04",
    //       coordinates: [172.5911185, -43.3164986],
    //     },
    //     {
    //       name: "05",
    //       coordinates: [172.6099528, -43.3051442],
    //     },
    //     {
    //       name: "06",
    //       coordinates: [172.5863036, -43.3143844],
    //     },
    //     {
    //       name: "07",
    //       coordinates: [172.602141, -43.3107573],
    //     },
    //     {
    //       name: "08",
    //       coordinates: [172.5991005, -43.3115738],
    //     },
    //     {
    //       name: "09",
    //       coordinates: [172.5821641, -43.3082597],
    //     },
    //     {
    //       name: "10",
    //       coordinates: [172.5801081, -43.3069722],
    //     },
    //     {
    //       name: "11",
    //       coordinates: [172.6012542, -43.307021],
    //     },
    //     {
    //       name: "12",
    //       coordinates: [172.6022571, -43.3091976],
    //     },
    //     {
    //       name: "13",
    //       coordinates: [172.6092702, -43.3071886],
    //     },
    //     {
    //       name: "14",
    //       coordinates: [172.5925545, -43.3089719],
    //     },
    //     {
    //       name: "15",
    //       coordinates: [172.6006208, -43.3073178],
    //     },
    //     {
    //       name: "16",
    //       coordinates: [172.6094478, -43.3020773],
    //     },
    //     {
    //       name: "17",
    //       coordinates: [172.5876129, -43.3104155],
    //     },
    //     {
    //       name: "18",
    //       coordinates: [172.5983826, -43.3116023],
    //     },
    //     {
    //       name: "19",
    //       coordinates: [172.5977069, -43.30589],
    //     },
    //     {
    //       name: "20",
    //       coordinates: [172.5854588, -43.3115894],
    //     },
    //     {
    //       name: "21",
    //       coordinates: [172.5933744, -43.3034904],
    //     },
    //     {
    //       name: "22",
    //       coordinates: [172.6112195, -43.3034616],
    //     },
    //     {
    //       name: "23",
    //       coordinates: [172.5952727, -43.3193219],
    //     },
    //     {
    //       name: "24",
    //       coordinates: [172.6064904, -43.3055207],
    //     },
    //     {
    //       name: "25",
    //       coordinates: [172.5800943, -43.3085756],
    //     },
    //     {
    //       name: "26",
    //       coordinates: [172.5868104, -43.3117898],
    //     },
    //     {
    //       name: "27",
    //       coordinates: [172.5934309, -43.3152318],
    //     },
    //     {
    //       name: "28",
    //       coordinates: [172.5976752, -43.316802],
    //     },
    //     {
    //       name: "29",
    //       coordinates: [172.6061737, -43.303867],
    //     },
    //     {
    //       name: "30",
    //       coordinates: [172.5797475, -43.3156218],
    //     },
    //     {
    //       name: "31",
    //       coordinates: [172.5772218, -43.2975015],
    //     },
    //     {
    //       name: "32",
    //       coordinates: [172.6090828, -43.3059136],
    //     },
    //     {
    //       name: "33",
    //       coordinates: [172.6011909, -43.3094007],
    //     },
    //     {
    //       name: "34",
    //       coordinates: [172.6073349, -43.3030224],
    //     },
    //     {
    //       name: "35",
    //       coordinates: [172.5659841, -43.2994359],
    //     },
    //   ],
    //   vehicles: [
    //     {
    //       name: "truck-1",
    //       routing_profile: "mapbox/driving",
    //     },
    //   ],
    //   services: [
    //     {
    //       name: "work-order-1",
    //       location: "01",
    //     },
    //     {
    //       name: "work-order-2",
    //       location: "02",
    //     },
    //     {
    //       name: "work-order-3",
    //       location: "03",
    //     },
    //     {
    //       name: "work-order-4",
    //       location: "04",
    //     },
    //     {
    //       name: "work-order-5",
    //       location: "05",
    //     },
    //     {
    //       name: "work-order-6",
    //       location: "06",
    //     },
    //     {
    //       name: "work-order-7",
    //       location: "07",
    //     },
    //     {
    //       name: "work-order-8",
    //       location: "08",
    //     },
    //     {
    //       name: "work-order-9",
    //       location: "09",
    //     },
    //     {
    //       name: "work-order-10",
    //       location: "10",
    //     },
    //     {
    //       name: "work-order-11",
    //       location: "11",
    //     },
    //     {
    //       name: "work-order-12",
    //       location: "12",
    //     },
    //     {
    //       name: "work-order-13",
    //       location: "13",
    //     },
    //     {
    //       name: "work-order-14",
    //       location: "14",
    //     },
    //     {
    //       name: "work-order-15",
    //       location: "15",
    //     },
    //     {
    //       name: "work-order-16",
    //       location: "16",
    //     },
    //     {
    //       name: "work-order-17",
    //       location: "17",
    //     },
    //     {
    //       name: "work-order-18",
    //       location: "18",
    //     },
    //     {
    //       name: "work-order-19",
    //       location: "19",
    //     },
    //     {
    //       name: "work-order-20",
    //       location: "20",
    //     },
    //     {
    //       name: "work-order-21",
    //       location: "21",
    //     },
    //     {
    //       name: "work-order-22",
    //       location: "22",
    //     },
    //     {
    //       name: "work-order-23",
    //       location: "23",
    //     },
    //     {
    //       name: "work-order-24",
    //       location: "24",
    //     },
    //     {
    //       name: "work-order-25",
    //       location: "25",
    //     },
    //     {
    //       name: "work-order-26",
    //       location: "26",
    //     },
    //     {
    //       name: "work-order-27",
    //       location: "27",
    //     },
    //     {
    //       name: "work-order-28",
    //       location: "28",
    //     },
    //     {
    //       name: "work-order-29",
    //       location: "29",
    //     },
    //     {
    //       name: "work-order-30",
    //       location: "30",
    //     },
    //     {
    //       name: "work-order-31",
    //       location: "31",
    //     },
    //     {
    //       name: "work-order-32",
    //       location: "32",
    //     },
    //     {
    //       name: "work-order-33",
    //       location: "33",
    //     },
    //     {
    //       name: "work-order-34",
    //       location: "34",
    //     },
    //     {
    //       name: "work-order-35",
    //       location: "35",
    //     },
    //   ],
    // };

    // create function for generating a payload with an array of coordinates like the example above
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
