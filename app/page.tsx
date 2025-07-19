import SignIn from "@/components/signin";
import { FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LongUrlImg from "@/assets/images/LONG_URL.png";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const origin = `${protocol}://${host}`;

  const session = await auth();
  if (session) {
    // If the user is already authenticated, redirect to the dashboard
    return redirect("/dashboard");
  }
  return (
    <main className="flex flex-col items-center justify-between container pt-12! md:pt-24! gap-12">
      <Image
        className="w-auto h-auto object-contain m-auto"
        src="/logo.png"
        alt="Logo"
        width={192}
        height={192}
      />
      <div className="contentWrapper ">
        <h1 className="text-4xl font-bold text-center mx-auto">
          Simplify your links and share them with ease!
        </h1>
        <p className="mt-4 mb-8 text-lg text-center mx-auto text-accent-dark">
          Our URL shortener helps you track clicks, manage your links, and boost
          your online presence—all in one place.
        </p>
        <p className="mt-4 text-lg max-w-[65ch] text-center text-accent-dark grid gap-6 mx-auto">
          <span className="line-clamp-3 word-break-all">
            https://www.example-domain123.com:8080/very/long/path/with/many/segments/that/go/on/and/on/and/on/until/you/start/wondering/why/this/is/so/long/just/for/fun/or/maybe/a/test/of/some/system/or/logging/tool/or/performance/test/case/index.html?param1=value1&param2=value2&param3=value3&param4=some%20long%20encoded%20value&param5=even%20longer%20with%20more%20%26%20symbols%20%3D%20and%20%3F%20and%20%23%20because%20testing%20is%20fun&debug=true#section-9-header-anchor-position
          </span>
          <span className="flex justify-center">
            <FaArrowDown size={32} className="mx-auto" />
          </span>
          <span>{origin}/iohjd</span>
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-4 ">
        <p className="mt-4 text-lg">Please sign in to continue.</p>
        <SignIn />
      </div>
    </main>
  );
}
