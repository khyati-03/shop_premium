import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(""),
    [pw, setPw] = useState(""),
    [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, pw);
      router.push("/");
    } catch {
      setErr("Failed to create account");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="input"
        />
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="input"
        />
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button className="btn w-full">Create Account</button>
      </form>
    </div>
  );
}
