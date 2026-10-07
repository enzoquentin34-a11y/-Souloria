import React, { useState } from 'react';
import { 
  Rocket, 
  Coins, 
  Plus, 
  Sliders, 
  ShieldCheck, 
  Globe2, 
  Bot, 
  Link as LinkIcon, 
  Play, 
  Pause, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserCampaign, UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface CampaignCreatorProps {
  user: UserProfile;
  campaigns: UserCampaign[];
  onCreateCampaign: (campaign: Omit<UserCampaign, 'id' | 'currentJoined' | 'createdAt'>) => void;
  onToggleCampaignStatus: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
  onOpenShop: () => void;
  onOpenExplorer: () => void;
  lang: 'FR' | 'EN';
}

export const CampaignCreator: React.FC<CampaignCreatorProps> = ({
  user,
  campaigns,
  onCreateCampaign,
  onToggleCampaignStatus,
  onDeleteCampaign,
  onOpenShop,
  onOpenExplorer,
  lang
}) => {
  const [serverName, setServerName] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  const [category, setCategory] = useState('gaming');
  const [mode, setMode] = useState<'bot' | 'invite'>('bot');
  const [targetMembers, setTargetMembers] = useState(50);
  const [targetLanguage, setTargetLanguage] = useState<'FR' | 'EN' | 'ALL'>('FR');
  const [antiAltFilter, setAntiAltFilter] = useState(true);

  // Error message
  const [errorMsg, setErrorMsg] = useState('');

  // Cost calculation: 1 coin per member
  const totalCost = targetMembers;
  const hasEnoughCoins = user.coins >= totalCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();

    if (!serverName.trim()) {
      setErrorMsg('Veuillez renseigner le nom de votre serveur Discord.');
      return;
    }
    if (!inviteUrl.trim()) {
      setErrorMsg('Veuillez indiquer un lien d\'invitation ou de bot valide.');
      return;
    }
    if (!hasEnoughCoins) {
      setErrorMsg(`Solde insuffisant : il vous faut ${totalCost} pièces (solde actuel : ${user.coins.toFixed(2)}).`);
      return;
    }

    setErrorMsg('');
    sounds.playSuccess();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });

    onCreateCampaign({
      serverName,
      serverId: 'srv-user-' + Date.now(),
      category,
      targetMembers,
      coinsSpent: totalCost,
      status: 'active',
      mode,
      targetLanguage
    });

    // Reset inputs
    setServerName('');
    setInviteUrl('');
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[#5865F2] font-bold text-xs uppercase tracking-wider mb-1">
          <Rocket className="w-3.5 h-3.5" />
          <span>{lang === 'FR' ? 'Espace Créateur & Propriétaire' : 'Server Owners'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'FR' ? 'Booster & Promouvoir votre Serveur Discord' : 'Promote & Grow Your Server'}
        </h2>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          {lang === 'FR'
            ? 'Transformez vos pièces en vrais membres actifs. Choisissez vos critères de ciblage et suivez l\'arrivée des membres en direct.'
            : 'Turn your coins into genuine Discord members. Customize targeting and track member joins in real time.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Campaign Creation Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#5865F2]" />
              <span>{lang === 'FR' ? 'Nouvelle Campagne de Croissance' : 'New Growth Campaign'}</span>
            </h3>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <span className="text-gray-400">Votre Solde:</span>
              <span className="text-amber-400 font-mono font-bold">{user.coins.toFixed(2)} Coins</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Server Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Nom du Serveur Discord <span className="text-[#5865F2]">*</span>
              </label>
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Ex: Cyber Lounge FR, Squad Valorant, Dev Club..."
                className="w-full bg-[#0b0d13] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5865F2] transition-colors"
              />
            </div>

            {/* Invite Link & Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Lien d'invitation permanent <span className="text-[#5865F2]">*</span>
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inviteUrl}
                    onChange={(e) => setInviteUrl(e.target.value)}
                    placeholder="discord.gg/votre-serveur"
                    className="w-full bg-[#0b0d13] border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5865F2] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Catégorie du serveur
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0b0d13] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer"
                >
                  <option value="gaming">🎮 Gaming</option>
                  <option value="french">🇫🇷 Communauté Francophone</option>
                  <option value="tech">💻 Développeurs & Tech</option>
                  <option value="anime">⛩️ Anime & Mangas</option>
                  <option value="music">🎵 Musique & Chill</option>
                  <option value="crypto">💎 Crypto & Finance</option>
                </select>
              </div>
            </div>

            {/* Promotion Mode Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Mode de Connexion Membre
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setMode('bot');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    mode === 'bot'
                      ? 'bg-[#5865F2]/15 border-[#5865F2] shadow-sm shadow-[#5865F2]/20'
                      : 'bg-[#0b0d13] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-[#5865F2]" />
                      Bot Mode (Recommandé)
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      Rapide
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Rejoint en 1-clic via OAuth2 officiel. Vérification instantanée et tracking automatique des départs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setMode('invite');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    mode === 'invite'
                      ? 'bg-[#5865F2]/15 border-[#5865F2] shadow-sm shadow-[#5865F2]/20'
                      : 'bg-[#0b0d13] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-[#5865F2]" />
                      Invite Mode
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                      Classique
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Utilise un lien permanent Discord. Le bot Join4Join vérifie la présence du membre sur le serveur.
                  </p>
                </button>
              </div>
            </div>

            {/* Target Members Slider */}
            <div className="bg-[#0b0d13] p-4 sm:p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Objectif de Membres
                </span>
                <span className="text-lg font-extrabold text-[#5865F2] font-mono">
                  {targetMembers} membres
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={targetMembers}
                onChange={(e) => setTargetMembers(Number(e.target.value))}
                className="w-full accent-[#5865F2] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-gray-500 mt-2 font-mono">
                <span>10</span>
                <span>100</span>
                <span>250</span>
                <span>500 max</span>
              </div>
            </div>

            {/* Targeting and Anti-Alt toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#0b0d13] p-3.5 rounded-2xl border border-white/5">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-2">
                  <Globe2 className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>Ciblage linguistique</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['FR', 'EN', 'ALL'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setTargetLanguage(l)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        targetLanguage === l
                          ? 'bg-[#5865F2] text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {l === 'FR' ? '🇫🇷 FR' : l === 'EN' ? '🇬🇧 EN' : '🌍 Tous'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0b0d13] p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Filtre Anti-Alt</span>
                  </label>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Exclut les comptes récents &lt; 14 jours
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={antiAltFilter}
                  onChange={(e) => setAntiAltFilter(e.target.checked)}
                  className="rounded bg-white/10 border-white/20 text-[#5865F2] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Summary & Submit */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-gray-300 font-medium">Coût total de la campagne :</span>
                <span className="text-amber-400 font-mono font-extrabold text-lg flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  {totalCost} COINS
                </span>
              </div>

              {hasEnoughCoins ? (
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#5865F2] via-[#6a75f0] to-[#5865F2] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#5865F2]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Lancer la Campagne ({targetMembers} membres)</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                    <p className="text-xs text-amber-300 font-bold">
                      ⚠️ Il vous manque {(totalCost - user.coins).toFixed(2)} pièces pour lancer cette campagne.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playCoin();
                        onOpenExplorer();
                      }}
                      className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                    >
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>Gagner gratuitement</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        onOpenShop();
                      }}
                      className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Acheter un Pack</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </form>

        </div>

        {/* Active Campaigns Monitor & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#11131c] border border-white/5 rounded-3xl p-6 relative">
            <h3 className="text-base font-bold text-white flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Vos Campagnes Actives ({campaigns.length})
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                LIVE
              </span>
            </h3>

            {campaigns.length === 0 ? (
              <div className="text-center py-10 px-4 bg-[#0b0d13] rounded-2xl border border-white/5">
                <Rocket className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-400">
                  Vous n'avez pas encore de campagne active.
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Créez votre première campagne à gauche pour commencer à recevoir des membres !
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((camp) => {
                  const percent = Math.min(100, Math.round((camp.currentJoined / camp.targetMembers) * 100));
                  const isCompleted = camp.currentJoined >= camp.targetMembers;

                  return (
                    <div
                      key={camp.id}
                      className="bg-[#0b0d13] p-4 rounded-2xl border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            {camp.serverName}
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#5865F2]/20 text-[#8c97ff] font-mono">
                              {camp.mode === 'bot' ? 'Bot' : 'Invite'}
                            </span>
                          </h4>
                          <span className="text-[10px] text-gray-400">
                            Langue: {camp.targetLanguage} • {camp.coinsSpent} Coins investis
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onToggleCampaignStatus(camp.id);
                            }}
                            title={camp.status === 'active' ? 'Mettre en pause' : 'Reprendre'}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                          >
                            {camp.status === 'active' ? (
                              <Pause className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onDeleteCampaign(camp.id);
                            }}
                            title="Supprimer la campagne"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5 mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Progression</span>
                          <span className="text-white font-mono font-bold">
                            {camp.currentJoined} / {camp.targetMembers} ({percent}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCompleted
                                ? 'bg-emerald-400'
                                : 'bg-gradient-to-r from-[#5865F2] to-cyan-400'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer notice */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 mt-3 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${camp.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                          {camp.status === 'active' ? 'En cours de diffusion' : 'En pause'}
                        </span>
                        {isCompleted && (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Objectif atteint
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Growth guarantee tip card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#181a28] to-[#121420] border border-[#5865F2]/20">
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantie de Croissance Join4Join</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tout membre qui quitte votre serveur avant 4 jours perd immédiatement ses pièces et une pénalité lui est infligée. Notre algorithme remplace automatiquement les membres partis sans coût additionnel.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
