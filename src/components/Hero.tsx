import React from 'react';
import { 
  Rocket, 
  Coins, 
  Bot, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeroProps {
  onExploreClick: () => void;
  onCampaignClick: () => void;
  onBotClick: () => void;
  onAutoFarmClick: () => void;
  lang: 'FR' | 'EN';
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCampaignClick,
  onBotClick,
  onAutoFarmClick,
  lang
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-18 border-b border-white/5 bg-radial from-[#181c2b]/60 via-[#0b0d13] to-[#0b0d13]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#5865F2]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#8c97ff] text-xs font-semibold backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#5865F2] animate-ping" />
            <span>{lang === 'FR' ? '🔥 Réseau de Découverte Discord #1 depuis 2019' : '🔥 #1 Discord Growth Network Since 2019'}</span>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-400 font-bold">100% Membres Réels</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            {lang === 'FR' ? (
              <>
                Faites grandir votre serveur <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#5865F2] via-[#8c97ff] to-cyan-400 bg-clip-text text-transparent">
                  sans bots ni faux comptes.
                </span>
              </>
            ) : (
              <>
                Grow your Discord server <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#5865F2] via-[#8c97ff] to-cyan-400 bg-clip-text text-transparent">
                  with genuine active members.
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {lang === 'FR' 
              ? 'Rejoignez des communautés vérifiées pour accumuler des pièces, puis utilisez votre solde pour propulser votre propre serveur auprès de milliers de membres passionnés.'
              : 'Join verified communities to earn coins, then launch promotion campaigns to scale your own Discord server with real targeted users.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onCampaignClick();
              }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#4752c4] text-white font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-[#5865F2]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Rocket className="w-5 h-5 text-white" />
              <span>{lang === 'FR' ? 'Booster mon Serveur' : 'Boost My Server'}</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
            </button>

            <button
              onClick={() => {
                sounds.playCoin();
                onExploreClick();
              }}
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer group"
            >
              <Coins className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>{lang === 'FR' ? 'Gagner des Pièces (+0.75)' : 'Earn Coins (+0.75)'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onAutoFarmClick();
              }}
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm border border-amber-500/30 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Auto-Farm</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onBotClick();
              }}
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-sm border border-white/5 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#5865F2]" />
              <span>{lang === 'FR' ? 'Bot Officiel' : 'Official Bot'}</span>
            </button>
          </div>

          {/* Safe badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Connexion Discord OAuth2 Sécurisée</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Filtre Anti-Alt & Protection 4 jours</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#5865F2]" />
              <span>Crédit Instantané</span>
            </span>
          </div>

        </div>

        {/* Global Key Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-[#5865F2]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                {lang === 'FR' ? 'Membres Rejoints' : 'Members Joined'}
              </span>
              <Users className="w-4 h-4 text-[#5865F2]" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono">
              2,489,120+
            </p>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +1,420 aujourd'hui
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-[#5865F2]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                {lang === 'FR' ? 'Serveurs Actifs' : 'Active Servers'}
              </span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono">
              18,420+
            </p>
            <span className="text-[11px] text-gray-400 font-medium mt-1 block">
              Tous genres & langues
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400/80">
                {lang === 'FR' ? 'Pièces Distribuées' : 'Coins Rewarded'}
              </span>
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              3,890,500+
            </p>
            <span className="text-[11px] text-amber-400/80 font-medium mt-1 block">
              100% garanti équitable
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                {lang === 'FR' ? 'Délai de Vérification' : 'Verification Speed'}
              </span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              &lt; 2.5s
            </p>
            <span className="text-[11px] text-gray-400 font-medium mt-1 block">
              Validation automatique OAuth2
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
