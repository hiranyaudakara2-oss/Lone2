
import { LoanDetails, EMICalculation } from '../types';

export const calculateEMI = (details: LoanDetails): EMICalculation => {
  const { principal, tenure, interestRate } = details;
  const monthlyRate = interestRate / 12 / 100;
  
  if (monthlyRate === 0) {
    return {
      emi: principal / tenure,
      totalInterest: 0,
      totalPayment: principal,
    };
  }

  const emi = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
    
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
