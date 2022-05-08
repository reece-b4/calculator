<script>
  const operatorsArr = [".", "+", "-", "×", "÷", "=", "C", "CE", "<"];
  const plusMinusTimesDivide = ["+", "-", "×", "÷"];
  let output = ["0"];
  let equations = [];
  $: outputLastElement = output[output.length - 1];
  let isOutputAnswer = false;

  function onKeydown(e) {
    switch (e.keyCode) {
      case 13:
        evaluate();
        break;
      case 187:
        if (e.shiftKey === true) {
          addOperator("+");
        } else {
          evaluate();
        }
        break;
      case 96:
      case 48:
        handleNumClick(0);
        break;
      case 49:
      case 97:
        handleNumClick(1);
        break;
      case 50:
      case 98:
        handleNumClick(2);
        break;
      case 51:
      case 99:
        handleNumClick(3);
        break;
      case 52:
      case 100:
        handleNumClick(4);
        break;
      case 53:
      case 101:
        handleNumClick(5);
        break;
      case 54:
      case 102:
        handleNumClick(6);
        break;
      case 55:
      case 103:
        handleNumClick(7);
        break;
      case 56:
      case 104:
        handleNumClick(8);
        break;
      case 57:
      case 105:
        handleNumClick(9);
        break;
      case 106:
        addOperator("×");
        break;
      case 107:
        addOperator("+");
        break;
      case 109:
      case 189:
        addOperator("-");
        break;
      case 110:
        addDecimal();
        break;
      case 111:
        addOperator("÷");
        break;
      case 67:
        output = ["0"];
        break;
      case 27:
        clearAll();
      case 8:
      case 46:
        deleteChar();
    }
  }

  function evaluate() {
    // delete redundant decimals and/or zeroes
    if (output[output.length - 1].match(/\./)) {
      const match = /((\.?0*)$)/;
      output[output.length - 1] = output[output.length - 1].replace(match, "");
    }

    // delete redundant operator at end of equation
    if (plusMinusTimesDivide.includes(outputLastElement)) {
      output = output.slice(0, -1);
    }

    //replace symbols and evaluate string as equation
    let str = '"use strict";return (' + output.join("") + ")";
    str = str.replace("÷", "/");
    str = str.replace("×", "*");
    equations = [...equations, output.join("") + "=" + Function(str)()];
    output = [Function(str)().toString()];
    isOutputAnswer = true;
  }

  function numAddButtonNum(buttonNum) {
    output[output.length - 1] = output[output.length - 1] += buttonNum;
  }

  function buttonNumReplaceNum(buttonNum) {
    output[output.length - 1] = buttonNum;
  }

  function addDecimal() {
    if (!output[output.length - 1].match(/\./)) {
      if (plusMinusTimesDivide.includes(outputLastElement)) {
        output[output.length - 1] += "0.";
      } else {
        output[output.length - 1] += ".";
      }
    }
  }

  function deleteChar() {
    if (output.length === 1 && output[0].length === 1) {
      output = ["0"];
    } else {
      if (plusMinusTimesDivide.includes(outputLastElement)) {
        output = output.slice(0, -1);
      } else if (outputLastElement === "") {
        output = output.slice(0, -2);
      } else {
        output[output.length - 1] = outputLastElement.slice(0, -1);
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
      if (plusMinusTimesDivide.includes(outputLastElement)) {
        if (outputLastElement != operator) {
          output[output.length - 1] = operator;
        }
      } else {
        output = [...output, operator];
      }
    }
    isOutputAnswer = false;
  }

  function handleNumClick(number) {
    let buttonNum = "";
    if (number.hasOwnProperty("isTrusted")) {
      const {
        target: { value },
      } = number;
      buttonNum = value.toString();
    } else {
      buttonNum = number.toString();
    }

    if (isOutputAnswer === true) {
      buttonNumReplaceNum(buttonNum);
    } else {
      if (plusMinusTimesDivide.includes(outputLastElement)) {
        output = [...output, ""];
      }
      // preventing adding more zeroes to single 0
      if (buttonNum === "0" && outputLastElement[0] != 0) {
        numAddButtonNum(buttonNum);
      } else if (
        // if number is 0 and non zero number is pressed, replace 0 with number
        outputLastElement[outputLastElement.length - 1] === "0" &&
        outputLastElement.length === 1
      ) {
        buttonNumReplaceNum(buttonNum);
      } else {
        numAddButtonNum(buttonNum);
      }
    }
    isOutputAnswer = false;
  }

  function clearAll() {
    equations = [];
    output = ["0"];
  }
</script>

<p>equations</p>
{#each equations as equation}
  <p>{equation}</p>
{/each}
<p>output {output.join("")}</p>

{#each Array(10) as num, i}
  <button value={i} on:click={handleNumClick}>{i}</button>
{/each}

{#each operatorsArr as operator}
  {#if operator === "="}
    <button on:click={evaluate}>{operator}</button>
  {:else if operator === "C"}
    <button
      on:click={() => {
        output = ["0"];
      }}>{operator}</button
    >
  {:else if operator === "."}
    <button on:click={addDecimal}>{operator}</button>
  {:else if operator === "CE"}
    <button on:click={clearAll}>{operator}</button>
  {:else if operator === "<"}
    <button on:click={deleteChar}>{operator}</button>
  {:else}
    <button
      on:click={() => {
        addOperator(operator);
      }}>{operator}</button
    >
  {/if}
{/each}

<svelte:window on:keydown={onKeydown} />
