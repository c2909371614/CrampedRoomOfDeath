#coding = utf-8
import json
import os
import pandas as pd
import inspect
import localEnv

def dealDataFrameToDict(data:pd.DataFrame):
    data_sub =  data.iloc[:,1:]
    dic_arr = {}
    row, conlum = data_sub.shape
    keys = data_sub.iloc[0, :]
    for i in range(1, row):
        dic = {}
        for j in range(1, conlum):
            dic[keys[j]] = data_sub.iloc[i, j]
            dic_arr[data_sub.iloc[i, 0]] = dic
    # dic = data_sub.to_dict(orient='records')
    return dic_arr


def ExcelToJson():
    # dir_path = os.path.dirname(os.path.abspath(__file__))#当前目录
    # dir_path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))#当前目录
    dir_path = localEnv.dir_path
    print("excel目录:",dir_path)
    file_names = os.listdir(dir_path)
    all_data = pd.DataFrame()
    path = os.path.abspath("../../assets/resources/json")
    print("json目录:", path)
    if(not os.path.exists(path)):
        os.makedirs(path)
    for file_name in file_names:
        if file_name.endswith('.xlsx'):
            file_path = os.path.join(dir_path, file_name)
            data = pd.read_excel(file_path)
            data_dict = dealDataFrameToDict(data)
            # data_dict = data.to_dict(orient='records')
            
            print("file_name:" + file_name)
            jsonFileName = path + "/" + file_name.split(".")[0] + ".json"
            # print(jsonFileName)
            with open(jsonFileName, "w", encoding='utf-8') as file:
                json_str = json.dump(data_dict, file, ensure_ascii=False)
    os.system("pause")
print(__name__)
if __name__ == '__main__':
    print("运行")
    ExcelToJson()

