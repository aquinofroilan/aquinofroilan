import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateBlogContent() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const topics = [
        "programming best practices",
        "software design patterns",
        "web development trends",
        "coding tips and tricks",
        "algorithm optimization",
        "software architecture",
        "clean code principles",
        "testing strategies",
        "performance optimization",
        "security best practices",
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    const prompt = `Write a detailed technical blog post about ${randomTopic} for software developers. 
    The post should be 500-800 words, include code examples where appropriate, and be formatted in markdown. 
    Include a catchy title at the beginning. Make it informative, practical, and engaging.
    Format the response as:
    Title: [Your Title Here]
    
    [Your markdown content here with ## headings, code blocks, and proper formatting]`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse title and content
        const lines = text.split("\n");
        let title = "Programming Insights";
        let content = text;

        if (lines[0].startsWith("Title:")) {
            title = lines[0].replace("Title:", "").trim();
            content = lines.slice(1).join("\n").trim();
        }

        return { title, content };
    } catch (error) {
        console.error("Error generating blog content:", error);
        throw error;
    }
}
