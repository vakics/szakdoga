from bs4 import BeautifulSoup
import requests
import re
import renaming_pics
import shutil
import os

URL=["http://vonatosszeallitas.hu/jarmuvek_mav_mozdonyok.html","http://vonatosszeallitas.hu/jarmuvek_mav_motorvonatok.html",
"http://vonatosszeallitas.hu/jarmuvek_mav_nosztalgia.html"]

def main():
    try:
        os.mkdir("trains/")
    except (FileExistsError):
        print("Directory already exists!")
    for origin in URL:
        raw=requests.get(origin)
        soup=BeautifulSoup(raw.text,'html.parser')
        images=soup.find_all('img')
        urls=[img['src'] for img in images]
        for url in urls:
            filename = re.search(r'/([\w_-]+[.](jpg|gif|png))$', url)
            if not filename:
                continue
            with open("trains/"+filename.group(1), 'wb') as f:
                if 'http' not in url:
                    url = '{}{}'.format('http://vonatosszeallitas.hu/', url)
                response = requests.get(url)
                f.write(response.content)
    print("Download complete!")
    try:
        renaming_pics.rename_pics()
        print("Renamed for convention!")
    except(FileExistsError):
        shutil.rmtree("trains/")
        print("Something gone wrong, try again!")
    try:
        shutil.move("trains/", "../train-frontend/src/images/")
        print("Moved to frontend images!")
    except(FileNotFoundError):
        print("Something gone wrong, try again!")
    except:
        shutil.rmtree("trains/")
        print("Everything in place already!")

if __name__ == '__main__':
    main()
    