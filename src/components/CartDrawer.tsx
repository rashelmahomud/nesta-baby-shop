import React, { useState } from 'react';
import { X, Trash2, Shield, Lock, CreditCard, Sparkles, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, color?: string, size?: string) => void;
  onRemoveItem: (productId: string, color?: string, size?: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'NESTING10') {
      setDiscountPercent(10);
      setAppliedCode('NESTING10');
      setPromoError('');
    } else if (promoCode.toUpperCase() === 'BABYCARE') {
      setDiscountPercent(15);
      setAppliedCode('BABYCARE');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try NESTING10 for 10% off!');
    }
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const shippingThreshold = 75;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingCost = subtotal > 0 && !isFreeShipping ? 5.99 : 0;
  const total = subtotal - discountAmount + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-[#323631]/40 backdrop-blur-xs transition-opacity cursor-pointer" 
          onClick={onClose}
        ></div>

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          {/* Drawer Body */}
          <div className="w-screen max-w-md bg-[#faf8f5] border-l border-[#e9e3db] flex flex-col shadow-2xl justify-between" id="cart-drawer-panel">
            
            {/* Header */}
            <div className="p-6 border-b border-[#e9e3db] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-lg text-[#323631]">Your Diaper Bag Basket</span>
                <span className="bg-[#f1ebe1] text-[#5c6a5a] text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#faf8f5] text-[#6d756b] hover:text-black transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" id="cart-drawer-items-list">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-4" id="empty-cart-view">
                  <div className="w-16 h-16 bg-[#f1ebe1] text-[#5c6a5a] rounded-full flex items-center justify-center mx-auto">
                    <Trash2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-base text-[#323631]">Your basket is currently empty</p>
                    <p className="text-xs text-[#6d756b] mt-1 max-w-xs mx-auto">
                      Explore our organic bedding, hip-healthy carriers, and pediatrician-approved developmental play toys to start nesting.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Shipping Progress bar */}
                  <div className="bg-white border border-[#e9e3db] p-3 rounded-2xl" id="shipping-progress-container">
                    {isFreeShipping ? (
                      <p className="text-xs font-semibold text-[#5c6a5a] flex items-center gap-1.5 justify-center">
                        <CheckCircle className="h-4 w-4 text-[#6c8e6a]" />
                        Congratulations! You unlocked free shipping!
                      </p>
                    ) : (
                      <div className="space-y-1.5 text-center">
                        <p className="text-[11px] text-[#6d756b] font-medium">
                          Add <span className="font-bold text-[#323631]">${(shippingThreshold - subtotal).toFixed(2)}</span> more for free shipping!
                        </p>
                        <div className="w-full bg-[#f1ebe1] h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#bf826b] h-full transition-all duration-300" 
                            style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Items list */}
                  {cartItems.map((item, idx) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                      className="bg-white border border-[#e9e3db] rounded-2xl p-4 flex gap-4 shadow-2xs hover:shadow-xs transition-shadow"
                      id={`cart-item-${idx}`}
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded-xl bg-[#faf8f5] shrink-0 border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans font-semibold text-xs text-[#323631] truncate max-w-[180px]">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedColor, item.selectedSize)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          
                          {/* Selected Attributes */}
                          {(item.selectedColor || item.selectedSize) && (
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {item.selectedColor && (
                                <span className="bg-[#f5f1ea] text-[#6d756b] text-[9px] px-2 py-0.5 rounded-md">
                                  Color: {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="bg-[#f5f1ea] text-[#6d756b] text-[9px] px-2 py-0.5 rounded-md">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity controls and price */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#fcfaf2]">
                          <div className="flex items-center border border-[#e9e3db] rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedColor, item.selectedSize)}
                              className="px-1.5 text-[#323631] hover:bg-gray-100 rounded-md text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-[#323631]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedColor, item.selectedSize)}
                              className="px-1.5 text-[#323631] hover:bg-gray-100 rounded-md text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-sans font-bold text-xs text-[#323631]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations & Checkout (Sticky Footer) */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-[#e9e3db] space-y-4" id="cart-drawer-summary">
                
                {/* Promo Code Input Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2" id="promo-code-form">
                  <input
                    type="text"
                    placeholder="Enter Coupon (NESTING10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#e9e3db] text-xs uppercase text-[#323631] tracking-wider focus:outline-hidden focus:border-[#5c6a5a]"
                  />
                  <button
                    type="submit"
                    className="bg-[#f1ebe1] hover:bg-[#e7decb] text-[#5c6a5a] text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                
                {appliedCode && (
                  <p className="text-[11px] text-[#6c8e6a] font-semibold flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    Code {appliedCode} successfully applied ({discountPercent}% discount)
                  </p>
                )}
                
                {promoError && (
                  <p className="text-[10px] text-red-500 font-medium">
                    {promoError}
                  </p>
                )}

                {/* Subtotals & Costs */}
                <div className="space-y-1.5 pt-2 border-t border-[#f5f1ea]">
                  <div className="flex justify-between text-xs text-[#6d756b]">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-[#323631]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-xs text-[#6c8e6a]">
                      <span>Discount ({discountPercent}%):</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-[#6d756b]">
                    <span>Eco Shipping:</span>
                    <span className="font-semibold text-[#323631]">
                      {shippingCost === 0 ? (
                        <span className="text-[#6c8e6a]">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-[#f5f1ea]">
                    <span className="font-sans font-bold text-[#323631]">Total Amount:</span>
                    <span className="font-sans font-bold text-[#323631] text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Secure checkout buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-sm font-semibold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
                    id="trigger-checkout-btn"
                  >
                    <CreditCard className="h-4 w-4" />
                    Proceed to Secure Checkout
                  </button>

                  {/* Trust guarantees */}
                  <div className="flex justify-center items-center gap-4 text-[10px] text-[#848c82]">
                    <div className="flex items-center gap-1">
                      <Lock className="h-3 w-3 text-[#6c8e6a]" />
                      <span>256-Bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-[#6c8e6a]" />
                      <span>Safe Purchase Guarantee</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
