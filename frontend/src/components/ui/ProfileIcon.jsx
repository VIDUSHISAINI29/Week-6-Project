"use client";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogOut } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const UserProfileDropdown = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Logout function
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <DropdownMenu.Root>
      {/* Trigger */}
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 p-1 transition-all duration-200 rounded-full shadow-sm outline-none cursor-pointer bg-white/60 hover:bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            {user?.name?.charAt(0) || "U"}
          </div>
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="w-48 p-1 rounded-xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-200 
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95
          transition-all duration-200"
        >
          {/* View Profile */}
          <DropdownMenu.Item
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors rounded-lg outline-none cursor-pointer hover:bg-blue-50 hover:text-blue-600"
          >
            <User className="w-4 h-4" />
            View Profile
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px my-1 bg-gray-200" />

          {/* Logout */}
          <DropdownMenu.Item
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors rounded-lg outline-none cursor-pointer hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserProfileDropdown;
