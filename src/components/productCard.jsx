export default function ProductCard({ image, name, price }) {
    return (
        <div>
            <img src={image} alt={name} width="150" />
            <h2>{name}</h2>
            <p>${price}</p>
            <button>Add to Cart</button>
        </div>
    );
}
