"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useAuth } from "@clerk/nextjs";
import { Logo } from "@/app/(dashboard)/_components/logo"; // import your Logo component here

export function SubscriptionNavBar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/landing");
  };

  return (
    <nav className="w-full border-b bg-customGray">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/landing" className="flex items-center gap-2">
          <Logo />
          {/* 
            If you also want a text brand name next to logo:
            <span className="text-xl font-bold text-gray-800">DreamPath</span>
          */}
        </Link>

        {/* Right side: signed-in or signed-out controls */}
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-xl text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
