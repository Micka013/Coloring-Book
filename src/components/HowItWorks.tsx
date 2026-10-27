import React from 'react';
import { Sparkles, Palette, Type, Download, Printer, Check } from 'lucide-react';

interface HowItWorksProps {
  onStart: () => void;
}

export function HowItWorks({ onStart }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      title: 'Imaginez l’univers',
      subtitle: 'Choisissez un thème et l’âge',
      description: 'Dinosaures, princesses, super-héros, ou inventez votre propre idée délirante.',
      icon: Palette,
      colorBg: 'bg-pastel-yellow/30',
      colorIcon: 'text-amber-700',
      colorBorder: 'border-amber-200',
      badge: 'Créatif',
    },
    {
      number: '02',
      title: 'Personnalisez au prénom',
      subtitle: 'Pour un livre 100% unique',
      description: 'L’IA compose une couverture élégante au prénom de votre enfant et 5 pages d’aventures reliées.',
      icon: Type,
      colorBg: 'bg-pastel-blue/30',
      colorIcon: 'text-blue-700',
      colorBorder: 'border-blue-200',
      badge: 'Sur-mesure',
    },
    {
      number: '03',
      title: 'Imprimez & Coloriez',
      subtitle: 'Fichier PDF A4 haute résolution',
      description: 'Téléchargez immédiatement votre livre prêt à imprimer. Traits noirs francs pour économiser votre encre.',
      icon: Printer,
      colorBg: 'bg-mint-green/30',
      colorIcon: 'text-emerald-700',
      colorBorder: 'border-emerald-200',
      badge: 'Instantané',
    },
  ];

  return (
    <section className="py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-coral/15 text-rose-900 font-bold text-xs mb-3 border border-rose-200/60">
          <Sparkles size={14} className="text-rose-600" />
          Simple & Rapide en 3 étapes
        </div>
        <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight mb-2">
          Comment naît la magie ColoriKid ?
        </h3>
        <p className="text-slate-600 text-sm sm:text-base">
          En moins de 30 secondes, transformez l'imagination de votre enfant en un véritable cahier de coloriage physique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting Line on desktop */}
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-amber-200 via-blue-200 to-emerald-200 -z-10 -translate-y-8"></div>

        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/80 shadow-md shadow-slate-100 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${st.colorBg} border ${st.colorBorder} flex items-center justify-center ${st.colorIcon} shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-slate-900 transition-colors font-mono">
                    {st.number}
                  </span>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                  {st.badge}
                </span>
                <h4 className="text-xl font-black text-slate-900 font-display mb-1">
                  {st.title}
                </h4>
                <p className="text-xs font-bold text-soft-coral mb-2">
                  {st.subtitle}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                <Check size={14} className="text-emerald-500" />
                <span>{idx === 0 ? 'Choix illimité d’idées' : idx === 1 ? 'Création de 5 pages IA' : 'Prêt pour toute imprimante'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
