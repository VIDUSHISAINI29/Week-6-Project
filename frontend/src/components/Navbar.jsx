import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Home, Bell, Search, Users, Briefcase, BookOpen, Brain, User, Menu, X } from "lucide-react";
import  Button from "../components/ui/Button";
import  Input from "../components/ui/Input";
import  Badge from "../components/ui/Badge";
import { motion } from "framer-motion";
import Logo from "./common/Logo";
import { AuthContext } from "../context/AuthContext";
import UserProfileDropdown from "./ui/ProfileIcon";
const Navbar = ({  onTabChange }) => {
    const { user } = useContext(AuthContext);
    const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(null);
  const location = useLocation();
  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "network", icon: Users, label: "My Network", path: "/network" },
    { id: "jobs", icon: Briefcase, label: "Jobs",  path: "/jobs" },
    { id: "learning", icon: BookOpen, label: "Learning",  path: "/learning" },
    { id: "insights", icon: Brain, label: "Insights" , path: "/insights"},
    { id: "profile", icon: User, label: "Me",   path: "/profile" },
  ];

  const handleNotificationClick = () => {

  }
  useEffect(() => {  
    setLoggedInUser(user);
  }, [user]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="items-center hidden px-4 py-2 space-x-2 border rounded-full bg-blac md:flex bg-white/30 backdrop-blur-sm border-white/20">
       <div className="flex items-center flex-1 space-x-8">
            <div className="rounded-lg hover:cursor-pointer">
              <Logo />
            </div>
            
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
          const isActive = location.pathname === item.path;
            console.log("isActive = ",isActive);
          return (
            <Link to={item.path} key={item.id} >
            <motion.div
              key={item.id}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`relative flex flex-col items-center px-4 py-3 h-auto text-xs font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white/60"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <motion.div
                  animate={isActive ? { y: [0, -2, 0] } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: isActive ? Infinity : 0,
                    repeatDelay: 2,
                  }}
                >
                  <Icon className="w-5 h-5 mb-1" />
                </motion.div>
                <span className="whitespace-nowrap">{item.label}</span>

                {/* Glow effect for active tab */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 blur-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Button>

              {/* Notification dots for some tabs */}
              {(item.id === "network" || item.id === "insights") && (
                <motion.div
                  className="absolute w-3 h-3 border-2 border-white rounded-full -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            </Link>
          );
        })}


             
            {/* Notifications */}
            <div className="relative hover-lift">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNotificationClick}
                className="relative hidden p-3 transition-all duration-200 border rounded-full hover:bg-white/60 backdrop-blur-sm border-white/20 md:flex hover-glow"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-white border-2 border-white -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>


            {/* User Profile Dropdown */}
            <div className="relative ">
              <UserProfileDropdown user={loggedInUser} />
            </div>

      </nav>

      {/* Mobile Navigation Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="p-3 border rounded-full md:hidden bg-white/40 backdrop-blur-sm border-white/20 hover:bg-white/60"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.div>
      </Button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 z-50 mx-4 mt-2 overflow-hidden border shadow-xl top-full glass-elevated border-white/20 md:hidden rounded-2xl"
        >
          <div className="grid grid-cols-3 gap-2 p-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex flex-col items-center p-4 h-auto text-xs font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg"
                        : "text-gray-600 hover:text-blue-600 hover:bg-white/60"
                    }`}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
}


export default Navbar;