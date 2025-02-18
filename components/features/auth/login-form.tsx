"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authResponse, login } from "@/app/lib/actions/auth-actions";
import { useState } from "react";
import Button from "@/components/ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [responseData, setResponseData] = useState<authResponse>();
  const router = useRouter();

  const handleSignin = async () => {
    if (email && password) {
      const signIn = await login(email, password);
      if (signIn.success) {
        router.push("/");
      }
      setResponseData(signIn);
    } else {
      setResponseData({ success: false, message: "All fields are required." });
    }
  };
  return (
    <div className="text-black flex flex-col w-96 bg-white p-5 gap-3 text-sm shadow-lg">
      <h1 className="text-center text-2xl mt-2 mb-3 text-gray-800">Login</h1>
      <label htmlFor="email" className="text-gray-600">
        Email
      </label>
      <input
        className="p-2 border"
        id="email"
        type="email"
        required
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-gray-600" htmlFor="password">
        Password
      </label>
      <input
        className="p-2 border"
        id="password"
        type="password"
        required
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {responseData?.success ? (
        <p className="text-sm text-green-600">{responseData?.message}</p>
      ) : (
        <p className="text-sm text-red-600">{responseData?.message}</p>
      )}
      <Button
        text="Sign in"
        size="long"
        action={handleSignin}
      ></Button>
      <p className="text-gray-400 my-5 text-center">
        Don't have an account?{" "}
        <Link href={"/register"} className="text-gray-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}
