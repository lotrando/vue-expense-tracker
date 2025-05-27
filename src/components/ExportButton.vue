<template>
  <vue3-json-excel :json-data="exportData" :fields="fields" :name="filename" class="export-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-file-excel">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
      <path d="M10 12l4 5" />
      <path d="M10 17l4 -5" />
    </svg>
  </vue3-json-excel>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    transactions: {
      type: Array,
      required: true
    }
  })

  const exportData = computed(() => {
    return props.transactions.map(transaction => ({
      popis: transaction.text,
      castka: transaction.amount,
      typ: transaction.amount > 0 ? 'Příjem' : 'Výdaj'
    }))
  })

  const fields = {
    'Popis': 'popis',
    'Částka': 'castka',
    'Typ': 'typ'
  }

  const filename = `expense-tracker-${new Date().toISOString().split('T')[0]}`
</script>

<style scoped>
  .export-btn {
    background-color: #1b8135;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    text-decoration: none;
  }
</style>
