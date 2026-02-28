
import React, { useState } from 'react';

const steps = [
  { id: 1, name: 'Identity', icon: '👤' },
  { id: 2, name: 'Income', icon: '💼' },
  { id: 3, name: 'Bank Link', icon: '🏦' },
  { id: 4, name: 'Review', icon: '📄' }
];

const ApplicationStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-12 rounded-2xl text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-emerald-900 mb-2">Application Submitted!</h3>
        <p className="text-emerald-700">Our agents will verify your details and disburse the amount within 2 hours.</p>
        <button 
          onClick={() => {setSubmitted(false); setCurrentStep(1);}}
          className="mt-6 text-emerald-600 font-semibold hover:underline"
        >
          View Status
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between mb-8 overflow-x-auto pb-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center min-w-[80px]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
              currentStep >= step.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'
            }`}>
              {step.id < currentStep ? '✓' : step.icon}
            </div>
            <span className={`text-xs font-medium ${currentStep === step.id ? 'text-blue-600' : 'text-slate-400'}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-[200px]">
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="font-bold text-slate-800">Step 1: Identity Verification</h4>
            <input type="text" placeholder="Full Name as per PAN" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
            <input type="text" placeholder="PAN Number (XXXXX0000X)" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="font-bold text-slate-800">Step 2: Income Details</h4>
            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500">
              <option>Salaried</option>
              <option>Self-Employed</option>
              <option>Freelancer</option>
            </select>
            <input type="number" placeholder="Monthly Net Income" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn text-center py-8">
            <div className="text-5xl mb-4">🏦</div>
            <h4 className="font-bold text-slate-800">Step 3: Connect Bank Account</h4>
            <p className="text-slate-500 text-sm">We use secure 256-bit encryption to verify your statement.</p>
            <button className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-black transition-colors">
              Link via NetBanking
            </button>
          </div>
        )}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="font-bold text-slate-800">Step 4: Review & Sign</h4>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-600 h-32 overflow-y-auto">
              I hereby authorize LONE.LK to access my credit bureau reports and verify my identity... [T&C Details]
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">I agree to the terms and conditions</span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4">
        {currentStep > 1 && (
          <button 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex-1 py-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl transition-all"
          >
            Back
          </button>
        )}
        <button 
          onClick={handleNext}
          className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          {currentStep === 4 ? 'Confirm & Apply' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default ApplicationStepper;
