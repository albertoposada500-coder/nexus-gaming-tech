import { useState, useRef, useMemo, type ReactNode } from 'react';
import { Search, ShoppingCart, Menu, X, Cpu } from 'lucide-react';
import { categories, products } from '@/data';
import { useCart } from '@/context/CartContext';
import type { CategoryId } from '@/types';

interface HeaderProps {
  onSelectCategory: (id: CategoryId) => void;
}

export default function Header({ onSelectCategory }: HeaderProps) {
  const { totalQuantity, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 1) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.brand.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCategoryClick = (id: CategoryId) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
  };

  const resultsCount = useMemo(() => searchResults.length, [searchResults]);

  return (
    <>
      {/* Top strip */}
      <div className="bg-nexus-red text-white text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide relative z-50">
        <p className="animate-fade-in">
          GARANTÍA NACIONAL HASTA POR 24 MESES<span className="mx-2 opacity-50">|</span>COMPRA 100% SEGURA
        </p>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 bg-nexus-black/95 backdrop-blur-xl border-b border-nexus-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <button
              onClick={() => handleCategoryClick('laptops')}
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="w-9 h-9 rounded-lg gradient-red flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block leading-none">
                <span className="text-lg font-extrabold text-white tracking-tight">NEXUS</span>
                <span className="text-lg font-light text-nexus-red ml-1">G&T</span>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-nexus-red hover:bg-nexus-surface/50 ${
                    cat.id === 'outlet' ? 'text-nexus-red-light font-bold' : 'text-neutral-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSearch(!showSearch);
                    if (!showSearch) setTimeout(() => searchRef.current?.focus(), 100);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-nexus-surface transition-colors text-neutral-300 hover:text-white"
                >
                  {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>

                {showSearch && (
                  <div className="absolute right-0 top-12 w-80 sm:w-96 bg-nexus-surface border border-nexus-border rounded-xl shadow-2xl p-3 animate-slide-up">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          ref={searchRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          placeholder="Buscar productos, marcas..."
                          className="w-full bg-nexus-black border border-nexus-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-nexus-red focus:outline-none transition-colors"
                        />
                      </div>
                    </form>
                    {resultsCount > 0 && (
                      <div className="mt-3 space-y-1 max-h-72 overflow-y-auto scrollbar-thin">
                        {searchResults.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              handleCategoryClick(p.category);
                              setShowSearch(false);
                              setSearchQuery('');
                              setSearchResults([]);
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-nexus-card transition-colors text-left"
                          >
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">{p.name}</p>
                              <p className="text-xs text-neutral-400">{p.brand}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchQuery.length > 1 && resultsCount === 0 && (
                      <p className="mt-3 text-sm text-neutral-500 text-center py-4">
                        No se encontraron resultados
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-nexus-surface transition-colors text-neutral-300 hover:text-white"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-nexus-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-nexus-surface transition-colors text-neutral-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-nexus-dark border-t border-nexus-border animate-slide-up">
            <div className="max-w-[1400px] mx-auto px-4 py-3 grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-2.5 text-sm font-medium transition-colors rounded-lg hover:bg-nexus-surface text-left ${
                    cat.id === 'outlet' ? 'text-nexus-red-light font-bold' : 'text-neutral-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
