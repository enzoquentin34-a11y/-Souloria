import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  X, 
  Play, 
  Square, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Flame,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DiscordServer, UserProfile } from '../types';
import { sounds } from '../utils/sound';

interface AutoFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  servers: DiscordServer[];
  user: UserProfile;
  onAutoFarmComplete: (earnedCoins: number, joinedIds: string[]) => void;
  lang: 'FR' | 'EN';
}

export const AutoFarmModal: React.FC<AutoFarmModalProps> = ({
  isOpen,
  onClose,
  servers,
  user,
  onAutoFarmComplete,
  lang
}) => {
  const [targetCount, setTargetCount] = useState<number>(5);
  const [delaySeconds, setDelaySeconds] = useState<number>(2);
  const [filterLang, setFilterLang] = useState<'ALL' | 'FR'>('ALL');
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentServerName, setCurrentServerName] = useState<string>('');
  const [sessionCoins, setSessionCoins] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Available servers to farm (excluding already joined)
  const availableToFarm = servers.filter((s) => {
    if (user.joinedServerIds.includes(s.id)) return false;
    if (filterLang === 'FR' && s.language !== 'FR' && s.category !== 'french') return false;
    return true;
  });

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('fr-FR');
    setLogs((prev) => [...prev, `[${time}] ${msg}`]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      const candidates = availableToFarm.slice(0, targetCount);

      if (candidates.length === 0) {
        addLog('⚠️ Aucun nouveau serveur disponible pour ce filtre !');
        setIsRunning(false);
        return;
      }

      let step = currentProgress;
      let earned = sessionCoins;
      const newlyJoined: string[] = [];

      timer = setInterval(() => {
        if (step >= candidates.length || step >= targetCount) {
          clearInterval(timer);
          setIsRunning(false);
          addLog(`✅ Session terminée avec succès ! Total : +${earned.toFixed(2)} Coins.`);
          sounds.playSuccess();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
          onAutoFarmComplete(earned, newlyJoined);
          return;
        }

        const srv = candidates[step];
        setCurrentServerName(srv.name);
        step += 1;
        earned += srv.rewardCoins;
        newlyJoined.push(srv.id);

        setCurrentProgress(step);
        setSessionCoins(earned);
        sounds.playCoin();

        addLog(`⚡ Rejoint: "${srv.name}" -> Vérification 4j OK (+${srv.rewardCoins.toFixed(2)} Coins)`);
      }, delaySeconds * 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, currentProgress]);

  if (!isOpen) return null;

  const startAutoFarm = () => {
    sounds.playClick();
    setLogs([]);
    setCurrentProgress(0);
    setSessionCoins(0);
    addLog(`🚀 Démarrage du moteur Auto-Farm Join4Join (${targetCount} serveurs ciblés)...`);
    addLog(`🛡️ Protection anti-rate limit Discord configurée à ${delaySeconds}s d'intervalle.`);
    setIsRunning(true);
  };

  const stopAutoFarm = () => {
    sounds.playClick();
    setIsRunning(false);
    addLog('⏹️ Auto-Farm mis en pause par l\'utilisateur.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#12141f] border border-[#5865F2]/40 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl shadow-[#5865F2]/20 relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#5865F2]/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black shadow-lg shadow-amber-500/30">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">
                  {lang === 'FR' ? 'Mode Auto-Farm' : 'Auto-Farm Mode'}
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PRO
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {lang === 'FR' ? 'Rejoignez automatiquement les serveurs pour accumuler vos pièces sans effort.' : 'Automatically join matching servers in sequence to rack up coins.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isRunning) stopAutoFarm();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls config (only enabled when not running) */}
        {!isRunning && currentProgress === 0 ? (
          <div className="space-y-4 mb-6 relative z-10">
            {/* Target count */}
            <div className="bg-[#0c0e17] p-3.5 rounded-2xl border border-white/5">
              <label className="text-xs font-semibold text-gray-300 flex items-center justify-between mb-2">
                <span>Nombre de serveurs à rejoindre</span>
                <span className="text-amber-400 font-mono font-bold">{targetCount} serveurs</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 8, 12].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      sounds.playClick();
                      setTargetCount(num);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      targetCount === num
                        ? 'bg-[#5865F2] text-white shadow-md'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    +{num}
                  </button>
                ))}
              </div>
            </div>

            {/* Delay & Filter grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0c0e17] p-3.5 rounded-2xl border border-white/5">
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Intervalle anti-ban
                </label>
                <select
                  value={delaySeconds}
                  onChange={(e) => setDelaySeconds(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value={2} className="bg-[#12141f]">2 secondes (Rapide)</option>
                  <option value={3} className="bg-[#12141f]">3 secondes (Équilibré)</option>
                  <option value={5} className="bg-[#12141f]">5 secondes (Sécurisé)</option>
                </select>
              </div>

              <div className="bg-[#0c0e17] p-3.5 rounded-2xl border border-white/5">
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Filtre de langue
                </label>
                <select
                  value={filterLang}
                  onChange={(e) => setFilterLang(e.target.value as 'ALL' | 'FR')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-[#12141f]">Tous les serveurs</option>
                  <option value="FR" className="bg-[#12141f]">🇫🇷 Francophone uniquement</option>
                </select>
              </div>
            </div>

            {/* Safety notice */}
            <div className="flex items-center gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/5 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Conforme aux règles de temporisation Discord OAuth2. Déconnexion automatique après 4 jours.</span>
            </div>
          </div>
        ) : null}

        {/* Live Progress Bar & Status (when running or completed) */}
        {(isRunning || currentProgress > 0) && (
          <div className="space-y-3 mb-5 relative z-10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-medium">
                {isRunning ? `Rejoint : "${currentServerName}"` : 'Session terminée'}
              </span>
              <span className="text-amber-400 font-mono font-bold">
                {currentProgress} / {targetCount} serveurs
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
              <div
                className="h-full bg-gradient-to-r from-[#5865F2] via-amber-400 to-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentProgress / targetCount) * 100}%` }}
              />
            </div>

            {/* Real-time Coins accumulator */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/25">
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                Pièces accumulées pendant cette session :
              </span>
              <span className="text-base font-extrabold text-amber-400 font-mono">
                +{sessionCoins.toFixed(2)} COINS
              </span>
            </div>
          </div>
        )}

        {/* Live Terminal Log */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1 px-1">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#5865F2]" />
              Console d'exécution
            </span>
            <span className="font-mono text-emerald-400">STATUS: {isRunning ? 'RUNNING' : 'STANDBY'}</span>
          </div>
          <div
            ref={logContainerRef}
            className="h-32 bg-[#090b11] border border-white/5 rounded-xl p-3 font-mono text-[11px] text-gray-300 overflow-y-auto space-y-1.5"
          >
            {logs.length === 0 ? (
              <span className="text-gray-600">En attente de démarrage...</span>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="leading-tight">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Actions Button */}
        <div className="relative z-10">
          {isRunning ? (
            <button
              onClick={stopAutoFarm}
              className="w-full py-3 rounded-xl bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Arrêter l'Auto-Farm</span>
            </button>
          ) : (
            <button
              onClick={startAutoFarm}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-[#5865F2] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-black" />
              <span className="text-black">
                {currentProgress > 0 ? 'Relancer une Nouvelle Session' : `Lancer l'Auto-Farm (+${targetCount} serveurs)`}
              </span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
