import { PartialStateUpdater } from '@ngrx/signals';
import { ShopSlice } from './shop.slice';

export function setSearchWord(
  searchWord: string
): PartialStateUpdater<ShopSlice> {
  return () => ({ searchWord });
}

export function addToCart(productId: string): PartialStateUpdater<ShopSlice> {
  return (state) => {
    const cartQuantities = { ...state.cartQuantities };
    cartQuantities[productId] = cartQuantities[productId] + 1 || 1;
    return { cartQuantities };
  };
}

export function showCart(): PartialStateUpdater<ShopSlice> {
  return () => ({ isCartVisible: true });
}

export function hideCart(): PartialStateUpdater<ShopSlice> {
  return () => ({ isCartVisible: false });
}

export function incrementQuantity(
  productId: string
): PartialStateUpdater<ShopSlice> {
  return addToCart(productId);
}

export function decrementQuantity(
  productId: string
): PartialStateUpdater<ShopSlice> {
  return (state) => {
    const cartQuantities = { ...state.cartQuantities };
    const newQuantity = cartQuantities[productId] - 1;
    if (newQuantity > 0) {
      cartQuantities[productId] = newQuantity;
    } else {
      delete cartQuantities[productId];
    }

    return { cartQuantities };
  };
}

export function checkout(): PartialStateUpdater<ShopSlice> {
  return () => ({
    cartQuantities: {},
    cartVisible: false,
  });
}
