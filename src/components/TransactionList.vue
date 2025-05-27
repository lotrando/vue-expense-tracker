<template>
  <h3>Transactions history</h3>
  <PerfectScrollbar>
    <ul id="list" class="list">
      <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
        <!-- Text -->
        <span contenteditable="true" @blur="updateText(transaction, $event)" @keyup.enter="$event.target.blur()"
          class="editable-text">
          {{ transaction.text }}
        </span>

        <!-- Amount -->
        <span contenteditable="true" @blur="updateAmount(transaction, $event)" @keyup.enter="$event.target.blur()"
          class="editable-amount">
          {{ transaction.amount }}
        </span>

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

  const emit = defineEmits(['transactionDeleted', 'transactionUpdated'])

  defineProps({
    transactions: {
      type: Array,
      required: true,
    },
  })

  const updateText = (transaction, event) => {
    const newText = event.target.textContent.trim()
    if (newText !== transaction.text) {
      const updatedTransaction = {
        ...transaction,
        text: newText
      }
      emit('transactionUpdated', updatedTransaction)
    }
  }

  const updateAmount = (transaction, event) => {
    const newAmount = parseFloat(event.target.textContent.trim())
    if (!isNaN(newAmount) && newAmount !== transaction.amount) {
      const updatedTransaction = {
        ...transaction,
        amount: newAmount
      }
      emit('transactionUpdated', updatedTransaction)
    }
  }

  const deleteTransaction = (id) => {
    emit('transactionDeleted', id)
  }
</script>

<style>
  @import 'vue3-perfect-scrollbar/style.css';

  .ps {
    max-height: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }

  .editable-text,
  .editable-amount {
    cursor: text;
    padding: 2px 4px;
    border-radius: 3px;
    transition: background-color 0.2s;
    outline: none;
  }

  .editable-text:hover,
  .editable-amount:hover {
    background-color: #f0f0f0;
  }

  .editable-text:focus,
  .editable-amount:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px #2ecc71;
  }
</style>
