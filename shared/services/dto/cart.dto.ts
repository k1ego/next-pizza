import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
	productItem: ProductItem & {
		product: Product;
	}
	ingredient: Ingredient[];
}

export interface CartDTO extends Cart {
	items: CartItemDTO[]
}