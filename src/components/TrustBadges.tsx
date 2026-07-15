import { ShieldCheck, Heart, Leaf, Sparkles } from 'lucide-react';
import { TRUST_FEATURES } from '../data';

export default function TrustBadges() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-[#5c6a5a]" />;
      case 'Heart':
        return <Heart className="h-6 w-6 text-[#bf826b]" />;
      case 'Leaf':
        return <Leaf className="h-6 w-6 text-[#6c8e6a]" />;
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-[#a4866c]" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-[#5c6a5a]" />;
    }
  };

  return (
    <section className="bg-[#faf8f5] py-10 border-b border-[#e9e3db]" id="trust-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8" id="trust-header">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#848c82]">Uncompromised Standards</p>
          <h2 className="text-2xl font-sans font-semibold text-[#323631] mt-2 tracking-tight">
            Designed for Peace of Mind
          </h2>
          <p className="text-[#6d756b] text-sm mt-2">
            Every product we make passes through a rigorous safety protocol checked by medical board specialists, because your baby deserves the absolute safest start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="trust-grid">
          {TRUST_FEATURES.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#e9e3db]/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
              id={`trust-feature-card-${idx}`}
            >
              <div className="p-3 bg-[#faf8f5] rounded-xl mb-4 border border-[#e9e3db]/50">
                {getIcon(feature.icon)}
              </div>
              <h3 className="font-sans font-semibold text-base text-[#323631]">{feature.title}</h3>
              <p className="text-sm text-[#6d756b] mt-1.5 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#f5f1ea] rounded-2xl p-5 border border-[#e9e3db] flex flex-wrap gap-6 items-center justify-around text-center" id="trust-seals">
          <div className="flex items-center gap-2" id="seal-gots">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6c8e6a]"></span>
            <span className="font-sans font-medium text-xs text-[#5c6a5a] uppercase tracking-wider">GOTS Certified Organic</span>
          </div>
          <div className="flex items-center gap-2" id="seal-oekotex">
            <span className="w-2.5 h-2.5 rounded-full bg-[#bf826b]"></span>
            <span className="font-sans font-medium text-xs text-[#5c6a5a] uppercase tracking-wider">OEKO-TEX Standard 100</span>
          </div>
          <div className="flex items-center gap-2" id="seal-bpa">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7a828a]"></span>
            <span className="font-sans font-medium text-xs text-[#5c6a5a] uppercase tracking-wider">100% BPA & Lead Free</span>
          </div>
          <div className="flex items-center gap-2" id="seal-hip">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a4866c]"></span>
            <span className="font-sans font-medium text-xs text-[#5c6a5a] uppercase tracking-wider">IHDI Hip Healthy Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
}
