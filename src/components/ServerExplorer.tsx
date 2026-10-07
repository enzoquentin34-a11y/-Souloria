import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Coins, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUpDown,
  Lock,
  ChevronRight,
  Flame
} from 'lucide-react';
import { DiscordServer, UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface ServerExplorerProps {
  servers: DiscordServer[];
  user: UserProfile;
  onJoinServer: (server: DiscordServer) => void;
  lang: 'FR' | 'EN';
  onLaunchAutoFarm: () => void;
}

export const ServerExplorer: React.FC<ServerExplorerProps> = ({
  servers,
  user,
  onJoinServer,
  lang,
  onLaunchAutoFarm
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'reward' | 'members' | 'name'>('reward');
  const [hideJoined, setHideJoined] = useState(false);

  // Joining modal state
  const [joiningServer, setJoiningServer] = useState<DiscordServer | null>(null);
  const [joinStep, setJoinStep] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const categories = [
    { id: 'all', label: lang === 'FR' ? 'Tous les Serveurs' : 'All Servers', icon: '🌐' },
    { id: 'french', label: lang === 'FR' ? '🇫🇷 Francophone' : '🇫🇷 French', icon: '🇫🇷' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'community', label: lang === 'FR' ? 'Communauté' : 'Community', icon: '💬' },
    { id: 'tech', label: 'Dev & Tech', icon: '💻' },
    { id: 'anime', label: 'Anime & Manga', icon: '⛩️' },
    { id: 'music', label: lang === 'FR' ? 'Musique' : 'Music', icon: '🎵' },
    { id: 'crypto', label: 'Crypto & Web3', icon: '💎' },
  ];

  // Filtering and sorting
  const filteredServers = servers
    .filter((srv) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'french') {
          if (srv.language !== 'FR' && srv.category !== 'french') return false;
        } else if (srv.category !== selectedCategory) {
          return false;
        }
      }

      if (hideJoined && user.joinedServerIds.includes(srv.id)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = srv.name.toLowerCase().includes(q);
        const matchesDesc = srv.description.toLowerCase().includes(q);
        const matchesTags = srv.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'reward') return b.rewardCoins - a.rewardCoins;
      if (sortBy === 'members') return b.membersCount - a.membersCount;
      return a.name.localeCompare(b.name);
    });

  const handleStartJoin = (server: DiscordServer) => {
    sounds.playClick();
    setJoiningServer(server);
    setJoinStep(1);
    setIsVerifying(true);

    // Simulate real Discord verification flow
    setTimeout(() => {
      setJoinStep(2);
    }, 800);

    setTimeout(() => {
      setJoinStep(3);
    }, 1800);

    setTimeout(() => {
      setJoinStep(4);
      setIsVerifying(false);
      sounds.playSuccess();
      sounds.playCoin();
      onJoinServer(server);
    }, 2800);
  };

  const closeJoinModal = () => {
    if (isVerifying) return;
    setJoiningServer(null);
    setJoinStep(0);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#5865F2] font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'FR' ? 'Découverte rémunérée' : 'Join to earn'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'FR' ? 'Rejoignez des Serveurs & Gagnez des Pièces' : 'Join Servers & Earn Coins'}
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            {lang === 'FR' 
              ? 'Gagnez jusqu\'à 1.25 pièce par serveur rejoint. Restez au moins 4 jours pour valider définitivement vos récompenses.'
              : 'Earn up to 1.25 coin per joined server. Stay at least 4 days to keep your coin rewards.'}
          </p>
        </div>

        {/* Auto farm quick button */}
        <button
          onClick={() => {
            sounds.playClick();
            onLaunchAutoFarm();
          }}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:border-amber-400 hover:scale-[1.02] transition-all cursor-pointer shadow-lg shadow-amber-500/10"
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>{lang === 'FR' ? 'Activer l\'Auto-Farm (+10 serveurs auto)' : 'Launch Auto-Farm (+10 auto)'}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/25'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#11131c] border border-white/5 mb-8">
        
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'FR' ? 'Rechercher par nom, tag ou jeu...' : 'Search by name, game, tag...'}
            className="w-full bg-[#0b0d13] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5865F2] transition-colors"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Hide Joined Toggle */}
          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hideJoined}
              onChange={(e) => setHideJoined(e.target.checked)}
              className="rounded bg-white/10 border-white/20 text-[#5865F2] focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span>{lang === 'FR' ? 'Masquer rejoints' : 'Hide joined'}</span>
          </label>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-[#0b0d13] border border-white/5 rounded-xl px-3 py-1.5 text-xs text-gray-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'reward' | 'members' | 'name')}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="reward" className="bg-[#11131c]">
                {lang === 'FR' ? 'Plus de pièces' : 'Highest Reward'}
              </option>
              <option value="members" className="bg-[#11131c]">
                {lang === 'FR' ? 'Plus de membres' : 'Most Members'}
              </option>
              <option value="name" className="bg-[#11131c]">
                {lang === 'FR' ? 'Nom alphabétique' : 'Server Name'}
              </option>
            </select>
          </div>

        </div>

      </div>

      {/* Servers Grid */}
      {filteredServers.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#11131c] rounded-2xl border border-white/5">
          <p className="text-gray-400 text-sm">
            {lang === 'FR' ? 'Aucun serveur ne correspond à vos critères de recherche.' : 'No servers found matching your criteria.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setHideJoined(false);
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            {lang === 'FR' ? 'Réinitialiser les filtres' : 'Reset filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServers.map((server) => {
            const hasJoined = user.joinedServerIds.includes(server.id);

            return (
              <div
                key={server.id}
                className="group relative rounded-2xl bg-[#11131c] border border-white/5 hover:border-[#5865F2]/40 transition-all flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-[#5865F2]/5"
              >
                {/* Top Banner gradient if present */}
                <div 
                  className="h-20 w-full bg-cover bg-center relative opacity-75 group-hover:opacity-90 transition-opacity"
                  style={{ 
                    backgroundImage: server.banner 
                      ? `url(${server.banner})` 
                      : 'linear-gradient(135deg, #1f2333 0%, #111420 100%)' 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#11131c]" />
                  
                  {/* Reward Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/90 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 backdrop-blur-sm">
                    <Coins className="w-3.5 h-3.5" />
                    <span>+{server.rewardCoins.toFixed(2)} Coins</span>
                  </div>

                  {/* Language & Featured Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-sm">
                      {server.language === 'FR' ? '🇫🇷 FR' : server.language === 'EN' ? '🇬🇧 EN' : '🌍 Global'}
                    </span>
                    {server.featured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5865F2]/80 text-white backdrop-blur-sm">
                        BOOST
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 pt-0 flex-1 flex flex-col">
                  
                  {/* Server Icon & Title */}
                  <div className="flex items-start gap-3.5 -mt-6 mb-3 relative z-10">
                    <img
                      src={server.icon}
                      alt={server.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#11131c] shadow-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0 pt-6">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white truncate">
                          {server.name}
                        </h3>
                        {server.verified && (
                          <span title="Serveur Vérifié">
                            <ShieldCheck className="w-4 h-4 text-[#5865F2] flex-shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Users className="w-3 h-3 text-gray-500" />
                          {server.membersCount.toLocaleString()} membres
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {server.onlineCount.toLocaleString()} en ligne
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-4">
                    {server.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {server.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 4 days stay warning */}
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pb-3 border-b border-white/5 mb-4">
                    <Clock className="w-3 h-3 text-amber-400/80" />
                    <span>{lang === 'FR' ? 'Présence 4 jours requise pour conserver le gain' : '4-day stay required to keep coins'}</span>
                  </div>

                  {/* Action Button */}
                  {hasJoined ? (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'FR' ? 'Rejoint & Validé (4 jours restants)' : 'Joined & Verified (4 days left)'}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartJoin(server)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#5865F2]/20 hover:shadow-[#5865F2]/40 transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <span>{lang === 'FR' ? 'Rejoindre & Réclamer' : 'Join & Claim'}</span>
                      <span className="text-amber-300 font-mono font-extrabold">+{server.rewardCoins.toFixed(2)}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Simulated Discord Join Modal */}
      {joiningServer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181a24] border border-[#5865F2]/30 rounded-2xl max-w-md w-full p-6 shadow-2xl shadow-[#5865F2]/20 relative">
            
            {/* Modal header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-3 p-1 bg-gradient-to-tr from-[#5865F2] to-cyan-400 shadow-lg shadow-[#5865F2]/30">
                <img
                  src={joiningServer.icon}
                  alt={joiningServer.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-bold text-white">
                {joiningServer.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'FR' ? 'Vérification de l\'adhésion via Discord OAuth2' : 'Verifying membership via Discord OAuth2'}
              </p>
            </div>

            {/* Verification sequence */}
            <div className="space-y-3 bg-[#11131c] p-4 rounded-xl border border-white/5 mb-6 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">1. Connexion au compte Discord...</span>
                {joinStep >= 1 ? (
                  <span className="text-emerald-400 font-bold">✓ Prêt</span>
                ) : (
                  <span className="text-gray-500">En attente</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">2. Contrôle anti-alt (min 7j)...</span>
                {joinStep >= 2 ? (
                  <span className="text-emerald-400 font-bold">✓ Validé</span>
                ) : joinStep === 1 ? (
                  <span className="text-amber-400 animate-pulse">Vérification...</span>
                ) : (
                  <span className="text-gray-500">En attente</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">3. Rejoindre le salon & rôle...</span>
                {joinStep >= 3 ? (
                  <span className="text-emerald-400 font-bold">✓ Effectué</span>
                ) : joinStep === 2 ? (
                  <span className="text-amber-400 animate-pulse">En cours...</span>
                ) : (
                  <span className="text-gray-500">En attente</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-white font-semibold">4. Crédit de récompense :</span>
                {joinStep >= 4 ? (
                  <span className="text-amber-300 font-bold flex items-center gap-1 font-sans">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    +{joiningServer.rewardCoins.toFixed(2)} COINS !
                  </span>
                ) : (
                  <span className="text-gray-500">En attente</span>
                )}
              </div>
            </div>

            {/* Modal status footer */}
            {isVerifying ? (
              <div className="flex items-center justify-center gap-2 py-3 text-xs text-gray-300">
                <span className="w-4 h-4 border-2 border-[#5865F2] border-t-transparent rounded-full animate-spin" />
                <span>{lang === 'FR' ? 'Vérification automatique en cours...' : 'Automated verification in progress...'}</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                  <p className="text-xs font-bold text-emerald-400">
                    🎉 Félicitations ! Votre compte a été crédité.
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Gardez le serveur au moins 4 jours pour conserver vos pièces.
                  </p>
                </div>

                <button
                  onClick={closeJoinModal}
                  className="w-full py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  {lang === 'FR' ? 'Fermer & Continuer' : 'Close & Continue'}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
