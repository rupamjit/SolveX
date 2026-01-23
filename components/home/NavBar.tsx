"use client";

import React from "react";
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
import { PenBoxIcon } from "lucide-react";

const NAVLINKS = [
  { id: 1, label: "Problems", link: "/problems" },
  { id: 2, label: "Profile", link: "/profile" },
];

const NavBar = ({ userRole }: { userRole?: UserRole | null }) => {
  return (
    <nav className="flex items-center justify-between mx-auto bg-primary/10 sticky top-0 w-full">
      <div className="p-3 flex items-center justify-between w-full">
        <div>
          <Image src="/solveX.svg" width={100} height={100} alt="SolveX" />
        </div>

        <div className="flex items-center gap-4">
          {NAVLINKS.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SignedIn>
            {userRole === UserRole.USER && (
              <Link href="/create-problem">
                <Button className="cursor-pointer" variant="outline"> <PenBoxIcon />Create Problem</Button>
              </Link>
            )}
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="ghost" size="sm" className="cursor-pointer hover:bg-primary/80 text-primary">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button size="sm" className="cursor-pointer hover:bg-primary/80 text-white">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
