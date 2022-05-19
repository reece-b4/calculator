<script>
  import { plusMinusTimesDivide, equations } from "../stores";
  export let output = ["0"];
  export let isOutputAnswer = false;
  export let outputLastElement = output[output.length - 1];
  const operatorsArr = [".", "+", "-", "×", "÷", "=", "C", "<"];
  const gridTemplateArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

  function onKeydown({keyCode}) {
    switch (keyCode) {
      case 13:
        handleOperatorClick("=");
        break;
      case 187:
        if (e.shiftKey === true) {
          handleOperatorClick("+");
        } else {
          handleOperatorClick("=");
        }
        break;
      case 106:
        handleOperatorClick("×");
        break;
      case 107:
        handleOperatorClick("+");
        break;
      case 109:
      case 189:
        handleOperatorClick("-");
        break;
      case 110:
        handleOperatorClick(".");
        break;
      case 111:
        handleOperatorClick("÷");
        break;
      case 67:
        handleOperatorClick("C");
        break;
      case 27:
        $equations = [];
        break;
      case 8:
      case 46:
        handleOperatorClick("<");
    }
  }

  function handleOperatorClick(input) {
    let operator = "";
    if (input.hasOwnProperty("isTrusted")) {
      operator = input.target.value.toString();
    } else {
      operator = input;
    }
    switch (operator) {
      case "=":
        evaluate();
        break;
      case "C":
        clearOutput();
        break;
      case ".":
        addDecimal();
        break;
      case "<":
        deleteChar();
        break;
      default:
        addOperator(operator);
    }
  }

  function clearOutput() {
    output = ["0"];
  }

  function addDecimal() {
    if (!output[output.length - 1].match(/\./)) {
      if ($plusMinusTimesDivide.includes(outputLastElement)) {
        output[output.length - 1] += "0.";
      } else {
        output[output.length - 1] += ".";
      }
    }
  }

  function addOperator(operator) {
    //remove any redundant decimals or zeroes
    if (output[output.length - 1].match(/\./)) {
      const match = /((\.?0*)$)/;
      output[output.length - 1] = output[output.length - 1].replace(match, "");
    }
    if (output.length >= 1) {
      if ($plusMinusTimesDivide.includes(outputLastElement)) {
        if (outputLastElement != operator) {
          output[output.length - 1] = operator;
        }
      } else {
        output = [...output, operator];
      }
    }
    isOutputAnswer = false;
  }

  function deleteChar() {
    if (output.length === 1 && output[0].length === 1) {
      output = ["0"];
    } else {
      if ($plusMinusTimesDivide.includes(outputLastElement)) {
        output = output.slice(0, -1);
      } else if (outputLastElement === "") {
        output = output.slice(0, -2);
      } else {
        output[output.length - 1] = outputLastElement.slice(0, -1);
      }
    }
  }

  function evaluate() {
    // delete redundant decimals and/or zeroes
    if (output[output.length - 1].match(/\./)) {
      const match = /((\.?0*)$)/;
      output[output.length - 1] = output[output.length - 1].replace(match, "");
    }

    // delete redundant operator at end of equation
    if ($plusMinusTimesDivide.includes(outputLastElement)) {
      output = output.slice(0, -1);
    }

    //replace symbols and evaluate string as equation
    let str = '"use strict";return (' + output.join("") + ")";
    str = str.replace("÷", "/");
    str = str.replace("×", "*");
    $equations = [output.join("") + "=" + Function(str)(), ...$equations];
    output = [Function(str)().toString()];
    isOutputAnswer = true;
  }
</script>

<style>
  button {
    pointer-events: all;
    border-radius: 5px;
    border-color: black;
    background-color: cadetblue;
    margin: 0;
    font-size: 3em;
    padding: 0;
  }

  #opButtons {
    /* padding:0; */
    /* margin:0; */
    pointer-events: none;
    width: 100%;
    height: 40vh;
    display: grid;
    z-index: 1;
    position: absolute;
    grid-template-areas: 
    ". . h e"
    ". . . d" 
    ". . . c" 
    ". . . b" 
    "g . a f";
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
</style>

<div id='opButtons' onMouseDown={ (event) => event.stopPropagation()}>
{#each operatorsArr as operator, i}
  <button id={operator} value={operator} style="grid-area: {gridTemplateArr[i]}" on:click={handleOperatorClick}
    >{operator}</button
  >
{/each}
</div>

<svelte:window on:keydown={onKeydown} />
