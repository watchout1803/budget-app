<script setup lang="ts">
import { ref } from 'vue';

// Form data for creating a new budget
const newBudget = ref({
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  initialAmount: null
});

const createBudget = () => {
  console.log('New Budget Created:', newBudget.value);
  // You can add further logic to save or process this budget
};
</script>

<template>
  <v-app>

    <!-- Header Bar -->
    <v-container class="text-center py-5">
      <h1>Create a New Budget</h1>
    </v-container>

    <v-main>
      <v-container>
        <h2 class="mb-4">New Budget Details</h2>

        <v-form @submit.prevent="createBudget">
          <v-text-field v-model="newBudget.name" label="Budget Name" required></v-text-field>
          <v-textarea v-model="newBudget.description" label="Description"></v-textarea>
          <v-text-field v-model="newBudget.startDate" label="Start Date" type="date"></v-text-field>
          <v-text-field v-model="newBudget.endDate" label="End Date" type="date"></v-text-field>
          <v-text-field v-model="newBudget.initialAmount" label="Initial Amount ($)" type="number"></v-text-field>

          <v-btn color="primary" type="submit" class="mt-4">Create Budget</v-btn>
        </v-form>
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
