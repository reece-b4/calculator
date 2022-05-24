<script>
  import { equations } from "../stores";
</script>

<div id="display">
  <section id="previousEquationsSection">
    <section id="innerEquationsSection">
      {#each $equations as equation, i}
        <p class="previousEquation" id={i === 0 ? 'lastEquation' : ''}>{equation}</p>
      {/each}
    </section>
  </section>
  <button id="clearEquations" on:click={() => ($equations = [])}>Clear</button>
</div>

<style>
  #lastEquation {
    color: white;
  }


  button {
    border-radius: 5px;
    border-color: black;
    background-color: cadetblue;
  }

  p {
    margin: 0;
  }

  #display {
    position: relative;
    flex:1;
    background-color: #84799c;
    margin: 0;
    padding: 0;
    border-radius: 5px;
  }

  #previousEquationsSection {
    position: absolute;
    width: 100%;
    height: 100%;
    padding:0;
    bottom: 0;
    -webkit-mask-image: linear-gradient(to top, black 90%, transparent 100%);
    mask-image: linear-gradient(to top, black 90%, transparent 100%);
  }

  #innerEquationsSection {
    position: absolute;
    max-height: 100%;
    width: 100vw;
    bottom: 0;
    overflow-y: scroll;
    overflow-wrap: break-word;
    display: flex;
    flex-direction: column-reverse;
  }

  #clearEquations {
    background-color: #E6EBE0;
    z-index: 1000;
    position: absolute;
    float: right;
    margin-right: 0.5em;
    margin-top: 0.5em;
    right: 0;
  }

  .previousEquation {
    font-size: 1.5em;
    padding: 0.2em;
  }

  @media only screen and (min-width: 600px) {
    #previousEquationsSection {
    width: 100%;
  }

    #innerEquationsSection {
      width: 100%;
    }
}
</style>
