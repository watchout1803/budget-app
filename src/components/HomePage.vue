<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useBudgetStore } from '../stores/currentBudget';

const budgetStore = useBudgetStore();

// Form fields for new income/expense entry
const newIncome = ref({ date: '', type: '', description: '', amount: '' });
const newExpense = ref({ date: '', category: '', description: '', amount: '' });

// Computed properties to reactively update table when data is uploaded
const incomeData = computed(() => budgetStore.incomeData);
const expenseData = computed(() => budgetStore.expenseData);

const addIncome = () => {
  budgetStore.incomeData.push({ ...newIncome.value });
  newIncome.value = { date: '', type: '', description: '', amount: '' }; // Reset form
};

const addExpense = () => {
  budgetStore.expenseData.push({ ...newExpense.value });
  newExpense.value = { date: '', category: '', description: '', amount: '' }; // Reset form
};

// Table headers for v-data-table
const incomeHeaders = [
  { title: 'Date', key: '1' },
  { title: 'Type', key: '2' },
  { title: 'Description', key: '3' },
  { title: 'Amount', key: '4' },
];

const expenseHeaders = [
  { title: 'Date', key: '1' },
  { title: 'Category', key: '2' },
  { title: 'Description', key: '3' },
  { title: 'Amount', key: '4' },
];

// Watch for budget uploads and trigger reactivity
watch(() => budgetStore.incomeData, () => {}, { deep: true });
watch(() => budgetStore.expenseData, () => {}, { deep: true });
</script>

<template>
  <v-container>
    <h2>Budget Overview</h2>

    <!-- Expenses Section -->
    <v-card class="mb-4">
      <v-card-title>Statistics</v-card-title>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>View Income</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-data-table
                v-if="incomeData.length"
                :headers="incomeHeaders"
                :items="incomeData"
                class="elevation-1"
                item-value="1"
              ></v-data-table>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>View Expenses</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-data-table
                v-if="expenseData.length"
                :headers="expenseHeaders"
                :items="expenseData"
                class="elevation-1"
                item-value="1"
              ></v-data-table>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <!-- Income and Expenses -->
    <v-card>
      <v-card-title>Income and Expenses</v-card-title>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <!-- Add New Income -->
            <v-expansion-panel-title>Add New Income</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-text-field v-model="newIncome.date" label="Date"></v-text-field>
              <v-text-field v-model="newIncome.type" label="Type"></v-text-field>
              <v-text-field v-model="newIncome.description" label="Description"></v-text-field>
              <v-text-field v-model="newIncome.amount" label="Amount" type="number"></v-text-field>
              <v-btn color="primary" @click="addIncome">Add Income</v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Add New Expense -->
          <v-expansion-panel>
            <v-expansion-panel-title>Add New Expense</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-text-field v-model="newExpense.date" label="Date"></v-text-field>
              <v-text-field v-model="newExpense.category" label="Category"></v-text-field>
              <v-text-field v-model="newExpense.description" label="Description"></v-text-field>
              <v-text-field v-model="newExpense.amount" label="Amount" type="number"></v-text-field>
              <v-btn color="primary" @click="addExpense">Add Expense</v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>
