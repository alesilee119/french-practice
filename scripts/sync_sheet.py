#!/usr/bin/env python3
"""Sync the word list from the Google Sheet (Alesi_Dict_updated.xlsx) into the app.

Usage:
  python3 scripts/sync_sheet.py                 # download the sheet (must be shared "anyone with link") and sync
  python3 scripts/sync_sheet.py --xlsx file.xlsx  # use a local copy (e.g. downloaded from Drive)
  add --commit to git commit + push afterwards.
Writes sheet.js and generates any missing audio/<hash>.mp3 with edge-tts (fr-FR-DeniseNeural).
No credentials are used or stored.
"""
import argparse, asyncio, json, os, re, subprocess, sys, unicodedata, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHEET_ID = '1zMDs3LLIyay0A3iS_Vj6fkcKtaE87kZa'
VOICE = 'fr-FR-DeniseNeural'

# Spelling fixes for the French column (key = lower-case, spaces/accents stripped)
FIX = {
 'the':'thé','cing':'cinq','monsier':'Monsieur','silvousplait':"S'il vous plaît",'enchante':'enchanté',
 'abientot':'à bientôt','cava':'ça va','mappelee':"je m'appelle",'tuviensdou':"tu viens d'où",'frere':'frère',
 'jai':"j'ai",'tres':'très','mechante':'méchante','interessant(he)':'intéressant','interessante(she)':'intéressante',
 'biensur':'bien sûr','monfrere':'mon frère','daccord':"d'accord",'excuse-moi':'excuse-moi','bleue':'bleu / bleue',
 'americain':'américain','mexicain':'mexicain','mere':'mère','pere':'père','allemand':'allemand','francias':'français',
 'famile':'famille','cle':'clé','loudre':'lourd','prete':'prêt / prête','pret':'prêt','manegons':'mangeons',
 'ouest':'où est','ou':'où','canape':'canapé','adore':'adore','idee':'idée','sault':'salut','cavabien':'ça va bien',
 'commenttutappelles':"comment tu t'appelles ?",'jhabite':"j'habite",'japonais':'japonais','portugaise':'portugaise',
 'portefeuile':'portefeuille','amusante(she)':'amusante','amusant(he)':'amusant','unesoeur':'une sœur','soeur':'sœur',
 'masoeur':'ma sœur','jadore':"j'adore",'retard':'en retard','ta':'est','parles':'parles',
}
SWAP_EN = {'very','wife','live','in.','she is','there is','well'}  # rows where the columns were typed the wrong way round
SKIP = {('late','e'):'French cell is just "e"', ('you','yu'):'typo duplicate of "tu"', ('ah','ah'):'not a word',
        ('right','ma'):'"ma" does not mean "right"', ('neveu',''):'no translation (already listed as nephew)'}

def norm(s): return re.sub(r'[\s]+','',(s or '').strip().lower())
def strip_acc(s): return ''.join(c for c in unicodedata.normalize('NFD',s) if unicodedata.category(c)!='Mn')
def clean(s): return re.sub(r'\s+',' ',str(s or '')).strip()

def anorm(t):  # must match app.js anorm()
    t=t.replace('…','').replace('/',' ',1).replace('(e)','',1); return re.sub(r'\s+',' ',t).strip()
def hk(s):  # FNV-1a, must match app.js hk()
    x=2166136261
    for c in s: x^=ord(c); x=(x*16777619)&0xffffffff
    return '%08x'%x

