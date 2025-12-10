import ProductCard from "./productCard.jsx";

export default function OnSaleNow() {
	return (
		<div>
			<h1>On Sale Now!</h1>
			<ProductCard
				name="Macbook Air"
				image="https://picsum.photos/id/0/200/300"
				price="$999"
			/>

			<ProductCard
				name="iPhone"
				image="https://picsum.photos/id/3/200/300"
				price="$799"
			/>

			<ProductCard
				name="Shoes"
				image="https://picsum.photos/id/21/200/300"
				price="$199"
			/>
		</div>
	);
}