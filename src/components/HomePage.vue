<script setup lang="ts">
import { ref } from 'vue';
import ExcelJS from 'exceljs';
import { useBudgetStore } from '../stores/currentBudget';

const budgetStore = useBudgetStore();
const budgetUploaded = ref(false);
const uploadedFile = ref<File | null>(null);

const loadBudget = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadedFile.value = file;
  budgetUploaded.value = true;

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(reader.result as ArrayBuffer);
    const worksheet = workbook.getWorksheet('Budget');

    const data = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex !== 1) { // Skip headers
        data.push({
          name: row.getCell(1).value,
          description: row.getCell(2).value,
          startDate: row.getCell(3).value,
          endDate: row.getCell(4).value,
          amount: row.getCell(5).value
        });
      }
    });

    budgetStore.setBudgetData(data); // Store data globally
  };
};
</script>

<template>
  <v-app>

    <!-- Header Bar -->
    <v-container class="text-center py-5">
      <h1>View Budget</h1>
    </v-container>

    <v-main>
      <v-container>



        <v-table v-if="budgetStore.budgetData.length">
          <thead>
            <tr>
              <th>Budget Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in budgetStore.budgetData" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </v-table>
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
