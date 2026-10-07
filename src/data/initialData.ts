import { DiscordServer, CoinPackage, LiveActivityItem, TransactionHistory } from '../types';

export const INITIAL_SERVERS: DiscordServer[] = [
  {
    id: 'srv-1',
    name: 'Nexus Gaming FR',
    description: 'La plus grande communauté française multi-gaming : Valorant, LoL, Rocket League, tournois hebdomadaires & giveaways.',
    icon: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    category: 'gaming',
    membersCount: 14820,
    onlineCount: 3410,
    rewardCoins: 0.75,
    language: 'FR',
    verified: true,
    featured: true,
    inviteCode: 'nexus-fr',
    minAccountAgeDays: 7,
    tags: ['Gaming', 'FR', 'Tournois', 'Giveaway']
  },
  {
    id: 'srv-2',
    name: 'DevZone & Coding Cafe',
    description: 'Entraide programmation, bots Discord, React, Python, revue de code et projets collaboratifs.',
    icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=160&auto=format&fit=crop&q=80',
    category: 'tech',
    membersCount: 8940,
    onlineCount: 1950,
    rewardCoins: 1.00,
    language: 'GLOBAL',
    verified: true,
    featured: true,
    inviteCode: 'devzone',
    minAccountAgeDays: 14,
    tags: ['Dev', 'Python', 'React', 'Bots']
  },
  {
    id: 'srv-3',
    name: 'Anime Haven France ⛩️',
    description: 'Discussions animés de saison, scans manga, salons vocaux chill et soirées streaming du weekend.',
    icon: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=160&auto=format&fit=crop&q=80',
    category: 'anime',
    membersCount: 12430,
    onlineCount: 2890,
    rewardCoins: 0.75,
    language: 'FR',
    verified: true,
    featured: false,
    inviteCode: 'anime-fr',
    minAccountAgeDays: 5,
    tags: ['Anime', 'Manga', 'Chill', 'Vocal']
  },
  {
    id: 'srv-4',
    name: 'Lo-Fi Chill & Beats Lounge',
    description: 'Vocal 24/7 musique Lo-Fi, partage de playlists Spotify, coin détente pour travailler et étudier sans stress.',
    icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=160&auto=format&fit=crop&q=80',
    category: 'music',
    membersCount: 6310,
    onlineCount: 1420,
    rewardCoins: 0.75,
    language: 'GLOBAL',
    verified: true,
    featured: false,
    inviteCode: 'lofi-beats',
    minAccountAgeDays: 3,
    tags: ['Musique', 'Lofi', 'Study', 'Chill']
  },
  {
    id: 'srv-5',
    name: 'Crypto & Web3 Builders',
    description: 'Analyses marchés, DeFi, projets NFT innovants, alertes airdrops et sécurité blockchain.',
    icon: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=160&auto=format&fit=crop&q=80',
    category: 'crypto',
    membersCount: 19200,
    onlineCount: 4120,
    rewardCoins: 1.25,
    language: 'EN',
    verified: true,
    featured: true,
    inviteCode: 'web3-builders',
    minAccountAgeDays: 30,
    tags: ['Crypto', 'Trading', 'Web3', 'Airdrops']
  },
  {
    id: 'srv-6',
    name: 'Le QG des Créateurs 🎬',
    description: 'Serveur francophone pour YouTubers, Streamers Twitch, monteurs vidéo et graphistes. Feedbacks & collabs.',
    icon: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=160&auto=format&fit=crop&q=80',
    category: 'french',
    membersCount: 5420,
    onlineCount: 890,
    rewardCoins: 0.75,
    language: 'FR',
    verified: false,
    featured: false,
    inviteCode: 'qg-createurs',
    minAccountAgeDays: 7,
    tags: ['FR', 'Twitch', 'YouTube', 'Design']
  },
  {
    id: 'srv-7',
    name: 'Minecraft FR : Survie & Build',
    description: 'Serveur semi-RP Java & Bedrock, communauté mature, concours de build mensuels et staff actif 24/7.',
    icon: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=160&auto=format&fit=crop&q=80',
    category: 'gaming',
    membersCount: 9780,
    onlineCount: 1640,
    rewardCoins: 0.75,
    language: 'FR',
    verified: true,
    featured: false,
    inviteCode: 'mc-survie',
    minAccountAgeDays: 7,
    tags: ['Minecraft', 'FR', 'Java', 'Bedrock']
  },
  {
    id: 'srv-8',
    name: 'Discord Bot Developers Hub',
    description: 'Ressources pour discord.js, discord.py, Eris, hébergement VPS gratuit et API Join4Join officielle.',
    icon: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=160&auto=format&fit=crop&q=80',
    category: 'tech',
    membersCount: 11200,
    onlineCount: 3100,
    rewardCoins: 0.85,
    language: 'GLOBAL',
    verified: true,
    featured: false,
    inviteCode: 'bot-devs',
    minAccountAgeDays: 14,
    tags: ['Discord.js', 'API', 'Bots', 'VPS']
  },
  {
    id: 'srv-9',
    name: 'Chill Café Francophone ☕',
    description: 'Rencontres amicales, mini-jeux bot Mudae, Dank Memer, salons vocaux nocturnes sans prise de tête.',
    icon: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=160&auto=format&fit=crop&q=80',
    category: 'community',
    membersCount: 4320,
    onlineCount: 780,
    rewardCoins: 0.75,
    language: 'FR',
    verified: false,
    featured: false,
    inviteCode: 'chill-cafe-fr',
    minAccountAgeDays: 3,
    tags: ['Communauté', 'Chill', 'Mudae', 'FR']
  }
];

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'pack-starter',
    name: 'Pack Starter',
    coins: 50,
    bonus: 5,
    priceEur: 4.99,
    tag: 'Débutant',
    features: [
      'Gain estimé : ~55 membres réels',
      'Affichage prioritaire Standard',
      'Accès au filtre de langue',
      'Support standard sous 24h'
    ]
  },
  {
    id: 'pack-growth',
    name: 'Pack Booster',
    coins: 250,
    bonus: 35,
    priceEur: 19.99,
    popular: true,
    tag: 'Plus Populaire',
    features: [
      'Gain estimé : ~285 membres réels',
      'Badge Serveur Mis en Avant',
      'Filtre anti-double compte (30j)',
      'Statistiques de rétention détaillées',
      'Support prioritaire Discord'
    ]
  },
  {
    id: 'pack-pro',
    name: 'Pack Titan',
    coins: 1000,
    bonus: 200,
    priceEur: 69.99,
    tag: 'Meilleure Offre',
    features: [
      'Gain estimé : ~1,200 membres réels',
      'Croissance ultra-rapide (Top Tête de Liste)',
      'Filtres de ciblage avancés FR/EN',
      'Accès API Developer illimité',
      'Rôle VIP sur le Discord officiel Join4Join'
    ]
  },
  {
    id: 'pack-mega',
    name: 'Pack Partenaire',
    coins: 5000,
    bonus: 1250,
    priceEur: 249.99,
    tag: 'Ultra Réseau',
    features: [
      'Gain estimé : ~6,250 membres réels',
      'Promotion multi-réseaux 30 jours',
      'Manager de communauté dédié',
      'Garantie de remplacement en cas de départ',
      'Vérification instantanée'
    ]
  }
];

