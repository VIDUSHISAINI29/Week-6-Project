import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
   Home,
   Bell,
   Search,
   Users,
   Briefcase,
   Brain,
   User,
   MessageCircleMore,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import { motion } from "framer-motion";
import Logo from "./common/Logo";
import { AuthContext } from "../context/AuthContext";
import UserProfileDropdown from "./ui/ProfileIcon";

const Navbar = () => {
   const { user } = useContext(AuthContext);
   const [loggedInUser, setLoggedInUser] = useState(null);
   const [notificationCount, setNotificationCount] = useState(null);
   const location = useLocation();

   const navItems = [
      { id: "home", icon: Home, label: "Home", path: "/" },
      { id: "network", icon: Users, label: "My Network", path: "/network" },
      { id: "jobs", icon: Briefcase, label: "Jobs", path: "/jobs" },
      {
         id: "messaging",
         icon: MessageCircleMore,
         label: "Messaging",
         path: "/messaging",
      },
      { id: "insights", icon: Brain, label: "Insights", path: "/insights" },
      { id: "profile", icon: User, label: "Me", path: "/profile" },
   ];

   useEffect(() => {
      setLoggedInUser(user);
   }, [user]);

   return (
      <>
         {/* Desktop Navigation */}
         <nav className="sticky top-0 z-40 items-center hidden px-4 py-2 space-x-2 bg-white border rounded-full md:flex border-white/20">
            <div className="flex items-center flex-1 space-x-8">
               <Link to="/">
                  <div className="rounded-lg hover:cursor-pointer">
                     <Logo />
                  </div>
               </Link>

               <div className="relative flex-1 max-w-lg">
                  <div className="relative group">
                     <Search className="absolute z-10 w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-muted-foreground group-focus-within:text-blue-600/50" />
                     <Input
                        type="text"
                        placeholder="Search for people, jobs, companies..."
                        className="py-5 pl-12 pr-4 transition-all duration-200 border-2 rounded-full w-80 bg-white/60 border-blue-400/30 focus-visible:ring-blue-500/40 focus-visible:border-blue-400/40 backdrop-blur-sm hover:bg-white/80 focus-visible:bg-white/90 placeholder:text-gray-500"
                     />
                  </div>
               </div>
            </div>

            {navItems.map((item) => {
               const Icon = item.icon;
               const isActive =
                  location.pathname === item.path ||
                  (item.id === "network" &&
                     location.pathname.startsWith("/network")) ||
                  (item.id === "jobs" && location.pathname.startsWith("/jobs"));

               return (
                  <Link to={item.path} key={item.id}>
                     <motion.div
                        key={item.id}
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                           variant="ghost"
                           size="sm"
                           className={`relative w-20 flex flex-col items-center px-4 py-3 h-auto text-xs font-medium rounded-full transition-all duration-300 ${
                              isActive
                                 ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25"
                                 : "text-gray-600 hover:text-blue-600 hover:bg-white/60"
                           }`}>
                           <motion.div
                              animate={isActive ? { y: [0, -2, 0] } : {}}
                              transition={{
                                 duration: 0.5,
                                 repeat: isActive ? Infinity : 0,
                                 repeatDelay: 2,
                              }}>
                              <Icon className="w-5 h-5 mb-1" />
                           </motion.div>
                           <span className="whitespace-nowrap">
                              {item.label}
                           </span>
                        </Button>
                     </motion.div>
                  </Link>
               );
            })}

            {/* Notifications */}
            <div className="relative">
               <Button
                  variant="ghost"
                  size="sm"
                  className="relative hidden p-3 transition-all duration-200 border rounded-full hover:bg-white/60 backdrop-blur-sm border-white/20 md:flex">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notificationCount > 0 && (
                     <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-white border-2 border-white -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                        {notificationCount}
                     </Badge>
                  )}
               </Button>
            </div>

            {/* User Profile */}
            <div className="relative">
               <UserProfileDropdown user={loggedInUser} />
            </div>
         </nav>

         {/* Mobile Bottom Navigation */}

         {/* Mobile Top Bar */}
         <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm md:hidden">
            {/* Logo */}
            <Link to="/">
               <div className="flex items-center hover:cursor-pointer">
                  <Logo />
               </div>
            </Link>

            {user && (
               <div className="relative">
                  <UserProfileDropdown user={loggedInUser} />
               </div>
            )}
            {/* Optional: search or notification icon */}
            {/* <Link to="/search" className="p-2 rounded-full hover:bg-gray-100">
      <Search className="w-6 h-6 text-gray-600" />
   </Link> */}
         </div>

         <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t shadow-md md:hidden">
            {navItems.map((item) => {
               const Icon = item.icon;
               const isActive =
                  location.pathname === item.path ||
                  (item.id === "network" &&
                     location.pathname.startsWith("/network")) ||
                  (item.id === "jobs" && location.pathname.startsWith("/jobs"));

               return (
                  <Link to={item.path} key={item.id} className="flex-1">
                     <div
                        className={`flex flex-col items-center py-2 text-xs ${
                           isActive ? "text-blue-600" : "text-gray-600"
                        }`}>
                        <Icon className="w-6 h-6 mb-1" />
                        <span>{item.label}</span>
                     </div>
                  </Link>
               );
            })}
         </div>
      </>
   );
};

export default Navbar;
