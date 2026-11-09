import React from 'react';
import { HeartHandshake, Phone, MessageCircle, X } from 'lucide-react';
import { crisisContacts } from '../data/crisisContacts';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryCode?: string;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose, countryCode = 'UA' }) => {
  if (!isOpen) return null;

  const contacts = crisisContacts[countryCode] || crisisContacts['UA'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden">
        {/* Top banner */}
        <div className="bg-rose-500 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Твоє життя має значення</h2>
              <p className="text-xs text-rose-100">Ти не мусиш проходити крізь це наодинці</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Якщо ти відчуваєш нестерпний душевний біль або думаєш про заподіяння собі шкоди — будь ласка, звернися до людей, які вміють підтримати. Це <strong>цілком безкоштовно та анонімно</strong>.
          </p>

          <div className="space-y-3 pt-1">
            {contacts.map((c, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition ${
                  c.isYouthSpecific
                    ? 'bg-teal-50/70 border-teal-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-sm text-slate-900">{c.name}</span>
                    <p className="text-xs text-slate-600 mt-0.5">{c.description}</p>
                  </div>
                  {c.isYouthSpecific && (
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-teal-600 text-white rounded-full whitespace-nowrap">
                      Для молоді
                    </span>
                  )}
                </div>

                <div className="mt-2.5 flex flex-wrap gap-2">
                  {c.phone && (
                    <a
                      href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Зателефонувати ({c.phone})
                    </a>
                  )}
                  {c.chatUrl && (
                    <a
                      href={c.chatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-medium hover:bg-teal-800 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Написати в чат підтримки
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4"
            >
              Я розумію, продовжити проходження тесту
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
