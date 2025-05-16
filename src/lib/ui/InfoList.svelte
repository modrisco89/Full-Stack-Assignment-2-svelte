<script lang="ts">
    import type { VenueInfo } from "$lib/types/venue-types";

    
    export let infos: VenueInfo[] = [];

</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Artist</th>
      <th>Price</th>
      <th>Date</th>
      <th>Genre</th>
    </tr>
  </thead>
  <tbody>
    {#each infos as eventDetail}
      <tr>
        <td>
          {eventDetail.artist}
        </td>
        <td>
          {eventDetail.price}
        </td>
        <td>
          {eventDetail.date}
        </td>
        <td>
          {eventDetail.genre}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
