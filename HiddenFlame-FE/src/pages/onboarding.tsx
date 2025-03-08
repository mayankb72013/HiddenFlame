
export default function OnBoadingPage() {
    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-background-950 font-mySans">
                <div className="bg-white w-96/100 h-95/100 m-8 p-6 rounded-lg shadow-lg text-center flex flex-col gap-10 items-center">
                    <h2 className="text-5xl font-semibold mb-4">Join the Adventure</h2>
                    <form id="onboarding-form" className="space-y-3 flex flex-col gap-10 w-3/4 ">
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="name">Your Name</label>
                            <input type="text" id="name" placeholder="Full Name" required
                                className="w-1/4 p-2 border border-gray-300 rounded-md text-lg" />
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="age">Age</label>
                            <input type="number" id="age" placeholder="Age" required
                                className="w-1/4 ml-26 p-2 border border-gray-300 rounded-md text-lg" />
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="gender">Gender</label>
                            <select id="gender" required className="w-1/4 ml-14 p-2 border border-gray-300 rounded-md text-lg">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="city">City</label>
                            <input type="text" id="city" placeholder="City" required
                                className="w-1/4 ml-26 p-2 border border-gray-300 rounded-md text-lg" />
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="relationType">Looking for </label>
                            <select required id="relationType" className="w-1/4 p-2 border border-gray-300 rounded-md text-lg">
                                <option value="">Looking for</option>
                                <option value="casual">Casual Dating</option>
                                <option value="serious">Serious Relationship</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-6 items-center">
                            <label className="text-text-50 text-3xl font-semibold" htmlFor="about">Tell us about Yourself</label>
                            <textarea id="about" placeholder="Tell us about yourself"
                                className="w-3/4 p-2 border border-gray-300 rounded-md text-lg resize-none"></textarea>
                        </div>

                        <div className="flex justify-center mb-2">
                            <button type="submit"
                                className="bg-primary-500 text-white font-medium p-2 rounded-md w-1/4 text-lg hover:bg-secondary-700">Complete</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}