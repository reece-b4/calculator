<script>
    import OperatorButtons from './OperatorButtons.svelte';
    import NumberButtons from './NumberButtons.svelte';

    const operatorsArr = [".", "+", "-", "×", "÷", "=", "C", "<"];
    let output = ["0"];
    let isOutputAnswer = false;
    $: outputLastElement = output[output.length - 1];
</script>

<p>output {output.join("")}</p>
<OperatorButtons bind:output bind:isOutputAnswer bind:outputLastElement/>
<NumberButtons bind:output bind:isOutputAnswer bind:outputLastElement/>

