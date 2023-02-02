import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./views/Passwords/ResetPassword";
import EmailResetPassword from "./views/Passwords/EmailResetPassword";
import ResetPass from "./views/Passwords/ResetPass";
import HomePage from "./views/extraPages/HomePage";
import PrivacyPolicy from "./views/extraPages/PrivacyPolicy";
import Sidebar from "./views/SideNavbar/SideNavbar";
import SidebarEmployee from "./views/SideNavbar/SideNavbar_Employee";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  user.userType === "admin" ? (
                    <Sidebar />
                  ) : (
                    <SidebarEmployee />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/:something"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route path="/forgotPassword" element={<ResetPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPass />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route
              path="/EmailResetPassword"
              element={<EmailResetPassword />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
