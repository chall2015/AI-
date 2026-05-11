/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  ChevronRight, 
  RotateCcw, 
  Share2, 
  Gamepad2, 
  Ghost, 
  IceCream, 
  Trophy,
  ArrowRight,
  Upload,
  Undo2,
  Sparkles,
  Gift,
  Clock,
  Music2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';
import { CHILDHOOD_STYLES, QUIZ_QUESTIONS, RETRO_COPY } from './constants';

type Step = 'LANDING' | 'SELECT_STYLE' | 'UPLOAD' | 'PROCESSING' | 'RESULT' | 'SHARE';

export default function App() {
  const [step, setStep] = useState<Step>('LANDING');
  const [selectedStyle, setSelectedStyle] = useState(CHILDHOOD_STYLES[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [comparisonValue, setComparisonValue] = useState(50);
  const [isBlindBoxOpen, setIsBlindBoxOpen] = useState(false);
  const [blindBoxReward, setBlindBoxReward] = useState<string | null>(null);

  // Background Audio Simulation (Visual only in this prototype)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF8C42', '#FFD166', '#EF476F', '#118AB2']
      });
      setShowConfetti(false);
    }
  }, [showConfetti]);

  const handleNextStep = (next: Step) => {
    setStep(next);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setStep('PROCESSING');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuizAnswer = (index: number) => {
    const isCorrect = index === QUIZ_QUESTIONS[quizIndex].answer;
    setUserAnswers([...userAnswers, isCorrect]);
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setQuizIndex(quizIndex + 1), 1000);
    } else {
      setTimeout(() => setStep('RESULT'), 2000);
    }
  };

  const openBlindBox = () => {
    setIsBlindBoxOpen(true);
    const rewards = ['怀旧零食礼包券', '小霸王游戏积分 x99', '复古贴纸一套', '童年勋章：冰棍达人'];
    setBlindBoxReward(rewards[Math.floor(Math.random() * rewards.length)]);
    setShowConfetti(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#333] font-sans selection:bg-orange-200">
      {/* Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <main className="max-w-md mx-auto h-screen flex flex-col relative overflow-hidden bg-white shadow-2xl">
        <AnimatePresence mode="wait">
          {step === 'LANDING' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 text-center bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border-2 border-dashed border-orange-400 rounded-full opacity-50"
                />
                <div className="w-48 h-48 rounded-full bg-orange-100 flex items-center justify-center border-4 border-orange-400 shadow-xl overflow-hidden relative group">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock className="w-24 h-24 text-orange-500" />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-orange-800 tracking-tighter font-retro">
                  AI 时光机
                </h1>
                <p className="text-lg text-orange-700/80 font-medium">
                  回到小时候 · 重拾那份纯真
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep('SELECT_STYLE')}
                  className="w-full py-4 px-8 bg-orange-500 text-white rounded-2xl font-bold text-xl shadow-[0_6px_0_0_#C2410C] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 group"
                >
                  开启穿越之旅
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <div className="flex items-center justify-center gap-4 text-xs text-stone-400 mt-4 uppercase tracking-widest font-bold">
                  <span>80后记忆</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span>90后共鸣</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span>00后童心</span>
                </div>
              </div>

              {/* Audio Toggle */}
              <button 
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/50 backdrop-blur-sm border border-stone-200"
              >
                {isAudioPlaying ? <Music2 className="w-5 h-5 text-orange-500 animate-pulse" /> : <X className="w-5 h-5 text-stone-400" />}
              </button>
            </motion.div>
          )}

          {step === 'SELECT_STYLE' && (
            <motion.div
              key="select"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="flex-1 flex flex-col p-6 space-y-6 bg-stone-50"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <button onClick={() => setStep('LANDING')} className="p-2 -ml-2">
                  <Undo2 className="w-6 h-6 text-stone-400" />
                </button>
                <h2 className="text-xl font-bold">选择穿越风格</h2>
                <div className="w-10" />
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {CHILDHOOD_STYLES.map((style) => (
                  <motion.div
                    key={style.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedStyle(style)}
                    className={cn(
                      "relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-all p-4 flex gap-4",
                      selectedStyle.id === style.id 
                        ? `${style.borderColor} ${style.color} shadow-lg ring-4 ring-orange-100`
                        : "border-stone-200 bg-white"
                    )}
                  >
                    <div className="w-24 h-32 rounded-lg bg-stone-200 overflow-hidden flex-shrink-0">
                      <img 
                        src={style.image} 
                        alt={style.label} 
                        className="w-full h-full object-cover grayscale-[0.3]" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h3 className={cn("text-lg font-bold", selectedStyle.id === style.id ? style.accent : "text-stone-700")}>
                          {style.label}
                        </h3>
                        <p className="text-sm text-stone-500 line-clamp-1">{style.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {style.elements.map(el => (
                          <span key={el} className="text-[10px] px-1.5 py-0.5 bg-white/80 rounded-sm border border-stone-100 text-stone-500">
                            {el}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedStyle.id === style.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={handleImageUpload}
                />
                <button
                  disabled={!selectedStyle}
                  className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  开始穿越
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </button>
                <p className="text-[10px] text-center text-stone-400 mt-2">请上传清晰正面照，还原效果更好哦</p>
              </div>
            </motion.div>
          )}

          {step === 'PROCESSING' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col p-6 space-y-8 bg-stone-900 text-white"
            >
              <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-t-orange-500 border-stone-700 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-orange-500 font-mono text-xl font-bold"
                    >
                      AI...
                    </motion.span>
                  </div>
                </div>

                <div className="w-full space-y-6 text-center">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight">正在重启时光机...</h3>
                    <p className="text-sm text-stone-400">正在复刻您在 '{selectedStyle.label}' 下的稚嫩模样</p>
                  </div>
                  
                  {/* Quiz Component */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-orange-500 uppercase flex items-center gap-1">
                        <Gamepad2 className="w-3 h-3" /> 童年记忆挑战
                      </span>
                      <span className="text-[10px] text-stone-500">{quizIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                    </div>
                    
                    <p className="text-sm font-medium leading-relaxed">
                      {QUIZ_QUESTIONS[quizIndex].question}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs text-left border border-transparent hover:border-white/30"
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col p-0 overflow-hidden bg-stone-50"
            >
              {/* Generated Image Preview */}
              <div className="relative w-full aspect-[3/4] bg-stone-200 shadow-inner group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{ backgroundImage: `url(${selectedStyle.image})` }}
                />
                
                {/* Decorative Frame */}
                <div className="absolute inset-0 border-[16px] border-white/20 pointer-events-none" />
                
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1.5 bg-orange-600/80 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest border border-white/20 flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" /> Childhood Ver.
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-stone-800 tracking-tight font-retro">还原成功！</h2>
                      <p className="text-sm text-stone-500 mt-1">检测到 99% 的纯真度，已成功穿越。</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-stone-800 shadow-sm">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <span className="text-[10px] font-bold text-yellow-600 mt-1">穿越小能手</span>
                    </div>
                  </div>

                  <div className="bg-stone-100/80 rounded-2xl p-4 flex items-center gap-4 text-stone-600 border border-stone-200">
                    <IceCream className="w-5 h-5 text-orange-500" />
                    <p className="text-xs italic font-medium opacity-80">"{RETRO_COPY[Math.floor(Math.random() * RETRO_COPY.length)]}"</p>
                  </div>
                </div>

                {/* Primary Action: Video Generation */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-[0_4px_0_0_#C2410C] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 group"
                >
                  <Music2 className="w-5 h-5" />
                  生成专属童年视频
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStep('SHARE')}
                    className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-stone-600" />
                    <span className="text-xs font-bold text-stone-500">生成海报</span>
                  </button>
                  <button 
                    onClick={openBlindBox}
                    className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-colors"
                  >
                    <Gift className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold text-stone-500">抽取盲盒</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => setStep('LANDING')}
                  className="w-full flex items-center justify-center gap-2 text-stone-400 text-xs py-2"
                >
                  <RotateCcw className="w-3 h-3" /> 再次体验时光机
                </button>
              </div>
            </motion.div>
          )}

          {step === 'SHARE' && (
            <motion.div
              key="share"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col p-6 space-y-6"
            >
              <div className="flex-1 bg-white shadow-2xl rounded-3xl border border-stone-100 p-6 flex flex-col space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-24 h-24 border-2 border-stone-200 rounded-full opacity-10" />
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <h4 className="text-3xl font-black text-stone-800">AI 时光报</h4>
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Retro Edition · 2024.06.01</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-stone-400">NO. 890601</p>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 grayscale-[0.2]">
                  <img 
                    src={selectedStyle.image} 
                    alt="Poster" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-stone-100 rounded text-[10px] font-bold text-stone-500 uppercase">{selectedStyle.label}</span>
                    <span className="px-2 py-1 bg-orange-100 rounded text-[10px] font-bold text-orange-600 uppercase">纯真度 99%</span>
                  </div>
                  <p className="text-sm font-medium italic text-stone-600 leading-relaxed">
                    “{RETRO_COPY[Math.floor(Math.random() * RETRO_COPY.length)]}”
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-10 h-10 bg-stone-800 rounded flex items-center justify-center text-white shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-stone-800 uppercase">长按保存 穿越记忆</p>
                      <p className="text-[8px] text-stone-400">扫码开启你的时光之约</p>
                    </div>
                    <div className="w-12 h-12 bg-stone-100 rounded flex items-center justify-center shrink-0 border border-stone-200">
                      <div className="w-8 h-8 border-2 border-stone-300" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep('RESULT')}
                  className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" /> 返回
                </button>
                <button 
                  className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" /> 立即分享
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blind Box Overlay */}
        <AnimatePresence>
          {isBlindBoxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[32px] p-8 w-full max-w-xs text-center space-y-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.1)_0%,transparent_70%)]" />
                
                <div className="w-24 h-24 bg-orange-100 rounded-3xl mx-auto flex items-center justify-center border-4 border-orange-200 shadow-xl relative">
                  <Sparkles className="w-12 h-12 text-orange-500" />
                  <motion.div 
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white"
                  >
                    <Gift className="w-4 h-4" />
                  </motion.div>
                </div>

                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black text-stone-800 italic uppercase tracking-wider">You Unlocked!</h3>
                  <div className="py-3 px-6 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
                    <p className="text-orange-700 font-bold text-lg">{blindBoxReward}</p>
                  </div>
                  <p className="text-[10px] text-stone-400 pt-2 uppercase font-bold tracking-widest">时光记忆已存入背包</p>
                </div>

                <button 
                  onClick={() => setIsBlindBoxOpen(false)}
                  className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold shadow-xl relative z-10"
                >
                  太棒啦！
                </button>
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
        <IceCream className="w-48 h-48 text-stone-400" />
      </div>
    </div>
  );
}
