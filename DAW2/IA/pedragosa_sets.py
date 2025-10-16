# -*- coding: utf-8 -*-
# pedragosa_sets.py

# -------------------------------------------------------
# 1) Què és un set?
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
# Són útils per eliminar duplicats d’una llista o per comprovar
# si un element existeix de forma ràpida.
# -------------------------------------------------------

llista = [1, 2, 2, 3, 3, 3, 4]
sense_duplicats = set(llista)
print("Llista sense duplicats:", sense_duplicats)


# -------------------------------------------------------
# 4) Diferència amb les llistes:
# - Les llistes mantenen l’ordre, els sets no.
# - Les llistes poden tenir duplicats, els sets no.
# - Els sets són més ràpids per comprovar si un element hi és.
# -------------------------------------------------------

# Les llistes mantenen l'ordre, per tant, sabem que ruta[0] és Esparreguera, i ruta[3] és Olesa de Montserrat
ruta = ["Esparreguera", "Collbató", "Monistrol de Montserrat", "Olesa de Montserrat", "Abrera"]
print(f"Sortida: {ruta[0]}. Parada per dinar: {ruta[3]}.")

# Com que els sets no mantenen l'ordre, no hi ha manera d'endevinar quin element estara a cada posició.
destins = {"Esparreguera", "Collbató", "Monistrol de Montserrat", "Olesa de Montserrat", "Abrera"}
print(f"Algun dels destins son: {list(destins)[0]}, {list(destins)[1]} i {list(destins)[2]}")


# -------------------------------------------------------
# 5) Ús de mètodes (3 exemples)
# -------------------------------------------------------

# 1. add() → afegeix un element
fruites.add("maduixa")
print("Després d'afegir maduixa:", fruites)

# 2. remove() → elimina un element (error si no existeix)
fruites.remove("plàtan")
print("Després d'eliminar plàtan:", fruites)

# 3. union() → combina dos conjunts
fruites2 = {"kiwi", "poma"}
unio = fruites.union(fruites2)
print("Unió de fruites:", unio)


# -------------------------------------------------------
# Càsting entre tipus
# -------------------------------------------------------

# set -> llista
llista_de_set = list(fruites)
print("Set convertit a llista:", llista_de_set)

# llista -> set
set_de_llista = set(llista)
print("Llista convertida a set:", set_de_llista)

# set -> tupla
tupla_de_set = tuple(fruites)
print("Set convertit a tupla:", tupla_de_set)


# -------------------------------------------------------
# Reflexió:
# Crec que els sets són molt útils per eliminar duplicats,
# per fer operacions matemàtiques de conjunts o per comprovar
# si un element està dins d’un conjunt de manera eficient.
# -------------------------------------------------------
