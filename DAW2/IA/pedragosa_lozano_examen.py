# -*- coding: utf-8 -*-
# caixa_forta_pedragosa_lozano.py

# -------------------------------------------------------
# Programa que genera un número de l'1 al 99 i després dona
# 5 oportunitats a l'usuari d'endevinar-lo, donant una valoració
# sobre la proximitat de la resposta donada
# -------------------------------------------------------
import random
import sys

'''Funció auxiliar per rebre i validar l'àlies'''
def ask_alias():
    alias = input("Introdueix el teu àlies:\n")
    if alias == '':
        print("Sense nom no arribaràs enlloc.")
        return ask_alias()
    return alias

'''Funció auxiliar per netejar la consola'''
def clear_console():
    print(f"{'\n' * 100}")

'''Bucle principal'''
def main():
    debug = False # Flag per imprimir la resposta a l'inici del joc
    if len(sys.argv) > 1:
        if sys.argv[-1] == '-debug':
            debug = True

    # -------------------------------------------------------
    # Generem la combinació amb la funció randint de la
    # llibreria random, que retorna un número aleatori entre
    # els dos valors enters que li enviem per paràmetre,
    # ambdós inclosos. En aquest cas, ens genera un número
    # entre el 0 i el 99, tal com demana l'enunciat
    # -------------------------------------------------------
    combination = random.randint(0, 99)

    alias = ask_alias()                     # Demanem l'alies

    guesses = list()                        # Generem la llista d'intents

    distance = 99                           # Inicialitzem la variable de distancia entre l'ultim intent i la resposta
    
    last_distance, min_distance = 200, 200  # Inicialitzem la variable d'ultima distancia per poder comparar
                                            # si s'està més a prop o més lluny de la resposta, i la de distancia minima
                                            # per notificar-la a l'usuari si perd.

    # Diccionari de missatges segons la distància entre l'intent i la resposta
    dist_msgs = {0: "Estàs molt a prop de la combinació",
                 1: "Estàs bastant a prop de la combinació",
                 2: "No estàs ni molt a prop ni molt lluny de la combinació",
                 3: "Estàs bastant lluny de la combinació",
                 4: "Estàs molt lluny de la combinació"}
    
    clear_console()
    print(f"Salutacions, {alias}. Anem a fer-nos rics!")

    if debug: print("La resposta és", combination)

    while len(guesses) < 5: # Repetirem el bucle mentre hi hagi menys de 5 intents
        print(f"            === Intent {len(guesses) + 1} ===") # Notifiquem el número d'intent

        try:
            guess = int(input("Introdueix la combinació de la caixa forta:\n")) # Recollim l'entrada de l'usuari
            clear_console()
        # Amb aquest try except validem que pugui ser convertida a un enter
        except ValueError:
            clear_console()
            print("-- Has d'introduïr un número. --")
            continue # Notifiquem que el valor no és vàlid i reiniciem el bucle

        # Validem que estigui entre 0 i 99
        if guess < 0 or guess > 99:
            print("-- La resposta està entre 0 i 99. --")
            continue # Notifiquem que el valor no és vàlid i reiniciem el bucle

        # Per fer-ho més fàcil, verifiquem que no s'hagi intentat aquest valor anteriorment.
        if guess in guesses:
            print("-- Ja hem provat aquest valor. Desperta! --")
            continue # Notifiquem que el valor ja s'ha provat i reiniciem el bucle

        guesses.append(guess) # Després de les validacions, afegim l'intent a la llista d'intents
        
        # Comprovem si l'intent és correcte i finalitzem el programa en aquest cas.
        if guess == combination:
            print(f'Has trobat la combinació, {alias}! Serem rics!')
            break

        # Calculem la distancia entre l'intent i la resposta
        distance = abs(guess - combination)

        # Si es compleix aixo, es el primer intent, no hi ha respostes anteriors amb les que comparar
        if last_distance == 200:
            last_distance = distance
            min_distance = distance
            print(f"== {dist_msgs[distance//10] if distance//10 in dist_msgs.keys() else dist_msgs[4]} ==")
            continue
        
        # Segons la distancia, imprimim el missatge sobre si és major o menor que la distància anterior.
        if distance == last_distance:
            print(f"{alias}, estàs a la mateixa distància de la resposta que abans!")
        elif distance > last_distance:
            print(f"{alias}, t'allunyes de la resposta...")
        else:
            print(f"{alias}, estàs més a prop!")

        # Si ens hem apropat més que mai, enregistrem la distància mínima
        if distance < min_distance:
            min_distance = distance

        # Actualitzem last_distance pel següent intent
        last_distance = distance
        
        # Imprimim els missatges sobre la distància absoluta, segons múltiples de 10.
        print(f"== {dist_msgs[distance//10] if distance//10 in dist_msgs.keys() else dist_msgs[4]} ==")

    if combination not in guesses:
        clear_console()
        print(f"""Quina pena, {alias}, sembla que avui no era el nostre dia...
Les combinacions que hem provat són:
1. {guesses[0]}
2. {guesses[1]}
3. {guesses[2]}
4. {guesses[3]}
5. {guesses[4]}  
------------------------------------------
Sembla ser que la resposta era {combination}!
Hem estat a {"només " if min_distance < 10 else ''}{min_distance} número{'s' if min_distance > 1 else ''} de distància!""")





    
if __name__ == "__main__":
    main()