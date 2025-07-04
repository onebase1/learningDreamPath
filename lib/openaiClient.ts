import { OpenAI } from "openai";


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY
  , dangerouslyAllowBrowser: true
});

console.log("API Key:", openai); // Add this line for debugging

if (!openai) {
  throw new Error('The OPENAI_API_KEY environment variable is missing or empty');
}



export default openai;
