import { useState, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import type { Product, CategoryId } from '@/types';
import ProductCard from './ProductCard';
import { products as allProducts, categories } from '@/data';

interface ProductGridProps {
  activeCategory: CategoryId;
  onQuickView: (product: Product) => void;
}

type SortOption = 'popularity' | 'price-asc' | 'price-desc';

const allBrands = [...new Set(allProducts.map((p) => p.brand))].sort();
const allGpus = [...new Set(allProducts.filter((p) => p.gpu).map((p) => p.gpu!))].sort();

export default function ProductGrid({ activeCategory, onQuickView }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'in-stock'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 12000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGpus, setSelectedGpus] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const categoryLabel = categories.find((c) => c.id === activeCategory)?.label || 'Productos';

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => p.category === activeCategory);

    if (filterAvailability === 'in-stock') {
      result = result.filter((p) => p.inStock);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedGpus.length > 0) {
      result = result.filter((p) => p.gpu && selectedGpus.includes(p.gpu));
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        result = [...result].sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [activeCategory, filterAvailability, priceRange, selectedBrands, selectedGpus, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleGpu = (gpu: string) => {
    setSelectedGpus((prev) =>
      prev.includes(gpu) ? prev.filter((g) => g !== gpu) : [...prev, gpu]
    );
  };

  const toggleFilter = (name: string) => {
    setOpenFilter(openFilter === name ? null : name);
  };

  const clearFilters = () => {
    setFilterAvailability('all');
    setPriceRange([0, 12000000]);
    setSelectedBrands([]);
    setSelectedGpus([]);
  };

  const hasActiveFilters =
    filterAvailability !== 'all' ||
    selectedBrands.length > 0 ||
    selectedGpus.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 12000000;

  const availableBrands = [...new Set(allProducts.filter((p) => p.category === activeCategory).map((p) => p.brand))].sort();
  const categoryGpus = [...new Set(allProducts.filter((p) => p.category === activeCategory && p.gpu).map((p) => p.gpu!))].sort();

  const FilterButton = ({ name, label, children }: { name: string; label: string; children: React.ReactNode }) => (
    <div className="relative">
      <button
        onClick={() => toggleFilter(name)}
        className={`w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
          openFilter === name
            ? 'bg-nexus-surface border-nexus-red text-white'
            : 'bg-nexus-surface border-nexus-border text-neutral-300 hover:border-nexus-border-bright'
        }`}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${openFilter === name ? 'rotate-180' : ''}`} />
      </button>
      {openFilter === name && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-nexus-surface border border-nexus-border rounded-xl shadow-2xl p-4 z-20 animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <section id={activeCategory} className="scroll-mt-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {categoryLabel}
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Artículo' : 'Artículos'}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2.5 text-sm text-white focus:border-nexus-red focus:outline-none transition-colors cursor-pointer"
            >
              <option value="popularity">Más populares</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap relative">
          <FilterButton name="availability" label="Disponibilidad">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="radio"
                  name="availability"
                  checked={filterAvailability === 'all'}
                  onChange={() => setFilterAvailability('all')}
                  className="accent-nexus-red"
                />
                <span className="text-sm text-neutral-300">Todos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="radio"
                  name="availability"
                  checked={filterAvailability === 'in-stock'}
                  onChange={() => setFilterAvailability('in-stock')}
                  className="accent-nexus-red"
                />
                <span className="text-sm text-neutral-300">Solo disponibles</span>
              </label>
            </div>
          </FilterButton>

          <FilterButton name="price" label="Precio">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Mín: {priceRange[0].toLocaleString('es-CO')}</label>
                <input
                  type="range"
                  min={0}
                  max={12000000}
                  step={100000}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                  className="w-full accent-nexus-red"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Máx: {priceRange[1].toLocaleString('es-CO')}</label>
                <input
                  type="range"
                  min={0}
                  max={12000000}
                  step={100000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                  className="w-full accent-nexus-red"
                />
              </div>
            </div>
          </FilterButton>

          <FilterButton name="brand" label="Marca">
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-nexus-red"
                  />
                  <span className="text-sm text-neutral-300">{brand}</span>
                </label>
              ))}
            </div>
          </FilterButton>

          {categoryGpus.length > 0 && (
            <FilterButton name="gpu" label="Tarjeta Gráfica">
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                {categoryGpus.map((gpu) => (
                  <label key={gpu} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedGpus.includes(gpu)}
                      onChange={() => toggleGpu(gpu)}
                      className="accent-nexus-red"
                    />
                    <span className="text-sm text-neutral-300">{gpu}</span>
                  </label>
                ))}
              </div>
            </FilterButton>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-nexus-red hover:text-nexus-red-light transition-colors font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No se encontraron productos con los filtros seleccionados.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2.5 gradient-red text-white rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
