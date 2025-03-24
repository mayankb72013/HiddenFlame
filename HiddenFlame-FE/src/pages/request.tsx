import { useState } from 'react';
import { FaUserCircle, FaHeart, FaEnvelope, FaUserFriends, FaSearch, FaFilter } from 'react-icons/fa';

export default function Requests() {
    const [activeTab, setActiveTab] = useState('matches');
    const [showFilters, setShowFilters] = useState(false);

    const sampleMessages = [
        { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?' },
        { id: 2, name: 'Bob', lastMessage: 'Looking forward to our date!' },
        { id: 3, name: 'Charlie', lastMessage: 'Can we reschedule?' },
        { id: 4, name: 'Diana', lastMessage: 'Had a great time yesterday!' },
        { id: 5, name: 'Eve', lastMessage: 'Let’s meet soon!' }
    ];

    const sampleRequests = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Emily Johnson' }
    ];

    return (
        <div className="flex h-screen font-mySans">
            {/* Sidebar with shadow effect */}
            <aside className="w-1/5 bg-background-900 p-6 shadow-xl">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-12">
                    HiddenFlame
                </h1>

                <ul className="space-y-8">
                    <li className={`text-2xl font-bold ${activeTab === 'matches' ? 'text-primary-500' : 'text-text-300'}`} onClick={() => setActiveTab('matches')}>
                        <FaHeart className="inline mr-4" /> Find Matches
                    </li>
                    <li className={`text-2xl font-bold ${activeTab === 'messages' ? 'text-primary-500' : 'text-text-300'}`} onClick={() => setActiveTab('messages')}>
                        <FaEnvelope className="inline mr-4" /> Messages
                    </li>
                    <li className={`text-2xl font-bold ${activeTab === 'requests' ? 'text-primary-500' : 'text-text-300'}`} onClick={() => setActiveTab('requests')}>
                        <FaUserFriends className="inline mr-4" /> Requests
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-background-950 p-12">
                <nav className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-text-400">Welcome to HiddenFlame</h2>
                    <FaUserCircle className="text-5xl text-text-300 cursor-pointer" />
                </nav>

                {activeTab === 'matches' && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-4xl font-bold text-text-500 mb-6">Discover Your Perfect Match</h3>
                        <div className="w-80 h-80 bg-text-300 rounded-lg mb-8 flex items-center justify-center">
                            Image Placeholder
                        </div>
                        <div className="flex gap-6">
                            <button className="bg-secondary-500 text-white font-bold py-4 px-12 rounded-full text-xl flex items-center gap-3" onClick={() => setShowFilters(true)}>
                                <FaFilter /> Filters
                            </button>
                            <button className="bg-primary-500 text-white font-bold py-4 px-12 rounded-full text-xl flex items-center gap-3">
                                <FaSearch /> Search
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-text-500 mb-6">Your Messages</h3>
                        {sampleMessages.map((msg, index) => (
                            <div key={msg.id} className={`p-4 ${index !== 0 ? 'border-t border-text-200' : ''}`}>
                                <h4 className="text-xl font-bold text-text-400">{msg.name}</h4>
                                <p className="text-text-500">{msg.lastMessage}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-text-500 mb-6">Your Requests</h3>
                        {sampleRequests.map((req, index) => (
                            <div key={req.id} className={`p-4 flex justify-between items-center ${index !== 0 ? 'border-t border-text-200' : ''}`}>
                                <h4 className="text-xl font-bold text-text-400">{req.name}</h4>
                                <div className="space-x-4">
                                    <button className="bg-primary-500 text-white py-2 px-4 rounded-full">Accept</button>
                                    <button className="bg-secondary-500 text-white py-2 px-4 rounded-full">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showFilters && (
                    <div className="absolute top-0 right-0 w-96 h-full bg-background-800 p-8 shadow-lg overflow-auto">
                        <button className="text-text-400 mb-6 text-xl" onClick={() => setShowFilters(false)}>Close</button>
                        <h3 className="text-2xl font-bold text-text-500 mb-6">Apply Filters</h3>
                        <p>Filter options will go here.</p>
                    </div>
                )}
            </main>
        </div>
    );
}