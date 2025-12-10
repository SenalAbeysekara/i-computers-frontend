export default function ProductCard(props){

    console.log(props);
    
    return(
        <div>
            <h2>{props.name}</h2>
            <img src={props.image} className="border-4 "/>
            <p>Price: {props.price}</p>
            <button>Buy now</button>
        </div>
    )

}