// ===== DATA =====
const L=s=>s.trim().split('\n').map(l=>{const[fr,en,ph]=l.split('|');return{fr:fr.trim(),en:en.trim(),ph:(ph||'').trim()}});
const THEMES={
greetings:{n:'Greetings',i:'👋',w:L(`Bonjour|Hello / Good morning|bon-ZHOOR
Bonsoir|Good evening|bon-SWAHR
Salut|Hi / Bye (informal)|sa-LÜ
Au revoir|Goodbye|oh ruh-VWAHR
À bientôt|See you soon|ah byan-TOH
Bonne nuit|Good night|bun NWEE
Merci|Thank you|mair-SEE
Merci beaucoup|Thank you very much|mair-SEE boh-KOO
De rien|You're welcome|duh RYAN
S'il vous plaît|Please (formal)|seel voo PLEH
S'il te plaît|Please (informal)|seel tuh PLEH
Excusez-moi|Excuse me|ex-kü-zay MWAH
Pardon|Sorry / Pardon|par-DOHN
Comment allez-vous ?|How are you? (formal)|ko-mahn ta-lay VOO
Ça va ?|How's it going?|sa VAH
Ça va bien|I'm fine|sa vah BYAN
Enchanté|Nice to meet you|ahn-shahn-TAY
Oui|Yes|WEE
Non|No|NOHN`)},
numbers:{n:'Numbers 1–20',i:'🔢',w:L(`un|one|uhn
deux|two|duh
trois|three|twah
quatre|four|KAT-ruh
cinq|five|sank
six|six|seess
sept|seven|set
huit|eight|weet
neuf|nine|nuhf
dix|ten|deess
onze|eleven|ohnz
douze|twelve|dooz
treize|thirteen|trez
quatorze|fourteen|ka-TORZ
quinze|fifteen|kanz
seize|sixteen|sez
dix-sept|seventeen|dee-SET
dix-huit|eighteen|dee-ZWEET
dix-neuf|nineteen|deez-NUHF
vingt|twenty|van`)},
colours:{n:'Colours',i:'🎨',w:L(`rouge|red|roozh
bleu|blue|bluh
vert|green|vair
jaune|yellow|zhohn
orange|orange|o-RAHNZH
violet|purple|vyo-LAY
rose|pink|rohz
noir|black|nwahr
blanc|white|blahn
gris|grey|gree
marron|brown|ma-ROHN
beige|beige|bezh
doré|gold|do-RAY
argenté|silver|ar-zhahn-TAY
clair|light (colour)|klair
foncé|dark (colour)|fohn-SAY`)},
family:{n:'Family',i:'👨‍👩‍👧',w:L(`la famille|the family|la fa-MEE
la mère|the mother|la mair
le père|the father|luh pair
les parents|the parents|lay pa-RAHN
le frère|the brother|luh frair
la sœur|the sister|la sur
le fils|the son|luh feess
la fille|the daughter / girl|la fee
le mari|the husband|luh ma-REE
la femme|the wife / woman|la fam
le grand-père|the grandfather|luh grahn-PAIR
la grand-mère|the grandmother|la grahn-MAIR
l'oncle|the uncle|LOHN-kluh
la tante|the aunt|la tahnt
le cousin|the cousin (m)|luh koo-ZAN
la cousine|the cousin (f)|la koo-ZEEN
l'enfant|the child|lahn-FAHN
le bébé|the baby|luh bay-BAY`)},
food:{n:'Food & Drink',i:'🥐',w:L(`le pain|the bread|luh pan
le croissant|the croissant|luh krwa-SAHN
le fromage|the cheese|luh fro-MAZH
la pomme|the apple|la pum
l'eau|the water|loh
le café|the coffee|luh ka-FAY
le thé|the tea|luh tay
le lait|the milk|luh leh
le vin|the wine|luh van
la viande|the meat|la vyahnd
le poulet|the chicken|luh poo-LAY
le poisson|the fish|luh pwa-SOHN
les légumes|the vegetables|lay lay-GÜM
le riz|the rice|luh ree
l'œuf|the egg|luhf
le sucre|the sugar|luh SÜ-kruh
le petit-déjeuner|breakfast|luh puh-tee day-zhuh-NAY
le déjeuner|lunch|luh day-zhuh-NAY
le dîner|dinner|luh dee-NAY`)},
days:{n:'Days & Months',i:'📅',w:L(`lundi|Monday|lun-DEE
mardi|Tuesday|mar-DEE
mercredi|Wednesday|mair-kruh-DEE
jeudi|Thursday|zhuh-DEE
vendredi|Friday|vahn-druh-DEE
samedi|Saturday|sam-DEE
dimanche|Sunday|dee-MAHNSH
janvier|January|zhahn-VYAY
février|February|fay-vree-YAY
mars|March|marss
avril|April|a-VREEL
mai|May|meh
juin|June|zhwan
juillet|July|zhwee-YAY
août|August|oot
septembre|September|sep-TAHN-bruh
octobre|October|ok-TO-bruh
novembre|November|no-VAHN-bruh
décembre|December|day-SAHN-bruh`)},
verbs:{n:'Common Verbs',i:'🏃',w:L(`être|to be|EH-truh
avoir|to have|a-VWAHR
aller|to go|a-LAY
faire|to do / make|fair
parler|to speak|par-LAY
manger|to eat|mahn-ZHAY
boire|to drink|bwahr
finir|to finish|fee-NEER
prendre|to take|PRAHN-druh
vouloir|to want|voo-LWAHR
pouvoir|to be able to (can)|poo-VWAHR
venir|to come|vuh-NEER
voir|to see|vwahr
savoir|to know (a fact)|sa-VWAHR
aimer|to like / love|ay-MAY
habiter|to live (somewhere)|a-bee-TAY
travailler|to work|tra-va-YAY
dormir|to sleep|dor-MEER`)},
phrases:{n:'Everyday Phrases',i:'💬',w:L(`Je m'appelle…|My name is…|zhuh ma-PEL
Comment tu t'appelles ?|What's your name?|ko-mahn tü ta-PEL
J'ai … ans|I am … years old|zhay … ahn
Je ne comprends pas|I don't understand|zhuh nuh kohm-prahn PAH
Parlez-vous anglais ?|Do you speak English?|par-lay voo ahn-GLEH
Je parle un peu français|I speak a little French|zhuh parl uhn puh frahn-SEH
Pouvez-vous répéter ?|Can you repeat?|poo-vay voo ray-pay-TAY
Plus lentement, s'il vous plaît|More slowly, please|plü lahnt-MAHN seel voo PLEH
Où sont les toilettes ?|Where is the toilet?|oo sohn lay twa-LET
Combien ça coûte ?|How much does it cost?|kohm-byan sa KOOT
L'addition, s'il vous plaît|The bill, please|la-dee-SYOHN seel voo PLEH
Je voudrais un café|I would like a coffee|zhuh voo-DREH uhn ka-FAY
Il fait beau|The weather is nice|eel feh BOH
Quelle heure est-il ?|What time is it?|kel ur eh-TEEL
J'ai faim|I'm hungry|zhay FAN
J'ai soif|I'm thirsty|zhay SWAHF
Bonne journée !|Have a good day!|bun zhoor-NAY
D'accord|OK / Agreed|da-KOR`)}};

