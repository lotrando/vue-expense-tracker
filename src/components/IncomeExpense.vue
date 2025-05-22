<template>
  <div class="inc-exp-container">
    <div>
      <h4>Incomes</h4>
      <p class="money plus" id="money-plus">€{{ incomes }}</p>
    </div>
    <div>
      <h4>Expenses</h4>
      <p class="money minus" id="money-minus">€{{ expenses }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    incomes: {
      type: Number,
      required: true
    },
    expenses: {
      type: Number,
      required: true
    }
  });
</script>

<style scoped></style>
