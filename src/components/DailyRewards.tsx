import React, { useState } from 'react';
import { 
  Gift, 
  Calendar, 
  Sparkles, 
  Flame, 
  Share2, 
  Copy, 
  Check, 
  Coins, 
  Users, 
  Award,
  Dice5,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface DailyRewardsProps {
  user: UserProfile;
  onClaimDaily: (amount: number, newStreak: number) => void;
  onSpinWheel: (amount: number) => void;
  lang: 'FR' | 'EN';
}

export const DailyRewards: React.FC<DailyRewardsProps> = ({
  user,
  onClaimDaily,
  onSpinWheel,
  lang
}) => {
  const [copiedRef, setCopiedRef] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  // 7 days streak plan
  const streakDaysData = [
    { day: 1, reward: 1.0, label: 'Jour 1' },
    { day: 2, reward: 1.5, label: 'Jour 2' },
    { day: 3, reward: 2.0, label: 'Jour 3' },
    { day: 4, reward: 2.5, label: 'Jour 4' },
    { day: 5, reward: 3.5, label: 'Jour 5' },
    { day: 6, reward: 5.0, label: 'Jour 6' },
    { day: 7, reward: 10.0, label: 'Jour 7', badge: 'VIP +10' },
  ];

  const currentStreak = user.streakDays;
  const todayIndex = (currentStreak % 7);
  const currentDayReward = streakDaysData[todayIndex]?.reward || 1.0;

  const handleClaim = () => {
    sounds.playCoin();
    sounds.playSuccess();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });

    const nextStreak = currentStreak + 1;
    onClaimDaily(currentDayReward, nextStreak);
  };

  const handleCopyRef = () => {
    sounds.playClick();
    const link = `https://join4join.xyz/?ref=${user.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleLuckySpin = () => {
    if (isSpinning) return;
    sounds.playClick();
    setIsSpinning(true);
    setSpinResult(null);

    // Random reward between 0.5 and 10 coins
    const possible = [0.5, 1.0, 1.5, 2.5, 5.0, 8.0, 15.0];
    const prize = possible[Math.floor(Math.random() * possible.length)];

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(prize);
      sounds.playCoin();
      sounds.playSuccess();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 }
      });
      onSpinWheel(prize);
    }, 2000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Gift className="w-3.5 h-3.5" />
          <span>{lang === 'FR' ? 'Bonus & Fidélité' : 'Rewards & Loyalty'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'FR' ? 'Récompenses Quotidiennes & Parrainage' : 'Daily Rewards & Referrals'}
        </h2>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          {lang === 'FR'
            ? 'Connectez-vous chaque jour pour augmenter votre série et vos gains. Invitez vos amis pour toucher 15% de commissions à vie.'
            : 'Check in daily to build your streak and earn free coins. Invite friends to earn a lifetime 15% commission.'}
        </p>
      </div>

      {/* 7-Days Streak Section */}
      <div className="bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        
        {/* Streak Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
              <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  Série Quotidienne
                </h3>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  🔥 {currentStreak} Jours
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Réclamez chaque 24h pour atteindre le super bonus du Jour 7 (+10 Coins).
              </p>
            </div>
          </div>

          <button
            onClick={handleClaim}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-extrabold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-amber-500/25"
          >
            <Gift className="w-4 h-4 fill-current text-black" />
            <span>Réclamer Aujourd'hui (+{currentDayReward.toFixed(2)} Coins)</span>
          </button>
        </div>

        {/* 7 Day Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {streakDaysData.map((d, idx) => {
            const isCompleted = idx < todayIndex;
            const isCurrent = idx === todayIndex;

            return (
              <div
                key={d.day}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col justify-between relative overflow-hidden ${
                  isCurrent
                    ? 'bg-[#5865F2]/20 border-[#5865F2] shadow-lg shadow-[#5865F2]/20 scale-105 z-10'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-[#0b0d13] border-white/5 opacity-80'
                }`}
              >
                {d.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-black">
                    {d.badge}
                  </span>
                )}

                <div className="text-[11px] font-bold text-gray-400 mb-2">
                  {d.label}
                </div>

                <div className="my-2">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Coins className={`w-5 h-5 ${isCurrent ? 'text-amber-400' : 'text-gray-400'}`} />
                    )}
                  </div>
                  <span className="text-sm font-extrabold text-white font-mono block">
                    +{d.reward.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-gray-400">Coins</span>
                </div>

                <div className="mt-2 text-[10px] font-bold">
                  {isCompleted ? (
                    <span className="text-emerald-400">Réclamé</span>
                  ) : isCurrent ? (
                    <span className="text-[#8c97ff] animate-pulse">Disponible !</span>
                  ) : (
                    <span className="text-gray-500">À venir</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lucky Box & Referral 2-Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lucky Mystery Box (5 cols) */}
        <div className="lg:col-span-5 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dice5 className="w-5 h-5 text-[#5865F2]" />
                <span>Coffre Mystère Quotidien</span>
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#5865F2]/20 text-[#8c97ff]">
                1 essai / jour
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Ouvrez le coffre magique pour tenter de remporter entre <strong>0.50</strong> et <strong>15.00 Coins</strong> instantanément !
            </p>

            <div className="my-6 text-center">
              <div className={`w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-[#5865F2] via-purple-600 to-amber-500 p-1 shadow-xl shadow-purple-500/20 flex items-center justify-center transition-all ${isSpinning ? 'animate-bounce' : 'hover:scale-105'}`}>
                <div className="w-full h-full bg-[#0d0f17] rounded-[22px] flex flex-col items-center justify-center">
                  <Gift className={`w-12 h-12 text-amber-400 ${isSpinning ? 'animate-spin' : ''}`} />
                </div>
              </div>

              {spinResult !== null && (
                <div className="mt-4 p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-center">
                  <p className="text-xs text-amber-300 font-bold">
                    🎉 Gagné : +{spinResult.toFixed(2)} COINS !
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleLuckySpin}
            disabled={isSpinning}
            className="w-full py-3.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSpinning ? 'Ouverture en cours...' : 'Ouvrir le Coffre Mystère'}</span>
          </button>
        </div>

        {/* Referral Program (7 cols) */}
        <div className="lg:col-span-7 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                <span>Programme de Parrainage (15% à vie)</span>
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                ILLIMITÉ
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Partagez votre lien exclusif. Chaque fois qu'un ami rejoint des serveurs et gagne des pièces, vous recevez automatiquement <strong>15% de bonus</strong> sans déduire de ses gains !
            </p>

            {/* Referral Stats Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#0b0d13] p-4 rounded-2xl border border-white/5">
                <span className="text-[11px] text-gray-400 font-medium">Amis Parrainés</span>
                <p className="text-xl font-extrabold text-white font-mono mt-1">
                  {user.referralCount} membres
                </p>
              </div>

              <div className="bg-[#0b0d13] p-4 rounded-2xl border border-white/5">
                <span className="text-[11px] text-amber-400/80 font-medium">Pièces Gagnées</span>
                <p className="text-xl font-extrabold text-amber-300 font-mono mt-1">
                  +{user.referralEarnings.toFixed(2)} COINS
                </p>
              </div>
            </div>

            {/* Referral Link Box */}
            <div className="bg-[#0b0d13] p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-3">
              <input
                type="text"
                readOnly
                value={`https://join4join.xyz/?ref=${user.referralCode}`}
                className="bg-transparent text-xs text-white font-mono w-full focus:outline-none"
              />

              <button
                onClick={handleCopyRef}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all cursor-pointer flex-shrink-0"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Aucune limite d'invitation. Les pièces de parrainage sont créditées en temps réel.</span>
          </div>

        </div>

      </div>

    </section>
  );
};
