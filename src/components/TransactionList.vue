  <template>
    <h3>Transactions history</h3>
    <ul id="list" class="list">
      <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
        {{ transaction.text }} <span>{{ transaction.amount }}</span>
        <button @click="deleteTransaction(transaction.id)" class="delete-btn">
          <DeleteIcon />
        </button>
      </li>
    </ul>
  </template>

<script setup>
  import DeleteIcon from './DeleteIcon.vue';

  const emit = defineEmits(['transactionDeleted']);

  defineProps({
    transactions: {
      type: Array,
      required: true
    }
  });

  const deleteTransaction = (id) => {
    emit('transactionDeleted', id);
  };
</script>

<style scoped></style>
