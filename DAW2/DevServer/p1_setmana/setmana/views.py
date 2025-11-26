from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    #return HttpResponse("<h1>Hello world!</h1>")
    return render(request, "setmana/home.html", {"error": False})

def dia(request, pk = ""):
    valid = ['1', '2', '3', '4', '5', '6', '7']
    dies = ['Dilluns... 🤢', 'Dimarts. 🥴', 'Dimecres 🧐', 'Dijous 🤠', 'Divendres!!! 🥳', 'Dissabte! 🥰', 'Diumenge... 🥲']

    if pk not in valid:
        return render(request, "setmana/home.html", {"error": False if int(pk) <= 0 else True}) # TODO: Si es string salta error
    
    context = {"num_dia": int(pk),
               "nom_dia": dies[int(pk) - 1]}
    
    return render(request, "setmana/dia.html", context)