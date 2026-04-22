import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Package, Settings, UserRound } from "lucide-react";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_API_URL + "/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)] active:scale-[0.98]"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
        >
          Register
        </Link>
      </div>
    );
  }

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-2 py-1 pr-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]"
      >
        <img
          referrerPolicy="no-referrer"
          src={user.image}
          alt={user.firstName}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/40"
        />
        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold leading-none">{user.firstName}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-secondary/70 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="glass absolute right-0 z-50 mt-3 w-64 rounded-3xl p-3 shadow-2xl shadow-black/30">
          <div className="mb-2 border-b border-white/10 px-3 py-2">
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="mt-1 break-all text-xs text-secondary/60">
              {user.email}
            </p>
          </div>

          <MenuButton
            icon={<UserRound className="h-4 w-4" />}
            label="My Account"
            onClick={() => go("/settings")}
          />
          <MenuButton
            icon={<Package className="h-4 w-4" />}
            label="My Orders"
            onClick={() => go("/my-orders")}
          />
          {user.role === "admin" && (
            <MenuButton
              icon={<Settings className="h-4 w-4" />}
              label="Admin Panel"
              onClick={() => go("/admin")}
            />
          )}
          <MenuButton
            icon={<LogOut className="h-4 w-4" />}
            label="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              setOpen(false);
              navigate("/login");
            }}
          />
        </div>
      )}
    </div>
  );
}

function MenuButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-all duration-200 hover:translate-x-1 hover:bg-white/8"
    >
      <span className="text-accent">{icon}</span>
      <span>{label}</span>
    </button>
  );
}