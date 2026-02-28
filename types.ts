
export interface LoanDetails {
  principal: number;
  tenure: number; // in months
  interestRate: number; // annual percentage
}

export interface EMICalculation {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export interface FinancialAdvice {
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
  points: string[];
}
