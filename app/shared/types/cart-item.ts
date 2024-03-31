import { Product } from "~/shared/types/product";
import { User } from "~/shared/types/user";

export interface CartItem {
  id: string;
  user: User;
  product: Product;
  count: number;
}
