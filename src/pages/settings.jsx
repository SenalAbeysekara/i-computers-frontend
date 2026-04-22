import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFirstName(response.data.firstName || "");
        setLastName(response.data.lastName || "");
        setExistingImageUrl(response.data.image || "");
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  async function updateProfile() {
    try {
      const token = localStorage.getItem("token");
      const updatedInfo = { firstName, lastName, image: existingImageUrl };
      if (file) updatedInfo.image = await uploadFile(file);

      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/users/",
        updatedInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  }

  async function changePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        import.meta.env.VITE_API_URL + "/users/update-password",
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Password changed successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    }
  }

  return (
    <div className="section-shell py-10">
      <div className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-[32px] glass p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
            Profile
          </p>
          <h1 className="mt-3 text-3xl font-black">Account Settings</h1>

          <div className="mt-8 flex items-center gap-4">
            <img
              referrerPolicy="no-referrer"
              src={existingImageUrl || "/logo.png"}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover ring-2 ring-accent/30"
            />
            <div className="text-sm text-secondary/65">
              Update your name and image without changing backend logic.
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Field label="First Name" value={firstName} onChange={setFirstName} />
            <Field label="Last Name" value={lastName} onChange={setLastName} />

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm text-secondary/70">
                Profile Image
              </span>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/8"
              />
            </label>
          </div>

          <button
            className="mt-6 rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
            onClick={updateProfile}
          >
            Update Profile
          </button>
        </div>

        <div className="rounded-[32px] glass p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
            Security
          </p>
          <h2 className="mt-3 text-3xl font-black">Change Password</h2>

          <div className="mt-8 grid gap-4">
            <Field
              type="password"
              label="New Password"
              value={password}
              onChange={setPassword}
            />
            <Field
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>

          <button
            className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(255,255,255,0.14)] active:scale-[0.98]"
            onClick={changePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-secondary/70">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/8 focus:border-accent"
      />
    </label>
  );
}