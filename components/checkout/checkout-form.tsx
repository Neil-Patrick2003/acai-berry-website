"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckDiscIcon, MinusIcon, PlusIcon } from "@/components/icons";
import {
  clearCart,
  removeFromCart,
  resolveCart,
  setQuantity,
  useCartLines,
  useHydrated,
  type CartItem,
} from "@/lib/cart";
import type { Product } from "@/lib/products";
import {
  EMPTY_CUSTOMER,
  PH_DIAL_CODE,
  buildFullAddress,
  formatPhone,
  normalisePhone,
  validateCustomer,
  type Customer,
  type OrderPayload,
} from "@/lib/order";
import { AddressFields } from "@/components/checkout/address-fields";

const peso = new Intl.NumberFormat("en-PH");
const formatPeso = (amount: number) => `₱${peso.format(amount)}`;

/**
 * The basket, or the single bundle behind a buy-now link. Only a basket is
 * editable — a ?product= link has nothing stored to edit.
 */
function OrderLines({
  items,
  editable,
}: {
  items: CartItem[];
  editable: boolean;
}) {
  return (
    <ul className="divide-y divide-brand-700/10">
      {items.map(({ product, quantity }) => (
        <li key={product.slug} className="flex items-center gap-3 py-3">
          <Image
            src={product.image}
            alt=""
            width={96}
            height={96}
            sizes="56px"
            className="size-14 shrink-0 rounded-xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="text-body-sm font-bold text-brand-700">
              {product.name}
            </p>
            <p className="text-meta text-ink-soft">{product.contents}</p>

            {editable ? (
              <div className="mt-1.5 flex items-center gap-2">
                <QuantityStep
                  label={`Remove one ${product.name}`}
                  onClick={() => setQuantity(product.slug, quantity - 1)}
                >
                  <MinusIcon className="size-3.5" />
                </QuantityStep>
                <span className="min-w-4 text-center text-meta font-bold text-brand-700">
                  {quantity}
                </span>
                <QuantityStep
                  label={`Add one ${product.name}`}
                  onClick={() => setQuantity(product.slug, quantity + 1)}
                >
                  <PlusIcon className="size-3.5" />
                </QuantityStep>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.slug)}
                  className="ml-1 text-meta text-ink-soft underline underline-offset-2 transition-colors hover:text-brand-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-meta text-ink-soft">Quantity: {quantity}</p>
            )}
          </div>

          <p className="shrink-0 text-body-sm font-bold text-brand-600">
            {formatPeso(product.price * quantity)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function QuantityStep({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-6 place-items-center rounded-full border border-brand-700/35 text-brand-700 transition-colors hover:border-brand-600 hover:bg-brand-600/10"
    >
      {children}
    </button>
  );
}

function Totals({ subtotal }: { subtotal: number }) {
  return (
    <dl className="mt-3 space-y-1.5 border-t border-brand-700/15 pt-3 text-body-sm">
      <div className="flex justify-between">
        <dt className="text-ink-soft">Subtotal</dt>
        <dd className="font-semibold text-brand-700">{formatPeso(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-ink-soft">Shipping</dt>
        <dd className="font-semibold text-brand-700">Free nationwide</dd>
      </div>
      <div className="flex justify-between border-t border-brand-700/15 pt-2 text-body">
        <dt className="font-bold text-brand-700">Total to pay on delivery</dt>
        <dd className="text-h3 font-extrabold text-brand-600">
          {formatPeso(subtotal)}
        </dd>
      </div>
    </dl>
  );
}

export function CheckoutForm({ product }: { product: Product | null }) {
  const hydrated = useHydrated();
  const cart = resolveCart(useCartLines());

  /* A ?product= link is a straight buy-now: it shows that bundle alone and
     leaves whatever is in the basket untouched. */
  const fromCart = product === null;
  const items: CartItem[] = product ? [{ product, quantity: 1 }] : cart;
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const [values, setValues] = useState<Customer>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [order, setOrder] = useState<OrderPayload | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ---- Thank you ------------------------------------------------------- */
  if (order) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <CheckDiscIcon className="mx-auto size-16 text-brand-600" />
        <h1 className="mt-5 font-display text-h1 font-bold text-brand-700">
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
            <h2 className="font-sans text-body-sm font-extrabold tracking-wide text-brand-700 uppercase">
              Order summary
            </h2>
            <p className="font-mono text-meta text-ink-soft">{order.reference}</p>
          </div>

          <ul className="mt-3 divide-y divide-brand-700/10">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 py-2 text-body-sm">
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

          <h2 className="mt-6 font-sans text-body-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Delivering to
          </h2>
          <address className="mt-2 text-body-sm not-italic text-ink-soft">
            <span className="font-semibold text-brand-700">
              {order.customer.fullName}
            </span>
            <br />
            {buildFullAddress(order.customer)}
            <br />
            <span className="text-meta">Landmark: {order.customer.landmark}</span>
            <br />
            {formatPhone(order.customer.phone)}
          </address>

          <p className="mt-4 text-meta text-ink-soft">
            Payment method: Cash on delivery
          </p>
        </div>

        <Link
          href="/products"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-600 px-8 text-btn font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  /* ---- Nothing chosen -------------------------------------------------- */
  if (items.length === 0) {
    // The cart is unreadable until React takes over, and an empty-basket
    // message that flashes and vanishes is worse than a beat of nothing.
    if (!hydrated) return <div className="min-h-[50vh]" aria-hidden="true" />;

    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-h1 font-bold text-brand-700">
          Your cart is empty
        </h1>
        <p className="mt-3 text-ink-soft">
          Pick the bundle you want and we will bring you straight back here.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand-600 px-8 text-btn font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-700"
        >
          Shop the range
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
      <div>
        <h1 className="font-display text-h1 font-bold text-brand-700">
          Checkout
        </h1>
        <p className="mt-2 text-body-sm text-ink-soft">
          Cash on delivery only — pay the rider when your parcel arrives.
        </p>

        <form
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();
            if (submitting) return;

            const found = validateCustomer(values);
            setErrors(found);
            if (Object.keys(found).length > 0) {
              document.getElementById(Object.keys(found)[0])?.focus();
              return;
            }

            const payload: OrderPayload = {
              reference: `BEYOU-${Date.now().toString(36).toUpperCase()}`,
              placedAt: new Date().toISOString(),
              customer: {
                ...values,
                fullName: values.fullName.trim(),
                street: values.street.trim(),
                landmark: values.landmark.trim(),
              },
              paymentMethod: "cash-on-delivery",
              items: items.map(({ product: item, quantity }) => ({
                id: item.slug,
                name: item.name,
                quantity,
                unitPrice: item.price,
                lineTotal: item.price * quantity,
              })),
              subtotal,
              shippingFee: 0,
              total: subtotal,
            };

            setSubmitting(true);
            setSubmitError(null);
            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              const result: { ok?: boolean; errors?: string[] } = await response
                .json()
                .catch(() => ({}));

              if (!response.ok || !result.ok) {
                setSubmitError(
                  result.errors?.[0] ??
                    "We could not place your order. Please try again.",
                );
                return;
              }

              // The order is away; the basket that produced it is spent.
              if (fromCart) clearCart();
              setOrder(payload);
            } catch {
              setSubmitError(
                "You appear to be offline. Check your connection and try again.",
              );
            } finally {
              setSubmitting(false);
            }
          }}
          className="mt-8"
        >
          <h2 className="font-sans text-body-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Delivery details
          </h2>

          <div className="mt-4 flex flex-col gap-5">
            <div>
              <label htmlFor="fullName" className="block text-body-sm font-bold text-brand-700">
                Full name
              </label>
              <p id="fullName-hint" className="mt-0.5 text-meta text-ink-soft">
                First and last name, as it should appear on the parcel.
              </p>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Juan Dela Cruz"
                value={values.fullName}
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={`fullName-hint${errors.fullName ? " fullName-error" : ""}`}
                onChange={(event) =>
                  setValues((v) => ({ ...v, fullName: event.target.value }))
                }
                className={`mt-2 w-full rounded-2xl border-2 bg-white/70 px-4 py-3 text-body-sm text-brand-700 placeholder:text-ink-soft/60 focus:bg-white focus:outline-none ${
                  errors.fullName ? "border-red-500" : "border-brand-700/40 focus:border-brand-600"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" role="alert" className="mt-1.5 text-meta font-semibold text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-body-sm font-bold text-brand-700">
                Mobile number
              </label>
              <p id="phone-hint" className="mt-0.5 text-meta text-ink-soft">
                Philippine mobile number — the rider will text or call before delivery.
              </p>
              <div
                className={`mt-2 flex items-stretch overflow-hidden rounded-2xl border-2 bg-white/70 focus-within:bg-white ${
                  errors.phone ? "border-red-500" : "border-brand-700/40 focus-within:border-brand-600"
                }`}
              >
                <span className="flex shrink-0 items-center gap-1.5 border-r-2 border-brand-700/20 px-4 text-body-sm font-bold text-brand-700">
                  <span aria-hidden="true">🇵🇭</span>
                  {PH_DIAL_CODE}
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={13}
                  placeholder="917 123 4567"
                  value={values.phone}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={`phone-hint${errors.phone ? " phone-error" : ""}`}
                  onChange={(event) =>
                    setValues((v) => ({
                      ...v,
                      // Paste of 0917…, +63917… or 917… all end up as the national number.
                      phone: normalisePhone(event.target.value).slice(0, 10),
                    }))
                  }
                  className="w-full bg-transparent px-4 py-3 text-body-sm text-brand-700 placeholder:text-ink-soft/60 focus:outline-none"
                />
              </div>
              {errors.phone ? (
                <p id="phone-error" role="alert" className="mt-1.5 text-meta font-semibold text-red-600">
                  {errors.phone}
                </p>
              ) : (
                values.phone.length === 10 && (
                  <p className="mt-1.5 text-meta text-ink-soft">
                    We will text {formatPhone(values.phone)}
                  </p>
                )
              )}
            </div>

            <AddressFields
              values={values}
              errors={errors}
              onChange={(patch) => setValues((v) => ({ ...v, ...patch }))}
            />
          </div>

          <h2 className="mt-9 font-sans text-body-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Payment
          </h2>
          <div className="mt-3 flex items-start gap-3 rounded-2xl border-2 border-brand-600 bg-lilac/40 p-4">
            <input
              id="payment-cod"
              type="radio"
              name="payment"
              value="cod"
              defaultChecked
              className="mt-0.5 size-5 shrink-0 accent-brand-600"
            />
            <label htmlFor="payment-cod" className="cursor-pointer">
              <span className="block text-body-sm font-bold text-brand-700">
                Cash on delivery
              </span>
              <span className="mt-0.5 block text-meta text-ink-soft">
                The only method available right now. Pay the rider in cash when
                your parcel arrives.
              </span>
            </label>
          </div>

          {submitError && (
            <p
              role="alert"
              className="mt-6 rounded-2xl border-2 border-red-500/60 bg-red-50 px-4 py-3 text-body-sm font-semibold text-red-700"
            >
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-brand-600 text-btn font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>
      </div>

      {/* Order summary */}
      {/* Sticky offset clears the sticky header (lg:h-24 = 6rem) plus a 1.5rem
          gap — at lg:top-6 the summary parked underneath it. */}
      <aside className="lg:sticky lg:top-30 lg:self-start">
        <div className="rounded-3xl bg-lilac/60 p-5 sm:p-6">
          <h2 className="font-sans text-body-sm font-extrabold tracking-wide text-brand-700 uppercase">
            Order summary
          </h2>
          <OrderLines items={items} editable={fromCart} />
          <Totals subtotal={subtotal} />
        </div>
      </aside>
    </div>
  );
}
