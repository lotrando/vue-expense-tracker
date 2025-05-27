<template>
  <div class="container">
    <div class="header">
      <h1>Peněženka</h1>
      <div class="header-actions">
        <ExportButton :transactions="transactions" />
        <button @click="toggleTheme" class="theme-toggle">
          <!-- Tabler Sun icon -->
          <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M4.93 4.93l1.41 1.41"></path>
            <path d="M17.66 17.66l1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="M6.34 17.66l-1.41 1.41"></path>
            <path d="M19.07 4.93l-1.41 1.41"></path>
          </svg>

          <!-- Tabler Moon icon -->
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
          </svg>
        </button>
      </div>
    </div>

    <PageBalance :total="+total" />
    <IncomeExpense :incomes="+incomes" :expenses="+expenses" />
    <SearchFilter @search="handleSearch" @filter="handleFilter" />
    <TransactionList :transactions="transactions" @transaction-deleted="handleTransactionDeleted"
      @transaction-updated="handleTransactionUpdated" />
    <AddTransaction @transaction-added="handleNewTransaction" />
  </div>
</template>

<script setup>
  import PageBalance from './components/PageBalance.vue'
  import IncomeExpense from './components/IncomeExpense.vue'
  import SearchFilter from './components/SearchFilter.vue'
  import TransactionList from './components/TransactionList.vue'
  import AddTransaction from './components/AddTransaction.vue'
  import ExportButton from './components/ExportButton.vue'
  import { useToast } from 'vue-toastification'
  import { ref, computed, onMounted, watch } from 'vue'

  // Toast notification
  const toast = useToast()

  // Theme
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.body.classList.toggle('dark-theme', isDark.value)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  })

  watch(isDark, () => {
    applyTheme()
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  })

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  // Search
  const handleSearch = (query) => {
    console.log('Hledám:', query)
  }

  const handleFilter = (filter) => {
    console.log('Filtr:', filter)
  }

  // Transaction data
  const transactions = ref([])

  // Fetch transactions from local storage
  onMounted(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
    transactions.value = storedTransactions
  })

  // Calculate total
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2)
  })

  // Calculate income
  const incomes = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2)
  })

  // Calculate expense
  const expenses = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2)
  })

  // Save transactions to local storage
  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }

  // Handle new transaction
  const handleNewTransaction = (newTransaction) => {
    transactions.value.push(newTransaction)
    saveTransactionsToLocalStorage()
    toast.success('Transaction added successfully')
  }

  // Handle if transaction deleted
  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
    saveTransactionsToLocalStorage()
    toast.success('Transaction deleted successfully')
  }

  // Handle if transaction updated
  const handleTransactionUpdated = (updatedTransaction) => {
    transactions.value = transactions.value.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    saveTransactionsToLocalStorage();
    toast.success('Transaction updated successfully');
  }

</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h1 {
    letter-spacing: 1px;
    margin: 0;
  }

  .theme-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
  }

  .theme-toggle:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