const P=['je','tu','il/elle','nous','vous','ils/elles'];
const AV=['ai','as','a','avons','avez','ont'],ES=['suis','es','est','sommes','êtes','sont'],AL=['vais','vas','va','allons','allez','vont'];
const IMP=['ais','ais','ait','ions','iez','aient'],FUT=['ai','as','a','ons','ez','ont'];
const V={
'être':{en:'to be',pr:ES,pp:'été',im:'ét',fu:'ser'},
'avoir':{en:'to have',pr:AV,pp:'eu',im:'av',fu:'aur'},
'aller':{en:'to go',pr:AL,pp:'allé',etre:1,im:'all',fu:'ir'},
'faire':{en:'to do / make',pr:['fais','fais','fait','faisons','faites','font'],pp:'fait',im:'fais',fu:'fer'},
'parler':{en:'to speak',pr:['parle','parles','parle','parlons','parlez','parlent'],pp:'parlé',im:'parl',fu:'parler'},
'manger':{en:'to eat',pr:['mange','manges','mange','mangeons','mangez','mangent'],pp:'mangé',imF:['mangeais','mangeais','mangeait','mangions','mangiez','mangeaient'],fu:'manger'},
'finir':{en:'to finish',pr:['finis','finis','finit','finissons','finissez','finissent'],pp:'fini',im:'finiss',fu:'finir'},
'prendre':{en:'to take',pr:['prends','prends','prend','prenons','prenez','prennent'],pp:'pris',im:'pren',fu:'prendr'},
'vouloir':{en:'to want',pr:['veux','veux','veut','voulons','voulez','veulent'],pp:'voulu',im:'voul',fu:'voudr'},
'pouvoir':{en:'to be able to (can)',pr:['peux','peux','peut','pouvons','pouvez','peuvent'],pp:'pu',im:'pouv',fu:'pourr'}};
const AGR=['(e)','(e)','(e)','(e)s','(e)(s)','(e)s'];
const TENSES={
pr:{n:'Présent',en:'Present',why:'For things happening now, habits, and general facts. "Je parle" = I speak / I am speaking.',ex:['Je parle français.','I speak French.']},
pc:{n:'Passé composé',en:'Past (completed)',why:'For a finished action in the past. Made with avoir (or être for movement verbs like aller) + past participle.',ex:["Hier, j'ai mangé une pomme.",'Yesterday, I ate an apple.']},
fp:{n:'Futur proche',en:'Near future',why:'"Going to…" — the easiest future! Present of aller + infinitive.',ex:['Je vais manger.','I am going to eat.']},
im:{n:'Imparfait',en:'Past (ongoing / used to)',why:'For background descriptions and habits in the past: "I was…", "I used to…".',ex:["Quand j'étais petit, je parlais anglais.",'When I was little, I used to speak English.']},
fs:{n:'Futur simple',en:'Future',why:'"Will…" — for future plans and predictions, a bit more formal than futur proche.',ex:['Demain, je finirai le travail.','Tomorrow, I will finish the work.']}};
function conj(v,t){const d=V[v];return P.map((p,i)=>{let f;
 if(t=='pr')f=d.pr[i];else if(t=='pc')f=d.etre?ES[i]+' '+d.pp+AGR[i]:AV[i]+' '+d.pp;
 else if(t=='fp')f=AL[i]+' '+v;else if(t=='im')f=d.imF?d.imF[i]:d.im+IMP[i];else f=d.fu+FUT[i];
 const full=(i==0&&/^[aeiouéèêh]/i.test(f))?"j'"+f:p+' '+f;return{p,full,say:full.replace('il/elle','il').replace('ils/elles','ils').replace(/\(e\)\(s\)|\(e\)s|\(e\)/g,'')}})}

