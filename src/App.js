<<<<<<< Updated upstream
=======
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Login from "./pages/Login";
// import Login from './views/Login/Login';
import PrivateRoute from "./pages/PrivateRoute.page";
//
import TopNavbar from "./views/TopNavbar/TopNavbar";
import Signup from './pages/Signup'
import ForgotPassword from "./views/Passwords/ForgotPassword";
import ResetPass from "./views/Passwords/ResetPass";
// Login
import Sidebar from "./views/SideNavbar/SideNavbar";
import { useAuthContext } from './hooks/useAuthContext'
>>>>>>> Stashed changes

import './App.css';
import Sidebar from './components/SideNavbar/SideNavbar';

function App() {
  return (
<<<<<<< Updated upstream
    <div className="App">
      <Sidebar/>
    </div>
=======



<div className="App">
<BrowserRouter>
  <div className="pages">
    <Routes>
    <Route 
        path="/" 
        element={ user? <Sidebar /> :  <Navigate to="/login" />} 
      />
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" />} 
        />

<Route 
        path="/forgotPassword" 
        element={<ForgotPassword />} 
      />
 <Route path="/resetPassword/:id/:token" element={<ResetPass />} />


        {/* //temp */}
      <Route 
        path="/signup" 
        element={<Signup />} 
      />
        <Route path="*" element={<Login />} />
     
    </Routes>
  </div>
</BrowserRouter>
</div>


>>>>>>> Stashed changes
  );
}

export default App;
