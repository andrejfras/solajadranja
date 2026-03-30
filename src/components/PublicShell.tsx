"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Link from "next/link";

export function PublicHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Header />;
}

export function PublicFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <footer className="bg-navy text-white/80 border-t border-white/5 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-white font-display text-3xl font-light">Navtični tečaji Izola</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
                Od prvega koraka do samostojne plovbe. Strokovno vodenje, vrhunska plovila in izkušnje, ki si jih boste zapomnili za vedno.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 text-xs font-medium tracking-widest uppercase text-white/40">
                <span>98% Uspešnost</span>
                <span className="w-1 h-1 rounded-full bg-coral/50" />
                <span>Garancija Znanja</span>
                <span className="w-1 h-1 rounded-full bg-coral/50" />
                <span>250+ Mnenj</span>
              </div>
            </div>

            <div>
              <h4 className="text-white/50 font-display font-light text-sm tracking-widest uppercase mb-6">Ponudba</h4>
              <ul className="space-y-4">
                <li><Link href="/#courses" className="text-white/70 hover:text-coral text-sm transition-colors font-light">Tečaji</Link></li>
                <li><Link href="/izleti" className="text-white/70 hover:text-coral text-sm transition-colors font-light">Jadralski izleti</Link></li>
                <li><Link href="/boats" className="text-white/70 hover:text-coral text-sm transition-colors font-light">Najem plovil</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white/50 font-display font-light text-sm tracking-widest uppercase mb-6">Kontakt</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:info@solajadranja.si" className="text-white/70 hover:text-coral text-sm transition-colors font-light">
                    info@solajadranja.si
                  </a>
                </li>
                <li>
                  <a href="tel:+38640871110" className="text-white/70 hover:text-coral text-sm transition-colors font-light">
                    +386 40 871 110
                  </a>
                </li>
                <li className="text-white/40 text-sm font-light">Izola, Slovenija</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-white/40 text-sm font-light">&copy; {new Date().getFullYear()} Navtični tečaji Izola. Vse pravice pridržane.</p>
            <Link
              href="/contact"
              className="text-white/40 hover:text-coral text-sm transition-colors tracking-widest uppercase font-medium"
            >
              Pošljite povpraševanje
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/38640871110"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-50 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-fade-in-up"
        aria-label="Kontaktirajte nas preko WhatsApp-a"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Sticky Mobile Booking Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between pb-[max(1rem,env(safe-area-inset-bottom))] animate-fade-in-up">
        <div>
          <span className="block text-xs text-slate-400 font-medium tracking-widest uppercase">Prosti termini</span>
          <span className="block text-coral font-sans font-medium text-lg mt-0.5 mt-[-2px]">
            <span className="text-sm font-light text-slate-500 mr-1">od</span>
            99€
          </span>
        </div>
        <Link href="/#dates" className="bg-navy text-white px-6 py-3.5 text-xs font-medium tracking-widest uppercase rounded-sm shadow-xl flex items-center gap-2">
          Rezerviraj
          <span className="text-white/60">&rarr;</span>
        </Link>
      </div>

      <ExitIntentPopup />
    </>
  );
}
