from bs4 import BeautifulSoup
import requests
import re
import renaming_pics

URL=["http://vonatosszeallitas.hu/jarmuvek_mav_mozdonyok.html","http://vonatosszeallitas.hu/jarmuvek_mav_motorvonatok.html",
"http://vonatosszeallitas.hu/jarmuvek_mav_nosztalgia.html"]

def main():
    for origin in URL:
        raw=requests.get(origin)
        soup=BeautifulSoup(raw.text,'html.parser')
        images=soup.find_all('img')
        urls=[img['src'] for img in images]
        for url in urls:
            filename = re.search(r'/([\w_-]+[.](jpg|gif|png))$', url)
            if not filename:
                continue
            with open("images/"+filename.group(1), 'wb') as f:
                if 'http' not in url:
                    url = '{}{}'.format('http://vonatosszeallitas.hu/', url)
                response = requests.get(url)
                f.write(response.content)
    print("Download complete!")
    renaming_pics.rename_pics()
    print("Renamed for convention!")

if __name__ == '__main__':
    main()
    