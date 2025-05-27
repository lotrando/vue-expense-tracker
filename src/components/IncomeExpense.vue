<template>
  <div class="inc-exp-container">
    <div>
      <h4>Příjmy</h4>
      <p class="money plus" id="money-plus">{{ incomes }} Kč</p>
    </div>
    <div>
      <h4>Výdaje</h4>
      <p class="money minus" id="money-minus">{{ expenses }} Kč</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    incomes: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
  })
</script>

<style scoped></style>
