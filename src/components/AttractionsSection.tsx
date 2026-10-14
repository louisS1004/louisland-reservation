import { useState } from 'react';
import { ATTRACTIONS, FAVORITE_DISHES } from '../data/parkData';
import { Clock, Gauge, UserCheck, Sparkles, Flame, Heart, UtensilsCrossed, ShieldCheck, ChevronRight } from 'lucide-react';

interface AttractionsSectionProps {
  onOpenReservation: () => void;
}

export default function AttractionsSection({ onOpenReservation }: AttractionsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'parkour' | 'thrill' | 'family' | 'food'>('all');
  const [showDishDetails, setShowDishDetails] = useState(false);

  const filteredAttractions = filter === 'all'
    ? ATTRACTIONS
    : ATTRACTIONS.filter((a) => {
        if (filter === 'parkour') return a.category === 'parkour' || a.id === 'looping-challenge';
        return a.category === filter;
      });

  return (
    <section id="attractions" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Nouveautés & Univers Exclusifs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Les Attractions & Expériences de Louisland
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Retrouvez le Parkour Parc et ses modules, le Looping Challenge, l'univers féerique de Sally Land avec ses Golden Retrievers, et le restaurant des plats préférés de Louis !
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl overflow-x-auto shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tout voir
            </button>
            <button
              onClick={() => setFilter('parkour')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'parkour'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>Parkour & Looping</span>
            </button>
            <button
              onClick={() => setFilter('family')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'family'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-amber-600" />
              <span>Sally Land (Goldens)</span>
            </button>
            <button
              onClick={() => setFilter('food')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'food'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-rose-600" />
              <span>Plats Préférés</span>
            </button>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((attraction) => (
            <div
              key={attraction.id}
              className={`group bg-white rounded-2xl overflow-hidden border transition-all flex flex-col ${
                attraction.featured
                  ? 'border-slate-300 shadow-md hover:shadow-xl'
                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Zone Label */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium text-white shadow-sm">
                  {attraction.zone}
                </div>

                {/* Wait time / access indicator */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="tabular-nums">{attraction.waitTime}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-amber-700">{attraction.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      {attraction.minHeight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                    {attraction.name}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {attraction.description}
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {attraction.category === 'food' ? (
                    <button
                      onClick={() => setShowDishDetails(true)}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Voir la carte des plats</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-500 font-medium mr-1">Sensations:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className={`w-2 h-2 rounded-full ${
                              lvl <= attraction.thrillLevel ? 'bg-amber-500' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={onOpenReservation}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    Réserver &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Spotlight: Le Restaurant des Plats Préférés de Louis */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left: Food Photography */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900">
              <img
                src={ATTRACTIONS.find((a) => a.id === 'resto-plats-preferes')?.image}
                alt="Plats préférés : Burger, Dame Blanche et Île Flottante"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                  100% Plats Préférés de Louis
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  Des recettes authentiques, préparées maison à la minute.
                </p>
              </div>
            </div>

            {/* Right: The Menu Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1.5">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>La Carte Gourmande</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Le Spot Gourmand : Les Plats Préférés
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Pas de plats compliqués : ici, vous ne trouverez que les meilleurs classiques adorés par Louis !
                </p>

                {/* Dish Cards */}
                <div className="mt-6 space-y-4">
                  {FAVORITE_DISHES.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{dish.name}</h4>
                          {dish.badge && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                              {dish.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>
                      <div className="text-right sm:shrink-0">
                        <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                          {dish.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Accès libre pour tous les visiteurs du parc · Terrasse panoramique ombragée
                </span>
                <button
                  onClick={onOpenReservation}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Réserver vos entrées pour Louisland
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
