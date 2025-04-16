import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React, { useState } from 'react';
import Profile from "./pages/Profile";
import Chat from "./components/chat";
import HomePage from "./pages/HomePage";
import Alert from "./components/Alert";
import UserState from "./context/user/UserState";
import ForgotPassword from "./components/ForgotPassword"
import Landing from "./components/landing";
import { Navigation } from "lucide-react";
import Navbar from "./components/navbar"
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
function App() {


  const [userId, setUserId] = useState("");

  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  return (
    <>
      <Router>
        <UserState showAlert={showAlert}>
          <Alert alert={alert} />
          <div className="flex-1">
            <Navbar />
            <div className ="pt-16 px-4">
            <Routes>
              <Route exact path="/" element={<Landing showAlert={showAlert} />} />
              <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/profile" element={<Profile showAlert={showAlert} />} />
              <Route path="/login" element={!userId ? <LoginPage showAlert = {showAlert} /> : <Navigate to="/" />} />
              <Route exact path="/register" element ={<RegisterPage />} />
              <Route exact path="/forgotPassword" element={<ForgotPassword showAlert={showAlert} />} />
              <Route exact path="/chat" element={<Chat />} />
            </Routes>
            </div>
            <Toaster />
          </div>
        </UserState>
      </Router>
    </>
  );
}

export default App;
