import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import LoadingAnimation from "../../components/loadingAnimation";
import toast from "react-hot-toast";
import { Shield, UserCog, UserRoundCheck, UserRoundX } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/all/${pageSize}/${pageNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch(() => {
        toast.error("Failed to load users");
      })
      .finally(() => setLoading(false));
  }, [loading, pageNumber]);

  const stats = useMemo(() => {
    return {
      admins: users.filter((user) => user.role === "admin").length,
      verified: users.filter((user) => user.isEmailVerified).length,
      blocked: users.filter((user) => user.isBlocked).length,
    };
  }, [users]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Admins" value={stats.admins} icon={Shield} />
        <Stat label="Verified" value={stats.verified} icon={UserRoundCheck} />
        <Stat label="Blocked" value={stats.blocked} icon={UserRoundX} />
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#101b31] via-[#0d1729] to-[#0a1424] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
        <div className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-blue-400 via-accent to-cyan-400" />
        <div className="absolute inset-x-0 bottom-0 h-[5px] bg-gradient-to-r from-blue-400 via-accent to-cyan-400" />

        <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              User Management
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-secondary/70">
            Page <span className="font-semibold text-white">{pageNumber}</span> of{" "}
            <span className="font-semibold text-white">{Math.max(totalPages, 1)}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[420px] items-center justify-center">
            <LoadingAnimation />
          </div>
        ) : users.length === 0 ? (
          <div className="px-6 py-16 text-center text-secondary/60">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto hide-scroll-track">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-white/[0.04] text-secondary/55">
                <tr>
                  {[
                    "User",
                    "Email",
                    "First Name",
                    "Last Name",
                    "Role",
                    "Email Verification",
                    "Account Status",
                    "Block",
                    "Role Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em]"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.email}
                    className={`border-t border-white/10 transition-colors duration-300 hover:bg-white/[0.04] ${
                      index % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <img
                          referrerPolicy="no-referrer"
                          src={user.image || "/logo.png"}
                          alt={user.email}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/logo.png";
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-4 text-secondary/80">{user.email}</td>
                    <td className="px-5 py-4 text-white">{user.firstName || "-"}</td>
                    <td className="px-5 py-4 text-white">{user.lastName || "-"}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-accent/15 text-accent"
                            : "bg-white/8 text-secondary/80"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isEmailVerified
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-amber-500/15 text-amber-300"
                        }`}
                      >
                        {user.isEmailVerified ? "Verified" : "Not Verified"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-500/15 text-red-300"
                            : "bg-emerald-500/15 text-emerald-300"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                          user.isBlocked
                            ? "bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_10px_24px_rgba(16,185,129,0.22)]"
                            : "bg-red-600 hover:bg-red-500 hover:shadow-[0_10px_24px_rgba(239,68,68,0.22)]"
                        }`}
                        onClick={() => toggleBlock(user, setLoading)}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                          user.role === "admin"
                            ? "bg-white/8 text-secondary hover:bg-white/12 hover:text-white"
                            : "bg-accent text-white hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.22)]"
                        }`}
                        onClick={() => toggleRole(user, setLoading)}
                      >
                        <UserCog className="h-4 w-4" />
                        {user.role === "admin" ? "Make Customer" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 rounded-[28px] border border-white/10 bg-surface/65 px-5 py-4">
        <button
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
              setLoading(true);
            } else {
              toast.success("You are on the first page");
            }
          }}
        >
          Previous
        </button>

        <span className="min-w-[120px] text-center text-sm text-secondary/75">
          Page {pageNumber} / {totalPages || 1}
        </span>

        <button
          className="rounded-2xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.22)] active:scale-[0.98]"
          onClick={() => {
            if (pageNumber < totalPages) {
              setPageNumber(pageNumber + 1);
              setLoading(true);
            } else {
              toast.success("You are on the last page");
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

async function toggleBlock(user, setLoading) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/toggle-block`,
      { email: user.email },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    toast.success(response.data.message);
    setLoading(true);
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to toggle block status");
  }
}

async function toggleRole(user, setLoading) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/toggle-role`,
      { email: user.email },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    toast.success(response.data.message);
    setLoading(true);
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to toggle role status");
  }
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#101b30] to-[#0b1526] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-secondary/45">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-2xl bg-accent/12 p-3 text-accent">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}