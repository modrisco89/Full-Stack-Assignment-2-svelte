<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { currentVenues } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";

  subTitle.text = "venues Data";
  const totalByMethod = {
    labels: ["paypal", "direct"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  };
  onMount(async () => {
    currentVenues.venues.forEach((venue) => {
      if (venue.method == "paypal") {
        totalByMethod.datasets[0].values[0] += venue.amount;
      } else if (venue.method == "direct") {
        totalByMethod.datasets[0].values[1] += venue.amount;
      }
    });
  });
</script>

<div class="columns">
  <div class="column box has-text-centered">
    <h1 class="title is-4">venues to date</h1>
    <Chart data={chartData} type="line" />
  </div>
</div>
