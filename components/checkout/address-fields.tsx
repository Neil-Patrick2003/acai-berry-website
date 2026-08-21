"use client";

import { useEffect, useState } from "react";
import type { Customer } from "@/lib/order";

type GeoOption = { id: string; name: string; postcode?: number | null };

async function loadGeo(level: string, parent?: string) {
  const params = new URLSearchParams({ level });
  if (parent) params.set("parent", parent);
  const response = await fetch(`/api/geo?${params.toString()}`);
  const payload: { data?: GeoOption[] } = await response
    .json()
    .catch(() => ({}));
  return payload.data ?? [];
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-brand-700">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-xs text-ink-soft">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs font-semibold text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function selectClass(error?: string) {
  return `w-full appearance-none rounded-2xl border-2 bg-white/70 px-4 py-3 text-sm text-brand-700 focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
    error ? "border-red-500" : "border-brand-700/40 focus:border-brand-600"
  }`;
}

export function AddressFields({
  values,
  errors,
  onChange,
}: {
  values: Customer;
  errors: Partial<Record<keyof Customer, string>>;
  onChange: (patch: Partial<Customer>) => void;
}) {
  const [provinces, setProvinces] = useState<GeoOption[]>([]);
  const [cities, setCities] = useState<GeoOption[]>([]);
  const [barangays, setBarangays] = useState<GeoOption[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGeo("provinces")
      .then((data) => {
        if (cancelled) return;
        setProvinces(data);
        if (data.length === 0) setLoadFailed(true);
      })
      .catch(() => !cancelled && setLoadFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  /* Cities depend on the chosen province; barangays on the chosen city. */
  useEffect(() => {
    if (!values.provinceId) return;
    let cancelled = false;
    loadGeo("districts", values.provinceId).then(
      (data) => !cancelled && setCities(data),
    );
    return () => {
      cancelled = true;
    };
  }, [values.provinceId]);

  useEffect(() => {
    if (!values.cityId) return;
    let cancelled = false;
    loadGeo("communes", values.cityId).then(
      (data) => !cancelled && setBarangays(data),
    );
    return () => {
      cancelled = true;
    };
  }, [values.cityId]);

  return (
    <>
      <Field
        id="street"
        label="House / unit no. and street"
        hint="e.g. 24 Mabini Street, Blk 7 Lot 12"
        error={errors.street}
      >
        <input
          id="street"
          name="street"
          type="text"
          autoComplete="address-line1"
          placeholder="24 Mabini Street"
          value={values.street}
          aria-invalid={errors.street ? true : undefined}
          onChange={(event) => onChange({ street: event.target.value })}
          className={selectClass(errors.street)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="provinceId" label="Province" error={errors.provinceId}>
          <select
            id="provinceId"
            name="provinceId"
            value={values.provinceId}
            aria-invalid={errors.provinceId ? true : undefined}
            onChange={(event) => {
              const option = provinces.find((p) => p.id === event.target.value);
              // Changing a parent invalidates everything below it.
              setCities([]);
              setBarangays([]);
              onChange({
                provinceId: option?.id ?? "",
                provinceName: option?.name ?? "",
                cityId: "",
                cityName: "",
                barangayId: "",
                barangayName: "",
                postcode: "",
              });
            }}
            className={selectClass(errors.provinceId)}
          >
            <option value="">
              {loadFailed ? "Could not load provinces" : "Select province"}
            </option>
            {provinces.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="cityId"
          label="City / Municipality"
          error={errors.cityId}
        >
          <select
            id="cityId"
            name="cityId"
            value={values.cityId}
            disabled={!values.provinceId}
            aria-invalid={errors.cityId ? true : undefined}
            onChange={(event) => {
              const option = cities.find((c) => c.id === event.target.value);
              setBarangays([]);
              onChange({
                cityId: option?.id ?? "",
                cityName: option?.name ?? "",
                barangayId: "",
                barangayName: "",
                // Districts carry a postcode — captured for the courier, not asked for.
                postcode: option?.postcode ? String(option.postcode) : "",
              });
            }}
            className={selectClass(errors.cityId)}
          >
            <option value="">
              {values.provinceId ? "Select city" : "Choose a province first"}
            </option>
            {cities.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="barangayId"
          label="Barangay"
          error={errors.barangayId}
        >
          <select
            id="barangayId"
            name="barangayId"
            value={values.barangayId}
            disabled={!values.cityId}
            aria-invalid={errors.barangayId ? true : undefined}
            onChange={(event) => {
              const option = barangays.find((b) => b.id === event.target.value);
              onChange({
                barangayId: option?.id ?? "",
                barangayName: option?.name ?? "",
              });
            }}
            className={selectClass(errors.barangayId)}
          >
            <option value="">
              {values.cityId ? "Select barangay" : "Choose a city first"}
            </option>
            {barangays.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </Field>

      </div>

      <Field
        id="landmark"
        label="Landmark"
        hint="Anything that helps the rider find you."
        error={errors.landmark}
      >
        <textarea
          id="landmark"
          name="landmark"
          rows={2}
          placeholder="Beside the covered court, green gate"
          value={values.landmark}
          aria-invalid={errors.landmark ? true : undefined}
          onChange={(event) => onChange({ landmark: event.target.value })}
          className={selectClass(errors.landmark)}
        />
      </Field>
    </>
  );
}
