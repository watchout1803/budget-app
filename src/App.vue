<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useThemeStore } from './stores/theme';
import ExcelJS from 'exceljs';
import { useBudgetStore } from './stores/currentBudget';
import { format } from 'date-fns'; // Import date-fns for formatting

const ThemeStore = useThemeStore();
const budgetStore = useBudgetStore();

const displayDrawer = ref(true);
const budgetUploaded = ref(false);
const uploadedFile = ref<File | null>(null);
const menu = ref(false); // Controls dropdown menu visibility

// Function to format Excel dates to "dd/MM/yyyy"
const formatExcelDate = (value: any) => {
  if (value instanceof Date) {
    return format(value, 'dd/MM/yyyy'); // Converts to "dd/MM/yyyy"
  }
  return value; // Return as is if not a date
};

// Function to handle file upload
const loadBudget = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadedFile.value = file;
  budgetUploaded.value = true;
  menu.value = false; // Close menu after upload

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result as ArrayBuffer);

      const incomeSheet = workbook.getWorksheet('Income');
      const expensesSheet = workbook.getWorksheet('Expenses');

      const incomeData = [];
      incomeSheet?.eachRow((row, rowIndex) => {
        if (rowIndex !== 1) {
          incomeData.push(row.values.map(formatExcelDate)); // Convert dates
        }
      });

      const expenseData = [];
      expensesSheet?.eachRow((row, rowIndex) => {
        if (rowIndex !== 1) {
          expenseData.push(row.values.map(formatExcelDate)); // Convert dates
        }
      });

      budgetStore.setIncomeData(incomeData);
      budgetStore.setExpenseData(expenseData);
    } catch (error) {
      console.error('Error processing Excel file:', error);
    }
  };
};

// Function to remove uploaded file and clear budget data
const removeBudget = () => {
  uploadedFile.value = null;
  budgetUploaded.value = false;
  budgetStore.setIncomeData([]); // Clear income table data
  budgetStore.setExpenseData([]); // Clear expense table data
};
</script>

<template>
  <v-app :theme="ThemeStore.theme">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="displayDrawer = !displayDrawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Budget App</v-app-bar-title>

      <!-- Upload Menu -->
      <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" :color="budgetUploaded ? 'green' : 'primary'">
            <v-icon left>{{ budgetUploaded ? 'mdi-check' : 'mdi-upload' }}</v-icon>
            {{ budgetUploaded ? 'Uploaded' : 'Upload Spreadsheet' }}
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <!-- File Upload Input -->
            <v-list-item>
              <v-file-input
                label="Select Excel File"
                @change="loadBudget"
                accept=".xlsx"
                clearable
              ></v-file-input>
            </v-list-item>

            <!-- Success Message & Remove Button -->
            <v-list-item v-if="budgetUploaded">
              <v-alert type="success" dense class="checkedinput">
                File uploaded: {{ uploadedFile?.name }}
                <v-btn icon @click="removeBudget">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-alert>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- Theme Toggle Button -->
      <v-btn class="headerButton themebtn" @click="ThemeStore.toggleTheme()">
        <v-icon>{{
          ThemeStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        }}</v-icon>
        <span class="text">{{ ThemeStore.theme === 'light' ? 'Light' : 'Dark' }}</span>
      </v-btn>
    </v-app-bar>

    <!-- NAVIGATION BAR -->
    <v-navigation-drawer v-model="displayDrawer" expand-on-hover>
      <div class="parent">
        <v-list>
          <v-list-item prepend-icon="mdi-home" to="/">Home</v-list-item>
          <v-list-item prepend-icon="mdi-cash-multiple" to="/NewBook">New Budget Book</v-list-item>
          <v-list-item prepend-icon="mdi-book" to="/about">About</v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.checkedinput {
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
</style>
