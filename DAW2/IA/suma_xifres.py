'''
Sense utilitzar funcions específiques de Python.
Fem una funció que retorni la suma d'una xifra d'enters positius. Per exemple: 465 seria 15.
Aquest número es pregunta a l'usuari
'''
def main():
    running = True
    while running:
        try:
            num = int(input("Introdueix un número enter positiu de més de dues xifres: "))
        except:
            continue

        if not num or num < 0 or len(str(num)) <= 1:
            continue

        suma = 0
        for xifra in str(num):
            suma += int(xifra)

        print(f"La suma de les {len(str(num))} xifres de {num} és {suma}")
        running = False

if __name__ == "__main__":
    main()