import axios from "axios";
import { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import UserCard from "./card";
import Loader from "../components/loader";

const youAreRather = ["--", "Ambitious", "Attentive", "Bold", "Adventurer", "Chatterbox",
    "Bon vivant", "Capricious", "Funny", "Extrovert", "Party animal",
    "Generous", "Gourmet", "Impatient", "Clumsy", "Open-minded",
    "Patient", "Reserved", "Dreamer", "Romantic", "Sensitive",
    "Sociable", "Teaser", "Shy"];

const hobbies = ["--", "Comics/Manga", "Bar/Discotheque", "DIY/Decor", "Cinema/Theater", "Concert/Show",
    "Kitchen/Restaurant", "Exhibition/Museum", "Gardening", "Video games", "Reading",
    "Music", "Shopping", "Sport", "TV/Series", "Journey"];

const features = ["--", "Loves animals", "Beard/Mustache", "Smoker", "Glasses", "Eat organic",
    "Eat everything", "Doesn't like animals", "Does not tolerate smoke", "Non-smoker",
    "Piercing(s)", "Freckles", "Tattoo(s)", "Tolerates smoke", "Vegan", "Vegetarian"];

interface UserType {
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    isOnboarded: boolean
    age: number,
    gender: string,
    country: string,
    state: string,
    city: string,
    lookingFor: string,
    relStatus: string,
    youAreRather: string,
    hobbies: string,
    features: string,
    about: string,
}

export default function FindMatches() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [fromAge, setFromAge] = useState<number>(18);
    const [toAge, setToAge] = useState(40);
    const [loader, setLoader] = useState(false);
    const [matches, setMatches] = useState<UserType[]>([]);
    const [noMatchesFound, setNoMatchesFound] = useState<boolean>(true);  // New state for no matches found message

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const lookingFor = (e.currentTarget.querySelector("#lookingFor") as HTMLSelectElement)?.value;
        const fromAge = Number((e.currentTarget.querySelector("#fromAge") as HTMLSelectElement)?.value);
        const toAge = Number((e.currentTarget.querySelector("#toAge") as HTMLSelectElement)?.value);

        const youAreRather = Array.from((e.currentTarget.querySelector("#rather") as HTMLSelectElement)?.selectedOptions ?? [])
            .map(option => option.value);

        const hobbies = Array.from((e.currentTarget.querySelector("#hobbies") as HTMLSelectElement)?.selectedOptions ?? [])
            .map(option => option.value);

        const features = Array.from((e.currentTarget.querySelector("#features") as HTMLSelectElement)?.selectedOptions ?? [])
            .map(option => option.value);

        setNoMatchesFound(false);  // Hide "No matches found" message when search starts
        setLoader(true);  // Set loader to true before the request
        try {
            const response = await axios.post("http://localhost:3000/user/getMatches", {
                lookingFor,
                fromAge,
                toAge,
                youAreRather,
                hobbies,
                features
            }, {
                withCredentials: true
            });
            setMatches(response.data.matchedUsers);
            if (response.data.matchedUsers.length === 0) {
                setNoMatchesFound(true);  // Set "No matches found" message if no matches are returned
            }
        } catch (error) {
            console.error("Error fetching matches:", error);
        } finally {
            setLoader(false);  // Set loader to false after the request completes
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full overflow-hidden">
            <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-5xl font-bold text-text-500 mb-8">Discover Your Perfect Match</h3>

                <div className="flex gap-6 h-full">
                    <button onClick={() => setIsFilterOpen(true)} className="bg-primary-500 text-white text-2xl px-10 py-4 rounded-full hover:bg-primary-600 flex items-center">
                        <FaSlidersH className="mr-4" /> Filters
                    </button>
                    <button form="filterInputs" type="submit" className="bg-secondary-500 text-white text-2xl px-10 flex items-center py-4 rounded-full hover:bg-secondary-600">
                        <FaSearch className='mr-4' /> Search
                    </button>
                </div>

                <div className="w-full h-80/100 overflow-auto m-5 p-4 flex flex-wrap gap-5 justify-center items-start">
                    {loader && <Loader />}
                    {noMatchesFound && !loader && (
                        <p className="text-text-500">No matches found. Adjust your filters and try again.</p>
                    )}
                    {matches?.length > 0 && matches.map((user) => (
                        <UserCard username={user.username} country={user.country} state={user.state} city={user.city} key={user.id} />
                    ))}
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
                                <option value="--">--</option>
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
                            <select name="rather" id="rather" className="w-full p-2 bg-background-700 text-text-50 rounded-md" multiple>
                                {youAreRather.map((trait, index) => (
                                    <option key={index} value={trait}>{trait}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Who loves</h2>
                            <select name="hobbies" id="hobbies" className="w-full p-2 bg-background-700 text-text-50 rounded-md" multiple>
                                {hobbies.map((activity, index) => (
                                    <option key={index} value={activity}>{activity}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Distinguishing Features</h2>
                            <select name="features" id="features" className="w-full p-2 bg-background-700 text-text-50 rounded-md" multiple>
                                {features.map((preference, index) => (
                                    <option key={index} value={preference}>{preference}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
