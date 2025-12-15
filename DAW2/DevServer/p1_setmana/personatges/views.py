from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, "personatges/home.html", {"error": False})

def personatge(request, pk = ""):
    valid = ['jace', 'chandra', 'liliana', 'tezzeret', 'ajani']
    frases = ["It’s good to learn from your failures, but I prefer to learn from the failures of others.",
              "Who’d want to ignite things one at a time?",
              "Life is a game, and I play to win.",
              "The secrets I have gathered will make me the most powerful being in the Multiverse.",
              "Stand together. You are stronger than you know."]

    if pk not in valid:
        if pk == "home":
            return render(request, "personatges/home.html")
        return render(request, "personatges/error.html")
    
    context = {"personatge": pk,
               "frase" : frases[valid.index(pk)]}
    
    return render(request, "personatges/personatge.html", context)