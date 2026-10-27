import React from 'react';
import { Printer, EyeOff, HeartHandshake, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export function ParentBenefits() {
  const benefits = [
    {
      icon: Printer,
      title: 'Économie d’encre garantie',
      description: 'Dessins au trait noir franc et épuré (line-art), sans grands aplats d’encre noire qui ruinent vos cartouches d’imprimante.',
      badge: 'Zéro gaspillage',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      icon: EyeOff,
      title: 'Activité 100% sans écran',
      description: 'Une fois le fichier PDF imprimé, votre enfant s’installe à table avec ses feutres pour un moment calme, concentré et créatif.',
      badge: 'Bien-être enfant',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
    },
    {
      icon: HeartHandshake,
      title: 'Fierté & Confiance en soi',
      description: 'Avoir son prénom en grand sur la couverture rend chaque enfant fier de son livre et stimule son envie de colorier jusqu’au bout.',
      badge: 'Personnalisé',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-200',
    },
    {
      icon: RotateCcw,
      title: 'Réimprimable à l’infini',
      description: 'Une page ratée ? Un copain qui veut participer ? Votre livre reste sauvegardé dans l’application et peut être réimprimé à volonté.',
      badge: 'Sauvegarde locale',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
  ];

  return (
    <section className="py-8">
      <div className="bg-slate-900 text-white rounded-[36px] p-7 sm:p-12 relative overflow-hidden shadow-2xl">
        {/* Background ambient elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pastel-blue/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-coral/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-pastel-yellow font-bold text-xs mb-3 border border-white/15 backdrop-blur-md">
            <ShieldCheck size={14} />
            Pensé pour les parents & éducateurs
          </div>
          <h3 className="text-3xl sm:text-4xl font-black font-display tracking-tight mb-3">
            Pourquoi les familles adorent ColoriKid ?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Une solution pensée pour offrir des heures de plaisir créatif sans les contraintes habituelles des cahiers de coloriage du commerce.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/15 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center shadow-md">
                      <Icon size={22} className={b.iconColor} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-slate-200">
                      {b.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-white font-display mb-2">
                    {b.title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
