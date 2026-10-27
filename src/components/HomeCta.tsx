import React from 'react';
import { Sparkles, BookOpen, ArrowRight, Printer, Star } from 'lucide-react';
import { ColoriKidLogo } from './Logo';

interface HomeCtaProps {
  onStart: () => void;
}

export function HomeCta({ onStart }: HomeCtaProps) {
  return (
    <section className="py-10">
      <div className="bg-gradient-to-br from-pastel-blue/30 via-white to-pastel-yellow/30 rounded-[36px] border-2 border-slate-200/90 p-8 sm:p-14 text-center relative overflow-hidden shadow-xl shadow-slate-100">
        {/* Floating decorative elements */}
        <div className="absolute top-6 left-8 text-2xl opacity-40 animate-bounce">🎨</div>
        <div className="absolute top-12 right-12 text-2xl opacity-40 animate-pulse">✨</div>
        <div className="absolute bottom-8 left-12 text-2xl opacity-40">🖍️</div>
        <div className="absolute bottom-10 right-8 text-2xl opacity-40 animate-bounce">⭐</div>

        <div className="max-w-xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white shadow-lg border border-slate-100 mb-6">
            <ColoriKidLogo size={36} />
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight mb-3">
            Prêt à illuminer les yeux de votre enfant ?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            Quelques secondes suffisent pour créer un souvenir magique, prêt à être imprimé et colorié à la maison.
          </p>

          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-5 bg-soft-coral hover:bg-[#ff7a7a] text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-soft-coral/30 hover:shadow-soft-coral/40 transition-all inline-flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
          >
            <Sparkles size={24} />
            <span>Créer mon premier livre maintenant</span>
            <ArrowRight size={20} />
          </button>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Printer size={14} className="text-blue-500" />
              Format A4 haute résolution
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-amber-500" />
              5 pages d'histoires
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
