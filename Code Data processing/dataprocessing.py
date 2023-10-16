import csv
import pandas as pd

df = pd.read_csv("D:/Proyectos programación/Nova-risk/Databases/hygdatarisk.csv")

nombre_columna_antiguo = 'p_supernova'
nombre_columna_nuevo = 'pSupernova'

if nombre_columna_antiguo in df.columns:
    # Renombra la columna
    df.rename(columns={nombre_columna_antiguo: nombre_columna_nuevo}, inplace=True)

else :
    print(f"La columna '{nombre_columna_antiguo}' no existe en el archivo CSV.")


df.to_csv("D:/Proyectos programación/Nova-risk/Databases/hygdatarisk.csv", index=False)
