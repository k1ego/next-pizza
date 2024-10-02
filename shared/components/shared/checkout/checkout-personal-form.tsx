import { FormInput } from '../form';
import { WhiteBlock } from '../white-block';

interface Props {
	className?: string;
}

export const CheckoutPersonalForm = ({ className }: Props) => {
	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5'>
				<FormInput className='text-base' name='firstName' placeholder='Имя' />
				<FormInput
					className='text-base'
					name='lastName'
					placeholder='Фамилия'
				/>
				<FormInput className='text-base' name='email' placeholder='E-Mail' />
				<FormInput className='text-base' name='phone' placeholder='Телефон' />
			</div>
		</WhiteBlock>
	);
};
