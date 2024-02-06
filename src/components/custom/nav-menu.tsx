"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { UserInfo } from "./user-info";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";

export const NavMenu = () => {
  const currentUser = useCurrentUser();
  return (
    <div className="container mx-auto px-6 flex justify-between items-center py-6">
      <Logo />
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        {currentUser ? <UserInfo /> : <Link href="/signin">Sign In</Link>}
      </div>
    </div>
  );
};
