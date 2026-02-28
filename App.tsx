
import React, { useState, useCallback } from 'react';
import { LoanDetails } from './types';
import LoanCalculator from './components/LoanCalculator';
import AdviceSection from './components/AdviceSection';
import ApplicationStepper from './components/ApplicationStepper';

const App: React.FC = () => {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    principal: 50000,
    tenure: 12,
    interestRate: 10
  });

  const handleDetailsChange = useCallback((details: LoanDetails) => {
    setLoanDetails(details);
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <span className="text-white font-black text-xl">L</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">LONE.LK</h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-md">
              My Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Tools */}
        <div className="lg:col-span-7 space-y-8">
          <section>
            <div className="mb-6">
              <h2 className="text-4xl font-black text-slate-900 mb-2">Instant Loans.</h2>
              <p className="text-slate-500 text-lg">Transparent lending at flat 10% annual interest.</p>
            </div>
            <LoanCalculator onDetailsChange={handleDetailsChange} />
          </section>

          <section>
            <AdviceSection details={loanDetails} />
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-100 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-xs font-bold text-slate-800">Quick Disbursal</p>
              <p className="text-[10px] text-slate-400">Within 2 hours</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-100 text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <p className="text-xs font-bold text-slate-800">Secure</p>
              <p className="text-[10px] text-slate-400">Bank-grade safety</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-100 text-center">
              <div className="text-2xl mb-2">📄</div>
              <p className="text-xs font-bold text-slate-800">No Collateral</p>
              <p className="text-[10px] text-slate-400">Paperless process</p>
            </div>
          </section>
        </div>

        {/* Right Column - Application */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Apply Now</h3>
                <p className="text-sm text-slate-500">Complete in 3 minutes</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Eligibility</p>
                <p className="text-sm text-slate-800 font-semibold">98.5% Approval</p>
              </div>
            </div>
            <ApplicationStepper />
            
            <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support Line</span>
                <span className="text-xs text-blue-400">Live Now</span>
              </div>
              <p className="text-lg font-bold mb-1">Need help with your application?</p>
              <p className="text-sm text-slate-400 mb-4">Talk to our experts to get faster approvals and personalized loan plans.</p>
              <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                Call Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating CTA for Mobile */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
        <button className="w-full py-4 bg-blue-600 text-white font-black text-lg rounded-2xl shadow-2xl shadow-blue-400">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default App;
