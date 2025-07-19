"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SampleAd from "@/assets/images/SampleAd.jpg";

interface RedirectBannerProps {
  originalUrl: string;
  delay: number;
}

export function RedirectBanner({ originalUrl, delay }: RedirectBannerProps) {
  const [countdown, setCountdown] = useState(delay);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = originalUrl;
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, originalUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-dark text-accent-light">
      <h1 className="text-4xl font-bold mb-4">
        Redirecting in {countdown} seconds...
      </h1>
      <p className="text-lg">
        You are being redirected to:{" "}
        <a href={originalUrl} className="text-primary-light hover:underline">
          {originalUrl}
        </a>
      </p>
      <div className="mt-8 p-4 bg-primary-light rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src={SampleAd}
            alt="Ad Banner"
            className="w-full max-w-[60ch] h-auto object-cover rounded-md mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Sponsored Content</h2>
            <p className="text-md mb-2 max-w-[60ch]">
              Discover amazing deals and exclusive offers tailored just for you!
              This space is reserved for promotional content, advertisements, or
              important announcements.
            </p>
            <p className="text-md">
              Interested in advertising here? <br />
              <a href="#" className="text-primary-dark underline">
                Contact us
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
