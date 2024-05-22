export type User = {
  nik: string;
  name?: string;
};

export type Transaction = User & {
  quantity: number;
};

export type AddTransactionArgs = Transaction;
