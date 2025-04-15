import { useState, FormEvent } from "react";

type Props = {
  label: "Login" | "Sign Up";
  submit: (email: string, pw: string) => Promise<void>;
};

const AuthForm: React.FC<Props> = ({ label, submit }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await submit(email, pw);
    } catch (e: any) {
      setErr(e.message || "Authentication failed");
    }
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="input"
      />
      {err && <p className="text-red-500 text-sm">{err}</p>}
      <button className="w-full mt-4 text-center block bg-[#475a77] text-white py-2 rounded hover:bg-[#475a77]/80 transition-colors cursor-pointer">
        {label}
      </button>
    </form>
  );
};

export default AuthForm;
