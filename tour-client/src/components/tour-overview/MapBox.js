"use client";

import { useEffect } from "react";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl");

function MapBox({ tour }) {
  useEffect(() => {
    const locations = tour.locations;

    mapboxgl.accessToken =
      "pk.eyJ1IjoicDk2NDgyMTMiLCJhIjoiY2xncHhjMjRvMHRlbjNpbXRtcWJmenlycCJ9.kCHnaYYk66kbTtRH5ZYAKA";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
    });

    map.doubleClickZoom.disable();
    map.scrollZoom.disable();

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      //Create marker
      const el = document.createElement("div");
      el.className = "marker";

      //Add popup
      const popup = new mapboxgl.Popup({
        offset: 30,
        closeOnClick: false,
        focusAfterOpen: false,
      }).setText(`Day ${loc.day}: ${loc.description}`);

      //Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(loc.coordinates)
        .setPopup(popup)
        .addTo(map)
        .togglePopup();

      //Extend map bounds to include current location
      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 200,
        right: 200,
      },
    });
  }, [tour.locations]);

  return (
    <section className="section-map">
      <div id="map"></div>
    </section>
  );
}

export default MapBox;
