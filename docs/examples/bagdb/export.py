from pathlib import Path
import json, runpy, shutil
from gramlot.builder import GramlotBuilder
from gramlot.transport import to_tytx
import argparse
parser=argparse.ArgumentParser(description='Export the Python BagDB laboratory')
parser.add_argument('output', type=Path)
args=parser.parse_args()
poc=Path(__file__).resolve().parents[3]
out=args.output.resolve();out.mkdir(parents=True, exist_ok=False)
resources=poc/'src/gramlot/resources/browser'
manifest=json.loads((resources/'manifest.json').read_text())
runtime_name='runtime-'+manifest['buildId']
shutil.copytree(resources,out/runtime_name)
Page=runpy.run_path(str(poc/'docs/examples/bagdb/pages/index.py'))['Page']
page=Page();builder=GramlotBuilder('main');page.main(builder.root)
manifest=json.loads((resources/'manifest.json').read_text())
imports={key:'./'+runtime_name+'/'+value for key,value in manifest['entryPoints'].items()}
payload=json.dumps({'source':to_tytx(builder.source,'json')}).replace('<','\\u003c')
(out/'index.html').write_text('''<!doctype html><html><head><meta charset="utf-8"><title>BagDB laboratory</title>
<script type="importmap">'''+json.dumps({'imports':imports})+'''</script></head><body><div id="root"></div>
<script id="startup" type="application/json">'''+payload+'''</script><script type="module">
import {Application} from 'gramlot-dom';import {GramlotBuilder} from 'gramlot-builder';import {fromTytx} from 'genro-tytx';
const builder=new GramlotBuilder('main');builder.loadSource(fromTytx(JSON.parse(document.getElementById('startup').textContent).source,'json'));
const app=new Application(document.getElementById('root'),builder);window.addEventListener('pagehide',()=>app.dispose(),{once:true});
</script></body></html>''')
print(out)
