import { BrowserRouter,Routes,Route } from "react-router-dom"
import SignUp from "./pages/signup"
import SignIn from "./pages/signin"
import Dashboard from "./pages/dashboard"
export default function App(){
    
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>
            <Route path="user/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Routes>
      </BrowserRouter>
    )
}
