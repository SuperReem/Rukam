import "./App.css";
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
import Sidebar from "./views/SideNavbar/SideNavbar";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />

          {/* Not here */}
          <Route exact path="/ResetPass" element={<ResetPass />} />

          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Sidebar />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
