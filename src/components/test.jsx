import { useState } from "react"

export default function Test(){
	
	const [number , setNumber] = useState(11)

	return(
		<div className="w-full h-full flex justify-center items-center">
			<h1>{number}</h1>
			<button onClick={()=>{

				setNumber(number + 1)

			}}>Increase</button>
		</div>	
	)
}