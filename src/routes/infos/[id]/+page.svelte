<script lang="ts">
  import { subTitle,loggedInUser, currentInfos } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import EventForm from "./InfoForm.svelte";
  import { page } from '$app/stores';
  import InfoList from "$lib/ui/InfoList.svelte";
  import { venueService } from "$lib/services/venue-service";
  import { onMount } from "svelte";
  import type { VenueInfo } from "$lib/types/venue-types";
  subTitle.text = "Events";
 
  let infos: VenueInfo[] = [];
  
  onMount(async () => {
  const id = $page.params.id;
  infos = await venueService.getInfos(id, loggedInUser.token);
  console.log("The details are: ",infos);
  });

</script>

<Card title="Enter an Event">
  <EventForm />
</Card>

<Card title="Infos">
  <InfoList {infos} />
</Card>
