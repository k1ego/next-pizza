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
import { getCartItemDetails } from '../../lib';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<SheetHeader>
					<SheetTitle>
						Корзина <span className='font-bold'>3 товара</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>
					<div className='mb-2'>
					<CartDrawerItem
						id={1}
						imageUrl={
							'https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif'
						}
						details={getCartItemDetails(2, 30, [{ name: 'Цыпленок' }])}
						name={'Чоризо фреш'}
						price={419}
						quantity={1}
					/>
					</div>
				</div>

				<SheetFooter className='-mx-6 bg-white p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>
							<span className='font-bold text-lg'>500 ₽</span>
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
