import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Rocket, Castle, Dog, Car, Palette, Compass, ArrowRight, Wand2 } from 'lucide-react';

interface ThemeExplorerProps {
  onSelectTheme: (theme: string, age?: string) => void;
}

interface ThemeItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  suggestedAge: string;
  icon: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  description: string;
}

export function ThemeExplorer({ onSelectTheme }: ThemeExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous les thèmes', icon: Sparkles },
    { id: 'adventure', label: 'Aventure & Espace', icon: Rocket },
    { id: 'magic', label: 'Magie & Féerie', icon: Castle },
    { id: 'animals', label: 'Animaux mignons', icon: Dog },
    { id: 'vehicles', label: 'Véhicules & Métiers', icon: Car },
    { id: 'creative', label: 'Fantaisie & Fun', icon: Palette },
  ];

  const themes: ThemeItem[] = [
    {
      id: 'dino-space',
      name: "Dinosaures dans l'espace",
      category: 'adventure',
      tag: 'Le plus populaire ⭐',
      suggestedAge: '3-8 ans',
      icon: '🦖🚀',
      colorBg: 'bg-blue-50/70',
      colorBorder: 'border-blue-200',
      colorText: 'text-blue-900',
      description: 'Des T-Rex astronautes et des ptérodactyles qui explorent des planètes sucrées.',
    },
    {
      id: 'princess-dragon',
      name: 'Princesses & Dragonniers',
      category: 'magic',
      tag: 'Magique ✨',
      suggestedAge: '3-8 ans',
      icon: '👑🐉',
      colorBg: 'bg-rose-50/70',
      colorBorder: 'border-rose-200',
      colorText: 'text-rose-900',
      description: 'Châteaux enchantés, couronnes étincelantes et bébés dragons câlins.',
    },
    {
      id: 'safari-animals',
      name: 'Safari des animaux rigolos',
      category: 'animals',
      tag: 'Tout doux 🐾',
      suggestedAge: '3-5 ans',
      icon: '🦁🦒',
      colorBg: 'bg-amber-50/70',
      colorBorder: 'border-amber-200',
      colorText: 'text-amber-900',
      description: 'Lions à lunettes de soleil, girafes joueuses et bébés éléphants barbotteurs.',
    },
    {
      id: 'super-heroes',
      name: 'Super-héros de la ville',
      category: 'adventure',
      tag: 'Action ⚡',
      suggestedAge: '6-12 ans',
      icon: '🦸‍♂️⚡',
      colorBg: 'bg-violet-50/70',
      colorBorder: 'border-violet-200',
      colorText: 'text-violet-900',
      description: 'Capes magiques, robots protecteurs et missions secrètes dans les gratte-ciels.',
    },
    {
      id: 'ocean-mermaid',
      name: 'Royaume sous-marin & Sirènes',
      category: 'magic',
      tag: 'Féerique 🧜‍♀️',
      suggestedAge: '3-8 ans',
      icon: '🧜‍♀️🐬',
      colorBg: 'bg-teal-50/70',
      colorBorder: 'border-teal-200',
      colorText: 'text-teal-900',
      description: 'Dauphins danseurs, tortues géantes et palais de coraux merveilleux.',
    },
    {
      id: 'firefighters-cars',
      name: 'Pompiers & Camions de course',
      category: 'vehicles',
      tag: 'Vroum ! 🚒',
      suggestedAge: '3-8 ans',
      icon: '🚒🏎️',
      colorBg: 'bg-orange-50/70',
      colorBorder: 'border-orange-200',
      colorText: 'text-orange-900',
      description: 'Grandes échelles héroïques, bolides supersoniques et casernes animées.',
    },
    {
      id: 'magic-candy',
      name: 'La Forêt des Bonbons géants',
      category: 'creative',
      tag: 'Gourmand 🍭',
      suggestedAge: '3-8 ans',
      icon: '🍭🧁',
      colorBg: 'bg-pink-50/70',
      colorBorder: 'border-pink-200',
      colorText: 'text-pink-900',
      description: 'Arbres en barbe à papa, rivières de chocolat et maisons en pain d’épices.',
    },
    {
      id: 'robot-future',
      name: 'L’Atelier des Petits Robots',
      category: 'adventure',
      tag: 'Inventif 🤖',
      suggestedAge: '6-12 ans',
      icon: '🤖⚙️',
      colorBg: 'bg-cyan-50/70',
      colorBorder: 'border-cyan-200',
      colorText: 'text-cyan-900',
      description: 'Robots cuisiniers, chiens mécaniques et usines d’inventions incroyables.',
    },
  ];

  const filteredThemes = activeCategory === 'all' 
    ? themes 
    : themes.filter(t => t.category === activeCategory);

  return (
    <section className="py-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-yellow/30 text-amber-900 font-bold text-xs mb-3 border border-amber-200/60">
          <Compass size={14} className="text-amber-600" />
          Inspirations & Thèmes favoris
        </div>
        <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight mb-2">
          Quel univers émerveillera votre enfant ?
        </h3>
        <p className="text-slate-600 text-sm sm:text-base">
          Cliquez sur n'importe quel thème pour lancer instantanément la création personnalisée.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-pastel-yellow' : 'text-slate-400'} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredThemes.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`p-5 rounded-3xl border-2 ${item.colorBorder} ${item.colorBg} flex flex-col justify-between transition-shadow hover:shadow-lg relative group`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-slate-700 shadow-xs border border-slate-200/50">
                  {item.suggestedAge}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {item.tag}
              </span>
              <h4 className={`text-lg font-black ${item.colorText} leading-snug font-display mb-2`}>
                {item.name}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <button
              onClick={() => onSelectTheme(item.name, item.suggestedAge.includes('3-5') ? '3-5' : '6-8')}
              className="w-full mt-2 py-2.5 px-3 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs rounded-xl shadow-xs border border-slate-300/80 flex items-center justify-center gap-1.5 transition-all group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900"
            >
              <span>Créer ce livre</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Custom Theme Prompt Banner */}
      <div className="mt-8 p-5 sm:p-6 bg-gradient-to-r from-pastel-blue/20 via-pastel-yellow/20 to-mint-green/20 rounded-3xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-800 shrink-0">
            <Wand2 size={24} className="text-soft-coral" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">Une idée encore plus folle ?</h4>
            <p className="text-xs text-slate-600">Votre enfant rêve de « hamsters ninjas » ou de « tracteurs volants » ? Tout est possible !</p>
          </div>
        </div>
        <button
          onClick={() => onSelectTheme('')}
          className="shrink-0 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
        >
          <span>Inventer mon thème</span>
          <Sparkles size={14} className="text-pastel-yellow" />
        </button>
      </div>
    </section>
  );
}
