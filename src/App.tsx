import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  LiveTicker 
} from './components/LiveTicker';
import { 
  Hero 
} from './components/Hero';
import { 
  ServerExplorer 
} from './components/ServerExplorer';
import { 
  AutoFarmModal 
} from './components/AutoFarmModal';
import { 
  CampaignCreator 
} from './components/CampaignCreator';
import { 
  DailyRewards 
} from './components/DailyRewards';
import { 
  CoinShop 
} from './components/CoinShop';
import { 
  BotAndApi 
} from './components/BotAndApi';
import { 
  FAQSection 
} from './components/FAQSection';
import { 
  Footer 
} from './components/Footer';
import { 
  WalletModal 
} from './components/WalletModal';
import { 
  BotInviteModal 
} from './components/BotInviteModal';
import { 
  DiscordAuthModal 
} from './components/DiscordAuthModal';

import { 
  DiscordServer, 
  UserCampaign, 
  UserProfile, 
  CoinPackage, 
  TransactionHistory 
} from './types';
import { 
  INITIAL_SERVERS, 
  INITIAL_TRANSACTIONS 
} from './data/initialData';
import { sounds } from './utils/sound';

const STORAGE_KEY_USER = 'j4j_user_profile_v1';
const STORAGE_KEY_CAMPAIGNS = 'j4j_user_campaigns_v1';
const STORAGE_KEY_TRANSACTIONS = 'j4j_user_transactions_v1';

const DEFAULT_USER: UserProfile = {
  id: 'usr-89210948',
  username: 'EnzoQuentin',
  discriminator: '3400',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
  coins: 14.75,
  joinedServersCount: 3,
  campaignsCount: 1,
  streakDays: 3,
  lastDailyClaim: null,
  referralCode: 'enzo34',
  referralEarnings: 4.50,
  referralCount: 6,
  joinedServerIds: ['srv-1'],
  apiKey: 'j4j_live_sk_948f20a9bf81c20e'
};

