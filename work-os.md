 <!-- proxy.ts -->
import { NextResponse, type NextRequest } from "next/server";
import { authkit } from "@workos-inc/authkit-nextjs";

export default async function proxy(request: NextRequest) {
  const {
    session,
    headers: authkitHeaders,
    authorizationUrl,
  } = await authkit(request, {
    debug: true,
  });

  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/account") && !session.user) {
    console.log("No session on protected path");

    if (!authorizationUrl) return;

    const response = NextResponse.redirect(authorizationUrl);
    for (const [key, value] of authkitHeaders) {
      if (key.toLowerCase() === "set-cookie") {
        response.headers.append(key, value);
      } else {
        response.headers.set(key, value);
      }
    }
    return response;
  }

  const response = NextResponse.next({
    request: { headers: new Headers(request.headers) },
  });

  for (const [key, value] of authkitHeaders) {
    if (key.toLowerCase() === "set-cookie") {
      response.headers.append(key, value);
    } else {
      response.headers.set(key, value);
    }
  }

  return response;
}

export const config = { matcher: ["/", "/account"] };


 <!-- layout.tsx -->
<AuthKitProvider>{children}</AuthKitProvider>


 <!-- app/callback/route.ts -->
import { handleAuth } from '@workos-inc/authkit-nextjs';
export const GET = handleAuth();


 <!-- app/login/route.ts -->
import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

export const GET = async () => {
  const signInUrl = await getSignInUrl();

  return redirect(signInUrl);
};


 <!-- app/home/page.tsx -->
import Link from 'next/link';
import { getSignUpUrl, withAuth, signOut } from '@workos-inc/authkit-nextjs';

export default async function HomePage() {
  const { user } = await withAuth();

  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <main>
        <h1>Welcome</h1>
        <p>Please sign in to continue.</p>
        <Link href="/login">Sign in</Link>
        {' | '}
        <Link href={signUpUrl}>Sign up</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome back{user.firstName && `, ${user.firstName}`}</h1>
      <p>Email: {user.email}</p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}

<!-- auth-button.tsx -->
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
