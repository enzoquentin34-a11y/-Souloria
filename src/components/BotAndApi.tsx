import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Code, 
  Key, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Play, 
  Sparkles,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface BotAndApiProps {
  user: UserProfile;
  lang: 'FR' | 'EN';
  onAddBotModal: () => void;
}

export const BotAndApi: React.FC<BotAndApiProps> = ({
  user,
  lang,
  onAddBotModal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bot' | 'api'>('bot');
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'js' | 'python'>('js');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const botCommands = [
    { command: '/j4j balance', description: 'Consultez votre solde actuel en pièces et votre série quotidienne.' },
    { command: '/j4j discover', description: 'Affiche les serveurs recommandés à rejoindre directement depuis Discord.' },
    { command: '/j4j daily', description: 'Réclamez votre bonus de série quotidien en un clic.' },
    { command: '/j4j boost [membres]', description: 'Lancez ou accélérez une campagne de membres pour le serveur actuel.' },
    { command: '/j4j farm auto', description: 'Démarre une session d\'auto-farm sécurisée en arrière-plan.' },
    { command: '/j4j stats', description: 'Affiche les statistiques de rétention et de membres générés.' }
  ];

  const handleCopyKey = () => {
    sounds.playClick();
    navigator.clipboard.writeText(user.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleRunApiTest = () => {
    sounds.playClick();
    setIsLoadingApi(true);
    setApiResponse(null);

    setTimeout(() => {
      setIsLoadingApi(false);
      sounds.playSuccess();
      setApiResponse(JSON.stringify({
        status: 200,
        success: true,
        data: {
          user_id: user.id,
          username: `${user.username}#${user.discriminator}`,
          balance_coins: user.coins,
          streak_days: user.streakDays,
          joined_servers_count: user.joinedServersCount,
          active_campaigns: user.campaignsCount,
          tier: 'VIP_VERIFIED',
          rate_limit: {
            remaining: 998,
            reset_seconds: 3600
          }
        }
      }, null, 2));
    }, 800);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#5865F2] font-bold text-xs uppercase tracking-wider mb-1">
          <Terminal className="w-3.5 h-3.5" />
          <span>{lang === 'FR' ? 'Écosystème & Développeurs' : 'Ecosystem & Developers'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'FR' ? 'Bot Discord Officiel & API Rest' : 'Official Discord Bot & REST API'}
        </h2>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          {lang === 'FR'
            ? 'Intégrez Join4Join à votre serveur en quelques secondes ou construisez vos propres automatisations via notre API ouverte.'
            : 'Integrate Join4Join into your server with our official bot or build custom automation with our open API.'}
        </p>
      </div>

      {/* Sub tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-[#11131c] border border-white/5 w-fit">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveSubTab('bot');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'bot'
              ? 'bg-[#5865F2] text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>{lang === 'FR' ? 'Bot Discord Officiel' : 'Discord Bot'}</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveSubTab('api');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'api'
              ? 'bg-[#5865F2] text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>{lang === 'FR' ? 'API Développeur & Webhooks' : 'Developer API'}</span>
        </button>
      </div>

      {/* Bot Section */}
      {activeSubTab === 'bot' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bot Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-20 h-20 rounded-3xl bg-[#5865F2] flex items-center justify-center text-white mb-5 shadow-xl shadow-[#5865F2]/25">
                <Bot className="w-10 h-10" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-extrabold text-white">
                  Join4Join Official Bot
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  VERIFIED
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Le bot Join4Join permet de vérifier automatiquement l'adhésion des membres, d'attribuer des rôles, de protéger contre les raids et d'envoyer des notifications de gains.
              </p>

              <div className="space-y-3 mb-6 text-xs text-gray-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Permissions minimales requises (Gérer les invitations & Voir les salons)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Validation instantanée des nouveaux arrivants</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#5865F2] flex-shrink-0" />
                  <span>Plus de 18,400 serveurs utilisent notre bot</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onAddBotModal();
              }}
              className="w-full py-4 rounded-2xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#5865F2]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <Bot className="w-5 h-5" />
              <span>Inviter le Bot sur mon Serveur</span>
            </button>
          </div>

          {/* Commands List (7 cols) */}
          <div className="lg:col-span-7 bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-[#5865F2]" />
              <span>Commandes Slash Disponibles</span>
            </h3>

            <div className="space-y-3">
              {botCommands.map((cmd) => (
                <div
                  key={cmd.command}
                  className="p-3.5 rounded-2xl bg-[#0b0d13] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <code className="text-xs font-mono font-bold text-[#8c97ff] bg-[#5865F2]/10 px-2.5 py-1 rounded-lg w-fit">
                    {cmd.command}
                  </code>
                  <span className="text-xs text-gray-300 sm:text-right">
                    {cmd.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Developer API Section */
        <div className="space-y-8">
          
          {/* API Key Box */}
          <div className="bg-[#11131c] border border-white/5 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Votre Clé d'API Secrète
                </h3>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">1,000 req / heure</span>
            </div>

            <div className="flex items-center gap-3 bg-[#0b0d13] p-3 rounded-2xl border border-white/10">
              <input
                type="text"
                readOnly
                value={user.apiKey}
                className="bg-transparent text-xs text-amber-300 font-mono w-full focus:outline-none"
              />
              <button
                onClick={handleCopyKey}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer flex-shrink-0"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copiée !' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Code sandbox & tester */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Code examples (6 cols) */}
            <div className="lg:col-span-6 bg-[#11131c] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Exemple de requête API
                  </span>
                  <div className="flex gap-1">
                    {(['js', 'python', 'curl'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLanguage(l)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                          selectedLanguage === l ? 'bg-[#5865F2] text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#090b11] border border-white/5 rounded-2xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                  {selectedLanguage === 'js' && (
                    <pre className="text-[11px] leading-relaxed">
{`// Requête Node.js / JavaScript
const response = await fetch("https://api.join4join.xyz/v1/user/@me", {
  headers: {
    "Authorization": "Bearer ${user.apiKey}",
    "Content-Type": "application/json"
  }
});

const data = await response.json();
console.log("Solde:", data.balance_coins);`}
                    </pre>
                  )}

                  {selectedLanguage === 'python' && (
                    <pre className="text-[11px] leading-relaxed">
{`# Requête Python requests
import requests

headers = {
    "Authorization": "Bearer ${user.apiKey}",
    "Content-Type": "application/json"
}

r = requests.get("https://api.join4join.xyz/v1/user/@me", headers=headers)
print("Solde:", r.json()["balance_coins"])`}
                    </pre>
                  )}

                  {selectedLanguage === 'curl' && (
                    <pre className="text-[11px] leading-relaxed">
{`curl -X GET "https://api.join4join.xyz/v1/user/@me" \\
  -H "Authorization: Bearer ${user.apiKey}" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  )}
                </div>
              </div>

              <button
                onClick={handleRunApiTest}
                disabled={isLoadingApi}
                className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isLoadingApi ? 'Exécution du test...' : 'Tester cette requête en direct'}</span>
              </button>
            </div>

            {/* Response Preview (6 cols) */}
            <div className="lg:col-span-6 bg-[#11131c] border border-white/5 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Réponse JSON (200 OK)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">API GATEWAY ONLINE</span>
              </div>

              <div className="h-64 bg-[#090b11] border border-white/5 rounded-2xl p-4 font-mono text-xs text-emerald-400 overflow-y-auto">
                {apiResponse ? (
                  <pre className="text-[11px] leading-tight text-emerald-300 whitespace-pre-wrap">
                    {apiResponse}
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600 text-xs">
                    Cliquez sur "Tester cette requête" pour générer la réponse en direct.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
