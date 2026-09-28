import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Voice Agent explanation endpoint
app.post('/api/voice-agent', async (req, res) => {
  try {
    const { question, storyTitle, storyContent, language = 'hi' } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!ai) {
      // Friendly local fallback if API key is not yet set
      const isHindi = language === 'hi';
      const isGujarati = language === 'gu';
      const isMarathi = language === 'mr';

      let fallbackAnswer = `नमस्ते! मैं आपकी 'कहानी दीदी' हूँ। ${storyTitle ? `"${storyTitle}"` : 'इस कहानी'} के बारे में आपका सवाल बहुत प्यारा है। यह कहानी हमें सिखाती है कि बुद्धि और धैर्य से हर मुश्किल हल हो सकती है। आप मुझसे कोई भी बात पूछ सकते हैं!`;
      if (isGujarati) {
        fallbackAnswer = `નમસ્તે! હું તમારી 'વાર્તા સાથી' છું. ${storyTitle ? `"${storyTitle}"` : 'આ વાર્તા'} વિશે તમારો પ્રશ્ન ખૂબ સરસ છે. આ વાર્તા આપણને બુદ્ધિ અને ધીરજથી કામ લેવાની સુંદર શીખ આપે છે!`;
      } else if (isMarathi) {
        fallbackAnswer = `नमस्कार! मी तुमची 'कथा सखी' आहे. ${storyTitle ? `"${storyTitle}"` : 'या गोष्टी'}बद्दल तुमचा प्रश्न खूप छान आहे. ही कथा आपल्याला शिकवते की संकटात धीर आणि बुद्धीने काम केले पाहिजे!`;
      } else if (language === 'en') {
        fallbackAnswer = `Hello! I am your Story Companion. That is a wonderful question about ${storyTitle ? `"${storyTitle}"` : 'this story'}. It teaches us that wisdom and patience can solve any difficulty. Feel free to ask me anything else!`;
      }

      return res.json({ answer: fallbackAnswer });
    }

    const languageGuides: Record<string, string> = {
      hi: 'Reply in clean, easy conversational Hindi (Devanagari script), using relatable warm Indian expressions like "बेटा", "दोस्त", "प्यारी सीख".',
      gu: 'Reply in sweet, natural conversational Gujarati (Gujarati script), using warm familial expressions like "બેટા", "દોસ્ત", "સુંદર શીખ".',
      mr: 'Reply in affectionate, clear conversational Marathi (Devanagari script), using warm expressions like "बाळा", "मित्रा", "सुंदर शिकवण".',
      en: 'Reply in simple, clear, warm English with genuine Indian warmth and relatable storytelling charm.',
    };

    const langInstruction = languageGuides[language] || languageGuides.hi;

    const systemInstruction = `You are "कहानी साथी" (Story Saathi / Didi), a warm, kind, and wise Indian elder sister and master storyteller speaking directly to Indian families (children, parents, grandparents).
The user is listening to or reading the story titled "${storyTitle || 'कथा'}".

Story excerpt / context:
"${(storyContent || '').slice(0, 3000)}"

Instructions:
1. ${langInstruction}
2. Explain the answer in simple, warm, sweet conversational language so anyone in an Indian family can easily understand.
3. Keep the answer between 2 to 4 sentences so it is very pleasant and natural to listen to via voice speech.
4. If asked about the moral ("सीख" / "શીખ" / "शीक"), state the core moral clearly in one memorable line.
5. Do NOT use complex academic jargon. Make it heart-warming and memorable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text?.trim() || 'कहानी बहुत सुंदर है। आप कोई और सवाल भी पूछ सकते हैं!';
    res.json({ answer });
  } catch (err: any) {
    console.error('Gemini Voice Agent Error:', err);
    res.status(500).json({
      error: err.message || 'Internal server error',
      answer:
        'माफ़ कीजिए, अभी संपर्क नहीं हो सका। लेकिन यह कहानी हमें प्रेम, सच्चाई और समझदारी का संदेश देती है।',
    });
  }
});

// Automatic Story Intelligence Extraction endpoint
app.post('/api/story-intelligence', async (req, res) => {
  try {
    const { title, content, genre, characters = [] } = req.body;

    if (!ai) {
      return res.json({
        recommendedMusic: 'bansuri',
        mood: 'Clever & Inspiring',
        genre: genre || 'Folklore',
      });
    }

    const prompt = `Analyze this story for an intelligent audio storytelling engine.
Title: "${title}"
Genre: "${genre}"
Content excerpt: "${(content || '').slice(0, 1500)}"

Return a valid JSON object with these keys:
{
  "genre": "Short genre description with Indian context",
  "genreType": "historical_royal" | "traditional_folk" | "animal_fable" | "adventure" | "bedtime" | "magical_fantasy" | "emotional" | "cheerful_playful" | "suspense_mystery" | "sacred_mythological",
  "mood": "Short mood description (e.g. Royal & Dignified, Playful & Funny, Calm Bedtime)",
  "setting": "Setting description (e.g. Royal Court, Dense Forest, Ancient Village)",
  "recommendedMusic": "royal_court" | "light_folk" | "forest_nature" | "adventure_cinematic" | "bedtime_calm" | "magical_fantasy" | "emotional_gentle" | "cheerful_playful" | "suspense_mystery" | "shankh_aarti" | "bansuri" | "sitar" | "temple",
  "musicReason": "One sentence explaining why this music fits",
  "storyIntensity": "gentle" | "moderate" | "dramatic",
  "narratorPace": 0.88 to 1.05
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Story Intelligence Error:', err);
    res.json({
      recommendedMusic: 'bansuri',
      mood: 'Inspiring & Moral',
    });
  }
});

