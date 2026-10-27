import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface AgeGuideProps {
  onSelectAge: (age: string) => void;
}

export function AgeGuide({ onSelectAge }: AgeGuideProps) {
  const [selectedAgeTab, setSelectedAgeTab] = useState<'3-5' | '6-8' | '9-12'>('3-5');

  const ageData = {
    '3-5': {
      title: '3 à 5 ans : Éveil & Formes Rondes',
      subtitle: 'Pour les tout-petits qui apprennent à tenir leurs crayons sans déborder.',
      icon: '👶',
      badge: 'Traits ultra-épais',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      lineThickness: 'Très épais (5px+)',
      features: [
        'Grandes zones de coloriage faciles à remplir',
        'Contours noirs nets et sans petits recoins frustrants',
        'Personnages attachants et formes épurées',
        'Développe la motricité fine et la reconnaissance des couleurs',
      ],
      sampleThemes: ['Animaux souriants', 'Fruits magiques', 'Petits bolides', 'Doudous rigolos'],
      illustrationPreview: () => (
        <svg viewBox="0 0 160 160" className="w-full h-36 stroke-slate-900 fill-none stroke-[5] stroke-linecap-round stroke-linejoin-round">
          {/* Simple Teddy Bear */}
          <circle cx="80" cy="85" r="40" />
          <circle cx="50" cy="50" r="16" />
          <circle cx="110" cy="50" r="16" />
          <circle cx="68" cy="78" r="4" fill="#1e293b" />
          <circle cx="92" cy="78" r="4" fill="#1e293b" />
          <ellipse cx="80" cy="90" rx="10" ry="7" />
          <path d="M76 96 Q80 102 84 96" />
          {/* Big simple heart in hands */}
          <path d="M80 115 C70 100 50 110 80 135 C110 110 90 100 80 115 Z" fill="#ffe58a" />
        </svg>
      ),
    },
    '6-8': {
      title: '6 à 8 ans : Aventures & Imaginaire',
      subtitle: 'Pour les apprentis artistes qui aiment les scènes pleines d’action et de magie.',
      icon: '🧒',
      badge: 'Scènes narratives',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      lineThickness: 'Épaisseur moyenne (3-4px)',
      features: [
        'Décors stimulants avec plusieurs éléments à explorer',
        'Histoires dynamiques avec un personnage central fort',
        'Textures légères pour apprendre à varier les nuances',
        'Parfait pour les crayons de couleur et les feutres',
      ],
      sampleThemes: ['Dinosaures cosmonautes', 'Princesses chevalières', 'Robots rigolos', 'Cabane dans les arbres'],
      illustrationPreview: () => (
        <svg viewBox="0 0 160 160" className="w-full h-36 stroke-slate-900 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
          {/* Castle with flag & cloud */}
          <rect x="40" y="80" width="80" height="55" rx="3" />
          {/* Towers */}
          <rect x="30" y="55" width="25" height="80" rx="2" />
          <rect x="105" y="55" width="25" height="80" rx="2" />
          <polygon points="42,35 30,55 55,55" />
          <polygon points="117,35 105,55 130,55" />
          <path d="M42 35 L42 22 L52 28 L42 35" fill="#ff8e8e" />
          {/* Door & windows */}
          <path d="M70 135 V105 Q80 95 90 105 V135" />
          <circle cx="42" cy="75" r="4" />
          <circle cx="117" cy="75" r="4" />
          {/* Stars / sparkle */}
          <polygon points="80,45 83,52 90,52 84,56 86,63 80,59 74,63 76,56 70,52 77,52" fill="#ffe58a" />
        </svg>
      ),
    },
    '9-12': {
      title: '9 à 12 ans : Précision & Créativité Avancée',
      subtitle: 'Pour les grands passionnés qui veulent des détails soignés et des univers immersifs.',
      icon: '🧑',
      badge: 'Détails riches',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      lineThickness: 'Finesse et précision (2-3px)',
      features: [
        'Compositions complexes avec arrière-plans détaillés',
        'Motifs artistiques et éléments texturés',
        'Idéal pour travailler les ombrages et les dégradés',
        'Véritable chef-d’œuvre digne d’être encadré',
      ],
      sampleThemes: ['Cités sous-marines', 'Dragons mythiques', 'Mandalas animaliers', 'Vaisseaux futuristes'],
      illustrationPreview: () => (
        <svg viewBox="0 0 160 160" className="w-full h-36 stroke-slate-900 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Detailed Space/Mandala Planet */}
          <circle cx="80" cy="80" r="45" />
          <path d="M25 95 C45 60 115 60 135 95 C115 130 45 130 25 95" strokeWidth="2.5" />
          <circle cx="80" cy="80" r="30" strokeDasharray="3 3" />
          <circle cx="80" cy="80" r="16" />
          <circle cx="80" cy="80" r="6" fill="#a7d8ff" />
          {/* Detailed geometric rays */}
          <line x1="80" y1="20" x2="80" y2="35" />
          <line x1="80" y1="125" x2="80" y2="140" />
          <line x1="20" y1="80" x2="35" y2="80" />
          <line x1="125" y1="80" x2="140" y2="80" />
          <polygon points="40,40 46,46 40,52 34,46" />
          <polygon points="120,40 126,46 120,52 114,46" />
          <polygon points="40,120 46,126 40,132 34,126" />
          <polygon points="120,120 126,126 120,132 114,126" />
        </svg>
      ),
    },
  };

  const current = ageData[selectedAgeTab];

  return (
    <section className="py-8">
      <div className="bg-white rounded-[32px] p-6 sm:p-10 border-2 border-slate-200/80 shadow-lg shadow-slate-100">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue/20 text-blue-900 font-bold text-xs mb-3 border border-blue-200">
            <ShieldCheck size={14} className="text-blue-600" />
            Pédagogie & Motricité
          </div>
          <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight mb-2">
            Des dessins calibrés selon l'âge
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            ColoriKid adapte automatiquement l'épaisseur des traits et la complexité des scènes pour que chaque enfant prenne un plaisir maximal.
          </p>
        </div>

        {/* Age Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto mb-8 p-1.5 bg-slate-100 rounded-2xl">
          {(['3-5', '6-8', '9-12'] as const).map((ageKey) => {
            const isActive = selectedAgeTab === ageKey;
            const data = ageData[ageKey];
            return (
              <button
                key={ageKey}
                onClick={() => setSelectedAgeTab(ageKey)}
                className={`py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md shadow-slate-200 scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="text-base sm:text-lg">{data.icon}</span>
                <span>{ageKey} ans</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Showcase */}
        <motion.div
          key={selectedAgeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200/70"
        >
          {/* Left Column : Illustration preview */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Aperçu du trait
            </span>
            <div className="my-2 flex items-center justify-center w-full">
              {current.illustrationPreview()}
            </div>
            <div className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Épaisseur :</span>
              <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md font-mono text-[11px]">
                {current.lineThickness}
              </span>
            </div>
          </div>

          {/* Right Column : Features & Explanation */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${current.badgeColor}`}>
                {current.badge}
              </span>
              <span className="text-xs font-bold text-slate-400">Pour les enfants de {selectedAgeTab} ans</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {current.title}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {current.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-bold text-slate-700">Idées au top :</span>
                {current.sampleThemes.map((st, idx) => (
                  <span key={idx} className="bg-white px-2 py-1 rounded-md border border-slate-200 font-medium text-[11px]">
                    {st}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onSelectAge(selectedAgeTab)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all shrink-0"
              >
                <span>Créer pour {selectedAgeTab} ans</span>
                <ArrowRight size={14} className="text-pastel-yellow" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
