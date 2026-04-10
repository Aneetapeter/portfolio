import zipfile
import xml.etree.ElementTree as ET

path = r'C:/Users/ANEETA PETER/Documents/work/profolio/Aneeta Peter.docx'
z = zipfile.ZipFile(path)
content = z.read('word/document.xml')
root = ET.fromstring(content)

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def get_para_text(para):
    texts = []
    for elem in para.iter('{%s}t' % W):
        if elem.text:
            texts.append(elem.text)
    return ''.join(texts)

# Get ALL paragraphs including those inside tables
all_paras = root.findall('.//{%s}p' % W)
for para in all_paras:
    txt = get_para_text(para)
    if txt.strip():
        print(repr(txt))
