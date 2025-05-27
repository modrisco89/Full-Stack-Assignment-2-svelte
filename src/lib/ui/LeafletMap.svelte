<script lang="ts">
  //import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import { latLng, map, type Control, type Map as LeafletMap } from "leaflet";
  // import { browser } from "$app/environment";
    import type { Venue } from "$lib/types/venue-types";
    import { venueService } from "$lib/services/venue-service";
    import { loggedInUser } from "$lib/runes.svelte";

  // let venue: Venue;
  // venue = venueService.getaVenue(loggedInUser.token, id);
  let {height = 40, zoom = 8} = $props();

  let id = "home-map-id";
  // let zoom = 8;
  let minZoom = 1.5;
  let activeLayer = "All";
  
  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;
  let venues: Venue[];
  let markers: any[] = [];

  onMount(async () => {
    initMap();
  });

  async function initMap(){
    // if (!browser) return;
        const leaflet = await import("leaflet");
    L = leaflet.default;
    baseLayers = {
    //   Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     maxZoom: 17,
    //     attribution:
    //       'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    //   }),
    // Satellite: leaflet.tileLayer(
    //     "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    //     {
    //       attribution:
    //         "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    //     }),
        Small: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
        Medium: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
        Large: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
        All: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
    };
   let defaultLayer = baseLayers[activeLayer];

    imap = leaflet.map(id, {
      center: [0, 0],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });
    control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
    
  imap.on("baselayerchange", (e) => {
    
    activeLayer = e.name;
    refreshMap(loggedInUser.token);
  });

  await refreshMap(loggedInUser.token);
}

    export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
    markers.push(marker);
  }
  export function setView(lat: number, lng: number) {
    imap?.flyTo([lat, lng], zoom);
  }
  export function clearMarkers() {
  markers.forEach(marker => {
    marker.remove();
  });
  markers = [];
}


export async function refreshMap(token: string) {
   clearMarkers(); 
  venues= await venueService.getVenues(token); 
  venues.forEach((venue: Venue) => {
    if (venue.capacity === activeLayer) {
    addMarker(venue.latitude, venue.longitude, venue.title);
    }
    else if (activeLayer === "All") {
    addMarker(venue.latitude, venue.longitude, venue.title); 
    }
  });

}

  


</script>

<div {id} class="box" style="height: {height}vh"></div>
