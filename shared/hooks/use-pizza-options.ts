import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import useSet from "react-use/lib/useSet";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = React.useState<PizzaSize>(20);
	const [type, setType] = React.useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);
	const availableSizes = getAvailablePizzaSizes(type, items);

	React.useEffect(() => {
		const isAvaibleSize = availableSizes?.find(
			item => Number(item.value) === size && !item.disabled
		);
		const avaibleSize = availableSizes?.find(item => !item.disabled);

		if (!isAvaibleSize && avaibleSize) {
			setSize(Number(avaibleSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		setSize,
		setType,
		addIngredient,
	};
}