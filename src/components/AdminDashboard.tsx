import React, { useState } from 'react';
import { 
  BarChart2, 
  Package, 
  ShoppingBag, 
  Gift, 
  Plus, 
  Trash, 
  Edit2, 
  Check, 
  X, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Box, 
  AlertCircle,
  RefreshCw,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Printer,
  ChevronRight,
  TrendingDown,
  Warehouse
} from 'lucide-react';
import { Product } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (prodId: string) => void;
}

interface SimulatedOrder {
  id: string;
  customer: string;
  date: string;
  items: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

interface SimulatedRegistry {
  id: string;
  parent: string;
  babyStage: string;
  theme: string;
  itemsCount: number;
  status: 'Draft' | 'Active' | 'Completed';
}

type MetricType = 'revenue' | 'registries' | 'skus';

export default function AdminDashboard({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'catalog' | 'orders' | 'registries'>('metrics');
  
  // Local state for adding/editing products
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields for new / editing product
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'sleep' | 'gear' | 'play' | 'feeding' | 'apparel' | 'bath'>('sleep');
  const [formPrice, setFormPrice] = useState(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState(0);
  const [formDescription, setFormDescription] = useState('');
  const [formStock, setFormStock] = useState(10);
  const [formMaterials, setFormMaterials] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600');

  // Interactive metrics states
  const [chartMetric, setChartMetric] = useState<MetricType>('revenue');
  const [restockedMills, setRestockedMills] = useState(false);

  // Search & Filters for Catalog
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogFilterCategory, setCatalogFilterCategory] = useState<string>('all');
  const [catalogStockFilter, setCatalogStockFilter] = useState<'all' | 'low'>('all');

  // Search for Orders & Registries
  const [ordersSearch, setOrdersSearch] = useState('');
  const [registriesSearch, setRegistriesSearch] = useState('');

  // Simulated live orders state for Admin manipulation
  const [orders, setOrders] = useState<SimulatedOrder[]>([
    { id: 'ORD-2026-9481', customer: 'rashelmahmudraj1998@gmail.com', date: '2026-07-10', items: '2x Swaddle Blanket, 1x Wooden Play Gym', total: 118.00, status: 'Shipped' },
    { id: 'ORD-2026-9214', customer: 'sarah.miller@example.com', date: '2026-06-15', items: '1x Bamboo Tableware', total: 34.00, status: 'Delivered' },
    { id: 'ORD-2026-8812', customer: 'johndoe@example.com', date: '2026-07-12', items: '3x Soft Cotton Bodysuits', total: 126.00, status: 'Processing' },
    { id: 'ORD-2026-8409', customer: 'emily_p@example.com', date: '2026-07-14', items: '1x Ergonomic Carrier, 1x Silicon Blocks', total: 154.00, status: 'Processing' }
  ]);

  // Simulated registries list
  const [registries, setRegistries] = useState<SimulatedRegistry[]>([
    { id: 'REG-502', parent: 'rashelmahmudraj1998@gmail.com', babyStage: 'Newborn (0-3M)', theme: 'Earthy Sage & Ochre', itemsCount: 4, status: 'Active' },
    { id: 'REG-498', parent: 'laura.n@example.com', babyStage: 'Expecting (Nesting Prep)', theme: 'Natural Wood & Ivory', itemsCount: 6, status: 'Active' },
    { id: 'REG-412', parent: 'mark_spenser@example.com', babyStage: 'Toddler (9-24M)', theme: 'Warm Apricot & Seafoam', itemsCount: 3, status: 'Completed' }
  ]);

  // Adjust stock count directly
  const handleAdjustStock = (prodId: string, amount: number) => {
    const p = products.find(prod => prod.id === prodId);
    if (p) {
      const updatedStock = Math.max(0, p.stock + amount);
      onUpdateProduct({ ...p, stock: updatedStock });
    }
  };

  // Delete product wrapper
  const handleDelete = (id: string) => {
    if (confirm('Are you absolutely sure you want to delete this organic product from the catalog? This will affect current active storefront listings.')) {
      onDeleteProduct(id);
    }
  };

  // Edit action triggers
  const handleStartEdit = (prod: Product) => {
    setEditingId(prod.id);
    setFormName(prod.name);
    setFormCategory(prod.category as any);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice || 0);
    setFormDescription(prod.description);
    setFormStock(prod.stock);
    setFormMaterials(prod.materials);
    setFormImage(prod.image);
    setIsAdding(false);
  };

  const handleStartAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormCategory('sleep');
    setFormPrice(45.00);
    setFormOriginalPrice(0);
    setFormDescription('Finely detailed GOTS organic certified baby accessory. Naturally dyed with botanical extracts.');
    setFormStock(15);
    setFormMaterials('100% GOTS Certified Organic Cotton');
    setFormImage('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600');
    setIsAdding(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = products.find(prod => prod.id === editingId);
    if (!existing) return;

    const updatedProduct: Product = {
      ...existing,
      name: formName,
      category: formCategory,
      price: formPrice,
      originalPrice: formOriginalPrice > 0 ? formOriginalPrice : undefined,
      description: formDescription,
      stock: formStock,
      materials: formMaterials,
      image: formImage
    };

    onUpdateProduct(updatedProduct);
    setEditingId(null);
    alert('SKU inventory configurations updated successfully!');
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `prod-add-${Date.now()}`,
      name: formName,
      category: formCategory,
      price: formPrice,
      originalPrice: formOriginalPrice > 0 ? formOriginalPrice : undefined,
      description: formDescription,
      stock: formStock,
      materials: formMaterials,
      image: formImage,
      rating: 4.8,
      reviewCount: 1,
      features: [
        'Naturally non-toxic and organic certified',
        'Pediatrician checked for active child safety standards',
        'Sustainably harvested and non-toxic materials'
      ],
      certifications: [
        {
          name: "GOTS® Organic",
          authority: "Global Organic Textile Standard",
          description: "100% certified organic cotton fabric safety."
        }
      ],
      reviews: [
        {
          id: 'rev-1',
          author: 'Organic Expert',
          role: 'Pediatric Consultant',
          rating: 5,
          date: '2026-07-15',
          comment: 'Outstanding quality and pristine fabric safety. Verified chemical free.',
          verified: true
        }
      ]
    };

    onAddProduct(newProduct);
    setIsAdding(false);
    alert('Pristinely added new product into our GOTS certified registry catalog!');
  };

