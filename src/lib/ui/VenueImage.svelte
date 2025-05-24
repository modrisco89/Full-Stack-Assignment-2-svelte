<script lang="ts">
    import { currentInfos, loggedInUser } from "$lib/runes.svelte";
    import { venueService } from "$lib/services/venue-service";
    import { imageOverlay } from "leaflet";
    
let { venue } = $props();
async function deleteInfo(infoId: string | undefined, venueId: string | undefined) {
   await venueService.deleteInfo(infoId, loggedInUser.token, venueId);
   
  }
</script>


  <img src="{venue.img}" alt="img"/>

