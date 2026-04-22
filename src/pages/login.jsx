import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { ShieldCheck, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .post(import.meta.env.VITE_API_URL + "/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          toast.success("Login successful");
          localStorage.setItem("token", res.data.token);
          navigate(res.data.role === "admin" ? "/admin/" : "/");
        })
        .catch((err) =>
          toast.error(err?.response?.data?.message || "Google login failed")
        );
    },
    onError: () => toast.error("Google login failed"),
  });

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/users/login",
        { email, password }
      );
      toast.success("Login successful");
      localStorage.setItem("token", response.data.token);
      navigate(response.data.role === "admin" ? "/admin/" : "/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to login");
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to manage your orders, cart, and account."
    >
      <Field type="email" placeholder="Email" value={email} onChange={setEmail} />
      <Field
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-secondary/70 transition hover:text-accent"
        >
          Forgot password?
        </Link>
      </div>

      <button
        onClick={login}
        className="w-full rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
      >
        Login
      </button>

      <button
        onClick={googleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_25px_rgba(255,255,255,0.08)] active:scale-[0.98]"
      >
        <FcGoogle className="h-5 w-5" />
        Login with Google
      </button>

      <p className="text-center text-sm text-secondary/65">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-accent transition hover:text-blue-400">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/50 shadow-2xl shadow-black/25 lg:grid lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 p-10 lg:flex lg:flex-col lg:justify-center">
          <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <img
                src="/logo.png"
                alt="Isuri Computer"
                className="h-24 w-auto object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]"
              />
              <p className="mt-3 flex items-center gap-2 text-sm text-secondary/60">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Premium computer store
              </p>
            </div>

            <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-left">
                <Sparkles className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-white">Modern access</p>
                <p className="mt-2 text-sm leading-6 text-secondary/65">
                  Cleaner entry flow with better spacing and premium styling.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-left">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <p className="mt-3 font-semibold text-white">Secure account</p>
                <p className="mt-2 text-sm leading-6 text-secondary/65">
                  Login, Google sign-in, and account recovery in one consistent
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/70 p-6 backdrop-blur-xl md:p-10 lg:p-12">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <img
              src="/logo.png"
              alt="Isuri Computer"
              className="h-16 w-auto object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]"
            />
            <p className="mt-2 flex items-center gap-2 text-sm text-secondary/60">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Premium computer store
            </p>
          </div>

          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mb-8 mt-3 text-secondary/65">{subtitle}</p>

          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </div>
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