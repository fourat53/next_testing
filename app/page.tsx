import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!isAuthenticated()) {
    return (
      <div className="h-screen flex gap-4 items-center justify-center">
        <Button>
          <LoginLink>Sign In</LoginLink>
        </Button>
        <Button>
          <RegisterLink>Sign Up</RegisterLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      {user !== null && user.picture !== null && (
        <Image
          src={user?.picture}
          alt={user?.given_name || "User"}
          width={60}
          height={60}
          className="rounded-full"
        />
      )}
      Welcome, {user?.given_name} {user?.family_name}
      <Button>
        <LogoutLink>Log out</LogoutLink>
      </Button>
    </div>
  );
}
