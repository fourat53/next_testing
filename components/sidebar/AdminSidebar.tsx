import SmallLoader from "@/components/loaders/small-loader";
import { NavMain } from "@/components/sidebar/NavMain";
import { NavUser } from "@/components/sidebar/NavUser";
import type * as React from "react";
import { Suspense } from "react";
import {
  IconDashboard,
  IconPackage,
  IconShoppingCart,
  IconInnerShadowTop,
  IconShoppingBag,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";

type NavItem = {
  title: string;
  url: string;
  icon: Icon;
};

const navMain: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: IconShoppingBag,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: IconPackage,
  },
  {
    title: "Carts",
    url: "/carts",
    icon: IconShoppingCart,
  },
  {
    title: "Users",
    url: "/users",
    icon: IconUsers,
  },
];

export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="border-none">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! rounded-full h-10"
            >
              <Link
                href="/"
                className="text-primary flex justify-center font-bold text-xl"
              >
                <IconInnerShadowTop className="size-7!" />
                <span>Shopofort</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <Suspense fallback={<SmallLoader />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
