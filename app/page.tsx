import SignIn from "@/components/signin";
import Image from "next/image";
import { createLink, deleteLatestLink } from "./actions";
import { prisma } from "../prisma";
import { createTestEntry } from "./test-action";

export default async function Home() {
  const links = await prisma.link.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
        <form action={createLink}>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Link
          </button>
        </form>
        <form action={deleteLatestLink}>
          <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Latest Link
          </button>
        </form>

        <form action={async (formData) => {
          "use server";
          const message = formData.get("message") as string;
          await createTestEntry(message);
        }}>
          <input type="text" name="message" placeholder="Enter test message" className="border p-2 rounded text-black" />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
            Create Test Entry
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Existing Links:</h2>
        {links.length === 0 ? (
          <p>No links found.</p>
        ) : (
          <ul>
            {links.map((link) => (
              <li key={link.id} className="mb-2">
                <span className="font-semibold">Slug:</span> {link.slug} - <span className="font-semibold">URL:</span> {link.originalUrl}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}