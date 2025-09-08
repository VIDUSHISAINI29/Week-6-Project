import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import "./index.css";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  console.log("user nnn = = ",user);
  return user ? children : <Navigate to="/login" replace />;
}

const App = () => {

  return (
 <Router>
      <Navbar/>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute> } />
        {/* <Route path="/portfolio/:id" element={<PrivateRoute><PortfolioDetail /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><UserPortfolio /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/admins-only" element={<PrivateRoute><AdminOnlyPage /></PrivateRoute>} />  */}
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
};



export default App;
