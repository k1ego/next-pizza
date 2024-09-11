import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../../src/image/logo.png';
import { cn } from '../../lib/utils';
import { Button } from '../ui';
import { Container } from './container';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('border border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				{/* Левая часть */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src={logo} alt='Logo' width={35} height={35} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>
								вкуснее уже некуда
							</p>
						</div>
					</div>
				</Link>

				<div className='mx-10 flex-1'>
					<SearchInput />
				</div>

				{/* Правая часть */}
				<div className='flex items-center gap-3'>
					<Button variant='outline' className='flex items-center gap-1'>
						<User size={16} />
						Войти
					</Button>

					<div>
						<CartButton />
					</div>
				</div>
			</Container>
		</header>
	);
};
