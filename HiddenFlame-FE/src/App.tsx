import { BrowserRouter,Routes,Route } from "react-router-dom"
import SignUp from "./pages/signup"
import SignIn from "./pages/signin"
import Dashboard from "./pages/dashboard"
import OnBoadingPage from "./pages/onboarding"
import FindMatches from "./pages/findMatches"
import Messages from "./pages/messages"
import Requests from "./pages/request"
import Profile from "./pages/profile"
import MatchCard from "./pages/card"
export default function App(){
    
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>
            <Route path="/user/onboarding" element={<OnBoadingPage></OnBoadingPage>}></Route>
            <Route path="/user/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/user/find-matches" element={<FindMatches></FindMatches>}></Route>
            <Route path="/user/messages" element={<Messages></Messages>}></Route>
            <Route path="/user/requests" element={<Requests></Requests>}></Route>
            <Route path="/user/profile" element={<Profile></Profile>}></Route>
            <Route path="/user/card" element={<MatchCard username="Mayank" country="India" state="tel" city="hyd"></MatchCard>}></Route>
          </Routes>
      </BrowserRouter>
    )
}