def parse(path):
    import openpyxl
    ws=openpyxl.load_workbook(path,data_only=True).active
    rows=list(ws.iter_rows(values_only=True))[1:]
    cats={'alphabet':{'n':'Alphabet','i':'🔠','w':[]}}; cur='alphabet'; skipped=[]; seen={}
    for i,r in enumerate(rows,start=2):
        en,fr,ph=(clean(x) for x in (list(r)+[None]*3)[:3])
        if not en and not fr: continue
        if en and not fr and not ph and en.lower() in ('numbers','vocabulary'):
            cur=en.lower(); cats[cur]={'n':{'numbers':'Numbers (sheet)','vocabulary':'My vocabulary'}[cur],'i':{'numbers':'🔢','vocabulary':'📝'}[cur],'w':[]}; continue
        key=(en.lower(),fr.lower())
        if key in SKIP: skipped.append((i,en,fr,SKIP[key])); continue
        if cur=='alphabet':
            say=en; meaning='Letter '+en; ph=ph
        else:
            if fr.lower().rstrip('. ') in SWAP_EN or en.lower() in ('femme','habite','dans','qu ellle','il y a','bien','tres'):
                en,fr=fr,en
            if en.lower()=='qu ellle': en,fr='she is',"qu'elle est"
            if fr.lower()=='qu ellle': fr="qu'elle"
            f2=FIX.get(norm(fr).replace("'",''), None)
            say=f2 or fr
            if ph and '(' in ph and not ph.startswith(('Ah','Bay')) and ('he' in ph.lower() or 'she' in ph.lower()) and '—' not in ph:
                alt=FIX.get(norm(ph),ph); say=f'{say} / {alt}'; ph=''
            if ' — ' in ph: ph=ph.split(' — ',1)[1]
            meaning=en.strip(' .').replace('Execuse','Excuse').replace('Thrieen','Thirteen').replace('Germin','German').replace('anut','aunt').replace('an you','and you').capitalize()
            if not say: skipped.append((i,en,fr,'empty French')); continue
        if cur!='alphabet':
            if meaning.lower()=='or': say='ou'
            say={'a':'à','RAPIDE':'rapide',"qu'elle":"qu'elle est"}.get(say,say)
            say=say[0].lower()+say[1:] if say[:1].isupper() and say not in ('Louis','Londres','Tokyo','Madrid','Monsieur') else say
            meaning={'Let go':"Let's go",'Eat':"Let's eat",'In':'In / at (a city)','Lives':'Lives (he/she)','Have':'Have (you)'}.get(meaning,meaning)
        d=seen.setdefault(cur,set())
        if say.lower() in d: skipped.append((i,en,fr,'duplicate')); continue
        d.add(say.lower()); cats[cur]['w'].append({'fr':say,'en':meaning,'ph':ph})
    return cats,skipped

async def tts(text,out):
    import edge_tts
    for a in range(4):
        try:
            await edge_tts.Communicate(text,VOICE,rate='-5%').save(out)
            if os.path.getsize(out)>1000: return
        except Exception as e: err=e
        await asyncio.sleep(2)
    raise RuntimeError(f'tts failed for {text!r}')

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--xlsx'); ap.add_argument('--commit',action='store_true'); a=ap.parse_args()
    path=a.xlsx
    if not path:
        path='/tmp/sheet.xlsx'; url=f'https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=xlsx'
        try: urllib.request.urlretrieve(url,path)
        except Exception as e: sys.exit(f'Could not download the sheet ({e}). Download it from Drive and pass --xlsx.')
    cats,skipped=parse(path)
    keys=set(); todo=[]
    for c in cats.values():
        for w in c['w']:
            t=w['fr']; whole=anorm(t); k=hk(whole); keys.add(k)
            if not os.path.exists(f'{ROOT}/audio/{k}.mp3'): todo.append((whole,k))
    async def run():
        sem=asyncio.Semaphore(6)
        async def one(t,k):
            async with sem: await tts(t,f'{ROOT}/audio/{k}.mp3')
        await asyncio.gather(*(one(t,k) for t,k in todo))
    asyncio.run(run())
    with open(f'{ROOT}/sheet.js','w') as f:
        f.write('// Generated by scripts/sync_sheet.py from the Google Sheet. Do not edit by hand.\n')
        f.write('window.SHEET_THEMES='+json.dumps({'sheet_'+k:v for k,v in cats.items()},ensure_ascii=False,indent=0)+';\n')
        f.write('window.SHEET_AUDIO='+json.dumps(sorted(keys))+';\n')
    n=sum(len(c['w']) for c in cats.values())
    print(f'{n} entries:', {c['n']:len(c['w']) for c in cats.values()}, f'| new audio: {len(todo)}')
    for s in skipped: print('skipped row',*s)
    if a.commit:
        subprocess.run(['git','-C',ROOT,'add','sheet.js','audio'],check=True)
        subprocess.run(['git','-C',ROOT,'commit','-m','Sync word list from Google Sheet'])
        subprocess.run(['git','-C',ROOT,'push'],check=True)
if __name__=='__main__': main()
