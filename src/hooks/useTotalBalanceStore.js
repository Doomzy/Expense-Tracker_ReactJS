import { create } from "zustand";
import { db } from "../firebase/firebase.js";

import { collection, query, where, getDocs } from "firebase/firestore";

const useTotalBalanceStore = create((set, getState) => ({
  totalBalance: 0,
  totalIncome: 0,
  totalExpense: 0,
  period: { value: "Year", start: "", end: "" },

  fetchTotalBalance: async (uid) => {
    const transactionsRef = collection(db, "transactions");
    getState().period.start == "" && getState().setPeriod();
    const tbQuery = query(
      transactionsRef,
      where("uid", "==", uid),
      where("datetime", ">=", getState().period.start),
      where("datetime", "<=", getState().period.end)
    );
    let expense = 0,
      income = 0,
      total = 0;
    const snapshot = await getDocs(tbQuery);

    snapshot.docs.forEach((transaction) => {
      const amount = transaction.data().amount;
      total += amount;
      amount > 0 ? (income += amount) : (expense += amount);
    });
    set({ totalBalance: total, totalIncome: income, totalExpense: expense });
  },

  addToBalance: (transactionDate, amount) => {
    transactionDate = new Date(transactionDate);
    amount = parseInt(amount);
    if (
      transactionDate >= new Date(getState().period.start) &&
      transactionDate <= new Date(getState().period.end)
    ) {
      set((state) => ({
        totalBalance: +state.totalBalance + amount,
        totalExpense:
          amount < 0 ? +state.totalExpense + amount : state.totalExpense,
        totalIncome:
          amount > 0 ? +state.totalIncome + amount : state.totalIncome,
      }));
    }
  },

  setPeriod: (newValue) => {
    const currentMonth = new Date().getUTCMonth();

    const start = new Date();
    start.setUTCFullYear(start.getUTCFullYear(), 0, 1);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date();
    end.setUTCFullYear(end.getUTCFullYear(), 11, 31);
    end.setUTCHours(23, 59, 59, 999);

    switch (newValue) {
      case "Month":
        start.setUTCMonth(currentMonth);
        end.setUTCMonth(currentMonth);
        break;
      case "Quarter":
        var quarter = Math.floor(currentMonth / 3) + 1;
        start.setUTCMonth(quarter * 2);
        end.setUTCMonth(start.getUTCMonth() + 3);
        break;
    }
    set({ period: { value: newValue, start: start, end: end } });
  },
}));

export default useTotalBalanceStore;
