"use client";

import * as React from "react";
import * as MapGL from "react-map-gl";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "mapbox-gl/dist/mapbox-gl.css";
import CustomImage from "@/_components/CustomImage";

const Map = ({ marker }: any) => {
  return (
    <MapGL.Map
      mapLib={mapboxgl}
      initialViewState={{
        longitude: 24.04503139608432,
        latitude: 49.83280506072977,
        zoom: 11.5,
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/dmytrofitel/cl4n9m6dh004614pfuvp48asr"
    >
      <MapGL.Marker key="1" longitude={24.02486} latitude={49.85578}>
        <div
          style={{
            position: "relative",
            transform: "translateY(-50%)",
          }}
        >
          {marker && (
            <CustomImage
              media={marker}
              width={marker.width}
              height={marker.height}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                transform: "translateX(-50%)",
              }}
            />
          )}
        </div>
      </MapGL.Marker>
      <MapGL.Marker key="2" longitude={24.06149} latitude={49.80952}>
        <div
          style={{
            position: "relative",
            transform: "translateY(-50%)",
          }}
        >
          {marker && (
            <CustomImage
              media={marker}
              width={marker.width}
              height={marker.height}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                transform: "translateX(-50%)",
              }}
            />
          )}
        </div>
      </MapGL.Marker>
    </MapGL.Map>
  );
};
export default Map;