// ===== STATE =====
const S=Object.assign({known:[],scores:[],streak:0,last:'',best:0},JSON.parse(localStorage.getItem('frp')||'{}'));
const save=()=>localStorage.setItem('frp',JSON.stringify(S));
(function(){const d=new Date().toDateString(),y=new Date(Date.now()-864e5).toDateString();
 if(S.last!==d){S.streak=S.last===y?S.streak+1:1;S.last=d;save()}})();

// ===== SPEECH =====
let VOICE=null;
function pickVoice(){const vs=speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang));
 VOICE=vs.find(v=>/thomas|amélie|amelie/i.test(v.name)&&/fr-FR/i.test(v.lang))||vs.find(v=>/fr[-_]FR/i.test(v.lang))||vs[0]||null}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function say(t,slow){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(t.replace(/…/g,'').replace('/',' ').replace('(e)','')); u.lang='fr-FR';if(VOICE)u.voice=VOICE;u.rate=slow?.55:.9;speechSynthesis.speak(u)}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;

// ===== UI helpers =====
const $=s=>document.querySelector(s),view=$('#view');
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const allWords=()=>Object.values(THEMES).flatMap(t=>t.w);
let stack=[];
function go(fn,title,push=true){if(push&&cur)stack.push(cur);cur={fn,title};$('#title').textContent=title;$('#back').style.visibility=stack.length?'visible':'hidden';$('#streak').textContent='🔥 '+S.streak;view.innerHTML='';scrollTo(0,0);fn()}
let cur=null;$('#back').onclick=()=>{const p=stack.pop();if(p)go(p.fn,p.title,false)};
function tab(t){stack=[];cur=null;document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.t==t));({home,words,verbs,practice,progress})[t]()}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>tab(b.dataset.t));
const btns=(t)=>`<button class="say" data-s="${esc(t)}">🔊</button><button class="say slow" data-s="${esc(t)}" data-slow="1">🐢</button>`;
view.addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b){e.stopPropagation();say(b.dataset.s,!!b.dataset.slow)}});

