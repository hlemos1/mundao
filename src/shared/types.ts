import z from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  category_id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  image_url: z.string().nullable(),
  is_active: z.boolean(),
  stock_quantity: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  category_name: z.string().optional(),
  category_slug: z.string().optional(),
});

export const UserProfileSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  phone: z.string().nullable(),
  birth_date: z.string().nullable(),
  gamification_level: z.number(),
  gamification_points: z.number(),
  wallet_balance: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const OrderSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  total_amount: z.number(),
  status: z.string(),
  tracking_code: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const OrderItemSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  unit_price: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const WalletTransactionSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  amount: z.number(),
  transaction_type: z.string(),
  description: z.string().nullable(),
  reference_id: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type WalletTransaction = z.infer<typeof WalletTransactionSchema>;

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserWithProfile {
  id: string;
  email: string;
  google_sub: string;
  google_user_data: {
    email: string;
    email_verified: boolean;
    family_name?: string | null;
    given_name?: string | null;
    hd?: string | null;
    name?: string | null;
    picture?: string | null;
    sub: string;
  };
  last_signed_in_at: string;
  created_at: string;
  updated_at: string;
  profile: UserProfile;
}
