import { Cpu, MapPin, Phone, Clock, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { categories } from '@/data';
import type { CategoryId } from '@/types';

interface FooterProps {
  onSelectCategory: (id: CategoryId) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  return (
    <footer className="bg-nexus-black border-t border-nexus-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-red flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-lg font-extrabold text-white tracking-tight">NEXUS</span>
                <span className="text-lg font-light text-nexus-red ml-1">G&T</span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Tienda especializada en hardware gaming y tecnología de alto rendimiento. Distribuidores oficiales de las mejores marcas.
            </p>
            <div className="flex gap-2 mt-4">
              <a href="https://wa.me/573146856422" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-nexus-surface border border-nexus-border flex items-center justify-center text-neutral-400 hover:text-white hover:border-nexus-red transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="mailto:albertoposada5000@gmail.com" className="w-9 h-9 rounded-lg bg-nexus-surface border border-nexus-border flex items-center justify-center text-neutral-400 hover:text-white hover:border-nexus-red transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-nexus-surface border border-nexus-border flex items-center justify-center text-neutral-400 hover:text-white hover:border-nexus-red transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-nexus-surface border border-nexus-border flex items-center justify-center text-neutral-400 hover:text-white hover:border-nexus-red transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="text-sm text-neutral-400 hover:text-nexus-red transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-nexus-red shrink-0 mt-0.5" />
                <span>Av. El Poblado, Medellín, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Phone className="w-4 h-4 text-nexus-red shrink-0" />
                <span>+57 314 685 6422</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Mail className="w-4 h-4 text-nexus-red shrink-0" />
                <span>albertoposada5000@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <Clock className="w-4 h-4 text-nexus-red shrink-0 mt-0.5" />
                <span>Lun-Vie: 8:00 AM - 6:00 PM<br />Sáb: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Confianza</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Garantía nacional hasta 24 meses</li>
              <li>Productos 100% originales</li>
              <li>Factura electrónica</li>
              <li>Envíos a todo el país</li>
              <li>Pagos seguros certificados</li>
            </ul>
          </div>
        </div>

        {/* Creator credit */}
        <div className="mt-12 pt-6 border-t border-nexus-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} Nexus Gaming & Tech. Todos los derechos reservados.
          </p>
          <p className="text-xs text-neutral-500 text-center">
            Desarrollado con precisión por{' '}
            <span className="text-neutral-300 font-medium">Alberto Luis Posada Pérez</span>
            {' '}
            <span className="text-neutral-600">|</span>
            {' '}
            <span className="text-neutral-400">Ing. de Sistemas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
