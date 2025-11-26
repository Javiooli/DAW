import pandas as pd
from pathlib import Path

import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

csv_path = Path("./vgsales.csv") # Definim la ruta de l'arxiu d'entrada
informe_path = Path("./informe_vendes.txt")  # Definim la ruta de l'arxiu de sortida

df = pd.read_csv(csv_path) #Llegim l'arxiu i generem el dataframe

# -------------------------------------------------------
# Canvia el nom de la columna Global_Sales a Total_Sales i mostra les primeres 5 files.
# -------------------------------------------------------
df.rename(columns={"Global_Sales": "Total_Sales"}, inplace=True)
cinc_primeres = df.head(5)
#print(cinc_primeres)

# -------------------------------------------------------
# Compta quants jocs hi ha per cada plataforma.
# -------------------------------------------------------
games_per_platform = pd.DataFrame(columns=["Platform", "Games"]) # Creem el dataframe on emmagatzemar
platforms = set(df["Platform"]) # Creem un set amb totes les plataformes

for platform in platforms: # Iterem per plataformes
    amount = len(df.loc[df['Platform'] == platform]) # Extraiem quants jocs hi ha per la plataforma

    new_row = pd.DataFrame({"Platform": [platform], "Games": amount}) # Creem la fila pel dataframe nou

    games_per_platform = pd.concat([games_per_platform, new_row], ignore_index=True) # Afegim la fila

    #print(f"Hi ha {amount} {"jocs" if amount > 1 else "joc"} per a la {platform}.") # Imprimim el resultat

# -------------------------------------------------------
# Compta quants jocs hi ha per gènere i ordena'ls de menor a major.
# -------------------------------------------------------
games_per_genre = pd.DataFrame(columns=["Genre", "Games"]) # Creem el dataframe on emmagatzemar
genres = set(df["Genre"]) # Creem un set amb tots els generes
vocals = ['A', 'E', 'I', 'O', 'U',]

for genre in genres: # Iterem per generes
    amount = len(df.loc[df['Genre'] == genre]) # Extraiem quants jocs hi ha pel genere

    new_row = pd.DataFrame({"Genre": [genre], "Games": amount}) # Creem la fila pel dataframe nou

    games_per_genre = pd.concat([games_per_genre, new_row], ignore_index=True) # Afegim la fila

    #print(f"Hi ha {amount} {"jocs" if amount > 1 else "joc"} {"d'" if genre[0] in vocals else "de "}{genre}.") # Imprimim el resultat

# -------------------------------------------------------
# Quants jocs es van llançar cada any?
# -------------------------------------------------------
games_per_year = pd.DataFrame(columns=["Year", "Games"]) # Creem el dataframe on emmagatzemar
years = set(df.dropna()["Year"]) # Creem un set amb tots els anys

for year in years: # Iterem per anys
    amount = len(df.loc[df['Year'] == year]) # Extraiem quants jocs hi ha per any

    new_row = pd.DataFrame({"Year": [year], "Games": amount}) # Creem la fila pel dataframe nou

    games_per_year = pd.concat([games_per_year, new_row], ignore_index=True) # Afegim la fila

    #print(f"De l'any {year} tenim {"enregistrats" if amount > 1 else "enregistrat"} {amount} {"jocs" if amount > 1 else "joc"}.") # Imprimim el resultat


# -------------------------------------------------------
# Mostra els 5 jocs més venuts a USA.
# -------------------------------------------------------
games_usa = df.sort_values(by='NA_Sales', ascending=False).head(5)
#print(f"Els 5 jocs més venuts als Estats Units són: {[x for x in games_usa['Name']]}")

# -------------------------------------------------------
# Quina plataforma ha venut més en total?
# -------------------------------------------------------
sales_per_platform = pd.DataFrame(columns=['Platform', 'Sales'])
for platform in platforms:
    new_row = pd.DataFrame({"Platform": [platform], "Sales": round(df.loc[df['Platform'] == platform]['Total_Sales'].sum(), 3)}) # Creem la fila pel dataframe nou
    sales_per_platform = pd.concat([sales_per_platform, new_row], ignore_index=True)

