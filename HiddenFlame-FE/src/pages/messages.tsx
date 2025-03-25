import { useState } from 'react';
import { FaUserCircle, FaHeart, FaEnvelope, FaUserFriends, FaSearch, FaFilter } from 'react-icons/fa';

export default function Messages() {
    const sampleMessages = [
        { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?' },
        { id: 2, name: 'Bob', lastMessage: 'Looking forward to our date!' },
        { id: 3, name: 'Charlie', lastMessage: 'Can we reschedule?' },
        { id: 4, name: 'Diana', lastMessage: 'Had a great time yesterday!' },
        { id: 5, name: 'Eve', lastMessage: 'Let’s meet soon!' }
    ];

    return (
        <div className="flex h-screen font-mySans">
            {/* Main Content */}
            <main className="flex-1 bg-background-950 p-12">
                {/* <nav className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-text-400">Your Messages</h2>
                    <FaUserCircle className="text-5xl text-text-300 cursor-pointer" />
                </nav> */}

                <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-text-500 mb-6"></h3>
                    {sampleMessages.map((msg) => (
                        <div key={msg.id} className="bg-background-800 p-4 rounded-lg shadow-md">
                            <h4 className="text-xl font-bold text-text-400">{msg.name}</h4>
                            <p className="text-text-500">{msg.lastMessage}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
