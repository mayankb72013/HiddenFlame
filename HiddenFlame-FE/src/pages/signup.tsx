import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate()

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [errMsgName, setErrMsgName] = useState("");
    const [errMsgEmail, setErrMsgEmail] = useState("");
    const [errMsgPass, setErrMsgPass] = useState("");
    const [errMsgZod, setErrMsgZod] = useState("");
    async function signup() {

        setErrMsgName("");
        setErrMsgEmail("");
        setErrMsgPass("");
        setErrMsgZod("");

        let errorCheck = false;
        if (nameRef.current === null || nameRef.current === undefined || !nameRef.current?.value.trim()) {
            setErrMsgName("Enter Name");
            errorCheck = true;
        }
        if (emailRef.current === null || emailRef.current === undefined || !emailRef.current?.value.trim()) {
            setErrMsgEmail("Enter email");
            errorCheck = true;
        }
        if (passRef.current === null || passRef.current === undefined || !passRef.current?.value.trim()) {
            setErrMsgPass("Enter password");
            errorCheck = true;
        }
        if (errorCheck) {
            return;
        }
        else {
            try {
                await axios.post("http://localhost:3000/auth/signup", {
                    username: nameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passRef.current?.value
                })
                navigate("/signin")
            }
            catch (e: any) {
                const parsed = JSON.parse(e.response.data.msg);
                const errorMessage = parsed.map((error: { message: string }) => error.message).join(" , ");
                console.log(errorMessage);

                setErrMsgZod(errorMessage);
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 font-mySans">
            <div className="relative w-[768px] max-w-full min-h-[480px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-secondary-500 to-primary-500 text-white flex items-center justify-center flex-col gap-4">
                    <h1 className="text-4xl font-extrabold">Welcome Back!</h1>
                    <p className="text-center font-medium text-sm px-6">To keep connected with us please login with your personal info</p>
                </div>
                <div className="absolute top-0 left-1/2 w-1/2 h-full" id="sign-up-container">
                    <form className="flex flex-col items-center justify-center h-full px-12 text-center">
                        <h1 className="text-3xl font-mySans font-extrabold">Create Account</h1>
                        <div className="flex space-x-3 my-4">
                            <a href="http://localhost:3000/auth/google" className="border border-gray-300 rounded-full px-2.5 py-2"><i className="fab fa-google"></i></a>
                            {/* <a href="#" className="border border-gray-300 rounded-full px-3.5 py-2"><i className="fab fa-linkedin-in"></i></a> */}
                            <a href="http://localhost:3000/auth/discord" className="border border-gray-300 rounded-full px-4 py-2"><i className="fab fa-discord"></i></a>
                        </div>
                        <span className="text-sm">or use your email for registration</span>
                        <input ref={nameRef} type="text" placeholder="Name" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        {errMsgName !== "" && <div className="text-sm text-red-500">{errMsgName}</div>}
                        <input ref={emailRef} type="email" placeholder="Email" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        {errMsgEmail !== "" && <div className="text-sm text-red-500">{errMsgEmail}</div>}
                        <input ref={passRef} type="text" placeholder="Password" className="w-full p-3 my-2 bg-gray-200 border-none rounded" />
                        {errMsgPass !== "" && <div className="text-sm text-red-500">{errMsgPass}</div>}

                        {errMsgZod !== "" && <div className="text-xs text-red-500">{errMsgZod}</div>}
                        {/* {errMsgZod !== "" && (<div className="text-xs text-red-500" dangerouslySetInnerHTML={{ __html: errMsgZod }} /> )} */}

                        <button
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    console.log("Button clicked");
                                    signup();
                                }
                            } className="bg-primary-500 cursor-pointer text-white font-semibold py-2 px-6 mt-4 rounded-full">Sign Up</button>
                    </form>
                </div>
            </div>
            <footer className="fixed bottom-0 left-0 right-0 text-center text-sm p-3 bg-gray-900 text-white">
                <p>Created with <i className="fa fa-heart text-red-500"></i> by <a href="https://ourWebsite.com" className="text-blue-400">Our Website</a></p>
            </footer>
        </div>
    );
}

