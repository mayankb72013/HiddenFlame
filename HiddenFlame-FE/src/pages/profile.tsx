import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';

interface UserType {
    id: number,
    name: string,
    username: string,
    email: string,
    isOnboarded: boolean,
    age: number,
    gender: string,
    country: string,
    state: string,
    city: string,
    lookingFor: string,
    relStatus: string,
    youAreRather: string[],
    hobbies: string[],
    features: string[],
    about: string
}

export default function Profile() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        async function getInfo() {
            const response = await axios.get("http://localhost:3000/user/profile", {
                withCredentials: true
            });
            setUser(response.data);
        }
        getInfo();
    }, []);

    async function handleLogout() {
        try {
            const response = await axios.get("http://localhost:3000/user/logout", {
                withCredentials: true
            })
            if (response.data.msg === "Logged out") {
                window.location.href = response.data.redirectUrl;
            }
            else if (response.data.msg === "clear it") {
                localStorage.removeItem("token");
                window.location.href = response.data.redirectUrl;
            }
        }
        catch (e) {
            console.log("Logout Failed : ", e);
        }
    }

    return (
        <div className="flex h-screen font-mySans">
            <aside className="w-1/5 bg-background-900 p-6 shadow-xl">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-12">
                    HiddenFlame
                </h1>
            </aside>

            <main className="flex-1 bg-background-950 p-12 overflow-y-auto">
                <h2 className="text-4xl font-bold text-text-400 mb-8 underline">My Profile</h2>

                <div className="flex items-center mb-8">
                    <FaUserCircle className="text-6xl text-text-300 mr-6" />
                    <div>
                        <h3 className="text-2xl font-bold text-text-500">{user?.username}</h3>
                        <p className="text-text-400">{user?.email}</p>
                    </div>
                </div>

                <h2 className='text-3xl font-bold text-text-400 mb-3'>Profile</h2>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold text-text-400">Name:</h4>
                    <p className="text-text-500">{user?.name}</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold text-text-400">Age:</h4>
                    <p className="text-text-500">{user?.age}</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold text-text-400">Gender:</h4>
                    <p className="text-text-500">{user?.gender}</p>
                </div>

                <div className="mb-4">
                    <h4 className="text-xl font-bold text-text-400">Location:</h4>
                    <p className="text-text-500">{`${user?.city} (${user?.state}), ${user?.country}`}</p>
                </div>

                <h2 className='text-3xl font-bold text-text-400 mb-3 pt-5'>About You</h2>
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-text-400">Description:</h4>
                    <p className="text-text-500">{user?.about}</p>
                </div>
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-text-400">Relationship Status:</h4>
                    <p className="text-text-500">{user?.relStatus}</p>
                </div>
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-text-400">You're rather:</h4>
                    {user?.youAreRather.map((e)=><p className="text-text-500">{e}, </p>)}
                </div>
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-text-400">Your Main Hobbies:</h4>
                    {user?.hobbies.map((e)=><p className="text-text-500">{e}, </p>)}
                </div>
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-text-400">Your Distinctive Features:</h4>
                    {user?.features.map((e)=><p className="text-text-500">{e}, </p>)}
                </div>

                {/* Centering Buttons */}
                <div className="flex justify-center space-x-6">
                    <button className="bg-primary-500 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2">
                        <FaEdit /> Edit Profile
                    </button>
                    <button onClick={handleLogout} className="cursor-pointer bg-secondary-500 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </main>
        </div>
    );
} 