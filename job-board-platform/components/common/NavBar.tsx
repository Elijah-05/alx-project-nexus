"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useParams } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const params = useParams();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if(isOpen) {
      setIsOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-4 ${
        scrolled ? "bg-white shadow-md " : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            <NavLink href="/jobs">Find Jobs</NavLink>
            <NavLink href="/#partners">Companies</NavLink>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/">About</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {/* <NavLink href="/jobs/new" className="text-sm font-medium">Create Job</NavLink> */}
                 <Button variant="primary" navigateTo="/jobs/new">
                  Create Job
                </Button>
                {/* <h6 className="text-sm">{user.name}</h6> */}
                <Button
                  variant="ghost"
                  className="border border-primary py-2 font-medium"
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Button variant="primary" navigateTo="/auth/register">
                  Register
                </Button>
                <Button
                  variant="ghost"
                  className="border border-primary"
                  navigateTo="/auth/login"
                >
                  Log In
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg p-4 flex flex-col gap-2">
          <NavLink mobile href="/jobs">
            Find Jobs
          </NavLink>
          <NavLink mobile href="/#partners">
            Companies
          </NavLink>
          <NavLink mobile href="/">
            Home
          </NavLink>
          <NavLink mobile href="/">
            About
          </NavLink>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {user ? (
              <>
                <Button variant="primary" fullWidth navigateTo="/jobs/new">
                  Create Job
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={async () => await logout()}
                  className="border border-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="primary" fullWidth navigateTo="/auth/register">
                  Register
                </Button>
                <Button variant="outline" className="border border-primary" fullWidth navigateTo="/auth/login">
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
