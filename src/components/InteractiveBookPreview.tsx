import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, BookOpen, Printer, Star } from 'lucide-react';
import { ColoriKidLogo } from './Logo';

interface InteractiveBookPreviewProps {
  onSelectTheme: (theme: string, age?: string, name?: string) => void;
}

export function InteractiveBookPreview({ onSelectTheme }: InteractiveBookPreviewProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const sampleBook = {
    childName: 'Léo',
    theme: "Dinosaures de l'espace",
    age: '6-8',
    pages: [
      {
        type: 'cover',
        title: 'Le grand voyage de Léo',
        subtitle: "Dinosaures dans les étoiles",
        renderContent: () => (
          <div className="flex flex-col items-center justify-between h-full p-4 sm:p-6 text-center border-4 border-slate-900 rounded-2xl bg-white relative overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 text-slate-800 font-bold text-xs">⭐</div>
            <div className="absolute top-2 right-2 text-slate-800 font-bold text-xs">⭐</div>
            <div className="absolute bottom-2 left-2 text-slate-800 font-bold text-xs">⭐</div>
            <div className="absolute bottom-2 right-2 text-slate-800 font-bold text-xs">⭐</div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-pastel-yellow/60 border border-slate-800 rounded-full text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-1">
                Livre de Coloriage
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display leading-tight">
                Les Aventures de <span className="text-soft-coral underline decoration-wavy decoration-pastel-blue">Léo</span>
              </h4>
              <p className="text-xs font-bold text-slate-500 mt-1">Mission : Dinosaures de l'Espace 🚀</p>
            </div>

            {/* Central SVG illustration */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 my-auto relative flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full stroke-slate-900 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
                {/* Space Helmet */}
                <circle cx="100" cy="95" r="55" className="stroke-slate-900 stroke-[4]" />
                <path d="M70 95 Q100 65 130 95" strokeDasharray="3 3" className="stroke-slate-400 stroke-2" />
                {/* Dino inside helmet */}
                <path d="M85 110 C80 90 90 75 110 75 C125 75 130 85 125 95 C125 105 115 110 100 112 Z" fill="#ffffff" />
                {/* Dino Eye */}
                <circle cx="112" cy="85" r="3" fill="#1e293b" />
                {/* Dino Smile */}
                <path d="M115 95 Q120 100 112 102" />
                {/* Dino spikes */}
                <path d="M92 78 L95 72 L100 77 L104 70 L109 76" />
                {/* Little stars & planet */}
                <circle cx="45" cy="45" r="12" />
                <path d="M30 45 C35 35 55 35 60 45" />
                <polygon points="155,40 158,48 166,48 160,53 162,60 155,55 148,60 150,53 144,48 152,48" className="fill-pastel-yellow stroke-slate-900" />
                <polygon points="40,150 42,155 48,155 43,158 45,164 40,160 35,164 37,158 32,155 38,155" />
                <polygon points="160,140 162,145 168,145 163,148 165,154 160,150 155,154 157,148 152,145 158,145" />
                {/* Rocket */}
                <path d="M100 150 L90 170 L100 165 L110 170 Z" />
              </svg>
            </div>

            <div className="w-full pb-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200">
                <ColoriKidLogo size={16} />
                <span>ColoriKid • Édition Personnalisée</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        type: 'page',
        pageNumber: 1,
        title: 'Le T-Rex Cosmonaute',
        description: 'Le T-Rex pilote son vaisseau spatial vers la planète Bonbon.',
        renderContent: () => (
          <div className="flex flex-col h-full p-4 sm:p-5 border-4 border-slate-900 rounded-2xl bg-white relative">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-2">
              <span>Page 1 / 5</span>
              <span>ColoriKid • Format A4</span>
            </div>
            <div className="flex-1 flex items-center justify-center my-auto">
              <svg viewBox="0 0 200 200" className="w-full h-44 sm:h-52 stroke-slate-900 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round">
                {/* Rocket body */}
                <path d="M100 25 C130 50 135 110 130 145 L70 145 C65 110 70 50 100 25 Z" />
                {/* Window */}
                <circle cx="100" cy="75" r="22" className="stroke-[3.5]" />
                {/* Dino pilot face inside window */}
                <path d="M92 78 C90 70 95 65 105 65 C112 65 116 70 114 76" />
                <circle cx="106" cy="70" r="2.5" fill="#1e293b" />
                {/* Fins */}
                <path d="M70 115 L45 145 L70 140" />
                <path d="M130 115 L155 145 L130 140" />
                {/* Flames */}
                <path d="M80 145 L85 170 L95 155 L100 180 L105 155 L115 170 L120 145" />
                {/* Stars & Clouds */}
                <circle cx="35" cy="50" r="8" />
                <circle cx="165" cy="65" r="14" />
                <path d="M145 65 C150 55 180 55 185 65" />
                <polygon points="35,110 37,115 43,115 38,118 40,124 35,120 30,124 32,118 27,115 33,115" />
              </svg>
            </div>
            <p className="text-center font-display font-bold text-slate-800 text-xs sm:text-sm mt-1 bg-slate-50 py-1.5 rounded-lg border border-slate-200">
              « Décollage immédiat pour Léo le cosmonaute ! »
            </p>
          </div>
        ),
      },
      {
        type: 'page',
        pageNumber: 2,
        title: 'La planète des Cristaux',
        description: 'Découverte de petits aliens rigolos et de cristaux magiques.',
        renderContent: () => (
          <div className="flex flex-col h-full p-4 sm:p-5 border-4 border-slate-900 rounded-2xl bg-white relative">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-2">
              <span>Page 2 / 5</span>
              <span>ColoriKid • Format A4</span>
            </div>
            <div className="flex-1 flex items-center justify-center my-auto">
              <svg viewBox="0 0 200 200" className="w-full h-44 sm:h-52 stroke-slate-900 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round">
                {/* Ground */}
                <path d="M10 160 Q100 130 190 160" />
                {/* Friendly Triceratops alien */}
                <path d="M80 140 C70 120 75 100 95 95 C115 90 135 105 130 135 Z" />
                {/* Horns */}
                <path d="M85 98 L75 80 L90 92" />
                <path d="M105 92 L105 75 L112 90" />
                {/* Eyes */}
                <circle cx="100" cy="110" r="3" fill="#1e293b" />
                <path d="M105 120 Q112 125 105 130" />
                {/* Big Crystals */}
                <polygon points="40,155 50,105 60,155" />
                <line x1="50" y1="105" x2="50" y2="155" strokeDasharray="3 2" />
                <polygon points="145,155 160,95 175,155" />
                <line x1="160" y1="95" x2="160" y2="155" strokeDasharray="3 2" />
                {/* Moon */}
                <circle cx="150" cy="40" r="18" />
                <circle cx="145" cy="35" r="4" />
                <circle cx="155" cy="48" r="3" />
              </svg>
            </div>
            <p className="text-center font-display font-bold text-slate-800 text-xs sm:text-sm mt-1 bg-slate-50 py-1.5 rounded-lg border border-slate-200">
              « Les gentils dinosaures récoltent des étoiles dorées. »
            </p>
          </div>
        ),
      },
      {
        type: 'page',
        pageNumber: 3,
        title: 'La fête sous les comètes',
        description: 'Grande fête avec gâteau d’anniversaire spatial et confettis.',
        renderContent: () => (
          <div className="flex flex-col h-full p-4 sm:p-5 border-4 border-slate-900 rounded-2xl bg-white relative">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-2">
              <span>Page 3 / 5</span>
              <span>ColoriKid • Format A4</span>
            </div>
            <div className="flex-1 flex items-center justify-center my-auto">
              <svg viewBox="0 0 200 200" className="w-full h-44 sm:h-52 stroke-slate-900 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round">
                {/* Party Cake */}
                <rect x="70" y="120" width="60" height="40" rx="4" />
                <rect x="80" y="95" width="40" height="25" rx="3" />
                {/* Candle */}
                <line x1="100" y1="95" x2="100" y2="80" strokeWidth="3" />
                <path d="M100 80 Q95 72 100 68 Q105 72 100 80" fill="#fde047" />
                {/* Flying Pterodactyl with party hat */}
                <path d="M30 60 Q70 40 100 60 Q130 40 170 60 Q100 75 30 60 Z" />
                <polygon points="100,50 95,35 105,35" fill="#ff8e8e" />
                {/* Balloons */}
                <circle cx="45" cy="100" r="14" />
                <path d="M45 114 Q40 135 48 150" />
                <circle cx="155" cy="100" r="14" />
                <path d="M155 114 Q160 135 152 150" />
              </svg>
            </div>
            <p className="text-center font-display font-bold text-slate-800 text-xs sm:text-sm mt-1 bg-slate-50 py-1.5 rounded-lg border border-slate-200">
              « Joyeux goûter magique dans la galaxie ! »
            </p>
          </div>
        ),
      },
    ],
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % sampleBook.pages.length);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + sampleBook.pages.length) % sampleBook.pages.length);
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50/80 p-5 sm:p-7 rounded-[32px] border-2 border-slate-200/80 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      {/* Top Banner inside preview */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-pastel-yellow/40 flex items-center justify-center text-yellow-700">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 leading-tight">Aperçu interactif</h4>
            <p className="text-[11px] text-slate-500 font-medium">Exemple de livre généré en 15 secondes</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-pastel-blue/20 px-2.5 py-1 rounded-full">
          <Printer size={12} />
          Qualité 300 DPI A4
        </span>
      </div>

      {/* Book Mockup Frame */}
      <div className="relative mx-auto max-w-[320px] sm:max-w-[360px] aspect-[1/1.35] mb-5">
        {/* Book spine shadow simulation */}
        <div className="absolute -left-3 top-3 bottom-3 w-4 bg-slate-300 rounded-l-md blur-sm opacity-60"></div>
        
        {/* Active Page Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: -12, scale: 0.96 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full bg-white shadow-2xl rounded-r-2xl rounded-l-md border-l-[10px] border-l-pastel-blue relative"
          >
            {/* Page Content */}
            {sampleBook.pages[currentPage].renderContent()}

            {/* Turn effect highlight */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none rounded-r-2xl"></div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows floating */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all z-10"
          title="Page précédente"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all z-10"
          title="Page suivante"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        {sampleBook.pages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              currentPage === idx
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {idx === 0 ? 'Couverture' : `Page ${idx}`}
          </button>
        ))}
      </div>

      {/* Quick Launch with this sample */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold text-slate-700">Vous aimez cet univers ?</p>
          <p className="text-[11px] text-slate-500">Adaptez-le avec le prénom de votre enfant</p>
        </div>
        <button
          onClick={() => onSelectTheme(sampleBook.theme, sampleBook.age, sampleBook.childName)}
          className="w-full sm:w-auto px-4 py-2.5 bg-soft-coral hover:bg-[#ff7a7a] text-white font-bold text-xs rounded-xl shadow-md shadow-soft-coral/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <BookOpen size={14} />
          Créer un livre similaire
        </button>
      </div>
    </div>
  );
}
