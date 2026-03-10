import { useState } from "react"
import { getCart } from "../utils/cart"
import { BiMinus, BiPlus } from "react-icons/bi"

export default function Cart(){
    const [cart , setCart] = useState(getCart())
    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll ">

            <div className="w-full  flex justify-center items-center flex-col gap-4 p-5">
                {
                    cart.map(
                        (cartItem , index)=>{
                            return(
                                <div key={index} className="w-[600px] h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden">
                                    <img className="h-[150px] aspect-square object-cover" src={cartItem.product.image} alt={cartItem.name} />
                                    <div className="h-full w-[300px] p-4 flex flex-col  overflow-hidden  justify-between">
                                        <p className="text-xs text-gray-500">{cartItem.product.productID}</p>
                                        <h1 className="text-xl font-bold">{cartItem.product.name}</h1>
                                        <div className="w-[210px] h-[50px] border border-accent rounded-full flex overflow-hidden">
                                            <button className="w-[70px] h-full flex justify-center items-center  text-2xl font-bold text-gray-700 hover:bg-accent">
                                                <BiMinus/>
                                            </button>
                                            <span className="w-[70px] h-full flex justify-center items-center  text-lg font-bold text-gray-700">
                                                {cartItem.qty}
                                            </span>
                                            <button className="w-[70px] h-full flex justify-center items-center  text-2xl font-bold text-gray-700 hover:bg-accent">
                                                <BiPlus/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
            
        </div>
    )
}