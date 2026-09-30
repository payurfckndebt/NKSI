import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/content";

export default function WorkCard({ work, base }: { work: Work; base: string }) {
  const cover = work.images[0];
  return (
    <Link href={`${base}/${work.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <Image src={cover.src} alt={`${work.title} - foto utama`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2.5 py-1 text-xs font-semibold text-white">{work.images.length} foto</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-navy-900">{work.title}</h3>
        {work.client && <p className="mt-1 text-sm text-slate-600">{work.client}</p>}
        <span className="mt-auto pt-4 text-sm font-semibold text-brand-700 group-hover:underline">Lihat dokumentasi →</span>
      </div>
    </Link>
  );
}
