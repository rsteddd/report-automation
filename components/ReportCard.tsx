
import React, { useState, useCallback } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface ReportCardProps {
  reportText: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ reportText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(reportText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [reportText]);

  return (
    <div className="bg-slate-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-lg relative transition-all duration-300 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10">
      <h2 className="text-2xl font-semibold mb-4 text-slate-100">Ваш звіт</h2>
      
      <button
        onClick={handleCopy}
        className="absolute top-6 right-6 p-2 rounded-lg bg-slate-700/80 hover:bg-slate-600/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-200 group"
        aria-label="Copy report"
      >
        <span className="sr-only">Копіювати звіт</span>
        {isCopied ? (
          <CheckIcon className="w-6 h-6 text-green-400" />
        ) : (
          <ClipboardIcon className="w-6 h-6 text-slate-400 group-hover:text-sky-400 transition-colors" />
        )}
      </button>

      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 min-h-[300px]">
        <pre className="text-slate-300 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
          {reportText}
        </pre>
      </div>
      
      {isCopied && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500/20 text-green-300 text-sm px-4 py-2 rounded-full border border-green-500/30">
          Скопійовано!
        </div>
      )}
    </div>
  );
};

export default ReportCard;