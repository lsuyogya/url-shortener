"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="hover:cursor-pointer flex gap-4 rounded px-4 py-2 text-white hover:bg-gray-900 items-center border border-white"
    >
      <FcGoogle /> Sign in with Google
    </button>
  );
}
