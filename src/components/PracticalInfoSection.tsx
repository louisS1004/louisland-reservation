import { Clock, MapPin, Car, Train, Utensils, Accessibility, Compass, Sparkles } from 'lucide-react';
import { PARK_SCHEDULES, PRACTICAL_TIPS } from '../data/parkData';

interface PracticalInfoSectionProps {
  onOpenReservation: () => void;
}

export default function PracticalInfoSection({ onOpenReservation }: PracticalInfoSectionProps) {
  return (
    <section id="horaires" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Préparez Votre Visite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Horaires & Accès au Parc
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Toutes les informations pratiques pour un voyage serein et magique au cœur de Louisland.
            </p>
          </div>

          <button
            onClick={onOpenReservation}
            className="self-start md:self-auto px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Réserver pour cette semaine
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Opening Schedule Table */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">Horaires de la semaine</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Les attractions ferment 30 minutes avant la fermeture générale des portes.
              </p>

              <div className="divide-y divide-slate-100">
                {PARK_SCHEDULES.map((item, idx) => {
                  const isToday = idx === 2; // e.g. Wednesday in current simulation
                  return (
                    <div
                      key={item.day}
                      className={`py-3 flex items-center justify-between text-xs sm:text-sm ${
                        isToday ? 'bg-amber-50/60 -mx-3 px-3 rounded-lg font-bold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.day}</span>
                        {isToday && (
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-extrabold uppercase">
                            Aujourd'hui
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-mono tabular-nums text-slate-900 font-semibold">{item.hours}</div>
                        <div className="text-[11px] text-slate-500">{item.crowd}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Grand spectacle nocturne : 20h30 (vendredi & samedi)</span>
            </div>
          </div>

          {/* Access & Getting Here */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">Comment venir à Louisland</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1.5">
                    <Train className="w-4 h-4 text-amber-600" />
                    <span>En Train & TGV</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gare TGV Louisland-Centre. Des navettes électriques partent toutes les 15 minutes directes jusqu'à l'arche d'entrée.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1.5">
                    <Car className="w-4 h-4 text-amber-600" />
                    <span>En Voiture</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Autoroute A6, sortie 14 "Louisland Loisirs". Parking sécurisé 4 000 places avec 60 bornes électriques Tesla & CCS.
                  </p>
                </div>
              </div>

              {/* Simulated Map Visual Card */}
              <div className="mt-5 p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Plan Interactif du Parc</h4>
                    <p className="text-xs text-slate-300">Retrouvez les temps d'attente en direct et vos repères.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('attractions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Explorer les zones
                </button>
              </div>
            </div>

            {/* Practical Services Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRACTICAL_TIPS.map((tip, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
                >
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{tip.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
