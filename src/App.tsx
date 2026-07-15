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
  Gift,
  Search,
  X,
  Stethoscope,
  Quote,
  GraduationCap,
  Activity
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
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // State variables
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showRegistryBuilder, setShowRegistryBuilder] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User auth sandbox state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loggedInBaby, setLoggedInBaby] = useState<string | null>(null);

  // Newsletter sandbox state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // FAQ collapse state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Medical Advisory Board interactive state
  const [activeAdvisorId, setActiveAdvisorId] = useState<string>('all');
  const [safetyInquiryInput, setSafetyInquiryInput] = useState<string>('');
  const [isAnalyzingSafety, setIsAnalyzingSafety] = useState<boolean>(false);
  const [safetyAnalysisResponse, setSafetyAnalysisResponse] = useState<{
    status: 'APPROVED' | 'GUIDANCE' | 'WARNING';
    title: string;
    advisorName: string;
    advisorTitle: string;
    response: string;
    vettedMetrics: string[];
  } | null>(null);

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
    setShowUserDashboard(false);
    setShowAdminDashboard(false);

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

  // Product management actions for Admin Dashboard
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    // Update selected product modal if active
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    // Close selected modal if active
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
  };

  // Wishlist actions for Customer Dashboard & Product Card
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // Medical Advisory Board Safety Inquiry Analyzer
  const handleSafetyInquirySubmit = (e?: React.FormEvent, presetQuery?: string) => {
    if (e) e.preventDefault();
    const query = (presetQuery || safetyInquiryInput).trim();
    if (!query) return;

    setSafetyInquiryInput(query);
    setIsAnalyzingSafety(true);
    setSafetyAnalysisResponse(null);

    // Simulate clinical audit latency
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let responseObj: typeof safetyAnalysisResponse = null;

      if (
        lowerQuery.includes('hip') || 
        lowerQuery.includes('posture') || 
        lowerQuery.includes('swaddle') || 
        lowerQuery.includes('carrier') || 
        lowerQuery.includes('sleep') ||
        lowerQuery.includes('spine') ||
        lowerQuery.includes('dysplasia')
      ) {
        responseObj = {
          status: 'APPROVED',
          title: 'Pediatric Orthopedic Posture & Spinal Audit',
          advisorName: 'Dr. Evelyn Thorne, MD, FAAP',
          advisorTitle: 'Chief Medical Advisor & Pediatric Orthopedics Specialist (Harvard MD)',
          response: 'Our anatomical studies of infant swaddling and carrier dynamics confirm that Nesta textiles support ideal orthopedic development. Keeping the hips in a natural, relaxed "M-shape" (with knees slightly higher than the hips) is critical during the first six months of life. This positions the femoral head securely inside the pelvic socket, fostering healthy cartilaginous alignment and preventing developmental joint dysplasia (DDH) or spinal compression.',
          vettedMetrics: [
            'International Hip Dysplasia Institute Approved "Hip Healthy" Architecture',
            'Zero-Pressure Spinal Curvature Support with GOTS Certified Cotton Bedding',
            'Friction-Free Organic Bamboo Ribbing for Gentle Thermal Regulation'
          ]
        };
      } else if (
        lowerQuery.includes('tox') || 
        lowerQuery.includes('chem') || 
        lowerQuery.includes('dye') || 
        lowerQuery.includes('pesticide') || 
        lowerQuery.includes('organic') || 
        lowerQuery.includes('cotton') ||
        lowerQuery.includes('flame') ||
        lowerQuery.includes('retardant') ||
        lowerQuery.includes('lead')
      ) {
        responseObj = {
          status: 'APPROVED',
          title: 'Environmental Pediatric Biomaterial & Toxicology Screening',
          advisorName: 'Dr. Marcus Vance, PhD',
          advisorTitle: 'Senior Pediatric Toxicologist & Biomaterial Scientist (Stanford PhD)',
          response: 'Our chemical mass spectrometry audits verify that GOTS certified organic materials used in Nesta textiles are 100% free of harmful organophosphorus flame retardants, formaldehyde finishes, heavy metals, and endocrine-disrupting pesticides. Because infant skin is up to five times thinner than adult skin and highly permeable, eliminating chemical trace residues is crucial for preventing contact dermatitis and long-term toxic bioaccumulation.',
          vettedMetrics: [
            '0.00% Pesticide & Heavy Metal Trace Residues Detected (None Detected)',
            'OEKO-TEX Standard 100 Class I (Infant) Chemical Safety Approval',
            'Verified GOTS Transactional Pipeline Certificate #1024881'
          ]
        };
      } else if (
        lowerQuery.includes('toy') || 
        lowerQuery.includes('wood') || 
        lowerQuery.includes('paint') || 
        lowerQuery.includes('silicone') || 
        lowerQuery.includes('chew') || 
        lowerQuery.includes('teeth') ||
        lowerQuery.includes('blocks') ||
        lowerQuery.includes('bpa') ||
        lowerQuery.includes('flax')
      ) {
        responseObj = {
          status: 'APPROVED',
          title: 'Sensory Motor Coordination & Tactile Assessment',
          advisorName: 'Sarah Lin, OTR/L',
          advisorTitle: 'Pediatric Occupational Therapist & Infant Ergonomics Director (Boston MS)',
          response: 'Every plaything is ergonomically calibrated to the grasp reflexes and tactile safety of infants. Crafting blocks and sensory accessories out of 100% pure food-grade silicone or sustainably sourced FSC hardwoods avoids synthetic plasticizers, BPA, and heavy metals. Friction-sealing the wood with cold-pressed organic flax oil or natural beeswax ensures mouth-on exploration (teething) remains completely non-toxic and sensory-enriching.',
          vettedMetrics: [
            'Phthalate-Free & BPA-Free Pure Medical-Grade Food Silicone',
            'Rigorous ASTM F963 (U.S.) and EN71 (Europe) Toy Safety Certifications',
            'Solid FSC-Certified Hardwoods Friction-Sealed with Organic Vegetable Linseed'
          ]
        };
      } else {
        responseObj = {
          status: 'APPROVED',
          title: 'Double-Blind Pediatric Safety & Material Durability Audit',
          advisorName: 'Dr. Evelyn Thorne, MD, FAAP',
          advisorTitle: 'Chief Medical Advisor & Pediatric Orthopedics Specialist (Harvard MD)',
          response: 'The Medical Advisory Board has fully audited your inquiry. All material textiles, organic toy assemblies, and mechanical fasteners undergo rigorous double-blind screening to ensure maximum pediatric safety. We cross-reference joint stress tolerance, allergen profiles, and chemical emission indices to ensure your nursery remains a pristine, supportive, and perfectly pure sanctuary.',
          vettedMetrics: [
            'Verified Pediatrician Posture and Developmental Ergonomics Checked',
            'Independent Accredited Lab Auditing for zero VOC off-gassing',
            'Mechanical Tensile and Pull-Tested Joint Durability Security'
          ]
        };
      }

      setSafetyAnalysisResponse(responseObj);
      setIsAnalyzingSafety(false);
    }, 1400);
  };

  // Filtered and Sorted Products
  const getFilteredProducts = () => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
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

  // FAQs List for Board Approved Q&A with rich metadata
  const FAQS = [
    {
      question: "What exactly makes clothing 'GOTS Certified Organic'?",
      answer: "The Global Organic Textile Standard (GOTS) is the ultimate benchmark. It guarantees that the cotton is grown without toxic pesticides or genetically modified seeds, and that the entire manufacturing pipeline uses zero hazardous dyes, respects water processing conservation laws, and enforces fair trade social working standards.",
      category: "Material Toxicology",
      advisorInitials: "MV",
      advisorId: "vance",
      advisorName: "Dr. Marcus Vance, PhD"
    },
    {
      question: "Are your baby carriers certified for infant hip health?",
      answer: "Yes, absolutely. Our Nesta carriers are officially tested and certified as 'Hip Healthy' by the International Hip Dysplasia Institute. They support the crucial 'M-shape' posture, which positions the baby's knees higher than their hips, preventing joint displacement and promoting optimal orthopedic development.",
      category: "Pediatric Orthopedics",
      advisorInitials: "ET",
      advisorId: "thorne",
      advisorName: "Dr. Evelyn Thorne, MD, FAAP"
    },
    {
      question: "How do your toys comply with safety and chewing standards?",
      answer: "Our developmental blocks and teething toys are crafted of 100% pure, medical-grade food silicone or FSC-certified hardwoods sealed with organic vegetable finishes. They carry rigorous ASTM F963 (U.S.) and EN71 (Europe) toy safety approvals, guaranteeing zero lead, phthalate, or microplastic release during oral teething exploration.",
      category: "Child Ergonomics",
      advisorInitials: "SL",
      advisorId: "lin",
      advisorName: "Sarah Lin, OTR/L"
    },
    {
      question: "Why does organic bamboo fabric feel so soft compared to regular cotton?",
      answer: "Bamboo fiber features naturally rounded microstructures that produce incredibly smooth, friction-free yarn. It is inherently hypoallergenic, temperature-regulating, and can absorb up to three times its weight in water, which makes it ideal for diaper-rash sensitive infants.",
      category: "Material Toxicology",
      advisorInitials: "MV",
      advisorId: "vance",
      advisorName: "Dr. Marcus Vance, PhD"
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
          setShowUserDashboard(false);
          setShowAdminDashboard(false);
          setActiveTab('registry');
        }}
        onOpenUserDashboard={() => {
          if (!loggedInUser) {
            setIsLoginOpen(true);
            alert("Please sign in or use the quick login option in the profile drawer to view your personal Nesting Dashboard!");
          } else {
            setShowUserDashboard(true);
            setShowAdminDashboard(false);
            setShowRegistryBuilder(false);
            setActiveTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenAdminDashboard={() => {
          setShowAdminDashboard(true);
          setShowUserDashboard(false);
          setShowRegistryBuilder(false);
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loggedInUser={loggedInUser}
        loggedInBaby={loggedInBaby}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => {
          setLoggedInUser(null);
          setLoggedInBaby(null);
          setShowUserDashboard(false);
          setActiveTab('home');
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
      ) : showUserDashboard ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="customer-dashboard-view">
          <CustomerDashboard 
            loggedInUser={loggedInUser || "Guest Parent"}
            loggedInBaby={loggedInBaby}
            wishlistedProducts={wishlistedProducts}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            products={products}
            onNavigateToShop={() => onScrollToSection('shop')}
          />
        </div>
      ) : showAdminDashboard ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="admin-dashboard-view">
          <AdminDashboard 
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="products-catalog" ref={productsSectionRef}>
            
            {/* Filter, Search and Sort Header Panel */}
            <div className="bg-[#FAF9F6] border border-[#e9e3db]/80 rounded-3xl p-6 md:p-8 mb-10 shadow-xs" id="catalog-controls-container">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#e9e3db]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#6c8e6a] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5c6a5a]">
                      Curated Baby-Safe Standards
                    </span>
                  </div>
                  <h2 className="font-sans font-semibold text-2xl md:text-3xl text-[#323631] tracking-tight">
                    Our Organic Nursery Collection
                  </h2>
                  <p className="text-[#848c82] text-xs md:text-sm">
                    Strictly chemical-free, pediatrician-endorsed biological essentials.
                  </p>
                </div>

                {/* Show dynamic count and clear buttons */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="bg-[#5c6a5a]/5 px-3.5 py-2 rounded-full text-[#5c6a5a] font-semibold border border-[#5c6a5a]/10">
                    Showing <span className="font-bold">{filteredProducts.length}</span> verified items
                  </div>
                  {(selectedCategory !== 'all' || searchQuery !== '') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-[#bf826b] hover:text-[#a0624c] flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Search & Sort Actions Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
                {/* Search Input */}
                <div className="relative md:col-span-8 flex items-center">
                  <Search className="absolute left-3.5 h-4 w-4 text-[#848c82]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search crib sheets, swaddles, wooden play gym, rattles, feeding cups..."
                    className="w-full pl-10 pr-10 py-3.5 text-xs bg-white border border-[#e9e3db] rounded-2xl text-[#323631] placeholder-[#a6ada5] focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 p-1.5 rounded-full text-[#848c82] hover:text-black hover:bg-gray-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Sort Select */}
                <div className="relative md:col-span-4 flex items-center">
                  <div className="absolute left-3.5 text-[10px] uppercase font-bold tracking-wider text-[#848c82]">
                    Sort By
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-20 pr-10 py-3.5 text-xs font-bold bg-white border border-[#e9e3db] rounded-2xl text-[#323631] focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] cursor-pointer appearance-none transition-all"
                  >
                    <option value="popular">🔥 Most Popular</option>
                    <option value="top-rated">★ Top Parent Rated</option>
                    <option value="price-low-high">↑ Price: Low to High</option>
                    <option value="price-high-low">↓ Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 text-gray-400">
                    <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2 scrollbar-none" id="category-pills-row">
              {[
                { id: 'all', label: '🌾 All Items' },
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
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                    selectedCategory === category.id
                      ? 'bg-[#5c6a5a] text-[#f7f5f0] border-[#5c6a5a] shadow-md'
                      : 'bg-white text-[#6d756b] border-[#e9e3db] hover:border-[#6d756b] hover:bg-gray-50'
                  }`}
                  id={`cat-pill-${category.id}`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#e9e3db] p-8" id="no-products-found">
                <div className="w-16 h-16 bg-[#faf8f5] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e9e3db]">
                  <Search className="h-6 w-6 text-[#848c82]" />
                </div>
                <h3 className="text-base font-semibold text-[#323631]">No items match your search filters</h3>
                <p className="text-xs text-[#848c82] mt-1 max-w-sm mx-auto">Try checking your spelling, looking in another category, or reset the filters below to browse our full collection.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-[#5c6a5a] text-white text-xs font-bold px-5 py-2.5 rounded-xl mt-6 hover:bg-[#4d594b] transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8" id="products-catalog-grid">
                {filteredProducts.map((prod) => (
                  <ProductCard 
                    key={prod.id}
                    product={prod}
                    onViewDetails={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                    isWished={wishlist.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Expert Pediatrician Advisory Board Q&A */}
          <section className="bg-white py-20 border-t border-[#e9e3db]" id="pediatrician-qa-section" ref={aboutRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header section with sophisticated clinical branding */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fcf5f2] border border-[#f5e2db] text-[10px] font-bold uppercase tracking-widest text-[#bf826b] mb-4">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#bf826b]" />
                  Clinical & Safety Vetted
                </span>
                <h2 className="font-sans font-semibold text-3xl md:text-4xl text-[#323631] tracking-tight">
                  Medical Advisory Council
                </h2>
                <div className="h-1 w-12 bg-[#bf826b] mx-auto my-4 rounded-full"></div>
                <p className="text-xs md:text-sm text-[#6d756b] leading-relaxed max-w-2xl mx-auto">
                  Every swaddle, developmental play set, and nursery textile is strictly audited by our board of certified pediatricians, toxicologists, and early childhood occupational therapists. We certify materials at the molecular level and evaluate orthopedic physics to safeguard your nesting phase.
                </p>
              </div>

              {/* Roster Grid of our Council Members */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" id="medical-board-roster">
                {[
                  {
                    id: 'thorne',
                    name: 'Dr. Evelyn Thorne, MD, FAAP',
                    title: 'Chief of Pediatric Orthopedics',
                    alma: 'Harvard Medical School',
                    focus: 'Hip joint geometry, spinal alignment, safe swaddling',
                    quote: "Nesta’s swaddles strictly maintain the 135° anatomical flexion index. This prevents cartilage wear and supports healthy hip socket alignment.",
                    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
                    badge: 'Orthopedics President'
                  },
                  {
                    id: 'vance',
                    name: 'Dr. Marcus Vance, PhD',
                    title: 'Senior Pediatric Toxicologist',
                    alma: 'Stanford University (Organic Chem)',
                    focus: 'Chemical screen, raw organic fiber trace, non-toxic dyes',
                    quote: "By verifying 0.00% pesticide trace down to parts per billion, Nesta protects your newborn's ultra-sensitive, hyper-permeable epidermal layers.",
                    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
                    badge: 'Toxicology Director'
                  },
                  {
                    id: 'lin',
                    name: 'Sarah Lin, OTR/L',
                    title: 'Pediatric Occupational Therapist',
                    alma: 'Boston University (Child Dev)',
                    focus: 'Sensory thresholds, fine motor grasp reflexes, ergonomics',
                    quote: "The weight and structural density of Nesta’s solid birch toy kits are custom calibrated to satisfy grasp reflexes without sensory flooding.",
                    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300',
                    badge: 'Development Specialist'
                  }
                ].map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setActiveAdvisorId(activeAdvisorId === member.id ? 'all' : member.id)}
                    className={`bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                      activeAdvisorId === member.id 
                        ? 'border-[#5c6a5a] ring-1 ring-[#5c6a5a] shadow-lg scale-[1.02]' 
                        : 'border-[#e9e3db] hover:border-[#6d756b] hover:shadow-md'
                    }`}
                    id={`advisor-card-${member.id}`}
                  >
                    <div>
                      {/* Active Filter Glow Pin */}
                      {activeAdvisorId === member.id && (
                        <span className="absolute top-4 right-4 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5c6a5a] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5c6a5a]"></span>
                        </span>
                      )}

                      <div className="flex items-center gap-4 mb-5">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#e9e3db] group-hover:border-[#5c6a5a] transition-all"
                        />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#bf826b]">{member.badge}</p>
                          <h4 className="font-sans font-bold text-sm text-[#323631] leading-tight">{member.name}</h4>
                          <div className="flex items-center gap-1 text-[10px] text-[#848c82] mt-0.5 font-medium">
                            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[#848c82]" />
                            {member.alma}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="text-[11px] bg-[#faf8f5] px-2.5 py-1.5 rounded-lg border border-[#e9e3db]/30">
                          <strong className="text-[#323631] font-semibold block mb-0.5 text-[10px] uppercase tracking-wider">Clinical Focus</strong>
                          <span className="text-[#6d756b]">{member.focus}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#f5f1ea] pt-4 mt-auto">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-6 w-6 text-[#faf8f5] group-hover:text-gray-100 transition-colors -z-0" />
                        <p className="text-xs text-[#6d756b] italic relative z-10 pl-3 leading-relaxed">
                          "{member.quote}"
                        </p>
                      </div>
                      <button 
                        type="button"
                        className={`w-full mt-5 py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          activeAdvisorId === member.id
                            ? 'bg-[#5c6a5a] text-white border-[#5c6a5a]'
                            : 'bg-white text-[#5c6a5a] border-[#e9e3db] hover:bg-[#faf8f5]'
                        }`}
                      >
                        {activeAdvisorId === member.id ? 'Viewing Specialty Q&A' : 'Filter Specialty Q&As'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live interactive panel for Safety analysis and FAQs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Interactive clinical safety verification center */}
                <div className="lg:col-span-5 bg-[#faf8f5]/50 border border-[#e9e3db] rounded-3xl p-6 md:p-8 shadow-xs" id="safety-terminal">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-[#f5f1ea] text-[#323631] rounded-lg">
                      <Stethoscope className="h-4 w-4 text-[#5c6a5a]" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-sm text-[#323631]">Pediatric Safety Desk</h3>
                      <p className="text-[10px] text-[#848c82]">On-Demand Council Toxicology & Ergonomic Audit</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#6d756b] leading-relaxed mb-6">
                    Enter a component, material, or developmental metric to verify its official medical council status. Try typing keywords like <span className="font-semibold text-[#323631]">swaddle</span>, <span className="font-semibold text-[#323631]">pesticide</span>, <span className="font-semibold text-[#323631]">wood</span>, or <span className="font-semibold text-[#323631]">carrier</span>.
                  </p>

                  <form onSubmit={handleSafetyInquirySubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={safetyInquiryInput}
                        onChange={(e) => setSafetyInquiryInput(e.target.value)}
                        placeholder="e.g., Are your baby carriers safe for hips?"
                        className="w-full pl-4 pr-12 py-3 text-xs bg-white border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a]"
                        disabled={isAnalyzingSafety}
                      />
                      <button
                        type="submit"
                        disabled={isAnalyzingSafety || !safetyInquiryInput.trim()}
                        className="absolute right-2 top-2 p-1.5 bg-[#5c6a5a] text-white rounded-lg hover:bg-[#4d594b] disabled:opacity-50 disabled:bg-gray-300 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Pre-made Quick Presets */}
                    <div>
                      <p className="text-[10px] text-[#848c82] uppercase font-bold tracking-wider mb-2">Popular Safety Verifications</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { text: "💤 swaddle hip safety", q: "hip" },
                          { text: "🌱 cotton chemical test", q: "cotton" },
                          { text: "🧸 toxic toy chewing check", q: "chew" }
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSafetyInquirySubmit(undefined, preset.q)}
                            disabled={isAnalyzingSafety}
                            className="text-[10px] bg-white hover:bg-[#f5f1ea] border border-[#e9e3db] text-[#6d756b] font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            {preset.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>

                  {/* Dynamic verification result screen */}
                  <div className="mt-6 border-t border-[#f5f1ea] pt-6" id="safety-terminal-results">
                    {isAnalyzingSafety ? (
                      <div className="py-8 text-center space-y-3 bg-white rounded-2xl border border-[#e9e3db]/50 p-4">
                        <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-[#5c6a5a] border-t-transparent"></div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-[#323631] animate-pulse">Running Pediatric Safety Screening...</p>
                          <p className="text-[10px] text-[#848c82]">Vetting raw mass-spec parameters against IHDI standards</p>
                        </div>
                      </div>
                    ) : safetyAnalysisResponse ? (
                      <div className="bg-[#f2f8f2] border border-[#cbe4cb] rounded-2xl p-4 md:p-5 relative overflow-hidden animate-fade-in shadow-xs">
                        
                        {/* Certificate background watermark stamp */}
                        <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
                          <ShieldCheck className="h-28 w-28 text-emerald-900" />
                        </div>

                        <div className="flex items-center justify-between mb-3 border-b border-[#dfefdf] pb-2.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle className="h-3 w-3 text-emerald-700" />
                            {safetyAnalysisResponse.status} & VETTED
                          </span>
                          <span className="text-[9px] text-[#848c82] font-mono">ID: NST-AUD-2026</span>
                        </div>

                        <h4 className="font-sans font-bold text-xs text-emerald-950 mb-2">{safetyAnalysisResponse.title}</h4>
                        <p className="text-[11px] text-[#4d594b] leading-relaxed mb-4">
                          {safetyAnalysisResponse.response}
                        </p>

                        <div className="space-y-2 border-t border-[#dfefdf] pt-3">
                          <p className="text-[9px] uppercase font-bold tracking-wider text-emerald-900">Certified Board Vouchers</p>
                          <ul className="space-y-1.5">
                            {safetyAnalysisResponse.vettedMetrics.map((metric, mIdx) => (
                              <li key={mIdx} className="flex gap-2 text-[10px] text-[#556353] leading-snug">
                                <span className="text-emerald-700 font-bold">✓</span>
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#dfefdf] flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold text-[#323631] leading-tight">{safetyAnalysisResponse.advisorName}</p>
                            <p className="text-[8px] text-[#848c82]">{safetyAnalysisResponse.advisorTitle}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block border-2 border-dashed border-emerald-300 text-emerald-700 text-[8px] font-bold uppercase px-2 py-1 rounded-md rotate-[-4deg] tracking-wider">
                              Medical Approved
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-white border border-dashed border-[#e9e3db] rounded-2xl p-4">
                        <Activity className="h-6 w-6 text-[#848c82] mx-auto mb-2.5" />
                        <p className="text-xs font-medium text-[#323631]">Safety verification terminal idle</p>
                        <p className="text-[10px] text-[#848c82] mt-0.5 max-w-[200px] mx-auto">Submit a query or click a quick check preset above to initiate clinical review scans</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: High-fidelity categorized Accordion FAQs */}
                <div className="lg:col-span-7 space-y-4" id="faq-accordion">
                  <div className="flex items-center justify-between border-b border-[#e9e3db] pb-3 mb-2">
                    <h3 className="font-sans font-bold text-xs text-[#323631] uppercase tracking-wider">
                      {activeAdvisorId === 'all' 
                        ? 'Frequently Answered Inquiries' 
                        : `Vetted Q&As: ${activeAdvisorId === 'thorne' ? 'Dr. Thorne' : activeAdvisorId === 'vance' ? 'Dr. Vance' : 'Sarah Lin'}`
                      }
                    </h3>
                    {activeAdvisorId !== 'all' && (
                      <button 
                        type="button"
                        onClick={() => setActiveAdvisorId('all')}
                        className="text-[10px] text-[#5c6a5a] hover:text-[#323631] font-bold hover:underline cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>

                  {FAQS.filter(faq => activeAdvisorId === 'all' || faq.advisorId === activeAdvisorId).map((faq, index) => {
                    const isExpanded = expandedFaq === index;
                    return (
                      <div 
                        key={index} 
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
                          isExpanded 
                            ? 'border-[#5c6a5a] shadow-xs' 
                            : 'border-[#e9e3db] hover:border-[#6d756b] bg-[#faf8f5]/20 hover:bg-[#faf8f5]/50'
                        }`}
                        id={`faq-row-${index}`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isExpanded ? null : index)}
                          className="w-full text-left p-5 flex justify-between items-start gap-4 cursor-pointer"
                          id={`faq-btn-${index}`}
                        >
                          <div className="space-y-1.5 text-left">
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="inline-flex items-center text-[9px] font-extrabold uppercase tracking-widest bg-[#f5f1ea] text-[#6d756b] px-2 py-0.5 rounded-md">
                                {faq.category}
                              </span>
                              <span className="text-[9px] text-[#848c82]">
                                Vetted by <strong className="text-[#5c6a5a]">{faq.advisorInitials}</strong>
                              </span>
                            </div>
                            <span className="block font-sans font-semibold text-xs md:text-sm text-[#323631] leading-snug">
                              {faq.question}
                            </span>
                          </div>
                          <span className={`text-[#5c6a5a] font-bold shrink-0 text-lg transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}>
                            {isExpanded ? '−' : '+'}
                          </span>
                        </button>
                        
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-0.5 text-xs md:text-sm text-[#6d756b] leading-relaxed border-t border-[#f5f1ea] bg-white animate-fade-in space-y-4">
                            <p className="text-left">{faq.answer}</p>
                            <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#e9e3db]/40 flex gap-3 items-center">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5c6a5a] text-[10px] font-bold text-white uppercase">
                                {faq.advisorInitials}
                              </span>
                              <div className="text-left">
                                <p className="text-[10px] font-bold text-[#323631] leading-tight">Official Guidance Statement</p>
                                <p className="text-[9px] text-[#848c82]">Authored by {faq.advisorName}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
                  baby-shop
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
            &copy; 2026 baby-shop & Co. All rights reserved. Consciously made for safety, development, and deep sleep.
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
