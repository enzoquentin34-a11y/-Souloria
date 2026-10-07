import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/initialData';
import { sounds } from '../utils/sound';

export const FAQSection: React.FC<{ lang: 'FR' | 'EN' }> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    sounds.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#8c97ff] text-xs font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Foire Aux Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'FR' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          {lang === 'FR' ? 'Tout ce que vous devez savoir pour grandir en toute sérénité sur Join4Join.' : 'Everything you need to know about growing safely on Join4Join.'}
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#11131c] border border-white/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
              >
                <span className="text-sm font-bold text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-[#5865F2]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-[#0d0f17]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
