import { User } from "~/shared/types/user";

export interface Order {
  id: number;
  amount: number;
  shippingFees: number;
  discount: number;
  finalAmount: number;
  paid: boolean;
  user: User;
  shippingAddress: string;
  createdAt: number;
}
