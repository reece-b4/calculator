<script>
  import Header from './components/Header.svelte'
  import CurrentEquation from "./components/CurrentEquation.svelte";
  import Equations from "./components/Equations.svelte";
</script>

<main>
  <Header />
  <Equations />
  <CurrentEquation />
</main>

<style>
  main {
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
