<!-- <template>
  <div id="map"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { PUBLIC_TOKEN, SECRET_TOKEN, get, post } from "../utils/axiosService";

import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";

export default defineComponent({
  name: "Map",
  components: {
    //
  },
  props: {
    //
  },
  setup() {
    const data = ref();
    const accessToken =
      "pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug";
    const zoom = ref(10);
    const map = ref();
    const isLoaded = ref(false);
    const initMap = () => {
      map.value = new mapboxgl.Map({
        accessToken,
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [172.6012542, -43.307021],
        zoom: zoom.value,
      });
    };

    const addLayer = () => {
      map.value.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    };
    const addSource = () => {
      map.value.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [172.5815769, -43.3119129],
              [172.5883045, -43.3134049],
              [172.5839715, -43.3082287],
              [172.5911185, -43.3164986],
              [172.6099528, -43.3051442],
              [172.5863036, -43.3143844],
              [172.602141, -43.3107573],
              [172.5991005, -43.3115738],
              [172.5821641, -43.3082597],
              [172.5801081, -43.3069722],
              [172.6012542, -43.307021],
              [172.6022571, -43.3091976],
              [172.6092702, -43.3071886],
              [172.5925545, -43.3089719],
              [172.6006208, -43.3073178],
              [172.6094478, -43.3020773],
              [172.5876129, -43.3104155],
              [172.5983826, -43.3116023],
              [172.5977069, -43.30589],
              [172.5854588, -43.3115894],
              [172.5933744, -43.3034904],
              [172.6112195, -43.3034616],
              [172.5952727, -43.3193219],
              [172.6064904, -43.3055207],
              [172.5800943, -43.3085756],
              [172.5868104, -43.3117898],
              [172.5934309, -43.3152318],
              [172.5976752, -43.316802],
              [172.6061737, -43.303867],
              [172.5797475, -43.3156218],
              [172.5772218, -43.2975015],
              [172.6090828, -43.3059136],
              [172.6011909, -43.3094007],
              [172.6073349, -43.3030224],
              [172.5659841, -43.2994359],
            ],
          },
        },
      });
    };

    const payload = {
      version: 1,
      locations: [
        {
          name: "01",
          coordinates: [172.5815769, -43.3119129],
        },
        {
          name: "02",
          coordinates: [172.5883045, -43.3134049],
        },
        {
          name: "03",
          coordinates: [172.5839715, -43.3082287],
        },
        {
          name: "04",
          coordinates: [172.5911185, -43.3164986],
        },
        {
          name: "05",
          coordinates: [172.6099528, -43.3051442],
        },
        {
          name: "06",
          coordinates: [172.5863036, -43.3143844],
        },
        {
          name: "07",
          coordinates: [172.602141, -43.3107573],
        },
        {
          name: "08",
          coordinates: [172.5991005, -43.3115738],
        },
        {
          name: "09",
          coordinates: [172.5821641, -43.3082597],
        },
        {
          name: "10",
          coordinates: [172.5801081, -43.3069722],
        },
        {
          name: "11",
          coordinates: [172.6012542, -43.307021],
        },
        {
          name: "12",
          coordinates: [172.6022571, -43.3091976],
        },
        {
          name: "13",
          coordinates: [172.6092702, -43.3071886],
        },
        {
          name: "14",
          coordinates: [172.5925545, -43.3089719],
        },
        {
          name: "15",
          coordinates: [172.6006208, -43.3073178],
        },
        {
          name: "16",
          coordinates: [172.6094478, -43.3020773],
        },
        {
          name: "17",
          coordinates: [172.5876129, -43.3104155],
        },
        {
          name: "18",
          coordinates: [172.5983826, -43.3116023],
        },
        {
          name: "19",
          coordinates: [172.5977069, -43.30589],
        },
        {
          name: "20",
          coordinates: [172.5854588, -43.3115894],
        },
        {
          name: "21",
          coordinates: [172.5933744, -43.3034904],
        },
        {
          name: "22",
          coordinates: [172.6112195, -43.3034616],
        },
        {
          name: "23",
          coordinates: [172.5952727, -43.3193219],
        },
        {
          name: "24",
          coordinates: [172.6064904, -43.3055207],
        },
        {
          name: "25",
          coordinates: [172.5800943, -43.3085756],
        },
        {
          name: "26",
          coordinates: [172.5868104, -43.3117898],
        },
        {
          name: "27",
          coordinates: [172.5934309, -43.3152318],
        },
        {
          name: "28",
          coordinates: [172.5976752, -43.316802],
        },
        {
          name: "29",
          coordinates: [172.6061737, -43.303867],
        },
        {
          name: "30",
          coordinates: [172.5797475, -43.3156218],
        },
        {
          name: "31",
          coordinates: [172.5772218, -43.2975015],
        },
        {
          name: "32",
          coordinates: [172.6090828, -43.3059136],
        },
        {
          name: "33",
          coordinates: [172.6011909, -43.3094007],
        },
        {
          name: "34",
          coordinates: [172.6073349, -43.3030224],
        },
        {
          name: "35",
          coordinates: [172.5659841, -43.2994359],
        },
      ],
      vehicles: [
        {
          name: "truck-1",
          routing_profile: "mapbox/driving",
        },
      ],
      services: [
        {
          name: "work-order-1",
          location: "01",
        },
        {
          name: "work-order-2",
          location: "02",
        },
        {
          name: "work-order-3",
          location: "03",
        },
        {
          name: "work-order-4",
          location: "04",
        },
        {
          name: "work-order-5",
          location: "05",
        },
        {
          name: "work-order-6",
          location: "06",
        },
        {
          name: "work-order-7",
          location: "07",
        },
        {
          name: "work-order-8",
          location: "08",
        },
        {
          name: "work-order-9",
          location: "09",
        },
        {
          name: "work-order-10",
          location: "10",
        },
        {
          name: "work-order-11",
          location: "11",
        },
        {
          name: "work-order-12",
          location: "12",
        },
        {
          name: "work-order-13",
          location: "13",
        },
        {
          name: "work-order-14",
          location: "14",
        },
        {
          name: "work-order-15",
          location: "15",
        },
        {
          name: "work-order-16",
          location: "16",
        },
        {
          name: "work-order-17",
          location: "17",
        },
        {
          name: "work-order-18",
          location: "18",
        },
        {
          name: "work-order-19",
          location: "19",
        },
        {
          name: "work-order-20",
          location: "20",
        },
        {
          name: "work-order-21",
          location: "21",
        },
        {
          name: "work-order-22",
          location: "22",
        },
        {
          name: "work-order-23",
          location: "23",
        },
        {
          name: "work-order-24",
          location: "24",
        },
        {
          name: "work-order-25",
          location: "25",
        },
        {
          name: "work-order-26",
          location: "26",
        },
        {
          name: "work-order-27",
          location: "27",
        },
        {
          name: "work-order-28",
          location: "28",
        },
        {
          name: "work-order-29",
          location: "29",
        },
        {
          name: "work-order-30",
          location: "30",
        },
        {
          name: "work-order-31",
          location: "31",
        },
        {
          name: "work-order-32",
          location: "32",
        },
        {
          name: "work-order-33",
          location: "33",
        },
        {
          name: "work-order-34",
          location: "34",
        },
        {
          name: "work-order-35",
          location: "35",
        },
      ],
      // shipments: [
      //   {
      //     name: "order-1",
      //     from: "01",
      //     to: "02",
      //   },
      //   {
      //     name: "order-2",
      //     from: "02",
      //     to: "03",
      //   },
      //   {
      //     name: "order-3",
      //     from: "03",
      //     to: "04",
      //   },
      //   {
      //     name: "order-4",
      //     from: "04",
      //     to: "05",
      //   },
      //   {
      //     name: "order-5",
      //     from: "05",
      //     to: "06",
      //   },
      //   {
      //     name: "order-6",
      //     from: "06",
      //     to: "07",
      //   },
      //   {
      //     name: "order-7",
      //     from: "07",
      //     to: "08",
      //   },
      //   {
      //     name: "order-8",
      //     from: "08",
      //     to: "09",
      //   },
      //   {
      //     name: "order-9",
      //     from: "09",
      //     to: "10",
      //   },
      //   {
      //     name: "order-10",
      //     from: "10",
      //     to: "11",
      //   },
      //   {
      //     name: "order-11",
      //     from: "11",
      //     to: "12",
      //   },
      //   {
      //     name: "order-12",
      //     from: "12",
      //     to: "13",
      //   },
      //   {
      //     name: "order-13",
      //     from: "13",
      //     to: "14",
      //   },
      //   {
      //     name: "order-14",
      //     from: "14",
      //     to: "15",
      //   },
      //   {
      //     name: "order-15",
      //     from: "15",
      //     to: "16",
      //   },
      //   {
      //     name: "order-16",
      //     from: "16",
      //     to: "17",
      //   },
      //   {
      //     name: "order-17",
      //     from: "17",
      //     to: "18",
      //   },
      //   {
      //     name: "order-18",
      //     from: "18",
      //     to: "19",
      //   },
      //   {
      //     name: "order-19",
      //     from: "19",
      //     to: "20",
      //   },
      //   {
      //     name: "order-20",
      //     from: "20",
      //     to: "21",
      //   },
      //   {
      //     name: "order-21",
      //     from: "21",
      //     to: "22",
      //   },
      //   {
      //     name: "order-22",
      //     from: "22",
      //     to: "23",
      //   },
      //   {
      //     name: "order-23",
      //     from: "23",
      //     to: "24",
      //   },
      //   {
      //     name: "order-24",
      //     from: "24",
      //     to: "25",
      //   },
      //   {
      //     name: "order-25",
      //     from: "25",
      //     to: "26",
      //   },
      //   {
      //     name: "order-26",
      //     from: "26",
      //     to: "27",
      //   },
      //   {
      //     name: "order-27",
      //     from: "27",
      //     to: "28",
      //   },
      //   {
      //     name: "order-28",
      //     from: "28",
      //     to: "29",
      //   },
      //   {
      //     name: "order-29",
      //     from: "29",
      //     to: "30",
      //   },
      //   {
      //     name: "order-30",
      //     from: "30",
      //     to: "31",
      //   },
      //   {
      //     name: "order-31",
      //     from: "31",
      //     to: "32",
      //   },
      //   {
      //     name: "order-32",
      //     from: "32",
      //     to: "33",
      //   },
      //   {
      //     name: "order-33",
      //     from: "33",
      //     to: "34",
      //   },
      //   {
      //     name: "order-34",
      //     from: "34",
      //     to: "35",
      //   },
      //   {
      //     name: "order-35",
      //     from: "35",
      //     to: "01",
      //   },
      // ],
    };
    async function getOptimizedTripStatus(
      tripId: string,
      maxAttempts = 5,
      currentAttempt = 1
    ): Promise<any> {
      if (currentAttempt > maxAttempts) {
        throw new Error("Maximum attempts exceeded");
      }

      const response = await get(
        `/optimized-trips/v2/${tripId}?access_token=${SECRET_TOKEN}`
      );

      if (response.status !== "processing") {
        return response;
      } else {
        // Wait for a short period before making the next attempt
        await new Promise((resolve) => setTimeout(resolve, 10000));

        // Recursive call to check the status again
        return getOptimizedTripStatus(tripId, maxAttempts, currentAttempt + 1);
      }
    }
    onMounted(async () => {
      initMap();
      map.value.on("load", () => {
        isLoaded.value = true;
        // addSource();
        // addLayer();
      });
      data.value = await post("/optimized-trips/v2", payload).then(
        (response: any) => {
          const tripId = response.id;
          // getOptimizedTripStatus(tripId);
          // wait 10 seconds and then return
          setTimeout(() => {
            getOptimizedTripStatus(tripId).then((response: any) => {
              response.routes.forEach((route: any) => {
                const coordinates = route.stops.map(
                  (stop: any) => stop.location_metadata.snapped_coordinate
                );
                route.stops.forEach((stop: any) => {
                  console.log(stop);
                  const el = document.createElement("div");
                  el.className = "marker";
                  new mapboxgl.Marker(el)
                    .setLngLat(stop.location_metadata.snapped_coordinate)
                    .addTo(map.value);
                });

                const directionsRequest = {
                  profile: "driving",
                  steps: true,
                  accessToken: accessToken,
                };

                // Split coordinates into batches of 25
                const coordinateBatches = [];
                for (let i = 0; i < coordinates.length; i += 25) {
                  const batch = coordinates.slice(i, i + 25);
                  coordinateBatches.push(batch);
                }
                // Create an array to store all the route coordinates
                const allRouteCoordinates: any[] = [];

                // Process each coordinate batch
                coordinateBatches.forEach((batch: any, index: number) => {
                  const encodedCoordinates = batch
                    .map((coord: any) => [coord[0], coord[1]].join(",")) // Swap the order of lat and lng, and join with comma
                    .map((coord: any) => encodeURIComponent(coord)) // Encode the coordinates
                    .join("%3B"); // Join the encoded coordinates with URL encoded semicolon

                  get(
                    `/directions/v5/mapbox/${encodeURIComponent(
                      directionsRequest.profile
                    )}/${encodedCoordinates}?alternatives=true&language=en&overview=full&geometries=geojson&steps=${
                      directionsRequest.steps
                    }&access_token=${SECRET_TOKEN}`,
                    true // use secret key
                  ).then((response) => {
                    console.log(response);
                    // Retrieve the coordinates of the route
                    const routeCoordinates = response.routes[0].geometry
                      .coordinates as any;

                    if (index === 0) {
                      // For the first batch, directly add the coordinates to the allRouteCoordinates array
                      allRouteCoordinates.push(...routeCoordinates);
                    } else {
                      // For subsequent batches, reverse the coordinates and combine them with the previous coordinates
                      const reversedCoordinates = routeCoordinates
                        .slice(1)
                        .reverse();
                      allRouteCoordinates.push(...reversedCoordinates);
                    }

                    // Check if this is the last batch
                    if (index === coordinateBatches.length - 1) {
                      // Create a LineString feature with the combined route coordinates
                      const combinedRouteLineString = {
                        type: "Feature",
                        geometry: {
                          type: "LineString",
                          coordinates: allRouteCoordinates,
                        },
                      };

                      // Draw the combined route on the map
                      if (map.value.getSource("combined-route")) {
                        map.value
                          .getSource("combined-route")
                          .setData(combinedRouteLineString);
                      } else {
                        map.value.addLayer({
                          id: "combined-route",
                          type: "line",
                          source: {
                            type: "geojson",
                            data: combinedRouteLineString,
                          },
                          layout: {
                            "line-join": "round",
                            "line-cap": "round",
                          },
                          paint: {
                            "line-color": "#3887be",
                            "line-width": 5,
                            "line-opacity": 0.75,
                          },
                        });
                      }
                    }
                    // Retrieve the coordinates of the route
                    // const routeCoordinates = response.routes[0].geometry
                    //   .coordinates as any;

                    // // Create a LineString feature with the route coordinates
                    // const routeLineString = {
                    //   type: "Feature",
                    //   geometry: {
                    //     type: "LineString",
                    //     coordinates: routeCoordinates,
                    //   },
                    // };
                    // if (map.value.getSource("route-" + index)) {
                    //   map.value
                    //     .getSource("route-" + index)
                    //     .setData(routeLineString);
                    // }
                    // // otherwise, we'll make a new request
                    // else {
                    //   map.value.addLayer({
                    //     id: "route-" + index,
                    //     type: "line",
                    //     source: {
                    //       type: "geojson",
                    //       data: routeLineString,
                    //     },
                    //     layout: {
                    //       "line-join": "round",
                    //       "line-cap": "round",
                    //     },
                    //     paint: {
                    //       "line-color": "#3887be",
                    //       "line-width": 5,
                    //       "line-opacity": 0.75,
                    //     },
                    //   });
                    // }
                    // Draw the route on the map
                    // map.value.addLayer({
                    //   id: "route-" + index,
                    //   type: "line",
                    //   source: {
                    //     type: "geojson",
                    //     data: routeLineString,
                    //   },
                    //   paint: {
                    //     "line-width": 4,
                    //     "line-color": "#00FF00",
                    //   },
                    // });
                  });
                });
              });
            });
          }, 1);
        }
      );
    });

    return {
      accessToken,
      zoom,
      data,
    };
  },
});
</script>

<style>
#map {
  height: 100vh;
  width: 100vw;
}
</style> -->
