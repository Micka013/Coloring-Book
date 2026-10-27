import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quel format et quel papier utiliser pour l’impression ?',
      a: 'Le fichier PDF généré est au format A4 standard (21 × 29,7 cm). Nous vous recommandons du papier ordinaire pour imprimante (80g ou 90g) pour les crayons de couleur, ou du papier légèrement plus épais (100g à 120g) si votre enfant utilise des feutres afin d’éviter que l’encre ne traverse.',
    },
    {
      q: 'Comment s’assurer que les dessins conviennent à mon enfant ?',
      a: 'ColoriKid propose 3 paliers d’âge : 3–5 ans (traits très épais, grandes zones rondes), 6–8 ans (scènes amusantes et dynamiques), et 9–12 ans (décors détaillés). Vous pouvez choisir le palier qui correspond le mieux à son aisance.',
    },
    {
      q: 'Puis-je réimprimer le livre plus tard ?',
      a: 'Oui ! Tous les livres créés sont automatiquement conservés dans votre onglet "Mes livres" sur cet appareil. Vous pouvez réouvrir et retélécharger le PDF autant de fois que vous le souhaitez sans refaire de génération.',
    },
    {
      q: 'Quels types de thèmes fonctionnent le mieux ?',
      a: 'Vous pouvez tout demander ! Les thèmes classiques (dinosaures, princesses, animaux, super-héros, véhicules) fonctionnent à merveille, mais vous pouvez aussi inventer des mélanges uniques comme "un chat déguisé en pirate sur une île de glaces" !',
    },
    {
      q: 'Combien de pages contient chaque livre ?',
      a: 'Chaque livre contient 1 belle page de couverture personnalisée avec le prénom et le thème, plus 5 pages de coloriages d’aventures reliées entre elles.',
    },
  ];

  return (
    <section className="py-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 text-slate-700 font-bold text-xs mb-3">
          <HelpCircle size={14} />
          Foire aux questions
        </div>
        <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight mb-2">
          Questions fréquentes
        </h3>
        <p className="text-slate-600 text-sm">
          Tout ce qu’il faut savoir pour des séances de coloriage réussies.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-slate-200/80 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="font-display">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-slate-900' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
