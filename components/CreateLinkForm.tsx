"use client";

import { createLink } from "@/app/actions";
import toast from "react-hot-toast";

export function CreateLinkForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      await createLink(formData);
      toast.success("Link created successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form action={handleSubmit} className="flex items-center gap-2">
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
  );
}
