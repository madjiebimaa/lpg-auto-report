"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import TransactionQuantityInput from "@/components/transaction/transaction-quantity-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useDevices from "@/hooks/use-devices";
import { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useTransactionActions } from "@/store/transaction";

const FormSchema = z.object({
  nik: z.string().length(16),
  name: z.string().optional(),
  quantity: z.preprocess((quantity) => Number(quantity), z.number()).default(1),
});

interface TransactionFormProps extends React.ComponentPropsWithoutRef<"form"> {
  transaction?: Transaction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransactionForm({
  transaction,
  setOpen,
  className,
  ...props
}: TransactionFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nik: transaction ? transaction.nik : "",
      name: transaction ? transaction.name : "",
      quantity: transaction ? transaction.quantity : 1,
    },
  });

  const autoFocusRef = useRef<React.ElementRef<typeof Input>>(null);
  const transactionActions = useTransactionActions();
  const { isSmallDevice } = useDevices();

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const { nik, name, quantity } = values;

    transaction
      ? transactionActions.editTransaction({
          id: transaction.id,
          name,
          quantity,
        })
      : transactionActions.addTransaction({ nik, name, quantity });

    toast.success(
      transaction
        ? `Transaksi dengan ID: ${transaction.id} berhasil disunting!`
        : "Transaksi baru berhasil ditambahkan!",
      {
        position: isSmallDevice ? "top-center" : "bottom-right",
      },
    );

    form.reset();

    if (autoFocusRef.current) {
      autoFocusRef.current.focus();
    }

    transaction && setOpen(false);
  };

  const handleStricNikLength = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { value, maxLength } = target;

    if (value.length > maxLength) {
      target.value = value.slice(0, maxLength);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      >
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">NIK</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    ref={autoFocusRef}
                    type="number"
                    placeholder="NIK"
                    autoComplete="off"
                    minLength={16}
                    maxLength={16}
                    autoFocus
                    required
                    disabled={Boolean(transaction)}
                    onInput={handleStricNikLength}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <TransactionQuantityInput form={form} field={field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Nama Lengkap</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nama Lengkap"
                    autoComplete="off"
                  />
                  <span className="text-muted-foreground absolute -top-3 right-3 bg-white p-1 text-xs font-medium">
                    optional
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2 pb-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Nanti Saja
          </Button>
          <Button type="submit" disabled={!form.formState.isValid}>
            OK
          </Button>
        </div>
      </form>
    </Form>
  );
}
