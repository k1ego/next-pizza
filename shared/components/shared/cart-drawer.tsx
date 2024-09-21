'use client';

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { PizzaSize, PizzaType } from '../../constants/pizza';
import { getCartItemDetails } from '../../lib';
import { useCartStore } from '../../store';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const [
		totalAmount,
		items,
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
	] = useCartStore(state => [
		state.totalAmount,
		state.items,
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
	]);
	

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	React.useEffect(() => {
		fetchCartItems();
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<SheetHeader>
					<SheetTitle>
						Корзина <span className='font-bold'>{items.length} товара</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
					{items.map(item => (
						<div key={item.id} className='mb-2'>
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								details={
									item.pizzaSize && item.pizzaType
										? getCartItemDetails(
												item.ingredients,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize
										)
										: ''
								}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								onClickCountButton={type =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						</div>
					))}
				</div>

				<SheetFooter className='-mx-6 bg-white p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>
							<span className='font-bold text-lg'>{totalAmount}</span>
						</div>

						<Link href='/cart'>
							<Button type='submit' className='w-full h-12 text-base'>
								Оформить заказ
								<ArrowRight className='w-5 ml-3' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
