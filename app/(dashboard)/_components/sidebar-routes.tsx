"use client";

import { 
  BarChart,
  Compass,
  Layout,
  List,
  HelpCircle,
  Mail,
  AlertCircle,
  User,
  CreditCard
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const planOrder: Record<string, number> = {
  free: 1,
  basic: 2,
  pro: 3,
  premium: 4,
};

// Example teacher vs. guest routes (unchanged):
const guestRoutes = [
  { icon: Layout, label: "Dashboard", href: "/" },
  { icon: Compass, label: "Browse", href: "/search" },
];
const teacherRoutes = [
  { icon: List, label: "Courses", href: "/teacher/courses" },
  { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
];

const supportRoutes = [
  { icon: HelpCircle, label: "Help Center", href: "/help" },
  { icon: Mail, label: "Feedback", href: "/feedback" },
  { icon: AlertCircle, label: "Report Issue", href: "/report" },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  const [userPlan, setUserPlan] = useState<string>("free"); // default

  // Fetch plan in client side
  useEffect(() => {
    if (!userId) {
      setUserPlan("free");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/user-subscription");
        if (!res.ok) throw new Error("Failed to fetch subscription");
        const data = await res.json(); // { planId: "free" | "basic" | ... }
        setUserPlan(data.planId?.toLowerCase() || "free");
      } catch {
        setUserPlan("free");
      }
    })();
  }, [userId]);

  // Check if user is below premium
  const needsUpgrade = planOrder[userPlan] < planOrder["premium"];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1">
        <div className="px-4 py-2">
          <h2 className="text-xs uppercase text-slate-500 font-semibold mb-2">Menu</h2>
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
      </div>

      {/* Example: Add Upgrade link if user < premium */}
      {needsUpgrade && (
        <div className="border-t">
          <div className="px-4 py-2">
            <SidebarItem
              icon={CreditCard}
              label="Upgrade"
              href="/subscription"
            />
          </div>
        </div>
      )}

      <div className="border-t mt-auto">
        <div className="px-4 py-2">
          <h2 className="text-xs uppercase text-slate-500 font-semibold mb-2">Support</h2>
          {supportRoutes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
