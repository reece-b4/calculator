<script>
    import {equations} from '../stores'
</script>

<p>equations</p>
{#each $equations as equation}
  <p>{equation}</p>
{/each}
<button on:click={()=> $equations = []}>Clear</button>