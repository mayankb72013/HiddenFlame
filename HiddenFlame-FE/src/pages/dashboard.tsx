import axios from "axios";
import { useEffect, useState } from "react"

export default function Dashboard(){
    const [message,setMessage] = useState();

    useEffect(()=>{
        async function getInfo() {
            try{
                const response = await axios.get("http://localhost:3000/user/dashboard",{
                    withCredentials: true
                });
                const profileInfo = response.data;
                setMessage(profileInfo);
            }catch (e: any){
                console.log(e);
                console.log("Error fetching error message",e.message);
                console.log("Error fetching error response data",e.response.data);
                console.log("Error fetching error message status",e.message.status);
            }
        }
        getInfo()
    },[])


    return(
        <div>
            {message ? JSON.stringify(message) : "Loading...."}
        </div>
    )
}