"""Archive publicly linked TOM-DAR pages/assets; deduplicate assets by SHA-256."""
import concurrent.futures, hashlib, json, re, urllib.request, urllib.parse
from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / 'reference/original'
PUBLIC = ROOT / 'public/assets'
BASE = 'https://tomdarokna.pl/'
ARCHIVE.mkdir(parents=True, exist_ok=True)
IMAGE = {'.jpg','.jpeg','.png','.webp','.gif','.svg','.ico','.avif'}
MEDIA = IMAGE | {'.pdf','.woff','.woff2','.ttf','.eot','.mp4','.webm'}

def normalize(raw, base=BASE):
    raw = raw.strip().replace('&amp;', '&')
    if not raw or raw.startswith(('data:', '#', 'mailto:', 'tel:', 'javascript:')) or '),url(' in raw or 'format(' in raw: return None
    u = urllib.parse.urlsplit(urllib.parse.urljoin(base,raw))
    if u.hostname not in ('tomdarokna.pl','www.tomdarokna.pl'): return None
    return urllib.parse.urlunsplit(('https','tomdarokna.pl',u.path or '/',u.query,''))

def fetch(url):
    try:
        req=urllib.request.Request(urllib.parse.quote(url,safe=':/?=&%'),headers={'User-Agent':'TOM-DAR-redesign-asset-archive/1.0'})
        with urllib.request.urlopen(req,timeout=35) as r: return url,r.read(),r.headers.get_content_type(),None
    except Exception as e: return url,None,None,str(e)

class Page(HTMLParser):
    def __init__(self): super().__init__(); self.refs=set(); self.text=[]; self.hidden=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'): self.hidden+=1
        for k in ('href','src','data-src','data-background','poster'):
            if a.get(k): self.refs.add(a[k])
        if a.get('srcset'):
            for s in a['srcset'].split(','): self.refs.add(s.strip().split(' ')[0])
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.hidden=max(0,self.hidden-1)
    def handle_data(self,data):
        if not self.hidden and data.strip(): self.text.append(data.strip())

pages={}; assets={}; styles={}; failures=[]; queue={BASE,BASE+'robots.txt',BASE+'sitemap.xml'}; seen=set(); sources={}
while queue:
    batch=sorted(queue-seen); queue=set()
    if not batch: break
    seen.update(batch)
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        results=list(pool.map(fetch,batch))
    for url,data,mime,error in results:
        if error: failures.append({'url':url,'error':error}); continue
        ext=Path(urllib.parse.urlsplit(url).path).suffix.lower()
        if ext in MEDIA:
            if mime == 'text/html':
                failures.append({'url':url,'error':'Soft 404: HTML returned instead of media'}); continue
            assets[url]=(data,mime); continue
        text=data.decode('utf-8',errors='replace')
        if mime=='text/html':
            p=Page(); p.feed(text)
            name=urllib.parse.urlsplit(url).path.strip('/') or 'index.html'
            file=ARCHIVE/'pages'/name
            file.parent.mkdir(parents=True,exist_ok=True); file.write_text(text)
            pages[url]={'file':str(file.relative_to(ROOT)),'text':p.text}
            refs=p.refs
            # Preserve references in comments too, but do not use commented copy in the new page.
            refs.update(re.findall(r'''(?:src|href)=["']([^"']+)["']''',text))
        else:
            refs=set()
            if ext in ('.css','.js'): styles[url]=text
            if ext=='.xml': refs.update(re.findall(r'<loc>(.*?)</loc>',text))
            if ext=='.txt': refs.update(re.findall(r'Sitemap:\s*(\S+)',text,re.I))
        refs.update(m[0] or m[1] or m[2] for m in re.findall(r'''url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)''',text))
        refs.update(re.findall(r'''["']([^"'<>\s]+\.(?:jpg|jpeg|png|webp|svg|gif|woff2?|pdf)(?:\?[^"']*)?)["']''',text,re.I))
        for ref in refs:
            target=normalize(ref,url)
            if not target: continue
            suffix=Path(urllib.parse.urlsplit(target).path).suffix.lower()
            if suffix in MEDIA | {'.html','.htm','.css','.js','.xml'} or urllib.parse.urlsplit(target).path=='/':
                sources.setdefault(target,set()).add(url)
                if target not in seen: queue.add(target)
    print(f'Pages {len(pages)}, assets {len(assets)}, pending {len(queue)}, failures {len(failures)}',flush=True)

hashes={}; manifest=[]
for url,(data,mime) in sorted(assets.items()):
    digest=hashlib.sha256(data).hexdigest(); path=urllib.parse.unquote(urllib.parse.urlsplit(url).path)
    ext=Path(path).suffix.lower(); name=Path(path).name
    if ext=='.pdf': category='documents'
    elif ext in {'.woff','.woff2','.ttf','.eot'}: category='fonts'
    elif 'katalog' in name.lower(): category='catalog-covers'
    elif any(x in name.lower() for x in ('logo','partner','favicon')): category='brand'
    elif name.lower().startswith('glowna'): category='slider'
    elif '/works/' in path: category='products'
    elif any(x in path.lower() for x in ('realiz','galer')): category='projects'
    elif ext=='.svg' or 'ico-' in name: category='icons'
    else: category='photos'
    if digest not in hashes:
        name=re.sub(r'[^a-zA-Z0-9._-]','-',name)
        destination=PUBLIC/category/(Path(name).stem+'-'+digest[:8]+ext)
        destination.parent.mkdir(parents=True,exist_ok=True); destination.write_bytes(data)
        hashes[digest]='/'+str(destination.relative_to(ROOT/'public'))
    manifest.append({'source':url,'local':hashes[digest],'sha256':digest,'bytes':len(data),'mime':mime,'referencedBy':sorted(sources.get(url,[]))})
(ARCHIVE/'asset-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(ARCHIVE/'page-inventory.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2))
(ARCHIVE/'crawl-report.json').write_text(json.dumps({'date':datetime.now(timezone.utc).isoformat(),'pages':len(pages),'assetUrls':len(assets),'uniqueFiles':len(hashes),'failures':failures,'visited':sorted(seen)},ensure_ascii=False,indent=2))
(ARCHIVE/'styles').mkdir(exist_ok=True)
for url,text in styles.items():
    (ARCHIVE/'styles'/(hashlib.sha256(url.encode()).hexdigest()[:8]+'-'+Path(url).name)).write_text(text)
print(f'COMPLETE: {len(pages)} pages, {len(assets)} asset URLs, {len(hashes)} unique files',flush=True)
