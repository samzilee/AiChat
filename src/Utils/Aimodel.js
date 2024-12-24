const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
import { GoogleGenerativeAI } from "@google/generative-ai";


const chatAi = async(request) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = request;

    return await model.generateContent(prompt);
}

export {chatAi}

