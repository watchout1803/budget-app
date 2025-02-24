<script setup lang="ts">
import { ref } from 'vue';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Updated headings from spreadsheet
const defaultIncomeHeaders = ref(["Date", "Type", "Description", "Amount"]);
const defaultExpensesHeaders = ref(["Date", "Category", "Description", "Amount"]);

const createNewBudget = async () => {
  const workbook = new ExcelJS.Workbook();

  // Create Income sheet
  const incomeSheet = workbook.addWorksheet('Income');
  incomeSheet.addRow(defaultIncomeHeaders.value);

  // Create Expenses sheet
  const expensesSheet = workbook.addWorksheet('Expenses');
  expensesSheet.addRow(defaultExpensesHeaders.value);

  // Save file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'NewBudget.xlsx');
};
</script>

<template>
  <v-app>
    <!-- Header Bar -->
    <v-container class="text-center py-5">
      <h1>Create New Budget Spreadsheet</h1>
    </v-container>

    <v-main>
      <v-container>
        <h3>Income Sheet Headers</h3>
        <v-row>
          <v-col v-for="(header, index) in defaultIncomeHeaders" :key="index" cols="12" md="6">
            <v-text-field v-model="defaultIncomeHeaders[index]" :label="`Header ${index + 1}`"></v-text-field>
          </v-col>
        </v-row>

        <h3>Expenses Sheet Headers</h3>
        <v-row>
          <v-col v-for="(header, index) in defaultExpensesHeaders" :key="index" cols="12" md="6">
            <v-text-field v-model="defaultExpensesHeaders[index]" :label="`Header ${index + 1}`"></v-text-field>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="createNewBudget">Create New Budget</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
</style>
