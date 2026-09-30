"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Img } from "@/data/content";

// Grid foto + lightbox memakai <dialog> native (fokus & Esc ditangani browser).
export default function Gallery({ images, label, cols = "sm:grid-cols-3 lg:grid-cols-5" }: { images: Img[]; label: string; cols?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState<number | null>(null);
  const close = useCallback(() => { ref.current?.close(); setI(null); }, []);
  const go = useCallback((d: number) => setI((v) => (v === null ? v : (v + d + images.length) % images.length)), [images.length]);

  useEffect(() => { if (i !== null && !ref.current?.open) ref.current?.showModal(); }, [i]);
  useEffect(() => {
    if (i === null) return;
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [i, go]);

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 ${cols}`}>
        {images.map((im, n) => (
          <li key={im.src}>
            <button type="button" onClick={() => setI(n)} aria-label={`Perbesar foto ${n + 1} dari ${images.length}: ${label}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-200">
              <Image src={im.src} alt={`${label} - foto ${n + 1}`} fill sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={ref} onClose={() => setI(null)} onClick={(e) => e.target === ref.current && close()}
        className="m-auto max-h-[92vh] w-[min(96vw,64rem)] rounded-xl bg-navy-950 p-0 text-white backdrop:bg-black/80" aria-label={`Galeri ${label}`}>
        {i !== null && (
          <div className="relative">
            <Image src={images[i].src} alt={`${label} - foto ${i + 1}`} width={images[i].w} height={images[i].h}
              sizes="96vw" className="mx-auto max-h-[80vh] w-auto object-contain" />
            <div className="flex items-center justify-between gap-2 p-3 text-sm">
              <button type="button" onClick={() => go(-1)} className="rounded-md bg-white/10 px-4 py-2 hover:bg-white/20">‹ Sebelumnya</button>
              <span aria-live="polite">{i + 1} / {images.length}</span>
              <button type="button" onClick={() => go(1)} className="rounded-md bg-white/10 px-4 py-2 hover:bg-white/20">Berikutnya ›</button>
            </div>
            <button type="button" onClick={close} aria-label="Tutup galeri"
              className="absolute right-2 top-2 h-10 w-10 rounded-full bg-black/60 text-xl hover:bg-black/80">×</button>
          </div>
        )}
      </dialog>
    </>
  );
}
