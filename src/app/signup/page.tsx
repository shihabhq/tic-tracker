"use client";
import { signupAction } from "@/actions/auth";
import Input from "@/components/Input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

type AuthDetails = {
  error?: string | null;
};

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (
    prevState: AuthDetails,
    formData: FormData
  ): Promise<AuthDetails> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
        const { error } = await signupAction(email, password);
        if (error) {
          return { error };
        }
      const postResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );
      if (!postResponse.ok) {
        return {
          error: "Error creating user. Please try again.",
        };
      }
      router.replace("/");
      return {};
    } catch {
      return {
        error: "Unexpected error occurred. Please try again.",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {});

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <form
        action={formAction}
        className="w-96 p-4 border rounded-sm border-gray-200 flex flex-col gap-4"
      >
        <h1 className=" text-center text-3xl font-bold">Sign Up</h1>
        <Input label="name" name="name" placeholder="Name" type="text" />
        <Input label="email" name="email" placeholder="Email" type="email" />
        <Input
          label="password"
          name="password"
          placeholder="Password"
          type="password"
        />

        <button
          type="submit"
          className="bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex justify-center items-center gap-2">
              Signing up...
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        {state.error && (
          <p className="text-red-500 text-center">{state.error}</p>
        )}
        <div className="flex justify-center items-center gap-2 ">
          <p className="text-gray-500">{"Don't have an account?"}</p>
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-600 transition-all font-semibold"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
