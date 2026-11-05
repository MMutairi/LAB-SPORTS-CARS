from django.http import Http404, HttpResponse
from django.shortcuts import render

from apps.data import CARS


def car_detail(request, slug):
    car = CARS.get(slug)

    if car is None:
        raise Http404("Car not found")

    return HttpResponse(
        f"<h1>{car['name']}</h1>"
        f"<p>Brand: {car['brand']}</p>"
    )