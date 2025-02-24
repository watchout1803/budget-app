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

// Watch for budget uploads and trigger reactivity
watch(() => budgetStore.incomeData, () => {}, { deep: true });
watch(() => budgetStore.expenseData, () => {}, { deep: true });

const saveUpdatedBudget = async () => {
  if (!budgetStore.uploadedExcelFile) return;

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(budgetStore.uploadedExcelFile); // Load existing file

  const incomeSheet = workbook.getWorksheet('Income');
  const expenseSheet = workbook.getWorksheet('Expenses');

  if (!incomeSheet || !expenseSheet) return; // Ensure sheets exist

  // Append new income data
  budgetStore.incomeData.slice(1).forEach(row => {
    incomeSheet.addRow(row);
  });

  // Append new expense data
  budgetStore.expenseData.slice(1).forEach(row => {
    expenseSheet.addRow(row);
  });

  // Save updated file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'UpdatedBudget.xlsx');
};


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
              <v-table v-if="incomeData.length">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(income, index) in incomeData" :key="index">
                    <td>{{ income[1] }}</td> <!-- Assuming date is at index 1 -->
                    <td>{{ income[2] }}</td> <!-- Type -->
                    <td>{{ income[3] }}</td> <!-- Description -->
                    <td>{{ income[4] }}</td> <!-- Amount -->
                  </tr>
                </tbody>
              </v-table>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>View Expenses</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-table v-if="expenseData.length">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(expense, index) in expenseData" :key="index">
                    <td>{{ expense[1] }}</td> <!-- Date -->
                    <td>{{ expense[2] }}</td> <!-- Category -->
                    <td>{{ expense[3] }}</td> <!-- Description -->
                    <td>{{ expense[4] }}</td> <!-- Amount -->
                  </tr>
                </tbody>
              </v-table>
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