export const INITIAL_ACTIVITIES: LiveActivityItem[] = [
  {
    id: 'act-1',
    user: 'Kuro#1029',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&auto=format&fit=crop&q=80',
    action: 'joined',
    target: 'Nexus Gaming FR',
    reward: '+0.75 Coins',
    timeAgo: 'à l\'instant'
  },
  {
    id: 'act-2',
    user: 'Shadow#4412',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&auto=format&fit=crop&q=80',
    action: 'campaign',
    target: 'Cyber Elite Club (+200 membres)',
    timeAgo: 'il y a 2 min'
  },
  {
    id: 'act-3',
    user: 'Enzo#3400',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=80',
    action: 'claimed',
    target: 'Série Quotidienne (Jour 3)',
    reward: '+2.00 Coins',
    timeAgo: 'il y a 4 min'
  },
  {
    id: 'act-4',
    user: 'Valentin#8821',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&auto=format&fit=crop&q=80',
    action: 'autofarm',
    target: 'Session Auto-Farm (8 serveurs)',
    reward: '+6.00 Coins',
    timeAgo: 'il y a 7 min'
  }
];

export const INITIAL_TRANSACTIONS: TransactionHistory[] = [
  {
    id: 'tx-1',
    type: 'reward',
    title: 'Bonus de bienvenue Join4Join',
    amount: 10.00,
    date: 'Aujourd\'hui',
    badge: 'Cadeau'
  },
  {
    id: 'tx-2',
    type: 'reward',
    title: 'Série Quotidienne - Jour 1',
    amount: 1.50,
    date: 'Aujourd\'hui',
    badge: 'Quotidien'
  },
  {
    id: 'tx-3',
    type: 'earn',
    title: 'Rejoint le serveur Nexus Gaming FR',
    amount: 0.75,
    date: 'Hier',
    badge: 'Validation 4j'
  }
];

export const FAQ_ITEMS = [
  {
    question: "Comment fonctionne Join4Join.xyz ?",
    answer: "Join4Join est un réseau d'échange équitable. Vous gagnez des pièces (coins) en explorant et rejoignant des communautés Discord qui vous intéressent. Vous pouvez ensuite utiliser vos pièces pour créer une campagne et obtenir de vrais membres actifs sur votre propre serveur."
  },
  {
    question: "Pourquoi dois-je rester au minimum 4 jours sur un serveur ?",
    answer: "Pour garantir un trafic authentique aux créateurs de serveurs, la plateforme vérifie que les utilisateurs restent au moins 4 jours. Si vous quittez un serveur avant ce délai, la récompense en pièces est annulée et des pénalités peuvent s'appliquer à votre compte."
  },
  {
    question: "Les membres sont-ils de vrais utilisateurs Discord ?",
    answer: "Oui à 100%. Chaque utilisateur se connecte via l'OAuth2 officiel de Discord. Notre algorithme bloque les comptes temporaires ou créés il y a moins de 7 à 30 jours pour éviter tout spam ou compte inactif."
  },
  {
    question: "Quelle est la différence entre Bot Mode et Invite Mode ?",
    answer: "En Bot Mode, notre bot officiel vérifie instantanément les arrivées en un clic via OAuth2. En Invite Mode, vous fournissez un lien permanent Discord : le bot surveille les entrées et attribue les pièces automatiquement."
  },
  {
    question: "Comment fonctionne le mode Auto-Farm ?",
    answer: "L'Auto-Farm automatise la découverte de serveurs selon vos préférences (langue, catégories). Il rejoint les serveurs de manière espacée pour respecter les délais naturels de Discord et accumule les pièces sur votre solde."
  }
];
