"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Lewati ke konten
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} - beranda`}>
          <Image src="/logo.png" alt="" width={40} height={32} priority className="h-8 w-auto" />
          <span className="text-[13px] font-extrabold leading-tight tracking-wide text-navy-900 sm:text-sm">
            PT NAGA KARYA
            <br className="sm:hidden" /> SAKTI INDONESIA
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-md px-3 py-2 text-slate-700 hover:bg-brand-50 hover:text-brand-700">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Navigasi seluler" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="container-x py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block rounded-md px-2 py-3 text-base font-medium text-slate-800 hover:bg-brand-50">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
