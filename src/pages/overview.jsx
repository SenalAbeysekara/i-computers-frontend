import { useParams } from "react-router-dom"

export default function Overview(){

    const params = useParams();
    console.log(params)

    //fetch product details using params.productId and display them here

    return(
        <div className="w-full min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold">Product Overview Page of {params.productId}</h1>
        </div>
    )
}