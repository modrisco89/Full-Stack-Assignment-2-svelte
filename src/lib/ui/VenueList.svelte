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
    </tr>
  </thead>
  <tbody>
    {#each currentVenues.venues as venueDetail}
      <tr>
        <td>
          {venueDetail.title}
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
      </tr>
    {/each}
  </tbody>
</table>
