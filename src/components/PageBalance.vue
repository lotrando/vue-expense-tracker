<template>
  <h4>Your Balance</h4>
  <h1 id="balance">
    €
    <Transition name="fade" mode="out-in">
      <span :key="total">
        {{ total.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
      </span>
    </Transition>
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
