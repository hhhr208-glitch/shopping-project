import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("=== CHAT API CALLED ===");
  
  try {
    // Debug info
    console.log("DEEPSEEK_API_KEY exists:", !!process.env.DEEPSEEK_API_KEY);
    console.log("API Key starts with:", process.env.DEEPSEEK_API_KEY?.substring(0, 10));
    
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { content: "Service configuration error: API key missing." },
        { status: 500 }
      );
    }

    const { message } = await req.json();
    console.log("Received message:", message);
    
    // Input validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { content: "Please enter a valid message." },
        { status: 400 }
      );
    }

    console.log("🔄 Calling DeepSeek API...");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful assistant for an ecommerce website. Keep responses concise and helpful." 
          },
          { 
            role: "user", 
            content: message 
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("📡 DeepSeek API response status:", response.status);
    
    if (!response.ok) {
      let errorText = "Unknown error";
      try {
        errorText = await response.text();
        console.error("DeepSeek API error response:", errorText);
      } catch (e) {
        console.error("Could not read error response");
      }
      
      let errorMessage = "AI service is currently unavailable. Please try again later.";
      
      if (response.status === 401) {
        errorMessage = "Authentication failed. Please check your API key.";
      } else if (response.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again in a moment.";
      } else if (response.status === 502 || response.status === 503) {
        errorMessage = "AI service is temporarily down. Please try again later.";
      }

      return NextResponse.json({ content: errorMessage });
    }

    const data = await response.json();
    console.log("✅ DeepSeek API success!");
    console.log("Response structure:", Object.keys(data));
    
    const content = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    console.log("Bot response length:", content.length);
    
    return NextResponse.json({ content });

  } catch (err: any) {
    console.error("💥 Unexpected error in API route:", err);
    
    if (err.name === 'AbortError') {
      return NextResponse.json({ 
        content: "Request timeout. The AI service is taking too long to respond." 
      });
    }
    
    return NextResponse.json({ 
      content: "Service temporarily unavailable. Please try again later." 
    });
  }
}