import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, UserPlus, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avtar";
import Badge from "../components/ui/Badge";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios.js";
import { SocketContext } from "../context/SocketContext";
import { toast } from "sonner";

const NetworkPage = () => {
   const { user } = useContext(AuthContext);
   const {
      requests,
      getConnectionRequests,
      respondToRequest,
      requestResponded,
      sendConnectionRequest,
      requestSent,
   } = useContext(SocketContext);
   const [usersArray, setUsersArray] = useState([]);
   const [connections, setConnections] = useState([]);
   const [requestLocalArray, setRequestLocalArray] = useState([]);

   const handleConnect = (personId) => {
      sendConnectionRequest(personId);
      setRequestLocalArray((prev) => [
         ...prev,
         { to: personId, from: { _id: user._id } },
      ]);
      toast.success("Connection request sent!"); // ✅ Toast on sending request
   };

   const handleRespond = async (requestId, action) => {
      try {
         await respondToRequest(requestId, action);
         toast.success(
            action === "accepted"
               ? "Connection request accepted!"
               : "Connection request rejected!"
         ); // ✅ Toast on responding
      } catch (err) {
         toast.error("Failed to respond to request");
      }
   };

   useEffect(() => {
      const fetchUserConnections = async () => {
         try {
            const res = await api.get(`/user-connections/${user._id}`);
            setConnections(res.data.connections);
         } catch (error) {
            console.log("Error fetching user connections: ", error.message);
            toast.error("Failed to fetch your connections"); // ✅ Toast on error
         }
      };

      const fetchPeopleToConnect = async () => {
         try {
            const res = await api.get(`/people-to-connect/${user._id}`);
            setUsersArray(res.data.users.slice(0, 12));
         } catch (error) {
            console.log("Error fetching users:", error.message);
            toast.error("Failed to fetch people to connect"); // ✅ Toast on error
         }
      };

      setRequestLocalArray(requests);
      fetchPeopleToConnect();
      fetchUserConnections();
   }, [requestResponded, requestSent]);

   useEffect(() => {
      getConnectionRequests();
      setRequestLocalArray(requests);
    //   if (requests.length > 0) {
        //  toast.success(`You have ${requests.length} new connection request(s)`); // ✅ Toast on new request
    //   }
   }, [requestResponded]);

   return (
    <div className="container px-4 py-6 mx-auto">
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
            Expand Your Network
          </h1>
          <p className="text-sm text-blue-100 sm:text-base">
            Connect with professionals in your industry and beyond
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Link to="/network/connections-and-requests">
            <button className="w-full p-2 text-sm font-semibold text-purple-700 bg-white rounded-lg sm:w-60 sm:text-md">
              Connections & Requests
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium sm:text-base">
            {connections.length} Connections
          </span>
        </div>
      </div>
    </div>

    {/* Main Grid */}
    <div className="grid gap-6 lg:grid-cols-3">
      {/* People You May Know */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold sm:text-xl">
                People You May Know
              </h2>
              <Badge variant="secondary" className="text-xs sm:text-sm">
                {usersArray.length} suggestions
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {usersArray.map((person) => (
                <div
                  key={person._id}
                  className="p-4 transition-shadow border rounded-xl hover:shadow-md"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                      <AvatarImage src={person.profilePic} alt={person.name} />
                      <AvatarFallback className="text-white bg-gradient-to-r from-blue-500 to-purple-500">
                        {person.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate sm:text-base">
                        {person.name}
                      </h3>
                      <div className="flex mt-3">
                        <Button
                          size="sm"
                          className="flex-1 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => handleConnect(person._id)}
                        >
                          <UserPlus className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                          {requestLocalArray.some((req) => req.to === person._id)
                            ? "Pending"
                            : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Your Connections */}
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold sm:text-lg">Your Connections</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {connections.slice(0, 3).map((connection) => (
              <div
                key={connection._id}
                className="flex items-center space-x-3 hover:cursor-pointer"
              >
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src={connection.profilePic} alt={connection.name} />
                  <AvatarFallback className="text-xs text-white sm:text-sm bg-gradient-to-r from-green-500 to-blue-500">
                    {connection.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{connection.name}</p>
                </div>
              </div>
            ))}
            <Link to="/network/connections-and-requests">
              <Button variant="outline" className="w-full mt-3 text-sm sm:text-base">
                View All Connections
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Requests Section */}
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold sm:text-lg">Connection Requests</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request._id}
                  className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 hover:cursor-pointer"
                >
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage src={request.from.profilePic} alt={request.from.name} />
                    <AvatarFallback className="text-xs text-white sm:text-sm bg-gradient-to-r from-pink-500 to-red-500">
                      {request?.from?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{request.from.name}</p>
                  </div>

                  <div className="flex w-full gap-2 sm:w-auto sm:flex-none">
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => handleRespond(request._id, "accepted")}
                    >
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs text-red-600 border-red-600 sm:text-sm hover:bg-red-50"
                      onClick={() => handleRespond(request._id, "rejected")}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No new requests</p>
            )}

            <Link to="/network/connections-and-requests">
              <Button variant="outline" className="w-full mt-3 text-sm sm:text-base">
                View All Requests
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</div>

   );
};

export default NetworkPage;
