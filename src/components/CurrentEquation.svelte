<script>
  import OperatorButtons from "./OperatorButtons.svelte";
  import NumberButtons from "./NumberButtons.svelte";

  const operatorsArr = [".", "+", "-", "×", "÷", "=", "C", "<"];
  let output = ["0"];
  let isOutputAnswer = false;
  $: outputLastElement = output[output.length - 1];
</script>

<div id="currentEquation">
  <p id="equationOutput">{output.join("")}</p>
  <section id="buttons" />
  <section id="operatorButtons">
    <OperatorButtons bind:output bind:isOutputAnswer bind:outputLastElement />
  </section>
  <section id="numberButtons">
    <NumberButtons bind:output bind:isOutputAnswer bind:outputLastElement />
  </section>
</div>

<style>
  p {
    margin: 0;
    padding: 0;
    padding-left: 0.2em;
  }

  #currentEquation {
    margin: 0;
    padding: 0;
    border-radius: 5px;
    background: #E6EBE0;
  }

  #equationOutput {
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    overflow-wrap: break-word;
    background-color: #ED6A5A;
    border-radius: 5px;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    height: 3em;
    text-align: left;
    font-size: 1.5em;
  }
</style>
