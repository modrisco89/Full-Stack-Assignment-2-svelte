<script lang="ts">
    import { currentVenues } from "$lib/runes.svelte";

let { venues } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Capacity</th>
      <th>lat</th>
      <th>lng</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each currentVenues.venues as venueDetail}
      <tr>
        <td>
          <a href={`/infos/${venueDetail._id}`}>{venueDetail.title}</a>
        </td>
        <td>
          {venueDetail.description}
        </td>
        <td>
          {venueDetail.capacity}
        </td>
        <td>
          {venueDetail.latitude}
        </td>
        <td>
          {venueDetail.longitude}
        </td>
        <td>
          <span class="icon"><a href={`/charts/${venueDetail._id}`}><span class="icon mr-1">
          <i class="fas fa-chart-bar"></i></a></span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
