import React, { useState } from 'react';
import { X, Lock, Mail, Sparkles, CheckCircle, Baby, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, babyName?: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [babyName, setBabyName] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length < 4) {
      setError('Please enter the 4-digit verification code.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email, babyName);
      // Reset state for next open
      setEmail('');
      setBabyName('');
      setVerificationCode('');
      setStep(1);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in" id="login-modal-overlay">
      <div 
        className="relative w-full max-w-md bg-[#faf8f5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(92,106,90,0.25)] border border-[#e9e3db] transition-all duration-300"
        id="login-modal-container"
      >
        {/* Header background pattern */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#e4ded5]/60 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#848c82] hover:text-[#323631] hover:bg-[#e4ded5]/40 rounded-full transition-all cursor-pointer focus:outline-hidden"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 pt-10 relative z-10">
          {/* Logo Brand Indicator */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#faf8f5] to-[#f0eae1] border border-[#e4ded5] text-[#5c6a5a] flex items-center justify-center mb-3 shadow-xs">
              <Baby className="h-6 w-6 text-[#bf826b]" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[#323631] tracking-tight">
              Welcome to nesta<span className="text-[#bf826b]">.</span>
            </h3>
            <p className="text-xs text-[#848c82] uppercase tracking-widest font-bold mt-1">
              Parent Nesting Dashboard
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmitEmail} className="space-y-4" id="login-form-step-1">
              <div className="text-center mb-4">
                <p className="text-xs text-[#6d756b] leading-relaxed">
                  Enter your email to access your personalized organic registries, track active orders, or manage milestones checklists. No password required.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 text-center">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c6a5a] mb-1.5">
                    Parent's Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#848c82]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="mama@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-[#e9e3db] bg-white text-[#323631] focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a]/20 focus:border-[#5c6a5a] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c6a5a] mb-1.5">
                    Baby's Name or Expected Arrival <span className="text-[#848c82] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#848c82]">
                      <Sparkles className="h-4 w-4 text-[#bf826b]" />
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Liam or Winter 2026"
                      value={babyName}
                      onChange={(e) => setBabyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-[#e9e3db] bg-white text-[#323631] focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a]/20 focus:border-[#5c6a5a] transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5c6a5a] hover:bg-[#4d594b] disabled:bg-[#848c82]/50 text-white text-xs font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Request One-Time PIN</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4" id="login-form-step-2">
              <div className="text-center mb-4 bg-[#f5f1ea] p-4 rounded-2xl border border-[#e9e3db]/60">
                <p className="text-xs text-[#5c6a5a] font-semibold">
                  We've sent a 4-digit parenting code to:
                </p>
                <p className="text-xs font-bold text-[#323631] mt-1 break-all">
                  {email}
                </p>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="text-[10px] text-[#bf826b] underline font-bold mt-2 hover:text-[#a06d57]"
                >
                  Change email address
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c6a5a] text-center mb-2">
                  Enter 4-Digit Security Code
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="1234"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-32 mx-auto tracking-[0.5em] text-center text-lg font-bold py-2.5 rounded-xl border border-[#e9e3db] bg-white text-[#323631] block focus:outline-hidden focus:ring-2 focus:ring-[#5c6a5a]/20 focus:border-[#5c6a5a] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#bf826b] hover:bg-[#a06d57] disabled:bg-[#848c82]/50 text-white text-xs font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-4"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Securely Sign In</span>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center gap-1.5 text-[10px] text-[#848c82] mt-4">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6c8e6a]" />
                <span>Pediatric-grade AES SSL 256 encryption</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
