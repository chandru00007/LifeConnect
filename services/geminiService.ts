import { GoogleGenAI } from "@google/genai";

// API_KEY should be set in environment variables
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("Gemini API key not found in process.env.API_KEY. AI features will be disabled.");
}

const model = 'gemini-2.5-flash';

const systemInstruction = `You are "LifeBot", an AI assistant for the LifeConnect app, serving users across India.
Your primary role is to answer frequently asked questions about organ and blood donation in a clear, concise, and empathetic manner.
Your tone must be professional, reassuring, and trustworthy, reflecting the seriousness and importance of the topic.
You MUST NOT provide any medical advice. If a user asks for medical advice, gently and firmly redirect them to consult a qualified doctor or their registered hospital.
Address users with respect. You can use "Namaste" as a greeting.
Focus on topics relevant to the Indian context: the donation process, legal aspects (Transplantation of Human Organs Act), safety, eligibility, and breaking myths.
Keep answers brief and easy to understand. Use markdown (like lists or bold text) to improve readability.
If a question is in Hindi or another Indian language, try to respond in the same language if you are confident. If not, respond in simple English.
Example Query: "Is organ donation safe in India?"
Good Response: "Namaste. Yes, organ donation in India is a very safe and well-regulated medical procedure, conducted in authorized hospitals by expert surgeons. All processes follow strict government guidelines to ensure donor safety and ethical practices. For specific health concerns, it's always best to speak with a doctor."
`;

export const askLifeBot = async (question: string): Promise<string> => {
  if (!ai) {
    return "I am currently offline as the AI service is not configured. Please try again later. For urgent matters, please contact your healthcare provider or dial your local emergency number.";
  }
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
        topP: 1,
        topK: 32,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I encountered a technical error while processing your request. Please try again later. If the problem persists, you may want to check your connection.";
  }
};
