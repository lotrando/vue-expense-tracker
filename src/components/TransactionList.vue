<template>
  <h3>Transactions history</h3>
  <PerfectScrollbar>
    <ul id="list" class="list">
      <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
        {{ transaction.text }} <span>{{ transaction.amount }}</span>
        <button @click="deleteTransaction(transaction.id)" class="delete-btn">
          <DeleteIcon />
        </button>
      </li>
    </ul>
  </PerfectScrollbar>
</template>

<script setup>
  import DeleteIcon from './DeleteIcon.vue'
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

  const emit = defineEmits(['transactionDeleted'])

  defineProps({
    transactions: {
      type: Array,
      required: true,
    },
  })

  const deleteTransaction = (id) => {
    emit('transactionDeleted', id)
  }
</script>

<style>
  @import 'vue3-perfect-scrollbar/style.css';

  .ps {
    max-height: 200px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
