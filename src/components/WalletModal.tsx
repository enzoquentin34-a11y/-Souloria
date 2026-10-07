import React from 'react';
import { Coins, X, ArrowUpRight, Plus, Sparkles, Send } from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigateToShop: () => void;
  onNavigateToCampaigns: () => void;
  lang: 'FR' | 'EN';
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  user,
  onNavigateToShop,
  onNavigateToCampaigns,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#151722] border border-[#5865F2]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Portefeuille Join4Join
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance Display */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#1a1c29] to-[#12141f] border border-amber-500/30 text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-amber-400/80 font-bold">
            Solde Disponible
          </span>
          <div className="text-4xl font-black text-amber-300 font-mono mt-1 mb-1">
            {user.coins.toFixed(2)}
          </div>
          <span className="text-xs text-gray-400">
            Équivalent à environ <strong className="text-white">{Math.floor(user.coins)}</strong> nouveaux membres sur votre serveur
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="bg-[#0c0e17] p-3 rounded-xl border border-white/5">
            <span className="text-gray-400 block mb-0.5">Serveurs Rejoints</span>
            <span className="text-base font-bold text-white font-mono">{user.joinedServersCount}</span>
          </div>
          <div className="bg-[#0c0e17] p-3 rounded-xl border border-white/5">
            <span className="text-gray-400 block mb-0.5">Gains Parrainage</span>
            <span className="text-base font-bold text-amber-400 font-mono">+{user.referralEarnings.toFixed(2)}</span>
          </div>
        </div>

        {/* Fast Actions */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              onNavigateToShop();
            }}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Recharger des pièces (Boutique)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              onNavigateToCampaigns();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Dépenser dans une campagne</span>
          </button>
        </div>

      </div>
    </div>
  );
};
