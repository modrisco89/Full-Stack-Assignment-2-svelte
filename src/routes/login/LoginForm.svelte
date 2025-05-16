<script lang="ts">
  import { goto } from '$app/navigation';
  import { loggedInUser } from '$lib/runes.svelte';
  import { venueService } from "$lib/services/venue-service";
  import Message from '$lib/ui/Message.svelte';
  import UserCredentials from '$lib/ui/UserCredentials.svelte';


  let email = $state('');
  let password = $state('');
  let message = $state('');

//  async function login() {
    
//     let session = await venueService.login(email, password);
//     if (session) {
//       loggedInUser.email = email;
//       loggedInUser.name = session.name;
//       loggedInUser.token = session.token;
//       loggedInUser._id = session._id;
//       localStorage.venue = JSON.stringify(loggedInUser);
//       goto("/dashboard");
//     } else {
//       email = "";
//       password = "";
//       message = "Invalid Credentials";
//     }
// //   }
//     onMount(async () => {
//     await venueService.restoreSession();
//   });
async function login() {
    
    let session = await venueService.login(email, password);
    if (session) {
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }




    function onMount(arg0: () => Promise<void>) {
        throw new Error('Function not implemented.');
    }
</script>

{#if message}
  <Message {message} />
{/if}

<form onsubmit={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log In</button>
</form>