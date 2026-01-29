/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BellOff, BellRing, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type PushState =
  | "checking"
  | "idle"
  | "enabled"
  | "blocked"
  | "unsupported"
  | "loading";

export function EnableAdminPushIconButton({ adminId }: { adminId: string }) {
  const [state, setState] = useState<PushState>("checking");

  // 🧪 Dummy init (simulates browser checks)
  useEffect(() => {
    const timer = setTimeout(() => {
      // change this to test different states:
      // "unsupported" | "blocked" | "idle"
      setState("idle");
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // 🧪 Dummy enable
  const enable = async () => {
    setState("loading");

    setTimeout(() => {
      setState("enabled");
      toast.success("Push enabled ✅ (dummy)");
    }, 800);
  };

  // 🧪 Dummy disable
  const disable = async () => {
    setState("loading");

    setTimeout(() => {
      setState("idle");
      toast.success("Push disabled ❌ (dummy)");
    }, 800);
  };

  const onClick = async () => {
    if (state === "unsupported") {
      toast.error("Push not supported in this browser");
      return;
    }

    if (state === "blocked") {
      toast.error("Notifications are blocked. Allow them in browser settings.");
      return;
    }

    if (state === "loading" || state === "checking") return;

    if (state === "enabled") return disable();
    return enable();
  };

  // Helper function to get the icon (not a component)
  const getIcon = () => {
    if (state === "loading" || state === "checking") {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }

    if (state === "blocked") {
      return <BellOff className="h-4 w-4 text-red-500" />;
    }

    if (state === "enabled") {
      return <BellRing className="h-4 w-4" />;
    }

    return <BellOff className="h-4 w-4" />;
  };

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="text-gray-900 hover:text-white hover:bg-white/20 transition-all duration-200 font-medium px-3 py-1.5"
      aria-label="Push notifications"
      title={
        state === "enabled"
          ? "Disable push notifications"
          : state === "blocked"
          ? "Notifications blocked"
          : "Enable push notifications"
      }
    >
      {getIcon()}
    </Button>
  );
}