from django.urls import path
from . import views

urlpatterns = [
    path("/<str:pk>",views.dia,name="dia"),
    path("/", views.home, name="home")
]

