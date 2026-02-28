
import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { LoanDetails, EMICalculation } from '../types';
import { calculateEMI, formatCurrency } from '../utils/math';

interface Props {
  onDetailsChange: (details: LoanDetails) => void;
}

const LoanCalculator: React.FC<Props> = ({ onDetailsChange }) => {
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);
  const interestRate = 10;

  const result = useMemo(() => calculateEMI({
    principal: amount,
    tenure,
    interestRate
  }), [amount, tenure]);

  useEffect(() => {
    onDetailsChange({ principal: amount, tenure, interestRate });
  }, [amount, tenure, onDetailsChange]);

  const chartData = [
    { name: 'Principal', value: amount, color: '#0ea5e9' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f43f5e' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Loan Calculator
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Amount Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-600">Loan Amount</label>
              <span className="text-blue-600 font-bold">{formatCurrency(amount)}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-1 text-xs text-slate-400">
              <span>₹5k</span>
              <span>₹2.5L</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-600">Tenure (Months)</label>
              <span className="text-blue-600 font-bold">{tenure} Months</span>
            </div>
            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-1 text-xs text-slate-400">
              <span>6M</span>
              <span>60M</span>
            </div>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Monthly EMI</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.emi)}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
              <p className="text-xs text-rose-600 font-semibold uppercase tracking-wider">Total Interest</p>
              <p className="text-2xl font-bold text-rose-900">{formatCurrency(result.totalInterest)}</p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium uppercase">Total Repayment Amount</p>
            <p className="text-3xl font-black text-slate-900">{formatCurrency(result.totalPayment)}</p>
          </div>
        </div>

        {/* Visual Breakdown */}
        <div className="h-[300px] flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
