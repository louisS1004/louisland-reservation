import { TICKET_PACKAGES } from '../data/parkData';
import { Ticket, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (packageId: string) => void;
}

export default function PricingSection({ onSelectPackage }: PricingSectionProps) {
  return (
    <section id="tarifs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Billetterie Officielle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tarifs Clairs & Avantages en Ligne
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Économisez jusqu'à 8€ par billet en réservant à l'avance sur notre billetterie officielle. Annulation et échange gratuits jusqu'à 48h avant votre venue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TICKET_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'bg-slate-900 text-white shadow-xl ring-2 ring-amber-400 relative'
                  : 'bg-slate-50 text-slate-900 border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                  Le Choix Préféré des Visiteurs
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className={`text-xs mt-1 ${pkg.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {pkg.subtitle}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight">
                    {pkg.priceAdult}€
                  </span>
                  <span className={`text-xs ${pkg.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    / adulte (dès 12 ans)
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className={`text-sm font-semibold tabular-nums ${pkg.popular ? 'text-amber-300' : 'text-amber-700'}`}>
                    {pkg.priceChild}€
                  </span>
                  <span className={`text-xs ${pkg.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    / enfant (3 à 11 ans) · Gratuit -3 ans
                  </span>
                </div>

                <div className={`mt-6 pt-6 border-t ${pkg.popular ? 'border-slate-800' : 'border-slate-200'} space-y-3`}>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-amber-400' : 'text-emerald-600'}`} />
                      <span className={pkg.popular ? 'text-slate-200' : 'text-slate-600'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6">
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>Choisir cette formule</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Garantie Météo & Échange Sans Frais</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                En cas d'intempéries ou d'imprévu, modifiez votre date de visite en un clic jusqu'à 2 heures avant l'ouverture du parc.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPackage('standard-day')}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline underline-offset-4 whitespace-nowrap cursor-pointer shrink-0"
          >
            Voir les conditions &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
