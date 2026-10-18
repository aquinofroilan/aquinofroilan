import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";

const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
    }
    return new GoogleGenAI({ apiKey });
};

export async function generateBlogContent() {
    const ai = getAI();
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

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

    const prompt = [
        `Write a detailed technical blog post about ${randomTopic} for software developers.`,
        "The post should be 500-800 words, include code examples where appropriate, and be formatted in markdown.",
        "Include a catchy title at the beginning. Make it informative, practical, and engaging.",
        "Format the response as:",
        "Title: [Your Title Here]",
        "",
        "[Your markdown content here with ## headings, code blocks, and proper formatting]",
    ].join(" ");

    try {
        const result = await ai.models.generateContent({
            model: model,
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 4096,
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    },
                ],
            },
        });

        const text = result.text;

        if (!text) {
            throw new Error("No content generated");
        }

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
