import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Award, 
  ShoppingBag, 
  Heart, 
  Sprout, 
  Truck, 
  CheckCircle, 
  Sparkles, 
  Plus, 
  Trash, 
  MapPin, 
  ChevronRight, 
  RotateCcw,
  AlertCircle,
  TrendingUp,
  Map,
  BadgePercent,
  Compass,
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';

interface Order {
  id: string;
  date: string;
  items: {
    product: Product;
    quantity: number;
    color?: string;
    size?: string;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  deliveryStep: 1 | 2 | 3 | 4; // 1: Ordered, 2: Prepared, 3: Shipped, 4: Delivered
  trackingNumber: string;
}

interface CustomerDashboardProps {
  loggedInUser: string;
  loggedInBaby: string | null;
  wishlistedProducts: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  products: Product[];
  onNavigateToShop: () => void;
}

export default function CustomerDashboard({
  loggedInUser,
  loggedInBaby,
  wishlistedProducts,
  onToggleWishlist,
  onAddToCart,
  products,
  onNavigateToShop
}: CustomerDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'orders' | 'wishlist' | 'profile'>('overview');
  
  // Simulated Baby profile states
  const [babyName, setBabyName] = useState(loggedInBaby || 'Baby');
  const [dueDate, setDueDate] = useState('2026-10-15');
  const [babyStage, setBabyStage] = useState<'expecting' | 'newborn' | 'infant' | 'toddler'>('newborn');
  const [nurseryTheme, setNurseryTheme] = useState('Earthy Sage & Ochre');
  const [address, setAddress] = useState('124 Pure Meadow Drive, Eugene, OR 97401');
  const [isSavedMsg, setIsSavedMsg] = useState(false);

  // Rewards states
  const [points, setPoints] = useState(380);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);

  // Simulated live GPS tracking state
  const [expandedGPSOrderId, setExpandedGPSOrderId] = useState<string | null>(null);

