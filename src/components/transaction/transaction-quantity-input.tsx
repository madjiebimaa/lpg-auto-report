"use client";

import { Minus, Plus } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantityInputProps {
  form: UseFormReturn<
    {
      nik: string;
      quantity: number;
      name?: string | undefined;
    },
    any,
    undefined
  >;
  field: ControllerRenderProps<
    {
      nik: string;
      quantity: number;
      name?: string | undefined;
    },
    "quantity"
  >;
}

export default function TransactionQuantityInput({
  form,
  field,
}: QuantityInputProps) {
  const quantity = Number(form.getValues("quantity"));

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      form.setValue("quantity", quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    form.setValue("quantity", quantity + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        className="shrink-0"
        onClick={handleDecreaseQuantity}
        disabled={quantity <= 1}
      >
        <Minus className="size-4 shrink-0" />
      </Button>
      <Input
        {...field}
        type="number"
        required
        className="w-[50px] text-center"
      />
      <Button
        type="button"
        size="icon"
        className="shrink-0"
        onClick={handleIncreaseQuantity}
      >
        <Plus className="size-4 shrink-0" />
      </Button>
    </div>
  );
}
