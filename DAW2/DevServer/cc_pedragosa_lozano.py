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
import time

'''Utility functions'''
# Prints 50 clear lines to clear console
def clear_console():
    print('\n' * 50)

# Frames any given string within vertical and horizontal borders
def frame_msg(string, padding = 1, border_char = '|'):
    # Convert message to list of lines (in case it has \n)
    lines = string.split("\n")

    # Find the longest line to determine width
    max_length = max(len(line) for line in lines)
    frame_border = f"{border_char}{'=' * (max_length + 2 + padding)}{border_char}"

    # Print top border
    framed_msg = f"{frame_border}\n"

    # Print message lines, centered within padding
    for line in lines:
        framed_msg += f"{border_char}{' ' * padding}{line.ljust(max_length)}{' ' * padding}{border_char}\n"

    return f"{framed_msg}{frame_border}"

# Clears console, prints error, waits 3s, clears again
def print_error(error_msg):
    clear_console()
    print(frame_msg(error_msg))
    time.sleep(2)
    clear_console
    
''' Main class, which comprises a whole, functional mockup of a bank account app.
    Constructor calls input methods which define all the properties, then calls
    iniciar_programa() which would make the main app loop. '''
class compte_corrent():
    def __init__(self):
        self.__id = self.generate_id(10) # Generate a 10 char long id
        self.__dni = self.ask_dni(True)  # Ask for legal, validated Spanish DNI
        self.__nom = self.ask_name()     # Ask name
        self.__cognoms = self.ask_surnames() # Ask surnames
        self.__saldo = self.ask_amount("Introdueix el saldo inicial:\n", True) # Ask initial balance

        self.__opcions_menu = {1: ["Ingressar efectiu", self.deposit], # Initiate main menu options
                                2: ["Retirar Efectiu", self.withdraw],
                                3: ["Veure saldo", self.check_amount],
                                4: ["Veure detall del compte", self.print_self],
                                0: ["Sortir"]}
        self.__menu_str = "· · · MENÚ PRINCIPAL · · ·" # Main menu header which will later be the whole menu string,
                                                       # with options, frame and all.
        self.generar_menu() # Generate whole __menu_str
        self.iniciar_programa() # Call main loop
    
    ''' Overwrite __str__ to give all the details about the bank acount, framed using frame_msg(). '''
    def __str__(self):
        return frame_msg(f"""      INFORMACIÓ DEL COMPTE {self.__id}
                         
PROPIETARI/A:   {self.__cognoms[0]}{' ' if self.__cognoms[1] else ''}{self.__cognoms[1]}, {self.__nom}
         DNI:   {self.__dni}
    
       SALDO:   {'{:.2f}'.format(self.__saldo).replace('.', ',')}€

    PREM INTRO PER TORNAR AL MENÚ PRINCIPAL""")

    ''' Simple random number generator which returns x random numbers
        joined in a string, where x is the digits parameter '''
    def generate_id(self, digits = 10) -> str:
        return ''.join([str(random.randint(0, 9)) for i in range(0, digits)])

    ''' Input method which asks the user for their DNI, and if validate is True validates that
        the given DNI is legal. Recursive. '''
    def ask_dni(self, validate = False) -> str:
        dni = input("Introdueix el teu DNI amb lletra (ex. 12345678Z):\n")

        if validate and not self.validate_dni(dni):
            return self.ask_dni(validate)

        print("DNI Vàlid")
        return dni.upper()

    ''' Validates that the DNI letter correspond to the number. '''
    def validate_dni(self, dni: str) -> bool:
        LETTERS = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
        dni_regex = re.compile(r"^\d{8}[A-Za-z]$")
        
        if len(dni) < 9 or not dni_regex.match(dni):
            print("[INFO] El DNI entrat no és vàlid.")
            return False
        
        if dni[-1].upper() != LETTERS[int(dni[:-1]) % 23]:
            print("[INFO] El DNI entrat no és legal.")
            return False

        return True

    ''' Asks for a name and validates that is a valid string and is 2 or more characters long. Recursive. '''
    def ask_name(self) -> str:
        name = input("Introdueix el teu nom:\n")
        if len(name) < 2 or any(char.isdigit() for char in name) or any(not char.isalpha() for char in name):
            print("Nom invàlid.")
            return self.ask_name()
        
        return name.capitalize()
    
    ''' Asks for two surnames, validating that the first is not empty and both are comprised of only letters.
        Recursive, but only for the first surname. '''
    def ask_surnames(self) -> str:
        surname_1 = input("Introdueix el teu primer cognom:\n")
        if len(surname_1) < 2 or not any(char.isalpha() for char in surname_1):
            print("Cognom no vàlid.")
            return self.ask_surnames()
        
        surname_2_valid = False
        while not surname_2_valid:
            surname_2 = input("Introdueix el teu segon cognom (o prem Intro si no en tens):\n")
            if not any(char.isalpha() for char in surname_2):
                print("Cognom no vàlid.")
            else: surname_2_valid = True

        return [surname_1.capitalize(), surname_2.capitalize()]
    
    ''' Asks for any valid float input. Used for defining initial balance, and for withdrawing and
        depositing. Recursive. '''
    def ask_amount(self, msg, allow_negative = True) -> float:
        balance = input(msg)
        try:
            balance = float(balance.replace(',', '.'))
        except ValueError:
            print("Quantitat invàlida.")
            return self.ask_amount(msg, allow_negative)

        if not allow_negative and balance < 0:
            print("Quantitat invàlida.")
            return self.ask_amount(msg, allow_negative)
        
        return balance
    
    ''' Simple __saldo property modifier, which subtracts the absolute value of
        the given (and validated through ask_amount()) amount. Allows negatives thanks to True parameter. '''
    def withdraw(self):
        self.__saldo -= abs(self.ask_amount("Quina quantitat vols retirar?\n", True))

    ''' Simple __saldo property modifier, which adds the value of
        the given (and validated through ask_amount()) amount. Does not allow negatives. '''
    def deposit(self):
        self.__saldo += self.ask_amount("Quina quantitat vols ingressar?\n", False)

    ''' Prints framed message with the account's balance. '''
    def check_amount(self):
        input(frame_msg(f"SALDO DEL COMPTE {self.__id:}\n{'{:.2f}'.format(self.__saldo).replace('.', ',')}€\nPREM INTRO PER TORNAR AL MENÚ PRINCIPAL", 3, '#'))

    ''' Auxiliary method that just prints the class. Used for detail option in main menu. '''
    def print_self(self):
        input(self)

    ''' Generates __menu_str from __options_menu dict. '''
    def generar_menu(self):        
        for k, v in self.__opcions_menu.items():
            self.__menu_str += f"\n{k}. {v[0]}"

        self.__menu_str = frame_msg(self.__menu_str, 2) + '\n'

    ''' App's main loop. Grabs user input and calls the corresponding method. Recursive. '''
    def iniciar_programa(self):
        clear_console()
        entrada = input(self.__menu_str)
        try:
            entrada = int(entrada)
        except ValueError:
            print_error("Introdueix una opció vàlida.")
            return self.iniciar_programa()

        if entrada == 0:
            clear_console()
            print(f"Adéu, {self.__nom}!")
            return
        
        if entrada in self.__opcions_menu.keys():
            option = self.__opcions_menu[entrada][1]
            option()

        self.iniciar_programa()
        return



def main():
    cc = compte_corrent()


if __name__ == "__main__":
    main()