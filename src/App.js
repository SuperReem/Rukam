import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Login from "./pages/Login";
// import Login from './views/Login/Login';
import PrivateRoute from "./pages/PrivateRoute.page";
//
import TopNavbar from "./views/TopNavbar/TopNavbar";
import Signup from './pages/Signup'
import ResetPassword from "./views/Passwords/ResetPassword";
import ResetPass from "./views/Passwords/ResetPass";
// Login
import Sidebar from "./views/SideNavbar/SideNavbar";
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { user } = useAuthContext()

  return (



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

        {/* //temp */}
      <Route 
        path="/signup" 
        element={<Signup />} 
      />
     
    </Routes>
  </div>
</BrowserRouter>
</div>


  );
}
export default App;
