import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Wand2, BookOpen, Printer, Star, Heart, ArrowRight } from 'lucide-react';
import { InteractiveBookPreview } from './InteractiveBookPreview';

interface HomeHeroProps {
  onQuickGenerate: (name: string, age: string, theme: string) => void;
  onSelectTheme: (theme: string, age?: string, name?: string) => void;
}

export function HomeHero({ onQuickGenerate, onSelectTheme }: HomeHeroProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('3-5');
  const [theme, setTheme] = useState('');

  const quickThemes = [
    'Dinosaures cosmonautes',
    'Princesses & Licornes',
    'Safari des animaux',
    'Pompiers héros',
  ];

  const sampleNames = ['Léo', 'Mia', 'Arthur', 'Chloé', 'Noah', 'Jade'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !theme.trim()) {
      // If either is empty, jump to create tab with whatever is filled
      onSelectTheme(theme, age, name);
      return;
    }
    onQuickGenerate(name, age, theme);
  };

  return (
    <section className="pt-2 pb-10">
      {/* Top Tag */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pastel-blue/25 via-pastel-yellow/25 to-soft-coral/25 border border-slate-300/80 text-slate-800 text-xs sm:text-sm font-bold shadow-xs">
          <Sparkles size={16} className="text-amber-500 animate-spin-slow" />
          <span>L'atelier magique des petits artistes</span>
          <span className="bg-soft-coral text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-black">
            Nouveau
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] font-display tracking-tight mb-4">
          Offrez un livre de coloriage <br className="hidden sm:inline" />
          <span className="relative inline-block px-2">
            <span className="relative z-10 text-soft-coral">au prénom</span>
            <span className="absolute bottom-1.5 left-0 right-0 h-3.5 bg-pastel-yellow/60 -rotate-1 rounded-sm -z-0"></span>
          </span>{' '}
          de votre enfant
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Choisissez ses héros favoris et son âge. ColoriKid génère instantanément un livre de <strong>5 pages A4</strong> personnalisé et prêt à imprimer.
        </p>
      </div>

      {/* Hero Dual Grid (Quick Launch Card + Interactive Book Showcase) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Creator Card */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-[32px] border-2 border-slate-200/90 shadow-xl shadow-slate-100/80 relative">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-soft-coral text-white flex items-center justify-center shadow-md shadow-soft-coral/30">
              <Wand2 size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-display leading-tight">
                Créateur instantané
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Personnalisez le livre en 3 clics
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Child's Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  1. Prénom de l'enfant
                </label>
                <div className="flex gap-1 items-center">
                  <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">Exemples :</span>
                  {sampleNames.slice(0, 3).map((sn) => (
                    <button
                      key={sn}
                      type="button"
                      onClick={() => setName(sn)}
                      className="text-[11px] font-bold text-slate-500 hover:text-blue-600 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-pastel-blue/20 transition-colors"
                    >
                      {sn}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Léo, Léa, Arthur, Mila..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/20 outline-none transition-all text-base font-medium text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Age Selector */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                2. Âge (pour calibrer les traits)
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { key: '3-5', label: '3-5 ans', sub: 'Traits très épais' },
                  { key: '6-8', label: '6-8 ans', sub: 'Scènes fun' },
                  { key: '9-12', label: '9-12 ans', sub: 'Détails fins' },
                ].map((item) => {
                  const isSelected = age === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setAge(item.key)}
                      className={`p-2.5 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="block font-black text-xs sm:text-sm font-display">{item.label}</span>
                      <span className={`block text-[10px] font-medium leading-tight mt-0.5 ${isSelected ? 'text-pastel-yellow' : 'text-slate-400'}`}>
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme input & Quick picks */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                3. Thème ou passion
              </label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Ex: Dinosaures dans l'espace, Licornes..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/20 outline-none transition-all text-base font-medium text-slate-800 placeholder:text-slate-400 mb-2"
              />

              <div className="flex flex-wrap gap-1.5">
                {quickThemes.map((qt) => (
                  <button
                    key={qt}
                    type="button"
                    onClick={() => setTheme(qt)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-pastel-blue/30 hover:text-blue-900 transition-all border border-slate-200/80"
                  >
                    + {qt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-soft-coral hover:bg-[#ff7a7a] text-white font-black text-base sm:text-lg py-4 rounded-2xl shadow-xl shadow-soft-coral/30 hover:shadow-soft-coral/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
              >
                <Sparkles size={20} />
                <span>Générer mon livre de coloriage</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-center text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">🖨️ PDF A4 Haute Définition</span>
              <span>•</span>
              <span className="flex items-center gap-1">⚡ 100% Prêt en 30s</span>
              <span>•</span>
              <span className="flex items-center gap-1">✂️ Économe en encre</span>
            </div>
          </form>
        </div>

        {/* Right: Interactive Book Showcase */}
        <div className="lg:col-span-6">
          <InteractiveBookPreview onSelectTheme={onSelectTheme} />
        </div>
      </div>
    </section>
  );
}
