// context/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../utils/axios.js";
import { AuthContext } from "./AuthContext.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const{ user} = useContext(AuthContext)
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [requests, setRequests] = useState([]); // store incoming requests
  const [requestResponded, setRequestResponded] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
  if (!user || !user._id) return;   // ✅ Check if user exists first
  const userId = user._id;

  const newSocket = io(backendUrl, {
    query: { userId },
    autoConnect: true,
  });

  setSocket(newSocket);

  newSocket.on("get online users", (users) => {
    setOnlineUsers(users);
  });

  newSocket.on("connection-request", (data) => {
    console.log("New request received:", data);
    setRequests((prev) => [...prev, data]);
  });

  newSocket.on("ConnectionRequestAccepted", (data) => {
    console.log("Your request was accepted:", data);
  });

  return () => {
    newSocket.off("get online users");
    newSocket.off("connection-request");
    newSocket.off("ConnectionRequestAccepted");
    newSocket.disconnect();
    setSocket(null);
  };
}, [user]);   // ✅ safer dependency


  // ---------------- API CALLS ----------------
  const sendConnectionRequest = async (toUserId) => {
    try {
      const res = await api.post(`${backendUrl}/api/send-connection-request`, {
          toUserId,
        fromUserId: user._id,
      });
      setRequestSent(!requestSent);
      return res.data;
    } catch (err) {
      console.error("Error sending connection request:", err.response?.data || err.message);
    }
  };


  const getConnectionRequests = async () => {
    try {
        const res = await api.get(`${backendUrl}/api/connection-requests/${user._id}`);
        setRequests(res.data.requests);
        console.log("Fetched requests:", res.data.requests);
    } catch (error) {
        console.log("Error fetching connection requests:", error.message);
    }
  }

  const respondToRequest = async (requestId, action) => {
    try {
      const res = await api.put(`${backendUrl}/api/respond-connection-request/${requestId}`, {
        action,
      });
   setRequestResponded(!requestResponded);
      return res.data;
    } catch (err) {
      console.error("Error responding to request:", err.response?.data || err.message);
    }
  };


  


  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, requests, sendConnectionRequest, respondToRequest, getConnectionRequests, requestResponded, requestSent }}
    >
      {children}
    </SocketContext.Provider>
  );
};

