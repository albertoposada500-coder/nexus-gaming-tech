import { ShieldCheck, Lock, Truck, Headphones } from 'lucide-react';
import { trustPillars } from '@/data';

const iconMap: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Lock,
  Truck,
  Headphones,
};

export default function TrustBar() {
  return (
    <section className="bg-nexus-dark border-y border-nexus-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustPillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || ShieldCheck;
            return (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 group cursor-default"
              >
                <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-nexus-surface border border-nexus-border flex items-center justify-center group-hover:border-nexus-red group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-nexus-red" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-400 truncate">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
