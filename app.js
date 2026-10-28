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
let VOICE=null;const HAS_TTS='speechSynthesis' in window;
const AK=new Set(["026a9e51", "0279e6c2", "031a24b8", "032b5eb9", "0349ad55", "038f5fd3", "04c35ce5", "0552a4c2", "062d17e8", "06a61ab2", "06bda83e", "07019ec8", "07041ffe", "0740db4e", "07dbe3b7", "085dc9d0", "08925dda", "08fd5332", "0b928606", "0cbc7d4c", "0cff6d0b", "0db9f852", "0ebecca3", "0f06aa33", "0f2964be", "10421806", "1144d7fb", "11b57d04", "12093279", "12d957b1", "138705a7", "14346ee6", "16a8a7ca", "185edd99", "18985e79", "18bbb413", "1926e0fc", "194fc966", "1c480ad9", "1ce039c8", "1dcc6f31", "1df91d72", "1e01a0cd", "1e4e750c", "1e574d23", "1eb28296", "1f13a5ab", "1f1beae7", "20a67ee8", "20e82d50", "2109d541", "213b0ced", "21efa2c0", "224af179", "2253fa20", "22c25bdb", "23554ca0", "24b26779", "26c77b8c", "270979e1", "27601f33", "289329d5", "28d26ec9", "29326aa9", "29acba42", "29faa69f", "2a35cc90", "2a976788", "2ad9cf29", "2b875da1", "2bad04f9", "2bfa8f0e", "2c9751c5", "2d532368", "2d805dad", "2da0eef9", "2e6bc10b", "2ea90881", "2f4d0039", "30f24eee", "310786ff", "31a5fd96", "3211a396", "32422848", "32e19a63", "3365f590", "358c797b", "35938fef", "35df8632", "36b97bcb", "375bd2a0", "37a0ad4f", "3829a3a0", "38540573", "39ede2f6", "3a175278", "3a60eb65", "3aaa95a8", "3b93c64b", "3bca6f80", "3bf6fc11", "3c0376ca", "3c882d13", "3c94e8d2", "3cb37251", "3d6be763", "3d814325", "3f54887c", "3fbc7f16", "3fd3638e", "40d12864", "40de8425", "415522f4", "41f60775", "41fcea16", "427b4c8a", "43ac5958", "449fe10d", "44b47511", "4596a659", "45b473eb", "45f4ba32", "464cd7b6", "488907a9", "493982ca", "49448a67", "494ab65a", "4993efe1", "4b8013c4", "4c557867", "4d2566cd", "4dc53100", "4f2eb157", "4f510155", "4fac39d5", "5022b414", "5080ae18", "50c1b3f7", "510ffcc1", "5113727b", "5131930f", "514bcda3", "521a9b9b", "5296943c", "52a7d228", "52ce45c7", "533d10e9", "53ccb0f7", "54cd9fea", "55354426", "5620413c", "56b58869", "56c98fd3", "56ca1177", "594afecb", "5a7cc7cd", "5acd16f8", "5b23a0d6", "5b5e66a4", "5b7cee84", "5c947cd1", "5cdc9139", "5cdd07cb", "5df80c5b", "5e08fd91", "5f4b2e55", "5fad3cdf", "5fd32d40", "610397dc", "61433a5a", "61b823a6", "626185d0", "62d4d200", "637ae5f6", "6390e05f", "640603ac", "64b134eb", "655db608", "666cfa4d", "666f1129", "66fb81be", "67793288", "677b1d77", "67825662", "6842f33a", "68e90628", "6925ee39", "693d7e6f", "6a4cce9a", "6bd122a3", "6c89e1c8", "6d6bc519", "6dc5700a", "715f4734", "71ede02f", "7248bfc4", "72aae483", "72d4cd2d", "73dd4aa4", "749f73a8", "753374a0", "7679d3e1", "769dcda4", "786b9e91", "786bb09c", "795d9c1f", "79c9149c", "79e8de78", "79fde299", "7b35c9ea", "7b6d57f2", "7b9fff0f", "7ce06567", "7e888e37", "7e99344e", "80306722", "80f97d24", "810acc81", "8437c10c", "84c239b4", "84cc7e4c", "858c9e7b", "86723930", "87ed4125", "89349f77", "8aa5940a", "8ade7d6b", "8ae24222", "8b8f8d5c", "8bd25729", "8d872de9", "8db590ea", "8ebbc128", "8f033f0e", "8f0ac314", "8fdff7f3", "8fe3a637", "9111b221", "91805306", "91923246", "91fd3082", "920f4120", "923dd09c", "93aea51d", "93fb86f5", "947bd2ef", "95bf9eb3", "95fe40ef", "9673305a", "96792b2f", "96a40268", "97621f70", "97a93991", "97c92240", "982d2b44", "98673ebd", "989dd47a", "98bb3585", "99184660", "9919a719", "997a5f2b", "99f3e24e", "9a436234", "9a6966aa", "9a901404", "9b4b0965", "9ca55681", "9ccba512", "9cfa8f9c", "9cff7137", "9e997126", "9f7327c8", "9f7b2e7a", "9fc44a71", "a0529a9b", "a14cfbfb", "a18ba069", "a2031cbe", "a210a877", "a275baa0", "a2d5dbd7", "a43ff5b0", "a4584736", "a469b870", "a596c1ec", "a5a5b572", "a5afba71", "a5feadd9", "a6682239", "a85bd279", "a86b76ef", "a9246b48", "aab8afe5", "aad7fc58", "ab099392", "ab980b93", "aca88650", "ad39a038", "ae18c5c5", "b02da18c", "b101b2c3", "b2247f1e", "b4401d8b", "b4e6f1f5", "b4e74bfa", "b5732321", "b5a83bd6", "b6152ab8", "b61b2a0a", "b6526e60", "b663d134", "b6a64826", "b73771ab", "b83627f5", "b85b3f9b", "b9e8a034", "ba2057b4", "baa864e2", "bac139a1", "bae871e0", "bafb945f", "bb4728b1", "bb738139", "bcae5700", "bcb7ae88", "bd556858", "be32973c", "be71ee3a", "bee1ca4f", "bef05f1b", "c025aaef", "c02b44e1", "c0860ef2", "c0873554", "c0a99f85", "c14c87eb", "c1fb6dbf", "c2981af3", "c32628e2", "c4992c9f", "c4af7f7a", "c4e4719a", "c5f5e5ba", "c60d9ed3", "c76fbbe2", "c7e15614", "c81a88ac", "c976c92f", "ca3007ab", "ca347de8", "ca5e15b7", "cae234c3", "cc654a6f", "cce36d10", "ce263f80", "cf490a9a", "cf75b7fe", "d024158a", "d03cd237", "d19a656b", "d1e8370d", "d1e9849a", "d21ae7cc", "d323860c", "d335993f", "d431fb01", "d4d4ffd0", "d55d5510", "d560a93c", "d5649d58", "d607cebb", "d62e73e6", "d63de674", "d8038dd9", "d8ce24ce", "d8ee552f", "d90f5ab9", "d9340f62", "d98d1271", "da47f888", "da5fb292", "db2070c4", "dbc307d9", "dc3f9856", "dcd0421e", "dd53f962", "ddb474f8", "de428bf0", "deda6c59", "df66a355", "df7b0a68", "e15d265a", "e1a9e5e2", "e2614611", "e2f54717", "e3075b38", "e35068fc", "e362a822", "e3ffbf34", "e3ffd9ce", "e414d4b5", "e4e44efc", "e53f7c9f", "e58a71f5", "e5e3e909", "e6a2fab6", "e6f749b7", "e7e7e0c4", "e81e37cb", "e8353b42", "e8532a50", "e8d01dad", "e8d1add6", "e94a300a", "e951e4ab", "eb607f75", "ebb32d4e", "ec9567b6", "eca751c0", "edc29c8b", "eded333d", "ee1aef61", "ee7d88dc", "f031ba61", "f05af507", "f0f9700a", "f1811935", "f206f92c", "f24d1c39", "f30c1f3c", "f3df31e5", "f4019ffc", "f4360266", "f5b0d7da", "f5b26a34", "f5da3c72", "f79b383c", "f7a7b321", "f7b4b621", "f7b67e96", "f8d7385c", "fac6d391", "fb1ea910", "fb3a4fec", "fd03905b", "fd219410", "fed5bc2f", "ff08c5fe", "ff0ea0c2", "ff5ee0ba", "ff7cf0be", "ffac0f6c"]);
const anorm=t=>t.replace(/…/g,'').replace('/',' ').replace('(e)','').replace(/\s+/g,' ').trim();
const hk=s=>{let x=2166136261;for(const c of s){x^=c.codePointAt(0);x=Math.imul(x,16777619)>>>0}return x.toString(16).padStart(8,'0')};
const AU=new Audio();AU.preload='auto';AU.setAttribute('playsinline','');
function pickVoice(){if(!HAS_TTS)return;const vs=speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang));
 VOICE=vs.find(v=>/thomas|amélie|amelie/i.test(v.name)&&/fr-FR/i.test(v.lang))||vs.find(v=>/fr[-_]FR/i.test(v.lang))||vs[0]||null}
