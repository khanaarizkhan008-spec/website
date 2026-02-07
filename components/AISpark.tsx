
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Volume2, Sparkles, Loader2, Play, Pause } from 'lucide-react';
import { ghostwriteOpening, narrateStory, decodeAudio } from '../services/geminiService';
import { WavyUnderline } from '../constants';

const AISpark: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateStory = async () => {
    if (!image) return;
    setLoading(true);
    setStory('');
    try {
      const result = await ghostwriteOpening(image, mimeType);
      setStory(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate spark. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleNarrate = async () => {
    if (!story) return;
    if (isNarrating) {
      audioSourceRef.current?.stop();
      setIsNarrating(false);
      return;
    }

    setLoading(true);
    try {
      const base64Audio = await narrateStory(story);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const buffer = await decodeAudio(base64Audio, audioContextRef.current);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsNarrating(false);
      
      audioSourceRef.current = source;
      source.start();
      setIsNarrating(true);
    } catch (error) {
      console.error(error);
      alert("Audio failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      <header className="text-center">
        <h1 className="font-display text-6xl md:text-7xl mb-4 tracking-tight">
          Study <br />
          <span className="italic">Mood Spark</span>
        </h1>
        <div className="w-48 mx-auto">
          <WavyUnderline color="#000" />
        </div>
        <p className="text-gray-500 mt-6 text-xl">Upload a study space photo for AI-powered motivation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Upload Side */}
        <div className="space-y-6">
          <div className="relative aspect-square bg-gray-50 rounded-[48px] overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group">
            {image ? (
              <img src={`data:${mimeType};base64,${image}`} className="w-full h-full object-cover" alt="Study Space" />
            ) : (
              <div className="text-center p-12">
                <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Upload your study environment</p>
                <p className="text-gray-300 text-xs mt-2 uppercase tracking-widest font-mono">PNG or JPEG</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleImageUpload}
            />
          </div>
          
          <button 
            disabled={!image || loading}
            onClick={generateStory}
            className="w-full bg-black text-white py-6 rounded-[32px] font-bold flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:scale-100 hover:scale-[1.02] transition-all shadow-xl disabled:shadow-none"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
            Generate Motivation Spark
          </button>
        </div>

        {/* Story Side */}
        <div className="space-y-8 bg-white p-10 rounded-[48px] shadow-[0_32px_64px_rgba(0,0,0,0.06)] min-h-[400px] border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-3xl">Your Spark</h3>
            <button 
              disabled={!story || loading}
              onClick={handleNarrate}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isNarrating ? 'bg-red-500 text-white animate-pulse' : 'bg-black text-white hover:scale-110 shadow-lg'
              } disabled:bg-gray-100 disabled:text-gray-400`}
            >
              {isNarrating ? <Pause className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {story ? (
              <motion.div 
                key="story"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-700 leading-relaxed text-xl font-medium italic relative"
              >
                <span className="text-5xl font-display text-gray-200 absolute -top-8 -left-4">“</span>
                {story}
                <span className="text-5xl font-display text-gray-200 absolute -bottom-8 -right-4">”</span>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                className="flex-1 flex flex-col items-center justify-center text-gray-300 text-center gap-4"
              >
                <PenTool className="w-12 h-12" />
                <p>Upload an image and hit generate to receive an AI-ghostwritten opening to your study session.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {story && (
            <div className="mt-auto pt-8 flex items-center justify-center">
              <div className="h-px flex-1 bg-gray-100" />
              <div className="px-4 text-[10px] font-mono tracking-widest text-gray-300 uppercase">End of Spark</div>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PenTool = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
    <path d="M2 2l5 5"/>
    <path d="M11 11l1 1"/>
  </svg>
);

export default AISpark;
