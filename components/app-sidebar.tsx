import * as React from "react";
import {
  ChevronRight,
  Home,
  Users,
  ShoppingCart,
  BarChart,
  Store,
  HelpCircle,
  FileText,
  Package,
  UserRound,
  FolderGit,
  Book,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data for a dashboard sidebar.
const sidebarItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    name: "Products",
    icon: ShoppingCart,
    href: "/dashboard/products",
    subItems: [
      { name: "All Products", href: "/dashboard/products" },
      { name: "Add Product", href: "/dashboard/products/add" },
      { name: "Categories", href: "/dashboard/products/categories" },
    ],
  },
  {
    name: "Orders",
    icon: Package,
    href: "/dashboard/orders",
    subItems: [
      { name: "All Orders", href: "/dashboard/orders" },
      { name: "Pending", href: "/dashboard/orders/pending" },
      { name: "Completed", href: "/dashboard/orders/completed" },
    ],
  },
  {
    name: "Analytics",
    icon: BarChart,
    href: "/dashboard/analytics",
  },
  {
    name: "Documents",
    icon: Book,
    href: "/dashboard/documents",
  },
  {
    name: "Files",
    icon: FolderGit,
    href: "/dashboard/files",
  },
  {
    name: "Invoices",
    icon: FileText,
    href: "/dashboard/invoices",
  },
  {
    name: "Buyers",
    icon: Store,
    href: "/dashboard/buyers",
  },
  {
    name: "Merchandisers",
    icon: UserRound,
    href: "/dashboard/merchandisers",
  },
  {
    name: "Help",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  {item.subItems ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between">
                          <span className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </span>
                          <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem, subIndex) => (
                            <SidebarMenuItem key={subIndex}>
                              <SidebarMenuButton asChild>
                                <Link href={subItem.href}>{subItem.name}</Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
