from fastapi import FastAPI

api = FastAPI()

@api.get("/")
def hola():
    return {"missatge": "Hello world!"}

@api.get("/test")
def test():
    return {"msg": "This is a test"}