<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
    import { venueService } from "$lib/services/venue-service";

  // loggedInUser.email = "";
  // loggedInUser.name = "";
  // loggedInUser.token = "";
  // loggedInUser._id = "";
  // localStorage.removeItem("venue");
  venueService.clearSession();
  goto("/");
</script>
