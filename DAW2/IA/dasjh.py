#!/usr/bin/env python3
"""
Simulador segur: "Obrir la Caixa Forta" (propòsit didàctic).

Especificacions resumides (segons l'exercici, adaptat com a joc inofensiu):
- Hi ha un nombre secret enter entre 1 i 99.
- El nombre "canvia cada dia": el joc genera un nombre depenent del dia actual.
- L'usuari té 5 intents per endevinar el nombre.
- Després de cada intent, el facilitador indica si estàs:
    - "Més a prop" (la distància absoluta al secret ha disminuït respecte l'intent anterior),
    - "Més lluny" (ha augmentat),
    - "Igual" (mateixa distància),
    - o "Encertat!" si coincideix.
- A la cinquena oportunitat (si falles) apareix: "Error. Salta Alarma" i es mostren totes les combinacions/inputs intentats.
- Abans de començar, el facilitador demana un àlies; aquest àlies s'inclou a cada resposta.
- Tot codi ha de ser funcional i robust davant entrades no vàlides.
- Implementació: joc CLI per practicar lògica (NO per l'ús en activitats il·legals).

"""

import random
from datetime import date

def generar_nombre_del_dia(seed_extra: int = 0) -> int:
    """
    Genera el nombre secret del dia.
    Perquè el nombre "canviï cada dia" i sigui repetible durant el dia, es realitza:
      - seed = date.today().toordinal() [+ opcional seed_extra]
      - random.seed(seed)
      - random.randint(1, 99)
    Això fa que el nombre sigui el mateix per a tot aquell dia, però diferent l'endemà.
    """
    avui = date.today()
    seed = avui.toordinal() + int(seed_extra)
    random.seed(seed)
    return random.randint(1, 99)  # inclòs 1 i 99

def solicitar_int_entre(prompt: str, min_v: int, max_v: int) -> int:
    """Llegeix un enter, repeteix si l'entrada no és vàlida o fora de rang."""
    while True:
        text = input(prompt).strip()
        try:
            val = int(text)
            if val < min_v or val > max_v:
                print(f"Valor fora de rang. Introdueix un nombre entre {min_v} i {max_v}.")
                continue
            return val
        except ValueError:
            print("Entrada no vàlida. Introdueix un nombre enter.")

def joc_caixa_forta():
    print("=== Simulador: Obre la Caixa Forta (versió didàctica) ===")
    alias = input("Introdueix el teu àlies: ").strip() or "Anònim"
    print(f"Hola, {alias}. Tens 5 intents per endevinar el nombre del dia (1-99). Bona sort!\n")

    secret = generar_nombre_del_dia()
    max_intents = 5
    intents_realitzats = []
    distancia_anterior = None

    for intent_num in range(1, max_intents + 1):
        prompt = f"[{alias}] Intent {intent_num}/{max_intents} — Introdueix un nombre (1-99): "
        guess = solicitar_int_entre(prompt, 1, 99)
        intents_realitzats.append(guess)

        if guess == secret:
            print(f"\n[{alias}] Encertat! El nombre era {secret}. Has guanyat en {intent_num} intents.")
            print("Intents realitzats:", intents_realitzats)
            return  # fi del joc amb èxit

        # càlcul distància i retroalimentació "més a prop / més lluny / igual"
        distancia_actual = abs(secret - guess)
        if distancia_anterior is None:
            # primer intent: només informem de la distància numèrica relativa (opcional)
            print(f"[{alias}] No és correcte. Estàs a una distància de {distancia_actual}.")
        else:
            if distancia_actual < distancia_anterior:
                print(f"[{alias}] Més a prop.")
            elif distancia_actual > distancia_anterior:
                print(f"[{alias}] Més lluny.")
            else:
                print(f"[{alias}] Igual.")

        distancia_anterior = distancia_actual

        # Si era l'últim intent i no ha encertat:
        if intent_num == max_intents:
            print("\nError. Salta Alarma")
            print(f"[{alias}] Has esgotat els {max_intents} intents. Nombre secret: {secret}")
            print("Combinacions/intents que has provat (en ordre):")
            for i, val in enumerate(intents_realitzats, start=1):
                print(f"  {i}. {val}")
            return

        # separador entre intents
        print("-" * 40)

if __name__ == "__main__":
    joc_caixa_forta()
