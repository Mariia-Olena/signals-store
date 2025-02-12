import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialShopeSlice } from './shop.slice';
import { computed } from '@angular/core';
import { buildCartVm, buildProductListVm } from './shop-vm.builder';
import * as updaters from './shop.updaters';

export const ShopStore = signalStore(
  { providedIn: 'root' },
  withState(initialShopeSlice),
  withComputed((store) => ({
    productListVm: computed(() =>
      buildProductListVm(
        store.products(),
        store.searchWord(),
        store.cartQuantities()
      )
    ),
    cartVm: computed(() =>
      buildCartVm(
        store.products(),
        store.cartQuantities(),
        store.taxRate(),
        store.isCartVisible()
      )
    ),
  })),
  withMethods((store) => ({
    setSearchWord: (searchWord: string) => patchState(store, updaters.setSearchWord(searchWord)),
    addToCart: (productId: string) => patchState(store, updaters.addToCart(productId)),
    showCart: () => patchState(store, updaters.showCart()),
    hideCart: () => patchState(store, updaters.hideCart()),
    incrementQuantity: (productId: string) => patchState(store, updaters.incrementQuantity(productId)),
    decrementQuantity: (productId: string) => patchState(store, updaters.decrementQuantity(productId)),
    checkout: () => patchState(store, updaters.checkout()),
  }))
);