if(HAS_TTS){pickVoice();speechSynthesis.addEventListener?speechSynthesis.addEventListener('voiceschanged',pickVoice):speechSynthesis.onvoiceschanged=pickVoice}
// iOS: unlock audio + speech on the very first touch
let unlocked=false;function unlock(){if(unlocked)return;unlocked=true;
 try{AU.muted=true;AU.src='audio/silence.mp3';const p=AU.play();p&&p.then(()=>{if(AU.src.includes('silence'))AU.pause();AU.muted=false}).catch(()=>{AU.muted=false})}catch(e){AU.muted=false}
 if(HAS_TTS){try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}}}
['touchstart','touchend','click'].forEach(ev=>document.addEventListener(ev,unlock,{capture:true,passive:true}));
function tts(t,slow){if(!HAS_TTS)return false;try{
 if(speechSynthesis.speaking||speechSynthesis.pending)speechSynthesis.cancel();
 if(speechSynthesis.paused)speechSynthesis.resume();
 const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';if(!VOICE)pickVoice();if(VOICE)u.voice=VOICE;u.rate=slow?.6:.9;u.volume=1;
 speechSynthesis.speak(u);
 // iOS sometimes drops speak() right after cancel(): retry once if nothing started
 let started=false;u.onstart=()=>{started=true};
 setTimeout(()=>{if(!started&&!speechSynthesis.speaking){speechSynthesis.cancel();speechSynthesis.speak(u)}},350);
 return true}catch(e){return false}}
