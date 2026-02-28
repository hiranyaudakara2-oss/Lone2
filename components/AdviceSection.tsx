
import React, { useState, useEffect } from 'react';
import { LoanDetails } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface Props {
  details: LoanDetails;
}

const AdviceSection: React.FC<Props> = ({ details }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const result = await getFinancialAdvice(details);
      setAdvice(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details.principal, details.tenure]);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">AI Financial Insight</h3>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <p className="text-blue-100 leading-relaxed italic">
              "{advice}"
            </p>
          </div>
        )}

        <button 
          onClick={fetchAdvice}
          className="mt-6 text-xs font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 transition-all"
        >
          Refresh Analysis
        </button>
      </div>
    </div>
  );
};

export default AdviceSection;