const DEFAULT_CAMPAIGNS: UserCampaign[] = [
  {
    id: 'camp-init-1',
    serverName: 'Cyber Elite Lounge FR',
    serverId: 'srv-init-1',
    category: 'gaming',
    targetMembers: 50,
    currentJoined: 28,
    coinsSpent: 50,
    status: 'active',
    createdAt: 'Hier',
    mode: 'bot',
    targetLanguage: 'FR'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_USER;
  });

  // Campaigns
  const [campaigns, setCampaigns] = useState<UserCampaign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_CAMPAIGNS;
  });

  // Transactions
  const [transactions, setTransactions] = useState<TransactionHistory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_TRANSACTIONS;
  });

  // Modals
  const [isAutoFarmOpen, setIsAutoFarmOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isBotInviteOpen, setIsBotInviteOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'coin' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  // Periodic campaign member join simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns((prev) =>
        prev.map((c) => {
          if (c.status === 'active' && c.currentJoined < c.targetMembers) {
            // Random chance to increment
            if (Math.random() > 0.4) {
              return { ...c, currentJoined: c.currentJoined + 1 };
            }
          }
          return c;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'coin' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Join single server
  const handleJoinServer = (server: DiscordServer) => {
    const updatedJoined = [...user.joinedServerIds, server.id];
    const newCoins = user.coins + server.rewardCoins;

    setUser((prev) => ({
      ...prev,
      coins: newCoins,
      joinedServersCount: prev.joinedServersCount + 1,
      joinedServerIds: updatedJoined
    }));

    // Add transaction
    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'earn',
      title: `Rejoint "${server.name}"`,
      amount: server.rewardCoins,
      date: 'Aujourd\'hui',
      badge: 'Vérifié'
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`+${server.rewardCoins.toFixed(2)} Coins ajoutés pour "${server.name}" !`, 'coin');
  };

  // Auto-farm batch completion
  const handleAutoFarmComplete = (earned: number, newlyJoined: string[]) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + earned,
      joinedServersCount: prev.joinedServersCount + newlyJoined.length,
      joinedServerIds: [...prev.joinedServerIds, ...newlyJoined]
    }));

    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'earn',
      title: `Session Auto-Farm (${newlyJoined.length} serveurs)`,
      amount: earned,
      date: 'Aujourd\'hui',
      badge: 'Auto-Farm'
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`⚡ Auto-Farm terminé : +${earned.toFixed(2)} Coins crédités !`, 'coin');
  };

  // Create Campaign
  const handleCreateCampaign = (campData: Omit<UserCampaign, 'id' | 'currentJoined' | 'createdAt'>) => {
    const newCamp: UserCampaign = {
      ...campData,
      id: 'camp-' + Date.now(),
      currentJoined: 0,
      createdAt: 'À l\'instant'
    };

    setUser((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - campData.coinsSpent),
      campaignsCount: prev.campaignsCount + 1
    }));

    setCampaigns((prev) => [newCamp, ...prev]);

    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'spend',
      title: `Campagne "${campData.serverName}" (${campData.targetMembers} membres)`,
      amount: campData.coinsSpent,
      date: 'Aujourd\'hui',
      badge: 'Campagne'
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`🚀 Campagne "${campData.serverName}" lancée avec succès !`, 'success');
  };

  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
      )
    );
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    showToast('Campagne supprimée.', 'info');
  };

  // Daily Streak Claim
  const handleClaimDaily = (amount: number, newStreak: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + amount,
      streakDays: newStreak,
      lastDailyClaim: new Date().toISOString()
    }));

    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'reward',
      title: `Bonus quotidien (Jour ${newStreak})`,
      amount,
      date: 'Aujourd\'hui',
      badge: 'Daily'
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`🎁 Bonus quotidien réclamé : +${amount.toFixed(2)} Coins !`, 'coin');
  };

  // Lucky Spin Wheel
  const handleSpinWheel = (prize: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + prize
    }));

    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'reward',
      title: 'Gain Coffre Mystère',
      amount: prize,
      date: 'Aujourd\'hui',
      badge: 'Coffre'
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`🎉 Coffre Mystère : +${prize.toFixed(2)} Coins !`, 'coin');
  };

  // Purchase Package
  const handlePurchasePackage = (pkg: CoinPackage) => {
    const totalAdded = pkg.coins + pkg.bonus;
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + totalAdded
    }));

    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'purchase',
      title: `Achat ${pkg.name}`,
      amount: totalAdded,
      date: 'Aujourd\'hui',
      badge: `${pkg.priceEur}€`
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`💎 ${pkg.name} validé : +${totalAdded} Coins crédités !`, 'coin');
  };

  // Transfer Coins
  const handleTransferCoins = (recipient: string, amount: number) => {
    if (user.coins < amount) {
      return { success: false, error: 'Solde insuffisant.' };
    }

    setUser((prev) => ({
      ...prev,
      coins: prev.coins - amount
    }));

    const newTx: TransactionHistory = {
      id: 'tx-' + Date.now(),
      type: 'transfer',
      title: `Transfert envoyé à ${recipient}`,
      amount,
      date: 'Aujourd\'hui',
      badge: 'Transfert'
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`💸 ${amount} Coins envoyés à ${recipient} !`, 'info');
    return { success: true };
  };

  // Reset to default
  const handleResetData = () => {
    setUser(DEFAULT_USER);
    setCampaigns(DEFAULT_CAMPAIGNS);
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEY_TRANSACTIONS);
    showToast('Données réinitialisées aux valeurs initiales.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] text-[#e0e2eb] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#181a26] border border-[#5865F2]/40 text-white shadow-2xl shadow-[#5865F2]/20 text-xs font-bold animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        lang={lang}
        setLang={setLang}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Live Updates Marquee Ticker */}
      <LiveTicker />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Hero is shown when on Explore or default */}
        {activeTab === 'explore' && (
          <Hero
            onExploreClick={() => {
              const el = document.getElementById('servers-grid-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onCampaignClick={() => setActiveTab('campaigns')}
            onBotClick={() => setIsBotInviteOpen(true)}
            onAutoFarmClick={() => setIsAutoFarmOpen(true)}
            lang={lang}
          />
        )}

        {/* Dynamic Tab Contents */}
        {activeTab === 'explore' && (
          <div id="servers-grid-section">
            <ServerExplorer
              servers={INITIAL_SERVERS}
              user={user}
              onJoinServer={handleJoinServer}
              lang={lang}
              onLaunchAutoFarm={() => setIsAutoFarmOpen(true)}
            />
          </div>
        )}

        {activeTab === 'campaigns' && (
          <CampaignCreator
            user={user}
            campaigns={campaigns}
            onCreateCampaign={handleCreateCampaign}
            onToggleCampaignStatus={handleToggleCampaignStatus}
            onDeleteCampaign={handleDeleteCampaign}
            onOpenShop={() => setActiveTab('shop')}
            onOpenExplorer={() => setActiveTab('explore')}
            lang={lang}
          />
        )}

        {activeTab === 'autofarm' && (
          <div className="py-12 max-w-4xl mx-auto px-4 text-center">
            <div className="p-8 sm:p-12 bg-[#11131c] rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Moteur Auto-Farm Join4Join
              </h2>
              <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6">
                Le mode Auto-Farm vous permet d'accumuler des dizaines de pièces en tâche de fond. Le système gère les temporisations Discord pour un crédit 100% sécurisé.
              </p>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsAutoFarmOpen(true);
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-sm hover:scale-105 transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                Ouvrir le Module Auto-Farm
              </button>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <DailyRewards
            user={user}
            onClaimDaily={handleClaimDaily}
            onSpinWheel={handleSpinWheel}
            lang={lang}
          />
        )}

        {activeTab === 'shop' && (
          <CoinShop
            user={user}
            transactions={transactions}
            onPurchasePackage={handlePurchasePackage}
            onTransferCoins={handleTransferCoins}
            lang={lang}
          />
        )}

        {activeTab === 'bot-api' && (
          <BotAndApi
            user={user}
            lang={lang}
            onAddBotModal={() => setIsBotInviteOpen(true)}
          />
        )}

        {/* Global FAQ Section */}
        <FAQSection lang={lang} />

      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Global Interactive Modals */}
      <AutoFarmModal
        isOpen={isAutoFarmOpen}
        onClose={() => setIsAutoFarmOpen(false)}
        servers={INITIAL_SERVERS}
        user={user}
        onAutoFarmComplete={handleAutoFarmComplete}
        lang={lang}
      />

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        user={user}
        onNavigateToShop={() => setActiveTab('shop')}
        onNavigateToCampaigns={() => setActiveTab('campaigns')}
        lang={lang}
      />

      <BotInviteModal
        isOpen={isBotInviteOpen}
        onClose={() => setIsBotInviteOpen(false)}
        lang={lang}
      />

      <DiscordAuthModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
        onResetData={handleResetData}
        lang={lang}
      />

    </div>
  );
}
