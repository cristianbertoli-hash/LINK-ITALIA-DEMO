(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  root.LinkCmsCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const STORAGE_KEY='linkItaliaCmsStateV2';
  function readTranslated(pack,lang,key){
    return (pack&&pack[lang]&&pack[lang][key]!==undefined)?pack[lang][key]:((pack&&pack.it&&pack.it[key]!==undefined)?pack.it[key]:'');
  }
  function mergeOverrides(base,overrides){return Object.assign({},base||{},overrides||{});}
  function loadState(storage){
    try{const raw=storage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):{lang:'it',overrides:{},social:{},images:{},pageImages:{}};}catch(_){return {lang:'it',overrides:{},social:{},images:{},pageImages:{}};}
  }
  function saveState(storage,state){storage.setItem(STORAGE_KEY,JSON.stringify(state));return state;}
  function normalizeExternalUrl(value){
    const s=String(value||'').trim(); if(!s) return '';
    if(/^javascript:/i.test(s)||/^data:/i.test(s)) return '';
    try{const withScheme=/^https?:\/\//i.test(s)?s:'https://'+s;const u=new URL(withScheme);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch(_){return '';}
  }
  function projectileLeft(targetCenter,projectileWidth){return targetCenter-projectileWidth;}
  function resolveText(defaults,state,lang,key){
    const over=state&&state.overrides&&state.overrides[lang];
    if(over&&over[key]!==undefined&&over[key]!=='') return over[key];
    return readTranslated(defaults,lang,key);
  }
  return {STORAGE_KEY,readTranslated,mergeOverrides,loadState,saveState,normalizeExternalUrl,projectileLeft,resolveText};
});
