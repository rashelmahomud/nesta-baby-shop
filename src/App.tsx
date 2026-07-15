import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Baby, 
  HelpCircle, 
  Send, 
  CheckCircle, 
  Award, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Lock,
  Menu,
  Star,
  Sprout,
  Gift
} from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS, HERO_IMAGE_PATH } from './data';
import Header from './components/Header';
import TrustBadges from './components/TrustBadges';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import RegistryBuilder from './components/RegistryBuilder';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import LoginModal from './components/LoginModal';

export default function App() {
  // State variables
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showRegistryBuilder, setShowRegistryBuilder] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  // User auth sandbox state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loggedInBaby, setLoggedInBaby] = useState<string | null>(null);

  // Newsletter sandbox state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // FAQ collapse state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll references
  const homeRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Synchronize current highlighted nav tab with scroll position
  useEffect(() => {
    if (showRegistryBuilder) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero-banner-section') {
            setActiveTab('home');
          } else if (id === 'products-catalog') {
            setActiveTab('shop');
          } else if (id === 'pediatrician-qa-section') {
            setActiveTab('about');
          } else if (id === 'newsletter-section') {
            setActiveTab('contact');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const elements = [
      document.getElementById('hero-banner-section'),
      document.getElementById('products-catalog'),
      document.getElementById('pediatrician-qa-section'),
      document.getElementById('newsletter-section'),
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [showRegistryBuilder]);

  const onScrollToSection = (section: 'home' | 'shop' | 'about' | 'contact') => {
    setActiveTab(section);
    setShowRegistryBuilder(false);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'shop') {
      setTimeout(() => {
        productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (section === 'about') {
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (section === 'contact') {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const scrollToProducts = () => {
    onScrollToSection('shop');
  };

  // Cart Management Methods
  const handleAddToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart((prevCart) => {
      // Find matching item by ID, color, and size
      const existingIdx = prevCart.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedColor === color && 
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number, color?: string, size?: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (
          item.product.id === productId && 
          item.selectedColor === color && 
          item.selectedSize === size
        ) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, color?: string, size?: string) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (item) => 
          !(item.product.id === productId && 
            item.selectedColor === color && 
            item.selectedSize === size)
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddRegistryToCart = (itemsList: { product: Product; quantity: number }[]) => {
    itemsList.forEach(({ product, quantity }) => {
      // Default color/size
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : undefined;
      const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
      handleAddToCart(product, quantity, defaultColor, defaultSize);
    });
    setIsCartOpen(true);
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  // Filtered and Sorted Products
  const getFilteredProducts = () => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'top-rated') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  };

  const filteredProducts = getFilteredProducts();

  // FAQs List for Board Approved Q&A
  const FAQS = [
    {
      question: "What exactly makes clothing 'GOTS Certified Organic'?",
      answer: "The Global Organic Textile Standard (GOTS) is the ultimate benchmark. It guarantees that the cotton is grown without toxic pesticides or genetically modified seeds, and that the entire manufacturing pipeline uses zero hazardous dyes, respects water processing conservation laws, and enforces fair trade social working standards."
    },
    {
      question: "Are your baby carriers certified for infant hip health?",
      answer: "Yes, absolutely. Our Nesta carriers are officially tested and certified as 'Hip Healthy' by the International Hip Dysplasia Institute. They support the crucial 'M-shape' posture, which positions the baby's knees higher than their hips, preventing joint displacement and promoting optimal orthopedic development."
    },
    {
      question: "How do your toys comply with safety and chewing standards?",
      answer: "Our developmental blocks and teething toys are crafted of 100% pure, medical-grade food silicone or FSC-certified hardwoods sealed with organic vegetable finishes. They carry rigorous ASTM F963 (U.S.) and EN71 (Europe) toy safety approvals, guaranteeing zero lead, phthalate, or microplastic release during oral teething exploration."
    },
    {
      question: "Why does organic bamboo fabric feel so soft compared to regular cotton?",
      answer: "Bamboo fiber features naturally rounded microstructures that produce incredibly smooth, friction-free yarn. It is inherently hypoallergenic, temperature-regulating, and can absorb up to three times its weight in water, which makes it ideal for diaper-rash sensitive infants."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#323631] font-sans antialiased" id="main-app-container">
      {/* Top Header */}
      <Header 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={onScrollToSection}
        onOpenRegistry={() => {
          setShowRegistryBuilder(true);
          setActiveTab('registry');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loggedInUser={loggedInUser}
        loggedInBaby={loggedInBaby}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => {
          setLoggedInUser(null);
          setLoggedInBaby(null);
        }}
      />

      {/* Main Body Switcher */}
      {showRegistryBuilder ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="registry-builder-view">
          <RegistryBuilder 
            onAddRegistryToCart={handleAddRegistryToCart}
            onClose={() => {
              setShowRegistryBuilder(false);
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      ) : (
        <main id="main-shop-content">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#faf8f5] to-[#f4f0e8] pt-8 pb-16 lg:py-20 border-b border-[#e9e3db]/50" id="hero-banner-section" ref={homeRef}>
            {/* Soft Ambient Glows */}
            <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#bf826b]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#5c6a5a]/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" id="hero-grid-container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                
                {/* Left Typography & CTAs Column */}
                <div className="lg:col-span-7 space-y-6 text-left" id="hero-typography-column">
                  
                  {/* Premium Quality Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#5c6a5a]/8 backdrop-blur-md border border-[#5c6a5a]/15 rounded-full px-4 py-1.5 shadow-2xs">
                    <Award className="h-4 w-4 text-[#5c6a5a]" />
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#4d594b] flex items-center gap-1.5">
                      Pediatrician Evaluated <span className="text-[#bf826b]">•</span> GOTS Organic Traced
                    </span>
                  </div>

                  {/* High-Impact Editorial Heading */}
                  <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#323631] tracking-tight leading-[1.08]">
                    Consciously Crafted <br className="hidden sm:inline" />
                    for <span className="font-serif italic font-light text-[#bf826b]">precious</span> beginnings.
                  </h1>
                  
                  {/* Premium descriptive subtext */}
                  <p className="text-sm sm:text-base text-[#6d756b] max-w-2xl leading-relaxed font-sans">
                    Welcome to Nesta. We partner with pediatricians and organic textile artisans to curate the safest, chemical-free nursery essentials. Every thread is 100% GOTS certified cotton, and every wood accessory is hand-finished with safe natural beeswax.
                  </p>

                  {/* Core Trust Milestones row */}
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#e9e3db]/60 max-w-lg">
                    <div className="space-y-1">
                      <span className="block font-display font-bold text-lg sm:text-xl text-[#323631]">100%</span>
                      <span className="block text-[10px] font-bold text-[#848c82] uppercase tracking-wider">Hypoallergenic</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-display font-bold text-lg sm:text-xl text-[#323631]">Zero</span>
                      <span className="block text-[10px] font-bold text-[#848c82] uppercase tracking-wider">Toxic Finishes</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-display font-bold text-lg sm:text-xl text-[#323631]">365 Days</span>
                      <span className="block text-[10px] font-bold text-[#848c82] uppercase tracking-wider">Risk-Free Trial</span>
                    </div>
                  </div>

                  {/* Elegant Call to Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4" id="hero-cta-buttons">
                    <button
                      onClick={scrollToProducts}
                      className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-bold uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all duration-300 ease-out cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center focus:outline-hidden"
                      id="hero-shop-btn"
                    >
                      Shop Safe Essentials
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowRegistryBuilder(true);
                        setActiveTab('registry');
                      }}
                      className="bg-white hover:bg-[#faf8f5] text-[#5c6a5a] border border-[#e9e3db] text-xs font-bold uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all duration-300 ease-out cursor-pointer flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 focus:outline-hidden"
                      id="hero-registry-btn"
                    >
                      <Gift className="h-4 w-4 text-[#bf826b]" />
                      <span>Interactive Registry</span>
                    </button>
                  </div>
                </div>

                {/* Right Layered Image Canvas Column */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end" id="hero-image-column">
                  
                  {/* Multi-layered border wrapper */}
                  <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3rem] p-3 bg-white border border-[#e9e3db]/60 shadow-[0_15px_40px_rgba(92,106,90,0.1)]">
                    <div className="absolute inset-0 rounded-[3rem] border-2 border-dashed border-[#e4ded5] m-2 pointer-events-none" />
                    
                    {/* Primary Image Container */}
                    <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative bg-[#faf8f5]">
                      <img 
                        src={HERO_IMAGE_PATH} 
                        alt="Pure Organic Baby Nursery Decor" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Artistic overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Floating Certification Glass Badge */}
                    <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md border border-[#e9e3db]/80 rounded-2xl p-3 shadow-lg flex items-center gap-3 max-w-[200px] animate-bounce-slow">
                      <div className="w-9 h-9 rounded-xl bg-[#eef3ee] text-[#5c6a5a] flex items-center justify-center shrink-0">
                        <Sprout className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-[#848c82] uppercase tracking-wider">Fabric Safety</span>
                        <span className="block text-xs font-bold text-[#323631] leading-tight">100% GOTS Pure Cotton</span>
                      </div>
                    </div>

                    {/* Floating Doctor-Endorsed Glass Card */}
                    <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md border border-[#e9e3db]/80 rounded-2xl p-3.5 shadow-xl flex items-center gap-3.5 max-w-[210px]">
                      <div className="w-10 h-10 rounded-full bg-[#fdf5f2] text-[#bf826b] flex items-center justify-center shrink-0 border border-[#f9e5dd]">
                        <Heart className="h-5 w-5 fill-current" />
                      </div>
                      <div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#bf826b] text-[#bf826b]" />
                          ))}
                        </div>
                        <span className="block text-[10px] font-bold text-[#323631] mt-0.5 leading-tight">Pediatrician Checked</span>
                        <span className="block text-[8.5px] text-[#848c82] font-semibold uppercase tracking-wider mt-0.5">Every Material Inspected</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* Trust Badges Bar */}
          <TrustBadges />

          {/* Interactive Registry Quick Promo Banner */}
          <section className="bg-white py-12 border-b border-[#e9e3db]" id="registry-promo-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#f5f1ea] rounded-3xl p-6 md:p-10 border border-[#e9e3db] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="max-w-lg" id="registry-promo-text">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#bf826b] flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-[#bf826b]" />
                    Nesting Smart Registry
                  </span>
                  <h3 className="font-sans font-semibold text-xl md:text-2xl text-[#323631] mt-2 tracking-tight">
                    Unsure what your newborn needs?
                  </h3>
                  <p className="text-[#6d756b] text-xs md:text-sm mt-2 leading-relaxed">
                    Build a pediatric-approved baby registry checklist in under 2 minutes. Answer 3 quick milestones questions about your baby's stage and home style, and receive a secure organic starter package tailored by child care experts.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowRegistryBuilder(true);
                    setActiveTab('registry');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs md:text-sm font-bold px-6 py-4 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
                  id="start-registry-builder-btn"
                >
                  Launch Registry Builder — It's Free!
                </button>
              </div>
            </div>
          </section>

          {/* Product Storefront Catalog */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products-catalog" ref={productsSectionRef}>
            
            {/* Filter and Sort Headers */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-[#e9e3db] pb-6" id="catalog-controls">
              <div>
                <h2 className="font-sans font-semibold text-2xl text-[#323631] tracking-tight">Our Organic Nursery Collection</h2>
                <p className="text-[#848c82] text-xs mt-1">Consciously formulated products. Zero chemical treatments, pure biological origins.</p>
              </div>

              {/* Sort selector dropdown */}
              <div className="flex items-center gap-2 self-stretch md:self-auto" id="sort-filter-box">
                <span className="text-xs text-[#6d756b] font-medium shrink-0">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#e9e3db] text-xs font-semibold rounded-lg px-3 py-2 text-[#323631] focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] cursor-pointer w-full md:w-auto"
                >
                  <option value="popular">Most Popular</option>
                  <option value="top-rated">Top Parent Rated</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5 mb-8 overflow-x-auto pb-2" id="category-pills-row">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'sleep', label: '💤 Sleep & Swaddles' },
                { id: 'gear', label: '🎒 Ergonomic Gear' },
                { id: 'play', label: '🧸 Wooden Play' },
                { id: 'feeding', label: '🍎 Non-Toxic Feeding' },
                { id: 'apparel', label: '🌱 Soft Clothing' },
                { id: 'bath', label: '🛁 Bath & Towels' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                    selectedCategory === category.id
                      ? 'bg-[#5c6a5a] text-[#f7f5f0] border-[#5c6a5a] shadow-xs'
                      : 'bg-white text-[#6d756b] border-[#e9e3db] hover:border-[#6d756b]'
                  }`}
                  id={`cat-pill-${category.id}`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16" id="no-products-found">
                <p className="text-[#6d756b] font-semibold text-base">No items match this category.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs underline text-[#5c6a5a] font-bold mt-2 hover:text-black"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="products-catalog-grid">
                {filteredProducts.map((prod) => (
                  <ProductCard 
                    key={prod.id}
                    product={prod}
                    onViewDetails={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Expert Pediatrician Advisory Board Q&A */}
          <section className="bg-white py-16 border-t border-[#e9e3db]" id="pediatrician-qa-section" ref={aboutRef}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#bf826b] flex items-center justify-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-[#bf826b]" />
                  Medical Advisory Council
                </span>
                <h2 className="font-sans font-semibold text-2xl text-[#323631] mt-2 tracking-tight">
                  Expert Pediatric Guidance
                </h2>
                <p className="text-xs text-[#6d756b] mt-1.5">
                  We consult board-certified pediatricians and developmental psychologists on orthopedic posture safety, material toxicology, and child ergonomics.
                </p>
              </div>

              {/* Collapsible Accordion Q&A */}
              <div className="space-y-4" id="faq-accordion">
                {FAQS.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-[#e9e3db] rounded-2xl overflow-hidden bg-[#faf8f5]/50 hover:bg-[#faf8f5] transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full text-left p-5 flex justify-between items-center cursor-pointer"
                      id={`faq-btn-${index}`}
                    >
                      <span className="font-sans font-semibold text-xs md:text-sm text-[#323631] pr-4">
                        {faq.question}
                      </span>
                      <span className="text-[#5c6a5a] font-bold shrink-0">
                        {expandedFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#6d756b] leading-relaxed border-t border-[#f5f1ea] bg-white animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Banner: Our Materials commitment */}
          <section className="bg-[#faf8f5] py-16 border-t border-[#e9e3db]" id="material-commitment-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6" id="commitment-text-box">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5c6a5a]">The Nesta Material Pledge</span>
                  <h2 className="font-sans font-semibold text-3xl text-[#323631] tracking-tight leading-snug">
                    Pure Biological Raw Materials. Absolute Transparency.
                  </h2>
                  <p className="text-[#6d756b] text-sm leading-relaxed">
                    We hate greenwashing. That's why we publish our GOTS transactional certificates, OEKO-TEX safety numbers, and wood FSC origins transparently. Your nesting phase should be focused on counting finger milestones, not decoding confusing polymer labels.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="p-1 text-[#6c8e6a] font-bold shrink-0">✓</div>
                      <div>
                        <p className="text-xs font-bold text-[#323631]">Zero Flame Retardant Treatments</p>
                        <p className="text-[11px] text-[#6d756b] mt-0.5">We rely on premium, naturally flame-resistant fabrics instead of coating cotton in chemical brominated compounds.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-1 text-[#6c8e6a] font-bold shrink-0">✓</div>
                      <div>
                        <p className="text-xs font-bold text-[#323631]">Safe Water Dyes Only</p>
                        <p className="text-[11px] text-[#6d756b] mt-0.5">Dyed exclusively using low-impact, biodegradable pigments that preserve skin pH balances.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-1 text-[#6c8e6a] font-bold shrink-0">✓</div>
                      <div>
                        <p className="text-xs font-bold text-[#323631]">Food-Grade Finishes</p>
                        <p className="text-[11px] text-[#6d756b] mt-0.5">All wood toy structures are friction-sealed with solid beeswax or cold-pressed organic flax oil.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aesthetic commitments visual layout card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e9e3db] space-y-6" id="commitment-badge-visual">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#faf8f5] text-[#5c6a5a] rounded-xl border border-gray-100">
                      <Baby className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#323631]">Standard Certification Audits</p>
                      <p className="text-[10px] text-[#848c82]">Independent lab testing audited for Year 2026</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#faf8f5] rounded-2xl p-4 border border-[#e9e3db]/50">
                      <p className="text-xs font-bold text-[#323631]">Chemical Screen</p>
                      <p className="text-2xl font-semibold text-[#6c8e6a] mt-1">ND</p>
                      <span className="text-[9px] text-[#848c82] uppercase tracking-wide">None Detected (0.00%)</span>
                    </div>
                    <div className="bg-[#faf8f5] rounded-2xl p-4 border border-[#e9e3db]/50">
                      <p className="text-xs font-bold text-[#323631]">Cotton Origin</p>
                      <p className="text-2xl font-semibold text-[#5c6a5a] mt-1">GOTS</p>
                      <span className="text-[9px] text-[#848c82] uppercase tracking-wide">License #104529</span>
                    </div>
                  </div>

                  <div className="bg-[#fcfaf2] rounded-2xl p-4 border border-[#e9e3db] text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#bf826b]">365-Day Safe Sleep Guarantee</p>
                    <p className="text-xs text-[#6d756b] mt-1">
                      If you and your baby don't love our organic swaddles within 365 nights, return them washed or unwashed for a full refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="bg-white py-16 border-t border-[#e9e3db]" id="newsletter-section" ref={contactRef}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#bf826b]">Nesting Support & Guidance</span>
              <h2 className="font-sans font-semibold text-2xl text-[#323631] tracking-tight leading-snug">
                Join 50k+ Parents for Bi-Weekly Safety Advice
              </h2>
              <p className="text-[#6d756b] text-xs md:text-sm max-w-md mx-auto">
                No spam, no product dump. Just verified sleep science, pediatrician safety guidelines, and early developmental milestones checklists directly from certified health practitioners.
              </p>

              {newsletterSubscribed ? (
                <div className="bg-[#6c8e6a]/15 text-[#5c6a5a] rounded-2xl p-4 max-w-md mx-auto text-center border border-[#6c8e6a]/30 animate-scale-in">
                  <p className="font-sans font-bold text-sm">Welcome to the Nesting Circle!</p>
                  <p className="text-xs text-[#6d756b] mt-1">We've dispatched your introductory Organic Sleeping Milestones PDF booklet.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" id="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs rounded-xl border border-[#e9e3db] bg-[#faf8f5] text-[#323631] focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a]"
                  />
                  <button
                    type="submit"
                    className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                  >
                    Subscribe Free
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* Cart Slider Overlay Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Deep Detail Modal popup */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal Flow stepper */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onClearCart={handleClearCart}
      />

      {/* Parent Secure Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email, baby) => {
          setLoggedInUser(email);
          if (baby) setLoggedInBaby(baby);
        }}
      />

      {/* Footer */}
      <footer className="bg-[#faf8f5] py-12 border-t border-[#e9e3db]" id="store-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4" id="footer-brand-col">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#faf8f5] to-[#f0eae1] border-2 border-[#e4ded5] text-[#5c6a5a]">
                <Sprout className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-[#323631] tracking-tight leading-none flex items-center gap-0.5">
                  nesta
                  <span className="text-[#bf826b] font-serif font-light text-lg leading-none">.</span>
                </span>
                <span className="font-sans font-semibold tracking-[0.2em] text-[8px] uppercase text-[#848c82] mt-1 leading-none">
                  ORGANIC INFANT
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#6d756b] leading-relaxed">
              We design organic, pediatrician-endorsed infant and toddler essentials to make the early parenting journey safer and more comfortable.
            </p>
          </div>

          {/* Quick links Col */}
          <div className="space-y-3" id="footer-links-col">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#323631]">Nesting Help</h4>
            <ul className="space-y-2 text-xs text-[#6d756b]">
              <li><button onClick={() => { setShowRegistryBuilder(false); setActiveTab('shop'); scrollToProducts(); }} className="hover:text-[#5c6a5a] cursor-pointer">Shop Organic Collection</button></li>
              <li><button onClick={() => { setShowRegistryBuilder(true); setActiveTab('registry'); }} className="hover:text-[#5c6a5a] cursor-pointer">Interactive Registry Builder</button></li>
              <li><button onClick={() => setIsCartOpen(true)} className="hover:text-[#5c6a5a] cursor-pointer">Your Diaper Bag Basket</button></li>
            </ul>
          </div>

          {/* Policy Col */}
          <div className="space-y-3" id="footer-policy-col">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#323631]">Transparency</h4>
            <ul className="space-y-2 text-xs text-[#6d756b]">
              <li><span className="cursor-default">GOTS Audit #104529</span></li>
              <li><span className="cursor-default">OEKO-TEX Standard 100</span></li>
              <li><span className="cursor-default">365-Day Sleep Guarantee</span></li>
            </ul>
          </div>

          {/* Security Col */}
          <div className="space-y-3" id="footer-security-col">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#323631]">Trust & Security</h4>
            <div className="space-y-2 text-xs text-[#6d756b]">
              <p className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#6c8e6a]" />
                <span>256-Bit SSL Checkout</span>
              </p>
              <p className="text-[11px] text-gray-400">
                All mock payments and customer database registrations remain sandboxed inside the AI Studio environment for parent security.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[#f5f1ea] text-center flex flex-col sm:flex-row justify-between items-center gap-4" id="footer-bottom">
          <p className="text-[10px] text-[#848c82]">
            &copy; 2026 Nesta Baby & Co. All rights reserved. Consciously made for safety, development, and deep sleep.
          </p>
          <div className="flex gap-4 text-[10px] text-[#848c82]">
            <span className="cursor-default">Privacy Policy</span>
            <span>•</span>
            <span className="cursor-default">Terms of Service</span>
            <span>•</span>
            <span className="cursor-default">Toxicology Records</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
