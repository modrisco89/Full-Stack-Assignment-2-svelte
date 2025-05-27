<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { currentVenues, currentInfos, loggedInUser } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { venueService } from "$lib/services/venue-service";
  import { page } from '$app/stores';
  
  
  subTitle.text = "Venue Chart";
  const totalByMethod = {
    labels: [""],
    datasets: [
      {
        values: [0,0]
      }
    ]
  };

    const totalByMethod2 = {
    labels: [""],
    datasets: [
      {
        values: [0,0]
      }
    ]
  };
  console.log(totalByMethod);
  onMount(async () => {
    const id = $page.params.id;
    console.log(id);
    let infos = await venueService.getInfos(id, loggedInUser.token);

    const genreCounts: Record<string, number> = {};
    const artistCost: Record<string, number> = {};

    infos.forEach((info) => {
      genreCounts[info.genre] = (genreCounts[info.genre] || 0) + 1;
      artistCost[info.artist] = (artistCost[info.artist] || 0) + info.price;
    });

    totalByMethod.labels = Object.keys(genreCounts);
    totalByMethod.datasets[0].values = Object.values(genreCounts);
    totalByMethod2.labels = Object.keys(artistCost);
    totalByMethod2.datasets[0].values = Object.values(artistCost);
  });
</script>

    <h1 class="title is-4">Number of Genres</h1>
    <Chart data={totalByMethod} type="bar" />

    <h1 class="title is-4">Cost by Artist</h1>
    <Chart data={totalByMethod2} type="line" />



