<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";
  import { venueService } from "$lib/services/venue-service";
  import { onMount } from "svelte";
  import type { Venue } from "$lib/types/venue-types";

  subTitle.text = "Venues";
  console.log("the token for venues: ", loggedInUser.token);
  let venues: Venue[] = [];
  onMount(async () => {
  venues = await venueService.getVenues(loggedInUser.token);
  });

</script>

<Card title="Venues">
  <VenueList {venues} />
</Card>
