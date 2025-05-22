<script lang="ts">
  
  import Card from "$lib/ui/Card.svelte";
  import VenueForm from "./VenueForm.svelte";
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";
  import { venueService } from "$lib/services/venue-service";
  import { onMount } from "svelte";
  import type { Venue } from "$lib/types/venue-types";

  subTitle.text = "Venuely";
  
  let venues: Venue[] = [];
  onMount(async () => {
  venues = await venueService.getVenues(loggedInUser.token);
  });

</script>

<Card title="Enter a Venue">
  <VenueForm />
</Card>
<Card title="Venues">
  <VenueList {venues} />
</Card>