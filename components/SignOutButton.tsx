"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="block bg-transparent text-accent-dark hover:text-accent-light cursor-pointer font-bold py-0 px-0 rounded text-sm "
    >
      Sign Out
    </button>
  );
}
