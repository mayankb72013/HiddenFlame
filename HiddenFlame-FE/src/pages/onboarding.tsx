import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import { City, Country, State } from "react-country-state-city/dist/esm/types";
import "react-country-state-city/dist/react-country-state-city.css";
export default function OnBoadingPage() {
    const [country, setCountry] = useState<Country | null>(null);
    const [currentState, setCurrentState] = useState<State | null>(null);
    const [currentCity, setCurrentCity] = useState<City | null>(null);
    const [rather,setRather] = useState<string[]>([]);
    const [hobbies,setHobbies] = useState<string[]>([]);
    const [features,setFeatures] = useState<string[]>([]);

    const [error, setError] = useState("");
    const [otherErrors, setOtherErrors] = useState("");
    const [arrayError1,setArrayError1] = useState("");
    const [arrayError2,setArrayError2] = useState("");
    const [arrayError3,setArrayError3] = useState("");

    useEffect(() => {
        async function checkOnboardingStatus() {
          try {
            const response = await axios.get("http://localhost:3000/user/authSuccess", {
              withCredentials: true
            });
      
            if (response.data.redirectUrl === "http://localhost:5173/user/dashboard") {
              window.location.href = response.data.redirectUrl;
            }
          } catch (error) {
            console.error("Error checking onboarding status:", error);
          }
        }
        checkOnboardingStatus();
      }, []);


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
        const { checked, id } = e.target;
        setState(prev => checked ? [...prev, id] : prev.filter(item => item !== id));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setError("");
        setOtherErrors("");
        setArrayError1("");
        setArrayError2("");
        setArrayError3("");
        event.preventDefault();

        const formData = event.currentTarget;

        const data = {
            //@ts-ignore
            username: formData.querySelector("#name")?.value,
            //@ts-ignore
            age: parseInt(formData.querySelector("#age")?.value),
            //@ts-ignore
            gender: formData.querySelector("#gender")?.value,
            country: country?.name,
            state: currentState?.name,
            city: currentCity?.name,
            //@ts-ignore
            lookingFor: formData.querySelector("#relationType")?.value,
            //@ts-ignore
            about: formData.querySelector("#about")?.value,
            //@ts-ignore
            relStatus: formData.querySelector("#status")?.value,
            youAreRather: rather,
            hobbies: hobbies,
            features: features
        }
        if (data.age < 18) {
            setError("Age should be greater than 18");
        }
        else if(rather.length == 0){
            setArrayError1("Choose atleast 1");
        }
        else if(hobbies.length == 0){
            setArrayError2("Choose atleast 1");
        }
        else if(features.length == 0){
            setArrayError3("Choose atleast 1");
        }
        if (error === "" && arrayError1 === "" && arrayError2 === "" && arrayError3 === "") {
            try {
                const response = await axios.put("http://localhost:3000/user/onboarding", data, {
                    withCredentials: true
                });
                console.log(response.data);
                if (response.data.redirectUrl) {
                    window.location.href = response.data.redirectUrl;
                }
            }
            catch (e: any) {
                console.log(e.response);
                const parsed = JSON.parse(e.response.data.msg);
                const errorMessage = parsed.map((error: { message: string }) => error.message).join(" , ");
                console.log(errorMessage);

                setOtherErrors(errorMessage);
            }
        }

    }

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-primary-700 font-mySans">
                <div className="bg-white w-96/100 h-95/100 m-8 p-6 rounded-lg shadow-lg text-center flex flex-col gap-10 items-center overflow-y-auto">
                    <h2 className="text-5xl font-semibold mb-4">Join the Adventure</h2>
                    <form onSubmit={handleSubmit} id="onboarding-form" className="space-y-3 flex flex-col gap-10 w-3/4 ">
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="name">Username*</label>
                            <input type="text" id="name" placeholder="Username" required
                                className="w-1/4 p-2 border border-gray-300 rounded-md text-lg" />
                        </div>
                        <div className="flex items-center justify-around gap-25">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="age">Age*</label>
                            <div className="flex flex-col w-25/100 justify-end">
                                <input type="tel" id="age" placeholder="Age" required
                                    className="w-full ml-0 p-2 border border-gray-300 rounded-md text-lg" />
                                {(error !== "") ? (<div className="text-red-500">{error}</div>) : ("")}
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="gender">Gender*</label>
                            <select aria-required id="gender" required className="w-1/4 ml-14 p-2 border border-gray-300 rounded-md text-lg">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="country">Country*</label>
                            <div className="w-1/4 ml-10 p-2 rounded-md text-lg">
                                <CountrySelect
                                    containerClassName="form-group"
                                    inputClassName=""
                                    onChange={(_country) => setCountry(_country as Country)}
                                    onTextChange={(_txt) => console.log(_txt)}
                                    placeHolder="Select Country"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="state">State*</label>
                            <div className="w-1/4 ml-20 p-2 rounded-md text-lg">
                                <StateSelect
                                    //@ts-ignore
                                    countryid={country?.id}
                                    containerClassName="form-group"
                                    inputClassName=""
                                    onChange={(_state) => setCurrentState(_state as State)}
                                    onTextChange={(_txt) => console.log(_txt)}
                                    //@ts-ignore
                                    defaultValue={currentState}
                                    placeHolder="Select State"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="city">City*</label>
                            <div className="w-1/4 ml-20 p-2 rounded-md text-lg">
                                <CitySelect
                                    //@ts-ignore
                                    countryid={country?.id}
                                    //@ts-ignore
                                    stateid={currentState?.id}
                                    onChange={(_city) => setCurrentCity(_city as City)}
                                    //@ts-ignore
                                    defaultValue={currentCity}
                                    placeHolder="Select City"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="relationType">Looking for </label>
                            <select defaultValue={"casual"} id="relationType" className="w-1/4 p-2 border border-gray-300 rounded-md text-lg">
                                <option value="casual">Casual Dating</option>
                                <option value="serious">Serious Relationship</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-around">
                            <label className="text-text-50 text-3xl font-medium" htmlFor="status">Relationship status </label>
                            <select defaultValue={"bachelor"} id="status" className="w-1/5 p-2 border border-gray-300 rounded-md text-lg">
                                <option value="bachelor">Bachelor</option>
                                <option value="divorcee">Divorcee</option>
                                <option value="separated">Separated</option>
                                <option value="widower">Widower</option>
                            </select>
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold">You are rather</h2>
                            {(arrayError1 !== "") && (<div className="text-red-500">{arrayError1}</div>)}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {["Ambitious", "Attentive", "Bold", "Adventurer", "Chatterbox",
                                    "Bon vivant", "Capricious", "Funny", "Extrovert", "Party animal",
                                    "Generous", "Gourmet", "Impatient", "Clumsy", "Open-minded",
                                    "Patient", "Reserved", "Dreamer", "Romantic", "Sensitive",
                                    "Sociable", "Teaser", "Shy"].map((trait, index) => (
                                        <div key={index} aria-required className="flex items-center">
                                            <input onChange={(e)=>handleCheckboxChange(e,setRather)} type="checkbox" id={trait} className="w-5 h-5 mr-2 accent-primary-500" />
                                            <label htmlFor={trait} className="text-text-50 text-lg">{trait}</label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold">Your Hobbies</h2>
                            {(arrayError2 !== "") && (<div className="text-red-500">{arrayError2}</div>)}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {["Comics/Manga", "Bar/Discotheque", "DIY/Decor", "Cinema/Theater", "Concert/Show",
                                    "Kitchen/Restaurant", "Exhibition/Museum", "Gardening", "Video games", "Reading",
                                    "Music", "Shopping", "Sport", "TV/Series", "Journey"].map((activity, index) => (
                                        <div key={index} aria-required className="flex items-center">
                                            <input onChange={(e)=>handleCheckboxChange(e,setHobbies)} type="checkbox" id={activity} className="w-5 h-5 mr-2 accent-secondary-500" />
                                            <label htmlFor={activity} className="text-text-50 text-lg">{activity}</label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold">Distinctive Features</h2>
                            {(arrayError3 !== "") && (<div className="text-red-500">{arrayError3}</div>)}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {["Loves animals", "Beard/Mustache", "Smoker", "Glasses", "Eat organic",
                                    "Eat everything", "Doesn't like animals", "Does not tolerate smoke", "Non-smoker",
                                    "Piercing(s)", "Freckles", "Tattoo(s)", "Tolerates smoke", "Vegan", "Vegetarian"].map((preference, index) => (
                                        <div key={index} aria-required className="flex items-center">
                                            <input onChange={(e)=>handleCheckboxChange(e,setFeatures)} type="checkbox" id={preference} className="w-5 h-5 mr-2 accent-accent-500" />
                                            <label htmlFor={preference} className="text-text-50 text-lg">{preference}</label>
                                        </div>
                                    ))}
                            </div>
                        </div>



                        <div className="flex flex-col gap-6 items-center">
                            <label className="text-text-50 text-3xl font-semibold" htmlFor="about">Tell us about Yourself</label>
                            <textarea id="about" placeholder="Tell us about yourself"
                                className="w-3/4 p-2 border border-gray-300 rounded-md text-lg resize-none"></textarea>
                        </div>
                        <div className="flex flex-col items-center gap-4 justify-center w-full">
                            {(otherErrors !== "") && (<div className="text-red-500">{otherErrors}</div>)}
                            <button type="submit"
                                className="bg-primary-500 text-white font-medium p-2 rounded-md w-1/4 text-lg hover:bg-secondary-700">Complete</button>
                        </div>
                    </form>
                </div>
            </div>
        </>


    )
}