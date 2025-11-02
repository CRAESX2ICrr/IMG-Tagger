"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Gallery", ariaLabel: "View your gallery", link: "/gallery" },
  { label: "Signup", ariaLabel: "Create an Account", link: "/signup" },
  { label: "Login", ariaLabel: "Login to your account", link: "/login" },
];

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const filteredMenuItems = session
    ? menuItems.filter(
        (item) => item.label != "Signup" && item.label != "Login"
      )
    : menuItems;

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Image Gallery
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                {filteredMenuItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={item.link}
                        aria-label={item.ariaLabel}
                        className="text-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {session && (
                  <>
                    <NavigationMenuItem>
                      <UserAvatar session={session} />
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-2 p-4">
                {filteredMenuItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={item.link}
                        aria-label={item.ariaLabel}
                        className="block text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {session && (
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className={navigationMenuTriggerStyle()}
                    >
                      Logout
                    </Button>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  );
};
