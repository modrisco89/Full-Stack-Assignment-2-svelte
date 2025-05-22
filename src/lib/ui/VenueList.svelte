<script lang="ts">
    import { currentVenues, loggedInUser } from "$lib/runes.svelte";
     import { venueService } from "$lib/services/venue-service";
// let { venues } = $props();


async function deleteVenue(venueId: string | undefined) {
  console.log("Delete time", venueId)
   await venueService.deleteVenue(venueId, loggedInUser.token);
  }


  async function openVenue(venueId: string | undefined) {
   await venueService.refreshInfo(venueId);
  }
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
      <th></th>
    </tr>
  </thead>
  <tbody>
    
    {#each currentVenues.venues as venueDetail}
    {#if loggedInUser._id === venueDetail.userid}
      <tr>
        <td>
          <a onclick={() => openVenue(venueDetail._id)} href={`/infos/${venueDetail._id}`}>{venueDetail.title}</a>
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
        <td>
          <span class="icon"><a onclick={() => deleteVenue(venueDetail._id)} href={`/dashboard`}><span class="icon mr-1">
          <i class="fas fa-trash"></i></a></span>
        </td>
      </tr>
      {/if}
    {/each}
    
  </tbody>
</table>
