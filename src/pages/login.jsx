import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	// function login(){
		
	// 	axios.post("http://localhost:3000/users/login",
	// 		{
	// 			email : email,
	// 			password : password
	// 		}
	// 	).then(
	// 		(response)=>{
	// 			console.log(response)
	// 		}
	// 	).catch(
	// 		(error)=>{
	// 			console.log(error)
	// 			console.log("Login Failed")
	// 		}
	// 	)
	// }

	async function login(){
		try{
			const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login",
				{
					email : email,
					password : password
				}
			)
			console.log(response)
			toast.success("Login Successful")

			localStorage.setItem("token", response.data.token)
			if(response.data.role == "admin"){

				//window.location.href = "/admin/"
				navigate("/admin/")
				
			}else{
				//redirect to home page "/"
			}
		}catch(error){
			console.log(error)
			//alert("Login Failed")
			toast.error("Login Failed")
		}
	}

	return (
		<div className="w-full h-full bg-[url('/background1.jpg')] bg-cover no-repeat bg-center flex">

            <div className="w-[50%] h-full flex justify-center items-end flex-col">
                <div className="backdrop-blur-sm w-[450px] h-[600px] shadow-2xl rounded-lg flex flex-col justify-center items-center">
                    <img src="/logo.png" className="w-[330px]" />
				    {/* <h1 className=" text-5xl font-bold font-poppins"
                        style={{
                        color: 'black',                 // Text fill color
                        WebkitTextStroke: '2px white',  // White outline
                        textStroke: '2px white',        // For non-webkit browsers
                    }}>SDCOMPUTERS</h1>	 */}
                </div>   		
			</div>

			<div className="w-[50%] h-full  flex justify-start  items-center">
				<div className="bg-white/75 w-[450px] h-[600px] shadow-2xl rounded-lg flex flex-col justify-center">
					<input
						type="email"
						placeholder="Email"
						className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
                        onChange={
							(e)=>{
								setEmail(e.target.value)
							}
						}
					/>
					<input
						type="password"
						placeholder="Password"
						className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
                        onChange={
							(e)=>{
								setPassword(e.target.value)
							}
						}
					/>
					<p className="w-full text-right pr-5 font-poppins text-sm">
						Forgot Password?{" "}
						<Link to="/forgot-password">
							Reset
						</Link>
					</p>
					<button onClick={login} className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-poppins">
						Login
					</button>
					<button className="m-5 p-3 w-[90%] h-[50px] bg-black rounded-lg text-white font-poppins">
						Login with Google
					</button>
					<p className="w-full  text-right pr-5 font-poppins text-sm">
						Don't have an account?{" "}
						<Link to="/register">
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}