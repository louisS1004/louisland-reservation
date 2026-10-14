import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export default function Footer({ onOpenReservation }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                <Sparkles className="w-4 h-4 fill-slate-950" />
              </span>
              <span className="text-xl font-extrabold text-white tracking-tight">Louisland</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le parc d'attraction féerique et à sensations de référence. Des moments inoubliables en famille et entre amis.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Billetterie en ligne
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#accueil" className="hover:text-amber-400 transition-colors">
                  Accueil & Présentation
                </a>
              </li>
              <li>
                <a href="#attractions" className="hover:text-amber-400 transition-colors">
                  Attractions & Manèges
                </a>
              </li>
              <li>
                <a href="#horaires" className="hover:text-amber-400 transition-colors">
                  Horaires d'ouverture
                </a>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-amber-400 transition-colors">
                  Tarifs & Formules
                </a>
              </li>
            </ul>
          </div>

          {/* Practical Info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Informations Pratiques</h4>
            <ul className="space-y-2.5">
              <li>Plan du parc dématérialisé</li>
              <li>Accessibilité handicap (PMR)</li>
              <li>Règlement intérieur du parc</li>
              <li>Objets trouvés & Consignes</li>
              <li>Restaurants & Menus enfant</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Nous Contacter</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>100 Avenue de la Féerie, 77000 Domaine de Louisland</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>01 40 50 60 70 (7j/7, 9h-19h)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@louisland-parc.fr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Louisland Parc d'Attraction. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Mentions Légales</span>
            <span>Conditions Générales de Vente</span>
            <span>Gestion des Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
