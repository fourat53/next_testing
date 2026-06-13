"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { signOutAction } from "@/actions/userActions";
import LoaderSmall from "../loaders/loader-small";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderSmall />;
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">
          Welcome, {user.firstName} {user.lastName}
        </h1>
        <Button onClick={signOutAction}>Sign Out</Button>
      </div>
    );
  }

  return <Button onClick={() => redirect("/login")}>Sign In</Button>;
}
