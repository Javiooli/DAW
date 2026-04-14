'''
Connectar-nos a l'Api de Gemini
'''
import os, sys
from dotenv import load_dotenv
from google import genai

load_dotenv()
CLAU=os.getenv('KEYAPI')

if CLAU is None:
    print("Alguna cosa no ha anat bé en el procés d'agafar la clau!!")
    sys.exit(1)

config = {
    'temperature' : 0,
    'top_p' : 0.95,
    'top_k' : 20,
    'max_output_tokens': 50,
    'stop_sequences': 
}

# creem un client per fer peticions amb l'APIKEY.
try:
    client=genai.Client(api_key=CLAU)

    prompt=input("Introdueix el prompt a la IA: ")

    # a la API de Gemini per obtenir resposta accedim com a client als seus models
    # ? retorna objecte GenerateContentResponse, per tant té propietats
    resposta=client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        # Aquí hi va el config={}
    )

    print(f"{5*'='} RESPOSTA {5*'='}")
    print(f"{resposta.text}\n")
    print(f"Tokens gastats: {resposta.usage_metadata.total_token_count}")

except Exception as e:
    print(f"Error: {e}- No es genera resposta")


