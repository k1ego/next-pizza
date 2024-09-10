import { notFound } from 'next/navigation';
import { prisma } from '../../../../../prisma/prisma-client';
import {
	Container,
	PizzaImage,
	Title,
} from '../../../../../shared/components/shared';
import { GroupVariants } from '../../../../../shared/components/shared/group-variants';

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className='flex flex-col my-10'>
			<div className='flex flex-1'>
				<PizzaImage imageUrl={product.imageUrl} size={40} />

				<div className='w-[490px] bg-[#F7F6F5] p-7'>
					<Title
						text={product.name}
						size='lg'
						className='font-extrabold mb-1'
					/>
					<p className='text-gray-400'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
						consequuntur?
					</p>
					<GroupVariants
						items={[
							{
								name: 'Маленькая',
								value: '1',
							},
							{
								name: 'Cредняя',
								value: '2',
							},
							{
								name: 'Большая',
								value: '3',
							},
						]}
					/>
				</div>
			</div>
		</Container>
	);
}
