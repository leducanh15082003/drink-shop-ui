import { create } from "zustand";

const getCartFromStorage = () => {
  try {
    const cartData =
      typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [];
  }
};

export interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  size: string;
  sugar: string;
  ice: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  discountId: number | null;
  discountAmount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  getTotalPrice: () => number;
  applyDiscount: (discountId: number, discountAmount: number) => void;
}

const isSameItem = (a: CartItem, b: CartItem) =>
  a.id === b.id && a.size === b.size && a.sugar === b.sugar && a.ice === b.ice;

export const useCartStore = create<CartState>((set, get) => ({
  cart: getCartFromStorage(),
  discountId: null,
  discountAmount: 0,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => isSameItem(i, item));
      let newCart;
      if (existingItem) {
        newCart = state.cart.map((i) =>
          isSameItem(i, item)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newCart = [...state.cart, item];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  removeFromCart: (item) =>
    set((state) => {
      const newCart = state.cart.filter((i) => !isSameItem(i, item));
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },

  updateQuantity: (item, quantity) =>
    set((state) => {
      const newCart = state.cart.map((i) =>
        isSameItem(i, item) ? { ...i, quantity } : i
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

  applyDiscount: (discountId, discountAmount) => {
    set({ discountId, discountAmount });
  },
}));
