import { SECRET_TOKEN, PUBLIC_TOKEN, get, post } from "./axiosService";

const MAPBOX_OPTIMIZED_TRIP_URL = "optimized-trips/v2";
const MAPBOX_DIRECTIONS_URL = "directions/v5/mapbox";
const MAX_ATTEMPTS = 10;
const TIMEOUT_MS = 2000;

export async function getOptimizedTripStatus(
  tripId: string,
  maxAttempts = MAX_ATTEMPTS,
  currentAttempt = 1
): Promise<any> {
  if (currentAttempt > maxAttempts) {
    throw new Error("Maximum attempts exceeded");
  }

  const response = await get(
    `/${MAPBOX_OPTIMIZED_TRIP_URL}/${tripId}?access_token=${SECRET_TOKEN}`
  );

  if (response.status !== "processing") {
    return response;
  } else {
    // Wait for a short period before making the next attempt
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));

    // Recursive call to check the status again
    return getOptimizedTripStatus(tripId, maxAttempts, currentAttempt + 1);
  }
}

export async function getOptimizedTrip(
  payload: any,
  map: any,
  mapboxgl: any
): Promise<any> {
  await post(MAPBOX_OPTIMIZED_TRIP_URL, payload).then((response: any) => {
    const tripId = response.id;
    getOptimizedTripStatus(tripId).then((response: any) => {
      response.routes.forEach((route: any) => {
        const coordinates = route.stops.map(
          (stop: any) => stop.location_metadata.snapped_coordinate
        );
        route.stops.forEach((stop: any, index: number) => {
          const el = document.createElement("div");
          el.className = "marker";
          el.innerHTML = `<h3>${index + 1}</h3>`;
          new mapboxgl.Marker(el)
            .setLngLat(stop.location_metadata.snapped_coordinate)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${index + 1}</h3>`)
            )
            .addTo(map.value);
        });

        const directionsRequest = {
          profile: "driving",
          steps: true,
          accessToken: PUBLIC_TOKEN,
        };

        // Split coordinates into batches of 25
        const coordinateBatches: any = [];
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
            `/${MAPBOX_DIRECTIONS_URL}/${encodeURIComponent(
              directionsRequest.profile
            )}/${encodedCoordinates}?alternatives=true&language=en&overview=full&geometries=geojson&steps=${
              directionsRequest.steps
            }&access_token=${SECRET_TOKEN}`
          ).then((response) => {
            // Retrieve the coordinates of the route
            const routeCoordinates = response.routes[0].geometry
              .coordinates as any;

            if (index === 0) {
              // For the first batch, directly add the coordinates to the allRouteCoordinates array
              allRouteCoordinates.push(...routeCoordinates);
            } else {
              // Retrieve the last coordinate of the previous batch
              const previousBatch = coordinateBatches[index - 1];
              const lastCoordinateOfPreviousBatch =
                previousBatch[previousBatch.length - 1];

              // Retrieve the first coordinate of the current batch
              const firstCoordinateOfCurrentBatch = batch[0];

              // Retrieve the directions between the last coordinate of the previous batch and the first coordinate of the current batch
              get(
                `/directions/v5/mapbox/${encodeURIComponent(
                  directionsRequest.profile
                )}/${lastCoordinateOfPreviousBatch[0]}%2C${
                  lastCoordinateOfPreviousBatch[1]
                }%3B${firstCoordinateOfCurrentBatch[0]}%2C${
                  firstCoordinateOfCurrentBatch[1]
                }?alternatives=true&language=en&overview=full&geometries=geojson&steps=${
                  directionsRequest.steps
                }&access_token=${SECRET_TOKEN}`
              ).then((directionsResponse) => {
                // Retrieve the coordinates of the optimized route between the last and first coordinate
                const optimizedRouteCoordinates = directionsResponse.routes[0]
                  .geometry.coordinates as any;

                // Combine the optimized route coordinates with the current batch's route coordinates
                allRouteCoordinates.push(
                  ...optimizedRouteCoordinates,
                  ...routeCoordinates
                );

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
              });
            }
          });
        });
      });
    });
  });
}
