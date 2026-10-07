import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LiveActivityItem } from '../types';
import { INITIAL_ACTIVITIES } from '../data/initialData';

export const LiveTicker: React.FC = () => {
  const [activities, setActivities] = useState<LiveActivityItem[]>(INITIAL_ACTIVITIES);

  // Periodically add subtle activity updates to simulate live network traffic
  useEffect(() => {
    const dummyNames = ['Alex_FR', 'KiraGaming', 'NeoVortex', 'Slyther', 'Maxou_99', 'PixelBoy', 'Elenoir'];
    const dummyServers = ['Valorant France Hub', 'Anime Chill Cafe', 'DevZone FR', 'LoFi Beats 24/7', 'Minecraft Empire'];

    const interval = setInterval(() => {
      const randomUser = dummyNames[Math.floor(Math.random() * dummyNames.length)];
      const randomServer = dummyServers[Math.floor(Math.random() * dummyServers.length)];
      const id = 'act-' + Date.now();

      const newAct: LiveActivityItem = {
        id,
        user: `${randomUser}#${Math.floor(1000 + Math.random() * 9000)}`,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=64&auto=format&fit=crop&q=80`,
        action: 'joined',
        target: randomServer,
        reward: '+0.75 Coins',
        timeAgo: 'à l\'instant'
      };

      setActivities(prev => [newAct, ...prev.slice(0, 5)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#090b10] border-b border-white/5 py-2 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        
        {/* Live indicator badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            En direct
          </span>
        </div>

        {/* Marquee ticker */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 text-gray-300">
          {activities.map((act) => (
            <div key={act.id} className="flex items-center gap-2 flex-shrink-0 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              <span className="font-medium text-white">{act.user}</span>
              <span className="text-gray-400">a rejoint</span>
              <span className="text-[#5865F2] font-semibold">{act.target}</span>
              {act.reward && (
                <span className="text-amber-400 font-mono text-[11px] font-bold">
                  {act.reward}
                </span>
              )}
              <span className="text-gray-500 text-[10px]">• {act.timeAgo}</span>
            </div>
          ))}
        </div>

        {/* Info pill */}
        <div className="hidden md:flex items-center gap-1.5 text-gray-400 text-[11px] flex-shrink-0">
          <span>Taux de rétention :</span>
          <span className="text-emerald-400 font-bold">89.4%</span>
        </div>

      </div>
    </div>
  );
};
