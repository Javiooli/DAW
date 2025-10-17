import datetime

# -------------------------------------------------------
# Mètodes Utilitat
# -------------------------------------------------------
'''
    Funció recursiva per rebre entrada per consola i validar-la.
    No retorna res.
'''
def ask(msg, validator) -> None:
    # -------------------------------------------------------
    # Mètodes interns
    # -------------------------------------------------------
    '''
        Funció que valida que l'input sigui un String vàlid.
        Retorna 0 o str
    '''
    def validate_string(entrada):
        if entrada.strip() == "0": # Si és 0, retornem 0
            return 0
        
        if not isinstance(entrada, str): # Comprovem que sigui String
            return "Invalid"
        
        if len(entrada.strip()) <= 0: # Comprovem que no sigui buit
            return "Invalid"

        try: # Comprovem que no sigui numèric.
            float(entrada)
        except ValueError:
            return entrada
        
        return "Invalid"
        
    '''
        Funció que valida que l'input sigui una data vàlida.
        Retorna 0 o datetime.date
    '''
    def validate_date(entrada):
        YEAR_FORMAT = [False, "200", "20", "2", ""]
        if entrada.strip() == "0": # Si és 0, retornem 0
            return 0

        try: # Intentem castejar, en cas d'excepció l'entrada no és una data vàlida.
            entrada = entrada.split('/')
            entrada[2] = f"{YEAR_FORMAT[len(entrada[2])]}{entrada[2]}"
            return datetime.date(int(float(entrada[2])), int(float(entrada[1])), int(float(entrada[0])))
        except (IndexError, TypeError, ValueError):
            return "Invalid"

    # -------------------------------------------------------
    # Llògica de la funció
    # -------------------------------------------------------
    VALIDATIONS = {"string": validate_string, "date": validate_date} # Mètode corresponent al tipus d'entrada a validar
    entrada = VALIDATIONS[validator](input(f"{msg}: ")) # Ex.: validator == string, cridem validate_string(entrada)

    if entrada in ["Invalid"]: # Crida recursiva en cas que l'entrada no sigui vàlida
        print("Entrada no vàlida.")
        return ask(msg, validator)
    
    return entrada

'''Mètode recursiu que recull activitats i dates fins que s'introdueixi 0.'''
def agendar(nom):
    data = 0
    activitat = ask(f"Quina activitat vols realitzar, {nom}?", "string")

    if activitat:
        data = ask(f"Quin dia vols {activitat.lower()}?", "date")

    if data:
        print("=== Activitat registrada ===\n")
        return f"{activitat} - {data.strftime("%d/%m/%Y")}\n{agendar(nom)}"
    
    return ""

# -------------------------------------------------------
# MAIN
# -------------------------------------------------------
def main():
    nom = ask("Introdueix el teu nom", "string")
    agenda = f"\n{agendar(nom)}"
    print(agenda if agenda != "" else "No s'ha registrat cap activitat")
    print(f"Adéu, {nom}!")

if __name__ == "__main__":
    main()