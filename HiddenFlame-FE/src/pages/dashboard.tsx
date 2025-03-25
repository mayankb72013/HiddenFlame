// import axios from "axios";
// import { useEffect, useState } from "react"

// export default function Dashboard(){
//     const [message,setMessage] = useState();

//     useEffect(()=>{
//         async function getInfo() {
//             try{
//                 const response = await axios.get("http://localhost:3000/user/dashboard",{
//                     withCredentials: true
//                 });
//                 const profileInfo = response.data;
//                 setMessage(profileInfo);
//             }catch (e: any){
//                 console.log(e);
//                 console.log("Error fetching error message",e.message);
//                 console.log("Error fetching error response data",e.response.data);
//                 console.log("Error fetching error message status",e.message.status);
//             }
//         }
//         getInfo()
//     },[])


//     return(
//         <div>
//             {message ? JSON.stringify(message) : "Loading...."}
//         </div>
//     )
// }

import { useState } from 'react';
import { FaUserCircle, FaHeart, FaEnvelope, FaUserFriends } from 'react-icons/fa';
import FindMatches from './findMatches';
import Messages from './messages';
import CustomNav from './customNav';
import Requests from './request';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('matches');
    // const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="flex h-screen font-mySans">
            {/* Sidebar */}
            <aside className="w-1/5 bg-background-900 p-6 drop-shadow-xl">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-12">
                    HiddenFlame
                </h1>

                <ul className="space-y-6">
                    <li className={`text-2xl font-bold cursor-pointer ${activeTab === 'matches' ? 'text-primary-500' : 'text-text-300'}`} onClick={() => setActiveTab('matches')}>
                        <FaHeart className="inline mr-4" /> Find Matches
                    </li>
                    <li className={`text-2xl font-bold cursor-pointer ${activeTab === 'messages' ? 'text-primary-500' : 'text-text-300'}`} onClick={() => setActiveTab('messages')}>
                        <FaEnvelope className="inline mr-4" /> Messages
                    </li>
                    <li className={`text-2xl font-bold cursor-pointer ${activeTab === 'requests' ? 'text-primary-500' : 'text-text-300'}`} onClick={() => setActiveTab('requests')}>
                        <FaUserFriends className="inline mr-4" /> Requests
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-background-950 p-12">
                    {activeTab === 'matches' && <CustomNav text='Find Matches'></CustomNav>}
                    {activeTab === 'messages' && <CustomNav text='Your Messages'></CustomNav>}
                    {activeTab === 'requests' && <CustomNav text='Requested'></CustomNav>}
                <section>
                    {activeTab === 'matches' && <FindMatches></FindMatches>}
                    {activeTab === 'messages' && <Messages></Messages>}
                    {activeTab === 'requests' && <Requests></Requests>}
                </section>
            </main>
        </div>
    );
}
