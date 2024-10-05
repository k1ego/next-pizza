import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { PaymentCallbackData } from '../../../../../@types/yookassa';
import { prisma } from '../../../../../prisma/prisma-client';
import { OrderSuccessTemplate } from '../../../../../shared/components/shared/email-templates/order-success';
import { CartItemDTO } from '../../../../../shared/services/dto/cart.dto';
import { sendEmail } from '../../../../../shared/lib/send-email';

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		});

		if (!order) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
			},
		});

		const items = JSON.parse(order?.items as string) as CartItemDTO[];

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'Next Pizza / Ваш заказ успешно оформлен 🎉',
				OrderSuccessTemplate({
					orderId: order.id,
					items,
				})
			);
		}   
	} catch (error) {
		console.log('[Checkout Callback]: ', error);

		return NextResponse.json({ error: true }, { status: 500 });
	}
}