let seq=[];
function playFile(k,slow){AU.muted=false;AU.src='audio/'+k+'.mp3';AU.playbackRate=slow?.7:1;
 try{AU.preservesPitch=true;AU.webkitPreservesPitch=true}catch(e){}
 const p=AU.play();if(p&&p.catch)p.catch(()=>{seq=[];tts(AK_TEXT||'',slow)})}
let AK_TEXT='';
AU.onended=()=>{if(seq.length){const n=seq.shift();AK_TEXT=n.t;playFile(n.k,n.slow)}};
AU.onerror=()=>{if(AU.src.includes('silence'))return;seq=[];tts(AK_TEXT,false)};
// Main entry: called synchronously from tap handlers
function say(t,slow){t=anorm(t);if(HAS_TTS&&(speechSynthesis.speaking||speechSynthesis.pending))speechSynthesis.cancel();
 const parts=t.split(/\.\s+/).map(anorm).filter(Boolean),ks=parts.map(p=>hk(p));
 if(AK.has(hk(t))){seq=[];AU.pause();AK_TEXT=t;playFile(hk(t),slow);return}
 if(parts.length>1&&ks.every(k=>AK.has(k))){AU.pause();seq=parts.slice(1).map((p,i)=>({t:p,k:ks[i+1],slow}));AK_TEXT=parts[0];playFile(ks[0],slow);return}
 AU.pause();seq=[];tts(t,slow)}
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
<div class="tip">🔈 No sound? Turn off the iPhone silent switch (side of the phone) and raise the volume.</div>
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
