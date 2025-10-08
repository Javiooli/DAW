# -*- coding: utf-8 -*-
# pedragosa_tuples.py

# -------------------------------------------------------
# 1) Què és una tupla?
# Una tupla és una estructura de dades nativa de Python
# que serveix per emmagatzemar un conjunt d'elements ordenats
# i immutables, és a dir, que no es poden afegir, eliminar ni
# modificar els seus elements un cop s'ha creat.
# -------------------------------------------------------

# Exemple:
tupla1 = (1, 2, 3, 4)
print(f"Tupla1: {tupla1}")

# També es pot crear amb la classe tuple():
tupla2 = tuple([5, 6, 7, 8])
print(f"Tupla2: {tupla2}")

# -------------------------------------------------------
# 2) Què fan?
# Les tuples serveixen per emmagatzemar informació que no
# ha de canviar, com per exemple unes coordenades o una
# data fixa.
# -------------------------------------------------------

coordenades = (41.3851, 2.1734) # Latitud i longitud de Barcelona
print(f"Coordenades BCN: {coordenades}")

# -------------------------------------------------------
# 3) Per a què serveixen?
# Són útils per representar conjunts de dades fixes, constants,
# o que no necessitem modificar. També són útils com a claus de
# diccionaris, i s'utilitzen sovint com a tal en intel·ligència
# artificial https://stackoverflow.com/a/47368454/30842109.
# -------------------------------------------------------

com_autonoma = "Catalunya"
ciutat = "Barcelona"
habitants = {("Catalunya", "Barcelona"): 1686208}
print(f"{ciutat}, ubicada a {com_autonoma}, té {habitants[(com_autonoma, ciutat)]} habitants.")

# -------------------------------------------------------
# 4) Diferència amb les llistes:
# - Les llistes són mutables, és a dir, podem canviar els seus valors
# - Les tuples són immutables, és a dir, no es poden modificar.
# - Les llistes es defineixen amb [] i les tuples amb ().
# -------------------------------------------------------

llista = [1, 2, 3]
tupla = (1, 2, 3)
# llista[0] = 4 és correcte
# tupla[0] = 4 dona error.

# -------------------------------------------------------
# 5) Ús de mètodes (3 exemples)
# -------------------------------------------------------

# 1. count() -> compta quantes vegades apareix un valor
tupla = (1, 2, 2, 3, 2)
print("El número 2 apareix:", tupla.count(2), "vegades")

# 2. index() -> retorna la posició de la primera aparició
print("Posició del número 3:", tupla.index(3))

# 3. len() -> retorna la llargada
print("Longitud de la tupla:", len(tupla))

# -------------------------------------------------------
# Reflexió:
# Les tuples són útils quan volem garantir que la informació
# no canviarà, com coordenades, colors RGB, o claus constants.
# -------------------------------------------------------