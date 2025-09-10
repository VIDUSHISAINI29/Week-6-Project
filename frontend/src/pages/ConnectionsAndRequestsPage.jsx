import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avtar";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { api } from "../utils/axios.js";
import { toast } from "sonner";

const ConnectionsAndRequestsPage = () => {
  const navigate = useNavigate(); // ✅ initialize navigate
  const { user } = useContext(AuthContext);
  const { requests, requestResponded, respondToRequest, requestSent } =
    useContext(SocketContext);

  const [connections, setConnections] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [cancelRequest, setCancelRequest] = useState(false);

  const deleteConnectionRequest = async (reqId) => {
    try {
      await api.delete(`/delete-request/${reqId}`);
      setCancelRequest(!cancelRequest);
      toast.success("Connection request canceled");
    } catch (error) {
      console.log("Error in deleting already sent connection request", error.message);
      toast.error("Failed to cancel request");
    }
  };

  const handleRespond = async (reqId, action) => {
    try {
      await respondToRequest(reqId, action);
      toast.success(
        action === "accepted"
          ? "Connection request accepted!"
          : "Connection request rejected!"
      );
    } catch (err) {
      console.log("Error responding to request:", err.message);
      toast.error("Failed to respond to request");
    }
  };

  // Fetch accepted connections
  useEffect(() => {
    const fetchUserConnections = async () => {
      try {
        const res = await api.get(`/user-connections/${user._id}`);
        setConnections(res.data.connections || []);
      } catch (error) {
        console.log("Error fetching connections: ", error.message);
        toast.error("Failed to fetch your connections");
      }
    };
    fetchUserConnections();
  }, [requestResponded, cancelRequest, user._id]);

  // Fetch received requests
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const res = await api.get(`/connection-requests/${user._id}`);
        setReceivedRequests(res.data.requests || []);
      } catch (error) {
        console.log("Error fetching received requests:", error.message);
        toast.error("Failed to fetch received requests");
      }
    };
    fetchReceivedRequests();
  }, [user._id, cancelRequest, requestResponded]);

  // Separate sent requests
  useEffect(() => {
    const getSentRequests = async () => {
      try {
        const res = await api.get(`/get-sent-requests/${user._id}`);
        setSentRequests(res.data.requests || []);
      } catch (error) {
        console.log("Error fetching sent requests: ", error.message);
        toast.error("Failed to fetch sent requests");
      }
    };
    getSentRequests();
  }, [requestSent, cancelRequest, user._id]);

  return (
    <div className="container px-6 py-8 mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate("/network")} // ✅ navigate to /network
        >
          &larr; Back
        </Button>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Connections */}
        <Card className="h-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">Your Connections</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {connections.length > 0 ? (
              connections.map((connection) => (
                <div
                  key={connection._id}
                  className="flex items-center space-x-3 hover:cursor-pointer"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={connection.profilePic}
                      alt={connection.name}
                    />
                    <AvatarFallback className="text-sm text-white bg-gradient-to-r from-green-500 to-blue-500">
                      {connection.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{connection.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No connections yet</p>
            )}
          </CardContent>
        </Card>

        {/* Sent Requests */}
        <Card className="h-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">Requests You Sent</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {sentRequests.length > 0 ? (
              sentRequests.map((req) => (
                <div
                  key={req._id}
                  className="flex items-center justify-between space-x-3"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={req.to.profilePic} alt={req.to.name} />
                      <AvatarFallback className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500">
                        {req.to.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium truncate">{req.to.name}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => deleteConnectionRequest(req._id)}
                  >
                    Cancel
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No requests sent</p>
            )}
          </CardContent>
        </Card>

        {/* Received Requests */}
        <Card className="h-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">Requests You Received</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {receivedRequests.length > 0 ? (
              receivedRequests.map((req) => (
                <div
                  key={req._id}
                  className="flex items-center justify-between space-x-3"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={req.from.profilePic} alt={req.from.name} />
                      <AvatarFallback className="text-sm text-white bg-gradient-to-r from-pink-500 to-red-500">
                        {req.from.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium truncate">{req.from.name}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => handleRespond(req._id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleRespond(req._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No new requests received</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionsAndRequestsPage;
