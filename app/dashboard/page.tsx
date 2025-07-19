import { createLink, deleteLatestLink } from "@/app/actions";
import { prisma } from "@/prisma";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LinksTable } from "@/components/LinksTable";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  const links = await prisma.link.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      visits: {
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
      },
    },
  });

  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const origin = `${protocol}://${host}`;
  const imgUrl = session?.user?.image ?? "/default-avatar.svg";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between container">
      <div className="welcomeWrapper flex gap-6">
        <div className="imgWrapper content-center justify-center">
          <Image
            src={imgUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-full h-auto w-auto object-contain aspect-square"
          />
        </div>
        <h1 className="text-4xl font-bold">Welcome, {session?.user?.name}</h1>
      </div>
      <p className="mt-4 text-lg text-center text-accent-dark max-w-[60ch]">
        This is your personal URL shortener dashboard. Easily create and manage
        short links for your long URLs and view them in the table below. Use the
        form below to shorten a new URL!
      </p>
      <div className="mt-8 flex gap-4">
        <form action={createLink} className="flex items-center gap-2">
          <input
            type="url"
            name="originalUrl"
            placeholder="Enter your URL here"
            required
            className="border border-accent-dark p-2 rounded text-accent-dark placeholder-accent-dark"
          />
          <button
            type="submit"
            className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-2 px-4 rounded border border-accent-dark"
          >
            Create Link
          </button>
        </form>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Shortened Links:</h2>
        {links.length === 0 ? (
          <p>No links found.</p>
        ) : (
          <LinksTable links={links} origin={origin} />
        )}
      </div>
    </main>
  );
}
