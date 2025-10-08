# -*- coding: utf-8 -*-
# pedragosa_sets.py

# -------------------------------------------------------
# 1) Què és una set?
# Un set és una estructura de dades nativa de Python que
# serveix per emmagatzemar un conjunt d'elements no ordenats
# i únics, és a dir, que no permet elements duplicats.
# -------------------------------------------------------

# Exemple:
fruites = {"poma", "plàtan", "taronja"}
print("Set de fruites:", fruites)

# També es pot crear amb la classe set():
numeros = set([1, 2, 3, 3, 4, 4])
print("Set de números (sense duplicats):", numeros)


# -------------------------------------------------------
# 2) Què fan?
# Els sets serveixen per emmagatzemar llistes d'elements desordenats
# però sense duplicar valors, així com per treballar amb conjunts matemàtics
# -------------------------------------------------------

A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print("Unió:", A | B)
print("Intersecció:", A & B)
print("Diferència:", A - B)


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