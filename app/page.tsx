"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex gap-4 items-center justify-center h-screen">
      <Button onClick={() => router.push("/kinde")}>Kinde Auth</Button>
    </div>
  );
}
