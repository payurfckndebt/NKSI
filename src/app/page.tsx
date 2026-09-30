import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import WorkCard from "@/components/WorkCard";
import { about, clients, gcWorks, misi, projects, sectors, services, single, tools, visi } from "@/data/content";
import { site } from "@/data/site";

export default function Home() {
  const hero = single("hero"), aboutImg = single("about");
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <Image src={hero.src} alt="Storage tank hasil pekerjaan NKSI" fill priority quality={55} sizes="100vw" className="-z-10 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
        <div className="container-x py-20 sm:py-28 lg:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Est. {site.founded}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">{site.tagline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Dari engineering hingga installation, commissioning, dan maintenance: solusi industri terintegrasi untuk proyek Anda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontak" className="rounded-md bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800">Hubungi Kami</Link>
            <Link href="#proyek" className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">Lihat Proyek</Link>
          </div>
        </div>
      </section>

      {/* TENTANG KAMI */}
      <Section id="tentang" eyebrow="Tentang Kami" title="Kontraktor umum dengan layanan engineering terintegrasi">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-slate-700">
            {about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Sektor yang dilayani">
              {sectors.map((s) => <li key={s} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{s}</li>)}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image src={aboutImg.src} alt="Tim NKSI memeriksa komponen fabrikasi di workshop" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" loading="lazy" />
          </div>
        </div>
      </Section>

      {/* VISI & MISI */}
      <Section id="visi-misi" eyebrow="Visi & Misi" title="Arah dan komitmen kami" tone="mist">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="rounded-2xl bg-navy-900 p-8 text-white lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Visi</h3>
            <p className="mt-4 text-lg leading-relaxed">{visi}</p>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Misi</h3>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2">
              {misi.map((m, i) => (
                <li key={m} className="rounded-xl bg-white p-5 shadow-sm">
                  <span className="text-2xl font-extrabold text-brand-700">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* OUR CORE SERVICES */}
      <Section id="layanan" eyebrow="Our Core Services" title="Layanan inti kami">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.no} className="rounded-xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-bold text-brand-600">{s.no}</p>
              <h3 className="mt-1 text-xl font-bold text-navy-900">{s.title}</h3>
              {s.desc && <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>}
              {s.items.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />{it}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* KLIEN */}
      <Section id="klien" eyebrow="Klien" title="Klien kami" tone="mist">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <li key={c.name} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy-900 text-sm font-extrabold text-gold-400">
                {c.name.replace(/^PT\.?\s*/i, "").charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="font-semibold leading-snug text-navy-900">{c.name}</p>
                {c.place && <p className="text-xs text-slate-600">{c.place}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* TOOLS */}
      <Section id="tools" eyebrow="Tools" title="Peralatan kerja kami" intro="Dokumentasi peralatan kerja NKSI.">
        <Gallery images={tools} label="Peralatan kerja NKSI" />
      </Section>

      {/* PROYEK KAMI */}
      <Section id="proyek" eyebrow="Project Kami" title="Proyek yang telah kami kerjakan" tone="mist">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => <li key={p.slug}><WorkCard work={p} base="/proyek" /></li>)}
        </ul>
      </Section>

      {/* GENERAL CONTRACTOR */}
      <Section id="general-contractor" eyebrow="General Contractor" title="Proyek General Contractor kami">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gcWorks.map((p) => <li key={p.slug}><WorkCard work={p} base="/general-contractor" /></li>)}
        </ul>
      </Section>

      {/* CTA */}
      <section className="bg-brand-700 py-14 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Let&rsquo;s build your project together</h2>
            <p className="mt-2 max-w-xl text-brand-100">Integrated Industrial Solutions untuk kebutuhan proyek Anda.</p>
          </div>
          <Link href="/kontak" className="rounded-md bg-white px-6 py-3 font-semibold text-brand-800 hover:bg-brand-50">Hubungi Kami</Link>
        </div>
      </section>
    </>
  );
}
