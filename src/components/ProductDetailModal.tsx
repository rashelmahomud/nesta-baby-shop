import { X, Star, ShieldCheck, Heart, Leaf, HelpCircle, Check, ThumbsUp } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'safety' | 'materials' | 'reviews'>('safety');
  const [hasAdded, setHasAdded] = useState(false);

  if (!product) return null;

  // Initialize defaults
  if (!selectedColor && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0].name);
  }
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    setHasAdded(true);
    setTimeout(() => {
      setHasAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="product-detail-modal">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-[#323631]/40 backdrop-blur-xs transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Trick browser into centering modal contents */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal body */}
        <div className="inline-block align-bottom bg-[#faf8f5] rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-[#e9e3db]" id="detail-modal-body">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#323631] hover:text-black border border-[#e9e3db] transition-colors cursor-pointer"
            id="close-detail-modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2" id="detail-modal-grid">
            {/* Left Column: Product Image */}
            <div className="relative bg-[#f5f1ea] p-6 flex items-center justify-center border-r border-[#e9e3db]" id="detail-modal-left">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-sm"
                referrerPolicy="no-referrer"
                id="detail-modal-img"
              />
              {/* Overlay Quality Badge */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-[#e9e3db] flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#6c8e6a]" />
                <div>
                  <p className="text-xs font-bold text-[#323631] uppercase tracking-wider">Verified Authentic Quality</p>
                  <p className="text-[10px] text-[#6d756b] mt-0.5">Tested for bio-compatibility & organic trace origins.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Purchase & Trust Panel */}
            <div className="p-6 md:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto" id="detail-modal-right">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#f1ebe1] text-[#5c6a5a] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                  {product.stock < 20 && (
                    <span className="bg-[#ebdcd0] text-[#bf826b] text-[10px] font-semibold px-2 py-1 rounded-full">
                      Only {product.stock} Left in Stock
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="font-sans font-semibold text-[#323631] text-2xl tracking-tight leading-snug">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#323631]">{product.rating}</span>
                  <span className="text-xs text-[#848c82]">({product.reviewCount} parent reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2.5 mt-3">
                  <span className="font-sans font-bold text-2xl text-[#323631]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-sm line-through text-[#848c82]">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#6d756b] mt-4 leading-relaxed border-b border-[#f5f1ea] pb-4">
                  {product.description}
                </p>

                {/* Options Panel: Colors & Sizes */}
                <div className="mt-4 space-y-4">
                  {product.colors && product.colors.length > 0 && (
                    <div id="detail-color-selector">
                      <span className="block text-xs font-semibold text-[#323631] uppercase tracking-wider mb-2">
                        Organic Fabric Color: <span className="font-normal text-[#6d756b]">{selectedColor}</span>
                      </span>
                      <div className="flex gap-2.5">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                              selectedColor === color.name ? 'border-[#5c6a5a] scale-110' : 'border-[#e9e3db] hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {selectedColor === color.name && (
                              <Check className={`h-4 w-4 ${color.hex === '#fcfaf2' || color.hex === '#fbf6ec' ? 'text-black' : 'text-white'}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.sizes && product.sizes.length > 0 && (
                    <div id="detail-size-selector">
                      <span className="block text-xs font-semibold text-[#323631] uppercase tracking-wider mb-2">
                        Select Baby Size / Age Group:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'bg-[#5c6a5a] text-[#f7f5f0] border-[#5c6a5a]'
                                : 'bg-white text-[#6d756b] border-[#e9e3db] hover:border-[#6d756b]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dynamic Content Tabs */}
                <div className="mt-6 border-b border-[#e9e3db] flex text-xs font-medium" id="detail-tabs">
                  <button
                    onClick={() => setActiveTab('safety')}
                    className={`pb-2.5 px-4 relative cursor-pointer ${
                      activeTab === 'safety' ? 'text-[#5c6a5a] font-semibold' : 'text-[#848c82] hover:text-[#5c6a5a]'
                    }`}
                  >
                    Medical/Safety Evaluation
                    {activeTab === 'safety' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c6a5a]"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-2.5 px-4 relative cursor-pointer ${
                      activeTab === 'materials' ? 'text-[#5c6a5a] font-semibold' : 'text-[#848c82] hover:text-[#5c6a5a]'
                    }`}
                  >
                    Organic Material Sheet
                    {activeTab === 'materials' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c6a5a]"></div>}
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 px-4 relative cursor-pointer ${
                      activeTab === 'reviews' ? 'text-[#5c6a5a] font-semibold' : 'text-[#848c82] hover:text-[#5c6a5a]'
                    }`}
                  >
                    Verified Parents ({product.reviews.length})
                    {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c6a5a]"></div>}
                  </button>
                </div>

                {/* Tab Content Panel */}
                <div className="mt-4 p-4 bg-white border border-[#e9e3db]/60 rounded-xl max-h-[180px] overflow-y-auto" id="detail-tab-content">
                  {activeTab === 'safety' && (
                    <div className="space-y-3" id="tab-safety-content">
                      {product.pediatricianNote ? (
                        <div className="flex gap-2">
                          <Heart className="h-5 w-5 text-[#bf826b] shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-[#323631]">
                              Endorsed & Monitored: <span className="text-[#bf826b] font-medium">{product.pediatricianNote.approvedBy}</span>
                            </p>
                            <p className="text-[11px] text-[#6d756b] mt-1 italic leading-relaxed">
                              "{product.pediatricianNote.note}"
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#6d756b]">Fully tested under pediatric safety guidelines for mechanical hazards.</p>
                      )}

                      {product.certifications && product.certifications.length > 0 && (
                        <div className="pt-2 border-t border-[#f5f1ea]">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-[#848c82] mb-1.5">Official Certifications</p>
                          {product.certifications.map((cert) => (
                            <div key={cert.name} className="mb-2 last:mb-0">
                              <p className="text-xs font-bold text-[#5c6a5a] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[#6c8e6a] rounded-full"></span>
                                {cert.name} <span className="text-[9px] font-light text-gray-500">by {cert.authority}</span>
                              </p>
                              <p className="text-[10px] text-[#6d756b] ml-2.5 mt-0.5">{cert.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'materials' && (
                    <div className="space-y-2.5" id="tab-materials-content">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#848c82]">Direct Material Composition</span>
                        <p className="text-xs text-[#323631] font-medium mt-0.5">{product.materials}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#848c82]">Nontoxicity Certification</span>
                        <p className="text-[11px] text-[#6d756b] leading-relaxed">
                          Hypoallergenic, nickel-free, lead-free, containing no pesticides, no heavy metals, and no toxic finishes. Safe for contact with baby's skin and teething mouthing exploration.
                        </p>
                      </div>
                      <div className="pt-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#848c82]">Key Features Checklist</span>
                        <ul className="grid grid-cols-1 gap-1.5 mt-1.5">
                          {product.features.map((feature, i) => (
                            <li key={i} className="text-[11px] text-[#6d756b] flex items-start gap-1.5">
                              <span className="text-[#6c8e6a] font-bold shrink-0">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4" id="tab-reviews-content">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="border-b border-[#f5f1ea] last:border-0 pb-3 last:pb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold text-[#323631] flex items-center gap-1">
                                {review.author}
                                {review.verified && (
                                  <span className="text-[9px] bg-[#6c8e6a]/15 text-[#5c6a5a] px-1.5 py-0.5 rounded-full font-semibold">
                                    Verified Parent
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-[#848c82]">{review.role} • {review.date}</p>
                            </div>
                            <div className="flex text-[#d4af37]">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-[#6d756b] mt-1.5 leading-relaxed italic">
                            "{review.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions: Quantity selector & Add to Basket */}
              <div className="mt-6 pt-4 border-t border-[#f5f1ea] flex items-center gap-4" id="detail-actions">
                <div className="flex items-center border border-[#e9e3db] rounded-xl bg-white p-1" id="quantity-picker">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 px-2.5 text-[#323631] hover:bg-[#faf8f5] rounded-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#323631]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1 px-2.5 text-[#323631] hover:bg-[#faf8f5] rounded-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={hasAdded}
                  className={`flex-1 font-sans text-sm font-semibold py-3.5 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    hasAdded
                      ? 'bg-[#6c8e6a] text-white shadow-md'
                      : 'bg-[#5c6a5a] hover:bg-[#4d594b] text-white shadow-sm hover:shadow-md'
                  }`}
                  id="add-to-cart-action-btn"
                >
                  {hasAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added to Diaper Bag!
                    </>
                  ) : (
                    <>
                      Add to Shopping Basket — ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
