'''
Escriu un programa que demani a usuari numeros un per un
El programa ha de continuar numeros fins que usuari introdueixi un numero negatiu
En el moment que introdueixi un numero negatiu, el programa
ha de parar i mostrar un missatge que digui:
Programa aturat per num negatiu i mostrar tota una llista amb els numeros introduits
'''

nums = []
entrada = 0

while entrada >= 0:
    try:
        entrada = int(input("Introdueix un número enter: "))
        nums.append(entrada)
    except:
        print("Aixó no és un número enter.")
        entrada = 0
    

print(f"Programa aturat per num negatiu.\n{nums}")