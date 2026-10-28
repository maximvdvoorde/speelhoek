# Bundles every game in ../games into one Speelhoek page (each game runs in its own frame),
# and writes the installable offline web app into ../site (index.html + manifest + service worker + icons)
import json, base64, pathlib, re, shutil, hashlib
root = pathlib.Path(__file__).resolve().parent.parent
games = [
  {'id':'monster','title':'Monster Kitchen','file':'games/monster-kitchen.html',
   'css':'.topbar{padding-left:max(76px,env(safe-area-inset-left,0px))!important}'},
  {'id':'plassen','title':'Plassen Springer','file':'games/plassen-springer.html','css':''},
  {'id':'meteorieten','title':'Meteorieten­regen','file':'games/meteorietenregen.html','css':''},
  {'id':'eendjes','title':'Eendjes Vissen','file':'games/eendjes-vissen.html','css':''},
  {'id':'plasticsoep','title':'Plasticsoep Opruimer','file':'games/plasticsoep-opruimer.html','css':''},
  {'id':'fruit','title':'Fruit Fabriek','file':'games/fruit-fabriek.html','css':''},
  {'id':'vogelnestje','title':'Vogelnestje','file':'games/vogelnestje.html','css':''},
  {'id':'klankenjacht','title':'Klankenjacht','file':'games/klankenjacht.html','css':''},
]
# The fonts are embedded, so nothing has to come from Google Fonts (works offline)
def font(family, weight, file):
    b64 = base64.b64encode((root/'hub/fonts'/file).read_bytes()).decode()
    return ("@font-face{font-family:'%s';font-style:normal;font-weight:%s;font-display:swap;"
            "src:url(data:font/woff2;base64,%s) format('woff2')}" % (family, weight, b64))
font_css = (font('Baloo 2', '700 800', 'baloo2-latin.woff2') + font('Press Start 2P', '400', 'pressstart2p-latin.woff2')
            + font('Playwrite BE VLG', '400', 'playwritebevlg.woff2') + font('Teachers', '700', 'teachers-latin.woff2'))
google_fonts = re.compile(r'<link[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*')

data = []
for g in games:
    cover = base64.b64encode((root/'hub/covers'/(g['id']+'.jpg')).read_bytes()).decode()
    html = google_fonts.sub('', (root/g['file']).read_text(encoding='utf-8'))
    data.append({'id':g['id'],'title':g['title'],'html':html,'css':g['css'],
                 'cover':'data:image/jpeg;base64,'+cover})
js = json.dumps(data).replace('</','<\\/').replace('<!--','<\\!--')
tpl = (root/'hub/speelhoek.template.html').read_text(encoding='utf-8')
page = tpl.replace('__FONT_CSS__', font_css).replace('__GAMES__', js)

site = root/'site'
if site.exists(): shutil.rmtree(site)
(site/'icons').mkdir(parents=True)
(site/'index.html').write_text(page, encoding='utf-8')
version = hashlib.sha256(page.encode('utf-8')).hexdigest()[:12]
(site/'sw.js').write_text((root/'hub/sw.js').read_text(encoding='utf-8').replace('__VERSION__', version), encoding='utf-8')
shutil.copy(root/'hub/manifest.webmanifest', site/'manifest.webmanifest')
for icon in (root/'hub/icons').glob('*.png'): shutil.copy(icon, site/'icons'/icon.name)
(site/'.nojekyll').write_text('')
print('built site/ (version %s): %d KB of game data, %d KB page' % (version, len(js)//1024, len(page)//1024))
