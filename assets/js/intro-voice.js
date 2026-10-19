(()=>{
'use strict';

const INTRO_TEXT = 'Benvenuti in LINK-ITALIA & PARTNERS. Il Fenomeno LINK descrive la correlazione tra maltrattamento o uccisione di animali, violenza interpersonale e altre condotte devianti, antisociali o criminali. Il nostro obiettivo è trasformare conoscenza scientifica in prevenzione concreta, formazione, strumenti operativi e percorsi di certificazione per professionisti, organizzazioni e cittadini. Attraverso il programma We Break THE LINK, One Safety, One Health, One Welfare, promuoviamo una tutela integrata di persone, animali e comunità. Usa il menu per approfondire il fenomeno, conoscere i percorsi formativi e scoprire le certificazioni.';
const SEEN_KEY = 'linkItaliaIntroSeenV1';
const synth = window.speechSynthesis;
if(!synth) return;

const wrap = document.createElement('div');
wrap.className = 'voice-intro';
wrap.setAttribute('role','region');
wrap.setAttribute('aria-label','Introduzione vocale LINK Italia');
wrap.innerHTML = `
  <button class="voice-intro-main" type="button" aria-label="Ascolta l'introduzione di LINK Italia">
    <span class="voice-intro-icon" aria-hidden="true">▶</span>
    <span class="voice-intro-label">Ascolta LINK</span>
    <span class="voice-intro-time">~35 s</span>
  </button>
  <button class="voice-intro-stop" type="button" aria-label="Ferma introduzione" title="Ferma introduzione">■</button>
  <span class="voice-intro-status" aria-live="polite"></span>`;
document.body.appendChild(wrap);

const playBtn = wrap.querySelector('.voice-intro-main');
const stopBtn = wrap.querySelector('.voice-intro-stop');
const icon = wrap.querySelector('.voice-intro-icon');
const label = wrap.querySelector('.voice-intro-label');
const status = wrap.querySelector('.voice-intro-status');
let utterance = null;
let started = false;
let fallbackTimer = null;

function pickItalianVoice(){
  const voices = synth.getVoices();
  return voices.find(v=>/^it[-_]/i.test(v.lang) && /natural|premium|enhanced/i.test(v.name))
      || voices.find(v=>/^it[-_]/i.test(v.lang))
      || null;
}

function setIdle(){
  wrap.classList.remove('is-playing','needs-action');
  icon.textContent = '▶';
  label.textContent = 'Ascolta LINK';
  status.textContent = '';
}

function stop(){
  if(fallbackTimer) clearTimeout(fallbackTimer);
  synth.cancel();
  utterance = null;
  started = false;
  setIdle();
}

function speak({automatic=false}={}){
  stop();
  utterance = new SpeechSynthesisUtterance(INTRO_TEXT);
  utterance.lang = 'it-IT';
  utterance.rate = 0.96;
  utterance.pitch = 1.0;
  utterance.volume = 0.52;
  const voice = pickItalianVoice();
  if(voice) utterance.voice = voice;

  utterance.onstart = ()=>{
    started = true;
    localStorage.setItem(SEEN_KEY,'1');
    wrap.classList.add('is-playing');
    wrap.classList.remove('needs-action');
    icon.textContent = '❚❚';
    label.textContent = 'Introduzione in corso';
    status.textContent = 'Introduzione vocale in riproduzione';
  };
  utterance.onend = ()=>{ utterance=null; started=false; setIdle(); };
  utterance.onerror = ()=>{
    utterance=null; started=false; setIdle();
    if(automatic){ wrap.classList.add('needs-action'); label.textContent='Ascolta l’introduzione'; }
  };
  synth.speak(utterance);

  if(automatic){
    fallbackTimer = setTimeout(()=>{
      if(!started){
        synth.cancel();
        wrap.classList.add('needs-action');
        label.textContent = 'Ascolta l’introduzione';
        status.textContent = 'Il browser richiede un tocco per avviare l’audio';
      }
    },1800);
  }
}

playBtn.addEventListener('click',()=>{
  if(synth.speaking){ stop(); }
  else speak({automatic:false});
});
stopBtn.addEventListener('click',stop);
addEventListener('beforeunload',()=>synth.cancel());

if(localStorage.getItem(SEEN_KEY)!=='1'){
  setTimeout(()=>speak({automatic:true}),1450);
}

if('onvoiceschanged' in synth) synth.onvoiceschanged = ()=>{};
})();