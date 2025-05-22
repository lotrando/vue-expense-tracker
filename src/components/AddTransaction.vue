<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">
        Transaction label
      </label>
      <input type="text" id="text" placeholder="Enter name of transaction ..." v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount">
        Amount - (negative = expense)
      </label>
      <input type="text" id="amount" placeholder="Enter amount of transaction ..." v-model="amount" />
    </div>
    <button class="btn">Add new transaction</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';

  // Toast notification
  const toast = useToast();

  // Define variables
  const text = ref('');
  const amount = ref('');

  // Define emits
  const emit = defineEmits(['transactionAdded']);

  // Handle form submist form
  const onSubmit = () => {
    // Validate input
    if (text.value.trim() === '') {
      toast.error('Transaction label is required')
      return
    } else if (amount.value.trim() === '') {
      toast.error('Transaction amount is required')
      return
    } else if (isNaN(amount.value) || parseFloat(amount.value) === 0) {
      toast.error('Please enter a valid number')
      return
    }

    // Create new transaction
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text: text.value,
      amount: parseFloat(amount.value)
    };

    // Emit event to parent component
    emit('transactionAdded', newTransaction);
    text.value = ''
    amount.value = ''
  };
</script>

<style scoped></style>
