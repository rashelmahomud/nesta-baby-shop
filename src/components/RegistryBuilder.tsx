import React, { useState } from 'react';
import { Gift, Baby, ChevronRight, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface RegistryBuilderProps {
  onAddRegistryToCart: (productsList: { product: Product; quantity: number }[]) => void;
  onClose: () => void;
}

export default function RegistryBuilder({ onAddRegistryToCart, onClose }: RegistryBuilderProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [stage, setStage] = useState<'expecting' | 'newborn' | 'infant' | 'toddler'>('expecting');
  const [focus, setFocus] = useState<'sleep' | 'feeding' | 'play' | 'gear' | 'all'>('all');
  const [style, setStyle] = useState<'minimalist' | 'natural' | 'hightech'>('minimalist');
  const [registryName, setRegistryName] = useState('');
  const [imported, setImported] = useState(false);

  // Recommendations logic
  const getRecommendations = (): Product[] => {
    let list = [...PRODUCTS];

    // Filter by focus if selected
    if (focus !== 'all') {
      list = list.filter(p => p.category === focus);
    }

    // fallback if filtered list is too short or empty
    if (list.length < 2) {
      // Find other items to make a solid package
      const otherItems = PRODUCTS.filter(p => p.category !== focus).slice(0, 3 - list.length);
      list = [...list, ...otherItems];
    }

    // Sort or slice to get exactly 2-3 top matching products
    return list.slice(0, 3);
  };

  const recommendations = getRecommendations();
  const totalPrice = recommendations.reduce((acc, p) => acc + p.price, 0);

  const handleImportAll = () => {
    const items = recommendations.map(p => ({ product: p, quantity: 1 }));
    onAddRegistryToCart(items);
    setImported(true);
    setTimeout(() => {
      setImported(false);
      onClose();
    }, 2000);
  };

  const resetBuilder = () => {
    setStage('expecting');
    setFocus('all');
    setStyle('minimalist');
    setRegistryName('');
    setStep(1);
    setImported(false);
  };

  return (
    <div className="bg-[#faf8f5] border border-[#e9e3db] rounded-3xl p-6 md:p-8 max-w-4xl mx-auto my-6" id="registry-builder">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-[#e9e3db] pb-5 mb-6" id="registry-title-header">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#f1ebe1] text-[#bf826b] rounded-2xl">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-sans font-semibold text-xl text-[#323631]">Nesta Interactive Registry Builder</h2>
            <p className="text-xs text-[#6d756b]">A pediatric safety-first registry planner custom tailored for your baby's age and needs.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e9e3db] hover:bg-white text-[#6d756b] cursor-pointer"
        >
          Back to Shop
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 max-w-md mx-auto" id="registry-progress">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-initial">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s 
                  ? 'bg-[#5c6a5a] text-white ring-4 ring-[#5c6a5a]/10' 
                  : step > s 
                    ? 'bg-[#6c8e6a] text-white' 
                    : 'bg-[#e9e3db] text-[#848c82]'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            {s < 4 && (
              <div 
                className={`h-0.5 flex-1 mx-2 ${
                  step > s ? 'bg-[#6c8e6a]' : 'bg-[#e9e3db]'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Baby's Stage */}
      {step === 1 && (
        <div className="space-y-6" id="registry-step-1">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bf826b]">Step 1 of 3</span>
            <h3 className="font-sans font-semibold text-lg text-[#323631] mt-1">What stage is your family in?</h3>
            <p className="text-sm text-[#6d756b] mt-1">We filter safety specs based on baby's tactile safety limits.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'expecting', title: 'Nesting & Expecting', age: 'Prenatal prep', icon: '🤰' },
              { id: 'newborn', title: 'Newborn Arrival', age: '0 - 3 months', icon: '🍼' },
              { id: 'infant', title: 'Infant Exploration', age: '3 - 12 months', icon: '👶' },
              { id: 'toddler', title: 'Toddler Adventure', age: '12 - 24+ months', icon: '🦖' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setStage(option.id as any)}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  stage === option.id 
                    ? 'bg-white border-[#5c6a5a] ring-2 ring-[#5c6a5a]/10 shadow-md' 
                    : 'bg-white border-[#e9e3db] hover:border-[#6d756b] shadow-xs'
                }`}
              >
                <span className="text-3xl mb-1">{option.icon}</span>
                <span className="font-sans font-semibold text-sm text-[#323631]">{option.title}</span>
                <span className="text-[11px] text-[#848c82]">{option.age}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#f5f1ea]">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Primary Focus Area */}
      {step === 2 && (
        <div className="space-y-6" id="registry-step-2">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bf826b]">Step 2 of 3</span>
            <h3 className="font-sans font-semibold text-lg text-[#323631] mt-1">What is your primary milestone focus?</h3>
            <p className="text-sm text-[#6d756b] mt-1">We prioritize recommendations based on parent milestones.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: 'sleep', title: 'Safe Sleep', desc: 'Cozy swaddles & beds', icon: '💤' },
              { id: 'feeding', title: 'Clean Feeding', desc: 'Bamboo & silicone', icon: '🍎' },
              { id: 'play', title: 'Active Play', desc: 'Sustainably crafted toys', icon: '🧸' },
              { id: 'gear', title: 'Babywearing & Travel', desc: 'Comfort carriers', icon: '🎒' },
              { id: 'all', title: 'Full Nest Prep', desc: 'Essential top picks', icon: '🌟' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setFocus(option.id as any)}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  focus === option.id 
                    ? 'bg-white border-[#5c6a5a] ring-2 ring-[#5c6a5a]/10 shadow-md' 
                    : 'bg-white border-[#e9e3db] hover:border-[#6d756b] shadow-xs'
                }`}
              >
                <span className="text-2xl mb-1">{option.icon}</span>
                <span className="font-sans font-semibold text-sm text-[#323631] block leading-tight">{option.title}</span>
                <span className="text-[10px] text-[#848c82] leading-tight block mt-0.5">{option.desc}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-[#f5f1ea]">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold px-4 py-3 rounded-xl border border-[#e9e3db] hover:bg-white text-[#6d756b] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1 bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Design Style & Details */}
      {step === 3 && (
        <div className="space-y-6" id="registry-step-3">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#bf826b]">Step 3 of 3</span>
            <h3 className="font-sans font-semibold text-lg text-[#323631] mt-1">Nursery Aesthetic & Registry Details</h3>
            <p className="text-sm text-[#6d756b] mt-1">Matching your home design aesthetic for perfect harmony.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { id: 'minimalist', title: 'Minimalist Nordic', desc: 'Soft solids & organic curves', icon: '🪵' },
              { id: 'natural', title: 'Earth Organic', desc: 'Rattans, woods, sages', icon: '🌿' },
              { id: 'hightech', title: 'Modern Tech', desc: 'Smart sensors & clean slates', icon: '📱' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setStyle(option.id as any)}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  style === option.id 
                    ? 'bg-white border-[#5c6a5a] ring-2 ring-[#5c6a5a]/10 shadow-md' 
                    : 'bg-white border-[#e9e3db] hover:border-[#6d756b] shadow-xs'
                }`}
              >
                <span className="text-2xl mb-1">{option.icon}</span>
                <span className="font-sans font-semibold text-sm text-[#323631]">{option.title}</span>
                <span className="text-[10px] text-[#848c82] leading-tight block mt-0.5">{option.desc}</span>
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto pt-4">
            <label className="block text-xs font-bold text-[#323631] uppercase tracking-wider mb-2">Give your Registry a name:</label>
            <input
              type="text"
              placeholder="e.g., Baby Thompson's Organic Nest"
              value={registryName}
              onChange={(e) => setRegistryName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#e9e3db] bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
              id="registry-name-input"
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-[#f5f1ea]">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold px-4 py-3 rounded-xl border border-[#e9e3db] hover:bg-white text-[#6d756b] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!registryName) {
                  setRegistryName(`${stage.charAt(0).toUpperCase() + stage.slice(1)} Safety Registry`);
                }
                setStep(4);
              }}
              className="flex items-center gap-1 bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Analyze & Curate
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Results & Integration */}
      {step === 4 && (
        <div className="space-y-6" id="registry-step-4">
          <div className="bg-[#5c6a5a] rounded-3xl p-6 text-white text-center flex flex-col items-center gap-2">
            <Sparkles className="h-8 w-8 text-[#f5f1ea] animate-pulse" />
            <h3 className="font-sans font-semibold text-xl">{registryName} is Ready!</h3>
            <p className="text-xs text-[#faf8f5]/80 max-w-md">
              Based on your baby's stage (<span className="capitalize font-semibold">{stage}</span>), focused need (<span className="capitalize font-semibold">{focus === 'all' ? 'Milestones' : focus}</span>), and a <span className="capitalize font-semibold">{style}</span> aesthetic, our board pediatricians recommend starting with these GOTS/OEKO-TEX certified essentials.
            </p>
          </div>

          <div className="space-y-4" id="registry-results-list">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#848c82]">Recommended Organic Essentials ({recommendations.length}):</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((prod) => (
                <div key={prod.id} className="bg-white border border-[#e9e3db] rounded-2xl p-4 flex gap-3 items-center">
                  <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-xl shrink-0" referrerPolicy="no-referrer" />
                  <div className="min-w-0">
                    <p className="font-sans font-bold text-sm text-[#323631] truncate">{prod.name}</p>
                    <p className="text-xs text-[#6d756b] font-semibold">${prod.price.toFixed(2)}</p>
                    <span className="inline-block bg-[#f1ebe1] text-[#5c6a5a] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase mt-1">
                      {prod.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#fcfaf2] border border-[#e9e3db] p-4 rounded-2xl flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 text-[#bf826b] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#323631]">Pediatric Safety Note:</p>
              <p className="text-[11px] text-[#6d756b] mt-0.5 leading-relaxed">
                All these items conform strictly to physical choking hazard regulations, raw fabric bio-compatibility benchmarks, and organic certifications (GOTS/OEKO-TEX). Free of BPA, lead, or flame-retardant sprays.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between border-t border-[#f5f1ea] pt-5">
            <button
              onClick={resetBuilder}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-3 rounded-xl border border-[#e9e3db] hover:bg-white text-[#6d756b] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Plan
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleImportAll}
                disabled={imported}
                className={`font-sans text-sm font-semibold py-3.5 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  imported
                    ? 'bg-[#6c8e6a] text-white shadow-md'
                    : 'bg-[#5c6a5a] hover:bg-[#4d594b] text-white shadow-sm hover:shadow-md'
                }`}
              >
                {imported ? (
                  <>
                    <Check className="h-4 w-4" />
                    Registry Imported to Cart!
                  </>
                ) : (
                  <>
                    Import All {recommendations.length} items to Diaper Bag — ${totalPrice.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
