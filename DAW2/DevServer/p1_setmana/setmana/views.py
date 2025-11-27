from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, "setmana/home.html", {"error": False})

def dia(request, pk = ""):
    valid = ['1', '2', '3', '4', '5', '6', '7']
    dies = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge']
    emojis = ['... 🤢', '. 🥴', ' 🧐', ' 🤠', '!!! 🥳', '! 🥰', '... 🥲']
    if pk not in valid:
        try:
            error = False if int(pk) <= 0 else True

        except ValueError:
            error = True

        return render(request, "setmana/home.html", {"error": error})
    
    context = {"num_dia": int(pk),
               "nom_dia": dies[int(pk) - 1],
               "emoji": emojis[int(pk) - 1]}
    
    return render(request, "setmana/dia.html", context)