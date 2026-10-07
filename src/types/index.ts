export interface DiscordServer {
  id: string;
  name: string;
  description: string;
  icon: string;
  banner?: string;
  category: 'gaming' | 'community' | 'tech' | 'anime' | 'music' | 'crypto' | 'french';
  membersCount: number;
  onlineCount: number;
  rewardCoins: number;
  language: 'FR' | 'EN' | 'GLOBAL';
  verified: boolean;
  featured?: boolean;
  inviteCode: string;
  minAccountAgeDays: number;
  tags: string[];
}

export interface UserCampaign {
  id: string;
  serverName: string;
  serverId: string;
  category: string;
  targetMembers: number;
  currentJoined: number;
  coinsSpent: number;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  mode: 'bot' | 'invite';
  targetLanguage: string;
  dailyCap?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  coins: number;
  joinedServersCount: number;
  campaignsCount: number;
  streakDays: number;
  lastDailyClaim: string | null;
  referralCode: string;
  referralEarnings: number;
  referralCount: number;
  joinedServerIds: string[];
  apiKey: string;
}

export interface LiveActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: 'joined' | 'campaign' | 'claimed' | 'autofarm';
  target: string;
  reward?: string;
  timeAgo: string;
}

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  bonus: number;
  priceEur: number;
  popular?: boolean;
  tag?: string;
  features: string[];
}

export interface TransactionHistory {
  id: string;
  type: 'earn' | 'spend' | 'reward' | 'purchase' | 'transfer';
  title: string;
  amount: number;
  date: string;
  badge?: string;
}
