<template>
  <PageHeader />
  <div class="container">
    <PageBalance :total="+total" />
    <IncomeExpense :incomes="+incomes" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transaction-deleted="handleTransactionDeleted" />
    <AddTransaction @transaction-added="handleNewTransaction" />
  </div>
</template>

<script setup>
  import PageHeader from './components/PageHeader.vue';
  import PageBalance from './components/PageBalance.vue';
  import IncomeExpense from './components/IncomeExpense.vue';
  import TransactionList from './components/TransactionList.vue';
  import AddTransaction from './components/AddTransaction.vue';
  import { ref, computed } from 'vue';
  import { onMounted } from 'vue';
  import { useToast } from 'vue-toastification';

  // Transaction data
  const transactions = ref([]);

  // Toast notification
  const toast = useToast();

  // Fetch transactions from local storage
  onMounted(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.value = storedTransactions;
  });

  // Calculate total
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  });

  // Calculate income
  const incomes = computed(() => {
    return transactions.value
      .filter(transaction => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  });

  // Calculate expense
  const expenses = computed(() => {
    return transactions.value
      .filter(transaction => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  });

  // Save transactions to local storage
  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  };

  // Handle new transaction
  const handleNewTransaction = (newTransaction) => {
    transactions.value.push(newTransaction);
    saveTransactionsToLocalStorage();
    toast.success('Transaction added successfully');
  };

  // Handle if transaction deleted
  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(transaction => transaction.id !== id);
    saveTransactionsToLocalStorage();
    toast.success('Transaction deleted successfully');
  };
</script>

<style scoped></style>
