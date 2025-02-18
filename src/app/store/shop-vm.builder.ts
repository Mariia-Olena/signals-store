import { CartQuantities } from '../models/cart-quantities.model';
import { ShopVm } from './shop.vm';

export function buildShopVm(
  isCartVisible: boolean,
  cartQuantities: CartQuantities
): ShopVm {
  const itemsCount = Object.entries(cartQuantities).length;

  return {
    isCartActive: itemsCount > 0,
    isCartVisible: isCartVisible,
    cartItemsCount: itemsCount,
  };
}
