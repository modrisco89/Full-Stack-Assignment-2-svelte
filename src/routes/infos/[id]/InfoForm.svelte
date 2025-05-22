<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { venueService } from "$lib/services/venue-service";
  // import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { VenueInfo } from "$lib/types/venue-types";

//  let { venueList = [] } = $props();

  let artist = $state("");
  let price = $state(0);
  let genre = $state("");
  let date = $state(new Date());
  let message = $state("Enter an Event");
  import { page } from '$app/stores';

  async function addEvent() {
  const id = $page.params.id;
   if (artist && genre) {
      if (true) {
        const venueInfo: VenueInfo= {
          artist: artist,
          price: price,
          date: date,
          genre: genre
        };
        const success = await venueService.addInfo(venueInfo,id, loggedInUser.token);
        console.log("sucesss message: ", success)
        if (!success) {
          message = "event not completed - some error occurred";
          return;
        }
        message = `Thanks! You added event "${venueInfo.artist}"`;
      }
    } else {
      message = "Please select Artist and Genre";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="venue">Artist:</label>
    <input bind:value={artist} class="input" id="name" name="name" type="text" />
  </div>
  <div class="field">
    <label class="label" for="venue">Price:</label>
     <input bind:value={price} class="input" id="description" name="description" type="text" />
  </div>
   <div class="field">
    <label class="label" for="venue">Date:</label>
     <input bind:value={date} class="input" id="description" name="description" type="text" />
  </div>
     <div class="field">
    <label class="label" for="venue">Genre:</label>
     <input bind:value={genre} class="input" id="description" name="description" type="text" />
  </div>
  
  <div class="field">
    <div class="control">
      <button onclick={() => addEvent()} class="button">Add Event</button>
    </div>
  </div>
</div>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>


