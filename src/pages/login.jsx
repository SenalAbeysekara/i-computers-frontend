import { Link } from "react-router-dom";

export default function LoginPage() {
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
					/>
					<input
						type="password"
						placeholder="Password"
						className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
					/>
					<p className="w-full text-right pr-5 font-poppins text-sm">
						Forgot Password?{" "}
						<Link to="/forgot-password">
							Reset
						</Link>
					</p>
					<button className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-poppins">
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