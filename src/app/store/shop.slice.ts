import { ALL_PRODUCTS } from '../data/all-products';
import { Product } from '../models/product.model';

export interface ShopSlice {
  readonly products: Product[];
  readonly searchWord: string;
  readonly cartQuantities: Record<string, number>;
  readonly isCartVisible: boolean;
  readonly taxRate: number;
}

export const initialShopSlice: ShopSlice = {
  products: ALL_PRODUCTS,
  searchWord: '',
  cartQuantities: {},
  isCartVisible: false,
  taxRate: 0.08,
};
