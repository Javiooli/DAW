# -*- coding: utf-8 -*-
# dicts.py


def main():
    # -------------------------------------------------------
    # Exemples de diccionaris
    # -------------------------------------------------------
    dies = {2: "dimarts", 1: "dilluns", 3: "dimecres"} # Primitiu

    jugadors = dict([("Barcelona", ["No", "em", "se", "cap"]),
                     ("Madrid", ["D'aquest", "equip", "tampoc"])]) # Per classe


    # -------------------------------------------------------
    # Crida de diccionaris per clau
    # -------------------------------------------------------
    print(dies[2])
    dies[4] = "dijous"
    print(dies)

    print(jugadors["Madrid"][1])


    # -------------------------------------------------------
    # Saber dades dels diccionaris
    # -------------------------------------------------------
    print(dies.keys())   # Claus
    print(dies.values()) # Valors
    print(dies.items())  # Tuples clau, valor


    # -------------------------------------------------------
    # Afegir nous elements als diccionaris
    # -------------------------------------------------------
    dies[5] = "divendres" # Assignació indexada
    dies.setdefault(5, "Divendres") # Assignació només si aquesta parella clau-valor no existeix
    dies.update({6: "dissabte"}) # Assignació a través de mapping amb un mètode
    dies = dict(sorted(dies.items())) # 

    numeros_del_uno_al_mil = {i, j for i, j in range(1000)}
    print(numeros_del_uno_al_mil)

    print(dies)


if __name__ == "__main__":
    main()