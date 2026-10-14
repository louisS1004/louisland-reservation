import { Ticket, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/parkData';

interface HeroProps {
  onOpenReservation: () => void;
}

export default function Hero({ onOpenReservation }: HeroProps) {
  return (
    <section id="accueil" className="relative w-full overflow-hidden bg-slate-950">
      {/* Main Park Image Showcase Container */}
      <div className="relative w-full h-[82vh] min-h-[580px] max-h-[820px] flex items-center justify-center">
        {/* Park Image with subtle zoom on load */}
        <img
          src={HERO_IMAGE}
          alt="Vue panoramique féerique du parc d'attraction Louisland au coucher du soleil"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
          onError={(e) => {
            // Resilient fallback container if needed
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Measured Scrim for Typographic Contrast & Immersion */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />

        {/* Central Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
          {/* Subtle kicker without pill enclosure */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 fill-amber-300" />
            <span>Saison 2026 · Le Royaume des Sensations</span>
            <Sparkles className="w-4 h-4 fill-amber-300" />
          </div>

          {/* Grand Headline with balanced text wrap */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight [text-wrap:balance]">
            Bienvenue à <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">Louisland</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-9 font-normal leading-relaxed [text-wrap:balance]">
            Découvrez le Parkour Parc, le Looping Challenge acrobatique, l'univers féerique de Sally Land et ses Golden Retrievers, ainsi que notre restaurant de burgers et douceurs !
          </p>

          {/* Just the reservation button as specifically requested */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenReservation}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-9 py-4 text-base sm:text-lg font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-2xl shadow-xl hover:shadow-amber-400/25 transition-all duration-200 cursor-pointer group"
              aria-label="Réserver vos billets pour Louisland"
            >
              <Ticket className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Réserver vos billets</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Unboxed reassurance metadata */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Annulation gratuite 48h</span>
            </div>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Ouvert aujourd'hui 10h00 - 20h00</span>
            </div>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <span>E-billet instantané sur smartphone</span>
          </div>
        </div>
      </div>

      {/* Quick Info Bar below Hero */}
      <div className="border-t border-slate-800 bg-slate-900/90 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="py-2">
            <p className="text-2xl font-extrabold text-amber-400 tabular-nums">32</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Attractions ouvertes</p>
          </div>
          <div className="py-2 border-l border-slate-800">
            <p className="text-2xl font-extrabold text-emerald-400 tabular-nums">15 min</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Temps d'attente moyen</p>
          </div>
          <div className="py-2 border-l border-slate-800">
            <p className="text-2xl font-extrabold text-white tabular-nums">10h - 20h</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Horaires du jour</p>
          </div>
          <div className="py-2 border-l border-slate-800">
            <p className="text-2xl font-extrabold text-amber-300 tabular-nums">Dès 34€</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Tarif enfant en ligne</p>
          </div>
        </div>
      </div>
    </section>
  );
}
