import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Login from "./components/login";
import Register from "./components/register";
import Landing from "./pages/Landing";
import Alert from "./components/Alert";

function App() {


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
    <Router>
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          {/* add the route to / to landing page when its built */}
          <Route exact path="/" element={<Landing showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/register" element={<Register showAlert={showAlert} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
