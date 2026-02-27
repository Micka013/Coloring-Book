import React from 'react';
import { Home, Sparkles, Library, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export type Tab = 'home' | 'create' | 'books' | 'settings';

interface BottomMenuProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onNewBook: () => void;
}

export function BottomMenu({ activeTab, onTabChange, onNewBook }: BottomMenuProps) {
  const tabs: Array<{ id: string; label: string; icon: any; isMain?: boolean }> = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'create', label: 'Créer', icon: Sparkles, isMain: true },
    { id: 'books', label: 'Mes livres', icon: Library },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] pb-safe z-50">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto relative">
        {tabs.map((tab) => {
          if (tab.isMain) {
            return (
              <button
                key={tab.id}
                onClick={onNewBook}
                className="relative -top-5 flex flex-col items-center justify-center group outline-none"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center shadow-lg shadow-pastel-blue/40 text-white border-4 border-white"
                >
                  <tab.icon size={28} />
                </motion.div>
                <span className="text-[10px] font-bold text-slate-600 mt-1">{tab.label}</span>
              </button>
            );
          }

          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as Tab)}
              className="flex flex-col items-center justify-center w-16 h-14 relative outline-none"
            >
              <motion.div
                animate={{ y: isActive ? -4 : 0 }}
                className="relative flex flex-col items-center"
              >
                <tab.icon
                  size={24}
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-pastel-blue' : 'text-slate-400'
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-bold mt-1.5 transition-colors duration-300 ${
                  isActive ? 'text-pastel-blue' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
