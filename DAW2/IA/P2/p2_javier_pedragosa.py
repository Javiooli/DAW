# -*- coding: utf-8 -*-
# p2_javier_pedragosa.py

# -------------------------------------------------------
# Aquest script consulta la API de Rick & Morty per consultar
# les dades que se'ns demana en l'enunciat.
# -------------------------------------------------------
import requests
import os
from ast import literal_eval

import pandas as pd

# -------------------------------------------------------
# Constants/flags
# -------------------------------------------------------
API_URL = "https://rickandmortyapi.com/api/"
CHARS_ENDPOINT = "character"
PAGE_QUERY = "/?page="
CHARS_TO_CHECK = ['Mel Gibson', 'Johnny Depp', 'Pickle Rick', 'Birdperson', 'Squanchy', 'Mr. Meeseeks']
CHARS_TO_DL_IMG = ['Mel Gibson', 'Johnny Depp', 'Pickle Rick']

DEBUG = False # Flag

# -------------------------------------------------------
# Writes csv file from dataframe thanks to pandas's to_csv() function.
# -------------------------------------------------------
def write_csv_file(df, output_file):
    print(f"Escrivint fitxer {output_file}.")
    df.to_csv(output_file)
    if os.path.exists(output_file):
        print(f"Fitxer {output_file} creat exitosament.")

# -------------------------------------------------------
# Reads the api at the given endpoint and returns a dataframe
# with the data retrieved.
# -------------------------------------------------------
def read_api(endpoint):
    print(f"Consultant {endpoint}...")
    response = requests.get(endpoint)
    if response.ok:
        data = response.json()
        items = data['results']
        pages = data['info']['pages']
        df = pd.DataFrame(items)
        
        for i in range(2, pages + 1):
            response = requests.get(endpoint + PAGE_QUERY + str(i))
            if response.ok:
                data = response.json()
                items = data['results']
                df = pd.concat([df, pd.DataFrame(items)], ignore_index=True)

    df = df[['id', 'name', 'status', 'species', 'gender', 'episode', 'image']]
    df.set_index("id", inplace=True)
    return df

# -------------------------------------------------------
# Checks character appearances and returns them + downloads
# images for those in CHARS_TO_DL_IMG
# -------------------------------------------------------
def check_character(name, df):
    entry = df[df['name'] == name]
    if entry.empty: 
        return False

    raw_links = entry['episode'].apply(literal_eval)
    flat_links = [ep for sublist in raw_links for ep in sublist]
    episode_links = list(dict.fromkeys(flat_links))

    episodes = []
    for episode_url in episode_links:
        if DEBUG: print(f"Consultant {episode_url}...")
        response = requests.get(episode_url)
        if response.ok:
            data = response.json()
            episodes.append(data['episode'])

    if name in CHARS_TO_DL_IMG:
        response = requests.get(API_URL + CHARS_ENDPOINT + f"/{entry.index[0]}")
        if response.ok:
            data = response.json()
            image_url = data['image']
        else:
            print('Error rebent la imatge de', name)
            return episodes

        response = requests.get(image_url)
        if response.ok:
            file_name = f"{name.replace(' ', '_')}.png"
            with open(file_name, 'wb') as file:
                file.write(response.content)
                if DEBUG: print(f"Imatge de {name} descarregada.")
        else:
            print('Error rebent la imatge de', name)

    return episodes

def main():
    if not os.path.exists("characters.csv"):
        chars_url = API_URL + CHARS_ENDPOINT
        chars_df = read_api(chars_url)
        print(f"Registrats {chars_df[chars_df.columns[0]].count()} personatges.")
        write_csv_file(chars_df, "characters.csv")
    
    chars_df = pd.read_csv("characters.csv")
    chars_df = chars_df.set_index("id")
    print(f"Llegits {chars_df[chars_df.columns[0]].count()} personatges.")

    for character in CHARS_TO_CHECK:
        aparicions = check_character(character, chars_df)
        if not aparicions:
            print(f"- {character} no apareix a Rick & Morty.")
            continue
        print(f"- {character} apareix a {len(aparicions)} episodi{'s' if len(aparicions) > 1 else ''}.")

if __name__ == "__main__":
    main()