import React from "react";
import Image from "next/image";
import nextLogo from "@/public/next.svg";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-50">
      <div className="">
        <div className="flex justify-center mb-10">
          <Link href={"/"} className="hover:scale-105 transition delay-250">
            <Image src={nextLogo} alt={"Logo"} width={200} height={50} />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
