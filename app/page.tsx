import SignIn from "@/components/signin";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    // If the user is already authenticated, redirect to the dashboard
    return redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col gap-6 md:gap-12 items-center justify-between container">
      <h1 className="text-4xl font-bold">Welcome to the URL Shortener</h1>
      <p className="mt-4 text-lg">Please sign in to continue.</p>
      <Image
        src="/globe.svg"
        alt="Logo"
        width={150}
        height={150}
        className="mt-8"
      />
      <div className="mt-8 flex gap-4">
        <SignIn />
      </div>
    </main>
  );
}
