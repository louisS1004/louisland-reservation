import { useState, useId } from 'react';
import { X, Calendar, Ticket, CheckCircle2, User, Sparkles, ShieldCheck, Download, Printer, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { TICKET_PACKAGES } from '../data/parkData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
}

export default function ReservationModal({
  isOpen,
  onClose,
  initialPackageId = 'standard-day',
}: ReservationModalProps) {
  const formId = useId();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Default date: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [packageId, setPackageId] = useState(initialPackageId);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [infantCount, setInfantCount] = useState(0);
  const [fastPass, setFastPass] = useState(false);
  const [parking, setParking] = useState(true);

  // Visitor info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentPkg = TICKET_PACKAGES.find((p) => p.id === packageId) || TICKET_PACKAGES[0];

  const adultSubtotal = adultCount * currentPkg.priceAdult;
  const childSubtotal = childCount * currentPkg.priceChild;
  const fastPassCost = fastPass ? (adultCount + childCount) * 15 : 0;
  const parkingCost = parking ? 10 : 0;
  const total = adultSubtotal + childSubtotal + fastPassCost + parkingCost;

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 3) {
      if (!firstName || !lastName || !email) {
        return;
      }
      // Generate booking reference
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setBookingRef(`LLS-2026-${randomNum}`);
      setStep(4);
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
  };

  const handleReset = () => {
    setStep(1);
    setBookingRef('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 id="reservation-modal-title" className="text-lg font-bold">
                {step === 4 ? 'Réservation Confirmée !' : 'Billetterie Officielle Louisland'}
              </h2>
              <p className="text-xs text-slate-300">
                {step === 1 && 'Étape 1 sur 3 · Choix de la date de visite'}
                {step === 2 && 'Étape 2 sur 3 · Choix des billets & options'}
                {step === 3 && 'Étape 3 sur 3 · Informations du visiteur'}
                {step === 4 && 'Vos billets électroniques sont prêts'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fermer la fenêtre de réservation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        {step < 4 && (
          <div className="w-full bg-slate-100 h-1.5 flex">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Date & Package Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor={`${formId}-date`} className="block text-sm font-bold text-slate-900 mb-2">
                  1. Date de votre venue
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-date`}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Billet échangeable sans frais jusqu'à 48h avant la visite</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  2. Type de pass ou billet
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TICKET_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setPackageId(pkg.id)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                        packageId === pkg.id
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{pkg.name}</div>
                      <div className="text-base font-extrabold text-amber-600 mt-1 tabular-nums">
                        {pkg.priceAdult}€ <span className="text-[10px] text-slate-500 font-normal">/ adulte</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-sm"
                >
                  <span>Continuer vers les participants</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Participants & Options */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Nombre de visiteurs</h3>

                {/* Adult Counter */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Adulte (12 ans et plus)</div>
                    <div className="text-xs text-slate-500">{currentPkg.priceAdult}€ par personne</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                      disabled={adultCount <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums text-slate-900">
                      {adultCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdultCount(adultCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Child Counter */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Enfant (3 à 11 ans)</div>
                    <div className="text-xs text-slate-500">{currentPkg.priceChild}€ par personne</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums text-slate-900">
                      {childCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildCount(childCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Infant Free */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Bébé (Moins de 3 ans)</div>
                    <div className="text-xs text-emerald-600 font-semibold">Gratuit (Billet requis)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums text-slate-900">
                      {infantCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInfantCount(infantCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Addon Options */}
              <div className="pt-2 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Options confort</h3>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fastPass}
                    onChange={(e) => setFastPass(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>Option Coupe-File FastPass Express (+15€ / pers)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Accès prioritaire à 4 attractions majeures sans file d'attente.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>Place de Parking Sécurisé (+10€ la journée)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Place garantie à 3 minutes à pied de l'arche d'entrée de Louisland.
                    </div>
                  </div>
                </label>
              </div>

              {/* Price preview */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-900 font-medium">Total estimé</div>
                  <div className="text-xs text-slate-600">Pour {adultCount + childCount + infantCount} visiteur(s)</div>
                </div>
                <div className="text-2xl font-extrabold text-slate-950 tabular-nums">
                  {total}€
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-slate-600 hover:text-slate-950 font-semibold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-sm"
                >
                  <span>Vos coordonnées</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Validation */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Où envoyer vos billets électroniques ?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${formId}-firstname`} className="block text-xs font-semibold text-slate-700 mb-1">
                    Prénom *
                  </label>
                  <input
                    id={`${formId}-firstname`}
                    type="text"
                    required
                    placeholder="Ex: Louis"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-lastname`} className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom *
                  </label>
                  <input
                    id={`${formId}-lastname`}
                    type="text"
                    required
                    placeholder="Ex: Dupont"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="block text-xs font-semibold text-slate-700 mb-1">
                  Adresse e-mail (pour réception des e-billets) *
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  required
                  placeholder="nom@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro de téléphone mobile
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              {/* Summary card before pay */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Formule :</span>
                  <span className="font-semibold text-slate-900">{currentPkg.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date de visite :</span>
                  <span className="font-semibold text-slate-900">{date}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Visiteurs :</span>
                  <span className="font-semibold text-slate-900">
                    {adultCount} adulte(s)
                    {childCount > 0 ? `, ${childCount} enfant(s)` : ''}
                    {infantCount > 0 ? `, ${infantCount} bébé(s)` : ''}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Montant total à régler :</span>
                  <span className="text-amber-600 tabular-nums text-base">{total}€</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-slate-600 hover:text-slate-950 font-semibold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmer la réservation ({total}€)</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation & Electronic Ticket Showcase */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  Félicitations {firstName} !
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Votre venue à Louisland est confirmée. Vos billets ont également été envoyés à <span className="font-semibold text-slate-900">{email}</span>.
                </p>
              </div>

              {/* Mockup E-Ticket */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl text-left relative overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-base tracking-tight text-white">LOUISLAND</span>
                  </div>
                  <span className="text-xs font-mono bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded">
                    {bookingRef}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Titulaire</span>
                    <span className="font-bold text-sm text-white">{firstName} {lastName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Date de visite</span>
                    <span className="font-bold text-sm text-amber-300">{date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Formule</span>
                    <span className="font-semibold text-slate-200">{currentPkg.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Accès</span>
                    <span className="font-semibold text-slate-200">
                      {adultCount + childCount} place(s) {fastPass ? '· Coupe-File' : ''}
                    </span>
                  </div>
                </div>

                {/* Simulated QR Code */}
                <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Présentez ce QR Code aux bornes</span>
                    <span className="text-xs font-mono text-slate-300">Porte A · Entrée Principale</span>
                  </div>
                  {/* Clean SVG QR mockup */}
                  <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-full h-full fill-slate-950">
                      <rect x="2" y="2" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <rect x="5" y="5" width="4" height="4" />
                      <rect x="20" y="2" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <rect x="23" y="5" width="4" height="4" />
                      <rect x="2" y="20" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <rect x="5" y="23" width="4" height="4" />
                      <rect x="15" y="4" width="2" height="6" />
                      <rect x="15" y="14" width="4" height="4" />
                      <rect x="20" y="15" width="4" height="2" />
                      <rect x="20" y="20" width="2" height="6" />
                      <rect x="25" y="24" width="4" height="4" />
                      <rect x="14" y="22" width="3" height="3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer le billet</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Terminer</span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
                >
                  Effectuer une autre réservation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
