import { nanoid } from "nanoid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  AddTransactionArgs,
  EditTransactionArgs,
  Transaction,
} from "@/lib/types";

type TransactionStore = {
  transactions: Transaction[];
};

type TransactionActions = {
  actions: {
    addTransaction: (args: AddTransactionArgs) => void;
    editTransaction: (args: EditTransactionArgs) => void;
    deleteTransaction: (id: Transaction["id"]) => void;
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
            transactions: [
              ...state.transactions,
              { id: nanoid(7), nik, name, quantity },
            ],
          })),
        editTransaction: ({ id, name, quantity }) =>
          set((state) => ({
            transactions: state.transactions.map((transaction) => {
              if (transaction.id === id) {
                return {
                  ...transaction,
                  id,
                  name,
                  quantity,
                };
              }

              return transaction;
            }),
          })),
        deleteTransaction: (id) =>
          set((state) => ({
            transactions: state.transactions.filter(
              (transaction) => transaction.id !== id,
            ),
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
