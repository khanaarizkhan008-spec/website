
// The Google GenAI SDK is server-side only. Avoid importing or initializing
// it at module evaluation time in the browser (which would throw `process is
// not defined` or fail to load node-only packages). Instead, provide
// functions that either run server-side or throw a clear error when used on
// the client.

type AudioDecoder = (base64: string, ctx: AudioContext) => Promise<AudioBuffer>;

const browserError = () => {
  throw new Error(
    'AI service unavailable in the browser. Move AI calls to a server endpoint or run in a Node environment with API key configured.'
  );
};

export const ghostwriteOpening = async (_imageBase64: string, _mimeType: string) => {
  if (typeof window !== 'undefined') return browserError();
  // In a server environment you can import and use the official SDK here.
  const { GoogleGenAI } = await import('@google/genai');
  const apiKey = process.env.API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });

  const imagePart = {
    inlineData: {
      mimeType: _mimeType,
      data: _imageBase64,
    },
  };
  const textPart = {
    text: 'Analyze the mood, scene, and details of this image. Based on this, ghostwrite a compelling opening paragraph (about 100 words) for a story set in this world. The tone should be evocative and immersive.'
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
  });

  return (response as any).text || '';
};

export const narrateStory = async (_text: string) => {
  if (typeof window !== 'undefined') return browserError();
  const { GoogleGenAI, Modality } = await import('@google/genai');
  const apiKey = process.env.API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{ parts: [{ text: `Say with a narrative and expressive voice: ${_text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Puck' },
        },
      },
    },
  });

  const base64Audio = (response as any).candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error('Audio generation failed');

  return base64Audio;
};

export const decodeAudio: AudioDecoder = async (base64: string, ctx: AudioContext) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};
