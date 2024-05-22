"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
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
import { useTransactionActions } from "@/store/transaction";

const FormSchema = z.object({
  nik: z.string().length(16),
  name: z.string().optional(),
  quantity: z.preprocess((quantity) => Number(quantity), z.number()).default(1),
});

export default function AddTransactionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nik: "",
      name: "",
      quantity: 1,
    },
  });

  const autoFocusRef = useRef<React.ElementRef<typeof Input>>(null);
  const transactionActions = useTransactionActions();

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const { nik, name, quantity } = values;
    transactionActions.addTransaction({ nik, name, quantity });

    form.reset();

    if (autoFocusRef.current) {
      autoFocusRef.current.focus();
    }
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
        className="flex flex-col gap-4 px-4"
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
                    required
                    autoFocus
                    autoComplete="off"
                    minLength={16}
                    maxLength={16}
                    placeholder="NIK"
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
                    autoComplete="off"
                    placeholder="Nama Lengkap"
                  />
                  <span className="text-muted-foreground absolute -top-3 right-3 bg-white p-1 text-xs font-medium">
                    optional
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isValid}>
          OK
        </Button>
      </form>
    </Form>
  );
}
