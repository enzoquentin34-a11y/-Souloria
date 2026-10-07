import React, { useState } from 'react';
import { Bot, X, Check, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface BotInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'FR' | 'EN';
}

export const BotInviteModal: React.FC<BotInviteModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [selectedServer, setSelectedServer] = useState('Mon Serveur Discord FR');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const permissions = [
    'Voir les salons textuels & vocaux',
    'Créer des invitations instantanées',
    'Gérer les rôles (pour accréditation)',
    'Envoyer des messages & intégrer des liens',
    'Utiliser les commandes d\'application (/)'
  ];

  const handleAuthorize = () => {
    sounds.playClick();
    setIsAuthorizing(true);

    setTimeout(() => {
      setIsAuthorizing(false);
      setIsSuccess(true);
      sounds.playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 }
      });
    }, 1800);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#1e202e] border border-[#5865F2]/40 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Bot Ajouté avec Succès !
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Le bot Join4Join est désormais actif sur <strong>{selectedServer}</strong>. Vous pouvez taper <code>/j4j boost</code> pour lancer une campagne directement.
            </p>
            <button
              onClick={handleDone}
              className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all"
            >
              Terminer
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-[#5865F2]/30">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Ajouter Join4Join Bot à Discord
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Une application souhaite accéder à votre compte Discord
              </p>
            </div>

            {/* Server selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Ajouter au serveur :
              </label>
              <select
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="Mon Serveur Discord FR">Mon Serveur Discord FR</option>
                <option value="Cyber Gaming Club">Cyber Gaming Club</option>
                <option value="Lofi & Chill Lounge">Lofi & Chill Lounge</option>
                <option value="Dev Project France">Dev Project France</option>
              </select>
            </div>

            {/* Permissions list */}
            <div className="bg-[#11131c] p-4 rounded-2xl border border-white/5 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                Cette application pourra :
              </span>
              <ul className="space-y-2 text-xs text-gray-300">
                {permissions.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authorize button */}
            {isAuthorizing ? (
              <div className="py-3 text-center text-xs text-gray-300 flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#5865F2] border-t-transparent rounded-full animate-spin" />
                <span>Autorisation Discord en cours...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAuthorize}
                  className="py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-md shadow-[#5865F2]/30"
                >
                  Autoriser
                </button>
              </div>
            )}

            <p className="text-[10px] text-gray-500 text-center mt-4">
              En autorisant, vous acceptez les conditions de service de Join4Join.xyz.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
