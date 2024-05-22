"use client";

import { useState } from "react";

import TransactionForm from "@/components/transaction/transaction-form";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Transaction } from "@/lib/types";

interface EditTransactionDrawerProps {
  transaction?: Transaction;
  drawerTrigger: React.ReactNode;
}

export default function TransactionDrawer({
  transaction,
  drawerTrigger,
}: EditTransactionDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>
      <DrawerContent className="mx-auto max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-center">Transaksi Baru</DrawerTitle>
        </DrawerHeader>
        <TransactionForm transaction={transaction} setOpen={setOpen} className="px-4" />
      </DrawerContent>
    </Drawer>
  );
}
