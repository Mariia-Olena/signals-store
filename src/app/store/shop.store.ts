import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialShopSlice, PersistedShopSlice } from './shop.slice';
import { computed, effect, Signal } from '@angular/core';
import { buildCartVm, buildProductListVm } from './shop-vm.builder';
import * as updaters from './shop.updaters';

export const ShopStore = signalStore(
  { providedIn: 'root' },
  withState(initialShopSlice),
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
    setSearchWord: (searchWord: string) =>
      patchState(store, updaters.setSearchWord(searchWord)),
    addToCart: (productId: string) =>
      patchState(store, updaters.addToCart(productId)),
    showCart: () => patchState(store, updaters.showCart()),
    hideCart: () => patchState(store, updaters.hideCart()),
    incrementQuantity: (productId: string) =>
      patchState(store, updaters.incrementQuantity(productId)),
    decrementQuantity: (productId: string) =>
      patchState(store, updaters.decrementQuantity(productId)),
    checkout: () => patchState(store, updaters.checkout()),
  })),
  withHooks((store) => ({
    onInit() {
      const persisted: Signal<PersistedShopSlice> = computed(() => ({
        cartQuantities: store.cartQuantities(),
      }));
      const valueFromLS: PersistedShopSlice | '' = JSON.parse(
        localStorage.getItem('shop') || ''
      );
      if (valueFromLS) patchState(store, valueFromLS);
      effect(() => {
        const persistedValue = persisted();
        localStorage.setItem('shop', JSON.stringify(persistedValue));
      });
    },
  }))
);
