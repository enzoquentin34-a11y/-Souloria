import React, { useState } from 'react';
import { 
  Compass, 
  Coins, 
  PlusCircle, 
  Zap, 
  Gift, 
  ShoppingBag, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  lang: 'FR' | 'EN';
  setLang: (lang: 'FR' | 'EN') => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  soundEnabled,
  setSoundEnabled,
  lang,
  setLang,
  onOpenWallet,
  onOpenProfile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: lang === 'FR' ? 'Découvrir' : 'Explore', icon: Compass },
    { id: 'campaigns', label: lang === 'FR' ? 'Booster Serveur' : 'Grow Server', icon: PlusCircle },
    { id: 'autofarm', label: 'Auto-Farm', icon: Zap, badge: 'AUTO' },
    { id: 'rewards', label: lang === 'FR' ? 'Récompenses' : 'Rewards', icon: Gift },
    { id: 'shop', label: lang === 'FR' ? 'Boutique' : 'Shop', icon: ShoppingBag },
    { id: 'bot-api', label: 'Bot & API', icon: Terminal }
  ];

  const handleTabClick = (id: string) => {
    sounds.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sounds.enabled = next;
    setSoundEnabled(next);
    if (next) sounds.playCoin();
  };

  const toggleLang = () => {
    sounds.playClick();
    setLang(lang === 'FR' ? 'EN' : 'FR');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f111a]/95 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => handleTabClick('explore')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5865F2] via-[#6d79f8] to-[#99aab5] flex items-center justify-center shadow-lg shadow-[#5865F2]/25 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                Join<span className="text-[#5865F2]">4</span>Join
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
                .xyz
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Désactiver le son' : 'Activer le son'}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors"
              title="Changer de langue"
            >
              <span>{lang === 'FR' ? '🇫🇷 FR' : '🇬🇧 EN'}</span>
            </button>

            {/* Coin Balance Badge */}
            <button
              onClick={() => {
                sounds.playCoin();
                onOpenWallet();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/30 hover:border-amber-400 transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black shadow-sm shadow-amber-500/50 group-hover:rotate-12 transition-transform">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-bold leading-none">
                  Solde
                </span>
                <span className="text-sm font-extrabold text-amber-300 font-mono leading-tight">
                  {user.coins.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Discord User Avatar & Status */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenProfile();
              }}
              className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover border border-[#5865F2]/50"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0f111a]" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-semibold text-white leading-tight">
                  {user.username}
                </span>
                <span className="text-[10px] text-gray-400 leading-tight">
                  #{user.discriminator}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 lg:hidden text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-white/5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-[#5865F2] text-white' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
