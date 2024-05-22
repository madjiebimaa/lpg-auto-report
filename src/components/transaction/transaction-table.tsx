"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

import DataTable from "@/components/global/data-table";
import TransactionDrawer from "@/components/transaction/transaction-drawer";
import { Button } from "@/components/ui/button";

import { Transaction } from "@/lib/types";
import { useTransactionActions, useTransactions } from "@/store/transaction";

export default function TransactionTable() {
  const transactions = useTransactions();
  const transactionActions = useTransactionActions();

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "nik",
      header: "NIK",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original;

        return (
          <div className="flex items-center gap-2">
            <TransactionDrawer
              transaction={transaction}
              drawerTrigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground shrink-0"
                >
                  <Edit className="size-4 shrink-0" />
                </Button>
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground shrink-0"
              onClick={() =>
                transactionActions.deleteTransaction(transaction.id)
              }
            >
              <Trash className="size-4 shrink-0" />
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={transactions} />;
}
