import React, { useState } from 'react';
import { ShoppingBag, Gift, Baby, Sprout, Menu, X, User, LogOut, ChevronDown, Mail } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (section: 'home' | 'shop' | 'about' | 'contact') => void;
  onOpenRegistry: () => void;
  onOpenUserDashboard: () => void;
  onOpenAdminDashboard: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // Login integration
  loggedInUser: string | null;
  loggedInBaby: string | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  onScrollToSection,
  onOpenRegistry,
  onOpenUserDashboard,
  onOpenAdminDashboard,
  activeTab,
  setActiveTab,
  loggedInUser,
  loggedInBaby,
  onOpenLogin,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (section: 'home' | 'shop' | 'about' | 'contact') => {
    onScrollToSection(section);
    setMobileMenuOpen(false);
  };

  const handleRegistryClick = () => {
    onOpenRegistry();
    setMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    onOpenUserDashboard();
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    onOpenAdminDashboard();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8f5]/80 backdrop-blur-xl border-b border-[#e9e3db]/60 transition-all duration-300" id="store-header">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="header-main-nav">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group cursor-pointer text-left focus:outline-hidden relative z-10"
            id="logo-button"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#faf8f5] to-[#f0eae1] border border-[#e4ded5] text-[#5c6a5a] group-hover:text-[#faf8f5] group-hover:from-[#5c6a5a] group-hover:to-[#6c7b6a] group-hover:border-[#5c6a5a] transition-all duration-500 ease-out shadow-[0_2px_8px_-3px_rgba(92,106,90,0.12)] group-hover:shadow-[0_4px_16px_-2px_rgba(92,106,90,0.25)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sprout className="h-5 w-5 transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl text-[#323631] tracking-tight leading-none flex items-center gap-0.5 animate-pulse">
                baby-shop
                <span className="text-[#bf826b] font-serif font-light text-xl leading-none">.</span>
              </span>
              <span className="font-sans font-bold tracking-[0.2em] text-[8px] uppercase text-[#848c82] mt-1.5 leading-none group-hover:text-[#5c6a5a] transition-colors duration-300">
                ORGANIC INFANT
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" id="navigation-links">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-sans text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 relative py-2 cursor-pointer focus:outline-hidden ${
                activeTab === 'home' 
                  ? 'text-[#5c6a5a]' 
                  : 'text-[#6d756b] hover:text-[#323631]'
              }`}
              id="nav-home"
            >
              <span>Home</span>
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5c6a5a] rounded-full animate-scale-in" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`font-sans text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 relative py-2 cursor-pointer focus:outline-hidden ${
                activeTab === 'shop' 
                  ? 'text-[#5c6a5a]' 
                  : 'text-[#6d756b] hover:text-[#323631]'
              }`}
              id="nav-shop"
            >
              <span>Shop</span>
              {activeTab === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5c6a5a] rounded-full animate-scale-in" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`font-sans text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 relative py-2 cursor-pointer focus:outline-hidden ${
                activeTab === 'about' 
                  ? 'text-[#5c6a5a]' 
                  : 'text-[#6d756b] hover:text-[#323631]'
              }`}
              id="nav-about"
            >
              <span>About</span>
              {activeTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5c6a5a] rounded-full animate-scale-in" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`font-sans text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 relative py-2 cursor-pointer focus:outline-hidden ${
                activeTab === 'contact' 
                  ? 'text-[#5c6a5a]' 
                  : 'text-[#6d756b] hover:text-[#323631]'
              }`}
              id="nav-contact"
            >
              <span>Contact</span>
              {activeTab === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5c6a5a] rounded-full animate-scale-in" />
              )}
            </button>
            
            <button
              onClick={handleRegistryClick}
              className={`flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 relative py-2 cursor-pointer focus:outline-hidden ${
                activeTab === 'registry' 
                  ? 'text-[#5c6a5a]' 
                  : 'text-[#6d756b] hover:text-[#323631]'
              }`}
              id="nav-registry"
            >
              <Gift className="h-3.5 w-3.5 text-[#bf826b]" />
              <span>Registry</span>
              {activeTab === 'registry' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#bf826b] rounded-full animate-scale-in" />
              )}
            </button>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-4 relative z-10" id="header-actions">
            
            {/* Login / Profile Control */}
            <div className="relative">
              {loggedInUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 bg-[#f1ebe1]/60 hover:bg-[#e7decb] text-[#5c6a5a] text-xs font-bold px-4 py-2.5 rounded-full border border-[#e9e3db]/40 transition-all cursor-pointer focus:outline-hidden"
                    id="user-profile-btn"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#bf826b] text-white flex items-center justify-center text-[10px] font-bold">
                      {loggedInUser.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[80px] truncate">
                      {loggedInBaby ? loggedInBaby : 'Parent'}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#5c6a5a]" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#faf8f5] rounded-2xl border border-[#e9e3db] shadow-xl py-2 z-50 animate-fade-in" id="user-dropdown-menu">
                      <div className="px-4 py-2 border-b border-[#e9e3db]/60">
                        <p className="text-[10px] text-[#848c82] uppercase tracking-wider font-bold">Logged in as</p>
                        <p className="text-xs font-semibold text-[#323631] truncate mt-0.5">{loggedInUser}</p>
                        {loggedInBaby && (
                          <p className="text-[10px] text-[#bf826b] font-medium mt-1">Baby: {loggedInBaby}</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          onOpenUserDashboard();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-[#5c6a5a] hover:bg-[#f5f1ea] flex items-center gap-2 transition-all cursor-pointer border-b border-[#e9e3db]/40 font-semibold"
                      >
                        <Baby className="h-3.5 w-3.5" />
                        <span>My Nest Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenAdminDashboard();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-[#5c6a5a] hover:bg-[#f5f1ea] flex items-center gap-2 transition-all cursor-pointer border-b border-[#e9e3db]/40 font-semibold"
                      >
                        <Sprout className="h-3.5 w-3.5" />
                        <span>Admin Panel</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 bg-[#f1ebe1]/60 hover:bg-[#e7decb] text-[#5c6a5a] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#e9e3db]/40 transition-all cursor-pointer focus:outline-hidden"
                  id="action-login-btn"
                >
                  <User className="h-3.5 w-3.5 text-[#5c6a5a]" />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-3 rounded-full border border-[#e9e3db]/60 hover:border-[#5c6a5a]/50 bg-[#faf8f5]/80 hover:bg-white text-[#323631] hover:text-[#5c6a5a] transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer focus:outline-hidden"
              id="cart-indicator-btn"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-4.5 w-4.5 text-[#5c6a5a]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#bf826b] text-white text-[9px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#faf8f5] shadow-xs animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-full border border-[#e9e3db]/60 text-[#323631] hover:bg-white md:hidden transition-all duration-300 cursor-pointer focus:outline-hidden"
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Navigation Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#faf8f5] border-b border-[#e9e3db] shadow-xl md:hidden overflow-hidden animate-fade-in" id="mobile-nav-panel">
          <div className="px-6 py-6 space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                activeTab === 'home' 
                  ? 'bg-[#5c6a5a] text-white' 
                  : 'text-[#6d756b] hover:bg-[#f1ebe1]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                activeTab === 'shop' 
                  ? 'bg-[#5c6a5a] text-white' 
                  : 'text-[#6d756b] hover:bg-[#f1ebe1]'
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                activeTab === 'about' 
                  ? 'bg-[#5c6a5a] text-white' 
                  : 'text-[#6d756b] hover:bg-[#f1ebe1]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                activeTab === 'contact' 
                  ? 'bg-[#5c6a5a] text-white' 
                  : 'text-[#6d756b] hover:bg-[#f1ebe1]'
              }`}
            >
              Contact
            </button>

            <button
              onClick={handleRegistryClick}
              className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${
                activeTab === 'registry' 
                  ? 'bg-[#bf826b] text-white' 
                  : 'text-[#6d756b] hover:bg-[#f1ebe1]'
              }`}
            >
              <Gift className="h-4 w-4" />
              Registry
            </button>

            {loggedInUser && (
              <>
                <button
                  onClick={handleDashboardClick}
                  className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${
                    activeTab === 'dashboard' 
                      ? 'bg-[#5c6a5a] text-white' 
                      : 'text-[#6d756b] hover:bg-[#f1ebe1]'
                  }`}
                >
                  <Baby className="h-4 w-4" />
                  Dashboard
                </button>

                <button
                  onClick={handleAdminClick}
                  className={`w-full text-left font-sans text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-2.5 transition-all ${
                    activeTab === 'admin' 
                      ? 'bg-[#5c6a5a] text-white' 
                      : 'text-[#6d756b] hover:bg-[#f1ebe1]'
                  }`}
                >
                  <Sprout className="h-4 w-4" />
                  Admin Panel
                </button>
              </>
            )}

            <div className="pt-4 border-t border-[#e9e3db]/60">
              {loggedInUser ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-[#f5f1ea] rounded-xl flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#848c82]">Active parent:</span>
                    <span className="text-xs font-semibold text-[#323631] truncate">{loggedInUser}</span>
                    {loggedInBaby && (
                      <span className="text-[10px] text-[#bf826b] font-medium mt-0.5">Baby: {loggedInBaby}</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-[#bf826b] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#a06d57] transition-all flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In / Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
