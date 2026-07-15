import React, { useState } from 'react';
import { Star, Eye, Plus, Check, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  isWished?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onViewDetails, 
  onAddToCart,
  isWished: externalIsWished,
  onToggleWishlist
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [internalIsWished, setInternalIsWished] = useState(false);
  
  const isWished = externalIsWished !== undefined ? externalIsWished : internalIsWished;

  // Interactive color & size configurations directly on the card
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      setInternalIsWished(!internalIsWished);
    }
  };

  // Main high-profile certification badge
  const displayBadge = product.certifications && product.certifications.length > 0 
    ? product.certifications[0].name.replace('®', '').replace('™', '') 
    : undefined;

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden border border-[#e9e3db] hover:border-[#bf826b]/40 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer relative"
      onClick={() => onViewDetails(product)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image & Badge Overlay */}
      <div className="relative aspect-square overflow-hidden bg-[#faf8f5] w-full border-b border-[#faf8f5]" id={`card-image-container-${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          id={`card-image-${product.id}`}
        />
        
        {/* Soft Category Tag */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#5c6a5a] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#e9e3db]/60 shadow-xs">
          {product.category}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md border border-[#e9e3db]/60 text-gray-400 hover:text-[#bf826b] transition-all hover:scale-110 shadow-xs"
          title="Save to Nesting Registry"
          id={`wishlist-btn-${product.id}`}
        >
          <Heart className={`h-3.5 w-3.5 ${isWished ? 'fill-[#bf826b] text-[#bf826b]' : ''}`} />
        </button>

        {/* Cert/Safety Highlight Overlay Badge */}
        {displayBadge && (
          <span className="absolute bottom-3 left-3 bg-[#5c6a5a]/95 backdrop-blur-xs text-[#f7f5f0] text-[8px] font-bold px-2.5 py-1 rounded-lg tracking-wider uppercase shadow-xs flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-green-300" />
            {displayBadge}
          </span>
        )}

        {/* Stock Status Label */}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="absolute bottom-3 right-3 bg-[#bf826b] text-white text-[8px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
            Low Stock
          </span>
        )}

        {/* Quick View Button Hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-[#323631] text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-3.5 w-3.5 text-[#5c6a5a]" />
            Learn Safety & Specs
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between" id={`card-content-${product.id}`}>
        <div>
          {/* Reviews Rating Summary */}
          <div className="flex items-center gap-1.5 mb-1.5" id={`card-stars-${product.id}`}>
            <div className="flex items-center text-[#bf826b]">
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-[#323631]">{product.rating}</span>
            <span className="text-[10px] text-[#848c82]">({product.reviewCount} reviews)</span>
          </div>

          <h3 className="font-sans font-semibold text-[#323631] text-sm md:text-base group-hover:text-[#5c6a5a] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#6d756b] mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Color Swatch Selector inside the Card */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3" id={`color-selectors-${product.id}`}>
              <div className="flex flex-wrap items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c.name);
                    }}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedColor === c.name 
                        ? 'ring-2 ring-[#5c6a5a] ring-offset-1 scale-115 border-transparent' 
                        : 'border-black/15 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                <span className="text-[9px] font-semibold text-[#848c82] ml-1 uppercase tracking-wider">
                  {selectedColor}
                </span>
              </div>
            </div>
          )}

          {/* Interactive Size Pill Selector inside the Card */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1" id={`size-selectors-${product.id}`}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s);
                  }}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-tight border transition-all ${
                    selectedSize === s 
                      ? 'bg-[#5c6a5a] text-white border-[#5c6a5a] shadow-xs' 
                      : 'bg-[#faf8f5] text-[#6d756b] border-[#e9e3db] hover:border-[#6d756b] hover:bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Pediatrician Note Highlight Badge */}
          {product.pediatricianNote && (
            <div className="mt-3 flex items-center gap-1 text-[9px] font-semibold text-[#bf826b] bg-[#bf826b]/5 px-2 py-1 rounded-md w-fit">
              <Sparkles className="h-2.5 w-2.5 animate-pulse" />
              <span>Pediatrician Approved</span>
            </div>
          )}
        </div>

        {/* Card Footer with Pricing and Action button */}
        <div className="mt-4 pt-3.5 border-t border-[#f5f1ea] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider font-bold text-[#848c82]">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-[#323631] text-base">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-xs line-through text-[#848c82]">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`cursor-pointer h-9 w-9 rounded-full transition-all flex items-center justify-center shadow-xs ${
              isAdded 
                ? 'bg-[#6c8e6a] text-white rotate-360 duration-500 scale-105' 
                : 'bg-[#faf8f5] hover:bg-[#5c6a5a] text-[#5c6a5a] hover:text-white border border-[#e9e3db] hover:border-[#5c6a5a] hover:scale-105 active:scale-95'
            }`}
            title={`Quick add to cart (${selectedColor || 'Default'}${selectedSize ? ` - ${selectedSize}` : ''})`}
            id={`quick-add-${product.id}`}
          >
            {isAdded ? (
              <Check className="h-4 w-4 animate-scale-in" />
            ) : (
              <Plus className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
