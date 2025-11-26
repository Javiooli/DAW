from fastapi import FastAPI
from datetime import datetime

data_naixement = datetime(2003, 1, 29)
app = FastAPI()

@app.get("/")
def hola():
    return {"message": 
            f"Hola, sóc Javier Pedragosa i tinc {int((datetime.now() - data_naixement).days)//365} anys."}



