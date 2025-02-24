import { defineStore } from 'pinia';

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgetData: [] as any[],
    incomeData: [] as any[],
    expenseData: [] as any[]
  }),
  actions: {
    setBudgetData(data: any[]) {
      this.budgetData = data;
    },
    setIncomeData(data: any[]) {
      this.incomeData = data;
    },
    setExpenseData(data: any[]) {
      this.expenseData = data;
    }
  }
});
