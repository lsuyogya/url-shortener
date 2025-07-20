import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-dark text-accent-light">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Page Doesnt Exist</h2>
      <p className="text-lg mb-8">Could not find the requested resource.</p>
      <Link
        href="/"
        className="bg-accent-dark hover:bg-accent-light text-primary-dark font-bold py-2 px-4 rounded border border-accent-dark"
      >
        Return Home
      </Link>
    </div>
  );
}
