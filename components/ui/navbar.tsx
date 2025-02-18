"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import nextLogo from "@/public/next.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

type NavProps = {
  title: string;
};

function Navbar({ title }: NavProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);

  const userNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Sign out", href: "/signout" },
  ];
  return (
    <div className="bg-gray-50 w-full shadow-sm">
      <div className="mx-auto max-w-7xl">
        <div className="w-full h-16 flex items-center text-black justify-between px-5 xl:px-0">
          <Link href={"/"} className="hover:scale-105 transition delay-250">
            <Image src={nextLogo} alt={"Logo"} width={150} />
          </Link>

          {user ? (
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex text-gray-800 max-w-xs items-center rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          ) : (
            <div className="flex gap-2">
              <Button
                text="Login"
                action={() => router.push("/login")}
              ></Button>
              <Button
                variant="light"
                text="Register"
                action={() => router.push("/register")}
              ></Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-800 h-20">
        <div className="mx-auto max-w-7xl h-full">
          <div className="w-full h-full flex items-center text-black justify-between px-5 xl:px-0">
            <h1 className="text-gray-200 text-2xl">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
