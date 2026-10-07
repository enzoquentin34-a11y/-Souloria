import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Coins, 
  Check, 
  Zap, 
  CreditCard, 
  Send, 
  History, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoinPackage, TransactionHistory, UserProfile } from '../types';
import { COIN_PACKAGES } from '../data/initialData';
import { sounds } from '../utils/sound';

interface CoinShopProps {
  user: UserProfile;
  transactions: TransactionHistory[];
  onPurchasePackage: (pkg: CoinPackage) => void;
  onTransferCoins: (recipient: string, amount: number) => { success: boolean; error?: string };
  lang: 'FR' | 'EN';
}

export const CoinShop: React.FC<CoinShopProps> = ({
  user,
  transactions,
  onPurchasePackage,
  onTransferCoins,
  lang
}) => {
  const [selectedPkg, setSelectedPkg] = useState<CoinPackage | null>(null);
  const [isProcessingBuy, setIsProcessingBuy] = useState(false);

  // Transfer form state
  const [recipientTag, setRecipientTag] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(10);
  const [transferStatus, setTransferStatus] = useState<{ msg: string; isError: boolean } | null>(null);

  const handleBuyClick = (pkg: CoinPackage) => {
    sounds.playClick();
    setSelectedPkg(pkg);
  };

  const confirmPurchase = () => {
    if (!selectedPkg) return;
    sounds.playClick();
    setIsProcessingBuy(true);

    setTimeout(() => {
      setIsProcessingBuy(false);
      sounds.playSuccess();
      sounds.playCoin();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onPurchasePackage(selectedPkg);
      setSelectedPkg(null);
    }, 1500);
  };

  const handleSendTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();

    if (!recipientTag.trim()) {
      setTransferStatus({ msg: 'Veuillez saisir le tag Discord ou l\'identifiant du destinataire.', isError: true });
      return;
    }
    if (transferAmount <= 0) {
      setTransferStatus({ msg: 'Le montant de transfert doit être supérieur à 0.', isError: true });
      return;
    }
    if (user.coins < transferAmount) {
      setTransferStatus({ msg: `Solde insuffisant : vous disposez de ${user.coins.toFixed(2)} pièces.`, isError: true });
      return;
    }

    const res = onTransferCoins(recipientTag, transferAmount);
    if (res.success) {
      sounds.playCoin();
      setTransferStatus({ msg: `✅ ${transferAmount} pièces envoyées avec succès à ${recipientTag} !`, isError: false });
      setRecipientTag('');
      setTransferAmount(10);
    } else {
      setTransferStatus({ msg: res.error || 'Erreur lors du transfert.', isError: true });
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{lang === 'FR' ? 'Boutique & Recharges' : 'Store & Top-up'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'FR' ? 'Achetez des Pièces & Accélérez votre Croissance' : 'Buy Coins & Scale Fast'}
        </h2>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          {lang === 'FR'
            ? 'Vous n\'avez pas le temps de rejoindre des serveurs manuellement ? Commandez un pack de pièces et recevez vos membres instantanément.'
            : 'Skip manual joining. Top-up coins instantly to launch high-volume member campaigns for your server.'}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COIN_PACKAGES.map((pkg) => {
          return (
            <div
              key={pkg.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#181b2e] to-[#11131f] border-[#5865F2] shadow-xl shadow-[#5865F2]/15 scale-[1.02]'
                  : 'bg-[#11131c] border-white/5 hover:border-white/20'
              }`}
            >
              {pkg.tag && (
                <span className={`absolute top-4 right-4 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  pkg.popular
                    ? 'bg-[#5865F2] text-white shadow-md'
                    : 'bg-white/10 text-gray-300'
                }`}>
                  {pkg.tag}
                </span>
              )}

              <div>
                <h3 className="text-base font-extrabold text-white mb-2">
                  {pkg.name}
                </h3>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-black text-amber-300 font-mono">
                    {pkg.coins}
                  </span>
                  <span className="text-xs text-amber-400 font-bold uppercase">
                    Coins
                  </span>
                  {pkg.bonus > 0 && (
                    <span className="text-[11px] font-bold text-emerald-400 ml-1.5 font-mono">
                      (+{pkg.bonus} bonus)
                    </span>
                  )}
                </div>

                <div className="text-2xl font-black text-white font-mono mb-5 pb-5 border-b border-white/5">
                  {pkg.priceEur.toFixed(2)}€
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mb-6 text-xs text-gray-300">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleBuyClick(pkg)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pkg.popular
                    ? 'bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-lg shadow-[#5865F2]/25'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Recharger ({pkg.priceEur.toFixed(2)}€)</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Transfer & History Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Transfer Form (6 cols) */}
        <div className="lg:col-span-6 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4.5 h-4.5 text-[#5865F2]" />
                <span>Transférer des Pièces à un Ami</span>
              </h3>
              <span className="text-[11px] text-gray-400 font-mono">
                Solde: {user.coins.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
              Offrez ou échangez des pièces instantanément avec n'importe quel utilisateur Join4Join grâce à son pseudo Discord ou identifiant.
            </p>

            <form onSubmit={handleSendTransfer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Pseudo Discord ou ID du Destinataire
                </label>
                <input
                  type="text"
                  value={recipientTag}
                  onChange={(e) => setRecipientTag(e.target.value)}
                  placeholder="Ex: @Kuro#1029 ou 782910482910"
                  className="w-full bg-[#0b0d13] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5865F2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Montant en pièces (Coins)
                </label>
                <input
                  type="number"
                  min="1"
                  max={Math.floor(user.coins)}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  className="w-full bg-[#0b0d13] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#5865F2]"
                />
              </div>

              {transferStatus && (
                <div className={`p-3 rounded-xl text-xs ${
                  transferStatus.isError
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                }`}>
                  {transferStatus.msg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#5865F2]/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer {transferAmount} Coins</span>
              </button>
            </form>
          </div>
        </div>

        {/* History (6 cols) */}
        <div className="lg:col-span-6 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <History className="w-4.5 h-4.5 text-amber-400" />
              <span>Historique des Transactions</span>
            </h3>
            <span className="text-[10px] text-gray-500 uppercase font-mono">30 derniers jours</span>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0b0d13] border border-white/5 text-xs"
              >
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>{tx.title}</span>
                    {tx.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white/10 text-gray-300">
                        {tx.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500">{tx.date}</span>
                </div>

                <div className={`font-mono font-bold ${
                  tx.type === 'spend' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {tx.type === 'spend' ? '-' : '+'}{tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Simulated Checkout Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#181a24] border border-[#5865F2]/40 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5865F2] to-amber-400 flex items-center justify-center text-black mx-auto mb-3 shadow-lg">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Commander le {selectedPkg.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Crédit instantané de {selectedPkg.coins + selectedPkg.bonus} Coins sur votre compte Discord.
              </p>
            </div>

            <div className="bg-[#11131c] p-4 rounded-2xl border border-white/5 space-y-2 text-xs mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Pièces de base :</span>
                <span className="text-white font-mono">{selectedPkg.coins} Coins</span>
              </div>
              {selectedPkg.bonus > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Bonus exclusif :</span>
                  <span className="font-mono">+{selectedPkg.bonus} Coins</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-white/5 font-bold text-white text-sm">
                <span>Total à régler :</span>
                <span className="text-amber-400 font-mono">{selectedPkg.priceEur.toFixed(2)} €</span>
              </div>
            </div>

            {isProcessingBuy ? (
              <div className="py-4 text-center text-xs text-gray-300 flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#5865F2] border-t-transparent rounded-full animate-spin" />
                <span>Validation du paiement sécurisé...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedPkg(null)}
                  className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmPurchase}
                  className="py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all shadow-md shadow-[#5865F2]/25 cursor-pointer"
                >
                  Payer & Créditer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
