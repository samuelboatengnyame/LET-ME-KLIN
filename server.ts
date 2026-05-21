import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe Lazy Initializer for Google GenAI SDK
  let ai: GoogleGenAI | null = null;
  try {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Successfully initialized Gemini assistant with GoogleGenAI SDK.");
    } else {
      console.warn("GEMINI_API_KEY is not defined. Bot running in beautiful simulation state.");
    }
  } catch (err) {
    console.error("Failed to construct Gemini SDK client: ", err);
  }

  // AI Chat bot instructions
  const SYSTEM_INSTRUCTION = `You are "KlynBot", the elite friendly AI Coordinator for LetMeKlyn, a premium, five-star residential & office cleaning company.
Your guidelines are:
1. Promote our high-end, certified eco-friendly services:
   - Home Cleaning: Regular bespoke maintenance. Starting rate is $110.
   - Deep Intensive Cleaning: Baseboard scrubbing, grout detailing, appliance interiors. Starting rate is $190.
   - Office & Commercial Cleaning: Workspace workstation sanitizing. Starting rate is $240.
   - Sofa & Carpet Extraction: Steam micro-extraction. Starting rate is $130.
   - Move-in / Move-out Cleaning: Complete scale and deposit return detailing. Starting rate is $280.
   - Post-Construction Detailing: Plaster dust scraping, tape removal. Starting rate is $350.
   - Fumigation & Pest Disinfection: Cold thermal bio-safe fogging. Starting rate is $160.
2. Emphasize that we use 100% kid-safe, biodegradable, pet-safe, and allergen-free formulas with zero toxic fumes.
3. Highlight are satisfaction guarantee: If anything is less than pristine, we dispatch a team to re-polish it free.
4. Encourage bookings via the online Book Online tab or dynamic Pricing Calculator under the Services tab!
Keep responses concise, premium, highly courteous, and perfectly organized with scannable bullet points.`;

  // API chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message prompt is required." });
      }

      if (!ai) {
        // Safe, satisfying fallback to maintain excellent UX inside sandboxes
        return res.json({
          text: `Hello! I'm KlynBot, your LetMeKlyn cleaning care concierge. I'm currently running in sandbox-assistance mode. Just so you know, our premium Home Cleaning starts at $110, and Deep Intensive scheduling starts at $190. All bookings include certified, vetted crew squads equipped with premium biochemical safe detergents. You can schedule an instant clean right now using our "Book Online" tab! What room layout can I estimate for you?`
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API backend error:", error);
      res.status(500).json({ error: error.message || "Internal Server assistant mismatch." });
    }
  });

  // Hot module replacement or static server selection
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware attached in server.ts");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving production static folders from dist/ inside server.ts");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
