import "@fortawesome/fontawesome-free/css/all.min.css";

export default function SignIn() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 font-mySans">
            <div className="relative w-[768px] max-w-full min-h-[480px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-secondary-400 to-primary-400 text-white flex items-center justify-center flex-col gap-4">
                    <h1 className="text-4xl font-extrabold">Hello, Friend!</h1>
                    <p className="text-center font-medium text-sm px-6">Enter your personal details and start journey with us</p>
                </div>
                <div className="absolute top-0 left-1/2 w-1/2 h-full" id="sign-in-container">
                    <form className="flex flex-col items-center justify-center h-full px-12 text-center">
                        <h1 className="text-3xl font-bold">Sign in</h1>
                        <div className="flex space-x-3 my-4">
                            <a href="#" className="border border-gray-300 rounded-full px-2.5 py-2"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="border border-gray-300 rounded-full px-3.5 py-2"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="border border-gray-300 rounded-full px-4 py-2"><i className="fab fa-facebook-f"></i></a>
                        </div>
                        <span className="text-sm">or use your account</span>
                        <input type="email" placeholder="Email" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        <input type="password" placeholder="Password" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        <a href="#" className="text-sm text-gray-600 mt-2">Forgot your password?</a>
                        <button className="bg-primary-400 text-white cursor-pointer font-bold py-2 px-6 mt-4 rounded-full">Sign In</button>
                    </form>
                </div>
            </div>
            <footer className="fixed bottom-0 left-0 right-0 text-center text-sm p-3 bg-gray-900 text-white">
                <p>Created with <i className="fa fa-heart text-red-500"></i> by <a href="https://ourWebsite.com" className="text-blue-400">Our Website</a></p>
            </footer>
        </div> 
    );
}
