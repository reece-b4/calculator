import {readable, writable, derived} from 'svelte/store'

export const plusMinusTimesDivide = readable(["+", "-", "×", "÷"], function(set) {
    return function (stop) {}
})

export const equations = writable([])
