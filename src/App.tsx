import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Download, RefreshCw, BookOpen, Sparkles, Image as ImageIcon, Trash2, Globe, Info, HelpCircle, Library, Settings, Palette, Type, ArrowRight } from 'lucide-react';
import { generateColoringPage } from './services/genai';
import { generatePDF } from './services/pdf';
import { BottomMenu, Tab } from './components/BottomMenu';
import { saveBook, getBooks, deleteBook, SavedBook } from './services/storage';

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
    if (activeTab === 'books') {
      loadSavedBooks();
    }
  }, [activeTab]);

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

  const handleSelectTheme = (theme: string) => {
    setFormData(prev => ({ ...prev, theme }));
    setActiveTab('create');
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.theme) return;

    setStep('loading');
    setLoadingMessage(`Nous créons un livre magique pour ${formData.name}...`);

    try {
      // Generate cover
      const cover = await generateColoringPage(formData.theme, formData.age, true);
      setLoadingMessage(`Couverture générée ! Création des pages...`);

      // Generate 5 pages (in parallel for speed)
      const pagePromises = Array.from({ length: 5 }).map((_, i) => {
        return generateColoringPage(`${formData.theme}, scene ${i + 1}`, formData.age, false).then(res => {
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
        name: formData.name,
        theme: formData.theme,
        age: formData.age,
        cover: cover,
        pages: pages,
        createdAt: Date.now()
      });

    } catch (error) {
      console.error("Generation failed:", error);
      alert("Une erreur est survenue lors de la génération. Veuillez réessayer.");
      setStep('form');
    }
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
      <header className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center text-white shadow-sm">
            <Wand2 size={22} className="text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Coloriage Magique</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-16 pb-8"
            >
              {/* 1. Hero Section */}
              <section className="text-center pt-4 pb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-blue/10 text-blue-700 text-sm font-bold mb-6">
                  <Sparkles size={16} />
                  Nouveau : Générateur IA
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Crée un livre de coloriage <span className="text-soft-coral">magique</span>
                </h2>
                <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto">
                  Personnalisé avec le prénom de l'enfant. Prêt à imprimer en format A4.
                </p>
                
                <div className="relative mx-auto w-48 h-64 bg-white rounded-r-2xl rounded-l-md shadow-2xl border-l-8 border-pastel-blue flex flex-col items-center justify-center p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none rounded-r-2xl"></div>
                  <Sparkles className="text-pastel-yellow mb-3" size={32} />
                  <h3 className="text-center font-display font-bold text-xl leading-tight text-slate-800">Le livre de coloriage de Léa</h3>
                  <p className="text-center text-sm text-slate-500 mt-2 font-medium">Princesses aventurières</p>
                </div>

                <button
                  onClick={handleNewBook}
                  className="bg-soft-coral hover:bg-[#ff7a7a] text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-xl shadow-soft-coral/30 transition-all flex items-center gap-3 mx-auto active:scale-[0.98]"
                >
                  <Sparkles size={24} />
                  Créer un livre
                </button>
              </section>

              {/* 2. Comment ça marche */}
              <section>
                <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">Comment ça marche ?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
                  <div className="hidden sm:block absolute top-8 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white border-4 border-pastel-yellow/30 text-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                      <Palette size={28} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">1. Choisis un thème</h4>
                    <p className="text-slate-500 text-sm">Ce qu'il ou elle adore</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white border-4 border-pastel-blue/30 text-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                      <Type size={28} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">2. Entre le prénom</h4>
                    <p className="text-slate-500 text-sm">Pour un livre 100% unique</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white border-4 border-mint-green/40 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                      <Download size={28} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">3. Télécharge le PDF</h4>
                    <p className="text-slate-500 text-sm">Prêt à être imprimé en A4</p>
                  </div>
                </div>
              </section>

              {/* 3. Adapté à tous les âges */}
              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">Adapté à tous les âges</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl text-center border border-slate-100">
                    <div className="text-4xl mb-3">👶</div>
                    <h4 className="font-bold text-slate-800 mb-1">3–5 ans</h4>
                    <p className="text-sm text-slate-500">Formes simples et grandes zones à colorier</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl text-center border border-slate-100">
                    <div className="text-4xl mb-3">🧒</div>
                    <h4 className="font-bold text-slate-800 mb-1">6–8 ans</h4>
                    <p className="text-sm text-slate-500">Scènes amusantes et détails modérés</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl text-center border border-slate-100">
                    <div className="text-4xl mb-3">🧑</div>
                    <h4 className="font-bold text-slate-800 mb-1">9–12 ans</h4>
                    <p className="text-sm text-slate-500">Dessins détaillés et décors complets</p>
                  </div>
                </div>
              </section>

              {/* 4. Exemples de thèmes */}
              <section>
                <h3 className="text-2xl font-bold text-center text-slate-800 mb-6">Besoin d'inspiration ?</h3>
                <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                  {['Dinosaures de l\'espace', 'Princesses aventurières', 'Robots rigolos', 'Animaux fantastiques', 'Super-héros mignons'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleSelectTheme(theme)}
                      className="px-5 py-2.5 bg-white border-2 border-slate-100 rounded-full text-slate-600 font-bold hover:border-pastel-blue hover:text-blue-600 hover:shadow-md transition-all active:scale-95"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </section>

              {/* 5. Call-to-action final */}
              <section className="bg-pastel-blue/10 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Prêt à faire un heureux ?</h3>
                <p className="text-slate-600 mb-6">Crée un livre unique pour un enfant dès maintenant.</p>
                <button
                  onClick={handleNewBook}
                  className="bg-pastel-blue hover:bg-[#96cfff] text-blue-900 font-bold text-lg px-8 py-3 rounded-xl shadow-lg shadow-pastel-blue/30 transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  Commencer <ArrowRight size={20} />
                </button>
              </section>
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
                    <p><strong>Coloriage Magique</strong> génère des livres de coloriage uniques grâce à l'intelligence artificielle.</p>
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
