import { describe, it, expect } from "vitest";
import type { CartItem, Product } from "@/shared/types";

// Extract the pure cart logic from CartContext for unit testing.
// These mirror the reducer logic inside CartProvider.

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    category_id: 1,
    name: "Sushi Combo",
    description: "Combo premium",
    price: 89.9,
    image_url: null,
    is_active: true,
    stock_quantity: 50,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    ...overrides,
  };
}

function addToCart(
  items: CartItem[],
  product: Product,
  quantity = 1,
): CartItem[] {
  const existing = items.find((item) => item.product.id === product.id);
  if (existing) {
    return items.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }
  return [...items, { product, quantity }];
}

function removeFromCart(items: CartItem[], productId: number): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

function updateQuantity(
  items: CartItem[],
  productId: number,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }
  return items.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item,
  );
}

function getTotalItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function getTotalPrice(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}

// ── Test 14: addToCart adds new product ──

describe("Cart logic", () => {
  it("adds a new product to an empty cart", () => {
    const product = makeProduct();
    const cart = addToCart([], product, 1);
    expect(cart).toHaveLength(1);
    expect(cart[0].product.id).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });

  // ── Test 15: addToCart increments existing product ──

  it("increments quantity when adding an existing product", () => {
    const product = makeProduct();
    let cart = addToCart([], product, 2);
    cart = addToCart(cart, product, 3);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(5);
  });

  // ── Test 16: removeFromCart ──

  it("removes a product from the cart", () => {
    const p1 = makeProduct({ id: 1, name: "Sushi" });
    const p2 = makeProduct({ id: 2, name: "Pizza", price: 45.0 });
    let cart = addToCart([], p1);
    cart = addToCart(cart, p2);
    cart = removeFromCart(cart, 1);
    expect(cart).toHaveLength(1);
    expect(cart[0].product.id).toBe(2);
  });

  // ── Test 17: updateQuantity sets exact value ──

  it("updates quantity to exact value", () => {
    const product = makeProduct();
    let cart = addToCart([], product, 1);
    cart = updateQuantity(cart, 1, 10);
    expect(cart[0].quantity).toBe(10);
  });

  // ── Test 18: updateQuantity with 0 removes item ──

  it("removes item when quantity updated to 0", () => {
    const product = makeProduct();
    let cart = addToCart([], product, 5);
    cart = updateQuantity(cart, 1, 0);
    expect(cart).toHaveLength(0);
  });

  // ── Test 19: getTotalItems sums quantities ──

  it("calculates total items across multiple products", () => {
    const p1 = makeProduct({ id: 1, price: 10 });
    const p2 = makeProduct({ id: 2, price: 20 });
    let cart = addToCart([], p1, 3);
    cart = addToCart(cart, p2, 7);
    expect(getTotalItems(cart)).toBe(10);
  });

  // ── Test 20: getTotalPrice calculates correctly ──

  it("calculates total price with multiple products and quantities", () => {
    const p1 = makeProduct({ id: 1, price: 10.5 });
    const p2 = makeProduct({ id: 2, price: 25.0 });
    let cart = addToCart([], p1, 2);
    cart = addToCart(cart, p2, 3);
    // 10.5*2 + 25*3 = 21 + 75 = 96
    expect(getTotalPrice(cart)).toBeCloseTo(96.0);
  });
});
