import { CartItem } from "~/shared/types/cart-item";
import { User } from "~/shared/types/user";

export interface Cart {
  user: User;
  items: CartItem[];
  show: boolean;
}
