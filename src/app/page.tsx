import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-md flex-col p-10">
      <section className="flex items-center justify-end">
        <AddTransactionDrawer />
      </section>
    </main>
  );
}
