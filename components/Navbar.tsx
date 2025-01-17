"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Settings, Menu, X, LogOut } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const navItems = [
  { name: "Home", link: "/", icon: <Home size={20} /> },
  { name: "About", link: "/about", icon: <User size={20} /> },
  { name: "Env", link: "/env", icon: <Settings size={20} /> },
];

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const params = usePathname();
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setAuthProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProvider();
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
            onClick={() => redirect("/")}
          >
            <span className="text-xl font-bold text-gray-800">Storenv</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 pr-8">
            {navItems.map((item) => {
              if (item.name === "Env" && !session) return null; // Only show "Env" for logged-in users
              return <NavItem key={item.name} item={item} pathname={params} />;
            })}
            {!session &&
              providers &&
              Object.values(providers).map((provider, ind) => (
                <motion.button
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors w-full bg-gray-400/30 text-black"
                  onClick={() => signIn(provider.id)}
                  key={ind}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <span>{provider.name}</span>
                  {provider.id === "google" ? (
                    <FcGoogle size={24} />
                  ) : (
                    <Github size={24} color="white" />
                  )}
                </motion.button>
              ))}

            {session && (
              <div className="flex gap-4 items-center">
                <img
                  className="w-10 h-10 rounded"
                  src={profileImage || ""}
                  alt="Default avatar"
                ></img>
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => signOut()}
                >
                  <LogOut size={24} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                if (item.name === "Env" && !session) return null; // Only show "Env" for logged-in users
                return (
                  <NavItem
                    key={item.name}
                    item={item}
                    onClick={toggleMenu}
                    pathname={params}
                  />
                );
              })}
              {!session &&
                providers &&
                Object.values(providers).map((provider, ind) => (
                  <motion.button
                    className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors w-full bg-gray-400/30 text-indigo-500"
                    key={ind}
                    onClick={() => signIn(provider.id)}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  >
                    <span>Log in with {provider.name}</span>
                  </motion.button>
                ))}
              {session && (
                <div className="pt-2 pb-3 flex gap-4 items-center">
                  <motion.button
                    className="bg-indigo-500 text-white flex items-center gap-2 px-5 py-2 rounded-md"
                    onClick={() => signOut()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  >
                    Sign Out <LogOut size={14} />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface NavItemProps {
  item: {
    name: string;
    icon: React.ReactNode;
    link: string;
  };
  onClick?: () => void;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ item, onClick, pathname }) => (
  <motion.button
    className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors w-full
      ${
        pathname === item.link
          ? "bg-indigo-500 text-white"
          : "text-gray-600 hover:bg-indigo-100"
      }`}
    onClick={() => {
      if (onClick) onClick();
      redirect(item.link);
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 30,
    }}
  >
    {item.icon}
    <span>{item.name}</span>
  </motion.button>
);

export default Navbar;
