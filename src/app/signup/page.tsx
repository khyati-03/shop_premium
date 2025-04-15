"use client";
import { useRouter } from "next/navigation";
import AuthForm from "@/app/components/auth/AuthForm";
import { useAuth } from "@/app/contexts/AuthContext";

export default function SignupPage() {
  const { signup, user } = useAuth();
  const router = useRouter();

  if (user) {
    router.replace("/");
    return null;
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Create Account</h1>

      <AuthForm
        label="Sign Up"
        submit={(email, pw) => signup(email, pw).then(() => router.push("/"))}
      />

      <p className="text-sm mt-4">
        Have an account?{" "}
        <a href="/login" className="underline">
          Log in
        </a>
      </p>
    </div>
  );
}
