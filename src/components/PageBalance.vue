<template>
  <h4>Stav peněženky</h4>
  <h1 id="balance">
    {{ total.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
    Kč
  </h1>
</template>

<script setup>
  defineProps({
    total: {
      type: Number,
      required: true,
    },
  })
</script>
