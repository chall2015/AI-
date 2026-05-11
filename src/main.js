import { CHILDHOOD_STYLES, QUIZ_QUESTIONS, RETRO_COPY } from './constants.js';
import confetti from 'canvas-confetti';

// State Management
let currentStep = 'landing';
let selectedStyle = CHILDHOOD_STYLES[0];
let currentQuizIndex = 0;
let isAudioPlaying = false;
const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3');
audio.loop = true;

// DOM Elements
const steps = {
  landing: document.getElementById('step-landing'),
  select: document.getElementById('step-select'),
  processing: document.getElementById('step-processing'),
  result: document.getElementById('step-result'),
  share: document.getElementById('step-share')
};

// UI Functions
function setStep(step) {
  Object.values(steps).forEach(s => s.classList.remove('active'));
  steps[step].classList.add('active');
  currentStep = step;

  // Specific step initialization
  if (step === 'select') {
    renderStyles();
  } else if (step === 'processing') {
    startProcessing();
  } else if (step === 'result') {
    renderResult();
  } else if (step === 'share') {
    renderShare();
  }
}

function renderStyles() {
  const container = document.getElementById('styles-list');
  container.innerHTML = CHILDHOOD_STYLES.map(style => `
    <div class="style-card group cursor-pointer p-5 rounded-3xl bg-white border-2 transition-all ${selectedStyle.id === style.id ? 'border-orange-400 ring-4 ring-orange-400/10' : 'border-stone-100'}" data-id="${style.id}">
      <div class="flex items-center gap-5">
        <div class="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-stone-50">
          <img src="${style.image}" class="w-full h-full object-cover" alt="">
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-stone-800">${style.label}</h3>
            ${selectedStyle.id === style.id ? '<span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>' : ''}
          </div>
          <p class="text-xs text-stone-400 mt-1">${style.description}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Add click listeners to styles
  container.querySelectorAll('.style-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      selectedStyle = CHILDHOOD_STYLES.find(s => s.id === id);
      renderStyles();
    });
  });
}

function startProcessing() {
  document.getElementById('processing-style-text').innerText = `正在匹配：${selectedStyle.label}`;
  currentQuizIndex = 0;
  renderQuiz();

  // Simulate complete after quiz or time
  setTimeout(() => {
    setStep('result');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#fdba74']
    });
  }, 8000);
}

function renderQuiz() {
  if (currentQuizIndex >= QUIZ_QUESTIONS.length) return;
  
  const quiz = QUIZ_QUESTIONS[currentQuizIndex];
  document.getElementById('quiz-progress').innerText = `${currentQuizIndex + 1}/${QUIZ_QUESTIONS.length}`;
  document.getElementById('quiz-question').innerText = quiz.question;
  
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = quiz.options.map((option, idx) => `
    <button class="quiz-option w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs transition-all hover:bg-white/10" data-idx="${idx}">
      ${option}
    </button>
  `).join('');

  optionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      if (idx === quiz.answer) {
        btn.classList.add('bg-orange-500/20', 'border-orange-500', 'text-orange-500');
      } else {
        btn.classList.add('bg-red-500/20', 'border-red-500', 'text-red-500');
      }
      
      setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex < QUIZ_QUESTIONS.length) {
          renderQuiz();
        }
      }, 1000);
    });
  });
}

function renderResult() {
  document.getElementById('result-img').src = selectedStyle.image;
}

function renderShare() {
  document.getElementById('share-img').src = selectedStyle.image;
  document.getElementById('share-copy').innerText = RETRO_COPY[Math.floor(Math.random() * RETRO_COPY.length)];
}

function openBlindBox() {
  const rewards = ['大白兔奶糖 × 10', '大大泡泡糖限量款', '跳跳糖礼包', '小霸王一周体验卡'];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  document.getElementById('blind-box-reward').innerText = reward;
  document.getElementById('blind-box-overlay').classList.remove('hidden');
}

// Event Listeners
document.getElementById('btn-start').addEventListener('click', () => setStep('select'));
document.getElementById('btn-back-to-landing').addEventListener('click', () => setStep('landing'));
document.getElementById('btn-restart').addEventListener('click', () => setStep('select'));
document.getElementById('btn-poster').addEventListener('click', () => setStep('share'));
document.getElementById('btn-share-back').addEventListener('click', () => setStep('result'));
document.getElementById('btn-blindbox').addEventListener('click', openBlindBox);
document.getElementById('btn-close-blindbox').addEventListener('click', () => {
  document.getElementById('blind-box-overlay').classList.add('hidden');
});

document.getElementById('image-upload').addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    setStep('processing');
  }
});

document.getElementById('audio-toggle').addEventListener('click', () => {
  isAudioPlaying = !isAudioPlaying;
  const icon = document.querySelector('#audio-toggle i');
  if (isAudioPlaying) {
    audio.play();
    icon.setAttribute('data-lucide', 'music-2');
    icon.classList.add('animate-pulse');
  } else {
    audio.pause();
    icon.setAttribute('data-lucide', 'x');
    icon.classList.remove('animate-pulse');
  }
  lucide.createIcons();
});

// Mock for "generate video"
document.getElementById('btn-video').addEventListener('click', () => {
  alert('专属童年视频正在生成中，请耐心等待...');
});

// Initial Setup
setStep('landing');
lucide.createIcons();
