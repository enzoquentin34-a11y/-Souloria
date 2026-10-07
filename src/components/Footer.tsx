import React from 'react';
import { Compass, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ lang: 'FR' | 'EN' }> = ({ lang }) => {
  return (
    <footer className="bg-[#08090e] border-t border-white/5 py-12 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shadow-md shadow-[#5865F2]/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-bold text-white text-base">
                Join<span className="text-[#5865F2]">4</span>Join<span className="text-gray-500 text-xs">.xyz</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Le réseau de croissance Discord #1 depuis 2019.
              </p>
            </div>
          </div>

          {/* Safe Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-gray-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sécurisé avec l'API OAuth2 officielle de Discord Inc.</span>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-5 text-gray-400">
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="#discord" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors flex items-center gap-1">
              <span>Support Discord</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Disclaimer Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            Join4Join.xyz n'est pas affilié à Discord Inc. Toutes les marques déposées appartiennent à leurs propriétaires respectifs.
          </p>
          <div className="flex items-center gap-1">
            <span>Fait avec passion pour la communauté Discord</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
