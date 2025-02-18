"use client";
import Link from "next/link";
import { authResponse, signup } from "@/app/lib/actions/auth-actions";
import { useState } from "react";
import Button from "@/components/ui/button";

export default function SignupForm() {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [responseData, setResponseData] = useState<authResponse>();

  const handleSignup = async () => {
    if (displayName && email && password) {
      const signUp = await signup(displayName, email, password);
      setResponseData(signUp);
      if (signUp.success) {
        setDisplayName("");
        setEmail("");
        setPassword("");
      }
    } else {
      setResponseData({ success: false, message: "All fields are required." });
    }
  };

  return (
    <div className="text-black flex flex-col w-96 bg-white rounded p-5 gap-3 text-sm shadow-lg">
      <h1 className="text-center text-2xl mt-2 mb-3 text-gray-800">Register</h1>
      <p className="text-gray-600">Display name</p>
      <input
        className="p-2 border"
        placeholder="e.g John Doe"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <p className="text-gray-600">Email</p>
      <input
        className="p-2 border"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="text-gray-600">Password</p>
      <input
        className="p-2 border"
        type="password"
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
        text="Sign up"
        size="long"
        action={handleSignup}
      ></Button>
      <p className="text-gray-400 my-5 text-center">
        Already have an account?{" "}
        <Link href={"/login"} className="text-gray-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
