import { describe, it, expect } from "vitest";
import {
  CategorySchema,
  ProductSchema,
  UserProfileSchema,
  OrderSchema,
  OrderItemSchema,
  WalletTransactionSchema,
} from "@/shared/types";

// ── Test 1-3: CategorySchema ──

describe("CategorySchema", () => {
  it("validates a correct category object", () => {
    const category = {
      id: 1,
      name: "Food",
      slug: "food",
      description: "Alimentacao e delivery",
      icon: "utensils",
      color: "#ff5500",
      is_active: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    };
    const result = CategorySchema.safeParse(category);
    expect(result.success).toBe(true);
  });

  it("allows nullable fields (description, icon, color)", () => {
    const category = {
      id: 2,
      name: "Fitness",
      slug: "fitness",
      description: null,
      icon: null,
      color: null,
      is_active: false,
      created_at: "2025-06-01T12:00:00Z",
      updated_at: "2025-06-01T12:00:00Z",
    };
    const result = CategorySchema.safeParse(category);
    expect(result.success).toBe(true);
  });

  it("rejects a category missing required fields", () => {
    const bad = { id: 1, name: "Food" };
    const result = CategorySchema.safeParse(bad);
    expect(result.success).toBe(false);
  });
});

// ── Test 4-6: ProductSchema ──

describe("ProductSchema", () => {
  it("validates a complete product", () => {
    const product = {
      id: 10,
      category_id: 1,
      name: "Sushi Combo",
      description: "Combo de sushi premium",
      price: 89.9,
      image_url: "https://example.com/sushi.jpg",
      is_active: true,
      stock_quantity: 50,
      created_at: "2025-03-01T00:00:00Z",
      updated_at: "2025-03-01T00:00:00Z",
    };
    const result = ProductSchema.safeParse(product);
    expect(result.success).toBe(true);
  });

  it("allows optional category_name and category_slug", () => {
    const product = {
      id: 11,
      category_id: 1,
      name: "Pizza Margherita",
      description: null,
      price: 45.0,
      image_url: null,
      is_active: true,
      stock_quantity: 100,
      created_at: "2025-03-01T00:00:00Z",
      updated_at: "2025-03-01T00:00:00Z",
      category_name: "Food",
      category_slug: "food",
    };
    const result = ProductSchema.safeParse(product);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.category_name).toBe("Food");
      expect(result.data.category_slug).toBe("food");
    }
  });

  it("rejects product with string price", () => {
    const bad = {
      id: 12,
      category_id: 1,
      name: "Burger",
      description: null,
      price: "29.90",
      image_url: null,
      is_active: true,
      stock_quantity: 10,
      created_at: "2025-03-01T00:00:00Z",
      updated_at: "2025-03-01T00:00:00Z",
    };
    const result = ProductSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });
});

// ── Test 7-8: UserProfileSchema ──

describe("UserProfileSchema", () => {
  it("validates a user profile with all fields", () => {
    const profile = {
      id: 1,
      user_id: "user-abc-123",
      phone: "+5521999999999",
      birth_date: "1990-05-15",
      gamification_level: 3,
      gamification_points: 2500,
      wallet_balance: 150.75,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    };
    const result = UserProfileSchema.safeParse(profile);
    expect(result.success).toBe(true);
  });

  it("allows null phone and birth_date", () => {
    const profile = {
      id: 2,
      user_id: "user-xyz-456",
      phone: null,
      birth_date: null,
      gamification_level: 1,
      gamification_points: 0,
      wallet_balance: 0,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    };
    const result = UserProfileSchema.safeParse(profile);
    expect(result.success).toBe(true);
  });
});

// ── Test 9-10: OrderSchema ──

describe("OrderSchema", () => {
  it("validates a complete order", () => {
    const order = {
      id: 100,
      user_id: "user-abc-123",
      total_amount: 250.5,
      status: "pending",
      tracking_code: "MND17200000001ABCD",
      created_at: "2025-06-01T10:00:00Z",
      updated_at: "2025-06-01T10:00:00Z",
    };
    const result = OrderSchema.safeParse(order);
    expect(result.success).toBe(true);
  });

  it("allows null tracking_code", () => {
    const order = {
      id: 101,
      user_id: "user-abc-123",
      total_amount: 99.0,
      status: "delivered",
      tracking_code: null,
      created_at: "2025-06-01T10:00:00Z",
      updated_at: "2025-06-02T10:00:00Z",
    };
    const result = OrderSchema.safeParse(order);
    expect(result.success).toBe(true);
  });
});

// ── Test 11: OrderItemSchema ──

describe("OrderItemSchema", () => {
  it("validates an order item", () => {
    const item = {
      id: 1,
      order_id: 100,
      product_id: 10,
      quantity: 2,
      unit_price: 89.9,
      created_at: "2025-06-01T10:00:00Z",
      updated_at: "2025-06-01T10:00:00Z",
    };
    const result = OrderItemSchema.safeParse(item);
    expect(result.success).toBe(true);
  });
});

// ── Test 12-13: WalletTransactionSchema ──

describe("WalletTransactionSchema", () => {
  it("validates a wallet transaction with all fields", () => {
    const tx = {
      id: 1,
      user_id: "user-abc-123",
      amount: 50.0,
      transaction_type: "credit",
      description: "Cashback pedido #100",
      reference_id: "order-100",
      created_at: "2025-06-01T10:00:00Z",
      updated_at: "2025-06-01T10:00:00Z",
    };
    const result = WalletTransactionSchema.safeParse(tx);
    expect(result.success).toBe(true);
  });

  it("allows null description and reference_id", () => {
    const tx = {
      id: 2,
      user_id: "user-abc-123",
      amount: -30.0,
      transaction_type: "debit",
      description: null,
      reference_id: null,
      created_at: "2025-06-01T10:00:00Z",
      updated_at: "2025-06-01T10:00:00Z",
    };
    const result = WalletTransactionSchema.safeParse(tx);
    expect(result.success).toBe(true);
  });
});
