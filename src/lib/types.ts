export type User = {
  nik: string;
  name?: string;
};

export type Transaction = User & {
  id: string;
  quantity: number;
};

export type AddTransactionArgs = Omit<Transaction, "id">;
export type EditTransactionArgs = Omit<Transaction, "nik">;
