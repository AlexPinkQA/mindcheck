import React from 'react';
import { HeartHandshake, Phone, MessageCircle, X } from 'lucide-react';
import { crisisContacts } from '../data/crisisContacts';
import { Language, translations } from '../data/translations';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isUnder18?: boolean;
  isTraumaContext?: boolean;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({
  isOpen,
  onClose,
  language,
  isUnder18 = false,
  isTraumaContext = false,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const contactsList = crisisContacts['UA']; // Default country contacts

  // Sort contacts: prioritize trauma-specific if trauma context, youth-specific if under 18
  const sortedContacts = [...contactsList].sort((a, b) => {
    if (isTraumaContext) {
      if (a.isTraumaSpecific && !b.isTraumaSpecific) return -1;
      if (!a.isTraumaSpecific && b.isTraumaSpecific) return 1;
    }
    if (isUnder18) {
      if (a.isYouthSpecific && !b.isYouthSpecific) return -1;
      if (!a.isYouthSpecific && b.isYouthSpecific) return 1;
    }
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overscroll-contain animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-950/60 overflow-hidden text-slate-900 dark:text-slate-100 max-h-[calc(100dvh-2rem)] flex flex-col my-auto">
        {/* Top banner */}
        <div className="bg-rose-600 dark:bg-rose-700 px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="p-2 bg-white/20 rounded-xl shrink-0">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold truncate leading-tight">{t.crisisModalTitle}</h2>
              <p className="text-[11px] sm:text-xs text-rose-100 truncate leading-normal">{t.crisisModalSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
            aria-label={t.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Single smooth scrollable container) */}
        <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto overscroll-contain flex-1">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {t.crisisModalDesc}
          </p>

          <div className="space-y-2.5 pt-1">
            {sortedContacts.map((c, idx) => (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl border transition ${
                  c.isYouthSpecific
                    ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 ring-1 ring-teal-200 dark:ring-teal-900'
                    : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{c.name}</span>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{c.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {c.isTraumaSpecific && (
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-amber-600 dark:bg-amber-500 text-white rounded-full whitespace-nowrap">
                        {t.crisisTraumaTag}
                      </span>
                    )}
                    {c.isYouthSpecific && (
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-teal-600 dark:bg-teal-500 text-white rounded-full whitespace-nowrap">
                        {t.crisisYouthTag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-2">
                  {c.phone && (
                    <a
                      href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {t.crisisCall(c.phone)}
                    </a>
                  )}
                  {c.chatUrl && (
                    <a
                      href={c.chatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {t.crisisChat}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Bottom Footer with full dismiss button */}
        <div className="px-4 py-3 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 text-center shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            {t.crisisDismiss}
          </button>
        </div>
      </div>
    </div>
  );
};