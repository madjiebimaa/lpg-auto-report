import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AddTransactionArgs, Transaction } from "@/lib/types";

type TransactionStore = {
  transactions: Transaction[];
};

type TransactionActions = {
  actions: {
    addTransaction: (args: AddTransactionArgs) => void;
  };
};

const initialState: TransactionStore = {
  transactions: [],
};

const transactionStore = create<TransactionStore & TransactionActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        addTransaction: ({ nik, name, quantity }) =>
          set((state) => ({
            transactions: [...state.transactions, { nik, name, quantity }],
          })),
      },
    }),
    {
      name: "transaction-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    },
  ),
);

export const useTransactions = () =>
  transactionStore((state) => state.transactions);
export const useTransactionActions = () =>
  transactionStore((state) => state.actions);
