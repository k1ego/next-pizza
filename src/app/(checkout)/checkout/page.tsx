'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { createOrder } from '@/app/actions';
import React from 'react';
import toast from 'react-hot-toast';
import {
	CheckoutSidebar,
	Container,
	Title,
} from '../../../../shared/components/shared';
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
} from '../../../../shared/components/shared/checkout';
import {
	checkoutFormSchema,
	CheckoutFormValues,
} from '../../../../shared/constants/checkout-form-schema';
import { useCart } from '../../../../shared/hooks';

export default function CheckoutPage() {
	const [submiting, setSubmiting] = React.useState(false);
	const { totalAmount, updateItemQuantity, removeCartItem, items, loading } =
		useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmiting(true);
			const url = await createOrder(data);

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.log(err);
			setSubmiting(false);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			});
		}
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						{/* Левая часть */}
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							<CheckoutAddressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						{/* Правая часть */}
						<div className='w-[450px]'>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submiting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
