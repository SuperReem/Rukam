import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Login from "./pages/Login.page";
// import Login from './views/Login/Login';
import PrivateRoute from "./pages/PrivateRoute.page";
//

import TopNavbar from "./views/TopNavbar/TopNavbar";

import ResetPassword from "./views/Login/ResetPassword";
import ResetPass from "./views/Login/ResetPass";

// Login
import Sidebar from './views/SideNavbar/SideNavbar';


function App() {
 return (


  <BrowserRouter>
     {/* We are wrapping our whole app with UserProvider so that */}
     {/* our user is accessible through out the app from any page*/}
     <UserProvider>
       <Routes>

       {/* <Route exact path="" element={<TopNavbar />} /> */}
       <Route exact path="/login" element={<Login />} />
         <Route exact path="/ResetPassword" element={<ResetPassword />} />
       
         {/* Not here */}
         <Route exact path="/ResetPass" element={<ResetPass />} />

         {/* We are protecting our Home Page from unauthenticated */}
         {/* users by wrapping it with PrivateRoute here. */}
         <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Sidebar/>} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;