import csv
import pandas as pd

df = pd.read_csv('C:/Proyectos programación/Nova-risk/Databases/hygdata_v35.csv')

# Definir una función para calcular la probabilidad de nova o supernova
def calcular_probabilidad_nova_supernova(row):
    magnitud_absoluta = row['absmag']  # Magnitud absoluta
    tipo_espectral = row['spect']  # Tipo espectral
    velocidad_radial = row['rv']  # Velocidad radial
    luminosidad = row['lum']  # Luminosidad
    
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
    
    # Calcular la probabilidad hipotética de nova o supernova

    pesos_clase = {'0': 0.5, 'B': 0.4, 'A': 0.3, 'F': 0.2, 'G': 0.1, 'K': 0.05, 'M': 0.005, 'X': 0.0}
    epsilon = 1e-6  # Valor muy pequeño para evitar división entre cero

    probabilidad_nova_supernova = (
        (subclase * 0.2) +  # Contribución de la subclase
        ((1 / (magnitud_absoluta + epsilon)) * 0.2) +  # Contribución de la magnitud absoluta
        (velocidad_radial * 0.05) +  # Contribución de la velocidad radial
        (luminosidad * 0.1) +  # Contribución de la luminosidad
        (pesos_clase.get(clase_principal, 0) * 0.3)  # Contribución de la clase principal
    )
    
    # Escalar la probabilidad a un valor entre 1 y 100
    probabilidad_nova_supernova = min(100, probabilidad_nova_supernova)
    
    return probabilidad_nova_supernova

# Aplicar la función para calcular la probabilidad a cada fila del DataFrame
df['p_supernova'] = df.apply(calcular_probabilidad_nova_supernova, axis=1)

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

        print(df[nombre_columna].head(25))

        # Verifica si hay espacios vacíos en la columna
        espacios_vacios = df[nombre_columna].isnull().sum()
        print(f"Número de espacios vacíos en la columna: {espacios_vacios}")
    
    except FileNotFoundError:
        print(f"El archivo '{nombre_archivo}' no se encontró.")
    except KeyError:
        print(f"La columna '{nombre_columna}' no existe en el archivo CSV.")

# Llama a la función y proporciona el nombre del archivo CSV y el nombre de la columna
nombre_archivo = 'C:/Proyectos programación/Nova-risk/Databases/hygdatarisk.csv'
nombre_columna = 'p_supernova'
analizar_columna_csv(nombre_archivo, nombre_columna)

