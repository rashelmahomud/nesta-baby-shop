import React, { useState } from 'react';
import { Star, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Choose first color/size defaults if they exist
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : undefined;
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    
    onAddToCart(product, 1, defaultColor, defaultSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Extract a highlight certification name to display as a badge on the image
  const displayBadge = product.certifications && product.certifications.length > 0 
    ? product.certifications[0].name.replace('®', '').replace('™', '') 
    : undefined;

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden border border-[#e9e3db] hover:border-[#6d756b]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onViewDetails(product)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image & Badge Overlay */}
      <div className="relative aspect-square overflow-hidden bg-[#faf8f5] w-full" id={`card-image-container-${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          id={`card-image-${product.id}`}
        />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#5c6a5a] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#e9e3db]">
          {product.category}
        </span>

        {/* Cert/Safety Overlay */}
        {displayBadge && (
          <span className="absolute bottom-3 left-3 bg-[#5c6a5a] text-[#f7f5f0] text-[9px] font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase">
            🛡️ {displayBadge}
          </span>
        )}

        {/* Pediatrician Approved Indicator */}
        {product.pediatricianNote && (
          <span className="absolute top-3 right-3 bg-[#bf826b]/95 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Approved
          </span>
        )}

        {/* Quick View Button Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-[#323631] text-xs font-semibold px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-3.5 w-3.5" />
            Learn Safety & Specs
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between" id={`card-content-${product.id}`}>
        <div>
          {/* Reviews Rating summary */}
          <div className="flex items-center gap-1 mb-2" id={`card-stars-${product.id}`}>
            <div className="flex items-center text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#323631]">{product.rating}</span>
            <span className="text-[10px] text-[#848c82]">({product.reviewCount})</span>
          </div>

          <h3 className="font-sans font-semibold text-[#323631] text-base group-hover:text-[#5c6a5a] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#6d756b] mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-[#f5f1ea] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-semibold text-[#323631] text-base">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs line-through text-[#848c82]">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`cursor-pointer p-2 rounded-full transition-all flex items-center justify-center ${
              isAdded 
                ? 'bg-[#6c8e6a] text-white' 
                : 'bg-[#faf8f5] hover:bg-[#5c6a5a] text-[#5c6a5a] hover:text-white border border-[#e9e3db] hover:border-[#5c6a5a]'
            }`}
            title="Quick add to basket"
            id={`quick-add-${product.id}`}
          >
            {isAdded ? (
              <Check className="h-4 w-4 animate-scale-in" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