// On-demand Story Translation endpoint (for multilingual narration)
app.post('/api/story-translate', async (req, res) => {
  try {
    const { text, targetLang = 'hi', storyTitle } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ai) {
      return res.json({ translatedText: text });
    }

    const langNames: Record<string, string> = {
      hi: 'Hindi (Devanagari script)',
      gu: 'Gujarati (Gujarati script)',
      mr: 'Marathi (Devanagari script)',
      en: 'English',
      bn: 'Bengali',
      ta: 'Tamil',
      te: 'Telugu',
      kn: 'Kannada',
      ml: 'Malayalam',
      pa: 'Punjabi',
      ur: 'Urdu',
    };

    const targetName = langNames[targetLang] || 'Hindi';

    const prompt = `Translate and adapt the following story excerpt for the story "${storyTitle || ''}" into natural, beautiful, child-friendly storytelling prose in ${targetName}.
Keep all character names, dialogue expressions, and moral essence intact. Do NOT translate mechanically; perform it as a natural storyteller.

Original text:
${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    const translatedText = response.text?.trim() || text;
    res.json({ translatedText });
  } catch (err: any) {
    console.error('Story Translate Error:', err);
    res.json({ translatedText: req.body.text || '' });
  }
});

// Lyria AI Music Generation endpoint (lyria-3-clip-preview & lyria-3-pro-preview)
app.post('/api/generate-music', async (req, res) => {
  try {
    const { prompt, model = 'lyria-3-clip-preview', storyTitle } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY.',
      });
    }

    const selectedModel =
      model === 'lyria-3-pro-preview' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    const fullPrompt = storyTitle
      ? `${prompt}. Background soundtrack for the Indian story "${storyTitle}".`
      : prompt;

    const responseStream = await ai.models.generateContentStream({
      model: selectedModel,
      contents: fullPrompt,
    });

    let audioBase64 = '';
    let lyrics = '';
    let mimeType = 'audio/wav';

    for await (const chunk of responseStream) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;

      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
        if (part.text && !lyrics) {
          lyrics = part.text;
        }
      }
    }

    if (!audioBase64) {
      return res.status(500).json({
        error: 'No audio stream returned from Lyria model. Please try a different music prompt.',
      });
    }

    res.json({
      audioBase64,
      mimeType,
      lyrics,
      model: selectedModel,
      prompt,
    });
  } catch (err: any) {
    console.error('Lyria Music Generation Error:', err);
    res.status(500).json({
      error: err?.message || 'Failed to generate music with Lyria model.',
    });
  }
});

// Gemini Audio Transcription endpoint using gemini-3.5-transcribe
app.post('/api/transcribe-audio', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', prompt } = req.body;

    if (!audioBase64 || typeof audioBase64 !== 'string') {
      return res.status(400).json({ error: 'Audio data (base64) is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
      });
    }

    const cleanBase64 = audioBase64.includes('base64,')
      ? audioBase64.split('base64,')[1]
      : audioBase64;

    const interaction = await ai.interactions.create({
      model: 'gemini-3.5-transcribe',
      input: [
        {
          type: 'audio',
          data: cleanBase64,
          mime_type: mimeType,
        },
        {
          type: 'text',
          text:
            prompt ||
            'Transcribe this spoken audio accurately. Preserve natural phrasing and sentence structure. If the speaker speaks in Hindi, Gujarati, Marathi, or English, transcribe in that specific native script (Devanagari, Gujarati, or Latin script).',
        },
      ],
    });

    let transcript = interaction.output_text || '';
    if (!transcript && interaction.steps) {
      for (const step of interaction.steps) {
        if (step.type === 'model_output') {
          const textPart = step.content?.find((c: any) => c.type === 'text');
          if (textPart && textPart.text) {
            transcript += textPart.text;
          }
        }
      }
    }

    res.json({
      transcript: transcript.trim() || 'No clear speech detected in the audio.',
      model: 'gemini-3.5-transcribe',
    });
  } catch (err: any) {
    console.error('Audio Transcription Error:', err);
    res.status(500).json({
      error: err?.message || 'Failed to transcribe audio with gemini-3.5-transcribe.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`StoryWeave Indian Edition server running on http://0.0.0.0:${port}`);
  });
}

startServer();
