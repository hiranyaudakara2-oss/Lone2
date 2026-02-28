
import { GoogleGenAI, Type } from "@google/genai";
import { LoanDetails } from "../types";

export const getFinancialAdvice = async (details: LoanDetails): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a senior financial advisor. A user is looking to take a loan of ₹${details.principal} 
  at 10% annual interest rate for ${details.tenure} months. 
  Provide a concise, professional assessment of this loan. 
  Include: 
  1. A quick risk assessment.
  2. One key tip for managing this repayment.
  3. A verdict on whether this is a manageable commitment for an average middle-class earner.
  Keep the response friendly and under 150 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our financial advisor is currently offline. Please try again later.";
  }
};
