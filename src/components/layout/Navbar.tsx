"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/notes", label: "Notes & PYQs" },
  { href: "/food", label: "Food & Shops" },
  { href: "/products", label: "Products" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
            X
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Xcollege
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              Dashboard
            </Link>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link href="/upload">
                <Button size="sm" variant="secondary">
                  Upload
                </Button>
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
                  aria-label="Account menu"
                >
                  {session?.avatarInitial ?? "S"}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {session?.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">{session?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/upload"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Upload Material
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-gray-100 pt-3">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link href="/upload" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" variant="secondary" className="w-full">
                      Upload
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                    <Button size="sm" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
