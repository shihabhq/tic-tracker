"use client";
import { SignOutAction } from "@/actions/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await SignOutAction();
    setLoading(false);
    if (!error) {
      toast.success("Logged out successfully");
      router.refresh();
    } else {
      toast.error("Unexpected error occured");
    }
  };
  return (
    <button
      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
      disabled={loading}
      onClick={handleLogout}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log out"}
    </button>
  );
};

export default LogoutButton;
