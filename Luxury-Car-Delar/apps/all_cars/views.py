from django.http import HttpResponse
from django.shortcuts import render


def all_cars(request):
    return HttpResponse("<h1>Our Luxury Car Collection</h1>")