import { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const youAreRather = ["Ambitious", "Attentive", "Bold", "Adventurer", "Chatterbox",
    "Bon vivant", "Capricious", "Funny", "Extrovert", "Party animal",
    "Generous", "Gourmet", "Impatient", "Clumsy", "Open-minded",
    "Patient", "Reserved", "Dreamer", "Romantic", "Sensitive",
    "Sociable", "Teaser", "Shy"];

const hobbies = ["Comics/Manga", "Bar/Discotheque", "DIY/Decor", "Cinema/Theater", "Concert/Show",
    "Kitchen/Restaurant", "Exhibition/Museum", "Gardening", "Video games", "Reading",
    "Music", "Shopping", "Sport", "TV/Series", "Journey"];

const features = ["Loves animals", "Beard/Mustache", "Smoker", "Glasses", "Eat organic",
    "Eat everything", "Doesn't like animals", "Does not tolerate smoke", "Non-smoker",
    "Piercing(s)", "Freckles", "Tattoo(s)", "Tolerates smoke", "Vegan", "Vegetarian"];

export default function FindMatches() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [fromAge, setFromAge] = useState<number>(18);
    const [toAge, setToAge] = useState(40);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(e.currentTarget.value);
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[80%]">
                <div className="mb-8 text-center">
                    <h3 className="text-5xl font-bold text-text-500 mb-4">Discover Your Perfect Match</h3>
                </div>

                <div className="flex gap-6">
                    <button onClick={() => setIsFilterOpen(true)} className="bg-primary-500 text-white text-2xl px-10 py-4 rounded-full hover:bg-primary-600 flex items-center">
                        <FaSlidersH className="mr-4" /> Filters
                    </button>
                    <button form="filterInputs" type="submit" className="bg-secondary-500 text-white text-2xl px-10 flex items-center py-4 rounded-full hover:bg-secondary-600">
                        <FaSearch className='mr-4' /> Search
                    </button>
                </div>
            </div>
            {isFilterOpen && (
                <div className="absolute top-0 right-0 w-1/4 h-full bg-background-800 p-8 shadow-lg overflow-y-auto">
                    <div className="flex items-start gap-5 mb-8">
                        <button onClick={() => setIsFilterOpen(false)} className="text-primary-500 text-4xl">✖</button>
                        <h3 className="text-3xl font-bold text-text-500">Search for members</h3>
                    </div>
                    <form onSubmit={handleSubmit} id="filterInputs" className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">I am looking for</h2>
                            <select name="lookingFor" id="lookingFor" className="w-full p-2 bg-background-700 text-text-50 rounded-md">
                                <option value="male">A Man</option>
                                <option value="female">A Woman</option>
                            </select>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Who is between</h2>
                            <div className="flex justify-between">
                                <div>
                                    <label htmlFor="fromAge" className="block text-text-400">From Age: {fromAge}</label>
                                    <input type="range" id="fromAge" defaultValue={18} min={18} max={40} onChange={(e) => setFromAge(Number(e.target.value))} className="w-full" />
                                </div>
                                <div>
                                    <label htmlFor="toAge" className="block text-text-400">To Age: {toAge}</label>
                                    <input type="range" id="toAge" defaultValue={40} min={18} max={40} onChange={(e) => setToAge(Number(e.target.value))} className="w-full" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Who is</h2>
                            <select name="rather" id="rather" className="w-full p-2 bg-background-700 text-text-50 rounded-md">
                                {youAreRather.map((trait, index) => (
                                    <option key={index} value={trait}>{trait}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Who loves</h2>
                            <select name="hobbies" id="hobbies" className="w-full p-2 bg-background-700 text-text-50 rounded-md">
                                {hobbies.map((activity, index) => (
                                    <option key={index} value={activity}>{activity}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Distinguishing Features</h2>
                            <select name="features" id="features" className="w-full p-2 bg-background-700 text-text-50 rounded-md">
                                {features.map((preference, index) => (
                                    <option key={index} value={preference}>{preference}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
} 
