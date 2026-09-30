"use client";
import { useRef, useState } from "react";

type State = { status: "idle" | "sending" | "ok" | "error"; msg?: string; errors?: Record<string, string> };

export default function ContactForm() {
  const [s, setS] = useState<State>({ status: "idle" });
  const started = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form));
    setS({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fd, elapsed: Date.now() - started.current }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { form.reset(); setS({ status: "ok", msg: "Terima kasih, pesan Anda sudah terkirim." }); }
      else setS({ status: "error", msg: j.error ?? "Gagal mengirim pesan.", errors: j.errors });
    } catch {
      setS({ status: "error", msg: "Koneksi bermasalah. Coba lagi atau hubungi kami lewat telepon." });
    }
  }

  const field = "mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-base focus:border-brand-600";
  const err = (k: string) => s.errors?.[k] && <p id={`${k}-err`} className="mt-1 text-sm text-red-700">{s.errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Honeypot: disembunyikan dari pengguna, bot biasanya mengisinya */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-semibold">Nama <span className="text-red-700" aria-hidden="true">*</span></label>
        <input id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} aria-describedby={s.errors?.name ? "name-err" : undefined} aria-invalid={!!s.errors?.name} />
        {err("name")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-semibold">Email <span className="text-red-700" aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} aria-describedby={s.errors?.email ? "email-err" : undefined} aria-invalid={!!s.errors?.email} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold">Telepon</label>
          <input id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" className={field} aria-describedby={s.errors?.phone ? "phone-err" : undefined} aria-invalid={!!s.errors?.phone} />
          {err("phone")}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold">Pesan <span className="text-red-700" aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows={6} required minLength={10} maxLength={2000} className={field} aria-describedby={s.errors?.message ? "message-err" : undefined} aria-invalid={!!s.errors?.message} />
        {err("message")}
      </div>

      <button type="submit" disabled={s.status === "sending"} className="w-full rounded-md bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60 sm:w-auto">
        {s.status === "sending" ? "Mengirim…" : "Kirim Pesan"}
      </button>
      <p role="status" aria-live="polite" className={`text-sm ${s.status === "ok" ? "text-green-800" : "text-red-700"}`}>{s.msg}</p>
    </form>
  );
}
