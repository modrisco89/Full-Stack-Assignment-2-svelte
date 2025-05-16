<script lang="ts">
  import { subTitle,loggedInUser } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import EventForm from "./InfoForm.svelte";
  import { page } from '$app/stores';
  import InfoList from "$lib/ui/InfoList.svelte";
  import { venueService } from "$lib/services/venue-service";
  import { onMount } from "svelte";
  import type { VenueInfo } from "$lib/types/venue-types";
  subTitle.text = "Infos";
 
  let infos: VenueInfo[] = [];
  onMount(async () => {
  const id = $page.params.id;
  console.log(id);
  infos = await venueService.getInfos(id, loggedInUser.token);
  console.log(infos);
  });

</script>

<Card title="Enter an Event">
  <EventForm />
</Card>

<Card title="Infos">
  <InfoList {infos} />
</Card>
