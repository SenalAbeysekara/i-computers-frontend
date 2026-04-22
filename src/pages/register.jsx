import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthShell } from "./login";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  async function register() {
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/users", {
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to register");
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register to manage orders, checkout faster, and keep your account details in one place."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field placeholder="First name" value={firstName} onChange={setFirstName} />
        <Field placeholder="Last name" value={lastName} onChange={setLastName} />
      </div>

      <Field type="email" placeholder="Email" value={email} onChange={setEmail} />
      <Field placeholder="Phone number" value={phone} onChange={setPhone} />
      <Field
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <button
        onClick={register}
        className="w-full rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-secondary/65">
        Already have an account?{" "}
        <Link to="/login" className="text-accent transition hover:text-blue-400">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}

function Field({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none transition focus:border-accent"
    />
  );
}