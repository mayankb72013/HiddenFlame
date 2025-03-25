import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomNav({ text }: { text: string }) {

    const navigate = useNavigate();

    function goToProfile() {
        navigate("/user/profile")
    }

    return (
        <>
            <nav className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-text-300">{text}</h2>
                <FaUserCircle onClick={goToProfile} className="text-5xl text-text-300 cursor-pointer" />
            </nav>
        </>
    )
}