"""Rebuild Framehouse's original sample artwork. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FONT = ROOT.parent / 'fonts' / 'dm-sans.ttf'
MONO = ROOT.parent / 'fonts' / 'dm-mono.ttf'
CREAM = '#f1eddf'

def font(size, mono=False):
    return ImageFont.truetype(str(MONO if mono else FONT), size)

def text(x,y,value,size,fill=CREAM,mono=False):
    d.text((x,y), value, font=font(size,mono), fill=fill, spacing=-12)

def fitted(value,box,fill):
    x,y,w,h=box
    f=font(180)
    bounds=f.getbbox(value)
    layer=Image.new('RGBA',(bounds[2]+10,bounds[3]-bounds[1]+10))
    ImageDraw.Draw(layer).text((0,-bounds[1]),value,font=f,fill=fill)
    layer=layer.resize((w,h),Image.Resampling.LANCZOS)
    im.paste(layer,(x,y),layer)

names=['quiet-hours','loud-colors','letters-in-motion','open-window','lantern-night','paper-birds','stamp-and-seal','soft-grid','say-it-plainly']
for n,name in enumerate(names):
    square=n in [1,5,6]
    H=900 if square else 1200
    bg=['#23242a','#eee9db','#7956e9','#d8e849','#642627','#99b9d1','#eae2d0','#214d40','#f36836'][n]
    im=Image.new('RGB',(900,H),bg); d=ImageDraw.Draw(im)
    if n==0:
        text(55,45,'FRAMEHOUSE                 TYPE STUDY / 001',16,mono=True)
        d.ellipse((706,135,818,247),fill='#8a69f7')
        fitted('QUIET',(55,280,740,300),CREAM); fitted('HOURS',(55,620,740,310),CREAM)
        text(55,1100,'A LITTLE ROOM FOR NOTHING.',18,mono=True)
    elif n==1:
        text(45,35,'002 / FRAMEHOUSE',17,'#292a30',True)
        d.ellipse((420,110,810,500),fill='#e8a3c1')
        d.polygon([(90,530),(345,100),(600,530)],fill='#f0673e')
        d.rectangle((465,390,790,730),fill='#e6bb31')
        d.pieslice((80,380,650,900),180,360,fill='#294eae')
        text(45,770,'LOUD COLORS',68,'#23242a');text(48,855,'AN EXERCISE IN TAKING UP SPACE.',15,'#23242a',True)
    elif n==2:
        text(48,45,'LETTERS IN',25);text(630,50,'003 / TYPE',17,mono=True)
        for i in range(4): fitted('MOTION',(-100+i*70,200+i*205,910,175),CREAM)
        text(48,1120,'STUDIES IN RHYTHM & REPETITION.',17,mono=True)
    elif n==3:
        fitted('OPEN',(50,65,795,170),'#222624');fitted('WINDOW',(50,265,795,150),'#222624')
        d.rounded_rectangle((180,480,720,1020),radius=270,fill='#222624')
        d.rectangle((180,750,720,1020),fill='#222624')
        d.rounded_rectangle((235,535,665,965),radius=215,fill='#85b4dc')
        d.rectangle((235,750,665,965),fill='#85b4dc');d.rectangle((440,535,460,965),fill='#222624');d.rectangle((235,750,665,770),fill='#222624')
        text(50,1060,'DESIGN OPEN STUDIO   /   12—14 JUN',22,'#222624',True)
        text(50,1110,'10:00—18:00 / EVERYONE WELCOME.',18,'#222624',True)
    elif n==4:
        text(50,45,'FRAMEHOUSE COMMUNITY SERIES',17,'#efba8b',True)
        for x,y,r in [(440,330,190),(220,620,140),(650,735,150)]:
            d.line((x,90,x,y),fill='#e98a51',width=2)
            d.ellipse((x-r,y-r,x+r,y+r),fill='#ed7742')
            for offset in [-.5,0,.5]:
                k=int(r*offset);d.arc((x-r//2+k//2,y-r,x+r//2+k//2,y+r),85,275,fill='#f9a05c',width=3)
        fitted('LANTERN',(50,930,800,85),'#f1cc9b');fitted('NIGHT',(50,1035,500,95),'#f1cc9b')
        text(620,1070,'21 SEPT',20,'#f1cc9b',True)
    elif n==5:
        for x,y,s in [(100,160,1.3),(470,370,.9),(130,600,.7)]:
            d.polygon([(x,y+100*s),(x+340*s,y),(x+150*s,y+190*s)],fill=CREAM)
            d.polygon([(x+150*s,y+190*s),(x+340*s,y),(x+245*s,y+255*s)],fill='#305473')
        text(48,35,'006 — A STUDY IN FLIGHT',17,'#244962',True)
        text(45,760,'PAPER BIRDS',70,'#244962');text(48,855,'SMALL FOLDS. ENDLESS POSSIBILITIES.',15,'#244962',True)
    elif n==6:
        ink='#a44930';text(50,40,'INDEPENDENT GOODS / EST. 2025',17,ink,True)
        d.ellipse((170,140,730,700),outline=ink,width=4);d.ellipse((185,155,715,685),outline=ink,width=2)
        text(285,220,'STAMP',68,ink);text(320,310,'&',200,ink);text(315,535,'SEAL',65,ink)
        text(150,760,'MADE TO LEAVE A MARK.',33,ink);text(50,850,'BRAND STUDY — 007',16,ink,True)
    elif n==7:
        text(50,45,'IDENTITY EXPLORATION / 008',17,'#c5dec3',True)
        for row in range(3):
            for col in range(3):
                x=50+col*270;y=170+row*245
                d.rounded_rectangle((x,y,x+235,y+210),radius=[100,15,65][(row+col)%3],fill='#c5dec3')
        text(45,895,'soft grid.',135,'#dce8c9');text(50,1120,'STRUCTURE, WITH A SOFTER SIDE.',18,'#c5dec3',True)
    else:
        ink='#242421';text(50,45,'FRAMEHOUSE / 009',18,ink,True)
        fitted('SAY',(45,170,640,230),ink);fitted('IT',(45,455,300,220),ink);fitted('PLAINLY.',(45,740,810,215),ink)
        text(620,390,'*',250,CREAM);text(50,1105,'LESS NOISE. MORE MEANING.',20,ink,True)
    for width in [600,1200]:
        out=im.resize((width,round(H*width/900)),Image.Resampling.LANCZOS)
        out.save(ROOT/f'{name}-{width}.webp',quality=90)
        out.save(ROOT/f'{name}-{width}.jpg',quality=91,optimize=True)
print('Exported 36 poster assets.')
