import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialCartSlice } from './cart.slice';
import { ShopStore } from '../../../store/shop.store';
import { buildCartVm } from './cart-vm.builder';

export const CartStore = signalStore(
  withState(initialCartSlice),
  withProps(() => ({
    _shopStore: inject(ShopStore),
  })),
  withComputed((store) => ({
    vm: computed(() =>
      buildCartVm(
        store._shopStore.products(),
        store._shopStore.cartQuantities(),
        store.taxRate(),
        store._shopStore.isCartVisible()
      )
    ),
  })),
  withMethods((store) => ({
    hideCart: store._shopStore.hideCart,
    incrementQuantity: store._shopStore.incrementQuantity,
    decrementQuantity: store._shopStore.decrementQuantity,
    checkout: store._shopStore.checkout,
  }))
);
