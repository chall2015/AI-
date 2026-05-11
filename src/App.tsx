/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  RotateCcw, 
  Share2, 
  Gamepad2, 
  Trophy,
  ArrowRight,
  Sparkles,
  Gift,
  Clock,
  Music2,
  X,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';
import { CHILDHOOD_STYLES, QUIZ_QUESTIONS, RETRO_COPY } from './constants';

type Step = 'LANDING' | 'SELECT_STYLE' | 'PROCESSING' | 'RESULT' | 'SHARE';

export default function App() {
  const [step, setStep] = useState<Step>('LANDING');
  const [selectedStyle, setSelectedStyle] = useState(CHILDHOOD_STYLES[0]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBlindBoxOpen, setIsBlindBoxOpen] = useState(false);
  const [blindBoxReward, setBlindBoxReward] = useState<string | null>(null);

  // Success Confetti
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF8C42', '#FFD166', '#EF476F']
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setStep('PROCESSING');
      // Reset quiz
      setQuizIndex(0);
    }
  };

  const handleQuizAnswer = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      // Simulate completion after quiz
      setTimeout(() => {
        setStep('RESULT');
        fireConfetti();
      }, 1000);
    }
  };

  const openBlindBox = () => {
    const rewards = ['怀旧零食礼包券', '小霸王游戏积分 x99', '复古贴纸一套', '童年勋章：冰棍达人'];
    setBlindBoxReward(rewards[Math.floor(Math.random() * rewards.length)]);
    setIsBlindBoxOpen(true);
    fireConfetti();
  };

  return (
    <div className="min-h-screen bg-[#111] text-[#333] font-sans crt-overlay">
      <main className="app-container">
        
        {/* Universal Snow Screen Effect Layer */}
        <div className="absolute inset-0 snow-screen pointer-events-none z-10" />

        <AnimatePresence mode="wait">
          {step === 'LANDING' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center justify-between p-8 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(3rem,env(safe-area-inset-bottom))] text-center"
            >
              <div className="pt-8 w-full flex justify-end">
                <button 
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="p-3 rounded-full bg-white/50 backdrop-blur-sm border border-stone-200 z-30"
                >
                  {isAudioPlaying ? <Music2 className="w-5 h-5 text-orange-500 animate-pulse" /> : <X className="w-5 h-5 text-stone-400" />}
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-12 w-full">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border-2 border-dashed border-orange-400/30 rounded-full"
                  />
                  <div className="w-48 h-48 rounded-full bg-orange-100 flex items-center justify-center border-4 border-orange-400 shadow-2xl relative">
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Clock className="w-20 h-20 text-orange-500" />
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-orange-900 tracking-tighter font-retro">
                    AI 时光机
                  </h1>
                  <p className="text-stone-500 font-medium">回到小时候 · 重拾那份纯真</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('SELECT_STYLE')}
                className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-xl shadow-[0_8px_0_0_#C2410C] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 group"
              >
                启动时光机
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}

          {step === 'SELECT_STYLE' && (
            <motion.div
              key="select"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="flex-1 flex flex-col p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-6 bg-stone-50"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => setStep('LANDING')} className="p-2 bg-white rounded-xl border border-stone-200 shadow-sm">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold">选择你的童年频道</h2>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto">
                {CHILDHOOD_STYLES.map((style) => (
                  <motion.div
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={cn(
                      "relative rounded-2xl border-2 transition-all p-4 flex gap-4 cursor-pointer overflow-hidden group",
                      selectedStyle.id === style.id ? "border-orange-500 bg-orange-50 shadow-lg" : "border-stone-200 bg-white"
                    )}
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img src={style.image} alt="" className="w-full h-full object-cover grayscale-[0.2]" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className={cn("text-lg font-bold", selectedStyle.id === style.id ? "text-orange-700" : "text-stone-700")}>{style.label}</h3>
                      <p className="text-xs text-stone-400 mt-1">{style.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative pt-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  onChange={handleImageUpload}
                />
                <motion.button
                  className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-[0_6px_0_0_#C2410C] flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" /> 开始穿越
                </motion.button>
                <p className="text-center text-[10px] text-stone-400 mt-3">请上传清晰正面照，还原效果更好哦</p>
              </div>
            </motion.div>
          )}

          {step === 'PROCESSING' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col p-8 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] bg-stone-900 text-white items-center justify-center space-y-12"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-4 border-t-orange-500 border-stone-700 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-orange-500 font-pixel text-lg"
                  >
                    AI...
                  </motion.div>
                </div>
              </div>

              <div className="w-full space-y-6 text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight">正在重启时光机...</h3>
                  <p className="text-sm text-stone-400 font-medium">正在复刻您在 '{selectedStyle.label}' 下的稚态</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1 uppercase tracking-widest"><Gamepad2 className="w-3 h-3" /> 童年记忆挑战</span>
                    <span className="text-[10px] text-stone-500 font-mono">{quizIndex + 1}/{QUIZ_QUESTIONS.length}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{QUIZ_QUESTIONS[quizIndex].question}</p>
                  <div className="grid gap-2">
                    {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                      <button key={i} onClick={handleQuizAnswer} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-left transition-colors border border-transparent hover:border-white/20">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-200">
                <img src={selectedStyle.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 border-[16px] border-white/30 pointer-events-none" />
                <div className="absolute bottom-6 right-6">
                  <span className="px-4 py-2 bg-orange-600/90 backdrop-blur-md rounded-full text-[10px] text-white font-bold tracking-widest border border-white/20 flex items-center gap-2 shadow-2xl">
                    <Sparkles className="w-3 h-3" /> CHILDHOOD VERSION
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-[0_4px_0_0_#C2410C] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
                >
                  <Music2 className="w-6 h-6" /> 生成童年专属视频
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStep('SHARE')} 
                    className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-stone-100 rounded-2xl font-bold text-stone-600 transition-all hover:border-orange-200 hover:bg-orange-50/30"
                  >
                    <Share2 className="w-4 h-4 text-stone-400" />
                    <span>保存海报</span>
                  </button>
                  <button 
                    onClick={openBlindBox} 
                    className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-stone-100 rounded-2xl font-bold text-stone-600 transition-all hover:border-orange-200 hover:bg-orange-50/30"
                  >
                    <Gift className="w-4 h-4 text-orange-500" />
                    <span>时光盲盒</span>
                  </button>
                </div>

                <button 
                  onClick={() => setStep('SELECT_STYLE')}
                  className="w-full py-4 bg-stone-100 text-stone-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors hover:bg-stone-200"
                >
                  <RotateCcw className="w-4 h-4" /> 重新生成
                </button>
              </div>
            </motion.div>
          )}

          {step === 'SHARE' && (
            <motion.div
              key="share"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex-1 flex flex-col p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-6"
            >
              <div className="flex-1 bg-white shadow-2xl rounded-[32px] p-6 flex flex-col space-y-6 border border-stone-100 relative overflow-hidden">
                <div className="flex justify-between items-center px-2">
                  <div>
                    <h4 className="text-2xl font-black text-stone-800 tracking-tighter">AI 时光报</h4>
                    <p className="text-[8px] text-stone-400 uppercase tracking-[0.2em] font-bold">Retro Edition · 2024</p>
                  </div>
                  <div className="text-right text-[10px] text-stone-300 font-mono">#TS20240601</div>
                </div>

                <div className="flex-1 rounded-2xl overflow-hidden border border-stone-200">
                  <img src={selectedStyle.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </div>

                <div className="space-y-4 px-2">
                  <p className="text-lg font-bold text-stone-700 italic border-l-4 border-orange-400 pl-4">
                    “{RETRO_COPY[Math.floor(Math.random() * RETRO_COPY.length)]}”
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                    <div className="w-12 h-12 bg-stone-800 rounded-lg flex items-center justify-center text-white shrink-0"><Camera className="w-6 h-6" /></div>
                    <div className="flex-1"><p className="text-xs font-bold text-stone-800">扫码开启时光之约</p><p className="text-[8px] text-stone-400 font-medium">致敬那个永不褪色的童年</p></div>
                    <div className="w-12 h-12 bg-stone-100 rounded-lg shrink-0 border-2 border-dashed border-stone-200" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep('RESULT')} className="flex-1 py-4 bg-stone-100 rounded-2xl font-bold text-stone-500">返回</button>
                <button className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg">立即保存</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blind Box Reward Popup */}
        <AnimatePresence>
          {isBlindBoxOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-[32px] p-8 w-full max-w-xs text-center space-y-6">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto border-4 border-orange-200"><Gift className="w-10 h-10 text-orange-500" /></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">恭喜获得！</h3>
                  <p className="text-orange-600 font-bold text-lg py-2 px-4 bg-orange-50 rounded-xl border border-orange-100">{blindBoxReward}</p>
                </div>
                <button onClick={() => setIsBlindBoxOpen(false)} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold">收下奖励</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Retro Floating Elements Decoration (Desktop only) */}
      <div className="hidden lg:block fixed -left-20 top-1/4 opacity-10 -rotate-12">
        <Gamepad2 className="w-48 h-48 text-stone-400" />
      </div>
      <div className="hidden lg:block fixed -right-20 bottom-1/4 opacity-10 rotate-12">
        <div className="w-48 h-48 text-stone-400 flex items-center justify-center">
          <Sparkles className="w-full h-full opacity-20" />
        </div>
      </div>
    </div>
  );
}
