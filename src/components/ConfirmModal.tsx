import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  language: Language;
}

const confirmTexts: Record<Language, { title: string; desc: string; cancel: string; confirm: string }> = {
  uk: {
    title: 'Почати спочатку?',
    desc: 'Ви впевнені, що хочете повернутися на головний екран? Поточний прогрес тестування буде скинуто.',
    cancel: 'Продовжити тест',
    confirm: 'Так, почати спочатку',
  },
  en: {
    title: 'Restart assessment?',
    desc: 'Are you sure you want to return to the home screen? Your current progress will be reset.',
    cancel: 'Continue test',
    confirm: 'Yes, restart',
  },
  es: {
    title: '¿Reiniciar la prueba?',
    desc: '¿Está seguro de que desea volver al inicio? El progreso actual se restablecerá.',
    cancel: 'Continuar prueba',
    confirm: 'Sí, reiniciar',
  },
  pt: {
    title: 'Recomeçar a avaliação?',
    desc: 'Tem a certeza de que deseja voltar ao início? O progresso atual será reiniciado.',
    cancel: 'Continuar teste',
    confirm: 'Sim, recomeçar',
  },
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  language,
}) => {
  if (!isOpen) return null;
  const t = confirmTexts[language] || confirmTexts['uk'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-6 text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label={translations[language]?.closeBtn || 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-2xl shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              {t.desc}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};