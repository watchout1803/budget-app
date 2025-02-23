import { defineStore } from 'pinia';

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgetData: []
  }),
  actions: {
    setBudgetData(data: any[]) {
      this.budgetData = data;
    },
    clearBudgetData() {
      this.budgetData = [];
    }
  }
});
