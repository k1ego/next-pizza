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

// это передается от браузера к серверу вариации пицц
export interface CreateCartItemValues {
	productItemId: number;
	ingredients?: number[];
}