// ===== SCREENS =====
function home(){go(()=>{view.innerHTML=`<div class="card"><div class="big">Bonjour ! 🇫🇷</div><p style="text-align:center;margin:0">Learn French one tap at a time.<br><span class="muted">🔊 normal speed · 🐢 slow speed</span></p></div>
<div class="tip">💡 Turn off silent mode (the switch on the side of your iPhone) to hear the voice.</div>
<div class="grid"><button class="tile" data-go="words"><b>📚</b>Words</button><button class="tile" data-go="verbs"><b>🔤</b>Verb tenses</button><button class="tile" data-go="practice"><b>🎯</b>Practice</button><button class="tile" data-go="progress"><b>⭐</b>Progress</button></div>
<div class="card" style="margin-top:12px"><div class="muted">Word of the day</div>${wotd()}</div>`;
view.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>tab(b.dataset.go))},'Bonjour!')}
function wotd(){const a=allWords(),w=a[Math.floor(Date.now()/864e5)%a.length];return `<div class="row" style="box-shadow:none;padding:4px 0"><div class="tx"><div class="fr">${esc(w.fr)}</div><div class="en">${esc(w.en)}</div><div class="ph">${esc(w.ph)}</div></div>${btns(w.fr)}</div>`}
function words(){go(()=>{view.innerHTML='<div class="grid">'+Object.entries(THEMES).map(([k,t])=>`<button class="tile" data-k="${k}"><b>${t.i}</b>${t.n}<div class="muted">${t.w.filter(w=>S.known.includes(w.fr)).length}/${t.w.length} known</div></button>`).join('')+'</div>';
 view.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>theme(b.dataset.k))},'Words')}
function theme(k){const t=THEMES[k];go(()=>{view.innerHTML=`<button class="btn" id="fc">🃏 Flashcards for this topic</button>`+t.w.map(w=>`<div class="row" data-s="${esc(w.fr)}"><div class="tx"><div class="fr">${esc(w.fr)} ${S.known.includes(w.fr)?'✅':''}</div><div class="en">${esc(w.en)}</div><div class="ph">${esc(w.ph)}</div></div>${btns(w.fr)}${SR?`<button class="say" data-sp="${esc(w.fr)}">🎤</button>`:''}</div>`).join('');
 $('#fc').onclick=()=>flash(t.w,t.n);view.querySelectorAll('[data-sp]').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.sp)})},t.i+' '+t.n)}
function verbs(){go(()=>{view.innerHTML=`<div class="tip">Tap a verb, then tap any line to hear it. Pronouns: je = I, tu = you (friend), il/elle = he/she, nous = we, vous = you (polite/plural), ils/elles = they.</div>`+Object.entries(V).map(([v,d])=>`<div class="row" data-v="${v}"><div class="tx"><div class="fr">${v}</div><div class="en">${d.en}</div></div>${btns(v)}<span style="font-size:24px;color:#aaa">›</span></div>`).join('');
 view.querySelectorAll('[data-v]').forEach(r=>r.onclick=()=>verb(r.dataset.v))},'Verbs')}
