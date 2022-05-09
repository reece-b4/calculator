<script>
  import { plusMinusTimesDivide, equations } from "../stores";
  export let output = ["0"];
  export let isOutputAnswer = false;
  export let outputLastElement = output[output.length - 1];
  const operatorsArr = [".", "+", "-", "×", "÷", "=", "C", "<"];

  function onKeydown(e) {
    switch (e.keyCode) {
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
    $equations = [...$equations, output.join("") + "=" + Function(str)()];
    output = [Function(str)().toString()];
    isOutputAnswer = true;
  }
</script>

{#each operatorsArr as operator}
  <button id={operator} value={operator} on:click={handleOperatorClick}
    >{operator}</button
  >
{/each}

<svelte:window on:keydown={onKeydown} />
