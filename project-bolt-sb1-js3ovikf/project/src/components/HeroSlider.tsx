import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '@/data';
import type { CategoryId } from '@/types';

interface HeroSliderProps {
  onSelectCategory: (id: CategoryId) => void;
}

export default function HeroSlider({ onSelectCategory }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[420px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-nexus-black">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-nexus-black via-nexus-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full">
              <div className={`max-w-2xl ${i === current ? 'animate-slide-up' : ''}`}>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight text-balance">
                  {slide.title}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => onSelectCategory(slide.ctaCategory)}
                  className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 gradient-red text-white font-semibold rounded-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(229,9,20,0.5)] transition-all duration-300"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-nexus-black/50 backdrop-blur border border-nexus-border text-white flex items-center justify-center hover:bg-nexus-red transition-colors z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-nexus-black/50 backdrop-blur border border-nexus-border text-white flex items-center justify-center hover:bg-nexus-red transition-colors z-10"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-nexus-red' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
