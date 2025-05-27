<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Search transaction ..."
        class="search-input">
      <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-square-x">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
          <path d="M9 9l6 6m0 -6l-6 6" />
        </svg>
      </button>
    </div>

    <div class="filter-buttons">
      <button @click="setFilter('all')" :class="{ active: activeFilter === 'all' }" class="filter-btn">
        All
      </button>
      <button @click="setFilter('income')" :class="{ active: activeFilter === 'income' }" class="filter-btn income">
        Incomes
      </button>
      <button @click="setFilter('expense')" :class="{ active: activeFilter === 'expense' }" class="filter-btn expense">
        Expenses
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const searchQuery = ref('')
  const activeFilter = ref('all')

  const emit = defineEmits(['search', 'filter'])

  const handleSearch = () => {
    emit('search', searchQuery.value)
  }

  const setFilter = (filter) => {
    activeFilter.value = filter
    emit('filter', filter)
  }

  const clearSearch = () => {
    searchQuery.value = ''
    emit('search', '')
  }
</script>

<style scoped>
  .search-container {
    margin-bottom: 20px;
  }

  .search-input-wrapper {
    position: relative;
    margin-bottom: 10px;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 10px 10px 10px 40px;
    border: 2px solid #d1d1d1;
    font-size: 14px;
    background: var(--bg-secondary, #fff);
    color: var(--text-primary, #333);
  }

  .search-input:focus {
    border-color: #2ecc71;
    outline: none;
  }

  .clear-btn {
    position: absolute;
    right: 7px;
    top: 23px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #8f8f8f;
    cursor: pointer;
    padding: 2px;
  }

  .clear-btn:hover {
    color: #5c5c5c;
  }

  .filter-buttons {
    display: flex;
    gap: 8px;
  }

  .filter-btn {
    padding: 6px 12px;
    border: 2px solid #d1d1d1;
    background: var(--bg-secondary, #fff);
    color: var(--text-primary, #333);
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    border-color: #bbb;
  }

  .filter-btn.active {
    background-color: #2ecc71;
    border-color: #2ecc71;
    color: white;
  }

  .filter-btn.income.active {
    background-color: #2ecc71;
    border-color: #2ecc71;
  }

  .filter-btn.expense.active {
    background-color: #e74c3c;
    border-color: #e74c3c;
  }

  /* Dark mode */
  :global(.dark-theme) .search-input {
    background: #2d2d2d;
    color: #ffffff;
    border-color: #404040;
  }

  :global(.dark-theme) .filter-btn {
    background: #2d2d2d;
    color: #ffffff;
    border-color: #404040;
  }

  :global(.dark-theme) .clear-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
