import { X, ShoppingCart, Check, Truck } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/utils';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem } = useCart();

  if (!product) return null;

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-nexus-dark border border-nexus-border rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto scrollbar-thin pointer-events-auto animate-slide-up shadow-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-nexus-black/60 backdrop-blur border border-nexus-border text-white flex items-center justify-center hover:bg-nexus-red transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto bg-nexus-surface">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.badges.includes('OFERTA RELÁMPAGO') && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded uppercase">
                      Oferta Relámpago
                    </span>
                  )}
                  {product.badges.includes('OFERTA') && !product.badges.includes('OFERTA RELÁMPAGO') && (
                    <span className="px-3 py-1 bg-nexus-red text-white text-xs font-bold rounded uppercase">
                      Oferta
                    </span>
                  )}
                  {product.badges.includes('EXCLUSIVO WEB') && (
                    <span className="px-3 py-1 bg-nexus-neon/90 text-nexus-black text-xs font-bold rounded uppercase">
                      Exclusivo Web
                    </span>
                  )}
                  {product.badges.includes('MÁS VENDIDO') && (
                    <span className="px-3 py-1 bg-green-600/90 text-white text-xs font-bold rounded uppercase">
                      Más Vendido
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col">
                <p className="text-sm text-nexus-red font-medium uppercase tracking-wide">{product.brand}</p>
                <h2 className="mt-1 text-xl font-bold text-white leading-tight">{product.name}</h2>

                {/* Specs */}
                <div className="mt-4 space-y-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-nexus-border pb-2">
                      <span className="text-neutral-500">{spec.label}</span>
                      <span className="text-neutral-200 font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-white">{formatCOP(product.price)}</span>
                  {product.oldPrice && (
                    <>
                      <span className="text-base text-neutral-500 line-through">{formatCOP(product.oldPrice)}</span>
                      <span className="text-sm text-green-500 font-bold">-{discount}%</span>
                    </>
                  )}
                </div>

                {/* Stock */}
                <div className="mt-3 flex items-center gap-2 text-sm">
                  {product.inStock ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-medium">En stock</span>
                    </>
                  ) : (
                    <span className="text-neutral-500">Agotado</span>
                  )}
                  <span className="text-neutral-600 mx-1">|</span>
                  <Truck className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-400">Envío gratis</span>
                </div>

                {/* Add to cart */}
                <button
                  disabled={!product.inStock}
                  onClick={handleAdd}
                  className="mt-auto pt-4 w-full"
                >
                  <span className="w-full py-3.5 gradient-red text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <ShoppingCart className="w-5 h-5" />
                    {product.inStock ? 'Agregar al Carrito' : 'No disponible'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
