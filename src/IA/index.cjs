const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.IA_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function prompt(prompt) {
  const BaseText = "I want you to check if the following message is from someone looking for a freelancer or a job vacancy announcement. If yes, return ONLY 'Yes', otherwise return ONLY 'No':\n"
  const result = await model.generateContent(BaseText+prompt)

  return await result.response.text()
};
