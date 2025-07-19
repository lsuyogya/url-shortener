"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "text-primary-dark! bg-accent-dark! toaster font-semibold!",
        duration: 5000,
      }}
    />
  );
}
