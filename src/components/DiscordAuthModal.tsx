import React, { useState } from 'react';
import { User, X, Check, ShieldCheck, Flame, Coins, RotateCcw } from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface DiscordAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
  lang: 'FR' | 'EN';
}

export const DiscordAuthModal: React.FC<DiscordAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onResetData,
  lang
}) => {
  const [username, setUsername] = useState(user.username);
  const [discriminator, setDiscriminator] = useState(user.discriminator);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    onUpdateUser({
      username: username.trim() || 'Enzo',
      discriminator: discriminator.trim() || '0001'
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#181a24] border border-[#5865F2]/40 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#5865F2]" />
            <h3 className="text-base font-bold text-white">
              Profil Discord & Paramètres
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Avatar Selector */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#5865F2]"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#181a24]" />
          </div>

          <div className="flex items-center gap-2">
            {avatarOptions.map((av, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onUpdateUser({ avatar: av });
                }}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                  user.avatar === av ? 'border-[#5865F2] scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={av} alt="Avatar" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Pseudo Discord
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#11131c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Tag #
              </label>
              <input
                type="text"
                value={discriminator}
                onChange={(e) => setDiscriminator(e.target.value)}
                className="w-full bg-[#11131c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#5865F2]"
              />
            </div>
          </div>

          <div className="bg-[#11131c] p-3 rounded-2xl border border-white/5 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Statut OAuth2 :</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Connecté (Discord v10)
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Série actuelle :</span>
              <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> {user.streakDays} jours
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Solde en compte :</span>
              <span className="text-white font-mono font-bold">{user.coins.toFixed(2)} COINS</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
            <span>{isSaved ? 'Modifications Enregistrées !' : 'Enregistrer le Profil'}</span>
          </button>
        </form>

        {/* Reset / Clean storage button */}
        <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
          <span className="text-gray-500">Réinitialiser les données locales :</span>
          <button
            onClick={() => {
              if (confirm('Voulez-vous réinitialiser le solde et les serveurs rejoints aux valeurs par défaut ?')) {
                onResetData();
                onClose();
              }
            }}
            className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>

      </div>
    </div>
  );
};
