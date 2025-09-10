import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import NetworkPage from "./pages/NetworkPage";
import JobPage from "./pages/JobPage";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import ConnectionsAndRequestsPage from "./pages/ConnectionsAndRequestsPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Toaster } from "sonner";

import "./index.css";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  // console.log("user  = = ",user);
  return user ? children : <Navigate to="/login" replace />;
}

const App = () => {
  const { user } = useContext(AuthContext);

  return (
 <Router>
       <Toaster position="top-right" richColors />
      {user
        && 
        <Navbar/>
      }
       {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-pink-400/30 blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 delay-500 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-2xl animate-pulse" />
      </div>
   
          {/* Page content with bottom padding for mobile navbar */}
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute> } />
         <Route path="/network" element={<PrivateRoute><NetworkPage /></PrivateRoute> } />
         <Route path="/network/connections-and-requests" element={<PrivateRoute><ConnectionsAndRequestsPage /></PrivateRoute> } />
         <Route path="/jobs" element={<PrivateRoute><JobPage /></PrivateRoute> } />
         <Route path="/jobs/applied-jobs" element={<PrivateRoute><AppliedJobsPage /></PrivateRoute> } />
        {/* <Route path="/portfolio/:id" element={<PrivateRoute><PortfolioDetail /></PrivateRoute>} /> */}
     
      </Routes>
      </main>
      {/* <Footer/> */}
    </Router>
  );
};



export default App;
