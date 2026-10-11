import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import TrustBar from '@/components/TrustBar';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import QuickView from '@/components/QuickView';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import type { CategoryId, Product } from '@/types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('laptops');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (id: CategoryId) => {
    setActiveCategory(id);
  };

  useEffect(() => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-nexus-black">
      <Header onSelectCategory={handleSelectCategory} />
      <HeroSlider onSelectCategory={handleSelectCategory} />
      <TrustBar />
      <div ref={productGridRef}>
        <ProductGrid activeCategory={activeCategory} onQuickView={setQuickViewProduct} />
      </div>
      <FaqSection />
      <Footer onSelectCategory={handleSelectCategory} />
      <CartDrawer />
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
