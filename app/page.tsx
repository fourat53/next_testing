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
  const isLoggedIn = await isAuthenticated();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {isLoggedIn ? (
        <>
          {user !== null &&
            (user.picture !== null ? (
              <Image
                src={user?.picture}
                alt={user?.given_name || ""}
                width={60}
                height={60}
                className="rounded-full"
              />
            ) : (
              user?.given_name !== null && (
                <div className="text-xl text-semibold">
                  user.given_name.charAt(0).toUpperCase
                </div>
              )
            ))}
          Welcome, {user?.given_name} {user?.family_name}
          <Button>
            <LogoutLink>Log out</LogoutLink>
          </Button>
        </>
      ) : (
        <>
          <Button>
            <LoginLink>Login</LoginLink>
          </Button>
          <Button variant="primary">
            <RegisterLink>Sign Up</RegisterLink>
          </Button>
        </>
      )}
    </div>
  );
}
