import { KindeProvider } from "@/providers/kinde-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <KindeProvider>{children}</KindeProvider>;
}
