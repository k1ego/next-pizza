import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { findOrCreateCart } from '../../../../shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '../../../../shared/lib/update-cart-total-amount';
import { CreateCartItemValues } from '../../../../shared/services/dto/cart.dto';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [{ token }],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredient: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log('[CART_GET] Server error', error);
		return NextResponse.json({ error: 'Не удалось получить корзину' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		if (!token) {
			// сгенерировали токен если его нет у пользователя
			token = crypto.randomUUID();
		}

		// создаем или находим корзину (если она есть)
		const userCart = await findOrCreateCart(token);

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredient: {
					every: {
						id: {
							in: data.ingredients,
						},
					},
				},
			},
		});

		// Если товар был найден, делаем + 1
		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			// если товар не был найден, создаем
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredient: { connect: data.ingredients?.map(id => ({ id })) },
				},
			});
		}
		// обновяем корзину в любом случае
		const updatedUserCart = await updateCartTotalAmount(token);
		// генерируем ответ
		const resp = NextResponse.json(updatedUserCart);
		// вшиваем в ответ токен
		resp.cookies.set('cartToken', token);
		return resp;
	} catch (error) {
		console.log(error);
		console.log('[CART_POST] Server error', error);
		return NextResponse.json({ error: 'Не удалось создать корзину' });
	}
}
