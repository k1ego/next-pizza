'use client';

import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../../lib/utils';
import * as CartItemDetails from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	onClickCountButton,
	onClickRemove,
}) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex items-center gap-5 flex-1'>
				<CartItemDetails.Image src={imageUrl} />
				<CartItemDetails.Info name={name} details={details} />
			</div>
			<CartItemDetails.Price value={price} />
			<div className='flex items-center gap-5 ml-20'>
				<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
				<button onClick={onClickRemove}>
					<X
						className='text-gray-400 cursor-pointer hover:text-gray-600'
						size={20}
					/>
				</button>
			</div>
		</div>
	);
};
