<script lang="ts">
  
  import Card from "$lib/ui/Card.svelte";
  import VenueForm from "./VenueForm.svelte";
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";
  import { venueService } from "$lib/services/venue-service";
  import { onMount } from "svelte";
  import type { Venue } from "$lib/types/venue-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  subTitle.text = "Venuely";
  let map: LeafletMap;

  // let venues: Venue[] = [];

  onMount(async () => {
    map.refreshMap(map, loggedInUser.token);
  });

</script>



<div class="columns">
  <div class="column">
<Card title="Enter an Event">
  <VenueForm {map} />
</Card>
  </div>
  <div class="column">
<Card title="Venue Location">
  <LeafletMap 
  height={48}
  zoom={2}
  bind:this={map}/>
</Card>
  </div>
</div>

<Card title="Venues">
  <VenueList {map} />
</Card>