import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';

export default function Profile() {
    const user = {
        name: 'Mayank Balmoori',
        email: 'mayank@example.com',
        age: 22,
        location: 'Hyderabad, India',
        bio: 'Full Stack Developer passionate about building modern web applications.',
    };

    return (
        <div className="flex h-screen font-mySans">
            {/* Sidebar with shadow effect */}
            <aside className="w-1/5 bg-background-900 p-6 shadow-xl">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-12">
                    HiddenFlame
                </h1>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-background-950 p-12">
                <h2 className="text-3xl font-bold text-text-400 mb-8">My Profile</h2>

                <div className="bg-background-800 p-8 rounded-lg shadow-lg w-2/3">
                    <div className="flex items-center mb-8">
                        <FaUserCircle className="text-6xl text-text-300 mr-6" />
                        <div>
                            <h3 className="text-2xl font-bold text-text-500">{user.name}</h3>
                            <p className="text-text-400">{user.email}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-xl font-bold text-text-400">Age:</h4>
                        <p className="text-text-500">{user.age}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-xl font-bold text-text-400">Location:</h4>
                        <p className="text-text-500">{user.location}</p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xl font-bold text-text-400">Bio:</h4>
                        <p className="text-text-500">{user.bio}</p>
                    </div>

                    <div className="flex space-x-6">
                        <button className="bg-primary-500 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2">
                            <FaEdit /> Edit Profile
                        </button>
                        <button className="bg-secondary-500 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}