"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type CartItem = {
  /** Stable key — product slug or offer id. */
  id: string;
  name: string;
  /** Unit price in PHP. */
  price: number;
  /** Small print under the name, e.g. "2 Pouches (20 sachets)". */
  meta?: string;
  image?: string;
};

export type CartLine = CartItem & { quantity: number };

type Action =
  | { type: "replace"; lines: CartLine[] }
  | { type: "add"; item: CartItem; quantity: number }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const MAX_PER_LINE = 20;

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "replace":
      return action.lines;

    case "add": {
      const existing = lines.find((line) => line.id === action.item.id);
      if (!existing) {
        return [...lines, { ...action.item, quantity: action.quantity }];
      }
      return lines.map((line) =>
        line.id === action.item.id
          ? {
              ...line,
              quantity: Math.min(MAX_PER_LINE, line.quantity + action.quantity),
            }
          : line,
      );
    }

    case "setQuantity": {
      if (action.quantity < 1) {
        return lines.filter((line) => line.id !== action.id);
      }
      return lines.map((line) =>
        line.id === action.id
          ? { ...line, quantity: Math.min(MAX_PER_LINE, action.quantity) }
          : line,
      );
    }

    case "remove":
      return lines.filter((line) => line.id !== action.id);

    case "clear":
      return [];
  }
}

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** False until localStorage has been read, so the badge never flashes a stale count. */
  hydrated: boolean;
  isOpen: boolean;
  add: (item: CartItem, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);

const STORAGE_KEY = "beyou.cart.v1";

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Storage is user-editable, so only keep entries that still match the shape.
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).id === "string" &&
        typeof (line as CartLine).name === "string" &&
        Number.isFinite((line as CartLine).price) &&
        Number.isFinite((line as CartLine).quantity) &&
        (line as CartLine).quantity > 0,
    );
  } catch {
    return [];
  }
}

/* Server renders false, the client renders true — no state update needed, so the
   badge can stay blank through hydration without a mismatch. */
const noopSubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useSyncExternalStore(noopSubscribe, onClient, onServer);

  useEffect(() => {
    dispatch({ type: "replace", lines: readStorage() });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private browsing or a full quota — the cart still works for this session.
    }
  }, [lines, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const add = useCallback((item: CartItem, quantity = 1) => {
    dispatch({ type: "add", item, quantity });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "setQuantity", id, quantity });
  }, []);

  const remove = useCallback((id: string) => {
    dispatch({ type: "remove", id });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce(
      (total, line) => total + line.price * line.quantity,
      0,
    );
    return {
      lines,
      count,
      subtotal,
      hydrated,
      isOpen,
      add,
      setQuantity,
      remove,
      clear,
      openCart,
      closeCart,
    };
  }, [lines, hydrated, isOpen, add, setQuantity, remove, clear, openCart, closeCart]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return value;
}

const pesoAmount = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPeso(amount: number) {
  return `₱${pesoAmount.format(amount)}`;
}
