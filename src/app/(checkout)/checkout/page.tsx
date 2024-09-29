import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import {
	CheckoutItem,
	CheckoutItemDetails,
	Container,
	Title,
	WhiteBlock,
} from '../../../../shared/components/shared';
import { Button, Input, Textarea } from '../../../../shared/components/ui';

export default function CheckoutPage() {
	return (
		<Container className='mt-10'>
			<Title
				text='Оформление заказа'
				className='font-extrabold mb-8 text-[36px]'
			/>
			<div className='flex gap-10'>
				{/* Левая часть */}
				<div className='flex flex-col gap-10 flex-1 mb-20'>
					<WhiteBlock title='1. Коризна'>
						<div className='flex flex-col gap-5'>
							<CheckoutItem
								id={1}
								imageUrl='https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif'
								details='Маринованные огурчики, Свежие томаты, Красный лук, Сочные ананасы, Итальянские травы'
								name='Чоризо фреш'
								price={216}
								quantity={3}
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock title='2. Персональные данные'>
						<div className='grid grid-cols-2 gap-5'>
							<Input className='text-base' name='firstName' placeholder='Имя' />
							<Input
								className='text-base'
								name='lastName'
								placeholder='Фамилия'
							/>
							<Input className='text-base' name='emal' placeholder='E-Mail' />
							<Input className='text-base' name='phone' placeholder='Телефон' />
						</div>
					</WhiteBlock>

					<WhiteBlock title='3. Адрес доставки'>
						<div className='flex flex-col gap-5'>
							<Input
								className='text-base'
								name='firstName'
								placeholder='Адрес доставки'
							/>
							<Textarea
								className='text-base'
								placeholder='Комментарий к заказу'
								rows={5}
							/>
						</div>
					</WhiteBlock>
				</div>

				{/* Правая часть */}
				<div className='w-[450px]'>
					<WhiteBlock className='p-6 sticky top-4'>
						<div className='flex flex-col gap-1'>
							<span className='text-xl'>Итого:</span>
							<span className='text-[34px] font-extrabold'>3506 ₽</span>
						</div>

						<CheckoutItemDetails
							title={
								<div className='flex items-center'>
									<Package size={18} className='mr-2 text-gray-300' />
									Стоимость товаров:
								</div>
							}
							value='3000 ₽'
						/>
						<CheckoutItemDetails
							title={
								<div className='flex items-center'>
									<Percent size={18} className='mr-2 text-gray-300' />
									Налоги:
								</div>
							}
							value='200 ₽'
						/>
						<CheckoutItemDetails
							title={
								<div className='flex items-center'>
									<Truck size={18} className='mr-2 text-gray-300' />
									Доставка:
								</div>
							}
							value='140 ₽'
						/>

						<Button
							type='submit'
							className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
						>
							Перейти к оплате
							<ArrowRight className='w-5 ml-2' />
						</Button>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
