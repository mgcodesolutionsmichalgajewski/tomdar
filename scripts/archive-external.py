"""Preserve directly linked supplier catalogues; never crawl external sites."""
import concurrent.futures, hashlib, json, re, urllib.parse, urllib.request
from pathlib import Path
root=Path(__file__).resolve().parents[1]; ref=root/'reference/original'
pages=json.loads((ref/'page-inventory.json').read_text()); manifest=json.loads((ref/'asset-manifest.json').read_text()); refs={}
for page,record in pages.items():
    html=(root/record['file']).read_text()
    for url in re.findall(r'''(?:src|href)=["']([^"']+)["']''',html):
        if url.startswith('http') and urllib.parse.urlsplit(url).hostname not in ('tomdarokna.pl','www.tomdarokna.pl') and re.search(r'\.(pdf|jpg|jpeg|png|webp)(?:\?|$)',url,re.I): refs.setdefault(url,set()).add(page)
def download(url):
    try:
        request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (TOM-DAR asset preservation)'})
        with urllib.request.urlopen(request,timeout=25) as response:
            data=response.read(); mime=response.headers.get_content_type()
        if not data.startswith(b'%PDF') and not mime.startswith('image/'): raise ValueError('URL does not return a PDF or image')
        return url,data,mime,None
    except Exception as e:return url,None,None,str(e)
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for url,data,mime,error in pool.map(download,sorted(refs)):
        if error:results.append({'source':url,'status':'unavailable','reason':error,'referencedBy':sorted(refs[url])});print('Unavailable:',urllib.parse.urlsplit(url).hostname,flush=True);continue
        digest=hashlib.sha256(data).hexdigest(); existing=next((x for x in manifest if x['sha256']==digest),None)
        if existing:local=existing['local']
        else:
            name=urllib.parse.unquote(Path(urllib.parse.urlsplit(url).path).name);name=re.sub('[^a-zA-Z0-9._-]','-',name)
            dest=root/'public/assets/documents'/(Path(name).stem+'-'+digest[:8]+Path(name).suffix.lower());dest.parent.mkdir(exist_ok=True);dest.write_bytes(data);local='/'+str(dest.relative_to(root/'public'))
        entry={'source':url,'local':local,'sha256':digest,'bytes':len(data),'mime':mime,'referencedBy':sorted(refs[url])}
        manifest.append(entry);results.append({**entry,'status':'saved'});print('Saved:',urllib.parse.urlsplit(url).hostname,flush=True)
(ref/'external-assets-report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));(ref/'asset-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('Done:',len([x for x in results if x['status']=='saved']),'saved;',len([x for x in results if x['status']=='unavailable']),'unavailable')
