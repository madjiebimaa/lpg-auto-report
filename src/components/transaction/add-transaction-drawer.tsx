import { Plus } from "lucide-react";

import AddTransactionForm from "@/components/transaction/add-transaction-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function AddTransactionDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4 shrink-0" />
          <span>Tambah Transaksi Baru</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-center">Transaksi Baru</DrawerTitle>
        </DrawerHeader>
        <AddTransactionForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Nanti Saja
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
