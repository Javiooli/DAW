# -*- coding: utf-8 -*-
# cc_pedragosa_lozano.py

# -------------------------------------------------------
# Crear un C/C que ha de tenir:
# 
# Propietats encapsulades:
# 
#     ID
#     Número de 10 xifres creades aleatòriament que serà el número de compte corrent. 
#     DNI: es pregunta a l'usuari.
#     Nom: es pregunta a l'usuari
#     Cognoms: es pregunta a l'usuari
#     Saldo inicial: es pregunta a l'usuari
# 
# Mètodes:
# 
#     Ingressar diners
#     Retirada d'efectiu
#     Veure Saldo
#     Veure les dades generals del compte amb el saldo
# -------------------------------------------------------

import random
import re

def frame_msg(string):
    max_length = max([len(s) for s in string.split('\n')])
    max_length += 3 - max_length % 3
    frame_border = f"|{'=' * max_length}|"

    framed_msg = f"{frame_border}\n"
    for line in string.split('\n'):
        tab_r = ' ' * ((max_length - len(line))//2 + 1)
        if max_length - len(line) % 2:
            tab_l = ' ' * ((max_length - len(line))//2 + 2)
        else:
            tab_l = tab_r
        framed_msg += f"|{tab_l}{line}{tab_r}|\n"

    return f"{framed_msg}\n{frame_border}"


    
class compte_corrent():
    def __init__(self):
        while True:
            self.__id = self.generate_id(10)
            self.__dni = self.ask_dni(True)
            self.__nom = self.ask_name()
            self.__cognoms = self.ask_surnames()
            self.__saldo = self.ask_balance(False)

            print(self)
    
    def __str__(self):
        return frame_msg(f"""INFORMACIÓ DEL COMPTE {self.__id}
PROPIETARI/A:   {self.__cognoms[0]}{' ' if self.__cognoms[1] else ''}{self.__cognoms[1]}, {self.__nom}
         DNI:   {self.__dni}
    
       SALDO:   {'{:.2f}'.format(self.__saldo).replace('.', ',')}€""")

    def generate_id(self, digits = 10):
        return ''.join([str(random.randint(0, 9)) for i in range(0, digits)])

    def ask_dni(self, validate = False):
        dni = input("Introdueix el teu DNI amb lletra (ex. 12345678Z):\n")

        if validate and not self.validate_dni(dni):
            return self.ask_dni(validate)

        print("DNI Vàlid")
        return dni.upper()

    def validate_dni(self, dni: str):
        LETTERS = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
        dni_regex = re.compile(r"^\d{8}[A-Za-z]$")
        
        if len(dni) < 9 or not dni_regex.match(dni):
            print("[INFO] El DNI entrat no és vàlid.")
            return False
        
        if dni[-1].upper() != LETTERS[int(dni[:-1]) % 23]:
            print("[INFO] El DNI entrat no és legal.")
            return False

        return True

    def ask_name(self):
        name = input("Introdueix el teu nom:\n")
        if len(name) < 2 or any(char.isdigit() for char in name):
            print("Nom invàlid.")
            return self.ask_name()
        
        return name.capitalize()
    
    def ask_surnames(self):
        surname_1 = input("Introdueix el teu primer cognom:\n")
        if len(surname_1) < 2:
            print("Cognom no vàlid.")
            return self.ask_surnames()
        
        surname_2 = input("Introdueix el teu segon cognom (o prem Intro si no en tens):\n")

        return [surname_1.capitalize(), surname_2.capitalize()]
    
    def ask_balance(self, allow_negative = True):
        balance = input("Introdueix el saldo inicial:\n")
        try:
            balance = float(balance.replace(',', '.'))
        except ValueError:
            print("Saldo invàlid.")
            return self.ask_balance(allow_negative)

        if not allow_negative and balance < 0:
            print("Saldo invàlid.")
            return self.ask_balance(allow_negative)
        
        return balance

def main():
    cc = compte_corrent()

if __name__ == "__main__":
    main()