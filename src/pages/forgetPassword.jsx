import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthShell } from "./login";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!otpSent || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, secondsLeft]);

  async function sendOtp() {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/users/send-otp", {
        email,
      });
      setOtpSent(true);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setSecondsLeft(120);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  }

  async function resetPassword() {
    if (secondsLeft <= 0) {
      toast.error("OTP expired. Please request a new one");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/users/verify-otp", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    }
  }

  function formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <AuthShell
      title={otpSent ? "Reset password" : "Forgot password"}
      subtitle={
        otpSent
          ? "Enter the OTP and set your new password."
          : "Use your email to receive a one-time verification code."
      }
    >
      {!otpSent ? (
        <>
          <Field
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />

          <button
            onClick={sendOtp}
            className="w-full rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
            <p className="text-sm text-secondary/65">OTP expires in</p>
            <p
              className={`mt-1 text-xl font-semibold ${
                secondsLeft <= 20 ? "text-red-400" : "text-white"
              }`}
            >
              {formatTime(secondsLeft)}
            </p>
          </div>

          <Field placeholder="Enter OTP" value={otp} onChange={setOtp} />

          <Field
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={setNewPassword}
          />

          <Field
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <button
            onClick={resetPassword}
            disabled={secondsLeft <= 0}
            className="w-full rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-accent"
          >
            Reset Password
          </button>

          <button
            onClick={sendOtp}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_25px_rgba(255,255,255,0.08)] active:scale-[0.98]"
          >
            Resend OTP
          </button>
        </>
      )}
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