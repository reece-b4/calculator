<script>
  import { plusMinusTimesDivide } from "../stores";
  export let output = "0";
  export let isOutputAnswer = false;
  export let outputLastElement = output[output.length - 1];
  const gridTemplateArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

  function onKeydown({keyCode}) {
    switch (keyCode) {
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
    }
  }

  function handleNumClick(number) {
    let buttonNum = "";
    // if number is from screen button click
    if (number.hasOwnProperty("isTrusted")) {
      const {
        target: { value },
      } = number;
      buttonNum = value.toString();
      // if number is from keypress
    } else {
      buttonNum = number.toString();
    }
    if (isOutputAnswer === true) {
      buttonNumReplaceNum(buttonNum);
    } else {
      if ($plusMinusTimesDivide.includes(outputLastElement)) {
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

  function buttonNumReplaceNum(buttonNum) {
    output[output.length - 1] = buttonNum;
  }

  function numAddButtonNum(buttonNum) {
    output[output.length - 1] = output[output.length - 1] += buttonNum;
  }
</script>

<div id="numButtons">
  {#each  gridTemplateArr as gridPosition, i}
    <button value={i} style="grid-area: {gridPosition}" on:click={handleNumClick}>{i}</button>
  {/each}
</div>

<svelte:window on:keydown={onKeydown} />

<style>
  #numButtons {
    display: grid;
    height: 40vh;
    grid-template-areas: 
    "k l . ."
    "h i j ." 
    "e f g ." 
    "b c d ." 
    "m a o .";
    grid-template-rows: repeat(5, 20%);
    grid-template-columns: repeat(4, 25%);
  }

  button {
    background-color: #F4F1BB;
    border-color: black;
    border-radius: 5px;
    margin: 0;
    font-size: 3em;
    padding: 0;
  }
</style>
