<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { venueService } from "$lib/services/venue-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { Venue } from "$lib/types/venue-types";
  // import { imageStore } from "$lib/services/img-utils";

//  let { venueList = [] } = $props();

  let name = $state("");
  let lat = $state(0);
  let lng = $state(0);
  let description = $state("");
  let capacities = ["Small", "Medium", "Large"];
  let selectedCapacity = $state("Small");
  let message = $state("Enter a Venue");
  let {map} = $props();
  let imagefile: File | null = null;

    function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    imagefile = target.files && target.files.length > 0 ? target.files[0] : null;
  }

  async function addVenue() {

   if (selectedCapacity && name && description) {
  //    const capacity = capacityList.find((capacity) => capacity._id === selectedCapacity);
      if (true) {
        const venue: Venue = {
          title: name,
          description: description,
          capacity: selectedCapacity,
          latitude: lat,
          longitude: lng,
          imgId: "placeholder_zbjk5v",
          userid: loggedInUser._id
        };
        
        const success = await venueService.addVenue(venue, loggedInUser.token, imagefile);
        map.refreshMap(map, loggedInUser.token);
        if (!success) {
          message = "venue not completed - some error occurred";
          return;
        }
        message = `Thanks! You added venue "${venue.title}"`;
      }
    } else {
      message = "Please enter Venue, description and Capacity";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="venue">Venue Name:</label>
    <input bind:value={name} class="input" id="name" name="name" type="text" />
  </div>
  <div class="field">
    <label class="label" for="venue">Description</label>
     <input bind:value={description} class="input" id="description" name="description" type="text" />
  </div>
   <div class="field">
    <div class="control">
      <label class="label" for="venue">Capacity:</label>
      {#each capacities as capacity}
        <input bind:group={selectedCapacity} class="radio" type="radio" value={capacity} /> {capacity}
      {/each}
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
<div class="columns">

  <div class="column is-flex is-align-items-start">
          <div class="field">
        <div id="file-select" class="file has-name is-fullwidth">
          <label class="file-label"> <input class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg" onchange={handleFileChange}/>
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
            </span>
          </label>
        </div>
        </div>

        <div class="field">
    <div class="control">
      <button onclick={addVenue} class="button">Add Venue</button>
    </div>
  </div>
  </div>
  </div>
  <!-- <div class="column is-two-thirds">
  </div> -->
</div>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
<!--  <div class="select">
      <select bind:value={selectedCandidate}>
        {#each candidateList as candidate}
          <option>{candidate.lastName},{candidate.firstName}</option>
        {/each}
      </select> 
    </div> -->

