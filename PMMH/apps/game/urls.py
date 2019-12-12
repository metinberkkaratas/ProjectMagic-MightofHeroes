from django.urls import path, include
from . import views
from apps.game.battlefield.urls import urlpatterns as battlefield_url
from apps.game.city import views as city_views

urlpatterns = [
    path('', views.overworld, name='Overworld'),
    path('waiting', views.waiting, name='Waiting Others'),
    path('city/<str:name>', city_views.city, name='City'),
    path('battlefield', include(battlefield_url))
]