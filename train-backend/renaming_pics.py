import os

path="trains/"
train_pics={"434":["BVmot_04_34_balra","Amxz_10_76","Bmxz_21_76","Bmxtz_80_76"],"414":["BDVmot_04_14_balra","Bmx_22_05"],
"415":["BVpmot_04_15_kek"],"425":["BVbdpmot_04_25"],"416":["Bpmot_04_16"],"136":["Bzmot_01_36"],"127":["Bzmot_01_27_interpici","Bzmot_01_27_interpici_uj"],
"117":["Bzmot_01_17"]}

def rename_pics():
    for pic in train_pics:
        titles=train_pics.get(pic)
        if len(titles)==4:
            os.rename(path+titles[0]+".png", path+pic+"_balra.png")
            os.rename(path+titles[1]+".png", path+pic+"_kozep_1.png")
            os.rename(path+titles[2]+".png", path+pic+"_kozep_2.png")
            os.rename(path+titles[3]+".png", path+pic+"_jobbra.png")
        elif len(titles)==3:
            os.rename(path+titles[0]+".png", path+pic+"_balra.png")
            os.rename(path+titles[1]+".png", path+pic+"_kozep.png")
            os.rename(path+titles[2]+".png", path+pic+"_jobbra.png")
        elif len(titles)==2:
            os.rename(path+titles[0]+".png", path+pic+"_balra.png")
            os.rename(path+titles[1]+".png", path+pic+"_jobbra.png")
        else:
            os.rename(path+titles[0]+".png", path+pic+".png")

def main():
    rename_pics()

if __name__ == '__main__':
    main()
    