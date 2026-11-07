import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { XIcon } from "@phosphor-icons/react";
import { errorMessage } from "../../lib/api/client";
import { formatMoney } from "../../lib/money";
import { Field, FormError, SubmitButton } from "../auth/formParts";
import { useCreateStationOrder } from "./hooks";
import type { StationOrderPricing } from "./types";

// Parses a decimal money string to pesewas with integer math only.
function toMinorUnits(value: string): number {
  const [whole, fraction = ""] = value.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

const schema = z
  .object({
    customerPhone: z.string().trim().min(1, "Enter the customer's phone number"),
    customerName: z.string().trim().optional(),
    size: z.enum(["small", "medium", "large"]),
    fill: z.enum(["full", "amount"]),
    gasAmount: z.string().trim().optional(),
    cylinderCount: z.coerce.number().int().min(1).max(10),
    label: z.string().trim().min(1, "Enter the delivery address").max(200),
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180),
    riderInstructions: z.string().trim().optional(),
  })
  .refine((v) => v.fill === "full" || /^\d+(\.\d{1,2})?$/.test(v.gasAmount ?? ""), {
    path: ["gasAmount"],
    message: "Enter an amount, for example 120 or 120.50",
  });

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export default function NewStationOrderDialog({ onClose }: { onClose: () => void }) {
  const create = useCreateStationOrder();
  const [pricing, setPricing] = useState<StationOrderPricing | null>(null);
  const { register, handleSubmit, control, formState } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { size: "small", fill: "full", cylinderCount: 1 },
  });
  const { errors } = formState;
  const fill = useWatch({ control, name: "fill" });

  function onSubmit(v: FormValues) {
    create.mutate(
      {
        customerPhone: v.customerPhone,
        customerName: v.customerName || undefined,
        size: v.size,
        ...(v.fill === "full" ? { fullFill: true as const } : { gasAmount: toMinorUnits(v.gasAmount ?? "") }),
        cylinderCount: v.cylinderCount,
        deliveryAddress: { label: v.label, lat: v.lat, lng: v.lng },
        riderInstructions: v.riderInstructions || undefined,
      },
      { onSuccess: (r) => setPricing(r.pricing) },
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div role="dialog" aria-modal="true" aria-label="New Order" className="w-full max-w-lg max-h-full overflow-y-auto bg-surface rounded-card border border-border">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="font-semibold">New Order</p>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-ink">
            <XIcon size={18} />
          </button>
        </div>

        {pricing ? (
          <div className="p-5 space-y-3 text-sm">
            <p className="font-semibold">Order created. Cash on delivery.</p>
            {(
              [
                ["Gas", pricing.gasTotal],
                ["Delivery fee", pricing.distanceFee],
                ["Service fee", pricing.serviceFee],
                ["Tip", pricing.tip],
                ["Total", pricing.total],
              ] as const
            ).map(([label, amount]) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted">{label}</span>
                <span className="font-medium">{formatMoney(amount, pricing.currency)}</span>
              </div>
            ))}
            <button onClick={onClose} className="w-full py-3 rounded-button bg-accent text-white text-sm font-semibold">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4" noValidate>
            <Field label="Customer phone" error={errors.customerPhone?.message}>
              <input {...register("customerPhone")} type="tel" className="input" />
            </Field>
            <Field label="Customer name (optional)" error={errors.customerName?.message}>
              <input {...register("customerName")} className="input" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Size">
                <select {...register("size")} className="input">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </Field>
              <Field label="Cylinders" error={errors.cylinderCount?.message}>
                <input {...register("cylinderCount")} type="number" min={1} max={10} className="input" />
              </Field>
              <Field label="Fill">
                <select {...register("fill")} className="input">
                  <option value="full">Full fill</option>
                  <option value="amount">Amount</option>
                </select>
              </Field>
              {fill === "amount" && (
                <Field label="Amount per cylinder (GHS)" error={errors.gasAmount?.message}>
                  <input {...register("gasAmount")} inputMode="decimal" className="input" />
                </Field>
              )}
            </div>
            <Field label="Delivery address" error={errors.label?.message}>
              <input {...register("label")} className="input" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Latitude" error={errors.lat?.message}>
                <input {...register("lat")} inputMode="decimal" className="input" />
              </Field>
              <Field label="Longitude" error={errors.lng?.message}>
                <input {...register("lng")} inputMode="decimal" className="input" />
              </Field>
            </div>
            <Field label="Rider instructions (optional)" error={errors.riderInstructions?.message}>
              <input {...register("riderInstructions")} className="input" />
            </Field>
            {create.error && <FormError message={errorMessage(create.error)} />}
            <SubmitButton pending={create.isPending}>Create order</SubmitButton>
          </form>
        )}
      </div>
    </div>
  );
}
