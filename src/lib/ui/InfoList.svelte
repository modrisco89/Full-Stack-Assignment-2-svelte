<script lang="ts">
    import { currentInfos, loggedInUser } from "$lib/runes.svelte";
    import { venueService } from "$lib/services/venue-service";
    
// let { infos } = $props();

async function deleteInfo(infoId: string | undefined, venueId: string | undefined) {
   await venueService.deleteInfo(infoId, loggedInUser.token, venueId);
   
  }
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Artist</th>
      <th>Price</th>
      <th>Date</th>
      <th>Genre</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each currentInfos.infos as eventDetail}
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
        <td>
          <span class="icon"><a onclick={() => deleteInfo(eventDetail._id, eventDetail.venueid)}><span class="icon mr-1">
          <i class="fas fa-trash"></i></span></a></span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
