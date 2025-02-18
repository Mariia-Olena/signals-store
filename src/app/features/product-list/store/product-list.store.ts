import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withState,
  withProps,
  withMethods,
} from '@ngrx/signals';
import { initialProductListSlice } from './product-list.slice';
import { buildProductListVm } from './product-list-vm.builder';
import { ShopStore } from '../../../store/shop.store';

export const ProductListStore = signalStore(
  withState(initialProductListSlice),
  withProps(() => ({
    _shopStore: inject(ShopStore),
  })),
  withComputed((store) => ({
    vm: computed(() =>
      buildProductListVm(
        store._shopStore.products(),
        store._shopStore.searchWord(),
        store._shopStore.cartQuantities()
      )
    ),
  })),
  withMethods((store) => ({
    addToCart: store._shopStore.addToCart,
    showCart: store._shopStore.showCart,
  }))
);