  // Simulated orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2026-9481',
      date: '2026-07-10',
      items: [
        {
          product: products[0] || products[products.length - 1], // Swaddle Blanket
          quantity: 2,
          color: 'Earthy Sage',
          size: 'Newborn (0-3M)'
        },
        {
          product: products[4] || products[0], // Wooden Play Gym
          quantity: 1
        }
      ],
      total: 118.00,
      status: 'Shipped',
      deliveryStep: 3,
      trackingNumber: 'TRK-98421095'
    },
    {
      id: 'ORD-2026-9214',
      date: '2026-06-15',
      items: [
        {
          product: products[5] || products[0], // Bamboo Tableware
          quantity: 1,
          color: 'Warm Beige'
        }
      ],
      total: 34.00,
      status: 'Delivered',
      deliveryStep: 4,
      trackingNumber: 'TRK-91048123'
    }
  ]);

  // Selected order for full timeline view
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('ORD-2026-9481');

  // Trigger profile update message
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedMsg(true);
    setTimeout(() => setIsSavedMsg(false), 3000);
  };

  // Claim daily eco-friendly login point
  const handleClaimPoints = () => {
    if (!dailyClaimed) {
      setPoints(prev => prev + 25);
      setDailyClaimed(true);
      setShowClaimAnimation(true);
      setTimeout(() => setShowClaimAnimation(false), 2500);
    }
  };

  // Cancel order handler
  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'Cancelled', deliveryStep: 1 };
      }
      return o;
    }));
  };

  // Request order return handler
  const handleReturnRequest = (orderId: string) => {
    alert(`Return request submitted for order ${orderId}. Our customer advocate team will email your prepaid compostable return shipping label shortly!`);
  };

  // Milestone tips by developmental stage
  const MILESTONE_TIPS = {
    expecting: {
      title: "Prenatal & Nesting Prep",
      ageRange: "Before Birth",
      progress: 85,
      milestoneTitle: "Completing Nesting Suite",
      tips: [
        "Focus on pure, chemical-free GOTS cotton. Infant skin is 5x thinner than adult skin and highly absorbent.",
        "Aerate the nursery weeks in advance to fully dissipate cabinetry finishes, even if they are zero-VOC.",
        "Establish a conscious baby registry early to prioritize organic sleep safety over excessive synthetic playthings."
      ],
      mustHave: products[0] || products[products.length - 1]
    },
    newborn: {
      title: "The Fourth Trimester",
      ageRange: "0 - 3 Months",
      progress: 35,
      milestoneTitle: "Establishing Sleep Rhythms",
      tips: [
        "Swaddling replicates soothing womb pressure, keeping newborn startled reflexes calm.",
        "Favor high-contrast organic sensory visual cues to gently support early optic pathway development.",
        "Maintain room temperature strictly between 68°F and 72°F to preserve ideal newborn thermoregulation."
      ],
      mustHave: products[0] || products[products.length - 1]
    },
    infant: {
      title: "Sensory & Physical Awakening",
      ageRange: "3 - 9 Months",
      progress: 60,
      milestoneTitle: "Sensory Motor Milestones",
      tips: [
        "Utilize sustainably sourced organic wood and pure food-grade silicone toys for non-toxic oral discovery.",
        "Support tummy time with soft cotton activity playmats that avoid polyester flame-retardants.",
        "Introduce pure water and soft natural textures to enrich tactile confidence as motor control grows."
      ],
      mustHave: products[2] || products[0]
    },
    toddler: {
      title: "Active Exploring & Independence",
      ageRange: "9 - 24 Months",
      progress: 90,
      milestoneTitle: "Active Social & Motor Play",
      tips: [
        "Select FSC-certified organic wood blocks to nourish spatial reasoning and healthy grasping skills.",
        "Settle post-bath high-thermal losses using high-weight spun organic cotton hooded bathrobes.",
        "Support self-feeding using biodegradable organic bamboo plates to fully avoid microplastic shedding."
      ],
      mustHave: products[4] || products[products.length - 1]
    }
  };

  const selectedTips = MILESTONE_TIPS[babyStage];

  // Helper to generate initials for avatar
  const getInitials = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'P';
  };

  // Simulated carrier logs for selected tracking ID
  const getCarrierLogs = (orderId: string) => {
    if (orderId === 'ORD-2026-9481') {
      return [
        { time: 'Today, 07:12 AM', location: 'Portland Depot, OR', msg: 'Departed sorting facility in low-emission hybrid fleet.' },
        { time: 'Yesterday, 04:30 PM', location: 'Eugene Green Hub, OR', msg: 'Arrived at carbon-neutral transit center.' },
        { time: 'July 11, 09:15 AM', location: 'Portland Assembly, OR', msg: 'Package prepared using recycled crinkle card and water-activated tape.' },
        { time: 'July 10, 02:00 PM', location: 'PureNest Warehouse, OR', msg: 'Order secured and GOTS certified organic seals verified.' }
      ];
    } else {
      return [
        { time: 'June 18, 10:24 AM', location: 'Delivered Residence', msg: 'Placed carefully inside biodegradable package shelter.' },
        { time: 'June 17, 03:12 PM', location: 'Eugene Transit Yard', msg: 'Sorted for final zero-emission residential route.' },
        { time: 'June 15, 11:00 AM', location: 'PureNest Warehouse', msg: 'Dispatched with certified climate offset credits.' }
      ];
    }
  };

  return (
    <div className="bg-[#FAF9F6] border border-[#e9e3db] rounded-3xl p-4 md:p-8 shadow-xs animate-fade-in text-[#323631]" id="customer-dashboard-container">
      
      {/* Upper Status Bar & Member Badges */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-6 border-b border-[#e9e3db]/80 mb-8">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#5c6a5a]/10 text-[#5c6a5a] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#5c6a5a]/15 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Parent Nest Member
            </span>
            <span className="bg-[#bf826b]/10 text-[#bf826b] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 border border-[#bf826b]/15 animate-pulse">
              <Award className="h-3.5 w-3.5 fill-[#bf826b]/10" />
              Nesting Green Gold Status
            </span>
          </div>
          
          <div>
            <h2 className="font-sans font-medium text-3xl text-[#323631] tracking-tight">
              Welcome to Your Nest, <span className="font-semibold text-[#5c6a5a]">{loggedInUser}</span>
            </h2>
            <p className="text-xs text-[#848c82] mt-1 max-w-xl leading-relaxed">
              Managing your developmental milestone roadmap, ecological impact metrics, and active organic order deliveries from one single dashboard.
            </p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 w-full xl:w-auto" id="dashboard-subtabs">
          {[
            { id: 'overview', label: '🌱 Nesting Hub', icon: Sprout },
            { id: 'orders', label: '📦 Orders & Shipping', icon: ShoppingBag },
            { id: 'wishlist', label: '❤️ Saved Wishlist', icon: Heart },
            { id: 'profile', label: '👤 Baby Identity', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setExpandedGPSOrderId(null);
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#5c6a5a] text-white shadow-md shadow-[#5c6a5a]/10 border border-[#5c6a5a]'
                    : 'bg-white text-[#6d756b] border border-[#e9e3db] hover:border-[#6d756b] hover:bg-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Switcher */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="subtab-overview">
          
          {/* Left Block: Milestones & Rewards */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STUNNING HIGH-END MEMBERSHIP & REWARDS PASSPORT CARD */}
            <div className="bg-gradient-to-br from-[#4c574b] via-[#5c6a5a] to-[#71826f] text-white rounded-3xl p-6 relative overflow-hidden shadow-lg border border-[#e9e3db]/20">
              {/* Decorative graphic patterns */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none border border-white/10" />
              <div className="absolute bottom-0 right-1/3 w-32 h-32 bg-[#bf826b]/10 rounded-full translate-y-12 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#bf826b] text-[#FAF9F6] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-2xs">
                      ECO-MEMBERSHIP REWARDS
                    </span>
                    <span className="text-white/80 text-[10px] font-mono tracking-wider">MEMBER ID: #G-2026</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-[#FAF9F6] flex items-center gap-2">
                    {points} <span className="text-[#e2e8e0] text-sm font-medium">Accumulated Nesting Points</span>
                  </h3>
                  
                  <p className="text-xs text-[#d2dad0] max-w-lg leading-relaxed">
                    You earn points for choosing zero-plastic compostable packaging and carbon-neutral shipping methods. Spend them on future newborn swaddles!
                  </p>
                </div>

                <div className="relative shrink-0 w-full md:w-auto">
                  <button
                    onClick={handleClaimPoints}
                    disabled={dailyClaimed}
                    className={`w-full md:w-auto px-5 py-3.5 rounded-xl text-xs font-bold transition-all relative overflow-hidden ${
                      dailyClaimed 
                        ? 'bg-white/10 text-white/50 cursor-not-allowed border border-white/5'
                        : 'bg-[#bf826b] hover:bg-[#a9705a] text-white cursor-pointer shadow-md shadow-[#bf826b]/20 hover:scale-[1.02]'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {dailyClaimed ? '✓ Daily Bonus Secured' : '☘ Claim Daily Green Point (+25)'}
                    </span>
                    
                    {/* Tiny visual pulse for claiming */}
                    {!dailyClaimed && (
                      <span className="absolute inset-0 bg-white/20 transform -translate-x-full hover:animate-shimmer" />
                    )}
                  </button>

                  {/* Confetti-style custom popover on points claimed */}
                  {showClaimAnimation && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#faf8f5] text-[#5c6a5a] border border-[#5c6a5a] py-2 px-4 rounded-xl font-extrabold text-xs whitespace-nowrap animate-bounce shadow-lg flex items-center gap-1.5 z-20">
                      <Sparkles className="h-4 w-4 text-[#bf826b] fill-[#bf826b]" />
                      <span>+25 Points Secured!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar to next level */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-[#cfd9ce]">
                <div className="w-full sm:max-w-xs space-y-1">
                  <div className="flex justify-between font-mono font-bold">
                    <span>LEVEL 2 ROADMAP</span>
                    <span>{points}/500 PTS</span>
                  </div>
                  <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#bf826b] h-full rounded-full transition-all duration-1000" style={{ width: `${(points / 500) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
                  <BadgePercent className="h-4 w-4 text-[#bf826b]" />
                  <span>Next Reward: Free Bamboo Tableware ($34 Value)</span>
                </div>
              </div>
            </div>

            {/* HIGH-END DEVELOPMENTAL MILESTONE TOOLKIT */}
            <div className="bg-white border border-[#e9e3db] rounded-3xl p-6 md:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#e9e3db]/60 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[#bf826b]">
                    <Compass className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Pediatrician-Guided Milestones</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#323631]">Developmental Nesting Timeline</h3>
                </div>
                
                {/* Custom Selective dropdown style */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6d756b] font-medium shrink-0">Selected Baby Stage:</span>
                  <select
                    value={babyStage}
                    onChange={(e) => setBabyStage(e.target.value as any)}
                    className="bg-[#faf8f5] border border-[#e9e3db] text-xs font-semibold rounded-xl px-3 py-2.5 text-[#323631] focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] cursor-pointer hover:border-[#6d756b] transition-all"
                  >
                    <option value="expecting">🤰 Pregnancy & Nesting Prep</option>
                    <option value="newborn">💤 Newborn (0-3 Months)</option>
                    <option value="infant">🧸 Infant (3-9 Months)</option>
                    <option value="toddler">🍎 Toddler (9-24 Months)</option>
                  </select>
                </div>
              </div>

              {/* Progress Indicator and Roadmap Timeline Header */}
              <div className="bg-[#faf8f5] border border-[#e9e3db]/60 rounded-2xl p-5 space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5c6a5a]" />
                    <span className="font-bold text-[#323631]">{selectedTips.milestoneTitle}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#6d756b] font-bold">{selectedTips.progress}% Progress</span>
                </div>
                
                <div className="w-full bg-[#e9e3db]/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#5c6a5a] to-[#bf826b] h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${selectedTips.progress}%` }} 
                  />
                </div>
              </div>

              {/* Tips layout with elegant spotlight design */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* List of Tips (8 columns) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-[#bf826b]/5 px-3 py-1.5 rounded-lg border border-[#bf826b]/10">
                    <Sparkles className="h-3.5 w-3.5 text-[#bf826b]" />
                    <span className="text-[10px] font-bold text-[#bf826b] uppercase tracking-wider">
                      {selectedTips.title} ({selectedTips.ageRange}) Guidelines
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedTips.tips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3 bg-white border border-[#e9e3db]/30 p-3.5 rounded-xl hover:border-[#6d756b]/40 transition-all shadow-2xs">
                        <div className="w-5 h-5 rounded-full bg-[#5c6a5a]/10 flex items-center justify-center text-[10px] font-extrabold text-[#5c6a5a] shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-[#6d756b] leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highly recommended item matching (5 columns) */}
                {selectedTips.mustHave && (
                  <div className="md:col-span-5 bg-[#FAF9F6] border border-[#e9e3db] rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#e9e3db]/40 mb-3.5">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#848c82]">Stage Match SKU</span>
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Ped approved</span>
                      </div>
                      
                      <div className="flex gap-3.5">
                        <img 
                          src={selectedTips.mustHave.image} 
                          alt={selectedTips.mustHave.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-[#e9e3db] bg-white shadow-2xs"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#323631] truncate">{selectedTips.mustHave.name}</h4>
                          <p className="text-[10px] text-[#848c82] uppercase font-semibold tracking-wider">{selectedTips.mustHave.category}</p>
                          <span className="text-xs font-bold text-[#5c6a5a] block">${selectedTips.mustHave.price.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Small checklist of materials */}
                      <div className="mt-4 pt-3 border-t border-[#e9e3db]/40 space-y-1.5 text-[9px] text-[#6d756b] font-semibold">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>100% Organic Materials GOTS Certified</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Carbon-Neutral Sourcing Pipeline</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(selectedTips.mustHave, 1);
                        alert(`Successfully added ${selectedTips.mustHave.name} into your active shopping basket!`);
                      }}
                      className="w-full mt-5 bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:scale-[1.01]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Stage Match to Basket</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Right Column: Monogram Avatar & Eco Impact Meter */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* STUNNING ECO-PARENT PROFILE BADGE & MONOGRAM */}
            <div className="bg-white border border-[#e9e3db] rounded-3xl p-6 text-center space-y-4">
              <div className="relative inline-block">
                {/* Monogram circle with organic green gradient */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#5c6a5a] to-[#7c8f79] flex items-center justify-center text-2xl font-bold text-white shadow-md mx-auto border-4 border-[#FAF9F6]">
                  {getInitials(loggedInUser)}
                </div>
                {/* Star overlay */}
                <span className="absolute bottom-0 right-1 bg-[#bf826b] text-white p-1 rounded-full shadow-md border-2 border-white">
                  <Award className="h-3.5 w-3.5 fill-current" />
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-[#323631]">{loggedInUser}</h4>
                <p className="text-[10px] font-bold text-[#bf826b] uppercase tracking-widest">Nesting Green Gold Member</p>
              </div>

              {/* Identity details list */}
              <div className="space-y-3 pt-3 border-t border-[#f5f1ea] text-left text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#848c82] font-semibold text-[10px] uppercase">Registered Baby</span>
                  <span className="font-bold text-[#323631]">{babyName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#848c82] font-semibold text-[10px] uppercase">Est. Delivery Date</span>
                  <span className="font-bold text-[#323631] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#bf826b]" />
                    {dueDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#848c82] font-semibold text-[10px] uppercase">Nursery Motif</span>
                  <span className="font-bold text-[#5c6a5a]">🎨 {nurseryTheme}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveSubTab('profile')}
                className="w-full bg-[#FAF9F6] border border-[#e9e3db] text-[#5c6a5a] hover:text-[#323631] hover:border-[#6d756b] text-xs font-bold py-3 rounded-xl transition-all text-center cursor-pointer block"
              >
                Configure Nesting Settings
              </button>
            </div>

            {/* UPGRADED SUSTAINABLE IMPACT STATS WITH ILLUSTRATION */}
            <div className="bg-gradient-to-br from-[#5c6a5a] to-[#3f4a3d] text-white rounded-3xl p-6 space-y-4 shadow-md relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/5 rounded-full pointer-events-none border border-white/5" />
              
              <div className="flex items-center gap-2 text-green-200">
                <Sprout className="h-4 w-4 fill-current animate-bounce" />
                <span className="text-[9px] font-bold uppercase tracking-widest">ECO-SYSTEM IMPACT LOG</span>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] text-green-200/80 font-bold uppercase block">Pesticide Mitigation</span>
                <h4 className="text-2xl font-bold tracking-tight text-white leading-tight">
                  Saved 14.5 kg of Toxic Agriculture Runoff
                </h4>
              </div>

              {/* Dynamic little micro impact graphs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                  <span className="text-[9px] text-green-100 font-bold block uppercase">CLEAN WATER</span>
                  <span className="text-sm font-bold block">1,820 Liters</span>
                  <span className="text-[8px] text-green-200/80 block">Runoff prevented</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                  <span className="text-[9px] text-green-100 font-bold block uppercase">SOIL SECURITY</span>
                  <span className="text-sm font-bold block">145 Sq Ft</span>
                  <span className="text-[8px] text-green-200/80 block">Certified toxic free</span>
                </div>
              </div>

              <p className="text-[10px] text-green-100/90 leading-relaxed">
                By choosing GOTS certified cotton blankets and sustainable organic wood products, you are directly funding natural cotton farming communities and protecting fragile biodiversity.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Grid Content: Orders and Shipping Panel */}
      {activeSubTab === 'orders' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="subtab-orders">
          
          {/* Left Block: List of Orders (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sans font-bold text-base text-[#323631]">Your Order Directory</h3>
            
            <div className="space-y-3">
              {orders.map(order => {
                const isSelected = selectedOrderId === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setExpandedGPSOrderId(null);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative text-xs ${
                      isSelected
                        ? 'bg-white border-[#5c6a5a] shadow-md ring-1 ring-[#5c6a5a]/20'
                        : 'bg-white/60 border-[#e9e3db] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#323631] block">{order.id}</span>
                        <p className="text-[10px] text-[#848c82] mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Ordered on {order.date}
                        </p>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f5f1ea] space-y-2">
                      <div className="flex items-center gap-1 text-[10px] text-[#848c82] font-semibold">
                        <ShoppingBag className="h-3.5 w-3.5 text-[#5c6a5a]" />
                        <span>PURCHASED SKUS:</span>
                      </div>
                      <p className="font-medium text-[#323631] truncate pl-1">
                        {order.items.map(item => `${item.quantity}x ${item.product.name}`).join(', ')}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f5f1ea]/80 flex justify-between items-center text-[10px]">
                      <span className="text-[#848c82] font-semibold">TOTAL SECURED:</span>
                      <span className="font-bold text-[#323631] text-xs">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Selected Tracker / Timeline Detail (7 columns) */}
          <div className="lg:col-span-7">
            {selectedOrderId ? (() => {
              const order = orders.find(o => o.id === selectedOrderId);
              if (!order) return null;

              return (
                <div className="bg-white border border-[#e9e3db] rounded-3xl p-6 md:p-8 space-y-6">
                  
                  {/* Detailed Specs Banner */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#e9e3db]/60 pb-5">
                    <div>
                      <div className="inline-flex items-center gap-1 text-[#bf826b] mb-1.5">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="text-[9px] uppercase tracking-wider font-bold">DISPATCH TIMELINE SPECIFICATION</span>
                      </div>
                      <h3 className="font-mono text-lg font-bold text-[#323631]">{order.id}</h3>
                    </div>
                    
                    <div className="text-xs sm:text-right">
                      <span className="text-[#848c82] block text-[10px]">Carrier Link ID (FedEx):</span>
                      <span className="font-mono font-bold text-[#5c6a5a] text-sm block mt-0.5">{order.trackingNumber}</span>
                    </div>
                  </div>

                  {/* Order Items Recap */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-[#323631] uppercase tracking-wider">SKU Summary Details</h4>
                    <div className="divide-y divide-[#f5f1ea] border border-[#e9e3db]/40 rounded-2xl px-4 py-1.5 bg-[#FAF9F6]">
                      {order.items.map((item, index) => (
                        <div key={index} className="py-3 flex justify-between items-center text-xs">
                          <div className="flex gap-3 items-center min-w-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-10 h-10 rounded-lg object-cover border border-[#e9e3db]"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-[#323631] truncate">{item.product.name}</p>
                              <div className="flex gap-2 text-[9px] text-[#848c82] mt-0.5 font-bold uppercase">
                                {item.color && <span>COLOR: {item.color}</span>}
                                {item.size && <span>SIZE: {item.size}</span>}
                              </div>
                            </div>
                          </div>
                          <span className="font-bold text-[#6d756b] shrink-0 ml-4">{item.quantity}x • ${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Timeline Map steps */}
                  {order.status !== 'Cancelled' ? (
                    <div className="bg-[#faf8f5] border border-[#e9e3db]/60 rounded-2xl p-6 space-y-6">
                      <div className="text-center space-y-1">
                        <span className="text-[9px] uppercase font-bold text-[#bf826b] tracking-wider">Zero Carbon Delivery</span>
                        <h4 className="text-xs font-bold text-[#323631] uppercase tracking-wider">Transit Progress Status</h4>
                      </div>
                      
                      <div className="relative flex justify-between items-center max-w-md mx-auto">
                        <div className="absolute left-0 right-0 top-[15px] -translate-y-1/2 h-1 bg-[#e9e3db] z-0" />
                        
                        {/* Progress line */}
                        <div 
                          className="absolute left-0 top-[15px] -translate-y-1/2 h-1 bg-[#5c6a5a] z-0 transition-all duration-1000"
                          style={{ width: `${((order.deliveryStep - 1) / 3) * 100}%` }}
                        />

                        {/* Milestones steps */}
                        {[
                          { label: 'Ordered', step: 1 },
                          { label: 'Ready', step: 2 },
                          { label: 'Shipped', step: 3 },
                          { label: 'Delivered', step: 4 }
                        ].map(st => {
                          const active = order.deliveryStep >= st.step;
                          const current = order.deliveryStep === st.step;
                          return (
                            <div key={st.step} className="flex flex-col items-center relative z-10">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                                current 
                                  ? 'bg-[#5c6a5a] text-white border-[#5c6a5a] scale-110 shadow-md shadow-[#5c6a5a]/20 animate-pulse' 
                                  : active 
                                    ? 'bg-[#5c6a5a] text-white border-[#5c6a5a]' 
                                    : 'bg-white text-gray-400 border-gray-200'
                              }`}>
                                {active ? '✓' : st.step}
                              </div>
                              <span className={`text-[9px] font-bold mt-2.5 uppercase tracking-wide ${active ? 'text-[#323631]' : 'text-gray-400'}`}>
                                {st.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center text-xs text-red-800 flex flex-col items-center gap-2">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                      <div>
                        <p className="font-bold">This organic order was cancelled</p>
                        <p className="text-[11px] text-red-600 mt-1">Refund processed on June 22. Your credits will appear in 3 business days.</p>
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC CARRIER TERMINAL DETAILS PANEL */}
                  {expandedGPSOrderId === order.id && (
                    <div className="bg-black/95 text-[#a8bba5] p-5 rounded-2xl font-mono text-[11px] leading-relaxed space-y-3 shadow-inner max-h-48 overflow-y-auto border border-gray-800">
                      <div className="flex justify-between items-center text-gray-400 border-b border-gray-800 pb-2">
                        <span>🛰️ CARRIER GPS LIVE TELEMETRY</span>
                        <span className="text-green-400 animate-pulse">● FEED ONLINE</span>
                      </div>
                      <div className="space-y-2">
                        {getCarrierLogs(order.id).map((log, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-gray-500 shrink-0">[{log.time}]</span>
                            <span className="text-gray-300 font-bold">({log.location})</span>
                            <span className="text-gray-400">{log.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions footer row */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#f5f1ea]">
                    {order.status === 'Processing' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Cancel Dispatch Request
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button
                        onClick={() => handleReturnRequest(order.id)}
                        className="bg-white hover:bg-[#faf8f5] text-[#5c6a5a] border border-[#e9e3db] text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Generate Return Invoice Label
                      </button>
                    )}
                    
                    <button
                      onClick={() => setExpandedGPSOrderId(prev => prev === order.id ? null : order.id)}
                      className={`text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2 ${
                        expandedGPSOrderId === order.id
                          ? 'bg-[#bf826b] text-white hover:bg-[#a56a53]'
                          : 'bg-[#5c6a5a] text-white hover:bg-[#4d594b]'
                      }`}
                    >
                      <Map className="h-4 w-4" />
                      <span>{expandedGPSOrderId === order.id ? 'Hide Logistics Console' : 'Toggle Live GPS Logs'}</span>
                    </button>
                  </div>

                </div>
              );
            })() : (
              <div className="bg-white border border-dashed border-[#e9e3db] rounded-3xl p-12 text-center text-xs text-[#848c82]">
                Please select an active order from the left directory column to view shipment logs.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid Content: Wishlist Panel */}
      {activeSubTab === 'wishlist' && (
        <div className="space-y-6" id="subtab-wishlist">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#e9e3db]/60 pb-5">
            <div>
              <h3 className="font-sans font-bold text-lg text-[#323631]">Your Saved Organic Wishlist</h3>
              <p className="text-xs text-[#848c82]">Keep tabs on chemical-free baby clothes, developmental play, and wooden items.</p>
            </div>
            <span className="bg-[#bf826b]/10 text-[#bf826b] font-bold text-xs px-4 py-2 rounded-full border border-[#bf826b]/15 self-start sm:self-auto">
              {wishlistedProducts.length} Saved Essentials
            </span>
          </div>

          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-dashed border-[#e9e3db] rounded-3xl p-8 max-w-xl mx-auto" id="empty-dashboard-wishlist">
              <div className="w-16 h-16 bg-[#faf8f5] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e9e3db]">
                <Heart className="h-6 w-6 text-gray-300" />
              </div>
              <h4 className="text-sm font-bold text-[#323631]">Your organic wishlist is empty</h4>
              <p className="text-[11px] text-[#848c82] mt-2 max-w-xs mx-auto leading-relaxed">
                Explore our curated pure baby catalog, click the heart badge on any card, and your choices will appear here instantly!
              </p>
              <button
                onClick={onNavigateToShop}
                className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-bold px-6 py-3 rounded-xl mt-6 transition-all cursor-pointer shadow-2xs"
              >
                Go Browse Storefront
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="dashboard-wishlist-grid">
              {wishlistedProducts.map(prod => (
                <div key={prod.id} className="bg-white border border-[#e9e3db] rounded-2xl p-4.5 flex flex-col justify-between hover:shadow-md transition-all group">
                  <div className="flex gap-4">
                    <div className="relative overflow-hidden rounded-xl shrink-0">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-20 h-20 object-cover border border-[#f5f1ea] bg-[#faf8f5] group-hover:scale-105 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-xs text-[#323631] truncate group-hover:text-[#5c6a5a] transition-all leading-tight">{prod.name}</h4>
                        <button
                          onClick={() => onToggleWishlist(prod)}
                          className="p-1 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="text-[9px] text-[#848c82] uppercase font-bold tracking-wider">{prod.category}</p>
                      
                      <div className="flex items-baseline gap-1.5 pt-1">
                        <span className="text-xs font-bold text-[#323631]">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && (
                          <span className="text-[9px] text-gray-400 line-through">${prod.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features taglets */}
                  <div className="my-3 flex flex-wrap gap-1.5 text-[8px] font-bold text-[#6d756b]">
                    <span className="bg-[#5c6a5a]/5 px-2 py-0.5 rounded-full border border-[#5c6a5a]/10">Organic</span>
                    <span className="bg-[#bf826b]/5 px-2 py-0.5 rounded-full border border-[#bf826b]/10">Non-toxic</span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(prod, 1);
                      alert(`Successfully added ${prod.name} into your active shopping basket!`);
                    }}
                    className="w-full bg-[#5c6a5a]/10 hover:bg-[#5c6a5a] text-[#5c6a5a] hover:text-white text-xs font-bold py-2 rounded-xl transition-all cursor-pointer text-center"
                  >
                    Quick Add to Basket
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grid Content: Profile Identity Settings */}
      {activeSubTab === 'profile' && (
        <div className="bg-white border border-[#e9e3db] rounded-3xl p-6 md:p-8 max-w-2xl mx-auto" id="subtab-profile">
          <div className="border-b border-[#e9e3db]/60 pb-5 mb-6 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#bf826b]">
              <User className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Nesting Configuration Registry</span>
            </div>
            <h3 className="font-sans font-bold text-lg text-[#323631]">Modify Baby Milestone Profile</h3>
            <p className="text-xs text-[#848c82]">
              Customize timelines, name registries, and design aesthetics. This automatically tailors organic product suggestions and eco rewards milestones.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5 text-xs text-[#323631]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block font-bold uppercase tracking-wider text-[#848c82] text-[9px]">
                  Baby Full Name or Moniker
                </label>
                <input
                  type="text"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  className="w-full p-3.5 bg-[#faf8f5] border border-[#e9e3db] rounded-xl font-medium focus:ring-1 focus:ring-[#5c6a5a] focus:outline-hidden hover:border-[#6d756b] transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold uppercase tracking-wider text-[#848c82] text-[9px]">
                  Estimated Delivery / Birthdate
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-3.5 bg-[#faf8f5] border border-[#e9e3db] rounded-xl font-medium focus:ring-1 focus:ring-[#5c6a5a] focus:outline-hidden hover:border-[#6d756b] transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block font-bold uppercase tracking-wider text-[#848c82] text-[9px]">
                  Nesting Milestone Stage
                </label>
                <select
                  value={babyStage}
                  onChange={(e) => setBabyStage(e.target.value as any)}
                  className="w-full p-3.5 bg-[#faf8f5] border border-[#e9e3db] rounded-xl font-bold text-[#323631] cursor-pointer hover:border-[#6d756b] transition-all"
                >
                  <option value="expecting">Pregnancy / Nesting Prep</option>
                  <option value="newborn">Newborn (0 - 3 months)</option>
                  <option value="infant">Infant (3 - 9 months)</option>
                  <option value="toddler">Toddler (9 - 24 months)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold uppercase tracking-wider text-[#848c82] text-[9px]">
                  Desired Nursery Color Theme
                </label>
                <input
                  type="text"
                  value={nurseryTheme}
                  onChange={(e) => setNurseryTheme(e.target.value)}
                  placeholder="e.g. Earthy Sage Green, Mustard Ochre, Oatmeal"
                  className="w-full p-3.5 bg-[#faf8f5] border border-[#e9e3db] rounded-xl font-medium focus:ring-1 focus:ring-[#5c6a5a] focus:outline-hidden hover:border-[#6d756b] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold uppercase tracking-wider text-[#848c82] text-[9px]">
                Ship-To Registry Shipping Terminal
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3.5 h-4 w-4 text-[#bf826b]" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 p-3.5 bg-[#faf8f5] border border-[#e9e3db] rounded-xl font-medium focus:ring-1 focus:ring-[#5c6a5a] focus:outline-hidden hover:border-[#6d756b] transition-all"
                  required
                />
              </div>
            </div>

            {isSavedMsg && (
              <div className="bg-[#eef3ee] text-[#5c6a5a] border border-[#5c6a5a]/20 p-4 rounded-xl font-bold text-center flex items-center justify-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                <span>✓ Profile settings preserved. Nest roadmap recalculated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
            >
              Update Nest Configurations
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