function verb(v,t='pr'){go(()=>{const T=TENSES[t];view.innerHTML=`<div class="chips">${Object.entries(TENSES).map(([k,x])=>`<button class="chip ${k==t?'on':''}" data-t="${k}">${x.n}</button>`).join('')}</div>
<div class="card"><div class="fr">${v} — ${T.n}</div><div class="en"><b>${T.en}.</b> ${T.why}</div>
<div class="row" style="box-shadow:none;background:#f3f6fc;margin-top:10px"><div class="tx"><div class="fr" style="font-size:16px">${esc(T.ex[0])}</div><div class="en">${esc(T.ex[1])}</div></div>${btns(T.ex[0])}</div></div>
<div class="card"><table>${conj(v,t).map(c=>`<tr class="t" data-s="${esc(c.say)}"><td class="p">${c.p}</td><td><b>${esc(c.full.replace(/^(j'|je |tu |il\/elle |nous |vous |ils\/elles )/,''))}</b></td><td style="width:40px">🔊</td></tr>`).join('')}</table>
${V[v].etre&&t=='pc'?'<p class="muted">With être, the past participle agrees: add -e for female, -s for plural.</p>':''}</div>
<button class="btn alt" id="slowall">🐢 Hear all slowly</button>`;
view.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{stack.pop();cur=null;stack.length?0:0;verbSwap(v,c.dataset.t)});
$('#slowall').onclick=()=>say(conj(v,t).map(c=>c.say).join('. '),1)},v)}
function verbSwap(v,t){const s=stack.slice();verb(v,t);stack=s;$('#back').style.visibility='visible'}
function practice(){go(()=>{view.innerHTML=`<button class="btn" id="a">🃏 Flashcards (all words)</button><button class="btn" id="b">🇫🇷→🇬🇧 Quiz: French to English</button><button class="btn" id="c">🇬🇧→🇫🇷 Quiz: English to French</button><button class="btn red" id="d">👂 Listening quiz</button><button class="btn red" id="e">🔤 Conjugation quiz</button>${SR?'<button class="btn alt" id="f">🎤 Speaking practice</button>':''}`;
 $('#a').onclick=()=>flash(allWords(),'Flashcards');$('#b').onclick=()=>quiz('fe');$('#c').onclick=()=>quiz('ef');$('#d').onclick=()=>quiz('li');$('#e').onclick=()=>quiz('cj');if(SR)$('#f').onclick=()=>speakPractice()},'Practice')}
function flash(list,title){let q=shuf(list.filter(w=>!S.known.includes(w.fr)));if(!q.length)q=shuf(list);let i=0;
 go(function draw(){if(i>=q.length){view.innerHTML=`<div class="big">🎉 Bravo!</div><p style="text-align:center">You went through ${q.length} cards.</p><button class="btn" id="r">Again</button>`;$('#r').onclick=()=>{i=0;q=shuf(q);draw()};return}
 const w=q[i];view.innerHTML=`<div class="muted" style="text-align:center">${i+1} / ${q.length} · tap card to flip</div><div class="flash" id="fl"><div class="fi"><div class="fs">${esc(w.fr)}<div style="margin-top:14px">${btns(w.fr)}</div></div><div class="fs bk">${esc(w.en)}<div class="ph" style="font-size:18px">${esc(w.ph)}</div></div></div></div>
 <div class="grid"><button class="btn alt" id="n">🔁 Again later</button><button class="btn ok" id="k">✅ I know it</button></div>`;
 $('#fl').onclick=()=>$('#fl').classList.toggle('flip');say(w.fr);
 $('#n').onclick=()=>{q.push(w);i++;draw()};$('#k').onclick=()=>{if(!S.known.includes(w.fr))S.known.push(w.fr);save();i++;draw()}},title)}
function makeQ(m){if(m=='cj'){const vs=Object.keys(V),v=vs[Math.random()*vs.length|0],ts=Object.keys(TENSES),t=ts[Math.random()*ts.length|0],c=conj(v,t),pi=Math.random()*6|0;
 const opts=new Set([c[pi].full]);c.forEach(x=>opts.add(x.full));const right=c[pi].full,strip=s=>s.replace(/^(j'|je |tu |il\/elle |nous |vous |ils\/elles )/,'');
 const o=shuf([...new Set(c.map(x=>strip(x.full)))]).filter(x=>x!==strip(right)).slice(0,3);o.push(strip(right));
 return{q:`<div class="muted">${TENSES[t].n} of</div><div class="big">${v}</div><div class="score">${P[pi]} ___</div>`,opts:shuf(o),ans:strip(right),sayAfter:c[pi].say}}
 const all=allWords(),w=all[Math.random()*all.length|0],dis=shuf(all.filter(x=>x.fr!==w.fr&&x.en!==w.en)).slice(0,3),f=m=='fe'?'en':'fr';
 const opts=shuf([w,...dis]).map(x=>x[f]);
 if(m=='li')return{q:`<div class="big">🔊</div><button class="btn" data-s="${esc(w.fr)}">Play again</button><button class="btn alt" data-s="${esc(w.fr)}" data-slow="1">🐢 Slow</button>`,opts:shuf([w,...dis]).map(x=>x.fr),ans:w.fr,auto:w.fr};
 return{q:m=='fe'?`<div class="big">${esc(w.fr)}</div><div style="text-align:center">${btns(w.fr)}</div>`:`<div class="big" style="color:var(--t)">${esc(w.en)}</div>`,opts,ans:w[f],sayAfter:w.fr}}
const QN={fe:'French → English',ef:'English → French',li:'Listening quiz',cj:'Conjugation quiz'};
function quiz(m){let n=0,ok=0;const N=10;go(function draw(){if(n>=N){S.scores.push({m:QN[m],s:ok,n:N,d:new Date().toLocaleDateString()});S.scores=S.scores.slice(-30);save();
 view.innerHTML=`<div class="big">${ok>=8?'🏆':ok>=5?'👍':'💪'} ${ok} / ${N}</div><p style="text-align:center">${ok>=8?'Excellent !':ok>=5?'Bien joué !':'Continue ! Keep practising.'}</p><button class="btn" id="r">Play again</button>`;$('#r').onclick=()=>{n=0;ok=0;draw()};return}
 const Q=makeQ(m);view.innerHTML=`<div class="muted" style="text-align:center">Question ${n+1} / ${N} · Score ${ok}</div><div class="card">${Q.q}</div>`+Q.opts.map(o=>`<button class="btn alt opt">${esc(o)}</button>`).join('');
 if(Q.auto)setTimeout(()=>say(Q.auto),250);
 view.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(view.dataset.lock)return;view.dataset.lock=1;const right=b.textContent===Q.ans;if(right)ok++;
  view.querySelectorAll('.opt').forEach(x=>{if(x.textContent===Q.ans)x.classList.add('ok')});if(!right)b.classList.add('no');
  if(Q.sayAfter)say(Q.sayAfter);setTimeout(()=>{delete view.dataset.lock;n++;draw()},right?1100:2000)})},QN[m])}
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function speak(target,cb){if(!SR)return;const r=new SR();r.lang='fr-FR';r.maxAlternatives=5;r.interimResults=false;
 const m=document.createElement('div');m.className='tip';m.textContent='🎤 Listening… say: '+target;view.prepend(m);scrollTo(0,0);
 r.onresult=e=>{const alts=[...e.results[0]].map(a=>a.transcript),t=norm(target.replace(/…/g,'')),hit=alts.some(a=>{const x=norm(a);return x===t||x.includes(t)||t.includes(x)&&x.length>t.length*.6});
  m.textContent=(hit?'✅ Très bien ! ':'❌ Not quite. ')+'I heard: "'+alts[0]+'"';m.style.background=hit?'#e3f6ea':'#fde9e7';cb&&cb(hit)};
 r.onerror=e=>{m.textContent='Microphone not available ('+e.error+'). Allow mic access in Settings › Safari.'};r.start()}
function speakPractice(){go(function draw(){const all=allWords(),w=all[Math.random()*all.length|0];view.innerHTML=`<div class="card"><div class="muted">Say this in French:</div><div class="big">${esc(w.fr)}</div><div class="en" style="text-align:center">${esc(w.en)} · <span class="ph">${esc(w.ph)}</span></div><div style="text-align:center">${btns(w.fr)}</div></div><button class="btn red" id="m">🎤 Tap and speak</button><button class="btn alt" id="nx">Next word ›</button>`;
 $('#m').onclick=()=>speak(w.fr);$('#nx').onclick=draw},'Speaking')}
function progress(){go(()=>{const tot=allWords().length,sc=S.scores.slice().reverse();view.innerHTML=`<div class="grid"><div class="tile"><b>🔥 ${S.streak}</b>day streak</div><div class="tile"><b>✅ ${S.known.length}</b>of ${tot} words known</div></div>
<div class="card" style="margin-top:12px"><b>Recent quizzes</b>${sc.length?sc.map(s=>`<div class="row" style="box-shadow:none;min-height:0;padding:6px 0"><div class="tx">${s.m}<div class="muted">${s.d}</div></div><b>${s.s}/${s.n}</b></div>`).join(''):'<p class="muted">No quizzes yet — try one in Practice!</p>'}</div>
<button class="btn alt" id="rs">Reset progress</button><p class="muted">Voice: ${VOICE?esc(VOICE.name):'default French voice'} · Speech recognition: ${SR?'available':'not available on this device'}</p>`;
$('#rs').onclick=()=>{if(confirm('Reset all progress?')){S.known=[];S.scores=[];save();progress()}}},'Progress')}
tab('home');{const h=location.hash.slice(1);if(h=='verbs'){tab('verbs');verb('aller','pc')}if(h=='quiz'){tab('practice');quiz('cj')}}
if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js');
