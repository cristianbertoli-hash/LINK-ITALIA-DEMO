(function(){
'use strict';
const core=window.LinkCmsCore;if(!core)return;
const storage=window.localStorage;let state=core.loadState(storage);
state.overrides=state.overrides||{};state.social=state.social||{};state.images=state.images||{};state.pageImages=state.pageImages||{};
const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const page=file.replace('.html','')||'index';
const langs=[['it','Italiano'],['en','English'],['fr','Français'],['de','Deutsch'],['es','Español']];
const ui={
 it:{home:'Home',link:'The Link',program:'Programma',cert:'Certificazioni',training:'Formazione',about:'Chi siamo',contact:'Contatti',publications:'Pubblicazioni',partners:'Partners',media:'Media',privacy:'Privacy / Cookie',edit:'Gestisci sito'},
 en:{home:'Home',link:'The Link',program:'Programme',cert:'Certifications',training:'Training',about:'About us',contact:'Contact',publications:'Publications',partners:'Partners',media:'Media',privacy:'Privacy / Cookies',edit:'Manage site'},
 fr:{home:'Accueil',link:'The Link',program:'Programme',cert:'Certifications',training:'Formation',about:'À propos',contact:'Contact',publications:'Publications',partners:'Partenaires',media:'Médias',privacy:'Confidentialité / Cookies',edit:'Gérer le site'},
 de:{home:'Start',link:'The Link',program:'Programm',cert:'Zertifizierungen',training:'Schulung',about:'Über uns',contact:'Kontakt',publications:'Publikationen',partners:'Partner',media:'Medien',privacy:'Datenschutz / Cookies',edit:'Website verwalten'},
 es:{home:'Inicio',link:'The Link',program:'Programa',cert:'Certificaciones',training:'Formación',about:'Quiénes somos',contact:'Contacto',publications:'Publicaciones',partners:'Socios',media:'Medios',privacy:'Privacidad / Cookies',edit:'Gestionar sitio'}
};
const heroTranslations={
 'index':{
  en:['WE BREAK THE LINK','Violence is never an isolated event. People and animals belong to the same community: recognising connections means preventing better, intervening earlier and protecting more.'],
  fr:['WE BREAK THE LINK','La violence n’est jamais un fait isolé. Personnes et animaux appartiennent à la même communauté : reconnaître les liens permet de mieux prévenir, d’intervenir plus tôt et de mieux protéger.'],
  de:['WE BREAK THE LINK','Gewalt ist niemals ein isoliertes Ereignis. Menschen und Tiere gehören derselben Gemeinschaft an: Zusammenhänge zu erkennen bedeutet besser vorzubeugen, früher einzugreifen und mehr zu schützen.'],
  es:['WE BREAK THE LINK','La violencia nunca es un hecho aislado. Personas y animales pertenecen a la misma comunidad: reconocer las conexiones permite prevenir mejor, intervenir antes y proteger más.']},
 'formazione':{
  en:['TRAIN TO PREVENT.','Paths for organisations, professionals and citizens: a shared culture connecting safety, health, welfare and social responsibility.'],
  fr:['FORMER POUR PRÉVENIR.','Des parcours pour les organisations, les professionnels et les citoyens : une culture partagée reliant sécurité, santé, bien-être et responsabilité sociale.'],
  de:['AUSBILDEN, UM VORZUBEUGEN.','Wege für Organisationen, Fachleute und Bürger: eine gemeinsame Kultur, die Sicherheit, Gesundheit, Wohlergehen und soziale Verantwortung verbindet.'],
  es:['FORMAR PARA PREVENIR.','Itinerarios para organizaciones, profesionales y ciudadanos: una cultura compartida que conecta seguridad, salud, bienestar y responsabilidad social.']},
 'certificazioni':{
  en:['CERTIFY COMMITMENT.','Two distinct paths for organisations and professionals, connected to the We Break THE LINK® Anti-Violence Programme.'],
  fr:["CERTIFIER L’ENGAGEMENT.",'Deux parcours distincts pour les organisations et les professionnels, liés au programme antiviolence We Break THE LINK®.'],
  de:['ENGAGEMENT ZERTIFIZIEREN.','Zwei unterschiedliche Wege für Organisationen und Fachleute im Rahmen des Anti-Gewalt-Programms We Break THE LINK®.'],
  es:['CERTIFICAR EL COMPROMISO.','Dos recorridos distintos para organizaciones y profesionales, vinculados al Programa Antiviolencia We Break THE LINK®.']},
 'the-link':{
  en:['THE LINK. SEE THE CONNECTIONS.','An interdisciplinary framework for understanding the correlation between violence against animals, interpersonal violence and other deviant, antisocial or criminal behaviours.'],
  fr:['THE LINK. VOIR LES CONNEXIONS.','Un cadre interdisciplinaire pour comprendre la corrélation entre la violence envers les animaux, la violence interpersonnelle et d’autres conduites déviantes, antisociales ou criminelles.'],
  de:['THE LINK. ZUSAMMENHÄNGE SEHEN.','Ein interdisziplinärer Rahmen zur Betrachtung der Zusammenhänge zwischen Gewalt gegen Tiere, zwischenmenschlicher Gewalt und weiteren abweichenden, antisozialen oder kriminellen Verhaltensweisen.'],
  es:['THE LINK. VER LAS CONEXIONES.','Un marco interdisciplinar para comprender la correlación entre violencia hacia los animales, violencia interpersonal y otras conductas desviadas, antisociales o delictivas.']}
};
function save(){core.saveState(storage,state);}
function currentLang(){return state.lang||'it';}
function editableSelector(){return '.hero-title,.page-title,.hero-copy,.section-title,.section-copy,.card h3,.card p,.feature-card h3,.feature-card p,.item h3,.item p,.banner h2,.banner p,.step h3,.step p,.metric-label,.contact-card h3,.contact-card p';}
function bindKeys(){document.querySelectorAll(editableSelector()).forEach((el,i)=>{if(!el.dataset.cmsKey)el.dataset.cmsKey=`${page}.text.${i}`;});}
function applyOverrides(){bindKeys();const lang=currentLang();document.documentElement.lang=lang;document.querySelectorAll('[data-cms-key]').forEach(el=>{const key=el.dataset.cmsKey;const val=state.overrides?.[lang]?.[key];if(val!==undefined&&val!==''){el.textContent=val;}});if(lang!=='it'){const tr=heroTranslations[page]?.[lang];if(tr){const title=document.querySelector('.hero-title,.page-title');const copy=document.querySelector('.hero-copy');if(title&&!state.overrides?.[lang]?.[title.dataset.cmsKey])title.textContent=tr[0];if(copy&&!state.overrides?.[lang]?.[copy.dataset.cmsKey])copy.textContent=tr[1];}}
}
function translateNav(){const t=ui[currentLang()]||ui.it;const pairs=[['index.html',t.home],['the-link.html',t.link],['programma.html',t.program],['certificazioni.html',t.cert],['formazione.html',t.training],['chi-siamo.html',t.about],['pubblicazioni.html',t.publications],['partners.html',t.partners],['media.html',t.media],['contatti.html',t.contact],['privacy.html',t.privacy]];pairs.forEach(([href,label])=>document.querySelectorAll(`a[href="${href}"]`).forEach(a=>{if(!a.classList.contains('brand'))a.textContent=label;}));}
function addLanguageUi(){const nav=document.querySelector('.nav');if(!nav||document.querySelector('.language-switch'))return;const wrap=document.createElement('div');wrap.className='language-switch';const sel=document.createElement('select');sel.setAttribute('aria-label','Lingua');langs.forEach(([code,label])=>{const o=document.createElement('option');o.value=code;o.textContent=label;if(code===currentLang())o.selected=true;sel.appendChild(o);});sel.addEventListener('change',()=>{state.lang=sel.value;save();location.reload();});wrap.appendChild(sel);const admin=document.createElement('a');admin.className='admin-entry';admin.href='admin.html';admin.textContent='⚙';admin.title=(ui[currentLang()]||ui.it).edit;wrap.appendChild(admin);nav.insertBefore(wrap,document.querySelector('#menu-toggle'));
 const mobile=document.querySelector('#mobile-menu');if(mobile){const a=document.createElement('a');a.href='admin.html';a.textContent='⚙ '+(ui[currentLang()]||ui.it).edit;mobile.appendChild(a);}}
function applyPageImage(){const img=state.pageImages?.[page];const hero=document.querySelector('.page-hero');if(!img||!hero)return;const layer=document.createElement('div');layer.className='cms-page-image';layer.style.backgroundImage=`url(${JSON.stringify(img).slice(1,-1)})`;hero.prepend(layer);}
function applyHeroRotation(){if(page!=='index')return;const imgs=['hero1','hero2','hero3'].map(k=>state.images?.[k]).filter(Boolean);if(!imgs.length)return;const hero=document.querySelector('.home-hero');if(!hero)return;const rot=document.createElement('div');rot.className='cms-bg-rotator';imgs.forEach((src,i)=>{const d=document.createElement('div');d.className='cms-bg-face'+(i===0?' active':'');d.style.backgroundImage=`url(${JSON.stringify(src).slice(1,-1)})`;rot.appendChild(d);});hero.prepend(rot);let i=0;setInterval(()=>{const layers=[...rot.children];layers[i].classList.remove('active');i=(i+1)%layers.length;layers[i].classList.add('active');},6500);}
function applySocial(){const links={facebook:'Facebook',instagram:'Instagram',pinterest:'Pinterest',linkedin:'LinkedIn',youtube:'YouTube',x:'X / Twitter',amazon:'Amazon'};const valid=Object.entries(links).map(([k,label])=>[core.normalizeExternalUrl(state.social?.[k]),label]).filter(x=>x[0]);if(!valid.length)return;document.querySelectorAll('.footer-grid > div:first-child').forEach(host=>{const row=document.createElement('div');row.className='cms-social-row';valid.forEach(([url,label])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent=label;row.appendChild(a);});host.appendChild(row);});}
function enableEditMode(){const p=new URLSearchParams(location.search);if(p.get('edit')!=='1'||file==='admin.html')return;bindKeys();const lang=currentLang();document.body.classList.add('cms-edit-mode');const bar=document.createElement('div');bar.className='cms-editor-bar';bar.innerHTML=`<b>MODIFICA VISIVA</b><span>${langs.find(x=>x[0]===lang)?.[1]||lang}</span><button type="button" data-save>Salva testo</button><a href="admin.html">Dashboard</a><a href="${file}">Esci</a>`;document.body.appendChild(bar);const items=[...document.querySelectorAll('[data-cms-key]')];items.forEach(el=>{el.contentEditable='true';el.spellcheck=true;el.classList.add('cms-editable');});bar.querySelector('[data-save]').addEventListener('click',()=>{state.overrides[lang]=state.overrides[lang]||{};items.forEach(el=>state.overrides[lang][el.dataset.cmsKey]=el.textContent.trim());save();bar.querySelector('[data-save]').textContent='Salvato ✓';setTimeout(()=>bar.querySelector('[data-save]').textContent='Salva testo',1300);});}
addLanguageUi();translateNav();bindKeys();applyOverrides();applyPageImage();applyHeroRotation();applySocial();enableEditMode();
})();
