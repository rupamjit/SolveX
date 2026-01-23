"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { PenBoxIcon, LayoutDashboard, UserCircle, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const NAVLINKS = [
  {
    id: 1,
    label: "Problems",
    link: "/problems",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: 2,
    label: "Profile",
    link: "/profile",
    icon: <UserCircle className="w-4 h-4" />,
  },
];

const NavBar = ({ userRole }: { userRole?: UserRole | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-500">
      <nav
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-in-out px-6",
          isScrolled
            ? "w-full max-w-4xl h-14 rounded-2xl border border-white/20 dark:border-neutral-800/50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            : "w-full max-w-7xl h-16 rounded-3xl border border-transparent bg-transparent",
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center group">
          <div
            className={cn(
              "relative transition-all duration-500 group-hover:scale-105",
              isScrolled ? "h-8 w-24" : "h-10 w-32",
            )}
          >
            <Image
              src="/solveX.svg"
              fill
              className="object-contain"
              alt="SolveX"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div
          className={cn(
            "hidden md:flex items-center gap-1 p-1 rounded-xl transition-all duration-500",
            isScrolled
              ? "bg-transparent border-transparent"
              : "bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50",
          )}
        >
          {NAVLINKS.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                isScrolled
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-white dark:hover:bg-neutral-800",
              )}
            >
              {link.icon}
              <span className={cn(isScrolled && "hidden lg:inline")}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-3">
          <SignedIn>
            {userRole === UserRole.ADMIN && (
              <Link href="/create-problem" className="hidden sm:block">
                <Button
                  size={isScrolled ? "sm" : "default"}
                  className=" text-white shadow-lg  transition-all duration-300 px-4"
                >
                  <PenBoxIcon className="w-4 h-4 " />
                  {!isScrolled && "Create Problem"}
                </Button>
              </Link>
            )}
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-600 cursor-pointer dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button
                  size="sm"
                  className={cn(
                    " text-white dark:text-black cursor-pointer hover:bg-primary-10 shadow-lg transition-all duration-500",
                    isScrolled ? "px-3" : "px-6",
                  )}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign UP
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
