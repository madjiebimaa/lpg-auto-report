import { Plus } from "lucide-react";

import TransactionDrawer from "@/components/transaction/transaction-drawer";
import TransactionTable from "@/components/transaction/transaction-table";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-md flex-col p-10">
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <TransactionDrawer
            drawerTrigger={
              <Button>
                <Plus className="mr-2 size-4 shrink-0" />
                <span>Tambah Transaksi Baru</span>
              </Button>
            }
          />
        </div>
        <TransactionTable />
      </section>
    </main>
  );
}
