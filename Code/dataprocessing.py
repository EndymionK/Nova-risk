import csv
import pandas as pd

df = pd.read_csv('C:/Proyectos programación/Nova-risk/Databases/hygdata_v35.csv')

# Definir una función hipotética para calcular la probabilidad de nova o supernova
def calcular_probabilidad_nova_supernova(row):
    tipo_espectral = row['spect']  # Tipo espectral
    
    # Verificar si el valor en la columna "spect" es una cadena de texto
    if isinstance(tipo_espectral, str):
        # Obtener la clase principal y la subclase del tipo espectral
        clase_principal = tipo_espectral[0]  # Primera letra (clase principal)
        
        # Verificar si hay un segundo carácter (subclase) y si es un dígito
        if len(tipo_espectral) > 1 and tipo_espectral[1].isdigit():
            subclase = int(tipo_espectral[1])
        else:
            subclase = 0  # Valor por defecto si no hay subclase o no es un dígito
    else:
        # Si no es una cadena de texto, asignar valores por defecto
        clase_principal = 'X'  # Valor por defecto para clase principal
        subclase = 0  # Valor por defecto para subclase
    
    # Hipotético cálculo de la probabilidad de nova o supernova (sin considerar magnitud absoluta)
    probabilidad = 0.1  # Valor inicial
    
    # Asignar un mayor valor de probabilidad a clases espectrales más masivas
    if clase_principal in ['O']:
        probabilidad += 15
    elif clase_principal in ['B']:
        probabilidad += 10
    elif clase_principal in ['A']:
        probabilidad += 5
    
    # Asignar un mayor valor de probabilidad a subclases más bajas
    probabilidad += subclase * 5  # Por ejemplo, aumentamos en 5 por cada unidad de subclase
    
    return probabilidad

# Aplicar la función para calcular la probabilidad a cada fila del DataFrame
df['probabilidad_nova_supernova'] = df.apply(calcular_probabilidad_nova_supernova, axis=1)

# Guardar el DataFrame modificado de nuevo en un archivo CSV
df.to_csv('hygdatarisk.csv', index=False)


# Abre el archivo CSV en modo lectura
"""with open('C:/Proyectos programación/Nova-risk/Databases/hygdata_v35.csv', mode='r') as archivo_csv:
    # Crea un lector CSV
    lector_csv = csv.reader(archivo_csv)
    
    # Lee la primera fila que contiene los encabezados
    encabezados = next(lector_csv)
    
    # Imprime los encabezados
    print(encabezados)"""

def analizar_columna_csv(nombre_archivo, nombre_columna):
    try:
        # Carga el archivo CSV en un DataFrame de pandas
        df = pd.read_csv(nombre_archivo)

        # Muestra los primeros 10 elementos de la columna
        print("Primeros 10 elementos de la columna:")
        print(df[nombre_columna].head(15))

        # Verifica si hay espacios vacíos en la columna
        espacios_vacios = df[nombre_columna].isnull().sum()
        print(f"Número de espacios vacíos en la columna: {espacios_vacios}")
    
    except FileNotFoundError:
        print(f"El archivo '{nombre_archivo}' no se encontró.")
    except KeyError:
        print(f"La columna '{nombre_columna}' no existe en el archivo CSV.")

# Llama a la función y proporciona el nombre del archivo CSV y el nombre de la columna
nombre_archivo = 'C:/Proyectos programación/Nova-risk/Databases/hygdatarisk.csv'
nombre_columna = 'spect'
analizar_columna_csv(nombre_archivo, nombre_columna)