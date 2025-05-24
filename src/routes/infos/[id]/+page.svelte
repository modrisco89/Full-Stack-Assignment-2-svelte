<script lang="ts">
  import { subTitle,imgurl,loggedInUser, currentInfos } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import EventForm from "./InfoForm.svelte";
  import { page } from '$app/stores';
  import InfoList from "$lib/ui/InfoList.svelte";
  import { venueService } from "$lib/services/venue-service";
  import { onMount } from "svelte";
  import type { VenueInfo, Venue } from "$lib/types/venue-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import VenueImage from "$lib/ui/VenueImage.svelte";
 
  let infos: VenueInfo[] = [];
  let venue: Venue;
  let map: LeafletMap;
  
  onMount(async () => {
    
    const id = $page.params.id;
    infos = await venueService.getInfos(id, loggedInUser.token);
    venue = await venueService.getaVenue(loggedInUser.token, id);
    map.addMarker(venue.latitude, venue.longitude, venue.title)
    map.setView(venue.latitude, venue.longitude);
    subTitle.text = venue.title;
    imgurl.text = venue.img
  });

</script>

<div class="columns">
  <div class="column">
<Card title="Enter an Event">
  <EventForm />
</Card>
  </div>
  <div class="column">
<Card title="Venue Location">
  <LeafletMap 
  height={48}
  zoom={8}
  bind:this={map}/>
</Card>
  </div>
</div>

<div class="columns">
  <div class="column is-one-third">
    {#if venue}
<Card title="Have a look">
  <VenueImage {venue} />
</Card>
{/if}
  </div>
  <div class="column">
<Card title="Events">
  <InfoList {infos}/>
</Card>
  </div>
</div>


