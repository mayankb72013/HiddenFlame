import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";


export default function SignUp() {
 
    const [auth, setAuth] = useState<{ token: string | null }>({ token: null });

    useEffect(() => {
        fetch("http://localhost:5000/auth/check-auth", {
            credentials: "include", // Ensures cookies are sent
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    setAuth({ token: data.token });
                }
            })
            .catch(() => console.log("Not authenticated"));
    }, []);
    

   function googleAuth(event?: React.MouseEvent<HTMLButtonElement>){
    event?.preventDefault();
    window.location.href = "http://localhost:3000/auth/google"
      
   }

    

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 font-mySans">
            <div className="relative w-[768px] max-w-full min-h-[480px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-secondary-400 to-primary-400 text-white flex items-center justify-center flex-col gap-4">
                    <h1 className="text-4xl font-extrabold">Welcome Back!</h1>
                    <p className="text-center font-medium text-sm px-6">To keep connected with us please login with your personal info</p>
                </div>
                <div className="absolute top-0 left-1/2 w-1/2 h-full" id="sign-up-container">
                    <form className="flex flex-col items-center justify-center h-full px-12 text-center">
                        <h1 className="text-3xl font-mySans font-extrabold">Create Account</h1>
                        <div className="flex space-x-3 my-4">
                            <button onClick={googleAuth} className="border border-gray-300 rounded-full px-2.5 py-2"><i className="fab fa-google"></i></button>
                            <a href="#" className="border border-gray-300 rounded-full px-3.5 py-2"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="border border-gray-300 rounded-full px-4 py-2"><i className="fab fa-facebook-f"></i></a>
                        </div>
                        <span className="text-sm">or use your email for registration</span>
                        <input type="text" placeholder="Name" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        <input type="email" placeholder="Email" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        <input type="password" placeholder="Password" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        <button className="bg-primary-500 cursor-pointer text-white font-semibold py-2 px-6 mt-4 rounded-full">Sign Up</button>
                    </form>
                </div>
            </div>
            <footer className="fixed bottom-0 left-0 right-0 text-center text-sm p-3 bg-gray-900 text-white">
                <p>Created with <i className="fa fa-heart text-red-500"></i> by <a href="https://ourWebsite.com" className="text-blue-400">Our Website</a></p>
            </footer>
        </div>
    );
}

