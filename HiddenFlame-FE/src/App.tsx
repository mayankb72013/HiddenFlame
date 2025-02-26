import { BrowserRouter,Routes,Route } from "react-router-dom"
import SignUp from "./pages/signup"
import SignIn from "./pages/signin"
export default function App(){
    
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>
          </Routes>
      </BrowserRouter>
    )
}
