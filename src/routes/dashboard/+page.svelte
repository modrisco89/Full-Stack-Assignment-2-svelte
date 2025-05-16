<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import VenueForm from "./VenueForm.svelte";

  subTitle.text = "Venuely";

</script>

<Card title="Enter a Venue">
  <VenueForm />
</Card>