max_sales_platform = sales_per_platform.loc[sales_per_platform['Sales'].idxmax()]
#print(f"La plataforma que més ha venut és {max_sales_platform['Platform']} amb {max_sales_platform['Sales']}M de vendes.")

# -------------------------------------------------------
# Calcula la suma de vendes per cada regió (NA_Sales, EU_Sales, JP_Sales, Other_Sales).
# -------------------------------------------------------
suma_vendes_regio = df[["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"]].sum()
#print(suma_vendes_regio)

# -------------------------------------------------------
# Quin editor ha publicat més jocs i el nombre?
# -------------------------------------------------------
games_per_publisher = pd.DataFrame(columns=["Publisher", "Games"]) # Creem el dataframe on emmagatzemar
publishers = set(df["Publisher"]) # Creem un set amb tots els publishers

for publisher in publishers: # Iterem per plataformes
    amount = len(df.loc[df['Publisher'] == publisher]) # Extraiem quants jocs hi ha pel publisher

    new_row = pd.DataFrame({"Publisher": [publisher], "Games": amount}) # Creem la fila pel dataframe nou

    games_per_publisher = pd.concat([games_per_publisher, new_row], ignore_index=True) # Afegim la fila

    #print(f"Hi ha {amount} {"jocs publicats" if amount > 1 else "joc publicat"} per {publisher}.") # Imprimim el resultat

max_games_publisher = games_per_publisher.loc[games_per_publisher['Games'].idxmax()]
#print(f"El publisher {max_games_publisher['Publisher']} és qui més jocs ha publicat amb {max_games_publisher['Games']} jocs.")

# -------------------------------------------------------
# Filtra els jocs del gènere 'Action' i mostra el joc que ha venut més en l'àmbit global.
# -------------------------------------------------------
action_games = df.loc[df['Genre'] == 'Action']
max_sales_action_game = action_games.loc[action_games['Total_Sales'].idxmax()]
#print(max_sales_action_game)

# -------------------------------------------------------
# La mitjana de vendes globals en valor absolut
# -------------------------------------------------------
mitjana_vendes_globals = df['Total_Sales'].mean() * 1000000
#print(mitjana_vendes_globals)

# -------------------------------------------------------
# Generem l'informe
# -------------------------------------------------------
jocs_per_plataforma_str = "\n".join(
    f"{row['Platform']}: {int(row['Games'])}"
    for _, row in games_per_platform.sort_values(by='Games', ascending=False).iterrows()
)

genres_str = "\n".join(
    f"{row['Genre']}: {int(row['Games'])}"
    for _, row in games_per_genre.sort_values(by='Games').iterrows()
)

years_str = "\n".join(
    f"{int(row['Year'])}: {int(row['Games'])}"
    for _, row in games_per_year.sort_values(by='Year').iterrows()
)

top_usa_names = ", ".join(games_usa['Name'].astype(str).tolist())

top_platform_str = f"{max_sales_platform['Platform']} ({max_sales_platform['Sales']}M)"

sales_region_str = "\n".join(f"{k}: {v:.3f}M" for k, v in suma_vendes_regio.items())

top_publisher_str = f"{max_games_publisher['Publisher']} ({int(max_games_publisher['Games'])} games)"

top_action_game_str = f"{max_sales_action_game['Name']} - {max_sales_action_game['Total_Sales']}M"

mitjana_str = f"{mitjana_vendes_globals:,.0f}".replace(",", ".") + " unitats"

with open(informe_path, "w") as f:
    f.write(f"""
INFORME VENDES GLOBALS SEGONS BBDD:

--- JOCS PER PLATAFORMA ---
{jocs_per_plataforma_str}

--- JOCS PER GÉNERE ---
{genres_str}

--- JOCS PER ANY ---
{years_str}

--- 5 JOCS MÉS VENUTS A USA ---
{top_usa_names}

--- PLATAFORMA AMB MÉS VENDES TOTALS ---
{top_platform_str}

--- SUMA VENDES PER REGIÓ ---
{sales_region_str}

--- PUBLISHER AMB MÉS JOCS PUBLICATS ---
{top_publisher_str}

--- JOC D'ACCIÓ AMB MÉS VENDES GLOBALS ---
{top_action_game_str}

--- MITJANA VENDES GLOBALS (en unitats) ---
{mitjana_str}
""")