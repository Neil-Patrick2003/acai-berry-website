/**
 * Shared order types and validation.
 *
 * Imported by both the checkout form and the API route, so it must stay free of
 * client-only and server-only imports.
 */

export type Customer = {
  fullName: string;
  /** National number only, 10 digits starting with 9. Stored without +63. */
  phone: string;
  /** House / unit number and street. */
  street: string;
  barangayId: string;
  barangayName: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  /** Derived from the chosen city, not asked for. */
  postcode: string;
  landmark: string;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderPayload = {
  reference: string;
  placedAt: string;
  customer: Customer;
  paymentMethod: "cash-on-delivery";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

export const PH_DIAL_CODE = "+63";

export const EMPTY_CUSTOMER: Customer = {
  fullName: "",
  phone: "",
  street: "",
  barangayId: "",
  barangayName: "",
  cityId: "",
  cityName: "",
  provinceId: "",
  provinceName: "",
  postcode: "",
  landmark: "",
};

/** Strips spaces, dashes and any +63 / 0 prefix down to the 10-digit national number. */
export function normalisePhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("63")) return digits.slice(2);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/** E.164 for storage and for the courier: +639XXXXXXXXX. */
export function toE164(nationalNumber: string) {
  return `${PH_DIAL_CODE}${normalisePhone(nationalNumber)}`;
}

/** Human-friendly: 0917 123 4567. */
export function formatPhone(nationalNumber: string) {
  const n = normalisePhone(nationalNumber);
  if (n.length !== 10) return nationalNumber;
  return `0${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
}

export function buildFullAddress(customer: Customer) {
  return [
    customer.street,
    customer.barangayName,
    customer.cityName,
    customer.provinceName,
    customer.postcode,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}

export function validateCustomer(values: Customer) {
  const errors: Partial<Record<keyof Customer, string>> = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  // PH mobile numbers are 10 digits and always start with 9 after the country code.
  const phone = normalisePhone(values.phone);
  if (phone.length !== 10 || !phone.startsWith("9")) {
    errors.phone = "Enter a 10-digit mobile number starting with 9.";
  }

  if (values.street.trim().length < 4) {
    errors.street = "Please enter your house or unit number and street.";
  }
  if (!values.provinceId) {
    errors.provinceId = "Please choose your province.";
  }
  if (!values.cityId) {
    errors.cityId = "Please choose your city or municipality.";
  }
  if (!values.barangayId) {
    errors.barangayId = "Please choose your barangay.";
  }
  if (values.landmark.trim().length < 3) {
    errors.landmark = "Please add a nearby landmark.";
  }

  return errors;
}

/**
 * Re-checks a payload that arrived over the wire. The browser already validates,
 * but anything can POST to the API route, so the server never trusts it.
 */
export function parseOrder(
  input: unknown,
): { ok: true; order: OrderPayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: ["Body must be a JSON object."] };
  }
  const body = input as Partial<OrderPayload>;

  const incoming = body.customer;
  if (typeof incoming !== "object" || incoming === null) {
    errors.push("customer is required.");
  } else {
    const customer: Customer = { ...EMPTY_CUSTOMER };
    for (const key of Object.keys(EMPTY_CUSTOMER) as (keyof Customer)[]) {
      customer[key] = String(
        (incoming as Record<string, unknown>)[key] ?? "",
      );
    }
    for (const [field, message] of Object.entries(validateCustomer(customer))) {
      errors.push(`${field}: ${message}`);
    }
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push("items must be a non-empty array.");
  } else {
    body.items.forEach((item, index) => {
      if (!item || typeof item.id !== "string" || !item.id) {
        errors.push(`items[${index}].id is required.`);
      }
      if (!Number.isInteger(item?.quantity) || item.quantity < 1) {
        errors.push(`items[${index}].quantity must be a positive integer.`);
      }
      if (!Number.isFinite(item?.unitPrice) || item.unitPrice < 0) {
        errors.push(`items[${index}].unitPrice must be a number.`);
      }
    });
  }

  if (body.paymentMethod !== "cash-on-delivery") {
    errors.push("paymentMethod must be 'cash-on-delivery'.");
  }

  if (errors.length > 0) return { ok: false, errors };

  const items = (body.items as OrderItem[]).map((item) => ({
    id: item.id,
    name: String(item.name ?? item.id),
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    // Recomputed rather than trusted — the client could send anything.
    lineTotal: item.unitPrice * item.quantity,
  }));

  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const shippingFee = 0;

  return {
    ok: true,
    order: {
      reference: String(body.reference ?? ""),
      placedAt: new Date().toISOString(),
      customer: body.customer as Customer,
      paymentMethod: "cash-on-delivery",
      items,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
    },
  };
}
