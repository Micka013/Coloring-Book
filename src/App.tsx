import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ColoriKidLogo } from './components/Logo';
import { Wand2, Download, RefreshCw, BookOpen, Sparkles, Image as ImageIcon, Trash2, Globe, Info, HelpCircle, Library, Settings, Palette, Type, ArrowRight, Printer } from 'lucide-react';
import { generateColoringPage } from './services/genai';
import { generatePDF } from './services/pdf';
import { BottomMenu, Tab } from './components/BottomMenu';
import { saveBook, getBooks, deleteBook, SavedBook } from './services/storage';
import { HomeHero } from './components/HomeHero';
import { ThemeExplorer } from './components/ThemeExplorer';
import { AgeGuide } from './components/AgeGuide';
import { HowItWorks } from './components/HowItWorks';
import { ParentBenefits } from './components/ParentBenefits';
import { FaqSection } from './components/FaqSection';
import { HomeCta } from './components/HomeCta';

type Step = 'form' | 'loading' | 'preview';

interface FormData {
  name: string;
  age: string;
  theme: string;
}

interface GeneratedData {
  cover: string;
  pages: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({ name: '', age: '3-5', theme: '' });
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isRegenerating, setIsRegenerating] = useState<number | 'cover' | 'all' | null>(null);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);

  useEffect(() => {
    loadSavedBooks();
  }, []);

  const loadSavedBooks = async () => {
    const books = await getBooks();
    setSavedBooks(books.sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewBook = () => {
    setStep('form');
    setFormData({ name: '', age: '3-5', theme: '' });
    setGeneratedData(null);
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTheme = (theme: string, age?: string, name?: string) => {
    setFormData(prev => ({
      name: name !== undefined && name !== '' ? name : prev.name,
      age: age || prev.age || '3-5',
      theme: theme !== undefined ? theme : prev.theme,
    }));
    setActiveTab('create');
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startGeneratingBook = async (name: string, age: string, theme: string) => {
    if (!name || !theme) return;
    setFormData({ name, age, theme });
    setActiveTab('create');
    setStep('loading');
    setLoadingMessage(`Nous créons un livre magique pour ${name}...`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Generate cover
      const cover = await generateColoringPage(theme, age, true);
      setLoadingMessage(`Couverture générée ! Création des pages...`);

      // Generate 5 pages (in parallel for speed)
      const pagePromises = Array.from({ length: 5 }).map((_, i) => {
        return generateColoringPage(`${theme}, scene ${i + 1}`, age, false).then(res => {
          setLoadingMessage(`Page ${i + 1}/5 générée...`);
          return res;
        });
      });

      const pages = await Promise.all(pagePromises);

      const newBookData = { cover, pages };
      setGeneratedData(newBookData);
      setStep('preview');

      // Save to storage
      await saveBook({
        id: Date.now().toString(),
        name: name,
        theme: theme,
        age: age,
        cover: cover,
        pages: pages,
        createdAt: Date.now()
      });
      loadSavedBooks();

    } catch (error) {
      console.error("Generation failed:", error);
      alert("Une erreur est survenue lors de la génération. Veuillez réessayer.");
      setStep('form');
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.theme) return;
    startGeneratingBook(formData.name, formData.age, formData.theme);
  };

  const handleQuickGenerate = (name: string, age: string, theme: string) => {
    startGeneratingBook(name, age, theme);
  };

  const handleRegeneratePage = async (index: number) => {
    if (!generatedData) return;
    setIsRegenerating(index);
    try {
      const newPage = await generateColoringPage(`${formData.theme}, scene ${index + 1}`, formData.age, false);
      const newPages = [...generatedData.pages];
      newPages[index] = newPage;
      setGeneratedData({ ...generatedData, pages: newPages });
    } catch (error) {
      console.error("Regeneration failed:", error);
      alert("Erreur lors de la régénération.");
    } finally {
      setIsRegenerating(null);
    }
  };

  const handleRegenerateCover = async () => {
    if (!generatedData) return;
    setIsRegenerating('cover');
    try {
      const newCover = await generateColoringPage(formData.theme, formData.age, true);
      setGeneratedData({ ...generatedData, cover: newCover });
    } catch (error) {
      console.error("Regeneration failed:", error);
      alert("Erreur lors de la régénération.");
    } finally {
      setIsRegenerating(null);
    }
  };

  const handleRegenerateAll = async () => {
    setIsRegenerating('all');
    try {
      const cover = await generateColoringPage(formData.theme, formData.age, true);
      const pagePromises = Array.from({ length: 5 }).map((_, i) => {
        return generateColoringPage(`${formData.theme}, scene ${i + 1}`, formData.age, false);
      });
      const pages = await Promise.all(pagePromises);
      setGeneratedData({ cover, pages });
    } catch (error) {
      console.error("Regeneration failed:", error);
      alert("Erreur lors de la régénération.");
    } finally {
      setIsRegenerating(null);
    }
  };

  const handleDownload = () => {
    if (!generatedData) return;
    generatePDF(formData.name, formData.theme, generatedData.cover, generatedData.pages);
  };

  const handleDownloadSavedBook = (book: SavedBook) => {
    generatePDF(book.name, book.theme, book.cover, book.pages);
  };

  const handleDeleteBook = async (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
      await deleteBook(id);
      loadSavedBooks();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-pastel-blue/30 pb-28">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-xs sticky top-0 z-30 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button 
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-3 cursor-pointer text-left group"
          >
            <ColoriKidLogo size={42} className="drop-shadow-sm group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">ColoriKid</h1>
                <span className="hidden sm:inline-block bg-pastel-yellow/60 border border-amber-300/60 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Atelier A4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Livres de coloriage personnalisés</p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleTabChange('books')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Library size={16} className="text-slate-500" />
              <span className="hidden sm:inline">Mes livres</span>
              {savedBooks.length > 0 && (
                <span className="bg-pastel-blue text-blue-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {savedBooks.length}
                </span>
              )}
            </button>

            <button
              onClick={handleNewBook}
              className="bg-soft-coral hover:bg-[#ff7a7a] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-soft-coral/30 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Nouveau livre</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12 sm:space-y-16 pb-8"
            >
              {/* 1. Hero with Quick Launcher & Interactive 3D Book Showcase */}
              <HomeHero
                onQuickGenerate={handleQuickGenerate}
                onSelectTheme={handleSelectTheme}
              />

              {/* 2. How it works (Simple 3 steps) */}
              <HowItWorks onStart={handleNewBook} />

              {/* 3. Thematic Universe Explorer */}
              <ThemeExplorer onSelectTheme={handleSelectTheme} />

              {/* 4. Age-adapted lines & complexity guide */}
              <AgeGuide onSelectAge={(age) => handleSelectTheme('', age)} />

              {/* 5. Reassurance & Parent Benefits */}
              <ParentBenefits />

              {/* 6. FAQ */}
              <FaqSection />

              {/* 7. Final Call-to-action */}
              <HomeCta onStart={handleNewBook} />
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div
              key="create-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-xl mx-auto"
                >
                  <form onSubmit={handleGenerate} className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Prénom de l'enfant</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: Léo, Mia..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/20 outline-none transition-all text-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Âge</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['3-5', '6-8', '9-12'].map((age) => (
                            <button
                              key={age}
                              type="button"
                              onClick={() => setFormData({ ...formData, age })}
                              className={`py-3 px-2 rounded-xl border-2 font-bold transition-all ${
                                formData.age === age
                                  ? 'border-pastel-blue bg-pastel-blue/10 text-blue-700'
                                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
                              }`}
                            >
                              {age} ans
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Thème</label>
                        <input
                          type="text"
                          required
                          value={formData.theme}
                          onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                          placeholder="Ex: Dinosaures de l'espace, Princesses..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/20 outline-none transition-all text-lg"
                        />
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4 font-medium">
                        <BookOpen size={16} className="text-mint-green" />
                        Format A4 – prêt à imprimer
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-soft-coral hover:bg-[#ff7a7a] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-soft-coral/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <Sparkles size={20} />
                        Créer le livre
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-pastel-blue rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-white w-24 h-24 rounded-full shadow-xl flex items-center justify-center border-4 border-pastel-blue/30">
                      <Wand2 size={40} className="text-blue-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">Magie en cours...</h3>
                  <p className="text-slate-500 text-lg text-center max-w-sm animate-pulse">{loadingMessage}</p>
                </motion.div>
              )}

              {step === 'preview' && generatedData && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-12"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-green/30 text-emerald-700 text-sm font-bold">
                      <Sparkles size={14} />
                      Adapté aux enfants de {formData.age} ans
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRegenerateAll}
                        disabled={isRegenerating !== null}
                        className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <RefreshCw size={18} className={isRegenerating === 'all' ? 'animate-spin' : ''} />
                        <span className="hidden sm:inline">Tout régénérer</span>
                      </button>
                      <button
                        onClick={handleDownload}
                        className="px-6 py-2.5 rounded-xl bg-pastel-blue text-blue-900 font-bold hover:bg-[#96cfff] transition-colors flex items-center gap-2 shadow-lg shadow-pastel-blue/30"
                      >
                        <Download size={18} />
                        Télécharger le PDF
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cover Preview */}
                    <div className="lg:col-span-5">
                      <div className="sticky top-24">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <BookOpen size={20} className="text-pastel-blue" />
                          Couverture
                        </h3>
                        <div className="mb-4">
                          <h4 className="font-bold text-2xl text-slate-900">Le livre de coloriage de {formData.name}</h4>
                          <p className="text-slate-500 font-medium">{formData.theme}</p>
                        </div>
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 relative group">
                          <div className="aspect-[3/4] bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-100 relative">
                            <img src={generatedData.cover} alt="Couverture" className="w-full h-full object-cover" />

                            {isRegenerating === 'cover' && (
                              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                <RefreshCw size={32} className="text-pastel-blue animate-spin" />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleRegenerateCover}
                            disabled={isRegenerating !== null}
                            className="absolute bottom-6 right-6 bg-white text-slate-700 p-3 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0"
                            title="Régénérer la couverture"
                          >
                            <RefreshCw size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pages Grid */}
                    <div className="lg:col-span-7">
                      <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-pastel-yellow" />
                        Pages à colorier
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {generatedData.pages.map((page, index) => (
                          <div key={index} className="bg-white p-3 rounded-3xl shadow-sm border border-slate-100 relative group">
                            <div className="aspect-[3/4] bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-100 relative">
                              <img src={page} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
                              
                              {isRegenerating === index && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                  <RefreshCw size={32} className="text-pastel-blue animate-spin" />
                                </div>
                              )}
                            </div>
                            <div className="absolute bottom-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              <div className="bg-white/90 backdrop-blur text-slate-700 px-3 py-1.5 rounded-full shadow-sm border border-slate-100 text-xs font-bold">
                                Page {index + 1}
                              </div>
                              <button
                                onClick={() => handleRegeneratePage(index)}
                                disabled={isRegenerating !== null}
                                className="bg-white text-slate-700 p-2 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 disabled:opacity-0"
                                title="Régénérer cette page"
                              >
                                <RefreshCw size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="flex justify-center pt-8 pb-12">
                    <button
                      onClick={handleDownload}
                      className="bg-soft-coral hover:bg-[#ff7a7a] text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-xl shadow-soft-coral/30 transition-all flex items-center gap-3 active:scale-[0.98]"
                    >
                      <Download size={24} />
                      Télécharger mon livre PDF
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'books' && (
            <motion.div
              key="books-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {savedBooks.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Aucun livre pour le moment</h3>
                  <p className="text-slate-500 mb-6">Commencez par créer votre premier livre de coloriage !</p>
                  <button
                    onClick={handleNewBook}
                    className="bg-pastel-blue text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-[#96cfff] transition-colors inline-flex items-center gap-2"
                  >
                    <Sparkles size={18} />
                    Créer un livre
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedBooks.map((book) => (
                    <div key={book.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm group">
                      <div className="aspect-[3/4] bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-100 relative mb-4">
                        <img src={book.cover} alt={`Couverture ${book.name}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleDownloadSavedBook(book)}
                            className="bg-white text-slate-800 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                            title="Télécharger le PDF"
                          >
                            <Download size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="bg-white text-red-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                            title="Supprimer"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-1">{book.name}</h3>
                      <p className="text-slate-500 text-sm mb-2 line-clamp-1">{book.theme}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>{book.age} ans</span>
                        <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Globe size={20} className="text-pastel-blue" />
                    Langue
                  </h3>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <span className="font-medium text-slate-700">Français</span>
                    <div className="w-6 h-6 rounded-full bg-pastel-blue flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Info size={20} className="text-mint-green" />
                    Informations
                  </h3>
                  <div className="space-y-4 text-slate-600">
                    <p><strong>ColoriKid</strong> génère des livres de coloriage uniques grâce à l'intelligence artificielle.</p>
                    <p>Toutes les illustrations sont spécialement conçues pour être imprimées sur du papier A4 avec des traits noirs épais, parfaits pour les enfants.</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <HelpCircle size={20} className="text-soft-coral" />
                    Aide
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>• <strong>Comment imprimer ?</strong> Téléchargez le PDF et imprimez-le en taille réelle (100%) sur du papier A4.</p>
                    <p>• <strong>Où sont mes livres ?</strong> Ils sont sauvegardés dans l'onglet "Mes livres" sur cet appareil.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomMenu activeTab={activeTab} onTabChange={handleTabChange} onNewBook={handleNewBook} />
    </div>
  );
}
