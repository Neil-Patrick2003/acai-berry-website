"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckDiscIcon } from "@/components/icons";
import { formatPeso, useCart, type CartLine } from "@/components/cart/cart-context";

type Customer = {
  fullName: string;
  phone: string;
  address: string;
  landmark: string;
};

type PlacedOrder = {
  reference: string;
  placedAt: string;
  customer: Customer;
  paymentMethod: "cash-on-delivery";
  items: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

const EMPTY: Customer = { fullName: "", phone: "", address: "", landmark: "" };

const FIELDS = [
  {
    name: "fullName" as const,
    label: "Full name",
    placeholder: "Juan Dela Cruz",
    autoComplete: "name",
    hint: "First and last name, as it should appear on the parcel.",
  },
  {
    name: "phone" as const,
    label: "Phone number",
    placeholder: "0917 123 4567",
    autoComplete: "tel",
    inputMode: "tel" as const,
    hint: "Our courier will text or call this number before delivery.",
  },
  {
    name: "address" as const,
    label: "Complete address",
    placeholder: "House / unit no., street, barangay, city, province, ZIP",
    autoComplete: "street-address",
    multiline: true,
    hint: "Include house or unit number, street, barangay, city, province and ZIP.",
  },
  {
    name: "landmark" as const,
    label: "Landmark",
    placeholder: "Beside the covered court, green gate",
    multiline: true,
    hint: "Anything that helps the rider find you.",
  },
];

/** Accepts 09XXXXXXXXX, +639XXXXXXXXX and the same with spaces or dashes. */
function validate(values: Customer) {
  const errors: Partial<Record<keyof Customer, string>> = {};
  if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  const digits = values.phone.replace(/[^\d+]/g, "");
  if (!/^(\+?63|0)9\d{9}$/.test(digits)) {
    errors.phone = "Enter a valid mobile number, e.g. 0917 123 4567.";
  }
  if (values.address.trim().length < 12) {
    errors.address = "Please give the complete delivery address.";
  }
  if (values.landmark.trim().length < 3) {
    errors.landmark = "Please add a nearby landmark.";
  }
  return errors;
}

function OrderLines({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="divide-y divide-brand-700/10">
      {lines.map((line) => (
        <li key={line.id} className="flex items-center gap-3 py-3">
          {line.image && (
            <Image
              src={line.image}
              alt=""
              width={96}
              height={96}
              sizes="56px"
              className="size-14 shrink-0 rounded-xl object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-brand-700">{line.name}</p>
            {line.meta && (
              <p className="text-xs text-ink-soft">{line.meta}</p>
            )}
            <p className="text-xs text-ink-soft">
              {formatPeso(line.price)} × {line.quantity}
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-brand-600">
            {formatPeso(line.price * line.quantity)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Totals({ subtotal }: { subtotal: number }) {
  return (
    <dl className="mt-3 space-y-1.5 border-t border-brand-700/15 pt-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-ink-soft">Subtotal</dt>
        <dd className="font-semibold text-brand-700">{formatPeso(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-ink-soft">Shipping</dt>
        <dd className="font-semibold text-brand-700">Free nationwide</dd>
      </div>
      <div className="flex justify-between border-t border-brand-700/15 pt-2 text-base">
        <dt className="font-bold text-brand-700">Total to pay on delivery</dt>
        <dd className="text-xl font-extrabold text-brand-600">
          {formatPeso(subtotal)}
        </dd>
      </div>
    </dl>
  );
}

export function CheckoutForm() {
  const { lines, subtotal, hydrated, clear } = useCart();
  const [values, setValues] = useState<Customer>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  /* ---- Thank you ------------------------------------------------------- */
  if (order) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <CheckDiscIcon className="mx-auto size-16 text-brand-600" />
        <h1 className="mt-5 font-display text-3xl font-bold text-brand-700 sm:text-4xl">
          Thank you, {order.customer.fullName.split(" ")[0]}!
        </h1>
        <p className="mt-3 text-ink-soft">
          Your order is placed. We will text{" "}
          <span className="font-semibold text-brand-700">
            {order.customer.phone}
          </span>{" "}
          before the rider arrives. Please prepare{" "}
          <span className="font-semibold text-brand-700">
            {formatPeso(order.total)}
          </span>{" "}
          in cash.
        </p>

        <div className="mt-8 rounded-3xl bg-lilac/60 p-5 text-left sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-sans text-sm font-extrabold tracking-wide text-brand-700 uppercase">
              Order summary
            </h2>
            <p className="font-mono text-xs text-ink-soft">{order.reference}</p>
          </div>

          <ul className="mt-3 divide-y divide-brand-700/10">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 py-2 text-sm">
                <span className="text-brand-700">
                  {item.name}{" "}
                  <span className="text-ink-soft">× {item.quantity}</span>
                </span>
                <span className="shrink-0 font-bold text-brand-600">
                  {formatPeso(item.lineTotal)}
                </span>
              </li>
            ))}
          </ul>

          <Totals subtotal={order.subtotal} />

          <h2 className="mt-6 font-sans text-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Delivering to
          </h2>
          <address className="mt-2 text-sm not-italic text-ink-soft">
            <span className="font-semibold text-brand-700">
              {order.customer.fullName}
            </span>
            <br />
            {order.customer.address}
            <br />
            <span className="text-xs">Landmark: {order.customer.landmark}</span>
            <br />
            {order.customer.phone}
          </address>

          <p className="mt-4 text-xs text-ink-soft">
            Payment method: Cash on delivery
          </p>
        </div>

        <Link
          href="/products"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-600 px-8 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  /* ---- Empty cart ------------------------------------------------------ */
  if (hydrated && lines.length === 0) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl font-bold text-brand-700">
          Your cart is empty
        </h1>
        <p className="mt-3 text-ink-soft">
          Add a bundle first and it will show up here.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand-600 px-8 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
        >
          Shop the range
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-700 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Cash on delivery only — pay the rider when your parcel arrives.
        </p>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            const found = validate(values);
            setErrors(found);
            if (Object.keys(found).length > 0) {
              const first = document.getElementById(Object.keys(found)[0]);
              first?.focus();
              return;
            }

            const placed: PlacedOrder = {
              reference: `BEYOU-${Date.now().toString(36).toUpperCase()}`,
              placedAt: new Date().toISOString(),
              customer: {
                fullName: values.fullName.trim(),
                phone: values.phone.trim(),
                address: values.address.trim(),
                landmark: values.landmark.trim(),
              },
              paymentMethod: "cash-on-delivery",
              items: lines.map((line) => ({
                id: line.id,
                name: line.name,
                quantity: line.quantity,
                unitPrice: line.price,
                lineTotal: line.price * line.quantity,
              })),
              subtotal,
              shippingFee: 0,
              total: subtotal,
            };

            // No backend yet — the order is logged for inspection.
            console.log("[checkout] order placed", placed);

            setOrder(placed);
            clear();
          }}
          className="mt-8"
        >
          <h2 className="font-sans text-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Delivery details
          </h2>

          <div className="mt-4 flex flex-col gap-5">
            {FIELDS.map((field) => {
              const error = errors[field.name];
              const describedBy = `${field.name}-hint${error ? ` ${field.name}-error` : ""}`;
              const shared = {
                id: field.name,
                name: field.name,
                value: values[field.name],
                placeholder: field.placeholder,
                autoComplete: field.autoComplete,
                "aria-invalid": error ? true : undefined,
                "aria-describedby": describedBy,
                onChange: (
                  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                ) => setValues((v) => ({ ...v, [field.name]: event.target.value })),
                className: `w-full rounded-2xl border-2 bg-white/70 px-4 py-3 text-sm text-brand-700 placeholder:text-ink-soft/60 focus:bg-white focus:outline-none ${
                  error ? "border-red-500" : "border-brand-700/40 focus:border-brand-600"
                }`,
              };

              return (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-bold text-brand-700"
                  >
                    {field.label}
                  </label>
                  <p id={`${field.name}-hint`} className="mt-0.5 text-xs text-ink-soft">
                    {field.hint}
                  </p>
                  <div className="mt-2">
                    {field.multiline ? (
                      <textarea {...shared} rows={3} />
                    ) : (
                      <input {...shared} type="text" inputMode={field.inputMode} />
                    )}
                  </div>
                  {error && (
                    <p
                      id={`${field.name}-error`}
                      role="alert"
                      className="mt-1.5 text-xs font-semibold text-red-600"
                    >
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <h2 className="mt-9 font-sans text-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Payment
          </h2>
          <div className="mt-3 flex items-start gap-3 rounded-2xl border-2 border-brand-600 bg-lilac/40 p-4">
            <input
              id="payment-cod"
              type="radio"
              name="payment"
              value="cod"
              defaultChecked
              readOnly
              className="mt-0.5 size-5 shrink-0 accent-brand-600"
            />
            <label htmlFor="payment-cod" className="cursor-pointer">
              <span className="block text-sm font-bold text-brand-700">
                Cash on delivery
              </span>
              <span className="mt-0.5 block text-xs text-ink-soft">
                The only method available right now. Pay the rider in cash when
                your parcel arrives.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-700"
          >
            Place order
          </button>
        </form>
      </div>

      {/* Order summary */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-3xl bg-lilac/60 p-5 sm:p-6">
          <h2 className="font-sans text-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Order summary
          </h2>
          <OrderLines lines={lines} />
          <Totals subtotal={subtotal} />
        </div>
      </aside>
    </div>
  );
}