  // Order status changing
  const handleChangeOrderStatus = (orderId: string, status: any) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    }));
  };

  // Registry status changing
  const handleChangeRegistryStatus = (regId: string, status: any) => {
    setRegistries(prev => prev.map(r => {
      if (r.id === regId) {
        return { ...r, status };
      }
      return r;
    }));
  };

  // Trigger simulated milling restock
  const handleTriggerMillingRestock = () => {
    setRestockedMills(true);
    setTimeout(() => {
      setRestockedMills(false);
    }, 4000);
  };

  // Total Revenue calculator
  const totalRev = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, curr) => acc + curr.total, 0) + 43850; // Added base sales representation

  // Filter Catalog
  const getFilteredCatalog = () => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                            p.materials.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                            p.id.toLowerCase().includes(catalogSearch.toLowerCase());
      const matchesCategory = catalogFilterCategory === 'all' || p.category === catalogFilterCategory;
      const matchesStock = catalogStockFilter === 'all' || p.stock <= 5;
      return matchesSearch && matchesCategory && matchesStock;
    });
  };

  // Filter Orders
  const getFilteredOrders = () => {
    return orders.filter(o => 
      o.id.toLowerCase().includes(ordersSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(ordersSearch.toLowerCase()) ||
      o.items.toLowerCase().includes(ordersSearch.toLowerCase())
    );
  };

  // Filter Registries
  const getFilteredRegistries = () => {
    return registries.filter(r => 
      r.id.toLowerCase().includes(registriesSearch.toLowerCase()) ||
      r.parent.toLowerCase().includes(registriesSearch.toLowerCase()) ||
      r.theme.toLowerCase().includes(registriesSearch.toLowerCase())
    );
  };

  // SVG Chart Dataset Configuration depending on metrics switching
  const getChartData = () => {
    switch (chartMetric) {
      case 'registries':
        return {
          title: "Daily Registries Formed",
          subtitle: "Total Live Parents Submissions",
          growth: "+24% Month-on-Month",
          points: [
            { x: 20, y: 140, val: "8 Reg" },
            { x: 130, y: 120, val: "12 Reg" },
            { x: 250, y: 150, val: "6 Reg" },
            { x: 370, y: 90, val: "18 Reg" },
            { x: 490, y: 50, val: "25 Reg" },
            { x: 600, y: 40, val: "29 Reg" },
            { x: 680, y: 25, val: "34 Today" }
          ],
          pathArea: "M 20 140 C 130 120, 250 150, 370 90 C 490 50, 600 40, 680 25 L 680 180 L 20 180 Z",
          pathLine: "M 20 140 C 130 120, 250 150, 370 90 C 490 50, 600 40, 680 25"
        };
      case 'skus':
        return {
          title: "In-Stock SKU Turnover Ratio",
          subtitle: "Eco Units Distributed via Warehousing",
          growth: "99.2% Fulfillment Velocity",
          points: [
            { x: 20, y: 110, val: "210 Units" },
            { x: 130, y: 140, val: "150 Units" },
            { x: 250, y: 80, val: "320 Units" },
            { x: 370, y: 90, val: "290 Units" },
            { x: 490, y: 40, val: "410 Units" },
            { x: 600, y: 60, val: "380 Units" },
            { x: 680, y: 30, val: "480 Today" }
          ],
          pathArea: "M 20 110 C 130 140, 250 80, 370 90 C 490 40, 600 60, 680 30 L 680 180 L 20 180 Z",
          pathLine: "M 20 110 C 130 140, 250 80, 370 90 C 490 40, 600 60, 680 30"
        };
      case 'revenue':
      default:
        return {
          title: "Daily Storefront Sales Volume (USD)",
          subtitle: "Organic Baby Sales & Registry Purchases",
          growth: "+15.4% Year-on-Year Growth",
          points: [
            { x: 20, y: 150, val: "$420" },
            { x: 130, y: 110, val: "$610" },
            { x: 250, y: 140, val: "$550" },
            { x: 370, y: 80, val: "$890" },
            { x: 490, y: 120, val: "$720" },
            { x: 600, y: 40, val: "$1,680" },
            { x: 680, y: 20, val: "$2,410 Today" }
          ],
          pathArea: "M 20 150 C 130 110, 250 140, 370 80 C 490 120, 600 40, 680 20 L 680 180 L 20 180 Z",
          pathLine: "M 20 150 C 130 110, 250 140, 370 80 C 490 120, 600 40, 680 20"
        };
    }
  };

  const activeChart = getChartData();

  return (
    <div className="bg-[#FAF9F6] border border-[#e9e3db] rounded-3xl p-4 md:p-8 shadow-xs animate-fade-in text-[#323631]" id="admin-dashboard-container">
      
      {/* Header telemetry and indicators */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-6 border-b border-[#e9e3db] mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#bf826b]/10 text-[#bf826b] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#bf826b]/15">
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              Nesting Control Panel
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Active Dispatch Online</span>
            </div>
          </div>
          <h2 className="font-sans font-semibold text-3xl text-[#323631] tracking-tight">
            Storefront Manager Station
          </h2>
          <p className="text-xs text-[#848c82] leading-relaxed max-w-xl">
            Audit high-end financial indices, administer the organic GOTS-certified product registry catalog, and dispatch deliveries.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-2 w-full xl:w-auto" id="admin-tabs">
          {[
            { id: 'metrics', label: '📊 Sales Metrics', icon: BarChart2 },
            { id: 'catalog', label: '📦 SKU Inventory', icon: Package },
            { id: 'orders', label: '📋 Order Dispatch', icon: ShoppingBag },
            { id: 'registries', label: '🎁 Gift Registries', icon: Gift }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

      {/* Main Grid switches */}
      {activeTab === 'metrics' && (
        <div className="space-y-8 animate-fade-in" id="admin-metrics-view">
          
          {/* Bento statistcs layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Cumulative Gross Revenue', val: `$${totalRev.toLocaleString()}`, change: '+12.5% vs last week', icon: DollarSign, color: 'text-green-600 bg-green-50/60 border border-green-100' },
              { label: 'Subscribed Registries', val: `${registries.length + 155} active`, change: '+24 parents today', icon: Gift, color: 'text-[#bf826b] bg-[#bf826b]/5 border border-[#bf826b]/10' },
              { label: 'Active Catalog SKUs', val: `${products.length} Items`, change: '100% Non-toxic', icon: Box, color: 'text-[#5c6a5a] bg-[#5c6a5a]/5 border border-[#5c6a5a]/10' },
              { label: 'Cart Conversion Ratio', val: '4.82%', change: '+0.5% vs last month', icon: TrendingUp, color: 'text-blue-600 bg-blue-50/60 border border-blue-100' }
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="bg-white border border-[#e9e3db]/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#848c82] uppercase font-bold tracking-wider block">{st.label}</span>
                    <span className="text-xl md:text-2xl font-bold text-[#323631] block tracking-tight">{st.val}</span>
                    <span className="text-[9px] font-bold text-green-600 flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3 inline" />
                      {st.change}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${st.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Sales Chart & Breakdown section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Interactive charting panel (8 columns) */}
            <div className="lg:col-span-8 bg-white border border-[#e9e3db] rounded-3xl p-6 space-y-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-[#f5f1ea]">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#bf826b]">Fiduciary Analytics Console</span>
                  <h3 className="text-base font-bold text-[#323631] mt-0.5">{activeChart.title}</h3>
                  <p className="text-[10px] text-gray-400 font-semibold">{activeChart.subtitle}</p>
                </div>
                
                {/* Metric switches toggle */}
                <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-[#e9e3db] p-1 rounded-xl">
                  {[
                    { id: 'revenue', label: '$ Revenue' },
                    { id: 'registries', label: '🎁 Registries' },
                    { id: 'skus', label: '📦 SKUs Sold' }
                  ].map(toggle => (
                    <button
                      key={toggle.id}
                      onClick={() => setChartMetric(toggle.id as any)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        chartMetric === toggle.id
                          ? 'bg-[#5c6a5a] text-white'
                          : 'text-[#6d756b] hover:text-[#323631]'
                      }`}
                    >
                      {toggle.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic SVG with active metric values */}
              <div className="relative pt-6">
                <svg className="w-full h-48 overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="700" y2="30" stroke="#f5f1ea" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="700" y2="80" stroke="#f5f1ea" strokeDasharray="4 4" />
                  <line x1="0" y1="130" x2="700" y2="130" stroke="#f5f1ea" strokeDasharray="4 4" />
                  <line x1="0" y1="180" x2="700" y2="180" stroke="#e9e3db" />

                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5c6a5a" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#5c6a5a" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path 
                    d={activeChart.pathArea} 
                    fill="url(#areaGrad)" 
                    className="transition-all duration-700 ease-in-out"
                  />

                  {/* Line graph path */}
                  <path 
                    d={activeChart.pathLine} 
                    fill="none" 
                    stroke="#5c6a5a" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    className="transition-all duration-700 ease-in-out"
                  />

                  {/* Highlight circles on data coordinates */}
                  {activeChart.points.map((pt, index) => {
                    const isLast = index === activeChart.points.length - 1;
                    return (
                      <g key={index}>
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r={isLast ? "6.5" : "4.5"} 
                          fill={isLast ? "#bf826b" : "#5c6a5a"} 
                          stroke="#fff" 
                          strokeWidth={isLast ? "2.5" : "1.5"}
                          className="transition-all duration-700"
                        />
                        <text 
                          x={pt.x} 
                          y={pt.y - 15} 
                          className={`text-[9px] font-bold ${isLast ? 'fill-[#bf826b]' : 'fill-[#6d756b]'} font-mono`}
                          textAnchor="middle"
                        >
                          {pt.val}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[10px] font-bold text-[#848c82] uppercase tracking-wider pt-3">
                  <span>July 9</span>
                  <span>July 10</span>
                  <span>July 11</span>
                  <span>July 12</span>
                  <span>July 13</span>
                  <span>July 14</span>
                  <span className="text-[#bf826b] font-extrabold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#bf826b] animate-ping" />
                    July 15 (Active)
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Category Volume Sales Breakdown & Restock Alert (4 columns) */}
            <div className="lg:col-span-4 bg-white border border-[#e9e3db] rounded-3xl p-6 space-y-6 shadow-2xs">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#bf826b]">Demand Saturation</span>
                <h3 className="text-base font-bold text-[#323631] mt-0.5">Category Volume Sales</h3>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  { label: 'Sleep & Swaddles', count: 48, pct: '38%', color: 'bg-[#5c6a5a]' },
                  { label: 'Ergonomic Baby Gear', count: 32, pct: '25%', color: 'bg-[#bf826b]' },
                  { label: 'Wooden Sensory Play', count: 22, pct: '18%', color: 'bg-amber-600' },
                  { label: 'Apparel & Non-Toxic Feeding', count: 24, pct: '19%', color: 'bg-teal-600' }
                ].map((cat, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[#4a4f49] font-medium text-[11px]">
                      <span>{cat.label}</span>
                      <span className="font-bold text-[#323631] font-mono">{cat.pct} ({cat.count} units)</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-[#f1ebe1] h-2.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: cat.pct }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Actionable Restock Alert Panel */}
              <div className="bg-[#FAF9F6] border border-[#e9e3db] rounded-2xl p-4 space-y-3">
                <div className="flex gap-2 text-xs text-[#bf826b] font-bold uppercase tracking-wider">
                  <AlertCircle className="h-4.5 w-4.5 text-[#bf826b] shrink-0" />
                  <span>Depot Level alert</span>
                </div>
                <p className="text-[11px] text-[#6d756b] leading-relaxed">
                  Wooden Play Gyms are down to <strong>4 units</strong> in our Portland logistics terminal. Restock is required to fulfill registry demand.
                </p>

                <button
                  onClick={handleTriggerMillingRestock}
                  disabled={restockedMills}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    restockedMills 
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-[#bf826b] hover:bg-[#a9705a] text-white shadow-2xs'
                  }`}
                >
                  <Warehouse className="h-3.5 w-3.5" />
                  <span>{restockedMills ? '✓ Milling Order Sent' : 'Request Milling Restock'}</span>
                </button>

                {restockedMills && (
                  <p className="text-[9px] text-green-700 font-bold text-center animate-pulse">
                    ✓ Order ID #REST-4201 dispatched directly to Oregon Woodworking Co.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Grid Content: Product Catalog (CRUD) */}
      {activeTab === 'catalog' && (
        <div className="space-y-6 animate-fade-in" id="admin-catalog-view">
          
          {/* Header controllers */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div>
              <h3 className="font-sans font-bold text-base text-[#323631]">Product Catalog Master</h3>
              <p className="text-xs text-[#848c82]">Add new organic GOTS certifications, edit catalog pricing, or adjust active GOTS stock.</p>
            </div>
            
            {!isAdding && !editingId && (
              <button
                onClick={handleStartAdd}
                className="bg-[#5c6a5a] hover:bg-[#4d594b] text-white text-xs font-bold px-4.5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Publish New Organic SKU</span>
              </button>
            )}
          </div>

          {/* ADVANCED SEACH & FILTER CONTROL PANEL */}
          <div className="bg-white border border-[#e9e3db] p-4.5 rounded-2xl flex flex-col md:flex-row items-center gap-4 text-xs">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 h-4 w-4 text-[#848c82]" />
              <input
                type="text"
                placeholder="Search catalog by name, materials, or SKU ID..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a]"
              />
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-[#848c82] font-semibold shrink-0">Category:</span>
              <select
                value={catalogFilterCategory}
                onChange={(e) => setCatalogFilterCategory(e.target.value)}
                className="flex-1 md:flex-initial bg-[#faf8f5] border border-[#e9e3db] rounded-xl px-3 py-2 font-semibold text-[#323631] cursor-pointer"
              >
                <option value="all">🌿 All Categories</option>
                <option value="sleep">Sleep & Swaddles</option>
                <option value="gear">Ergonomic Gear</option>
                <option value="play">Wooden Play</option>
                <option value="feeding">Non-Toxic Feeding</option>
                <option value="apparel">Soft Clothing</option>
                <option value="bath">Bath & Towels</option>
              </select>
            </div>

            {/* Stock Level selection */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-[#848c82] font-semibold shrink-0">Inventory:</span>
              <div className="flex rounded-xl border border-[#e9e3db] p-1 bg-[#faf8f5]">
                <button
                  onClick={() => setCatalogStockFilter('all')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    catalogStockFilter === 'all' ? 'bg-[#5c6a5a] text-white' : 'text-[#6d756b]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCatalogStockFilter('low')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    catalogStockFilter === 'low' ? 'bg-[#bf826b] text-white' : 'text-[#6d756b]'
                  }`}
                >
                  ⚠️ Low Stock
                </button>
              </div>
            </div>
          </div>

          {/* Form adding SKU card */}
          {(isAdding || editingId) && (
            <div className="bg-white border-2 border-[#5c6a5a]/20 rounded-3xl p-6 space-y-5 animate-fade-in shadow-md">
              <div className="flex justify-between items-center border-b border-[#e9e3db]/60 pb-3">
                <h4 className="font-sans font-bold text-sm uppercase text-[#5c6a5a] tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  {editingId ? '✏️ Modify SKU Configuration' : '✨ Publish New Organic Certified SKU'}
                </h4>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                  }}
                  className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={editingId ? handleSaveEdit : handleSaveAdd} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs text-[#323631]">
                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Product Catalog Name</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] font-medium"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Primary Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl font-semibold cursor-pointer"
                      >
                        <option value="sleep">Sleep & Swaddles</option>
                        <option value="gear">Ergonomic Gear</option>
                        <option value="play">Wooden Play</option>
                        <option value="feeding">Non-Toxic Feeding</option>
                        <option value="apparel">Soft Clothing</option>
                        <option value="bath">Bath & Towels</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">SEO Editorial Description</label>
                    <textarea
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] leading-relaxed font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Active Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Original Price ($ - Optional)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formOriginalPrice}
                        onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                        className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Initial Stock Count</label>
                      <input
                        type="number"
                        value={formStock}
                        onChange={(e) => setFormStock(Number(e.target.value))}
                        className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Certified Materials Sourcing</label>
                    <input
                      type="text"
                      value={formMaterials}
                      onChange={(e) => setFormMaterials(e.target.value)}
                      placeholder="e.g. 100% GOTS Organic Cotton, FSC Birch"
                      className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#848c82] uppercase tracking-wider text-[9px]">Display Image URL</label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full p-3 bg-[#faf8f5] border border-[#e9e3db] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#5c6a5a] font-mono text-[10px]"
                      required
                    />
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#5c6a5a] hover:bg-[#4d594b] text-white font-bold py-3.5 rounded-xl transition-all text-center cursor-pointer shadow-xs hover:scale-[1.01]"
                    >
                      {editingId ? 'Save Configurations' : 'Confirm & Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="border border-[#e9e3db] hover:bg-[#faf8f5] font-bold text-[#6d756b] px-4 rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Product inventory list card */}
          <div className="bg-white border border-[#e9e3db] rounded-3xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#e9e3db]/60 text-[#848c82] uppercase font-bold text-[9px] tracking-wider">
                    <th className="py-4.5 px-6">Organic Product Metadata</th>
                    <th className="py-4.5 px-4">Category</th>
                    <th className="py-4.5 px-4">Sale Price</th>
                    <th className="py-4.5 px-6 text-center">Active Depot Stock</th>
                    <th className="py-4.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f1ea]">
                  {getFilteredCatalog().length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                        No organic products match your current search/filters criteria.
                      </td>
                    </tr>
                  ) : (
                    getFilteredCatalog().map(prod => (
                      <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4.5 px-6">
                          <div className="flex gap-4 items-center">
                            <img 
                              src={prod.image} 
                              alt={prod.name} 
                              className="w-12 h-12 rounded-xl object-cover border border-[#e9e3db] shadow-2xs"
                              referrerPolicy="no-referrer"
                            />
                            <div className="max-w-xs space-y-0.5">
                              <span className="font-bold text-[#323631] text-sm block group-hover:text-[#5c6a5a] transition-all leading-snug">{prod.name}</span>
                              <span className="text-[10px] text-[#848c82] block truncate font-medium">{prod.materials}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4.5 px-4">
                          <span className="bg-[#5c6a5a]/5 text-[#5c6a5a] border border-[#5c6a5a]/10 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-4.5 px-4">
                          <div className="space-y-0.5">
                            <span className="font-bold text-sm text-[#323631] font-mono">${prod.price.toFixed(2)}</span>
                            {prod.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through block font-mono">${prod.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4.5 px-6">
                          <div className="flex items-center justify-center gap-2.5">
                            <button
                              onClick={() => handleAdjustStock(prod.id, -1)}
                              className="w-7 h-7 rounded-full border border-[#e9e3db] hover:border-black bg-[#faf8f5] hover:bg-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer shadow-2xs"
                              title="Decrease Stock"
                            >
                              -
                            </button>
                            
                            <span className={`font-bold font-mono text-sm min-w-[30px] text-center ${
                              prod.stock <= 5 ? 'text-[#bf826b] underline decoration-wavy font-extrabold' : 'text-gray-800'
                            }`}>
                              {prod.stock}
                            </span>

                            <button
                              onClick={() => handleAdjustStock(prod.id, 1)}
                              className="w-7 h-7 rounded-full border border-[#e9e3db] hover:border-black bg-[#faf8f5] hover:bg-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer shadow-2xs"
                              title="Increase Stock"
                            >
                              +
                            </button>
                          </div>
                          {prod.stock <= 5 && (
                            <span className="text-[9px] font-bold text-[#bf826b] block text-center mt-1 uppercase tracking-wider animate-pulse">Low Stock Warning</span>
                          )}
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleStartEdit(prod)}
                              className="p-2.5 rounded-xl border border-gray-200 hover:border-[#5c6a5a] text-[#5c6a5a] hover:bg-gray-50 transition-all cursor-pointer"
                              title="Edit Product Details"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(prod.id)}
                              className="p-2.5 rounded-xl border border-red-100 hover:border-red-400 text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete SKU"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Grid Content: Orders Dispatch */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in" id="admin-orders-view">
          
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div>
              <h3 className="font-sans font-bold text-base text-[#323631]">Order Fulfillment Registry</h3>
              <p className="text-xs text-[#848c82]">Coordinate eco-friendly parcel delivery schedules, print compostable labels, and update shipping logs.</p>
            </div>
            
            {/* Live Search by ID */}
            <div className="relative shrink-0 w-full md:w-80">
              <Search className="absolute left-3.5 h-4 w-4 text-[#848c82]" />
              <input
                type="text"
                placeholder="Search orders by ID, email, items..."
                value={ordersSearch}
                onChange={(e) => setOrdersSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#faf8f5] border border-[#e9e3db] rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="bg-white border border-[#e9e3db] rounded-3xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#e9e3db]/60 text-[#848c82] uppercase font-bold text-[9px] tracking-wider">
                    <th className="py-4.5 px-6">Order ID</th>
                    <th className="py-4.5 px-4">Parent Customer</th>
                    <th className="py-4.5 px-4">Purchased Items</th>
                    <th className="py-4.5 px-4">Financial Amount</th>
                    <th className="py-4.5 px-4 text-center">Fulfillment State</th>
                    <th className="py-4.5 px-6 text-right">Quick Dispatch Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f1ea]">
                  {getFilteredOrders().length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                        No orders match your active search terms.
                      </td>
                    </tr>
                  ) : (
                    getFilteredOrders().map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4.5 px-6 font-mono font-bold text-[#323631] text-xs">
                          {order.id}
                          <span className="block text-[9px] font-bold text-[#bf826b] font-sans mt-1">🗓️ {order.date}</span>
                        </td>
                        <td className="py-4.5 px-4 font-semibold text-[#6d756b]">
                          {order.customer}
                        </td>
                        <td className="py-4.5 px-4 max-w-xs font-medium text-[#323631] truncate">
                          {order.items}
                        </td>
                        <td className="py-4.5 px-4 font-bold text-[#323631] font-mono text-sm">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-4.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider inline-block ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <div className="flex justify-end items-center gap-2">
                            
                            {/* Printer Icon for compostable label printing */}
                            <button
                              onClick={() => alert(`Generating certified compostable shipping sticker for ${order.id}. Routing via zero-emission cargo courier...`)}
                              className="p-2 rounded-lg border border-gray-200 hover:border-[#bf826b] hover:bg-amber-50/30 text-gray-500 hover:text-[#bf826b] transition-all cursor-pointer"
                              title="Print Compostable Courier Label"
                            >
                              <Printer className="h-3.5 w-3.5" />
                            </button>

                            <select
                              value={order.status}
                              onChange={(e) => handleChangeOrderStatus(order.id, e.target.value as any)}
                              className={`bg-white border rounded-xl px-2.5 py-1.5 text-xs font-bold text-center cursor-pointer focus:outline-hidden ${
                                order.status === 'Delivered' ? 'border-green-300 text-green-800 bg-green-50/50' :
                                order.status === 'Shipped' ? 'border-blue-300 text-blue-800 bg-blue-50/50' :
                                order.status === 'Cancelled' ? 'border-red-300 text-red-800 bg-red-50/50' :
                                'border-amber-300 text-amber-800 bg-amber-50/50'
                              }`}
                            >
                              <option value="Processing">⏳ Processing</option>
                              <option value="Shipped">🚚 Shipped</option>
                              <option value="Delivered">✓ Delivered</option>
                              <option value="Cancelled">✗ Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Grid Content: Active Registries */}
      {activeTab === 'registries' && (
        <div className="space-y-6 animate-fade-in" id="admin-registries-view">
          
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div>
              <h3 className="font-sans font-bold text-base text-[#323631]">Active Registries & Baby Milestones</h3>
              <p className="text-xs text-[#848c82]">Track custom smart registry configurations created by active parents and observe ongoing stylistic trends.</p>
            </div>
            
            {/* Live Search by Registry details */}
            <div className="relative shrink-0 w-full md:w-80">
              <Search className="absolute left-3.5 h-4 w-4 text-[#848c82]" />
              <input
                type="text"
                placeholder="Search registries by ID, parents, theme..."
                value={registriesSearch}
                onChange={(e) => setRegistriesSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#faf8f5] border border-[#e9e3db] rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="bg-white border border-[#e9e3db] rounded-3xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#e9e3db]/60 text-[#848c82] uppercase font-bold text-[9px] tracking-wider">
                    <th className="py-4.5 px-6">Registry ID</th>
                    <th className="py-4.5 px-4">Parent Member Email</th>
                    <th className="py-4.5 px-4">Milestone Category</th>
                    <th className="py-4.5 px-4">Nursery Theme Palette</th>
                    <th className="py-4.5 px-4 text-center">Items Saved</th>
                    <th className="py-4.5 px-6 text-right">Registration State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f1ea]">
                  {getFilteredRegistries().length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                        No registries match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    getFilteredRegistries().map(reg => (
                      <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4.5 px-6 font-mono font-bold text-[#bf826b]">
                          {reg.id}
                        </td>
                        <td className="py-4.5 px-4 font-semibold text-[#6d756b]">
                          {reg.parent}
                        </td>
                        <td className="py-4.5 px-4">
                          <span className="bg-[#bf826b]/5 border border-[#bf826b]/10 text-[#bf826b] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                            {reg.babyStage}
                          </span>
                        </td>
                        <td className="py-4.5 px-4 font-bold text-[#5c6a5a]">
                          🎨 {reg.theme}
                        </td>
                        <td className="py-4.5 px-4 font-bold text-center font-mono text-[#323631]">
                          {reg.itemsCount} Items Included
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <select
                            value={reg.status}
                            onChange={(e) => handleChangeRegistryStatus(reg.id, e.target.value as any)}
                            className="bg-white border border-[#e9e3db] rounded-xl px-2.5 py-1.5 text-xs font-bold cursor-pointer focus:outline-hidden hover:border-[#6d756b] transition-all"
                          >
                            <option value="Draft">Draft Mode</option>
                            <option value="Active">⭐ Active Registry</option>
                            <option value="Completed">✓ Gift Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
