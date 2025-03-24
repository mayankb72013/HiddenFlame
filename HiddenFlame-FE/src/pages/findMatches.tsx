import { useState } from 'react';
import { FaUserCircle, FaHeart, FaEnvelope, FaUserFriends, FaSlidersH, FaSearch } from 'react-icons/fa';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('matches');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="flex h-screen font-mySans">
            {/* Sidebar */}
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
                    <div className="flex flex-col items-center justify-center h-[80%]">
                        {/* Tagline and Image Section */}
                        <div className="mb-8 text-center">
                            <h3 className="text-5xl font-bold text-text-500 mb-4">Discover Your Perfect Match</h3>
                        </div>

                        {/* Button Section */}
                        <div className="flex gap-6">
                            <button onClick={() => setIsFilterOpen(true)} className="bg-primary-500 text-white text-2xl px-10 py-4 rounded-full hover:bg-primary-600 flex items-center">
                                <FaSlidersH className="mr-4" /> Filters
                            </button>
                            <button className="bg-secondary-500 text-white text-2xl px-10 flex items-center py-4 rounded-full hover:bg-secondary-600">
                            <FaSearch className='mr-4' /> Search
                            </button>
                        </div>
                    </div>
                )}

                {isFilterOpen && (
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-background-800 p-8 shadow-lg">
                        <h3 className="text-3xl font-bold text-text-500 mb-6">Filters</h3>
                        <button onClick={() => setIsFilterOpen(false)} className="text-white bg-primary-500 px-6 py-2 rounded-full">Close</button>
                    </div>
                )}
            </main>
        </div>
    );
}
