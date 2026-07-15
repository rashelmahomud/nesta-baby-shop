import React, { useState } from 'react';
import { X, Shield, Lock, CreditCard, Sparkles, Check, ChevronRight, AlertCircle, ShoppingBag, MapPin, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [orderId] = useState(() => `NST-${Math.floor(100000 + Math.random() * 900000)}`);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 75;
  const shippingCost = subtotal > 0 && !isFreeShipping ? 5.99 : 0;
  const total = subtotal + shippingCost;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (shippingName && shippingEmail && shippingAddress && shippingZip) {
        setStep(2);
      }
    } else if (step === 2) {
      if (cardNumber && cardExpiry && cardCvv) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setStep(3);
        }, 1500);
      }
    }
  };

  const handleCloseSuccess = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="checkout-modal">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-[#323631]/45 backdrop-blur-xs transition-opacity" 
          onClick={() => step !== 3 && onClose()}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-[#faf8f5] rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-[#e9e3db]" id="checkout-modal-body">
          
          {/* Close button - only show if not successfully purchased */}
          {step !== 3 && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#323631] border border-[#e9e3db] transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}

          {/* Modal Header */}
          <div className="p-6 border-b border-[#e9e3db] bg-white flex justify-between items-center">
            <div>
              <h3 className="font-sans font-semibold text-base text-[#323631]">
                {step === 1 && 'Secure Checkout — Shipping Details'}
                {step === 2 && 'Secure Checkout — Payment Details'}
                {step === 3 && 'Order Placed Successfully!'}
              </h3>
              <p className="text-[11px] text-[#6d756b] mt-0.5">
                {step === 1 && 'Please enter where to send your organic baby package.'}
                {step === 2 && 'Sandbox secure checkout. No real money will be charged.'}
                {step === 3 && `Order receipt ${orderId} has been sent to your nesting inbox.`}
              </p>
            </div>
          </div>

          {/* STEP 1: Shipping Form */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="p-6 space-y-4" id="shipping-form">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">Full Parent Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Emily Thompson"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">Nesting Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., emily@nestingfamily.com"
                    value={shippingEmail}
                    onChange={(e) => setShippingEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">Delivery Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 42 Sweetbriar Lane, Apt 2B"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 10001"
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                  />
                </div>
              </div>

              <div className="bg-[#fcfaf2] border border-[#e9e3db] p-4 rounded-xl flex items-start gap-2.5 text-[11px] text-[#6d756b]">
                <Truck className="h-4 w-4 text-[#bf826b] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#323631]">Standard Carbon-Neutral Shipping:</span>
                  <p className="mt-0.5">Estimated delivery is 2-4 business days. Securely packaged in 100% compostable boxes with organic starch packing peanuts.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f5f1ea] flex justify-between items-center">
                <span className="text-xs text-[#848c82]">Total: <strong className="text-[#323631]">${total.toFixed(2)}</strong></span>
                <button
                  type="submit"
                  className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  Continue to Payment
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Form */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="p-6 space-y-4" id="payment-form">
              <div className="bg-[#f5f1ea]/70 rounded-2xl p-4 border border-[#e9e3db] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#323631]">Ship To:</p>
                  <p className="text-[11px] text-[#6d756b]">{shippingName}, {shippingAddress}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[10px] font-bold text-[#5c6a5a] underline hover:text-black cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">Credit Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                    />
                    <CreditCard className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">Expiration Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#323631] uppercase tracking-wider mb-1.5">CVV Security Code</label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e9e3db] bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a] text-[#323631]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#fcfaf2] border border-[#e9e3db] p-3 rounded-xl flex items-center gap-2 text-[10px] text-[#6d756b]">
                <Lock className="h-3.5 w-3.5 text-[#6c8e6a] shrink-0" />
                <span>Secure SSL Sandbox Environment. No live payments are processed. Try any sandbox card.</span>
              </div>

              <div className="pt-4 border-t border-[#f5f1ea] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-[#6d756b] underline cursor-pointer"
                >
                  Back to shipping
                </button>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Encrypting...
                    </>
                  ) : (
                    <>
                      Pay Securely — ${total.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Completed Receipt */}
          {step === 3 && (
            <div className="p-6 text-center space-y-6" id="success-receipt">
              <div className="w-16 h-16 bg-[#6c8e6a]/15 text-[#5c6a5a] rounded-full flex items-center justify-center mx-auto scale-110">
                <Check className="h-8 w-8 text-[#6c8e6a]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6c8e6a]">Purchase Confirmed!</span>
                <h3 className="font-sans font-semibold text-xl text-[#323631] mt-1">Thank you for trusting Nesta, {shippingName}!</h3>
                <p className="text-xs text-[#6d756b] mt-1.5 max-w-sm mx-auto">
                  Your order has been logged into our board routing system. An official tracking notification will hit your inbox shortly.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-white border border-[#e9e3db] rounded-2xl p-4 text-left max-h-[160px] overflow-y-auto space-y-3">
                <div className="flex justify-between text-xs pb-2 border-b border-[#faf8f5]">
                  <span className="text-[#848c82]">Order Tracking ID:</span>
                  <span className="font-mono font-bold text-[#323631]">{orderId}</span>
                </div>
                
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[220px] font-medium text-[#323631]">
                      {item.product.name} <span className="text-[10px] text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-[#6d756b]">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center text-xs pt-2 border-t border-[#f5f1ea] font-bold text-[#323631]">
                  <span>Amount Debited:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCloseSuccess}
                  className="w-full bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-semibold py-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Continue Nesting
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
