import { signIn } from "@/lib/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="hover:cursor-pointer flex gap-4 rounded px-4 py-2 text-white hover:bg-gray-900 items-center border border-white"
      >
        <FcGoogle /> Signin with Google
      </button>
    </form>
  );
}
