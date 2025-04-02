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
interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number; // Giá mỗi đơn vị sản phẩm
  size: string;
  sugar: string;
  ice: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: getCartFromStorage(), // Load cart khi khởi động
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      let newCart;
      if (existingItem) {
        newCart = state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newCart = [...state.cart, item];
      }
      localStorage.setItem("cart", JSON.stringify(newCart)); // Lưu vào localStorage
      return { cart: newCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
  updateQuantity: (id, quantity) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));
