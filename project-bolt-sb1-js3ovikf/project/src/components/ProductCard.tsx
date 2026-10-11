import { ShoppingCart, Check, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="card-lift group relative bg-nexus-card border border-nexus-border rounded-xl overflow-hidden flex flex-col">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badges.includes('OFERTA RELÁMPAGO') && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold rounded uppercase tracking-wide animate-glow-pulse">
            Oferta Relámpago
          </span>
        )}
        {product.badges.includes('OFERTA') && !product.badges.includes('OFERTA RELÁMPAGO') && (
          <span className="px-2.5 py-1 bg-nexus-red text-white text-[10px] font-bold rounded uppercase tracking-wide">
            Oferta
          </span>
        )}
        {product.badges.includes('EXCLUSIVO WEB') && (
          <span className="px-2.5 py-1 bg-nexus-neon/90 text-nexus-black text-[10px] font-bold rounded uppercase tracking-wide">
            Exclusivo Web
          </span>
        )}
        {product.badges.includes('MÁS VENDIDO') && (
          <span className="px-2.5 py-1 bg-green-600/90 text-white text-[10px] font-bold rounded uppercase tracking-wide">
            Más Vendido
          </span>
        )}
        {discount > 0 && (
          <span className="px-2.5 py-1 bg-white/10 backdrop-blur text-white text-[10px] font-bold rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] bg-nexus-surface overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-card via-transparent to-transparent" />

        {/* Quick view */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-nexus-black/80 backdrop-blur border border-nexus-border text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-nexus-red"
          aria-label="Vista rápida"
        >
          <Eye className="w-4 h-4" />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-nexus-black/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-nexus-surface text-neutral-400 text-sm font-medium rounded-lg border border-nexus-border">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-nexus-red font-medium uppercase tracking-wide">{product.brand}</p>
        <h3
          className="mt-1 text-sm font-semibold text-white leading-snug line-clamp-2 cursor-pointer hover:text-nexus-red transition-colors"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        {/* Mini specs */}
        <div className="mt-3 space-y-1">
          {product.specs.slice(0, 2).map((spec, i) => (
            <p key={i} className="text-xs text-neutral-500 truncate">
              <span className="text-neutral-600">{spec.label}:</span> {spec.value}
            </p>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-white">{formatCOP(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-neutral-500 line-through">{formatCOP(product.oldPrice)}</span>
            )}
          </div>

          <button
            disabled={!product.inStock}
            onClick={() => addItem(product)}
            className="mt-3 w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
              bg-nexus-surface border border-nexus-border text-white hover:bg-nexus-red hover:border-nexus-red"
          >
            {product.inStock ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                Agregar
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                No disponible
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
