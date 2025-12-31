import { useState } from "react"

export default function Test(){
	const [count,setCount] =  useState(0)
	const [status, setStatus] = useState("Sleeping")
	const [isVisible, setIsVisible] = useState(true)
	

    return(
		<div className="w-full h-full bg-yellow-600 flex justify-center items-center">

			

			<button onClick={
				()=>{
					setIsVisible(!isVisible)	
				}
				// if else
			} className="w-[50px] h-[50px] bg-red-600 text-white">{isVisible?"X":"O"}</button>

			{/* if */}
			{isVisible && <div className="w-[400px] h-[400px] bg-white flex justify-center items-center flex-col">

				<h1 className="text-[55px]">{count}</h1>

				<div className="w-full h-[50px] b flex justify-center items-center gap-2">

					<button onClick={
						()=>{
							setCount(count - 1)				
						}
					} className="w-[100px] h-[45px] bg-red-600 text-white">
						Decrement
					</button>

					<button onClick={
						()=>{
							setCount(count + 1)
						}
					} className="w-[100px] h-[45px] bg-green-600 text-white">
						Increment
					</button>
				</div>
				<h1 className="text-[55px]">{status}</h1>

				<div className="w-full h-[50px] b flex justify-center items-center gap-2">

					<button onClick={
						()=>{
							setStatus("Sleeping")			
						}
					} className="w-[100px] h-[45px] bg-red-600 text-white">
						Sleep
					</button>

					<button onClick={
						()=>{
							setStatus("Awake")
						}
					} className="w-[100px] h-[45px] bg-green-600 text-white">
						Awake
					</button>
				</div>
			</div>}
		</div>
    )
}