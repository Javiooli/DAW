from django.urls import path
from . import views

urlpatterns = [
    path("/<str:pk>",views.personatge,name="personatge"),
    path("/", views.home, name="home")
]

